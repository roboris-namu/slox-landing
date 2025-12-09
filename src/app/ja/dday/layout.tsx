import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day 計算機 - 日数計算 | SLOX",
  description: "無料D-day計算機。特定の日までの日数を計算。",
  keywords: ["D-day 計算機", "日数計算", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/dday",
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
    locale: "ja_JP",
    url: "https://www.slox.co.kr/ja/dday",
    siteName: "SLOX",
    title: "D-day 計算機 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



