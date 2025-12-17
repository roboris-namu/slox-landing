import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "Sudoku | SLOX",
  description: "Entraînez votre cerveau avec le Sudoku ! Montez dans le classement.",
};

export default function FrSudokuPage() {
  return <SudokuMulti locale="fr" />;
}

