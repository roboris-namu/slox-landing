import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI计算器 - 身体质量指数 | SLOX",
  description:
    "免费BMI计算器。输入身高体重，即可查看身体质量指数和肥胖程度。",
  keywords: ["BMI计算器", "身体质量指数", "肥胖度", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/bmi",
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
    locale: "zh_CN",
    url: "https://www.slox.co.kr/zh/bmi",
    siteName: "SLOX",
    title: "BMI计算器 | SLOX",
    description: "免费BMI计算器。查看您的身体质量指数。",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

