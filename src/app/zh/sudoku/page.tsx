import SudokuMulti from "@/components/games/SudokuMulti";

export const metadata = {
  title: "数独 | SLOX",
  description: "数独谜题脑力训练！挑战排行榜吧。",
};

export default function ZhSudokuPage() {
  return <SudokuMulti locale="zh" />;
}

