/**
 * GET /api/jeongbidosa/admin/preview/[id]
 *
 * 어드민 페이지에서 특정 지식 row 카드를 펼쳤을 때, 이 row가 실제 검색 결과로
 * 사용됐을 경우 사용자가 받게 될 답변 예시를 시뮬레이션합니다.
 *
 * 호출 시에만 실행됨 (1회 LLM 호출):
 *   - 비용 폭증 방지를 위해 진입 시 일괄 생성하지 않습니다.
 *   - JSON 모드로 "예상 질문" + "답변"을 한 번에 받아 호출 횟수를 절반으로 줄임.
 *
 * 응답:
 *   { question: string, answer: string }
 *
 * 보안: 어드민 쿠키 검증 필수.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 30;

const OPENAI_BASE_URL = 'https://api.openai.com/v1';
// 질문/답변 시뮬레이션은 단순한 작업이라 가장 저렴한 mini 모델 사용
const CHAT_MODEL = 'gpt-4o-mini';

/** 단일 row 컨텍스트로 질문+답변을 한 번에 생성하는 시스템 프롬프트 */
const SYSTEM_PROMPT = `당신은 한국 자동차 정비 챗봇 시뮬레이터입니다.
주어진 정비 지식 1건의 데이터를 근거로:

(1) 일반 운전자가 정비소나 챗봇에 자연스럽게 던질 만한 짧은 한국어 질문을 1개 만드세요.
    - 구어체로 작성 (예: "엔진에서 딸깍 소리가 나요", "브레이크가 밀려요")
    - term 을 그대로 따라하지 마세요. 증상 위주로 자연스럽게 표현하세요.
    - 한 문장, 25자 이내

(2) 그 질문에 대한 답변을 작성하세요.
    - 반드시 주어진 데이터(term/description/role/details)만 근거로 사용
    - 2~4문장으로 간결하게
    - 단계가 있으면 ①②③ 사용
    - 마지막에 [S1] 출처 마커 1개 표시 (이 데이터가 곧 S1)
    - 친근한 어조 ("~합니다", "확인해보세요")

응답은 반드시 다음 JSON 형식만 출력하세요. 다른 텍스트 금지:
{"question":"...","answer":"..."}`;

interface RouteContext {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = Number.parseInt(params.id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  // 1) DB에서 해당 row 조회
  const supabase = getJeongbidosaServerClient();
  const { data: row, error } = await supabase
    .from('jeongbidosa_knowledge')
    .select('term, description, role, details')
    .eq('id', id)
    .single();

  if (error || !row) {
    return NextResponse.json(
      { error: '항목을 찾을 수 없습니다.', detail: error?.message },
      { status: 404 },
    );
  }

  // 2) LLM 호출 — JSON 응답을 강제해 파싱 안전성 확보
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY 환경변수가 없습니다.' },
      { status: 500 },
    );
  }

  // CONTEXT 블록 — 실제 query 라우트와 동일한 [S1] 형식으로 통일
  const lines = [
    `[S1] term: ${row.term}`,
    `      description: ${row.description}`,
  ];
  if (row.role) lines.push(`      role: ${row.role}`);
  if (row.details) lines.push(`      details: ${row.details}`);
  const contextBlock = lines.join('\n');

  const userMessage = `다음 정비 지식 1건을 보고 위 지시대로 JSON 응답을 생성하세요.\n\n${contextBlock}`;

  let llmRes: Response;
  try {
    llmRes = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        // OpenAI JSON 모드 — 응답이 반드시 JSON 객체임을 보장
        response_format: { type: 'json_object' },
        max_tokens: 350,
        temperature: 0.4,
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'OpenAI 네트워크 실패', detail: String(err) },
      { status: 502 },
    );
  }

  if (!llmRes.ok) {
    const detail = await llmRes.text();
    return NextResponse.json(
      { error: `OpenAI 호출 실패 (HTTP ${llmRes.status})`, detail },
      { status: 502 },
    );
  }

  const llmJson = (await llmRes.json()) as {
    choices: Array<{ message: { content: string | null } }>;
  };
  const content = llmJson.choices?.[0]?.message?.content ?? '';

  // 3) JSON 파싱 — JSON 모드 사용해도 안전을 위해 try/catch
  let parsed: { question?: unknown; answer?: unknown };
  try {
    parsed = JSON.parse(content) as {
      question?: unknown;
      answer?: unknown;
    };
  } catch {
    return NextResponse.json(
      { error: 'OpenAI 응답이 JSON 형식이 아닙니다.', detail: content },
      { status: 502 },
    );
  }

  const question =
    typeof parsed.question === 'string' ? parsed.question.trim() : '';
  const answer =
    typeof parsed.answer === 'string' ? parsed.answer.trim() : '';

  if (!question || !answer) {
    return NextResponse.json(
      {
        error: 'OpenAI 응답에 question 또는 answer 가 없습니다.',
        detail: content,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ question, answer });
}
