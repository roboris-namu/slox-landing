import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrenador de Puntería - Test de Precisión | SLOX",
  description: "¡Entrenador de puntería gratis! Haz clic en los objetivos lo más rápido y preciso posible. ¡Practica para Valorant, CS, Overwatch!",
  keywords: ["entrenador de puntería", "test de puntería", "precisión del ratón", "práctica FPS"],
  alternates: { canonical: "https://www.slox.co.kr/es/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "Entrenador de Puntería | SLOX", url: "https://www.slox.co.kr/es/aim", locale: "es_ES" },
};

export default function AimLayoutEs({ children }: { children: React.ReactNode }) { return <>{children}</>; }





