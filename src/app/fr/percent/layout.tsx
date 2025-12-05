import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur de Pourcentage | SLOX",
  description: "Calculateur de pourcentage gratuit. Calculez facilement.",
  keywords: ["calculateur pourcentage", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/percent",
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
    locale: "fr_FR",
    url: "https://www.slox.co.kr/fr/percent",
    siteName: "SLOX",
    title: "Calculateur de Pourcentage | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

