import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - 문자수 계산 | SLOX",
  description: "무료 글자수 세기. 공백 포함/미포함 글자수, 단어수, 바이트 수를 확인하세요.",
  keywords: ["글자수 세기", "문자수 계산", "character counter"],
  alternates: {
    canonical: "https://www.slox.co.kr/character-count",
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
    locale: "ko_KR",
    url: "https://www.slox.co.kr/character-count",
    siteName: "SLOX",
    title: "글자수 세기 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function CharacterCountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
