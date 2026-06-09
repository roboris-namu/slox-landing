import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "数独 | SLOX",
  description: "数独パズルで脳トレ！ミス制限付きでランキングに挑戦しよう。",
};

export default function JaSudokuPage() {
  return (
    <>
      <SudokuMulti locale="ja" />
      <AppDownloadCTA code="sudoku" lang="en" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

