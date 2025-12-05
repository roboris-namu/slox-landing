import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QRコード生成 | SLOX",
  description: "無料QRコード生成。URL、テキストなどをQRコードに変換。",
  keywords: ["QRコード生成", "QR generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/qr",
    languages: { ko: "https://www.slox.co.kr/qr", en: "https://www.slox.co.kr/en/qr", ja: "https://www.slox.co.kr/ja/qr", zh: "https://www.slox.co.kr/zh/qr", es: "https://www.slox.co.kr/es/qr", pt: "https://www.slox.co.kr/pt/qr", de: "https://www.slox.co.kr/de/qr", fr: "https://www.slox.co.kr/fr/qr" },
  },
  openGraph: { type: "website", locale: "ja_JP", url: "https://www.slox.co.kr/ja/qr", siteName: "SLOX", title: "QRコード生成 | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

