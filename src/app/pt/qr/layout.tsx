import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de QR Code | SLOX",
  description: "Gerador de QR code gratis.",
  keywords: ["gerador QR", "QR generator"],
  alternates: { canonical: "https://www.slox.co.kr/pt/qr", languages: { ko: "https://www.slox.co.kr/qr", en: "https://www.slox.co.kr/en/qr", ja: "https://www.slox.co.kr/ja/qr", zh: "https://www.slox.co.kr/zh/qr", es: "https://www.slox.co.kr/es/qr", pt: "https://www.slox.co.kr/pt/qr", de: "https://www.slox.co.kr/de/qr", fr: "https://www.slox.co.kr/fr/qr" } },
  openGraph: { type: "website", locale: "pt_BR", url: "https://www.slox.co.kr/pt/qr", siteName: "SLOX", title: "Gerador de QR Code | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }



