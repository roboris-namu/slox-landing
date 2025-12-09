import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Picker - Lottery Tool | SLOX",
  description: "Free random picker. Pick anything randomly.",
  keywords: ["random picker", "lottery", "randomizer"],
  alternates: { canonical: "https://www.slox.co.kr/en/random", languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" } },
  openGraph: { type: "website", locale: "en_US", url: "https://www.slox.co.kr/en/random", siteName: "SLOX", title: "Random Picker | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }



