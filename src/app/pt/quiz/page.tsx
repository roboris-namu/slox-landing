import QuizGameMulti from "@/components/games/QuizGameMulti";

export const metadata = {
  title: "Quiz de Cultura | SLOX",
  description: "Teste seu conhecimento com 10 perguntas! 15 segundos por pergunta. Entre no ranking!",
};

export default function PtQuizPage() {
  return <QuizGameMulti locale="pt" />;
}

