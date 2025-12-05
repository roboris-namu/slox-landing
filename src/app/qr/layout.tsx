import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR코드 생성기 - 무료 QR코드 만들기 | SLOX",
  description: "무료 QR코드 생성기. URL, 텍스트 등을 QR코드로 만들어보세요.",
  keywords: ["QR코드 생성기", "QR generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/qr",
    languages: {
      ko: "https://www.slox.co.kr/qr",
      en: "https://www.slox.co.kr/en/qr",
      ja: "https://www.slox.co.kr/ja/qr",
      zh: "https://www.slox.co.kr/zh/qr",
      es: "https://www.slox.co.kr/es/qr",
      pt: "https://www.slox.co.kr/pt/qr",
      de: "https://www.slox.co.kr/de/qr",
      fr: "https://www.slox.co.kr/fr/qr",
    },
  },
  openGraph: { type: "website", locale: "ko_KR", url: "https://www.slox.co.kr/qr", siteName: "SLOX", title: "QR코드 생성기 | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
