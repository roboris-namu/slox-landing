import type { Metadata } from "next";

/**
 * 적금이자 계산기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "적금이자 계산기 - 단리/복리, 세전/세후 이자 계산 | SLOX",
  description:
    "무료 적금이자 계산기. 단리/복리 방식과 일반과세/비과세/세금우대 옵션으로 적금 만기 수령액을 계산해보세요.",
  keywords: [
    "적금이자 계산기",
    "적금 계산기",
    "예금이자 계산기",
    "복리 계산기",
    "단리 계산기",
    "세후 이자",
    "적금 만기금액",
    "이자 계산",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/savings",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/savings",
    siteName: "SLOX",
    title: "적금이자 계산기 - 만기 수령액 계산 | SLOX",
    description:
      "무료 적금이자 계산기. 단리/복리, 세전/세후 이자를 계산해보세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "적금이자 계산기 | SLOX",
    description: "적금 만기 수령액을 쉽게 계산해보세요!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



