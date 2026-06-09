import QuizGameMulti from "@/components/games/QuizGameMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "クイズゲーム | SLOX",
  description: "10問のクイズに挑戦して、あなたの知識を試そう！各問15秒でランキングに挑戦しよう。",
};

export default function JaQuizPage() {
  return (
    <>
      <QuizGameMulti locale="ja" />
      <AppDownloadCTA code="quiz" lang="en" />
      <AppDownloadBanner code="quiz" lang="en" />
    </>
  );
}

