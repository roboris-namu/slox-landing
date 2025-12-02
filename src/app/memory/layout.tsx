import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "숫자 기억 게임 - 기억력 테스트 | SLOX",
  description: "무료 숫자 기억 게임! 화면에 나타나는 숫자를 기억하고 입력하세요. 당신의 단기 기억력은 몇 자리?",
  keywords: ["숫자 기억", "기억력 테스트", "메모리 게임", "두뇌 훈련", "memory game"],
  alternates: {
    canonical: "https://www.slox.co.kr/memory",
    languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" },
  },
  openGraph: { title: "숫자 기억 게임 | SLOX", description: "당신의 기억력은 몇 자리?", url: "https://www.slox.co.kr/memory", locale: "ko_KR" },
};

export default function MemoryLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }


