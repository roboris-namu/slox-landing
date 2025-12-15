import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM 기반 설명 가능한 추천시스템 - SLOX Research",
  description: "대규모 언어모델을 활용하여 추천 이유를 자연어로 설명하는 차세대 추천시스템 연구",
  keywords: ["추천시스템", "LLM", "설명 가능한 AI", "Explainable AI", "Recommendation System"],
};

export default function ThesisLayout({ children }: { children: React.ReactNode }) {
  return children;
}

