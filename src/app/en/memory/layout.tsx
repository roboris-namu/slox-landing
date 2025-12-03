import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number Memory Game - Memory Test | SLOX",
  description: "Free number memory game! Remember the numbers and type them. How many digits can you remember?",
  keywords: ["number memory", "memory test", "memory game", "brain training"],
  alternates: { canonical: "https://www.slox.co.kr/en/memory", languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" } },
  openGraph: { title: "Number Memory Game | SLOX", url: "https://www.slox.co.kr/en/memory", locale: "en_US" },
};

export default function MemoryLayoutEn({ children }: { children: React.ReactNode }) { return <>{children}</>; }









