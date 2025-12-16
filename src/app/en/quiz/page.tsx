import { Metadata } from "next";
import QuizGameEN from "@/components/games/QuizGameEN";

export const metadata: Metadata = {
  title: "Free Trivia Quiz - Test Your Knowledge | SLOX",
  description: "Free online trivia quiz with 10 questions. Test your general knowledge and compete with others!",
  keywords: ["trivia quiz", "free quiz", "knowledge test", "online quiz", "brain game", "SLOX"],
  openGraph: {
    title: "Free Trivia Quiz | SLOX",
    description: "Test your knowledge with our free trivia quiz!",
    locale: "en_US",
  },
};

export default function QuizPage() {
  return <QuizGameEN />;
}

