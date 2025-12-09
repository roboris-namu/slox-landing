import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文字数カウント - 単語数計算 | SLOX",
  description: "無料文字数カウント。文字数、単語数、バイト数を確認。",
  keywords: ["文字数カウント", "単語数計算", "character counter"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/character-count",
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
    locale: "ja_JP",
    url: "https://www.slox.co.kr/ja/character-count",
    siteName: "SLOX",
    title: "文字数カウント | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function CharacterCountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



