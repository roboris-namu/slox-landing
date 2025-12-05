import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI-Rechner - Body-Mass-Index | SLOX",
  description:
    "Kostenloser BMI-Rechner. Geben Sie Ihre Größe und Ihr Gewicht ein, um Ihren BMI zu berechnen.",
  keywords: ["BMI-Rechner", "Body-Mass-Index", "Übergewicht", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/de/bmi",
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
    locale: "de_DE",
    url: "https://www.slox.co.kr/de/bmi",
    siteName: "SLOX",
    title: "BMI-Rechner | SLOX",
    description: "Kostenloser BMI-Rechner. Berechnen Sie Ihren Body-Mass-Index.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

