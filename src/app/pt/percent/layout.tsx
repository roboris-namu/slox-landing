import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem | SLOX",
  description: "Calculadora de porcentagem gratis. Calcule porcentagens facilmente.",
  keywords: ["calculadora porcentagem", "percent calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/percent",
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
    locale: "pt_BR",
    url: "https://www.slox.co.kr/pt/percent",
    siteName: "SLOX",
    title: "Calculadora de Porcentagem | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

