import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "Treine seu cérebro com Sudoku! Desafie o ranking.",
};

export default function PtSudokuPage() {
  return (
    <>
      <SudokuMulti locale="pt" />
      <AppDownloadCTA code="sudoku" lang="en" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

