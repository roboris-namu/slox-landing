import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day Calculator - Date Counter | SLOX",
  description: "Free D-day calculator. Count days until or since a specific date.",
  keywords: ["D-day calculator", "date counter", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/dday",
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
    locale: "en_US",
    url: "https://www.slox.co.kr/en/dday",
    siteName: "SLOX",
    title: "D-day Calculator | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



