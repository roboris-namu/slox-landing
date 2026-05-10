/**
 * /jeongbidosa - 정비도사 채팅 페이지
 *
 * 기능:
 *   - 텍스트 질문 + 음성 질문(STT) + 답변 자동 읽기(TTS)
 *   - POST /api/jeongbidosa/query → RAG 답변
 *   - 예시 질문 4개 (시연용)
 *   - 답변 하단 출처 카드 ([S1], [S2] 매핑)
 *
 * 핸즈프리 흐름:
 *   1) 마이크 버튼 클릭 → 한국어 음성 인식 시작
 *   2) 발화 종료 시 입력창에 자동 입력 + 자동 전송
 *   3) 답변 도착 → TTS ON 이면 자동으로 한국어 읽기
 */

'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import MicButton from '@/components/jeongbidosa/MicButton';
import TTSToggle from '@/components/jeongbidosa/TTSToggle';
import { useSpeechOutput } from '@/lib/jeongbidosa/useSpeechOutput';
import type {
  ApiErrorResponse,
  JeongbidosaKnowledge,
  QueryResponse,
} from '@/lib/jeongbidosa/types';

// ----------------------------------------------------------------------------
// 채팅 메시지 타입
// ----------------------------------------------------------------------------
type ChatMessage =
  | { id: string; role: 'user'; content: string }
  | {
      id: string;
      role: 'assistant';
      content: string;
      sources?: JeongbidosaKnowledge[];
    }
  | { id: string; role: 'error'; content: string };

// 시연 매칭 보장된 예시 질문 (Step 2 데이터와 1:1 매핑)
const SAMPLE_QUESTIONS = [
  '엔진에서 딸깍 소리가 나요',
  '브레이크가 밀려요',
  '배터리가 자주 방전돼요',
  '엔진오일 교체 주기 알려주세요',
] as const;

// localStorage 키 - 음성 자동 읽기 설정
const TTS_LS_KEY = 'jeongbidosa.tts.enabled';
// localStorage 키 - 첫 방문 음성 안내 표시 여부
const VOICE_HINT_LS_KEY = 'jeongbidosa.voiceHintDismissed';

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function JeongbidosaPage() {
  // ---- 채팅 상태 ----------------------------------------------------------
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // ---- 음성 입력 관련 -----------------------------------------------------
  // 듣는 중 시각 피드백을 위해 페이지에서도 isListening 상태 추적
  const [isListening, setIsListening] = useState(false);
  // MicButton에서 올라오는 에러 (권한 거부, 네트워크 등)
  const [voiceError, setVoiceError] = useState<string | null>(null);
  // 음성 인식 중 실시간 텍스트 (입력창에 미리보기)
  const [interim, setInterim] = useState('');

  // ---- 음성 출력 (TTS) ---------------------------------------------------
  const tts = useSpeechOutput();
  const [ttsEnabled, setTtsEnabled] = useState(false); // 초기는 false (SSR 안전)
  // localStorage 동기화는 마운트 후 effect에서.
  // 사용자 제스처 없이 첫 speak가 막히는 브라우저 대응을 위해 상태 분리.

  // ---- 첫 방문 음성 안내 --------------------------------------------------
  const [showVoiceHint, setShowVoiceHint] = useState(false);

  // ---- 자동 스크롤 --------------------------------------------------------
  const scrollRef = useRef<HTMLDivElement>(null);

  // ---- 마운트 시 localStorage 동기화 -------------------------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TTS_LS_KEY);
      if (saved === '1') setTtsEnabled(true);
    } catch {
      // 시크릿 모드 등에서 localStorage 접근 실패 가능 - 무시
    }
    try {
      const dismissed = localStorage.getItem(VOICE_HINT_LS_KEY);
      if (!dismissed) setShowVoiceHint(true);
    } catch {
      // ignore
    }
  }, []);

  // ttsEnabled 변경 시 localStorage 저장
  useEffect(() => {
    try {
      localStorage.setItem(TTS_LS_KEY, ttsEnabled ? '1' : '0');
    } catch {
      // ignore
    }
  }, [ttsEnabled]);

  // 메시지 추가될 때마다 하단으로 스크롤
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading, isListening]);

  // --------------------------------------------------------------------------
  // 질문 전송
  // useCallback으로 감싸 MicButton.onTranscript ref 안정화
  // --------------------------------------------------------------------------
  const sendQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || loading) return;

      // 사용자 메시지 즉시 추가
      const userMessage: ChatMessage = {
        id: makeId(),
        role: 'user',
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setInterim('');
      setLoading(true);

      try {
        const res = await fetch('/api/jeongbidosa/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: trimmed }),
        });

        if (!res.ok) {
          const errData = (await res
            .json()
            .catch(() => ({}))) as Partial<ApiErrorResponse>;
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

        // TTS ON 이면 한국어로 답변 읽기 (출처 마커 등은 훅 안에서 자동 정리)
        if (ttsEnabled && tts.isSupported) {
          tts.speak(data.answer);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setMessages((prev) => [
          ...prev,
          { id: makeId(), role: 'error', content: message },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, ttsEnabled, tts],
  );

  // --------------------------------------------------------------------------
  // 음성 인식 콜백
  // --------------------------------------------------------------------------
  // 발화 종료 시 자동 전송 (핸즈프리 핵심 UX)
  const handleVoiceFinal = useCallback(
    (text: string) => {
      setInterim('');
      setIsListening(false);
      // 사용자가 직접 입력란에 추가 텍스트를 친 경우 함께 전송
      const merged = (input.trim() ? input.trim() + ' ' : '') + text;
      sendQuestion(merged);
    },
    [input, sendQuestion],
  );

  // 인식 중 실시간 텍스트는 입력창 placeholder 영역 미리보기로
  const handleVoiceInterim = useCallback((text: string) => {
    setInterim(text);
    // isListening 갱신 (인식 콜백이 들어오기 시작 = 듣는 중)
    setIsListening(true);
  }, []);

  // --------------------------------------------------------------------------
  // 폼 제출 (텍스트 입력)
  // --------------------------------------------------------------------------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendQuestion(input);
  }

  // --------------------------------------------------------------------------
  // 새 대화 (헤더 버튼)
  // --------------------------------------------------------------------------
  function handleNewChat() {
    if (loading) return;
    tts.stop(); // 진행 중 TTS 중단
    setMessages([]);
    setInput('');
    setInterim('');
    setVoiceError(null);
  }

  // --------------------------------------------------------------------------
  // 첫 방문 안내 닫기
  // --------------------------------------------------------------------------
  function dismissVoiceHint() {
    setShowVoiceHint(false);
    try {
      localStorage.setItem(VOICE_HINT_LS_KEY, '1');
    } catch {
      // ignore
    }
  }

  // --------------------------------------------------------------------------
  // 렌더링
  // --------------------------------------------------------------------------
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-dark-950/70 border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 flex-1 min-w-0 group"
            aria-label="SLOX 메인으로 이동"
          >
            <div
              className="w-10 h-10 rounded-xl bg-premium-gradient flex items-center justify-center text-xl shadow-glow-sm group-hover:shadow-glow-md transition-shadow shrink-0"
              aria-hidden
            >
              🔧
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight truncate">정비도사</h1>
              <p className="text-xs text-white/50 truncate">AI 자동차 정비 챗봇</p>
            </div>
          </Link>

          {/* TTS 토글 */}
          <TTSToggle
            enabled={ttsEnabled}
            onChange={setTtsEnabled}
            isSupported={tts.isSupported}
          />

          {/* 새 대화 */}
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleNewChat}
              disabled={loading}
              className="px-3 py-2 rounded-lg text-xs font-medium
                         bg-dark-800/60 border border-white/10
                         text-white/70 hover:text-white hover:border-accent-500/40
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors shrink-0"
              aria-label="새 대화 시작"
              title="새 대화 시작"
            >
              <span aria-hidden>↻</span>
              <span className="ml-1 hidden sm:inline">새 대화</span>
            </button>
          )}
        </div>
      </header>

      {/* 채팅 영역 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {/* 첫 방문 음성 안내 */}
          {showVoiceHint && (
            <VoiceHintBanner onDismiss={dismissVoiceHint} />
          )}

          {/* 음성 권한 거부 등 에러 배너 */}
          {voiceError && (
            <VoiceErrorBanner
              message={voiceError}
              onDismiss={() => setVoiceError(null)}
            />
          )}

          {/* 빈 상태 */}
          {messages.length === 0 && <EmptyState onSelect={sendQuestion} />}

          {/* 메시지 리스트 */}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onSpeak={(text) => tts.speak(text)}
              onStopSpeak={tts.stop}
              isSpeaking={tts.isSpeaking}
              ttsSupported={tts.isSupported}
            />
          ))}

          {/* 로딩 인디케이터 */}
          {loading && <TypingIndicator />}

          {/* 음성 인식 중 미리보기 */}
          {isListening && (
            <ListeningIndicator interimText={interim} />
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      <footer className="sticky bottom-0 backdrop-blur-md bg-dark-950/80 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <form onSubmit={handleSubmit} className="flex gap-2 items-stretch">
            {/* 마이크 버튼 (왼쪽) */}
            <MicButton
              onTranscript={handleVoiceFinal}
              onInterim={handleVoiceInterim}
              onError={setVoiceError}
              disabled={loading}
            />

            <input
              type="text"
              value={isListening && interim ? interim : input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isListening
                  ? '듣고 있어요...'
                  : '정비 관련 질문을 입력하거나 마이크를 눌러주세요'
              }
              disabled={loading || isListening}
              className={[
                'flex-1 px-4 py-3 rounded-xl bg-dark-800/80',
                'text-white placeholder:text-white/30',
                'focus:outline-none focus:ring-2 transition',
                'disabled:opacity-70',
                isListening
                  ? 'border border-red-500/60 ring-2 ring-red-500/20 animate-pulse'
                  : 'border border-white/10 focus:border-accent-500/60 focus:ring-accent-500/20',
              ].join(' ')}
              aria-label="질문 입력"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || isListening}
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
// 하위 컴포넌트 (단일 페이지 응집)
// ============================================================================

/**
 * 첫 방문 시 보여주는 음성 기능 안내 배너.
 * dismiss 시 localStorage에 저장되어 다시 안 뜸.
 */
function VoiceHintBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="px-4 py-3 rounded-xl border border-accent-500/30 bg-accent-500/10 animate-fade-in flex items-start gap-3">
      <span className="text-lg shrink-0" aria-hidden>
        💡
      </span>
      <div className="flex-1 text-xs leading-relaxed text-white/80">
        <strong className="text-accent-300">마이크 버튼</strong>을 눌러 음성으로 질문할 수 있어요.
        <br />
        현장에서 손이 자유롭지 않을 때 유용해요. 답변도 음성으로 들으려면 우측 상단의 <strong className="text-accent-300">자동읽기</strong> 버튼을 켜주세요.
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-white/40 hover:text-white shrink-0 px-1 text-sm"
        aria-label="안내 닫기"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * 음성 인식 권한 거부 등 에러를 보여주는 배너.
 */
function VoiceErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 animate-fade-in flex items-start gap-3">
      <span className="text-lg shrink-0" aria-hidden>
        🎙️
      </span>
      <div className="flex-1 text-xs leading-relaxed text-red-200/90">
        {message}
        <br />
        <span className="text-white/50">텍스트로도 질문하실 수 있어요.</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-white/40 hover:text-white shrink-0 px-1 text-sm"
        aria-label="안내 닫기"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * 빈 화면 - 환영 + 예시 질문 4개.
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
 * 단일 메시지 말풍선.
 * AI 답변 메시지에는 "다시 듣기" 버튼이 같이 보입니다.
 */
function MessageBubble({
  message,
  onSpeak,
  onStopSpeak,
  isSpeaking,
  ttsSupported,
}: {
  message: ChatMessage;
  onSpeak: (text: string) => void;
  onStopSpeak: () => void;
  isSpeaking: boolean;
  ttsSupported: boolean;
}) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm bg-premium-gradient text-white text-sm leading-relaxed shadow-soft">
          {message.content}
        </div>
      </div>
    );
  }

  if (message.role === 'error') {
    return (
      <div className="flex justify-start animate-fade-in-up">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-red-900/40 border border-red-500/30 text-red-200 text-sm leading-relaxed">
          ⚠️ {message.content}
        </div>
      </div>
    );
  }

  // assistant
  return (
    <div className="flex flex-col items-start gap-3 animate-fade-in-up">
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-dark-800/80 border border-white/10 text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
        {message.content}

        {/* 다시 듣기 버튼 (TTS 지원 환경에서만) */}
        {ttsSupported && (
          <button
            type="button"
            onClick={() =>
              isSpeaking ? onStopSpeak() : onSpeak(message.content)
            }
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-white/40 hover:text-accent-300 transition"
            aria-label={isSpeaking ? '읽기 중지' : '답변 다시 듣기'}
          >
            <span aria-hidden>{isSpeaking ? '■' : '▶'}</span>
            <span>{isSpeaking ? '중지' : '다시 듣기'}</span>
          </button>
        )}
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

function SourceCard({
  source,
  index,
}: {
  source: JeongbidosaKnowledge;
  index: number;
}) {
  const preview =
    source.description.length > 80
      ? source.description.slice(0, 80) + '…'
      : source.description;
  const sim =
    typeof source.similarity === 'number'
      ? `${Math.round(source.similarity * 100)}%`
      : null;

  return (
    <div className="px-3 py-2.5 rounded-xl bg-dark-800/40 border border-white/5 hover:border-accent-500/30 transition">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[10px] font-bold text-accent-400 shrink-0">
          [S{index}]
        </span>
        <span className="text-xs font-semibold text-white/90 truncate">
          {source.term}
        </span>
        {sim && (
          <span className="ml-auto text-[10px] text-white/30 shrink-0">{sim}</span>
        )}
      </div>
      <p className="text-[11px] text-white/50 leading-relaxed">{preview}</p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-dark-800/80 border border-white/10">
        <div className="flex gap-1.5" aria-label="답변 생성 중">
          <span
            className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 음성 인식 중 표시되는 인디케이터 + 실시간 텍스트.
 */
function ListeningIndicator({ interimText }: { interimText: string }) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm bg-red-500/10 border border-red-500/30 text-white/80 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-red-300 font-semibold tracking-wider uppercase">
            듣는 중
          </span>
        </div>
        <p className="text-white/70 italic min-h-[1.25rem]">
          {interimText || '말씀해주세요…'}
        </p>
      </div>
    </div>
  );
}
