import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "에임 트레이너 - 마우스 정확도 테스트 | SLOX",
  description:
    "무료 에임 트레이너입니다. 나타나는 타겟을 최대한 빠르고 정확하게 클릭하세요! 발로란트, CS, 오버워치 게이머를 위한 에임 연습 도구.",
  keywords: [
    "에임 트레이너",
    "에임 테스트",
    "마우스 정확도",
    "aim trainer",
    "aim test",
    "발로란트 에임",
    "FPS 연습",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/aim",
    languages: {
      "ko": "https://www.slox.co.kr/aim",
      "en": "https://www.slox.co.kr/en/aim",
      "ja": "https://www.slox.co.kr/ja/aim",
      "zh": "https://www.slox.co.kr/zh/aim",
      "es": "https://www.slox.co.kr/es/aim",
      "pt": "https://www.slox.co.kr/pt/aim",
      "de": "https://www.slox.co.kr/de/aim",
      "fr": "https://www.slox.co.kr/fr/aim",
    },
  },
  openGraph: {
    title: "에임 트레이너 - 마우스 정확도 테스트 | SLOX",
    description: "무료 에임 트레이너. 당신의 에임 실력은?",
    url: "https://www.slox.co.kr/aim",
    locale: "ko_KR",
  },
};

export default function AimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

