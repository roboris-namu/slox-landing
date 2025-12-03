import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "카드 짝 맞추기 게임 | SLOX",
  description: "카드를 기억하고 짝을 맞춰보세요! 기억력과 집중력을 테스트하는 재미있는 카드 매칭 게임입니다.",
  keywords: ["카드 게임", "짝 맞추기", "기억력 게임", "메모리 게임", "두뇌 게임", "집중력 테스트"],
  openGraph: {
    title: "카드 짝 맞추기 게임 | SLOX",
    description: "카드를 기억하고 짝을 맞춰보세요! 🃏",
    type: "website",
  },
};

export default function CardMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

