import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - Juegos y Herramientas Online Gratis | Juega, Compite, Ranking",
  description: "SLOX - Juegos y herramientas online gratis. Test de reacción, test de IQ, Sudoku, quiz, calculadora IMC, generador QR y más de 24 herramientas gratis. ¡Compite globalmente!",
  keywords: ["juegos online gratis", "test de reacción", "test de IQ", "herramientas gratis", "sudoku", "quiz", "SLOX"],
  openGraph: {
    title: "SLOX - Juegos y Herramientas Online Gratis",
    description: "Más de 24 juegos y herramientas gratis. ¡Juega, compite y sube en el ranking!",
    locale: "es_ES",
  },
};

export default function SpanishHome() {
  return <HomeContent locale="es" />;
}
