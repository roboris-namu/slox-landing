import SudokuMulti from "@/components/games/SudokuMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Sudoku | SLOX",
  description: "Entraînez votre cerveau avec le Sudoku ! Montez dans le classement.",
};

export default function FrSudokuPage() {
  return (
    <>
      <SudokuMulti locale="fr" />
      <AppDownloadCTA code="sudoku" lang="en" />
      <AppDownloadBanner code="sudoku" lang="en" />
    </>
  );
}

