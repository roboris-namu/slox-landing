/**
 * /jeongbidosa - 정비도사 채팅 페이지
 *
 * 기능:
 *   - 사용자 질문 입력 → POST /api/jeongbidosa/query → 답변 표시
 *   - 예시 질문 4개 (시연용 + 사용성 개선)
 *   - 답변 하단에 출처 카드 ([S1], [S2] ...) 노출
 *   - 다크 테마 + 모바일 반응형 + 로딩 인디케이터
 *
 * 상태 관리:
 *   - useState 만 사용 (외부 라이브러리 X)
 *   - messages: 화면에 그릴 채팅 기록
 *   - input/loading: 입력창 + 전송 중 플래그
 *
 * 메타데이터는 별도 metadata.ts 가 아닌, 이 파일이 'use client' 라
 * SEO를 위해 layout.tsx 또는 별도 head 처리가 필요할 수 있으나,
 * 1차 버전은 클라이언트 페이지로 단순하게 구성합니다.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  ApiErrorResponse,
  JeongbidosaKnowledge,
  QueryResponse,
} from '@/lib/jeongbidosa/types';

// ----------------------------------------------------------------------------
// 채팅 메시지 타입 (이 페이지 내부에서만 사용)
// ----------------------------------------------------------------------------
type ChatMessage =
  | {
      id: string;
      role: 'user';
      content: string;
    }
  | {
      id: string;
      role: 'assistant';
      content: string;
      sources?: JeongbidosaKnowledge[];
    }
  | {
      id: string;
      role: 'error';
      content: string;
    };

// ----------------------------------------------------------------------------
// 시연용 예시 질문 (반드시 매칭되도록 Step 2 데이터에 맞춰져 있음)
// ----------------------------------------------------------------------------
const SAMPLE_QUESTIONS = [
  '엔진에서 딸깍 소리가 나요',
  '브레이크가 밀려요',
  '배터리가 자주 방전돼요',
  '엔진오일 교체 주기 알려주세요',
] as const;

// 메시지 ID 생성용 (간단한 timestamp+rand, 외부 의존성 회피)
function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function JeongbidosaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 채팅 영역 자동 스크롤을 위한 ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // 메시지 추가될 때마다 하단으로 스크롤
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  // --------------------------------------------------------------------------
  // 질문 전송
  // --------------------------------------------------------------------------
  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    // 1) 사용자 메시지 즉시 추가 (UX 빠른 피드백)
    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 2) API 호출
    try {
      const res = await fetch('/api/jeongbidosa/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => ({}))) as Partial<ApiErrorResponse>;
        throw new Error(errData.error ?? `요청 실패 (HTTP ${res.status})`);
      }

      const data = (await res.json()) as QueryResponse;

      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'error', content: message },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------------------------------------------------
  // 폼 제출 핸들러
  // --------------------------------------------------------------------------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendQuestion(input);
  }

  // --------------------------------------------------------------------------
  // 렌더링
  // --------------------------------------------------------------------------
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-dark-950/70 border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-premium-gradient flex items-center justify-center text-xl shadow-glow-sm"
            aria-hidden
          >
            🔧
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold tracking-tight">정비도사</h1>
            <p className="text-xs text-white/50">AI 자동차 정비 챗봇</p>
          </div>
        </div>
      </header>

      {/* 채팅 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {/* 빈 상태: 안내 + 예시 질문 */}
          {messages.length === 0 && (
            <EmptyState onSelect={sendQuestion} />
          )}

          {/* 채팅 메시지들 */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* 로딩 인디케이터 (AI가 답변 생성 중) */}
          {loading && <TypingIndicator />}
        </div>
      </div>

      {/* 입력 영역 (하단 고정) */}
      <footer className="sticky bottom-0 backdrop-blur-md bg-dark-950/80 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="정비 관련 질문을 입력하세요..."
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-dark-800/80 border border-white/10
                         text-white placeholder:text-white/30
                         focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20
                         disabled:opacity-50 transition"
              aria-label="질문 입력"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl bg-premium-gradient
                         text-white font-semibold text-sm
                         shadow-glow-sm hover:shadow-glow-md
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all active:scale-95"
            >
              전송
            </button>
          </form>
          <p className="text-[10px] text-white/30 mt-2 text-center">
            안전한 답변을 위해 실제 정비는 정비소에 문의하세요
          </p>
        </div>
      </footer>
    </main>
  );
}

// ============================================================================
// 하위 컴포넌트 (같은 파일 안에서 응집도 유지 - 단일 페이지 전용)
// ============================================================================

/**
 * 채팅이 비어있을 때 보여주는 환영 화면 + 예시 질문 4개.
 */
function EmptyState({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center text-center pt-8 animate-fade-in">
      <div
        className="w-16 h-16 rounded-2xl bg-premium-gradient flex items-center justify-center text-3xl shadow-glow-md mb-4"
        aria-hidden
      >
        🔧
      </div>
      <h2 className="text-xl font-bold mb-2">무엇이 궁금하신가요?</h2>
      <p className="text-sm text-white/50 mb-6 max-w-md">
        자동차 증상이나 점검 방법을 물어보세요.
        <br className="sm:hidden" />
        한국어로 전문가 수준의 답변을 드립니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        {SAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSelect(q)}
            className="text-left px-4 py-3 rounded-xl
                       bg-dark-800/60 border border-white/10
                       text-sm text-white/80
                       hover:bg-dark-800 hover:border-accent-500/40 hover:text-white
                       transition-all"
          >
            <span className="text-accent-400 mr-2" aria-hidden>
              💬
            </span>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 단일 메시지 말풍선 (사용자/AI/에러).
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm
                        bg-premium-gradient text-white
                        text-sm leading-relaxed shadow-soft">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === 'error') {
    return (
      <div className="flex justify-start animate-fade-in-up">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm
                        bg-red-900/40 border border-red-500/30
                        text-red-200 text-sm leading-relaxed">
          ⚠️ {message.content}
        </div>
      </div>
    );
  }

  // assistant
  return (
    <div className="flex flex-col items-start gap-3 animate-fade-in-up">
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm
                      bg-dark-800/80 border border-white/10
                      text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}
      </div>

      {/* 출처 카드 */}
      {message.sources && message.sources.length > 0 && (
        <div className="w-full grid gap-2">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-1">
            출처
          </p>
          {message.sources.map((src, idx) => (
            <SourceCard key={src.id} source={src} index={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 출처 카드 — [S1], [S2] 마커와 매핑.
 * description은 너무 길면 잘라서 보여줍니다.
 */
function SourceCard({
  source,
  index,
}: {
  source: JeongbidosaKnowledge;
  index: number;
}) {
  // 요약: description 80자 정도로 잘라 카드를 깔끔하게
  const preview =
    source.description.length > 80
      ? source.description.slice(0, 80) + '…'
      : source.description;

  // similarity는 0~1 → 백분율로 표시 (디버깅 + 신뢰도 단서)
  const sim =
    typeof source.similarity === 'number'
      ? `${Math.round(source.similarity * 100)}%`
      : null;

  return (
    <div className="px-3 py-2.5 rounded-xl
                    bg-dark-800/40 border border-white/5
                    hover:border-accent-500/30 transition">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[10px] font-bold text-accent-400 shrink-0">
          [S{index}]
        </span>
        <span className="text-xs font-semibold text-white/90 truncate">
          {source.term}
        </span>
        {sim && (
          <span className="ml-auto text-[10px] text-white/30 shrink-0">
            {sim}
          </span>
        )}
      </div>
      <p className="text-[11px] text-white/50 leading-relaxed">{preview}</p>
    </div>
  );
}

/**
 * 답변 생성 중일 때 점 3개 깜빡이는 인디케이터.
 */
function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm
                      bg-dark-800/80 border border-white/10">
        <div className="flex gap-1.5" aria-label="답변 생성 중">
          <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
