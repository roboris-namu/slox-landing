import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entraîneur de Visée - Test de Précision | SLOX",
  description: "Entraîneur de visée gratuit ! Cliquez sur les cibles le plus vite et précisément possible. Entraînez-vous pour Valorant, CS, Overwatch !",
  keywords: ["entraîneur de visée", "test de visée", "précision souris", "pratique FPS"],
  alternates: { canonical: "https://www.slox.co.kr/fr/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "Entraîneur de Visée | SLOX", url: "https://www.slox.co.kr/fr/aim", locale: "fr_FR" },
};

export default function AimLayoutFr({ children }: { children: React.ReactNode }) { return <>{children}</>; }





