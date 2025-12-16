import { Metadata } from "next";
import SudokuEN from "@/components/games/SudokuEN";

export const metadata: Metadata = {
  title: "Free Sudoku Online - Brain Training Puzzle | SLOX",
  description: "Play free Sudoku online! 3 difficulty levels, time tracking, and global leaderboard. Train your brain!",
  keywords: ["sudoku", "free sudoku", "online sudoku", "brain training", "puzzle game", "SLOX"],
  openGraph: {
    title: "Free Sudoku Online | SLOX",
    description: "Play Sudoku and train your brain!",
    locale: "en_US",
  },
};

export default function SudokuPage() {
  return <SudokuEN />;
}

