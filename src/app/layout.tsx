import type { Metadata } from "next";
import "./globals.css";

/**
 * SEO 메타데이터 - 글로벌 대응
 */
export const metadata: Metadata = {
  title: "SLOX - Play, Compete, Rank",
  description:
    "Free online games & tools — Reaction Test, CPS Test, Typing Test, IQ Test, Sudoku, calculators and more. Compete with players worldwide.",
  keywords: [
    "SLOX",
    "reaction test",
    "CPS test",
    "typing test",
    "IQ test",
    "sudoku",
    "free online games",
    "free tools",
    "calculator",
    "QR generator",
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
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "de_DE", "fr_FR", "es_ES", "pt_BR"],
    url: "https://www.slox.co.kr",
    siteName: "SLOX",
    title: "SLOX - Play, Compete, Rank",
    description:
      "Free online games & tools. Reaction Test, CPS, Typing, IQ and more. Compete globally.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SLOX - Play, Compete, Rank",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOX - Play, Compete, Rank",
    description:
      "Free online games & tools. Compete with players worldwide.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "48x48" },
      { url: "/icons/icon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-16x16.png?v=2", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/icons/apple-touch-icon.png?v=2",
  },
};

/**
 * 루트 레이아웃 - 미니멀 다크 테마
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="naver-site-verification" content="c674c400fde18181c55d1613538d9c5308b707cf" />
        <meta name="google-site-verification" content="RLeEptoySR_WdUTzUnkHQtAFjmHZvdFB4mEfEQPAdtA" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4738855756690019" crossOrigin="anonymous"></script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G6944GZPB3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G6944GZPB3');
            `,
          }}
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen bg-dark-950 text-white overflow-x-hidden">
        {/* 미니멀 배경 */}
        <div className="premium-bg" />

        {/* 메인 콘텐츠 */}
        {children}
      </body>
    </html>
  );
}
