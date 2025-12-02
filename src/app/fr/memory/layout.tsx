import type { Metadata } from "next";
export const metadata: Metadata = { title: "Jeu de Mémoire des Nombres | SLOX", description: "Jeu de mémoire gratuit! Combien de chiffres pouvez-vous mémoriser?", alternates: { canonical: "https://www.slox.co.kr/fr/memory", languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" } }, openGraph: { locale: "fr_FR" } };
export default function MemoryLayoutFr({ children }: { children: React.ReactNode }) { return <>{children}</>; }



