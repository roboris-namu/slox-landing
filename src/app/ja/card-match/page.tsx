import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "カードマッチ | SLOX",
  description: "カードを覚えてペアを見つけよう！記憶力テストゲーム。",
};

export default function JaCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="ja" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

