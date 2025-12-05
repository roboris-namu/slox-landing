import type { Metadata } from "next";

/**
 * 대출이자 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "대출이자 계산기 - 원리금균등, 원금균등, 만기일시 상환 | SLOX",
  description:
    "무료 대출이자 계산기. 원리금균등, 원금균등, 만기일시상환 방식별 월 상환금액과 총 이자를 계산해보세요.",
  keywords: [
    "대출이자 계산기",
    "대출 계산기",
    "원리금균등상환",
    "원금균등상환",
    "만기일시상환",
    "대출 이자 계산",
    "월 상환금액",
    "주택담보대출",
    "신용대출",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/loan",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/loan",
    siteName: "SLOX",
    title: "대출이자 계산기 - 상환방식별 이자 계산 | SLOX",
    description:
      "무료 대출이자 계산기. 원리금균등, 원금균등, 만기일시상환 방식별 월 상환금액과 총 이자를 계산해보세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "대출이자 계산기 | SLOX",
    description:
      "원리금균등, 원금균등, 만기일시상환 방식별 이자 계산!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

