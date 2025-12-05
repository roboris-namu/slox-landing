import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 뽑기 - 제비뽑기, 추첨기, 당첨자 뽑기 | SLOX",
  description:
    "무료 랜덤 뽑기. 이름, 번호, 메뉴 등 무엇이든 랜덤으로 뽑아보세요. 제비뽑기, 추첨, 당첨자 선정에 활용하세요.",
  keywords: [
    "랜덤 뽑기",
    "제비뽑기",
    "추첨기",
    "당첨자 뽑기",
    "룰렛",
    "랜덤 선택",
    "random picker",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/random",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/random",
    siteName: "SLOX",
    title: "랜덤 뽑기 | SLOX",
    description: "무엇이든 랜덤으로 뽑아보세요!",
  },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

