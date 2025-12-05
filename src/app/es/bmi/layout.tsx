import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC - Índice de Masa Corporal | SLOX",
  description:
    "Calculadora de IMC gratis. Ingresa tu altura y peso para verificar tu índice de masa corporal.",
  keywords: ["calculadora IMC", "índice de masa corporal", "obesidad", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/es/bmi",
    languages: {
      ko: "https://www.slox.co.kr/bmi",
      en: "https://www.slox.co.kr/en/bmi",
      ja: "https://www.slox.co.kr/ja/bmi",
      zh: "https://www.slox.co.kr/zh/bmi",
      es: "https://www.slox.co.kr/es/bmi",
      pt: "https://www.slox.co.kr/pt/bmi",
      de: "https://www.slox.co.kr/de/bmi",
      fr: "https://www.slox.co.kr/fr/bmi",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.slox.co.kr/es/bmi",
    siteName: "SLOX",
    title: "Calculadora de IMC | SLOX",
    description: "Calculadora de IMC gratis. Verifica tu índice de masa corporal.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

