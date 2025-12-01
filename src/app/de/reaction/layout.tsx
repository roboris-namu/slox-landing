import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reaktionszeit Test - Kostenloser Online Reflextest | SLOX",
  description:
    "Teste deine Reaktionszeit kostenlos! Klicke so schnell wie möglich, wenn der Bildschirm grün wird. Vergleiche deine Punktzahl mit LoL-Rängen von Eisen bis Herausforderer.",
  keywords: [
    "Reaktionstest",
    "Reaktionszeit Test",
    "Reflextest",
    "Reaktionszeit",
    "Klickgeschwindigkeit Test",
    "Reflexe testen",
    "reaction test",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/de/reaction",
    languages: {
      "ko": "https://www.slox.co.kr/reaction",
      "en": "https://www.slox.co.kr/en/reaction",
      "ja": "https://www.slox.co.kr/ja/reaction",
      "zh": "https://www.slox.co.kr/zh/reaction",
      "es": "https://www.slox.co.kr/es/reaction",
      "pt": "https://www.slox.co.kr/pt/reaction",
      "de": "https://www.slox.co.kr/de/reaction",
      "fr": "https://www.slox.co.kr/fr/reaction",
    },
  },
  openGraph: {
    title: "Reaktionszeit Test - Kostenloser Online Reflextest | SLOX",
    description:
      "Teste deine Reaktionszeit kostenlos! Klicke so schnell wie möglich, wenn es grün wird.",
    url: "https://www.slox.co.kr/de/reaction",
    locale: "de_DE",
  },
  twitter: {
    title: "Reaktionszeit Test - Kostenloser Online Reflextest",
    description:
      "Teste deine Reaktionszeit kostenlos! Klicke so schnell wie möglich, wenn es grün wird.",
  },
};

export default function ReactionLayoutDe({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

