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
 * 정책:
 *   - 한 번 호출에 최대 100건. 그 이상은 클라이언트에서 분할 호출하도록 가이드.
 *   - 한 row 실패가 전체 트랜잭션을 막지 않음 (partial success 허용).
 *   - term, description 필수 검증.
 *   - **중복 정책**: 이미 DB에 같은 term 이 있으면 INSERT 하지 않고 건너뜁니다 (duplicated 카운트 증가).
 *     같은 파일을 두 번 올려도 데이터가 두 배가 되지 않도록 안전장치.
 *     · 단, 같은 업로드 배치 내에서 term 이 중복되면 첫 건만 INSERT 되고 나머지는 duplicated 처리.
 *     · 비교는 trim 후 정확 일치 (대소문자/공백 차이는 다른 term 으로 봅니다).
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getEmbedding } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 100건까지 임베딩 + insert 하므로 한도까지 늘림 (Vercel Free 60s 한도)
export const maxDuration = 60;

const MAX_BATCH = 100;

interface BulkRowInput {
  term?: unknown;
  description?: unknown;
  role?: unknown;
  details?: unknown;
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
      { error: '추가할 row가 없습니다.' },
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

  // 중복 검사용 — 기존 DB 의 모든 term 을 한 번에 가져와 Set 으로 만듭니다.
  // 50건 정도라 부담 없음. 큰 DB 라면 페이지네이션이 필요하지만 현재 규모에선 단순 SELECT 가 가장 빠름.
  // trim 후 비교하므로, 클라이언트 검증과 동일한 normalize 가 적용됩니다.
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

  let inserted = 0;
  let duplicated = 0; // 같은 term 이 이미 있어 건너뛴 수
  let skipped = 0; // term/description 누락으로 건너뛴 수
  const failures: Array<{ index: number; reason: string }> = [];

  // 순차 처리: OpenAI rate limit / 메모리 안전 / 부분 성공 추적이 쉬움.
  // 100건 = 약 30~50초. maxDuration 60초 안에 들어옵니다.
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

    // 중복 체크: 기존 DB 또는 같은 배치 내 이미 처리된 term
    if (existingTermSet.has(term)) {
      duplicated += 1;
      continue;
    }

    try {
      const text = [term, description, role ?? '', details ?? '']
        .filter((s) => s && s.trim())
        .join('\n');
      const embedding = await getEmbedding(text);

      const { error: insertError } = await supabase
        .from('jeongbidosa_knowledge')
        .insert({ term, description, role, details, embedding });

      if (insertError) {
        failures.push({
          index: i,
          reason: `DB 저장 실패: ${insertError.message}`,
        });
        continue;
      }

      inserted += 1;
      // 같은 배치 내에서 동일 term 이 또 들어오면 두 번째부터는 duplicated 로 처리되도록 set 에 추가
      existingTermSet.add(term);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ index: i, reason: msg });
    }
  }

  return NextResponse.json({
    success: failures.length === 0,
    inserted,
    duplicated,
    skipped,
    failures,
  });
}
