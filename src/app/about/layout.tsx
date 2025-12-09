import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SLOX 소개 | 홈페이지 · 앱 제작 · AI 챗봇 구축",
  description: "SLOX는 홈페이지 제작, 앱 개발, AI 챗봇 구축을 전문으로 하는 개발 스튜디오입니다. 당신의 아이디어를 현실로 만들어 드립니다.",
  keywords: ["SLOX", "개발 스튜디오", "홈페이지 제작", "앱 개발", "AI 챗봇", "웹 개발"],
  openGraph: {
    title: "SLOX 소개 | 홈페이지 · 앱 제작 · AI 챗봇 구축",
    description: "SLOX는 홈페이지 제작, 앱 개발, AI 챗봇 구축을 전문으로 하는 개발 스튜디오입니다.",
    url: "https://www.slox.co.kr/about",
    siteName: "SLOX",
    locale: "ko_KR",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

