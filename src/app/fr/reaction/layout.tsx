import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Temps de Réaction - Test en Ligne Gratuit | SLOX",
  description:
    "Testez votre temps de réaction gratuitement ! Cliquez le plus vite possible quand l'écran devient vert. Comparez votre score avec des rangs style LoL de Fer à Challenger.",
  keywords: [
    "test de réaction",
    "temps de réaction",
    "test de réflexes",
    "vitesse de réaction",
    "test de vitesse de clic",
    "tester ses réflexes",
    "reaction test",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/reaction",
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
    title: "Test de Temps de Réaction - Test en Ligne Gratuit | SLOX",
    description:
      "Testez votre temps de réaction gratuitement ! Cliquez le plus vite possible quand ça devient vert.",
    url: "https://www.slox.co.kr/fr/reaction",
    locale: "fr_FR",
  },
  twitter: {
    title: "Test de Temps de Réaction - Test en Ligne Gratuit",
    description:
      "Testez votre temps de réaction gratuitement ! Cliquez le plus vite possible quand ça devient vert.",
  },
};

export default function ReactionLayoutFr({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

