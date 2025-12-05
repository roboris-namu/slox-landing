import type { Metadata } from "next";
import "./globals.css";

/**
 * SEO 메타데이터 설정
 */
export const metadata: Metadata = {
  title: "SLOX - 홈페이지 · 앱 제작 · AI 챗봇 구축",
  description:
    "홈페이지·앱·AI 챗봇 전문 개발사 SLOX. 합리적 비용으로 고품질 개발 서비스를 제공합니다.",
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
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
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
        <meta name="naver-site-verification" content="c674c400fde18181c55d1613538d9c5308b707cf" />
        <meta name="google-site-verification" content="RLeEptoySR_WdUTzUnkHQtAFjmHZvdFB4mEfEQPAdtA" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4738855756690019" crossOrigin="anonymous"></script>
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
