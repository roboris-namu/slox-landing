import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나이 계산기 - 만 나이, 한국 나이 계산 | SLOX",
  description:
    "무료 나이 계산기. 생년월일을 입력하면 만 나이, 한국 나이, 다음 생일까지 남은 일수를 계산합니다.",
  keywords: [
    "나이 계산기",
    "만 나이 계산",
    "한국 나이",
    "생일 계산",
    "age calculator",
    "나이 계산",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/age",
    languages: {
      ko: "https://www.slox.co.kr/age",
      en: "https://www.slox.co.kr/en/age",
      ja: "https://www.slox.co.kr/ja/age",
      zh: "https://www.slox.co.kr/zh/age",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/age",
    siteName: "SLOX",
    title: "나이 계산기 | SLOX",
    description: "만 나이, 한국 나이를 계산하세요.",
  },
  robots: { index: true, follow: true },
};

export default function AgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

