import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "랜덤 뽑기 - 추첨기 | SLOX",
  description: "무료 랜덤 뽑기. 무엇이든 랜덤으로 뽑아보세요.",
  keywords: ["랜덤 뽑기", "추첨기", "random picker"],
  alternates: {
    canonical: "https://www.slox.co.kr/random",
    languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" },
  },
  openGraph: { type: "website", locale: "ko_KR", url: "https://www.slox.co.kr/random", siteName: "SLOX", title: "랜덤 뽑기 | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
