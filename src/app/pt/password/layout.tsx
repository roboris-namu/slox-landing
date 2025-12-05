import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Senhas | SLOX",
  description: "Gerador de senhas gratis. Crie senhas seguras.",
  keywords: ["gerador senhas", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/password",
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
    locale: "pt_BR",
    url: "https://www.slox.co.kr/pt/password",
    siteName: "SLOX",
    title: "Gerador de Senhas | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

