import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test CPS - Test de Vitesse de Clic | SLOX",
  description:
    "Test CPS gratuit ! Cliquez le plus vite possible pendant 1, 5 ou 10 secondes. Défiez votre CPS avec le jitter click et le butterfly click !",
  keywords: [
    "test cps",
    "vitesse de clic",
    "clics par seconde",
    "test de clic",
    "jitter click",
    "butterfly click",
    "minecraft cps",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/fr/cps",
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
    title: "Test CPS - Test de Vitesse de Clic | SLOX",
    description: "Test CPS gratuit. Combien de clics par seconde pouvez-vous faire ?",
    url: "https://www.slox.co.kr/fr/cps",
    locale: "fr_FR",
  },
};

export default function CpsLayoutFr({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


