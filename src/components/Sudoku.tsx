"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

type Difficulty = "easy" | "medium" | "hard";
type Board = (number | null)[][];
type GameState = "ready" | "playing" | "complete";

const generateSolvedBoard = (): number[][] => {
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  
  const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
    for (let i = 0; i < 9; i++) { if (board[row][i] === num) return false; }
    for (let i = 0; i < 9; i++) { if (board[i][col] === num) return false; }
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
  const puzzleBoard: Board = solved.map(row => [...row]);
  const cellsToRemove = difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 55;
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzleBoard[row][col] !== null) {
      puzzleBoard[row][col] = null;
      removed++;
    }
  }
  return puzzleBoard;
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
  easy: { label: "쉬움", color: "text-green-400", emoji: "🌱", bgColor: "bg-green-500/20", borderColor: "border-green-500/50" },
  medium: { label: "보통", color: "text-yellow-400", emoji: "🔥", bgColor: "bg-yellow-500/20", borderColor: "border-yellow-500/50" },
  hard: { label: "어려움", color: "text-red-400", emoji: "💀", bgColor: "bg-red-500/20", borderColor: "border-red-500/50" },
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
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, count } = await supabase
        .from("sudoku_leaderboard")
        .select("*", { count: "exact" })
        .eq("difficulty", difficulty)
        .order("time_seconds", { ascending: true })
        .limit(10);
      if (data) { setLeaderboard(data); setTotalCount(count || 0); }
    } catch (error) { console.error("Failed to fetch leaderboard:", error); }
  }, [difficulty]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => { setTime((prev) => prev + 1); }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState]);

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

  const selectCell = (row: number, col: number) => {
    if (initialBoard[row][col] !== null) {
      setHighlightedNum(initialBoard[row][col]);
      setSelectedCell(null);
    } else {
      setSelectedCell([row, col]);
      if (userBoard[row][col] !== null) { setHighlightedNum(userBoard[row][col]); }
      else { setHighlightedNum(null); }
    }
  };

  const inputNumber = (num: number) => {
    if (!selectedCell || gameState !== "playing") return;
    const [row, col] = selectedCell;
    if (initialBoard[row][col] !== null) return;

    const newBoard = userBoard.map(r => [...r]);
    if (num === 0) {
      newBoard[row][col] = null;
      const newErrors = new Set(showErrors);
      newErrors.delete(`${row}-${col}`);
      setShowErrors(newErrors);
    } else {
      newBoard[row][col] = num;
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
    checkComplete(newBoard);
  };

  const checkComplete = (board: Board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solvedBoard[row][col]) return;
      }
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("complete");
    setShowRankingPrompt(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGrade = () => {
    const baseTime = difficulty === "easy" ? 180 : difficulty === "medium" ? 300 : 600;
    if (time <= baseTime * 0.3) return { grade: "전설", emoji: "🏆", color: "text-yellow-400" };
    if (time <= baseTime * 0.5) return { grade: "마스터", emoji: "💎", color: "text-purple-400" };
    if (time <= baseTime * 0.7) return { grade: "전문가", emoji: "⭐", color: "text-blue-400" };
    if (time <= baseTime) return { grade: "숙련자", emoji: "👍", color: "text-green-400" };
    if (time <= baseTime * 1.5) return { grade: "중급자", emoji: "😊", color: "text-cyan-400" };
    return { grade: "초보자", emoji: "📚", color: "text-orange-400" };
  };

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
      if (!error) { setHasSubmitted(true); setShowNicknameModal(false); setShowRankingPrompt(false); fetchLeaderboard(); }
    } catch (error) { console.error("Failed to submit score:", error); }
    finally { setIsSubmitting(false); }
  };

  // 카카오 인앱 브라우저 감지
  const isKakaoInApp = () => {
    if (typeof window === "undefined") return false;
    return navigator.userAgent.toLowerCase().includes("kakaotalk");
  };

  // 이미지 생성
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    shareCardRef.current.style.display = "block";
    try {
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } finally { shareCardRef.current.style.display = "none"; }
  };

  // 텍스트 공유
  const shareResult = async () => {
    const gradeInfo = getGrade();
    const shareUrl = "https://www.slox.co.kr/sudoku";
    const firstPlace = leaderboard[0];
    const diffInfo = difficultyLabels[difficulty];
    
    const text = `🔢 스도쿠 완료!\n\n` +
      `${gradeInfo.emoji} ${gradeInfo.grade}\n` +
      `⏱️ 시간: ${formatTime(time)}\n` +
      `❌ 실수: ${mistakes}회\n` +
      `📊 난이도: ${diffInfo.emoji} ${diffInfo.label}\n\n` +
      (firstPlace ? `🏆 현재 1위: ${firstPlace.nickname} (${formatTime(firstPlace.time_seconds)})\n\n` : "") +
      `나도 도전하기 👇\n${shareUrl}`;

    if (isKakaoInApp()) {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      return;
    }

    if (typeof navigator.share === "function") {
      try { await navigator.share({ text }); return; } 
      catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
    }
    
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // 이미지 공유
  const shareAsImage = async () => {
    if (isKakaoInApp()) {
      alert("📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!");
      return;
    }
    const blob = await generateImage();
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `sudoku-${formatTime(time)}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🔢 스도쿠! https://www.slox.co.kr/sudoku` };
      if (navigator.canShare?.(shareData)) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `sudoku-${formatTime(time)}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!"), 500);
    }
  };

  const getCellStyle = (row: number, col: number) => {
    const isInitial = initialBoard[row]?.[col] !== null;
    const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
    const isHighlighted = userBoard[row]?.[col] === highlightedNum && highlightedNum !== null;
    const isError = showErrors.has(`${row}-${col}`);
    const isSameRow = selectedCell?.[0] === row;
    const isSameCol = selectedCell?.[1] === col;
    const isSameBox = selectedCell && Math.floor(selectedCell[0] / 3) === Math.floor(row / 3) && Math.floor(selectedCell[1] / 3) === Math.floor(col / 3);

    let classes = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-base md:text-lg font-bold cursor-pointer transition-all ";
    if (col % 3 === 0 && col !== 0) classes += "border-l-2 border-l-white/30 ";
    if (row % 3 === 0 && row !== 0) classes += "border-t-2 border-t-white/30 ";
    
    if (isSelected) classes += "bg-indigo-500/40 ";
    else if (isError) classes += "bg-red-500/30 text-red-400 ";
    else if (isHighlighted) classes += "bg-indigo-500/20 ";
    else if (isSameRow || isSameCol || isSameBox) classes += "bg-white/5 ";

    if (isInitial) classes += "text-white ";
    else classes += "text-indigo-400 ";

    return classes;
  };

  const diffInfo = difficultyLabels[difficulty];
  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">← 메인으로</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-indigo-400 text-sm font-medium">🔢 스도쿠</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              스도쿠
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"> 퍼즐</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">숫자 퍼즐의 고전! 빈칸을 채워 완성하세요.</p>
          </div>

          {/* 난이도 선택 */}
          {gameState === "ready" && (
            <>
              <div className="flex justify-center gap-3 mb-8">
                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-5 py-2 rounded-xl font-medium transition-all ${
                      difficulty === d
                        ? `${difficultyLabels[d].bgColor} ${difficultyLabels[d].borderColor} border-2 ${difficultyLabels[d].color} scale-105`
                        : "bg-dark-800 text-dark-300 hover:bg-dark-700 border-2 border-transparent"
                    }`}
                  >
                    <span className="mr-2">{difficultyLabels[d].emoji}</span>
                    {difficultyLabels[d].label}
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-4 mb-8">
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">크기</span>
                  <span className="text-white font-bold">9×9</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">빈칸</span>
                  <span className="text-white font-bold">{difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 55}개</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">실수제한</span>
                  <span className="text-white font-bold">없음</span>
                </div>
              </div>
            </>
          )}

          {/* 게임 상태 표시 */}
          {gameState === "playing" && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-xl border ${diffInfo.borderColor} ${diffInfo.bgColor}`}>
                  <span className={diffInfo.color}>{diffInfo.emoji} {diffInfo.label}</span>
                </div>
                <div className="px-5 py-2 rounded-xl border-2 border-indigo-500/50 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-dark-400 text-xs">경과 시간</p>
                      <p className="text-2xl font-black text-cyan-400">{formatTime(time)}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">실수</p>
                  <p className={`text-xl font-bold ${mistakes > 0 ? 'text-red-400' : 'text-green-400'}`}>{mistakes}</p>
                </div>
              </div>
            </div>
          )}

          {/* 팁 */}
          {gameState === "ready" && (
            <div className="mb-8 p-4 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium mb-1">스도쿠 팁</p>
                  <p className="text-dark-400 text-sm">각 행, 열, 3×3 박스에 1~9가 한 번씩만 들어가야 해요!</p>
                </div>
              </div>
            </div>
          )}

          {/* 게임 영역 */}
          <div className="relative rounded-2xl p-6 mb-8 min-h-[400px] bg-dark-900">
            {/* 대기 화면 */}
            {gameState === "ready" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-bounce">🧩</div>
                <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                <p className="text-dark-400 mb-6">{diffInfo.emoji} {diffInfo.label} 난이도로 시작!</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                  🎮 게임 시작
                </button>
              </div>
            )}

            {/* 게임 화면 */}
            {(gameState === "playing" || gameState === "complete") && (
              <div className="py-4">
                {/* 스도쿠 보드 */}
                <div className="flex justify-center mb-6">
                  <div className="bg-dark-800/80 p-2 rounded-2xl border border-dark-600 shadow-xl">
                    <div className="grid grid-cols-9 gap-px bg-dark-600/50">
                      {userBoard.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => gameState === "playing" && selectCell(rowIndex, colIndex)}
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
                          className={`w-11 h-11 md:w-12 md:h-12 rounded-xl font-bold text-lg transition-all ${
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
                  <div className="text-center mt-6">
                    <div className="text-6xl mb-4">{gradeInfo.emoji}</div>
                    <h2 className={`text-3xl font-bold mb-2 ${gradeInfo.color}`}>{gradeInfo.grade}!</h2>
                    <p className="text-dark-400 mb-4">{formatTime(time)} 완료 (실수 {mistakes}회)</p>
                    
                    {hasSubmitted && (
                      <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                        ✅ 랭킹에 등록되었습니다!
                      </div>
                    )}

                    {/* 버튼들 */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                      <button onClick={shareResult} className="px-4 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl">
                        {showCopied ? "✅ 복사됨!" : "📤 공유하기"}
                      </button>
                      <button onClick={shareAsImage} className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl">
                        🖼️ 이미지 공유
                      </button>
                      <button onClick={() => setGameState("ready")} className="px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl">
                        🔄 다시 하기
                      </button>
                    </div>
                    
                    {!hasSubmitted && (
                      <button onClick={() => setShowNicknameModal(true)} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                        🏆 랭킹 등록!
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#6366f1", fontSize: "12px" }}>🔢 스도쿠</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{gradeInfo.emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: "#6366f1" }}>{gradeInfo.grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#22d3ee", marginTop: "8px" }}>{formatTime(time)}</div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>실수 {mistakes}회 • {diffInfo.emoji} {diffInfo.label}</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#1e1b4b", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                <div style={{ color: "#6366f1", fontSize: "10px" }}>📊 난이도</div>
                <div style={{ color: "#a5b4fc", fontSize: "18px", fontWeight: "bold" }}>{diffInfo.label}</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/sudoku")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}>
              <span>{new Date().toLocaleDateString("ko-KR")}</span>
              <span style={{ color: "#6366f1" }}>slox.co.kr/sudoku</span>
            </div>
          </div>

          {/* 명예의전당 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <span>🏆</span> 명예의전당 
                <span className={`text-xs ${diffInfo.color}`}>({diffInfo.label})</span>
              </h3>
              <button onClick={fetchLeaderboard} className="text-dark-500 hover:text-white text-xs">🔄 새로고침</button>
            </div>
            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-medium truncate">{entry.nickname}</span>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span>실수 {entry.mistakes}회</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold">{formatTime(entry.time_seconds)}</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-dark-500">
                <span className="text-4xl mb-2 block">🔢</span>
                아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!
              </div>
            )}
          </div>

          {/* 자동 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className={`text-2xl font-black ${gradeInfo.color}`}>{gradeInfo.grade}!</h3>
                    <p className="text-dark-400 text-sm">{formatTime(time)} (실수 {mistakes}회)</p>
                  </div>
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30">
                    <span className="flex items-center justify-center gap-2"><span className="text-xl">🏆</span>랭킹 등록하기!</span>
                  </button>
                  <button onClick={shareResult} className="w-full mt-2 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all border border-dark-600">
                    <span className="flex items-center justify-center gap-2">
                      <span>📤</span>
                      {showCopied ? "✅ 복사됨!" : "친구에게 공유하기"}
                    </span>
                  </button>
                  <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">나중에 할게요</button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{gradeInfo.emoji}</div>
                  <h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3>
                  <p className="text-dark-400 text-sm">{formatTime(time)} ({diffInfo.label})</p>
                </div>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">취소</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : "등록!"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 게임 방법 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2"><span>🎯</span> 게임 방법</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-indigo-400 font-medium">1️⃣ 셀 선택</p>
                <p className="text-dark-400 mt-1">빈 칸을 클릭하세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">2️⃣ 숫자 입력</p>
                <p className="text-dark-400 mt-1">1~9 중 하나를 선택!</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">3️⃣ 규칙</p>
                <p className="text-dark-400 mt-1">행/열/박스에 중복 없이!</p>
              </div>
            </div>
          </div>

          {/* 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">🏆 등급표 ({diffInfo.label})</h3>
            <p className="text-dark-400 text-xs text-center mb-4">💡 빠르게 완료할수록 높은 등급!</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🏆 전설</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 마스터</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">⭐ 전문가</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg text-center border border-green-400/50">
                <span className="text-green-400 text-sm font-bold">👍 숙련자</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-400 text-sm font-bold">😊 중급자</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">📚 초보자</span>
              </div>
            </div>
          </div>

          {/* 다른 게임 링크 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 게임</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/quiz" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📚 상식 퀴즈</Link>
              <Link href="/iq" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🧠 IQ 테스트</Link>
              <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ 반응속도 테스트</Link>
              <Link href="/card-match" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🃏 카드 짝 맞추기</Link>
            </div>
          </div>

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-accent-purple to-accent-cyan rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium">SLOX</span>
            </Link>
            <p className="text-dark-500 text-xs mt-2">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
          </div>
        </div>
      </main>
    </div>
  );
}
