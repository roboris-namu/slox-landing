import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinador de Mira - Teste de Precisão | SLOX",
  description: "Treinador de mira grátis! Clique nos alvos o mais rápido e preciso possível. Pratique para Valorant, CS, Overwatch!",
  keywords: ["treinador de mira", "teste de mira", "precisão do mouse", "prática FPS"],
  alternates: { canonical: "https://www.slox.co.kr/pt/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "Treinador de Mira | SLOX", url: "https://www.slox.co.kr/pt/aim", locale: "pt_BR" },
};

export default function AimLayoutPt({ children }: { children: React.ReactNode }) { return <>{children}</>; }


