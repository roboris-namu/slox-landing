import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "卡片配对 | SLOX",
  description: "记住卡片位置，找出配对！测试你的记忆力。",
};

export default function ZhCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="zh" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

