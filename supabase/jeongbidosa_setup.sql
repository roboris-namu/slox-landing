-- ============================================================================
-- 정비도사 (Jeongbidosa) - Supabase 초기 셋업 SQL
-- ----------------------------------------------------------------------------
-- 실행 방법:
--   Supabase 대시보드 → SQL Editor → 새 쿼리 → 이 파일 전체 붙여넣기 → Run
--
-- 주의:
--   - 이 SQL은 한 번만 실행하면 됩니다 (idempotent하지 않은 부분 있음).
--   - 기존 slox-landing 테이블과의 충돌 방지를 위해 prefix `jeongbidosa_` 사용.
--   - pgvector 확장은 Supabase에서 기본 제공하므로 활성화만 하면 됩니다.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) pgvector 확장 활성화
--    벡터 임베딩 검색을 위해 필수입니다.
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS vector;


-- ----------------------------------------------------------------------------
-- 2) 정비도사 지식베이스 테이블 생성
--    한국어 자동차 정비 지식 50건이 들어갈 테이블입니다.
--    - term: 증상 또는 부품명 (검색 결과에서 제목으로 사용)
--    - description: 증상에 대한 설명 (RAG context로 들어감)
--    - role: 원인 (왜 그런 증상이 발생하는지)
--    - details: 점검 절차 (사용자가 따라할 수 있는 단계)
--    - embedding: term + description + details 합친 텍스트의 1536차원 임베딩
--                 (text-embedding-3-small 모델 출력 차원에 맞춤)
-- ----------------------------------------------------------------------------
CREATE TABLE jeongbidosa_knowledge (
  id BIGSERIAL PRIMARY KEY,
  term TEXT NOT NULL,
  description TEXT NOT NULL,
  role TEXT,
  details TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ----------------------------------------------------------------------------
-- 3) 벡터 검색 인덱스 (HNSW + 코사인 유사도)
--    HNSW: 대규모 데이터에서 빠른 근사 최근접 이웃 검색
--    vector_cosine_ops: 코사인 거리 기반 (의미 유사도 검색에 적합)
--    데이터가 50건이라 사실상 풀스캔이지만, 추후 확장을 대비해 인덱스 미리 생성.
-- ----------------------------------------------------------------------------
CREATE INDEX ON jeongbidosa_knowledge
USING hnsw (embedding vector_cosine_ops);


-- ----------------------------------------------------------------------------
-- 4) RAG 검색용 RPC 함수
--    클라이언트(Next.js API)에서 supabase.rpc('match_jeongbidosa_knowledge', ...)
--    형태로 호출합니다. SQL 안에서 벡터 거리 연산을 수행해야 하므로 함수로 래핑.
--
--    파라미터:
--      query_embedding: 사용자 질문의 임베딩 벡터
--      match_threshold: 이 값(코사인 유사도)보다 낮으면 결과에서 제외 (기본 0.5)
--      match_count: 반환할 최대 결과 수 (기본 5)
--
--    반환:
--      similarity 값(1 - 코사인 거리)이 높은 순으로 정렬된 row들
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_jeongbidosa_knowledge(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id bigint,
  term text,
  description text,
  role text,
  details text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    jk.id,
    jk.term,
    jk.description,
    jk.role,
    jk.details,
    1 - (jk.embedding <=> query_embedding) AS similarity
  FROM jeongbidosa_knowledge jk
  WHERE jk.embedding IS NOT NULL
    AND 1 - (jk.embedding <=> query_embedding) > match_threshold
  ORDER BY jk.embedding <=> query_embedding
  LIMIT match_count;
$$;


-- ----------------------------------------------------------------------------
-- 5) RLS (Row Level Security) 활성화
--    - 읽기: 누구나 가능 (챗봇이 anon 키로 검색해야 함)
--    - 쓰기/수정: service_role 키만 가능 (관리자 ingest API에서만 사용)
--    service_role 키는 RLS를 우회하므로 별도 INSERT/UPDATE 정책 불필요.
-- ----------------------------------------------------------------------------
ALTER TABLE jeongbidosa_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"
  ON jeongbidosa_knowledge FOR SELECT
  USING (true);


-- ============================================================================
-- 셋업 완료 확인용 쿼리 (실행 후 결과 확인)
-- ============================================================================
-- SELECT COUNT(*) FROM jeongbidosa_knowledge;  -- 0이어야 함 (Step 2에서 데이터 입력)
-- SELECT extname FROM pg_extension WHERE extname = 'vector';  -- 'vector' 1개 row
