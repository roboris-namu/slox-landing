import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "百分比计算器 - 百分比计算 | SLOX",
  description: "免费百分比计算器。轻松计算各种百分比。",
  keywords: ["百分比计算器", "百分比计算", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/percent",
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
    locale: "zh_CN",
    url: "https://www.slox.co.kr/zh/percent",
    siteName: "SLOX",
    title: "百分比计算器 | SLOX",
    description: "轻松计算各种百分比！",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

