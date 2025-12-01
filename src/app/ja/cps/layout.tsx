import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPSテスト - クリック速度測定 | SLOX",
  description:
    "無料CPSテスト！1秒、5秒、10秒間でできるだけ速くクリック。ジッタークリック、バタフライクリックで高いCPSに挑戦！",
  keywords: [
    "CPSテスト",
    "クリック速度",
    "秒間クリック",
    "クリックテスト",
    "ジッタークリック",
    "バタフライクリック",
    "マインクラフトCPS",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/cps",
    languages: {
      "ko": "https://www.slox.co.kr/cps",
      "en": "https://www.slox.co.kr/en/cps",
      "ja": "https://www.slox.co.kr/ja/cps",
      "zh": "https://www.slox.co.kr/zh/cps",
      "es": "https://www.slox.co.kr/es/cps",
      "pt": "https://www.slox.co.kr/pt/cps",
      "de": "https://www.slox.co.kr/de/cps",
      "fr": "https://www.slox.co.kr/fr/cps",
    },
  },
  openGraph: {
    title: "CPSテスト - クリック速度測定 | SLOX",
    description: "無料CPSテスト。あなたの秒間クリック数は？",
    url: "https://www.slox.co.kr/ja/cps",
    locale: "ja_JP",
  },
};

export default function CpsLayoutJa({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

