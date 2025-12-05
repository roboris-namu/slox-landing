import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passwort-Generator | SLOX",
  description: "Kostenloser Passwort-Generator. Sichere Passworter erstellen.",
  keywords: ["Passwort-Generator", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/de/password",
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
    locale: "de_DE",
    url: "https://www.slox.co.kr/de/password",
    siteName: "SLOX",
    title: "Passwort-Generator | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

