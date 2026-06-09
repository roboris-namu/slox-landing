import Sudoku from "@/components/Sudoku";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776790512",
  },
  title: "스도쿠 - SLOX",
  description: "클래식 숫자 퍼즐 스도쿠! 빈칸을 채워 9x9 보드를 완성하세요. 난이도별 랭킹 시스템.",
};

export default function SudokuPage() {
  return (
    <>
      <Sudoku />
      <AppDownloadBanner code="sudoku" lang="ko" />
    </>
  );
}

