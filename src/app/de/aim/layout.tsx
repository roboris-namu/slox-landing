import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aim Trainer - Maus-Präzisionstest | SLOX",
  description: "Kostenloser Aim Trainer! Klicke die Ziele so schnell und präzise wie möglich. Übe für Valorant, CS, Overwatch!",
  keywords: ["Aim Trainer", "Aim Test", "Maus-Präzision", "FPS Aim Übung"],
  alternates: { canonical: "https://www.slox.co.kr/de/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "Aim Trainer | SLOX", url: "https://www.slox.co.kr/de/aim", locale: "de_DE" },
};

export default function AimLayoutDe({ children }: { children: React.ReactNode }) { return <>{children}</>; }









