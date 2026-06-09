import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "Gehirntraining mit Sudoku! Fordere das Ranking heraus.",
};

export default function DeSudokuPage() {
  return (
    <>
      <SudokuMulti locale="de" />
      <AppDownloadCTA code="sudoku" lang="en" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

