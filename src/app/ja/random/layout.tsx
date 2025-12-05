import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ランダム選択 | SLOX",
  description: "無料ランダム選択。何でもランダムに選ぶ。",
  keywords: ["ランダム選択", "抽選", "random picker"],
  alternates: { canonical: "https://www.slox.co.kr/ja/random", languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" } },
  openGraph: { type: "website", locale: "ja_JP", url: "https://www.slox.co.kr/ja/random", siteName: "SLOX", title: "ランダム選択 | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

