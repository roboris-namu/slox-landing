import type { Metadata } from "next";
export const metadata: Metadata = { title: "Color Vision Test | SLOX", description: "Free color vision test! Find the different color.", alternates: { canonical: "https://www.slox.co.kr/en/color", languages: { "ko": "https://www.slox.co.kr/color", "en": "https://www.slox.co.kr/en/color", "ja": "https://www.slox.co.kr/ja/color", "zh": "https://www.slox.co.kr/zh/color", "es": "https://www.slox.co.kr/es/color", "pt": "https://www.slox.co.kr/pt/color", "de": "https://www.slox.co.kr/de/color", "fr": "https://www.slox.co.kr/fr/color" } }, openGraph: { locale: "en_US" } };
export default function ColorLayoutEn({ children }: { children: React.ReactNode }) { return <>{children}</>; }


