/**
 * Web Speech API 호환성 헬퍼
 *
 * 두 가지 API를 다룹니다:
 *   - SpeechRecognition (음성 → 텍스트)
 *   - SpeechSynthesis (텍스트 → 음성, TTS)
 *
 * 둘 다 브라우저 기본 제공이라 외부 라이브러리/비용 없이 동작합니다.
 *
 * 호환성 주의:
 *   - SpeechRecognition: Chrome/Edge/Safari 17+ 지원, Firefox 미지원
 *   - SpeechSynthesis: 거의 모든 브라우저 지원
 *   - HTTPS 또는 localhost 에서만 동작 (https://slox.co.kr 은 OK)
 *   - iOS Safari/PWA에서는 동작이 불안정할 수 있음
 */

// ----------------------------------------------------------------------------
// TypeScript 타입 보강
// ----------------------------------------------------------------------------
//
// lib.dom.d.ts 에는 SpeechRecognition 타입이 정의되어 있지만,
// `window.webkitSpeechRecognition` 같은 vendor prefix는 누락되어 있습니다.
// 여기서 그 부분만 보충합니다.

declare global {
  interface Window {
    /** Safari/구버전 Chrome 호환용 vendor-prefixed 생성자 */
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

// ----------------------------------------------------------------------------
// 호환성 체크
// ----------------------------------------------------------------------------

/**
 * 음성 인식(STT) 지원 여부.
 * SSR 환경에서도 안전하게 호출되도록 typeof window 가드.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * 음성 합성(TTS) 지원 여부.
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

/**
 * 사용 가능한 SpeechRecognition 클래스 반환.
 * 브라우저별 prefix를 자동으로 처리합니다.
 *
 * @returns 생성자 또는 null (미지원 시)
 */
export function getSpeechRecognitionCtor(): typeof SpeechRecognition | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

// ----------------------------------------------------------------------------
// TTS 텍스트 전처리
// ----------------------------------------------------------------------------

/**
 * AI 답변을 TTS로 읽기 좋게 정리합니다.
 *
 * 처리 내용:
 *   - [S1], [S2] 같은 출처 마커 제거 (읽으면 어색함)
 *   - 마크다운/특수기호 일부 정리
 *   - 너무 길면 절단 (TTS는 너무 긴 텍스트를 끊어 읽으므로 적정 길이로)
 *
 * ①②③ 같은 원문자는 한국어 TTS가 자연스럽게 "첫째/둘째/셋째" 비슷하게
 * 읽어주므로 그대로 둡니다 (변환하면 오히려 어색해질 수 있음 - 음성 엔진 차이).
 *
 * @param text 원본 답변
 * @param maxLength 최대 글자 수 (기본 300)
 */
export function preprocessForSpeech(text: string, maxLength = 300): string {
  let cleaned = text
    // [S1], [S2], [S10] 등 출처 마커 제거 (앞뒤 공백도 정리)
    .replace(/\s*\[S\d+\]\s*/g, ' ')
    // 마크다운 강조 기호 제거
    .replace(/[*_`]+/g, '')
    // 연속된 공백/개행 정리
    .replace(/\s+/g, ' ')
    .trim();

  // 길이 제한 (문장 경계 고려: 마침표/물음표/느낌표 뒤에서 자르기)
  if (cleaned.length > maxLength) {
    const slice = cleaned.slice(0, maxLength);
    const lastBreak = Math.max(
      slice.lastIndexOf('.'),
      slice.lastIndexOf('?'),
      slice.lastIndexOf('!'),
      slice.lastIndexOf('。'),
    );
    cleaned = lastBreak > 100 ? slice.slice(0, lastBreak + 1) : slice + '…';
  }

  return cleaned;
}
