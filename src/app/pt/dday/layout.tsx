import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora D-day - Contador de Dias | SLOX",
  description: "Calculadora D-day gratis. Conte os dias ate uma data.",
  keywords: ["calculadora D-day", "contador dias", "countdown calculator"],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/dday",
    languages: {
      ko: "https://www.slox.co.kr/dday",
      en: "https://www.slox.co.kr/en/dday",
      ja: "https://www.slox.co.kr/ja/dday",
      zh: "https://www.slox.co.kr/zh/dday",
      es: "https://www.slox.co.kr/es/dday",
      pt: "https://www.slox.co.kr/pt/dday",
      de: "https://www.slox.co.kr/de/dday",
      fr: "https://www.slox.co.kr/fr/dday",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.slox.co.kr/pt/dday",
    siteName: "SLOX",
    title: "Calculadora D-day | SLOX",
  },
  robots: { index: true, follow: true },
};

export default function DdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



