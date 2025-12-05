import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - 백분율 계산, 비율 계산 | SLOX",
  description:
    "무료 퍼센트 계산기. A의 B%는? A에서 B%를 더하면/빼면? A는 B의 몇 %? 다양한 백분율 계산을 쉽게 하세요.",
  keywords: [
    "퍼센트 계산기",
    "백분율 계산",
    "비율 계산",
    "% 계산",
    "할인 계산",
    "percent calculator",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/percent",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/percent",
    siteName: "SLOX",
    title: "퍼센트 계산기 | SLOX",
    description: "다양한 백분율 계산을 쉽게!",
  },
  robots: { index: true, follow: true },
};

export default function PercentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

