import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "カードマッチ | SLOX",
  description: "カードを覚えてペアを見つけよう！記憶力テストゲーム。",
};

export default function JaCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="ja" />
      <AppDownloadCTA code="card-match" lang="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

