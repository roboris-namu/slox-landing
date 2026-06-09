import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "タイピング速度テスト - SLOX",
  description: "あなたのタイピング速度をテスト！1分間に何文字打てますか？グローバルランキングで競争しよう。",
};

export default function TypingPageJA() {
  return (
    <>
      <TypingMulti locale="ja" />
      <AppDownloadCTA code="typing" lang="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

