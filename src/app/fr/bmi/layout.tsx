import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculateur IMC - Indice de Masse Corporelle | SLOX",
  description:
    "Calculateur IMC gratuit. Entrez votre taille et poids pour verifier votre indice de masse corporelle.",
  keywords: ["calculateur IMC", "indice de masse corporelle", "obesite", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/bmi",
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
    locale: "fr_FR",
    url: "https://www.slox.co.kr/fr/bmi",
    siteName: "SLOX",
    title: "Calculateur IMC | SLOX",
    description: "Calculateur IMC gratuit. Verifiez votre indice de masse corporelle.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



