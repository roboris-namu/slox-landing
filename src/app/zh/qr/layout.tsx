import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "二维码生成器 | SLOX",
  description: "免费二维码生成器。将网址、文字等转换为二维码。",
  keywords: ["二维码生成器", "QR generator"],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/qr",
    languages: { ko: "https://www.slox.co.kr/qr", en: "https://www.slox.co.kr/en/qr", ja: "https://www.slox.co.kr/ja/qr", zh: "https://www.slox.co.kr/zh/qr", es: "https://www.slox.co.kr/es/qr", pt: "https://www.slox.co.kr/pt/qr", de: "https://www.slox.co.kr/de/qr", fr: "https://www.slox.co.kr/fr/qr" },
  },
  openGraph: { type: "website", locale: "zh_CN", url: "https://www.slox.co.kr/zh/qr", siteName: "SLOX", title: "二维码生成器 | SLOX" },
  robots: { index: true, follow: true },
};

export default function QRLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }



