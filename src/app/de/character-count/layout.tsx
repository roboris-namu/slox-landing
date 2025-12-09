import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeichenzahler | SLOX",
  description: "Kostenloser Zeichenzahler. Zeichen und Worter zahlen.",
  keywords: ["Zeichenzahler", "character counter"],
  alternates: {
    canonical: "https://www.slox.co.kr/de/character-count",
    languages: {
      ko: "https://www.slox.co.kr/character-count",
      en: "https://www.slox.co.kr/en/character-count",
      ja: "https://www.slox.co.kr/ja/character-count",
      zh: "https://www.slox.co.kr/zh/character-count",
      es: "https://www.slox.co.kr/es/character-count",
      pt: "https://www.slox.co.kr/pt/character-count",
      de: "https://www.slox.co.kr/de/character-count",
      fr: "https://www.slox.co.kr/fr/character-count",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.slox.co.kr/de/character-count",
    siteName: "SLOX",
    title: "Zeichenzahler | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function CharacterCountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



