import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Percent, Ratio Calculator | SLOX",
  description: "Free percentage calculator. Calculate various percentages easily.",
  keywords: ["percentage calculator", "percent calculator", "ratio calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/percent",
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
    locale: "en_US",
    url: "https://www.slox.co.kr/en/percent",
    siteName: "SLOX",
    title: "Percentage Calculator | SLOX",
    description: "Calculate various percentages easily!",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

