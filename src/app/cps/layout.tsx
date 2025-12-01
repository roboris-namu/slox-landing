import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPS 테스트 - 클릭 속도 측정, 초당 클릭 수 | SLOX",
  description:
    "무료 CPS 테스트입니다. 1초, 5초, 10초 동안 최대한 빠르게 클릭하세요! 지터 클릭, 버터플라이 클릭으로 높은 CPS에 도전하세요.",
  keywords: [
    "CPS 테스트",
    "클릭 속도",
    "초당 클릭",
    "클릭 테스트",
    "지터 클릭",
    "버터플라이 클릭",
    "마인크래프트 CPS",
    "cps test",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/cps",
    languages: {
      "ko": "https://www.slox.co.kr/cps",
      "en": "https://www.slox.co.kr/en/cps",
      "ja": "https://www.slox.co.kr/ja/cps",
      "zh": "https://www.slox.co.kr/zh/cps",
      "es": "https://www.slox.co.kr/es/cps",
      "pt": "https://www.slox.co.kr/pt/cps",
      "de": "https://www.slox.co.kr/de/cps",
      "fr": "https://www.slox.co.kr/fr/cps",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/cps",
    siteName: "SLOX",
    title: "CPS 테스트 - 클릭 속도 측정",
    description: "무료 CPS 테스트. 당신의 초당 클릭 수는?",
  },
};

export default function CpsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

