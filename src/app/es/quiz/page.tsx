import QuizGameMulti from "@/components/games/QuizGameMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Quiz de Cultura | SLOX",
  description: "¡Pon a prueba tu conocimiento con 10 preguntas! 15 segundos por pregunta. ¡Entra en el ranking!",
};

export default function EsQuizPage() {
  return (
    <>
      <QuizGameMulti locale="es" />
      <AppDownloadBanner code="quiz" lang="en" />
    </>
  );
}

