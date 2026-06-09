import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "¡Entrena tu cerebro con Sudoku! Desafía el ranking.",
};

export default function EsSudokuPage() {
  return (
    <>
      <SudokuMulti locale="es" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

