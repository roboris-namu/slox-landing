import type { Metadata } from "next";
export const metadata: Metadata = { title: "色探しゲーム | SLOX", description: "無料の色探しゲーム！違う色を見つけてください。", alternates: { canonical: "https://www.slox.co.kr/ja/color", languages: { "ko": "https://www.slox.co.kr/color", "en": "https://www.slox.co.kr/en/color", "ja": "https://www.slox.co.kr/ja/color", "zh": "https://www.slox.co.kr/zh/color", "es": "https://www.slox.co.kr/es/color", "pt": "https://www.slox.co.kr/pt/color", "de": "https://www.slox.co.kr/de/color", "fr": "https://www.slox.co.kr/fr/color" } }, openGraph: { locale: "ja_JP" } };
export default function ColorLayoutJa({ children }: { children: React.ReactNode }) { return <>{children}</>; }



