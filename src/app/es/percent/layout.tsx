import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentaje | SLOX",
  description: "Calculadora de porcentaje gratis. Calcula porcentajes facilmente.",
  keywords: ["calculadora porcentaje", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/es/percent",
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
    locale: "es_ES",
    url: "https://www.slox.co.kr/es/percent",
    siteName: "SLOX",
    title: "Calculadora de Porcentaje | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

