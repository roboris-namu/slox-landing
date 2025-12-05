import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selector Aleatorio | SLOX",
  description: "Selector aleatorio gratis.",
  keywords: ["selector aleatorio", "random picker"],
  alternates: { canonical: "https://www.slox.co.kr/es/random", languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" } },
  openGraph: { type: "website", locale: "es_ES", url: "https://www.slox.co.kr/es/random", siteName: "SLOX", title: "Selector Aleatorio | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

