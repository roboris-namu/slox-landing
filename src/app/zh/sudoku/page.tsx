import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "数独 | SLOX",
  description: "数独谜题脑力训练！挑战排行榜吧。",
};

export default function ZhSudokuPage() {
  return (
    <>
      <SudokuMulti locale="zh" />
      <AppDownloadCTA code="sudoku" lang="en" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

