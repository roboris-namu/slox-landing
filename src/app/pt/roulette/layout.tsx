import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "룰렛 예측 게임 - Lucky Roulette | SLOX",
  description:
    "룰렛 휠이 어디에 멈출지 예측하세요. 색깔, 홀짝, 다스, 단일 숫자 예측. 연속 적중 시 콤보 배수로 점수 폭발! 글로벌 랭킹 도전.",
  keywords: [
    "룰렛",
    "룰렛 게임",
    "lucky roulette",
    "예측 게임",
    "콤보 게임",
    "운 게임",
    "ranking game",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/roulette",
    languages: {
      ko: "https://www.slox.co.kr/roulette",
      en: "https://www.slox.co.kr/en/roulette",
      ja: "https://www.slox.co.kr/ja/roulette",
      zh: "https://www.slox.co.kr/zh/roulette",
      es: "https://www.slox.co.kr/es/roulette",
      pt: "https://www.slox.co.kr/pt/roulette",
      de: "https://www.slox.co.kr/de/roulette",
      fr: "https://www.slox.co.kr/fr/roulette",
    },
  },
  openGraph: {
    title: "Lucky Roulette - 룰렛 예측 게임 | SLOX",
    description: "룰렛 휠 예측으로 점수 도전! 콤보를 쌓아 글로벌 랭킹 1위에.",
    url: "https://www.slox.co.kr/roulette",
    locale: "ko_KR",
  },
};

export default function RouletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
