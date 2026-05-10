/**
 * TTSToggle - 답변 자동 읽기 토글 버튼
 *
 * - ON 상태에서 AI 답변이 도착하면 자동으로 한국어 TTS 재생
 * - OFF 면 텍스트로만 표시 (조용한 환경 대응)
 * - localStorage 'jeongbidosa.tts.enabled' 키에 사용자 선택 저장
 *   → 다음 방문 시 동일 설정 유지
 *
 * 디자인:
 *   - 헤더 우측에 들어갈 작은 아이콘 버튼
 *   - ON: 액센트 색상 + 스피커 아이콘
 *   - OFF: 회색 + 음소거 표시
 */

'use client';

interface TTSToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  /** TTS 미지원 환경에서는 버튼을 숨기는 게 깔끔 */
  isSupported?: boolean;
}

export default function TTSToggle({
  enabled,
  onChange,
  isSupported = true,
}: TTSToggleProps) {
  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      aria-label={enabled ? '음성 자동 읽기 끄기' : '음성 자동 읽기 켜기'}
      aria-pressed={enabled}
      title={enabled ? '음성 자동 읽기 ON' : '음성 자동 읽기 OFF'}
      className={[
        'shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent-500/40',
        enabled
          ? 'bg-accent-500/20 text-accent-300 border border-accent-500/40 shadow-glow-sm'
          : 'bg-dark-800/60 text-white/50 border border-white/10 hover:text-white/80',
      ].join(' ')}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden
      >
        {/* 스피커 본체 (공통) */}
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {enabled ? (
          // 음파 두 개 (ON)
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          // 사선 (OFF, 음소거)
          <>
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
