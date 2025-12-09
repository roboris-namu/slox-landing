import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "字数统计 - 字符计数 | SLOX",
  description: "免费字数统计。查看字数、词数、字节数。",
  keywords: ["字数统计", "字符计数", "character counter"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/character-count",
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
    locale: "zh_CN",
    url: "https://www.slox.co.kr/zh/character-count",
    siteName: "SLOX",
    title: "字数统计 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function CharacterCountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



