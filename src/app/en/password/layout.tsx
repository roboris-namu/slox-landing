import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Secure Random Password | SLOX",
  description: "Free password generator. Create strong, secure random passwords.",
  keywords: ["password generator", "random password", "secure password"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/password",
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
    locale: "en_US",
    url: "https://www.slox.co.kr/en/password",
    siteName: "SLOX",
    title: "Password Generator | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



