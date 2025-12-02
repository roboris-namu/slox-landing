import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "색상 찾기 게임 - 색각 테스트 | SLOX",
  description: "무료 색상 찾기 게임! 다른 색상 하나를 찾아보세요. 당신의 색각 능력은?",
  keywords: ["색상 찾기", "색각 테스트", "눈 테스트", "color blind test", "색맹 테스트"],
  alternates: {
    canonical: "https://www.slox.co.kr/color",
    languages: { "ko": "https://www.slox.co.kr/color", "en": "https://www.slox.co.kr/en/color", "ja": "https://www.slox.co.kr/ja/color", "zh": "https://www.slox.co.kr/zh/color", "es": "https://www.slox.co.kr/es/color", "pt": "https://www.slox.co.kr/pt/color", "de": "https://www.slox.co.kr/de/color", "fr": "https://www.slox.co.kr/fr/color" },
  },
  openGraph: { title: "색상 찾기 게임 | SLOX", description: "당신의 색각 능력은?", url: "https://www.slox.co.kr/color", locale: "ko_KR" },
};

export default function ColorLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


