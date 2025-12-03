import type { Metadata } from "next";
export const metadata: Metadata = { title: "数字记忆游戏 | SLOX", description: "免费数字记忆游戏！你能记住几位数？", alternates: { canonical: "https://www.slox.co.kr/zh/memory", languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" } }, openGraph: { locale: "zh_CN" } };
export default function MemoryLayoutZh({ children }: { children: React.ReactNode }) { return <>{children}</>; }









