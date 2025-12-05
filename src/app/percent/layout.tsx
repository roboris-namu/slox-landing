import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - 백분율, 비율 계산 | SLOX",
  description: "무료 퍼센트 계산기. 다양한 백분율 계산을 쉽게 하세요.",
  keywords: ["퍼센트 계산기", "백분율 계산", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/percent",
    languages: {
      ko: "https://www.slox.co.kr/percent",
      en: "https://www.slox.co.kr/en/percent",
      ja: "https://www.slox.co.kr/ja/percent",
      zh: "https://www.slox.co.kr/zh/percent",
      es: "https://www.slox.co.kr/es/percent",
      pt: "https://www.slox.co.kr/pt/percent",
      de: "https://www.slox.co.kr/de/percent",
      fr: "https://www.slox.co.kr/fr/percent",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/percent",
    siteName: "SLOX",
    title: "퍼센트 계산기 | SLOX",
    description: "다양한 백분율 계산을 쉽게!",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
