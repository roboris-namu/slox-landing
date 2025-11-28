import type { Metadata } from "next";
import "./globals.css";

/**
 * SEO 메타데이터 설정
 */
export const metadata: Metadata = {
  title: "SLOX - 홈페이지 · 앱 제작 · AI 챗봇 구축",
  description:
    "SLOX는 홈페이지 제작, 앱 개발, AI 챗봇 구축을 전문으로 하는 개발 스튜디오입니다. 당신의 개발 파트너 SLOX와 함께 프로젝트를 시작하세요.",
  keywords: [
    "홈페이지 제작",
    "앱 개발",
    "AI 챗봇",
    "웹사이트 개발",
    "Flutter 앱",
    "개발 스튜디오",
    "SLOX",
  ],
  authors: [{ name: "SLOX" }],
  creator: "SLOX",
  publisher: "SLOX",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://slox.kr",
    siteName: "SLOX",
    title: "SLOX - 홈페이지 · 앱 제작 · AI 챗봇 구축",
    description:
      "SLOX는 홈페이지 제작, 앱 개발, AI 챗봇 구축을 전문으로 하는 개발 스튜디오입니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SLOX - 홈페이지 · 앱 제작 · AI 챗봇 구축",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOX - 홈페이지 · 앱 제작 · AI 챗봇 구축",
    description:
      "SLOX는 홈페이지 제작, 앱 개발, AI 챗봇 구축을 전문으로 하는 개발 스튜디오입니다.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

/**
 * 루트 레이아웃 컴포넌트
 * - 프리미엄 다크 테마 적용
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth dark">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen bg-dark-950 text-white overflow-x-hidden">
        {/* 프리미엄 배경 레이어 */}
        <div className="premium-bg" />
        <div className="grid-pattern" />
        <div className="noise-overlay" />
        
        {/* 메인 콘텐츠 */}
        {children}
      </body>
    </html>
  );
}
