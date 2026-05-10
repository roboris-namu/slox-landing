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
 *     inserted: number,
 *     skipped: number,
 *     failures: { index: number, reason: string }[]
 *   }
 *
 * 정책:
 *   - 한 번 호출에 최대 100건. 그 이상은 클라이언트에서 분할 호출하도록 가이드.
 *   - 한 row 실패가 전체 트랜잭션을 막지 않음 (partial success 허용).
 *   - term, description 필수 검증.
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

  let inserted = 0;
  let skipped = 0;
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push({ index: i, reason: msg });
    }
  }

  return NextResponse.json({
    success: failures.length === 0,
    inserted,
    skipped,
    failures,
  });
}
