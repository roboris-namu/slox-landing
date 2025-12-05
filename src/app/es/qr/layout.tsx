import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de QR | SLOX",
  description: "Generador de codigos QR gratis.",
  keywords: ["generador QR", "QR generator"],
  alternates: { canonical: "https://www.slox.co.kr/es/qr", languages: { ko: "https://www.slox.co.kr/qr", en: "https://www.slox.co.kr/en/qr", ja: "https://www.slox.co.kr/ja/qr", zh: "https://www.slox.co.kr/zh/qr", es: "https://www.slox.co.kr/es/qr", pt: "https://www.slox.co.kr/pt/qr", de: "https://www.slox.co.kr/de/qr", fr: "https://www.slox.co.kr/fr/qr" } },
  openGraph: { type: "website", locale: "es_ES", url: "https://www.slox.co.kr/es/qr", siteName: "SLOX", title: "Generador de QR | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

