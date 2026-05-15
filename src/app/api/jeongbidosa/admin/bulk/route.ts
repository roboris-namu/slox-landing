/**
 * POST /api/jeongbidosa/admin/bulk
 *
 * 엑셀에서 파싱된 row 배열을 일괄 추가합니다.
 * (서버에서는 이미 JSON 배열로 받은 상태 — 클라이언트에서 xlsx 파싱)
 *
 * 요청 바디: { rows: { term, description, role?, details? }[] }
 * 응답:
 *   {
 *     success: boolean,
 *     inserted: number,         // 새로 추가된 row 수
 *     duplicated: number,       // term 중복으로 건너뛴 수
 *     skipped: number,          // term/description 누락으로 건너뛴 수
 *     failures: { index: number, reason: string }[]
 *   }
 *
 * 성능 노트:
 *   - 과거에는 100건을 1건씩 임베딩 + insert 순차 처리해 ~50초가 걸려
 *     Vercel maxDuration 60초를 초과하는 경우가 있었습니다.
 *     (그때 Vercel은 "An error occurred with your deployment..." 평문 응답을 보내
 *      클라이언트의 res.json() 가 "Unexpected token 'A'..." 로 실패)
 *   - 현재 구현:
 *      1) OpenAI 임베딩을 50건씩 청크로 묶어 배치 API 호출 (1~2회)
 *      2) Supabase 는 마지막에 한 번 일괄 insert
 *     → 100건이 5~10초 이내로 완료, 타임아웃 위험 사실상 제거.
 *
 * 정책:
 *   - 한 번 호출에 최대 100건. 그 이상은 클라이언트에서 분할 호출하도록 가이드.
 *   - 한 row 실패가 전체를 막지 않음 (partial success 허용).
 *   - term, description 필수 검증.
 *   - **중복 정책**: 이미 DB 에 같은 term 이 있으면 INSERT 하지 않고 건너뜁니다 (duplicated 카운트 증가).
 *     · 같은 업로드 배치 내에서 term 이 중복되면 첫 건만 INSERT 되고 나머지는 duplicated 처리.
 *     · 비교는 trim 후 정확 일치 (대소문자/공백 차이는 다른 term 으로 봅니다).
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getEmbeddingsBatch } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 배치 임베딩으로 5~10초면 끝나지만, 안전 마진으로 60초 유지.
export const maxDuration = 60;

const MAX_BATCH = 100;
// OpenAI 한 요청에 묶어 보낼 임베딩 입력 개수. 50이면 페이로드/토큰 모두 여유.
const EMBED_CHUNK = 50;

interface BulkRowInput {
  term?: unknown;
  description?: unknown;
  role?: unknown;
  details?: unknown;
}

/** 임베딩 입력 텍스트 만들기 — term/description/role/details 를 줄바꿈으로 합칩니다. */
function composeEmbedText(row: {
  term: string;
  description: string;
  role: string | null;
  details: string | null;
}): string {
  return [row.term, row.description, row.role ?? '', row.details ?? '']
    .filter((s) => s && s.trim())
    .join('\n');
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { rows?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.rows)) {
    return NextResponse.json(
      { error: 'rows 배열이 필요합니다.' },
      { status: 400 },
    );
  }

  const rows = body.rows as BulkRowInput[];
  if (rows.length === 0) {
    return NextResponse.json(
      { error: '추가할 row 가 없습니다.' },
      { status: 400 },
    );
  }
  if (rows.length > MAX_BATCH) {
    return NextResponse.json(
      { error: `한 번에 최대 ${MAX_BATCH}건까지 업로드 가능합니다.` },
      { status: 400 },
    );
  }

  const supabase = getJeongbidosaServerClient();

  // 기존 term 전부 조회 (중복 검사용). 현재 규모에서는 단순 SELECT 가 가장 빠름.
  const { data: existingTerms, error: fetchTermsError } = await supabase
    .from('jeongbidosa_knowledge')
    .select('term');
  if (fetchTermsError) {
    return NextResponse.json(
      { error: '기존 데이터 조회 실패', detail: fetchTermsError.message },
      { status: 500 },
    );
  }
  const existingTermSet = new Set(
    (existingTerms ?? []).map((r) => (r.term ?? '').trim()),
  );

  let duplicated = 0;
  let skipped = 0;
  const failures: Array<{ index: number; reason: string }> = [];

  // ── 1) 정규화 + 검증 + 중복 제거 → "임베딩 대상" 목록 만들기.
  //     각 항목은 원본 row 의 index 도 함께 보관해 결과 추적 가능.
  const normalized: Array<{
    originIndex: number;
    term: string;
    description: string;
    role: string | null;
    details: string | null;
  }> = [];

  for (let i = 0; i < rows.length; i += 1) {
    const raw = rows[i] ?? {};
    const term = typeof raw.term === 'string' ? raw.term.trim() : '';
    const description =
      typeof raw.description === 'string' ? raw.description.trim() : '';
    const role =
      typeof raw.role === 'string' && raw.role.trim()
        ? raw.role.trim()
        : null;
    const details =
      typeof raw.details === 'string' && raw.details.trim()
        ? raw.details.trim()
        : null;

    if (!term || !description) {
      skipped += 1;
      failures.push({
        index: i,
        reason: 'term 또는 description 이 비어 있어 건너뛰었습니다.',
      });
      continue;
    }

    if (existingTermSet.has(term)) {
      duplicated += 1;
      continue;
    }

    // 같은 배치 내 중복도 차단 — 미리 set 에 추가해 두 번째부터 duplicated 처리.
    existingTermSet.add(term);
    normalized.push({ originIndex: i, term, description, role, details });
  }

  // 모두 중복/누락이면 임베딩 호출 없이 종료.
  if (normalized.length === 0) {
    return NextResponse.json({
      success: failures.length === 0,
      inserted: 0,
      duplicated,
      skipped,
      failures,
    });
  }

  // ── 2) OpenAI 임베딩 — 50개씩 묶어 배치 호출.
  //     각 호출 결과를 normalized 의 인덱스에 매핑해서 embeddings[] 에 누적.
  const embeddings: number[][] = new Array(normalized.length);

  for (let start = 0; start < normalized.length; start += EMBED_CHUNK) {
    const slice = normalized.slice(start, start + EMBED_CHUNK);
    const inputs = slice.map(composeEmbedText);
    try {
      const result = await getEmbeddingsBatch(inputs);
      for (let j = 0; j < slice.length; j += 1) {
        embeddings[start + j] = result[j];
      }
    } catch (err) {
      // 청크 단위 실패는 청크 내 모든 row 를 failures 로 기록하고 계속 진행
      const msg = err instanceof Error ? err.message : String(err);
      for (let j = 0; j < slice.length; j += 1) {
        failures.push({
          index: slice[j].originIndex,
          reason: `임베딩 생성 실패: ${msg}`,
        });
      }
      // 이 청크는 embeddings 가 비어 있으므로 insert 단계에서 자동 제외됨.
    }
  }

  // ── 3) Supabase 일괄 insert. 임베딩이 정상적으로 채워진 row 만 포함.
  const insertRows = normalized
    .map((r, idx) => ({ ...r, embedding: embeddings[idx] }))
    .filter((r) => Array.isArray(r.embedding) && r.embedding.length === 1536)
    .map((r) => ({
      term: r.term,
      description: r.description,
      role: r.role,
      details: r.details,
      embedding: r.embedding,
    }));

  let inserted = 0;
  if (insertRows.length > 0) {
    const { data: insertedRows, error: insertError } = await supabase
      .from('jeongbidosa_knowledge')
      .insert(insertRows)
      .select('id');

    if (insertError) {
      // 전체 insert 실패 — 임베딩까지는 성공했지만 DB 저장이 막힘.
      // 원인 진단을 위해 클라이언트에 메시지를 그대로 노출.
      return NextResponse.json(
        {
          success: false,
          inserted: 0,
          duplicated,
          skipped,
          failures: [
            ...failures,
            { index: -1, reason: `일괄 DB 저장 실패: ${insertError.message}` },
          ],
        },
        { status: 500 },
      );
    }

    inserted = insertedRows?.length ?? insertRows.length;
  }

  return NextResponse.json({
    success: failures.length === 0,
    inserted,
    duplicated,
    skipped,
    failures,
  });
}
