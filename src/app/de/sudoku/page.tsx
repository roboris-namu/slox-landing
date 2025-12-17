import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "Sudoku | SLOX",
  description: "Gehirntraining mit Sudoku! Fordere das Ranking heraus.",
};

export default function DeSudokuPage() {
  return <SudokuMulti locale="de" />;
}

