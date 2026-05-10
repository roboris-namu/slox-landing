/**
 * POST /api/jeongbidosa/ingest
 *
 * 정비도사 지식베이스의 NULL embedding을 OpenAI 임베딩으로 채웁니다.
 * 관리자가 한 번만 호출하면 되는 엔드포인트입니다.
 *
 * 호출 예시:
 *   curl -X POST http://localhost:3000/api/jeongbidosa/ingest \
 *     -H "Authorization: Bearer $ADMIN_TOKEN"
 *
 * 보안:
 *   - Authorization: Bearer <ADMIN_TOKEN> 헤더 필수
 *   - 서버 사이드에서만 service_role 키 사용 (브라우저 노출 금지)
 *
 * 동작:
 *   1) embedding IS NULL 인 row를 모두 가져옴
 *   2) 각 row 의 (term + description + details) 를 합쳐 임베딩 생성
 *   3) embedding 컬럼 UPDATE
 *   4) 처리 결과 JSON 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';
import type {
  ApiErrorResponse,
  IngestResponse,
} from '@/lib/jeongbidosa/types';

// Vercel/Next: 매 요청마다 새로 실행 (캐싱 X) — 관리자 작업이라 캐시 의미 없음
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 50건 임베딩에 시간이 걸리므로 max duration 늘림 (Vercel 무료 플랜 60초 한도)
export const maxDuration = 60;

/**
 * Authorization 헤더에서 Bearer 토큰을 추출해 ADMIN_TOKEN 과 비교합니다.
 */
function isAuthorized(req: NextRequest): boolean {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    // 토큰이 환경변수에 없으면 모든 요청 거부 (오픈 상태 방지)
    return false;
  }

  const authHeader = req.headers.get('authorization') ?? '';
  // 형식: "Bearer <token>"
  const match = authHeader.match(/^Bearer\s+(.+)$/);
  if (!match) return false;

  return match[1] === adminToken;
}

export async function POST(req: NextRequest) {
  // 1) 권한 체크
  if (!isAuthorized(req)) {
    return NextResponse.json<ApiErrorResponse>(
      { error: 'Unauthorized', detail: 'ADMIN_TOKEN 헤더가 누락되었거나 잘못되었습니다.' },
      { status: 401 },
    );
  }

  const supabase = getJeongbidosaServerClient();

  // 2) 임베딩이 비어있는 row 가져오기
  //    50건 정도라 한 번에 가져옴. 더 많아지면 페이지네이션 필요.
  const { data: rows, error: fetchError } = await supabase
    .from('jeongbidosa_knowledge')
    .select('id, term, description, details')
    .is('embedding', null)
    .order('id', { ascending: true });

  if (fetchError) {
    return NextResponse.json<ApiErrorResponse>(
      { error: 'DB 조회 실패', detail: fetchError.message },
      { status: 500 },
    );
  }

  if (!rows || rows.length === 0) {
    // 이미 모두 임베딩 완료된 상태
    return NextResponse.json<IngestResponse>({
      success: true,
      processed: 0,
      remaining: 0,
    });
  }

  // 3) 각 row 마다 임베딩 생성 + UPDATE
  //    OpenAI rate limit(매분 RPM)을 고려해 순차 처리. 50건 정도면 30~60초 내 완료.
  //    한 row 실패가 전체를 막지 않도록 개별 try/catch.
  let processed = 0;
  const failures: Array<{ id: number; reason: string }> = [];

  for (const row of rows) {
    try {
      // term + description + details 를 합쳐 임베딩 (검색 정확도 향상 목적).
      // null 가능 컬럼은 빈 문자열로 안전 처리.
      const inputText = [row.term, row.description, row.details ?? '']
        .filter((s) => s && s.trim())
        .join('\n');

      const embedding = await getEmbedding(inputText);

      const { error: updateError } = await supabase
        .from('jeongbidosa_knowledge')
        .update({ embedding })
        .eq('id', row.id);

      if (updateError) {
        failures.push({ id: row.id, reason: `UPDATE 실패: ${updateError.message}` });
        continue;
      }

      processed += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push({ id: row.id, reason: message });
    }
  }

  // 4) 처리 후 남은 NULL 카운트 확인 (검증용)
  const { count: remaining } = await supabase
    .from('jeongbidosa_knowledge')
    .select('*', { count: 'exact', head: true })
    .is('embedding', null);

  // 5) 결과 응답
  if (failures.length > 0) {
    // 일부 실패도 200으로 응답하되 detail에 실패 목록 노출 (관리자가 재시도 가능)
    return NextResponse.json(
      {
        success: failures.length < rows.length,
        processed,
        remaining: remaining ?? undefined,
        failures, // 디버깅용
      },
      { status: 200 },
    );
  }

  return NextResponse.json<IngestResponse>({
    success: true,
    processed,
    remaining: remaining ?? 0,
  });
}
