import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator - Body Mass Index | SLOX",
  description:
    "Free BMI Calculator. Enter your height and weight to check your Body Mass Index and weight status.",
  keywords: ["BMI calculator", "body mass index", "obesity calculator", "weight calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/bmi",
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
    locale: "en_US",
    url: "https://www.slox.co.kr/en/bmi",
    siteName: "SLOX",
    title: "BMI Calculator | SLOX",
    description: "Free BMI Calculator. Check your body mass index easily.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

