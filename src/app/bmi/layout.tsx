import type { Metadata } from "next";

/**
 * BMI 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "BMI 계산기 - 체질량지수 계산, 비만도 측정 | SLOX",
  description:
    "무료 BMI 계산기. 키와 체중을 입력하면 체질량지수(BMI)와 비만도를 바로 확인할 수 있습니다. 적정 체중 범위도 알려드립니다.",
  keywords: [
    "BMI 계산기",
    "체질량지수",
    "비만도 계산",
    "적정 체중",
    "BMI 측정",
    "체중 관리",
    "다이어트",
    "건강 관리",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/bmi",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/bmi",
    siteName: "SLOX",
    title: "BMI 계산기 - 체질량지수 계산 | SLOX",
    description:
      "무료 BMI 계산기. 키와 체중으로 비만도를 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI 계산기 | SLOX",
    description: "체질량지수(BMI)와 비만도를 바로 확인!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

