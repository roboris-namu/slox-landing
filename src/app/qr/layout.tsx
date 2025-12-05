import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR코드 생성기 - 무료 QR코드 만들기 | SLOX",
  description:
    "무료 QR코드 생성기. URL, 텍스트, 연락처 등을 QR코드로 만들어보세요. 다운로드도 가능합니다.",
  keywords: [
    "QR코드 생성기",
    "QR코드 만들기",
    "무료 QR코드",
    "QR generator",
    "큐알코드",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/qr",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/qr",
    siteName: "SLOX",
    title: "QR코드 생성기 | SLOX",
    description: "무료로 QR코드를 만들어보세요!",
  },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

