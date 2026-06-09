import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "数独 | SLOX",
  description: "数独パズルで脳トレ！ミス制限付きでランキングに挑戦しよう。",
};

export default function JaSudokuPage() {
  return (
    <>
      <SudokuMulti locale="ja" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

