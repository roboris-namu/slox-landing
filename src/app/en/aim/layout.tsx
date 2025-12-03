import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aim Trainer - Mouse Accuracy Test | SLOX",
  description: "Free aim trainer! Click the targets as fast and accurately as possible. Practice your aim for Valorant, CS, Overwatch and more!",
  keywords: ["aim trainer", "aim test", "mouse accuracy", "fps aim practice", "valorant aim", "aim training"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/aim",
    languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" },
  },
  openGraph: { title: "Aim Trainer - Mouse Accuracy Test | SLOX", description: "Free aim trainer. How good is your aim?", url: "https://www.slox.co.kr/en/aim", locale: "en_US" },
};

export default function AimLayoutEn({ children }: { children: React.ReactNode }) { return <>{children}</>; }









