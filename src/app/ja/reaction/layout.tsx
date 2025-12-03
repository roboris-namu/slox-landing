import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "反応速度テスト - 無料オンライン測定 | SLOX",
  description:
    "無料の反応速度テスト！緑色になったらできるだけ速くクリック。LoLスタイルのティア（アイアン〜チャレンジャー）で自分のスコアを確認しよう。",
  keywords: [
    "反応速度テスト",
    "反応速度",
    "反射神経テスト",
    "反応テスト",
    "クリック速度テスト",
    "ヒューマンベンチマーク",
    "反応時間",
    "ゲーム反応速度",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/ja/reaction",
    languages: {
      "ko": "https://www.slox.co.kr/reaction",
      "en": "https://www.slox.co.kr/en/reaction",
      "ja": "https://www.slox.co.kr/ja/reaction",
      "zh": "https://www.slox.co.kr/zh/reaction",
    },
  },
  openGraph: {
    title: "反応速度テスト - 無料オンライン測定 | SLOX",
    description:
      "無料の反応速度テスト！緑色になったらできるだけ速くクリック。",
    url: "https://www.slox.co.kr/ja/reaction",
    locale: "ja_JP",
  },
  twitter: {
    title: "反応速度テスト - 無料オンライン測定",
    description:
      "無料の反応速度テスト！緑色になったらできるだけ速くクリック。",
  },
};

export default function ReactionLayoutJa({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}









