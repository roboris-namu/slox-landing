import type { Metadata } from "next";

/**
 * D-day 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "D-day 계산기 - 날짜 계산, 기념일 계산 | SLOX",
  description:
    "무료 D-day 계산기. 특정 날짜까지 남은 일수, 지난 일수를 계산하세요. 기념일, 시험, 여행 등 중요한 날짜를 관리하세요.",
  keywords: [
    "D-day 계산기",
    "디데이 계산",
    "날짜 계산기",
    "기념일 계산",
    "남은 일수",
    "날짜 차이",
    "일수 계산",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/dday",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/dday",
    siteName: "SLOX",
    title: "D-day 계산기 - 날짜 계산 | SLOX",
    description: "무료 D-day 계산기. 남은 일수, 지난 일수를 계산하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-day 계산기 | SLOX",
    description: "특정 날짜까지 남은 일수를 계산하세요!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

