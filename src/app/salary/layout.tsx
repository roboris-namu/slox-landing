import type { Metadata } from "next";

/**
 * 연봉 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "2025 연봉 실수령액 계산기 - 4대보험, 소득세 자동 계산",
  description:
    "2025년 최신 기준 연봉 실수령액 계산기입니다. 4대보험(국민연금, 건강보험, 고용보험, 장기요양보험)과 소득세, 지방소득세를 자동으로 계산하여 월 실수령액을 확인하세요.",
  keywords: [
    "연봉 실수령액",
    "연봉 계산기",
    "2025 연봉 계산기",
    "월급 실수령액",
    "4대보험 계산",
    "소득세 계산",
    "실수령액 계산기",
    "연봉 세금 계산",
    "월급 계산기",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/salary",
    siteName: "SLOX",
    title: "2025 연봉 실수령액 계산기 - 4대보험, 소득세 자동 계산",
    description:
      "2025년 최신 기준 연봉 실수령액 계산기. 4대보험과 소득세를 자동 계산하여 정확한 월 실수령액을 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "2025 연봉 실수령액 계산기",
    description:
      "4대보험과 소득세를 반영한 정확한 연봉 실수령액을 계산해보세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

