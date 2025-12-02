import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test CPS - Test de Velocidad de Clic | SLOX",
  description:
    "¡Test CPS gratis! Haz clic lo más rápido posible durante 1, 5 o 10 segundos. ¡Desafía tu CPS con jitter click y butterfly click!",
  keywords: [
    "test cps",
    "velocidad de clic",
    "clics por segundo",
    "test de clic",
    "jitter click",
    "butterfly click",
    "minecraft cps",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/es/cps",
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
    title: "Test CPS - Test de Velocidad de Clic | SLOX",
    description: "Test CPS gratis. ¿Cuántos clics por segundo puedes hacer?",
    url: "https://www.slox.co.kr/es/cps",
    locale: "es_ES",
  },
};

export default function CpsLayoutEs({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}





