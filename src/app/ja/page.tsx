import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - 無料オンラインゲーム＆ツール | プレイ・競争・ランキング",
  description: "SLOX - 無料オンラインゲームとツール。反応速度テスト、IQテスト、数独、クイズ、BMI計算機、QR生成など24種以上。世界中のプレイヤーと競争！",
  keywords: ["無料オンラインゲーム", "反応速度テスト", "IQテスト", "無料ツール", "数独", "クイズ", "SLOX"],
  openGraph: {
    title: "SLOX - 無料オンラインゲーム＆ツール",
    description: "24種類以上の無料ゲーム＆ツール。プレイして、競争して、ランキングに挑戦！",
    locale: "ja_JP",
  },
};

export default function JapaneseHome() {
  return <HomeContent locale="ja" />;
}
