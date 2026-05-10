/**
 * 정비도사 서버 사이드 Supabase 클라이언트
 *
 * 왜 별도 파일인가?
 *   - 기존 src/lib/supabase.ts 는 anon 키 기반(브라우저용). RLS가 적용되므로
 *     ingest API의 UPDATE 작업이 막힙니다.
 *   - 따라서 서버에서만 사용할 service_role 클라이언트를 분리해 둡니다.
 *   - 이 모듈은 절대 클라이언트 컴포넌트에서 import 하지 마세요.
 *     (Next.js의 'server-only' 룰 위반 시 빌드 에러)
 *
 * 사용처:
 *   - /api/jeongbidosa/ingest : 임베딩 생성 후 UPDATE
 *   - /api/jeongbidosa/query  : RPC 검색 (RLS public read로도 가능하지만,
 *                                 동일 클라이언트로 통일하는 게 단순)
 */

import { createClient } from '@supabase/supabase-js';

// 기존 프로젝트와 동일한 URL을 사용합니다(같은 Supabase 프로젝트).
// 환경변수로도 받을 수 있게 두되, 없으면 기존 하드코딩 값 사용 (다른 API들과 동일 패턴).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://xtqpbyfgptuxwrevxxtm.supabase.co';

/**
 * service_role(=Secret) 키로 만든 Supabase 클라이언트.
 *
 * 호출 시점에 환경변수 부재를 명확히 잡기 위해 lazy하게 생성합니다.
 * (모듈 로드 시점에 throw하면 빌드 단계에서 터질 수 있음)
 */
export function getJeongbidosaServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되어 있지 않습니다. .env.local을 확인하세요.',
    );
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      // 서버에서는 세션 관리가 불필요하므로 모두 비활성화 (성능/안전)
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
