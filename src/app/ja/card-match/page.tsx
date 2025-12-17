import CardMatchMulti from "@/components/games/CardMatchMulti";

export const metadata = {
  title: "カードマッチ | SLOX",
  description: "カードを覚えてペアを見つけよう！記憶力テストゲーム。",
};

export default function JaCardMatchPage() {
  return <CardMatchMulti locale="ja" />;
}

