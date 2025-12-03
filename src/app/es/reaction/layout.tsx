import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Velocidad de Reacción - Prueba Online Gratis | SLOX",
  description:
    "¡Prueba tu velocidad de reacción gratis! Haz clic lo más rápido posible cuando la pantalla se ponga verde. Compara tu puntuación con rangos estilo LoL desde Hierro hasta Aspirante.",
  keywords: [
    "test de reacción",
    "velocidad de reacción",
    "test de reflejos",
    "tiempo de reacción",
    "test de velocidad de clic",
    "prueba de reflejos",
    "reaction test",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/es/reaction",
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
    title: "Test de Velocidad de Reacción - Prueba Online Gratis | SLOX",
    description:
      "¡Prueba tu velocidad de reacción gratis! Haz clic lo más rápido posible cuando se ponga verde.",
    url: "https://www.slox.co.kr/es/reaction",
    locale: "es_ES",
  },
  twitter: {
    title: "Test de Velocidad de Reacción - Prueba Online Gratis",
    description:
      "¡Prueba tu velocidad de reacción gratis! Haz clic lo más rápido posible cuando se ponga verde.",
  },
};

export default function ReactionLayoutEs({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}









