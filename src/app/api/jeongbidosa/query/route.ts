/**
 * POST /api/jeongbidosa/query
 *
 * 사용자 질문을 받아 RAG 답변을 반환합니다.
 *
 * 요청:
 *   POST /api/jeongbidosa/query
 *   Content-Type: application/json
 *   Body: { "question": "엔진에서 딸깍 소리가 나요" }
 *
 * 응답 (정상):
 *   { "answer": "...", "sources": [JeongbidosaKnowledge, ...] }
 *
 * 응답 (에러):
 *   { "error": "...", "detail": "..." }
 *
 * 처리 흐름:
 *   1) 질문 검증 (빈 값 / 너무 김 차단)
 *   2) OpenAI 임베딩 생성
 *   3) Supabase RPC `match_jeongbidosa_knowledge` 호출 (top-5)
 *   4) 검색 결과를 컨텍스트로 OpenAI 답변 생성
 *   5) answer + sources 반환
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAnswer, getEmbedding } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';
import type {
  ApiErrorResponse,
  JeongbidosaKnowledge,
  QueryRequest,
  QueryResponse,
} from '@/lib/jeongbidosa/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 임베딩 + LLM 호출 합쳐 평균 2~5초. 여유 있게 30초 한도.
export const maxDuration = 30;

// 입력 검증 상수
const MAX_QUESTION_LENGTH = 500; // 너무 긴 질문은 임베딩/LLM 비용·악용 방지 차원에서 차단
const MATCH_THRESHOLD = 0.3; // 코사인 유사도 임계치 (RPC 기본은 0.5인데, 한국어 RAG는 좀 더 관대하게)
const MATCH_COUNT = 5; // RAG 컨텍스트 상한

/**
 * RPC 응답 row의 런타임 형식.
 * supabase-js는 RPC 반환 타입을 자동 추론하지 못하므로 직접 정의합니다.
 */
interface MatchRpcRow {
  id: number;
  term: string;
  description: string;
  role: string | null;
  details: string | null;
  similarity: number;
}

export async function POST(req: NextRequest) {
  // ------------------------------------------------------------------
  // 1) 요청 파싱 및 검증
  // ------------------------------------------------------------------
  let body: Partial<QueryRequest>;
  try {
    body = (await req.json()) as Partial<QueryRequest>;
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: '잘못된 요청 형식입니다.', detail: 'JSON body 파싱 실패' },
      { status: 400 },
    );
  }

  const question = (body?.question ?? '').toString().trim();

  if (!question) {
    return NextResponse.json<ApiErrorResponse>(
      { error: '질문을 입력해주세요.' },
      { status: 400 },
    );
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json<ApiErrorResponse>(
      {
        error: `질문이 너무 깁니다 (${MAX_QUESTION_LENGTH}자 이내).`,
        detail: `현재 길이: ${question.length}자`,
      },
      { status: 400 },
    );
  }

  // ------------------------------------------------------------------
  // 2) 질문 임베딩 생성
  // ------------------------------------------------------------------
  let questionEmbedding: number[];
  try {
    questionEmbedding = await getEmbedding(question);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json<ApiErrorResponse>(
      {
        error: '질문 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        detail: message,
      },
      { status: 500 },
    );
  }

  // ------------------------------------------------------------------
  // 3) Supabase RPC 검색 (코사인 유사도 top-5)
  // ------------------------------------------------------------------
  const supabase = getJeongbidosaServerClient();

  const { data: matchData, error: rpcError } = await supabase.rpc(
    'match_jeongbidosa_knowledge',
    {
      query_embedding: questionEmbedding,
      match_threshold: MATCH_THRESHOLD,
      match_count: MATCH_COUNT,
    },
  );

  if (rpcError) {
    return NextResponse.json<ApiErrorResponse>(
      {
        error: '지식베이스 검색 중 오류가 발생했습니다.',
        detail: rpcError.message,
      },
      { status: 500 },
    );
  }

  // RPC 반환은 supabase-js가 unknown으로 추론하므로 명시적 캐스팅
  const matches: MatchRpcRow[] = Array.isArray(matchData) ? (matchData as MatchRpcRow[]) : [];

  // ------------------------------------------------------------------
  // 4) 컨텍스트 정규화 → LLM 답변 생성
  // ------------------------------------------------------------------
  const contexts: JeongbidosaKnowledge[] = matches.map((m) => ({
    id: m.id,
    term: m.term,
    description: m.description,
    role: m.role,
    details: m.details,
    similarity: m.similarity,
  }));

  // 검색 결과가 0개여도 generateAnswer 는 시스템 프롬프트 규칙대로
  // "지식베이스에서 답을 찾지 못했습니다…" 라고 답변하도록 설계되어 있음.
  // 일관된 동작을 위해 LLM 호출은 항상 진행합니다.
  let answer: string;
  try {
    answer = await generateAnswer(question, contexts);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json<ApiErrorResponse>(
      {
        error: '답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        detail: message,
      },
      { status: 500 },
    );
  }

  // ------------------------------------------------------------------
  // 5) 응답
  // ------------------------------------------------------------------
  return NextResponse.json<QueryResponse>({
    answer,
    sources: contexts,
  });
}
