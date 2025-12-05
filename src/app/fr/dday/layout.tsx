import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur D-day - Compteur de Jours | SLOX",
  description: "Calculateur D-day gratuit. Comptez les jours jusqu'a une date.",
  keywords: ["calculateur D-day", "compteur jours", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/dday",
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
    locale: "fr_FR",
    url: "https://www.slox.co.kr/fr/dday",
    siteName: "SLOX",
    title: "Calculateur D-day | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

