/**
 * Web Speech API ambient 타입 선언
 *
 * 왜 필요한가:
 *   - SpeechRecognition은 W3C 표준이 아닌 Web Speech API 사양으로,
 *     TypeScript lib.dom.d.ts 에 안정적으로 포함돼있지 않습니다.
 *   - 로컬 next dev (SWC) 는 누락을 관대하게 넘기지만,
 *     Vercel 프로덕션 빌드 (tsc) 는 "Cannot find name 'SpeechRecognition'" 으로
 *     실패합니다.
 *   - 이 파일은 우리 코드가 사용하는 멤버만 정확히 선언해 빌드 깨짐을 막습니다.
 *
 * tsconfig.json 의 include 패턴 "** /*.ts" 가 .d.ts 도 포함하므로
 * 별도 import 없이 자동으로 글로벌 타입이 됩니다.
 *
 * 기존 lib.dom.d.ts 와 부분적으로 겹쳐도 interface 머지로 안전하며,
 * tsconfig 의 skipLibCheck=true 설정도 받쳐줍니다.
 */

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  /** 에러 코드 ('not-allowed', 'no-speech', 'network', 'aborted' 등) */
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  /** 한 발화 후 자동 종료(false) vs 계속 듣기(true) */
  continuous: boolean;
  /** 인식 중간 결과(interim) 도 onresult 로 전달할지 */
  interimResults: boolean;
  /** BCP-47 언어 태그. 한국어는 'ko-KR' */
  lang: string;
  /** 결과 후보 최대 개수 */
  maxAlternatives: number;

  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown)
    | null;
  onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;

  /** 즉시 중단 (현재까지 결과를 onend 에서 final 로 받지 않을 수 있음) */
  abort(): void;
  /** 인식 시작 — 사용자 제스처 컨텍스트에서 호출 권장 */
  start(): void;
  /** 부드러운 종료 — 현재까지 결과는 final 로 정리됨 */
  stop(): void;
}

// 일반적으로는 lib.dom.d.ts 패턴인 `declare var` 를 쓰지만,
// 이 프로젝트의 ESLint 설정(no-var)이 .d.ts 에서도 적용되므로 const 로 선언.
// 우리는 SpeechRecognition 생성자 자체를 재할당하지 않기 때문에 const 로 안전.
declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

// Window 객체에 SpeechRecognition + 벤더 prefix(webkitSpeechRecognition) 추가
interface Window {
  /** 표준 (Chrome/Edge 최신, Safari 17+) */
  SpeechRecognition?: typeof SpeechRecognition;
  /** vendor-prefixed 폴백 (구버전 Chrome, Safari) */
  webkitSpeechRecognition?: typeof SpeechRecognition;
}
