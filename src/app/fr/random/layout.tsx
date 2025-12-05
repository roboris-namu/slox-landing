import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selecteur Aleatoire | SLOX",
  description: "Selecteur aleatoire gratuit.",
  keywords: ["selecteur aleatoire", "random picker"],
  alternates: { canonical: "https://www.slox.co.kr/fr/random", languages: { ko: "https://www.slox.co.kr/random", en: "https://www.slox.co.kr/en/random", ja: "https://www.slox.co.kr/ja/random", zh: "https://www.slox.co.kr/zh/random", es: "https://www.slox.co.kr/es/random", pt: "https://www.slox.co.kr/pt/random", de: "https://www.slox.co.kr/de/random", fr: "https://www.slox.co.kr/fr/random" } },
  openGraph: { type: "website", locale: "fr_FR", url: "https://www.slox.co.kr/fr/random", siteName: "SLOX", title: "Selecteur Aleatoire | SLOX" },
  robots: { index: true, follow: true },
};

export default function RandomLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

