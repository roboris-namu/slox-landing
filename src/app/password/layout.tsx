import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - 안전한 랜덤 비밀번호 | SLOX",
  description: "무료 비밀번호 생성기. 안전하고 강력한 랜덤 비밀번호를 만들어보세요.",
  keywords: ["비밀번호 생성기", "패스워드 생성", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/password",
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
    locale: "ko_KR",
    url: "https://www.slox.co.kr/password",
    siteName: "SLOX",
    title: "비밀번호 생성기 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
