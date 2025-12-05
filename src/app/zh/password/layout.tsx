import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "密码生成器 - 安全随机密码 | SLOX",
  description: "免费密码生成器。创建强大安全的随机密码。",
  keywords: ["密码生成器", "随机密码", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/password",
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
    locale: "zh_CN",
    url: "https://www.slox.co.kr/zh/password",
    siteName: "SLOX",
    title: "密码生成器 | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

