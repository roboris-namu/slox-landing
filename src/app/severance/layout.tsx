import type { Metadata } from "next";

/**
 * 퇴직금 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "2025 퇴직금 계산기 - 재직기간별 퇴직금 자동 계산",
  description:
    "2025년 최신 기준 퇴직금 계산기입니다. 입사일, 퇴사일, 월급을 입력하면 예상 퇴직금과 퇴직소득세를 자동으로 계산해드립니다.",
  keywords: [
    "퇴직금 계산기",
    "퇴직금 계산",
    "2025 퇴직금",
    "퇴직금 계산법",
    "퇴직금 자동계산",
    "퇴직소득세",
    "퇴직금 세금",
    "재직기간 퇴직금",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/severance",
    siteName: "SLOX",
    title: "2025 퇴직금 계산기 - 재직기간별 퇴직금 자동 계산",
    description:
      "입사일, 퇴사일, 월급을 입력하면 예상 퇴직금을 자동으로 계산해드립니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "2025 퇴직금 계산기",
    description:
      "재직기간과 월급을 입력하면 예상 퇴직금을 계산해드립니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeveranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


