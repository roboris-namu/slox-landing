import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI 계산기 - 체질량지수 계산, 비만도 측정 | SLOX",
  description:
    "무료 BMI 계산기. 키와 체중을 입력하면 체질량지수(BMI)와 비만도를 바로 확인할 수 있습니다.",
  keywords: ["BMI 계산기", "체질량지수", "비만도 계산", "BMI calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/bmi",
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
    locale: "ko_KR",
    url: "https://www.slox.co.kr/bmi",
    siteName: "SLOX",
    title: "BMI 계산기 | SLOX",
    description: "무료 BMI 계산기. 키와 체중으로 비만도를 확인하세요.",
  },
  robots: { index: true, follow: true },
};

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
