/**
 * 정비도사 OpenAI 헬퍼
 *
 * 외부 라이브러리 없이 fetch로 OpenAI API를 직접 호출합니다.
 * (이유: 번들 크기 절감 + Vercel Edge 호환성 + 의존성 추가 회피)
 *
 * 두 가지 함수만 노출:
 *   - getEmbedding: 텍스트를 1536차원 벡터로 변환
 *   - generateAnswer: 검색된 컨텍스트로 한국어 답변 생성
 */

import type { JeongbidosaKnowledge } from './types';

// ----------------------------------------------------------------------------
// 상수 - 모델/엔드포인트는 한 곳에서만 관리
// ----------------------------------------------------------------------------
const OPENAI_BASE_URL = 'https://api.openai.com/v1';
const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536차원, RAG에 충분
const CHAT_MODEL = 'gpt-4o-mini'; // 비용 대비 한국어 품질 우수

/**
 * 환경변수에서 OpenAI 키를 안전하게 가져옵니다.
 * 키가 없으면 명확한 에러 메시지로 실패시킵니다 (사일런트 실패 방지).
 */
function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      'OPENAI_API_KEY 환경변수가 설정되어 있지 않습니다. .env.local 파일을 확인하세요.',
    );
  }
  return key;
}

// ----------------------------------------------------------------------------
// 임베딩 생성
// ----------------------------------------------------------------------------

/**
 * 텍스트를 1536차원 임베딩 벡터로 변환합니다.
 *
 * 사용처:
 *   - Step 5 ingest API: 지식베이스 row의 term + description + details를 합쳐 임베딩
 *   - Step 6 query API: 사용자 질문을 임베딩
 *
 * @param text 임베딩할 텍스트 (한국어/영어 무관)
 * @returns 1536개 float로 이루어진 배열
 */
export async function getEmbedding(text: string): Promise<number[]> {
  // 빈 문자열은 OpenAI에서 400 에러를 내므로 사전 검증
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('임베딩 대상 텍스트가 비어 있습니다.');
  }

  const response = await fetch(`${OPENAI_BASE_URL}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: trimmed,
      // encoding_format 기본값(float)으로 두면 number[] 반환
    }),
  });

  if (!response.ok) {
    // OpenAI는 에러 시 { error: { message, type, code } } 형식으로 응답
    const errorText = await response.text();
    throw new Error(
      `OpenAI 임베딩 API 호출 실패 (HTTP ${response.status}): ${errorText}`,
    );
  }

  // 응답 구조: { data: [{ embedding: number[] }], ... }
  const json = (await response.json()) as {
    data: Array<{ embedding: number[] }>;
  };

  const embedding = json.data?.[0]?.embedding;
  if (!Array.isArray(embedding) || embedding.length !== 1536) {
    throw new Error('OpenAI 임베딩 응답 형식이 예상과 다릅니다.');
  }

  return embedding;
}

// ----------------------------------------------------------------------------
// 답변 생성 (RAG)
// ----------------------------------------------------------------------------

/**
 * RAG 시스템 프롬프트.
 *
 * 핵심 원칙:
 *   1) CONTEXT에 없는 정보는 절대 만들어내지 않음 (할루시네이션 방지)
 *   2) 컨텍스트 부족 시 "정비소 문의" 안내 (안전 우선)
 *   3) 출처 마커 [S1][S2] 강제 (사용자가 원본 확인 가능)
 *   4) 한국어 친근체 ("~합니다", "~확인해보세요")
 */
const SYSTEM_PROMPT = `당신은 한국 자동차 정비 전문가입니다. 제공된 CONTEXT의 정보만 사용해서 한국어로 답변하세요.

규칙:
- CONTEXT에 정보가 부족하면 "지식베이스에서 답을 찾지 못했습니다. 정비소에 문의하세요." 라고 답변
- 답변은 2~4문장으로 간결하게
- 단계가 있으면 ①②③ 사용
- 인용한 정보 뒤에 [S1], [S2] 같은 출처 마커 표시 (S 번호는 CONTEXT에 표시된 순서)
- 친근한 어조 ("~합니다", "확인해보세요")`;

/**
 * 컨텍스트 row 들을 LLM에 넣을 텍스트로 변환합니다.
 *
 * 형식:
 *   [S1] term: ...
 *        description: ...
 *        role: ...
 *        details: ...
 *
 * S 번호를 1부터 부여해, 모델이 [S1][S2]로 인용하도록 유도합니다.
 */
function formatContexts(contexts: JeongbidosaKnowledge[]): string {
  return contexts
    .map((c, idx) => {
      const sNum = idx + 1;
      const lines = [
        `[S${sNum}] term: ${c.term}`,
        `      description: ${c.description}`,
      ];
      if (c.role) lines.push(`      role: ${c.role}`);
      if (c.details) lines.push(`      details: ${c.details}`);
      return lines.join('\n');
    })
    .join('\n\n');
}

/**
 * 사용자 질문 + 검색된 컨텍스트로 RAG 답변을 생성합니다.
 *
 * @param question 사용자 질문 (한국어)
 * @param contexts pgvector 검색 결과 (similarity 높은 순으로 이미 정렬된 상태)
 * @returns 한국어 답변 문자열 ([S1] 같은 출처 마커 포함 가능)
 */
export async function generateAnswer(
  question: string,
  contexts: JeongbidosaKnowledge[],
): Promise<string> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new Error('질문이 비어 있습니다.');
  }

  // 컨텍스트가 0개일 수도 있음 — 그 경우 시스템 프롬프트 규칙대로 "찾지 못함" 답변이 나옴
  const contextBlock =
    contexts.length > 0 ? formatContexts(contexts) : '(검색된 컨텍스트가 없습니다)';

  const userMessage = `CONTEXT:
${contextBlock}

QUESTION:
${trimmed}`;

  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 400,
      temperature: 0.3, // 사양 정보 일관성 우선이라 낮게 (창의성 X)
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenAI 채팅 API 호출 실패 (HTTP ${response.status}): ${errorText}`,
    );
  }

  // 응답 구조: { choices: [{ message: { content: string } }], ... }
  const json = (await response.json()) as {
    choices: Array<{ message: { content: string | null } }>;
  };

  const answer = json.choices?.[0]?.message?.content;
  if (!answer) {
    throw new Error('OpenAI 채팅 응답이 비어 있습니다.');
  }

  return answer.trim();
}
