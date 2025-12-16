"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

type Difficulty = "easy" | "medium" | "hard";
type Board = (number | null)[][];
type GameState = "ready" | "playing" | "complete";

// 스도쿠 생성 함수들
const generateSolvedBoard = (): number[][] => {
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  
  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    // 행 체크
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
    // 열 체크
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    // 3x3 박스 체크
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    return true;
  };

  const solve = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve(board);
  return board;
};

const createPuzzle = (solved: number[][], difficulty: Difficulty): Board => {
  const puzzle: Board = solved.map(row => [...row]);
  const cellsToRemove = difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 55;
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      removed++;
    }
  }
  
  return puzzle;
};

interface LeaderboardEntry {
  id: number;
  nickname: string;
  difficulty: string;
  time_seconds: number;
  mistakes: number;
  created_at: string;
}

const difficultyLabels = {
  easy: { label: "쉬움", color: "text-green-400", emoji: "🌱" },
  medium: { label: "보통", color: "text-yellow-400", emoji: "🔥" },
  hard: { label: "어려움", color: "text-red-400", emoji: "💀" },
};

export default function Sudoku() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [solvedBoard, setSolvedBoard] = useState<number[][]>([]);
  const [userBoard, setUserBoard] = useState<Board>([]);
  const [initialBoard, setInitialBoard] = useState<Board>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [highlightedNum, setHighlightedNum] = useState<number | null>(null);
  const [showErrors, setShowErrors] = useState<Set<string>>(new Set());
  
  // 랭킹
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 랭킹 불러오기
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("sudoku_leaderboard")
        .select("*")
        .eq("difficulty", difficulty)
        .order("time_seconds", { ascending: true })
        .limit(10);

      if (data) {
        setLeaderboard(data);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  }, [difficulty]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 타이머
  useEffect(() => {
    if (gameState !== "playing") return;

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // 게임 시작
  const startGame = () => {
    const solved = generateSolvedBoard();
    const puzzleBoard = createPuzzle(solved, difficulty);
    
    setSolvedBoard(solved);
    setUserBoard(puzzleBoard.map(row => [...row]));
    setInitialBoard(puzzleBoard.map(row => [...row]));
    setSelectedCell(null);
    setMistakes(0);
    setTime(0);
    setHighlightedNum(null);
    setShowErrors(new Set());
    setShowRankingPrompt(false);
    setHasSubmitted(false);
    setGameState("playing");
  };

  // 셀 선택
  const selectCell = (row: number, col: number) => {
    if (initialBoard[row][col] !== null) {
      // 고정된 숫자 클릭 시 해당 숫자 하이라이트
      setHighlightedNum(initialBoard[row][col]);
      setSelectedCell(null);
    } else {
      setSelectedCell([row, col]);
      if (userBoard[row][col] !== null) {
        setHighlightedNum(userBoard[row][col]);
      } else {
        setHighlightedNum(null);
      }
    }
  };

  // 숫자 입력
  const inputNumber = (num: number) => {
    if (!selectedCell || gameState !== "playing") return;
    
    const [row, col] = selectedCell;
    if (initialBoard[row][col] !== null) return;

    const newBoard = userBoard.map(r => [...r]);
    
    if (num === 0) {
      // 지우기
      newBoard[row][col] = null;
      const newErrors = new Set(showErrors);
      newErrors.delete(`${row}-${col}`);
      setShowErrors(newErrors);
    } else {
      newBoard[row][col] = num;
      
      // 정답 체크
      if (num !== solvedBoard[row][col]) {
        setMistakes((prev) => prev + 1);
        const newErrors = new Set(showErrors);
        newErrors.add(`${row}-${col}`);
        setShowErrors(newErrors);
      } else {
        const newErrors = new Set(showErrors);
        newErrors.delete(`${row}-${col}`);
        setShowErrors(newErrors);
      }
    }
    
    setUserBoard(newBoard);
    setHighlightedNum(num === 0 ? null : num);

    // 완료 체크
    checkComplete(newBoard);
  };

  // 완료 체크
  const checkComplete = (board: Board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solvedBoard[row][col]) return;
      }
    }
    
    // 완료!
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("complete");
    setShowRankingPrompt(true);
  };

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 랭킹 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || hasSubmitted) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("sudoku_leaderboard").insert({
        nickname: nickname.trim(),
        difficulty,
        time_seconds: time,
        mistakes,
      });

      if (!error) {
        setHasSubmitted(true);
        setShowRankingPrompt(false);
        fetchLeaderboard();
      }
    } catch (error) {
      console.error("Failed to submit score:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 셀 스타일
  const getCellStyle = (row: number, col: number) => {
    const isInitial = initialBoard[row]?.[col] !== null;
    const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
    const isHighlighted = userBoard[row]?.[col] === highlightedNum && highlightedNum !== null;
    const isError = showErrors.has(`${row}-${col}`);
    const isSameRow = selectedCell?.[0] === row;
    const isSameCol = selectedCell?.[1] === col;
    const isSameBox = selectedCell && 
      Math.floor(selectedCell[0] / 3) === Math.floor(row / 3) &&
      Math.floor(selectedCell[1] / 3) === Math.floor(col / 3);

    let classes = "w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-lg md:text-xl font-bold cursor-pointer transition-all ";
    
    // 3x3 박스 테두리
    if (col % 3 === 0 && col !== 0) classes += "border-l-2 border-l-white/30 ";
    if (row % 3 === 0 && row !== 0) classes += "border-t-2 border-t-white/30 ";
    
    if (isSelected) {
      classes += "bg-indigo-500/40 ";
    } else if (isError) {
      classes += "bg-red-500/30 text-red-400 ";
    } else if (isHighlighted) {
      classes += "bg-indigo-500/20 ";
    } else if (isSameRow || isSameCol || isSameBox) {
      classes += "bg-white/5 ";
    }

    if (isInitial) {
      classes += "text-white ";
    } else {
      classes += "text-indigo-400 ";
    }

    return classes;
  };

  const diffInfo = difficultyLabels[difficulty];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🔢 스도쿠</h1>
          <p className="text-dark-400">숫자 퍼즐의 고전! 빈칸을 채워 완성하세요.</p>
        </div>

        {/* 대기 화면 */}
        {gameState === "ready" && (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">🧩</div>
            <h2 className="text-2xl font-bold mb-6">난이도를 선택하세요</h2>
            
            <div className="flex justify-center gap-4 mb-8">
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    difficulty === d
                      ? "bg-indigo-500 text-white scale-105"
                      : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                  }`}
                >
                  <span className="mr-2">{difficultyLabels[d].emoji}</span>
                  {difficultyLabels[d].label}
                </button>
              ))}
            </div>

            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              🚀 게임 시작
            </button>

            {/* 랭킹 미리보기 */}
            {leaderboard.length > 0 && (
              <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
                <h3 className="text-lg font-bold mb-4">
                  🏆 {diffInfo.label} 랭킹 TOP 5
                </h3>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                        <span className="font-medium">{entry.nickname}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-cyan-400 font-bold">{formatTime(entry.time_seconds)}</span>
                        <span className="text-dark-500 text-sm ml-2">(실수 {entry.mistakes}회)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 게임 화면 */}
        {(gameState === "playing" || gameState === "complete") && (
          <div className="py-4">
            {/* 상태 바 */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-4">
                <span className={`${diffInfo.color}`}>
                  {diffInfo.emoji} {diffInfo.label}
                </span>
                <span className="text-dark-400">
                  실수: <span className={mistakes > 0 ? "text-red-400" : "text-green-400"}>{mistakes}</span>
                </span>
              </div>
              <div className="text-xl font-mono text-cyan-400">
                ⏱️ {formatTime(time)}
              </div>
            </div>

            {/* 스도쿠 보드 */}
            <div className="flex justify-center mb-6">
              <div className="bg-dark-800/80 p-2 md:p-3 rounded-2xl border border-dark-600 shadow-xl">
                <div className="grid grid-cols-9 gap-px bg-dark-600/50">
                  {userBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => selectCell(rowIndex, colIndex)}
                        className={getCellStyle(rowIndex, colIndex)}
                      >
                        {cell || ""}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 숫자 입력 패드 */}
            {gameState === "playing" && (
              <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button
                      key={num}
                      onClick={() => inputNumber(num)}
                      disabled={!selectedCell}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold text-xl transition-all ${
                        num === 0
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                      } disabled:opacity-30`}
                    >
                      {num === 0 ? "✕" : num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 완료 메시지 */}
            {gameState === "complete" && (
              <div className="text-center mt-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2 text-cyan-400">축하합니다!</h2>
                <p className="text-dark-400 mb-4">
                  {formatTime(time)} 만에 완료! (실수 {mistakes}회)
                </p>

                {/* 랭킹 등록 */}
                {showRankingPrompt && !hasSubmitted && (
                  <div className="mb-6 p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4">🏆 랭킹에 등록하시겠습니까?</h3>
                    <div className="flex gap-2 max-w-md mx-auto">
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임 입력"
                        maxLength={10}
                        className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={submitScore}
                        disabled={!nickname.trim() || isSubmitting}
                        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl font-medium transition-colors"
                      >
                        {isSubmitting ? "..." : "등록"}
                      </button>
                    </div>
                  </div>
                )}

                {hasSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                    ✅ 랭킹에 등록되었습니다!
                  </div>
                )}

                <button
                  onClick={() => setGameState("ready")}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                >
                  🔄 다시 하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

