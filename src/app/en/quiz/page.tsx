import QuizGameMulti from "@/components/games/QuizGameMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Trivia Quiz - Test Your Knowledge | SLOX",
  description: "Test your knowledge with fun trivia questions! 10 questions, 15 seconds each. Compete on the global leaderboard!",
};

export default function EnQuizPage() {
  return (
    <>
      <QuizGameMulti locale="en" />
      <AppDownloadCTA code="quiz" lang="en" />
      <AppDownloadBanner code="quiz" lang="en" />
    </>
  );
}
