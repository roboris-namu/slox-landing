import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パーセント計算機 - 百分率計算 | SLOX",
  description: "無料パーセント計算機。様々な百分率計算を簡単に。",
  keywords: ["パーセント計算機", "百分率計算", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/percent",
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
    locale: "ja_JP",
    url: "https://www.slox.co.kr/ja/percent",
    siteName: "SLOX",
    title: "パーセント計算機 | SLOX",
    description: "様々な百分率計算を簡単に！",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



