import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "随机抽选 | SLOX",
  description: "免费随机抽选。随机选择任何东西。",
  keywords: ["随机抽选", "抽奖", "random picker"],
  alternates: { canonical: "https://www.slox.co.kr/zh/random", languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" } },
  openGraph: { type: "website", locale: "zh_CN", url: "https://www.slox.co.kr/zh/random", siteName: "SLOX", title: "随机抽选 | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

