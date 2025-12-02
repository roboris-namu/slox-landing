import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teste CPS - Teste de Velocidade de Clique | SLOX",
  description:
    "Teste CPS grátis! Clique o mais rápido possível por 1, 5 ou 10 segundos. Desafie seu CPS com jitter click e butterfly click!",
  keywords: [
    "teste cps",
    "velocidade de clique",
    "cliques por segundo",
    "teste de clique",
    "jitter click",
    "butterfly click",
    "minecraft cps",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/cps",
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
    title: "Teste CPS - Teste de Velocidade de Clique | SLOX",
    description: "Teste CPS grátis. Quantos cliques por segundo você consegue?",
    url: "https://www.slox.co.kr/pt/cps",
    locale: "pt_BR",
  },
};

export default function CpsLayoutPt({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}





