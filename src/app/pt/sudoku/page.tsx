import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "Treine seu cérebro com Sudoku! Desafie o ranking.",
};

export default function PtSudokuPage() {
  return (
    <>
      <SudokuMulti locale="pt" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

