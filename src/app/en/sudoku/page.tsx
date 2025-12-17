import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "Free Sudoku Online - Brain Training Puzzle | SLOX",
  description: "Play free Sudoku online! 3 difficulty levels, time tracking, and global leaderboard. Train your brain!",
};

export default function EnSudokuPage() {
  return <SudokuMulti locale="en" />;
}
