import QuizGameMulti from "@/components/games/QuizGameMulti";

export const metadata = {
  title: "Trivia Quiz - Test Your Knowledge | SLOX",
  description: "Test your knowledge with fun trivia questions! 10 questions, 15 seconds each. Compete on the global leaderboard!",
};

export default function EnQuizPage() {
  return <QuizGameMulti locale="en" />;
}
