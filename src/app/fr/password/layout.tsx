import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generateur de Mot de Passe | SLOX",
  description: "Generateur de mot de passe gratuit. Creez des mots de passe securises.",
  keywords: ["generateur mot de passe", "password generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/password",
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
    locale: "fr_FR",
    url: "https://www.slox.co.kr/fr/password",
    siteName: "SLOX",
    title: "Generateur de Mot de Passe | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



