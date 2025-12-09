import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day 计算器 - 日期计算 | SLOX",
  description: "免费D-day计算器。计算到特定日期的天数。",
  keywords: ["D-day 计算器", "日期计算", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/dday",
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
    locale: "zh_CN",
    url: "https://www.slox.co.kr/zh/dday",
    siteName: "SLOX",
    title: "D-day 计算器 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



