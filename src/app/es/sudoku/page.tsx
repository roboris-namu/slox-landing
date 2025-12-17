import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "Sudoku | SLOX",
  description: "¡Entrena tu cerebro con Sudoku! Desafía el ranking.",
};

export default function EsSudokuPage() {
  return <SudokuMulti locale="es" />;
}

