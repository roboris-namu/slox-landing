import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワード生成機 - 安全なランダムパスワード | SLOX",
  description: "無料パスワード生成機。強力で安全なランダムパスワードを作成。",
  keywords: ["パスワード生成機", "ランダムパスワード", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/password",
    languages: {
      ko: "https://www.slox.co.kr/password",
      en: "https://www.slox.co.kr/en/password",
      ja: "https://www.slox.co.kr/ja/password",
      zh: "https://www.slox.co.kr/zh/password",
      es: "https://www.slox.co.kr/es/password",
      pt: "https://www.slox.co.kr/pt/password",
      de: "https://www.slox.co.kr/de/password",
      fr: "https://www.slox.co.kr/fr/password",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.slox.co.kr/ja/password",
    siteName: "SLOX",
    title: "パスワード生成機 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

