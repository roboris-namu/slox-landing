import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로또 번호 생성기 - 랜덤 로또 번호 추첨 | SLOX",
  description:
    "무료 로또 번호 생성기. 행운의 로또 6/45 번호를 랜덤으로 생성해보세요. 여러 게임 한번에 생성 가능!",
  keywords: [
    "로또 번호 생성기",
    "로또 번호 추첨",
    "랜덤 로또",
    "로또 6/45",
    "행운의 번호",
    "lotto generator",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/lotto",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/lotto",
    siteName: "SLOX",
    title: "로또 번호 생성기 | SLOX",
    description: "행운의 로또 번호를 생성해보세요!",
  },
  robots: { index: true, follow: true },
};

export default function LottoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

