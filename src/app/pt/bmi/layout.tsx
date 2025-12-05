import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC - Índice de Massa Corporal | SLOX",
  description:
    "Calculadora de IMC grátis. Insira sua altura e peso para verificar seu índice de massa corporal.",
  keywords: ["calculadora IMC", "índice de massa corporal", "obesidade", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/bmi",
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
    locale: "pt_BR",
    url: "https://www.slox.co.kr/pt/bmi",
    siteName: "SLOX",
    title: "Calculadora de IMC | SLOX",
    description: "Calculadora de IMC grátis. Verifique seu índice de massa corporal.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

