import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "IQテスト | SLOX",
  description: "パターンを分析してIQを測定しよう！メンサスタイルの12問テスト。",
};

export default function JaIQPage() {
  return (
    <>
      <IQTestMulti locale="ja" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

