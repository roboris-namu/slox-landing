import TypingMulti from "@/components/games/TypingMulti";

export const metadata = {
  title: "タイピング速度テスト - SLOX",
  description: "あなたのタイピング速度をテスト！1分間に何文字打てますか？グローバルランキングで競争しよう。",
};

export default function TypingPageJA() {
  return <TypingMulti locale="ja" />;
}

