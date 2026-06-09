import QuizGameMulti from "@/components/games/QuizGameMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "クイズゲーム | SLOX",
  description: "10問のクイズに挑戦して、あなたの知識を試そう！各問15秒でランキングに挑戦しよう。",
};

export default function JaQuizPage() {
  return (
    <>
      <QuizGameMulti locale="ja" />
      <AppDownloadBanner code="quiz" lang="en" />
    </>
  );
}

