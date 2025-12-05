import type { Metadata } from "next";

/**
 * 글자수 세기 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "글자수 세기 - 공백 포함/미포함, 바이트 수 계산 | SLOX",
  description:
    "무료 글자수 세기 도구. 공백 포함/미포함 글자수, 단어수, 바이트 수, 줄 수를 실시간으로 확인하세요.",
  keywords: [
    "글자수 세기",
    "글자수 계산",
    "문자수 세기",
    "바이트 계산",
    "단어수 세기",
    "글자수 카운터",
    "character count",
    "word count",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/character-count",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/character-count",
    siteName: "SLOX",
    title: "글자수 세기 - 실시간 글자수 계산 | SLOX",
    description:
      "무료 글자수 세기 도구. 공백 포함/미포함 글자수, 바이트 수를 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "글자수 세기 | SLOX",
    description: "글자수, 단어수, 바이트 수를 실시간으로 확인!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CharacterCountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

