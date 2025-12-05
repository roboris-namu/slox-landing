import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day 계산기 - 날짜 계산, 기념일 계산 | SLOX",
  description: "무료 D-day 계산기. 남은 일수, 지난 일수를 계산하세요.",
  keywords: ["D-day 계산기", "디데이 계산", "dday calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/dday",
    languages: {
      ko: "https://www.slox.co.kr/dday",
      en: "https://www.slox.co.kr/en/dday",
      ja: "https://www.slox.co.kr/ja/dday",
      zh: "https://www.slox.co.kr/zh/dday",
      es: "https://www.slox.co.kr/es/dday",
      pt: "https://www.slox.co.kr/pt/dday",
      de: "https://www.slox.co.kr/de/dday",
      fr: "https://www.slox.co.kr/fr/dday",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/dday",
    siteName: "SLOX",
    title: "D-day 계산기 | SLOX",
    description: "무료 D-day 계산기. 남은 일수를 계산하세요.",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
