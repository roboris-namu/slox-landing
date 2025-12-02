import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "エイムトレーナー - マウス精度テスト | SLOX",
  description: "無料エイムトレーナー！ターゲットをできるだけ速く正確にクリック。ヴァロラント、CS、オーバーウォッチのエイム練習に！",
  keywords: ["エイムトレーナー", "エイムテスト", "マウス精度", "FPSエイム練習", "ヴァロラントエイム"],
  alternates: { canonical: "https://www.slox.co.kr/ja/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "エイムトレーナー | SLOX", description: "無料エイムトレーナー", url: "https://www.slox.co.kr/ja/aim", locale: "ja_JP" },
};

export default function AimLayoutJa({ children }: { children: React.ReactNode }) { return <>{children}</>; }



