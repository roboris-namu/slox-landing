/**
 * TTSToggle - 답변 자동 읽기 토글 버튼
 *
 * 디자인 결정:
 *   - OFF 표시에 X 사선을 쓰지 않습니다.
 *     X 사선은 일반적으로 "차단/음소거/금지"를 의미해서, 사용자가
 *     "정비도사 자체가 음소거됐다"고 오해할 수 있기 때문입니다.
 *   - 대신 음파(파동선) 유무로 ON/OFF 를 구분합니다.
 *   - sm 브레이크포인트 이상에서는 텍스트 라벨("자동읽기 ON/OFF") 동반.
 *   - 색상 대비도 강하게 (ON=accent 글로우, OFF=회색).
 *
 * 동작:
 *   - 클릭마다 enabled 토글
 *   - 상위 페이지에서 localStorage 영속화
 *   - TTS 미지원 환경에서는 아예 렌더링하지 않음
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
      aria-label={enabled ? '답변 자동 읽기 끄기' : '답변 자동 읽기 켜기'}
      aria-pressed={enabled}
      title={
        enabled
          ? '답변을 음성으로 읽어줍니다 (클릭 시 끄기)'
          : '답변을 음성으로 읽지 않습니다 (클릭 시 켜기)'
      }
      className={[
        // 기본 형태 (아이콘만일 때 정사각, 텍스트 동반 시 가로로 늘어남)
        'shrink-0 h-10 rounded-lg flex items-center justify-center gap-1.5',
        'px-2.5 sm:px-3',
        'text-xs font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent-500/40',
        enabled
          ? 'bg-accent-500/20 text-accent-300 border border-accent-500/40 shadow-glow-sm'
          : 'bg-dark-800/60 text-white/50 border border-white/10 hover:text-white/80',
      ].join(' ')}
    >
      {/* 스피커 아이콘 */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 shrink-0"
        aria-hidden
      >
        {/* 스피커 본체 (공통) */}
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {enabled && (
          // ON 일 때만 음파 두 줄 표시. OFF 일 때는 본체만 (사선/음소거 X)
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        )}
      </svg>

      {/* 데스크톱(sm 이상)에서 텍스트 라벨 - 의미 명확화 */}
      <span className="hidden sm:inline whitespace-nowrap">
        {enabled ? '자동읽기 ON' : '자동읽기 OFF'}
      </span>
    </button>
  );
}
