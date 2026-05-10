/**
 * MicButton - 음성 입력 버튼
 *
 * 동작:
 *   - 클릭 시 음성 인식 시작
 *   - 듣는 중 다시 클릭 시 즉시 중지
 *   - 인식 완료(또는 무음 5초) 시 onTranscript(text) 호출
 *   - 인식 중 실시간 텍스트는 onInterim(text) 으로 전달 (입력창 미리보기용)
 *
 * 시각 상태:
 *   - 평상시: 회색 마이크 + 호버 강조
 *   - 듣는 중: 빨간색 + 펄스 애니메이션 + 외곽 ping
 *   - 미지원: 회색 + disabled (툴팁으로 안내)
 */

'use client';

import { useSpeechInput } from '@/lib/jeongbidosa/useSpeechInput';

interface MicButtonProps {
  /** 음성 인식 최종 결과(말 끝맺음) 콜백 */
  onTranscript: (text: string) => void;
  /** 인식 중 실시간 결과 콜백 (입력창 미리보기용) */
  onInterim?: (text: string) => void;
  /** 외부에서 비활성화 시 (예: 답변 생성 중) */
  disabled?: boolean;
  /** 권한 거부/지원 안 함 등 에러를 상위에서 받고 싶을 때 */
  onError?: (message: string) => void;
}

export default function MicButton({
  onTranscript,
  onInterim,
  disabled,
  onError,
}: MicButtonProps) {
  const { isListening, isSupported, error, start, stop } = useSpeechInput({
    onFinal: onTranscript,
    onInterim,
  });

  // 에러가 새로 발생하면 상위로 전파 (페이지에서 토스트/배너로 표시)
  if (error && onError) onError(error);

  const handleClick = () => {
    if (disabled) return;
    if (isListening) {
      stop();
    } else {
      start();
    }
  };

  // 미지원 브라우저 처리: 버튼은 보이지만 비활성화 + title로 안내
  const unsupportedTitle = !isSupported
    ? '이 브라우저는 음성 인식을 지원하지 않아요'
    : undefined;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || !isSupported}
      aria-label={isListening ? '음성 인식 중지' : '음성으로 질문하기'}
      aria-pressed={isListening}
      title={unsupportedTitle}
      className={[
        // 모바일 터치 영역 확보 (44x44 이상)
        'relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
        'transition-all duration-200',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus:outline-none focus:ring-2 focus:ring-accent-500/40',
        // 상태별 색상
        isListening
          ? 'bg-red-500/90 text-white shadow-glow-md'
          : 'bg-dark-800/80 text-white/70 border border-white/10 hover:bg-dark-800 hover:text-white hover:border-accent-500/40 active:scale-95',
      ].join(' ')}
    >
      {/* 듣는 중 외곽 ping (시각 피드백) */}
      {isListening && (
        <span
          className="absolute inset-0 rounded-xl bg-red-500/40 animate-ping"
          aria-hidden
        />
      )}

      {/* 마이크 아이콘 (SVG - 외부 라이브러리 회피) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 relative ${isListening ? 'animate-pulse' : ''}`}
        aria-hidden
      >
        {/* 마이크 본체 */}
        <rect x="9" y="3" width="6" height="11" rx="3" />
        {/* 받침대 */}
        <path d="M19 11a7 7 0 0 1-14 0" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    </button>
  );
}
