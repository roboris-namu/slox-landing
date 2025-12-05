import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Free QR Maker | SLOX",
  description: "Free QR code generator. Create QR codes for URLs, text, and more.",
  keywords: ["QR code generator", "QR maker"],
  alternates: {
    canonical: "https://www.slox.co.kr/en/qr",
    languages: { ko: "https://www.slox.co.kr/qr", en: "https://www.slox.co.kr/en/qr", ja: "https://www.slox.co.kr/ja/qr", zh: "https://www.slox.co.kr/zh/qr", es: "https://www.slox.co.kr/es/qr", pt: "https://www.slox.co.kr/pt/qr", de: "https://www.slox.co.kr/de/qr", fr: "https://www.slox.co.kr/fr/qr" },
  },
  openGraph: { type: "website", locale: "en_US", url: "https://www.slox.co.kr/en/qr", siteName: "SLOX", title: "QR Code Generator | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

