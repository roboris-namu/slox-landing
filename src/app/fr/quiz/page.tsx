import QuizGameMulti from "@/components/games/QuizGameMulti";

export const metadata = {
  title: "Quiz Culture | SLOX",
  description: "Testez vos connaissances avec 10 questions ! 15 secondes par question. Montez dans le classement !",
};

export default function FrQuizPage() {
  return <QuizGameMulti locale="fr" />;
}

