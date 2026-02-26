import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - Kostenlose Online-Spiele & Tools | Spielen, Wettkämpfen, Rangliste",
  description: "SLOX - Kostenlose Online-Spiele und Tools. Reaktionstest, IQ-Test, Sudoku, Quiz, BMI-Rechner, QR-Generator und über 24 kostenlose Tools. Weltweit konkurrieren!",
  keywords: ["kostenlose Online-Spiele", "Reaktionstest", "IQ-Test", "kostenlose Tools", "Sudoku", "Quiz", "SLOX"],
  openGraph: {
    title: "SLOX - Kostenlose Online-Spiele & Tools",
    description: "Über 24 kostenlose Spiele und Tools. Spielen, wettkämpfen und die Rangliste erklimmen!",
    locale: "de_DE",
  },
};

export default function GermanHome() {
  return <HomeContent locale="de" />;
}
