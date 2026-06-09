/**
 * SLOX 게임 ↔ 모바일 앱 매핑.
 *
 * 21~32번 게임은 slox.co.kr 의 웹 버전과 1:1로 대응하는 네이티브 앱이
 * App Store 에 출시되어 있다 (Play Store 는 출시 예정).
 *
 * 게임 페이지 상단의 슬림 다운로드 배너와 페이지 하단의 App Download
 * CTA 카드, 그리고 iOS Safari Smart App Banner 메타 태그에서 공통으로 사용.
 */

export interface AppLinkInfo {
  /** 라우트와 동일한 게임 코드 (예: 'cps'). */
  code: string;
  /** App Store 표기용 영문 이름. */
  name: string;
  /** App Store 숫자 ID. */
  iosAppId: string;
  /** Google Play 출시 시 채워질 패키지명. 현재는 미정 (출시 예정). */
  androidPackage?: string;
  /** 이모지 — CTA 카드 헤더에 사용. */
  icon: string;
}

export const APP_LINKS: Record<string, AppLinkInfo> = {
  reaction: { code: "reaction", name: "Reaction Test - SLOX", iosAppId: "6774714125", icon: "⚡" },
  cps: { code: "cps", name: "CPS Test - SLOX", iosAppId: "6776764644", icon: "🖱️" },
  typing: { code: "typing", name: "Typing Test - SLOX", iosAppId: "6776772068", icon: "⌨️" },
  quiz: { code: "quiz", name: "Trivia Quiz - SLOX", iosAppId: "6776777393", icon: "❓" },
  iq: { code: "iq", name: "IQ Test - SLOX", iosAppId: "6776782492", icon: "🧠" },
  sudoku: { code: "sudoku", name: "Sudoku - SLOX", iosAppId: "6776790512", icon: "🔢" },
  color: { code: "color", name: "Color Finder - SLOX", iosAppId: "6776802575", icon: "🎨" },
  "card-match": { code: "card-match", name: "Card Match - SLOX", iosAppId: "6776964094", icon: "🃏" },
  aim: { code: "aim", name: "Aim Trainer - SLOX", iosAppId: "6776975811", icon: "🎯" },
  memory: { code: "memory", name: "Memory Test - SLOX", iosAppId: "6777042091", icon: "🧩" },
  roulette: { code: "roulette", name: "Roulette - SLOX", iosAppId: "6777046687", icon: "🎡" },
  hub: { code: "hub", name: "SLOX Hub", iosAppId: "6774633446", icon: "🟣" },
};

export function getAppLink(code: string): AppLinkInfo | null {
  return APP_LINKS[code] ?? null;
}

export function iosStoreUrl(appId: string): string {
  return `https://apps.apple.com/app/id${appId}`;
}
