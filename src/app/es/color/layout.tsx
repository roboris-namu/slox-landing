import type { Metadata } from "next";
export const metadata: Metadata = { title: "Test de Visión de Color | SLOX", description: "¡Test de visión de color gratis!", alternates: { canonical: "https://www.slox.co.kr/es/color", languages: { "ko": "https://www.slox.co.kr/color", "en": "https://www.slox.co.kr/en/color", "ja": "https://www.slox.co.kr/ja/color", "zh": "https://www.slox.co.kr/zh/color", "es": "https://www.slox.co.kr/es/color", "pt": "https://www.slox.co.kr/pt/color", "de": "https://www.slox.co.kr/de/color", "fr": "https://www.slox.co.kr/fr/color" } }, openGraph: { locale: "es_ES" } };
export default function ColorLayoutEs({ children }: { children: React.ReactNode }) { return <>{children}</>; }



