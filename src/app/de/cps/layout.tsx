import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPS Test - Klickgeschwindigkeit Test | SLOX",
  description:
    "Kostenloser CPS Test! Klicke so schnell wie möglich für 1, 5 oder 10 Sekunden. Fordere dein CPS mit Jitter Click und Butterfly Click heraus!",
  keywords: [
    "CPS Test",
    "Klickgeschwindigkeit",
    "Klicks pro Sekunde",
    "Klick Test",
    "Jitter Click",
    "Butterfly Click",
    "Minecraft CPS",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/de/cps",
    languages: {
      "ko": "https://www.slox.co.kr/cps",
      "en": "https://www.slox.co.kr/en/cps",
      "ja": "https://www.slox.co.kr/ja/cps",
      "zh": "https://www.slox.co.kr/zh/cps",
      "es": "https://www.slox.co.kr/es/cps",
      "pt": "https://www.slox.co.kr/pt/cps",
      "de": "https://www.slox.co.kr/de/cps",
      "fr": "https://www.slox.co.kr/fr/cps",
    },
  },
  openGraph: {
    title: "CPS Test - Klickgeschwindigkeit Test | SLOX",
    description: "Kostenloser CPS Test. Wie viele Klicks pro Sekunde schaffst du?",
    url: "https://www.slox.co.kr/de/cps",
    locale: "de_DE",
  },
};

export default function CpsLayoutDe({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}





