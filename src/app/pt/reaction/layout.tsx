import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teste de Velocidade de Reação - Teste Online Grátis | SLOX",
  description:
    "Teste sua velocidade de reação grátis! Clique o mais rápido possível quando a tela ficar verde. Compare sua pontuação com ranks estilo LoL de Ferro a Desafiante.",
  keywords: [
    "teste de reação",
    "velocidade de reação",
    "teste de reflexo",
    "tempo de reação",
    "teste de velocidade de clique",
    "teste de reflexos",
    "reaction test",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/pt/reaction",
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
    title: "Teste de Velocidade de Reação - Teste Online Grátis | SLOX",
    description:
      "Teste sua velocidade de reação grátis! Clique o mais rápido possível quando ficar verde.",
    url: "https://www.slox.co.kr/pt/reaction",
    locale: "pt_BR",
  },
  twitter: {
    title: "Teste de Velocidade de Reação - Teste Online Grátis",
    description:
      "Teste sua velocidade de reação grátis! Clique o mais rápido possível quando ficar verde.",
  },
};

export default function ReactionLayoutPt({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}


