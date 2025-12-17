import QuizGameMulti from "@/components/games/QuizGameMulti";

export const metadata = {
  title: "クイズゲーム | SLOX",
  description: "10問のクイズに挑戦して、あなたの知識を試そう！各問15秒でランキングに挑戦しよう。",
};

export default function JaQuizPage() {
  return <QuizGameMulti locale="ja" />;
}

