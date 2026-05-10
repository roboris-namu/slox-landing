/**
 * 정비도사 (Jeongbidosa) 공용 타입 정의
 *
 * 이 파일은 클라이언트(/jeongbidosa 페이지)와 서버(/api/jeongbidosa/*) 양쪽에서
 * 공유되는 타입만 모읍니다. 외부 라이브러리에 의존하는 타입은 두지 않습니다.
 */

/**
 * 지식베이스 1건의 구조.
 *
 * Supabase의 `jeongbidosa_knowledge` 테이블 컬럼과 1:1 대응됩니다.
 * `embedding`은 1536차원 vector지만 클라이언트로는 절대 내려보내지 않으므로
 * 이 인터페이스에는 포함하지 않습니다(보안/페이로드 절감).
 *
 * `similarity`는 RPC 함수 `match_jeongbidosa_knowledge`의 반환값에만 존재하며,
 * 일반 SELECT에서는 없으므로 옵셔널로 둡니다.
 */
export interface JeongbidosaKnowledge {
  /** 테이블의 BIGSERIAL PK */
  id: number;
  /** 증상/항목 명 (예: "타이밍 체인 늘어짐") */
  term: string;
  /** 증상 설명 (2~3문장) */
  description: string;
  /** 원인 설명 - DB에서 NULL 허용이므로 string | null */
  role: string | null;
  /** 점검 절차 (①②③ 단계) - DB에서 NULL 허용이므로 string | null */
  details: string | null;
  /**
   * 코사인 유사도. 0~1 범위 (1에 가까울수록 유사).
   * RPC 검색 결과에만 포함되므로 옵셔널.
   */
  similarity?: number;
}

/**
 * /api/jeongbidosa/query 요청 바디
 */
export interface QueryRequest {
  /** 사용자 질문 (한국어) */
  question: string;
}

/**
 * /api/jeongbidosa/query 응답 바디
 */
export interface QueryResponse {
  /** LLM이 생성한 한국어 답변. [S1][S2] 같은 출처 마커가 포함될 수 있음. */
  answer: string;
  /**
   * 답변 생성에 사용된 컨텍스트 row 들 (similarity 포함).
   * UI에서 [S1], [S2] 순서대로 매핑해 출처 카드를 표시하는 데 사용합니다.
   */
  sources: JeongbidosaKnowledge[];
}

/**
 * /api/jeongbidosa/ingest 응답 바디 (관리자용)
 */
export interface IngestResponse {
  success: boolean;
  /** 이번 호출에서 임베딩이 새로 생성된 row 수 */
  processed: number;
  /** 처리 후 남은(아직 임베딩이 NULL인) row 수 */
  remaining?: number;
}

/**
 * 공통 에러 응답 형식.
 * Next.js API에서 에러 발생 시 이 모양으로 통일해 반환합니다.
 */
export interface ApiErrorResponse {
  error: string;
  /** 디버깅용 추가 정보 (운영에서는 노출하지 않을 수 있음) */
  detail?: string;
}
