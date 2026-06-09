import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "Gehirntraining mit Sudoku! Fordere das Ranking heraus.",
};

export default function DeSudokuPage() {
  return (
    <>
      <SudokuMulti locale="de" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

