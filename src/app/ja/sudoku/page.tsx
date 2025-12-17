import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "数独 | SLOX",
  description: "数独パズルで脳トレ！ミス制限付きでランキングに挑戦しよう。",
};

export default function JaSudokuPage() {
  return <SudokuMulti locale="ja" />;
}

