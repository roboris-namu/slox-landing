import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI計算機 - 体重指数計算 | SLOX",
  description:
    "無料BMI計算機。身長と体重を入力すると、BMIと肥満度を確認できます。",
  keywords: ["BMI計算機", "体重指数", "肥満度", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/bmi",
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
    locale: "ja_JP",
    url: "https://www.slox.co.kr/ja/bmi",
    siteName: "SLOX",
    title: "BMI計算機 | SLOX",
    description: "無料BMI計算機。身長と体重でBMIを確認。",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

