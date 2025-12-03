import type { Metadata } from "next";
export const metadata: Metadata = { title: "数字記憶ゲーム | SLOX", description: "無料の数字記憶ゲーム！何桁まで覚えられる？", alternates: { canonical: "https://www.slox.co.kr/ja/memory", languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" } }, openGraph: { locale: "ja_JP" } };
export default function MemoryLayoutJa({ children }: { children: React.ReactNode }) { return <>{children}</>; }









