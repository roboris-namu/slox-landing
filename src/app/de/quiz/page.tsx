import QuizGameMulti from "@/components/games/QuizGameMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Wissensquiz | SLOX",
  description: "Teste dein Wissen mit 10 Fragen! 15 Sekunden pro Frage. Schaffst du es ins Ranking?",
};

export default function DeQuizPage() {
  return (
    <>
      <QuizGameMulti locale="de" />
      <AppDownloadCTA code="quiz" lang="en" />
      <AppDownloadBanner code="quiz" lang="en" />
    </>
  );
}

