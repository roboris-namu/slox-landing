import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day Rechner - Tagezahler | SLOX",
  description: "Kostenloser D-day Rechner. Tage bis zu einem Datum berechnen.",
  keywords: ["D-day Rechner", "Tagezahler", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/de/dday",
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
    locale: "de_DE",
    url: "https://www.slox.co.kr/de/dday",
    siteName: "SLOX",
    title: "D-day Rechner | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

