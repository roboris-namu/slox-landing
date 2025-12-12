import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 명언 - SLOX",
  description: "하루를 시작하는 영감을 얻어보세요!",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

