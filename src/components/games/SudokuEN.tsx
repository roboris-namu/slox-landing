"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 패널티 시스템 상수
const MAX_MISTAKES = 10; // 최대 틀림 횟수
const PENALTY_SECONDS = 3; // 틀릴 때마다 +3초

// Simple Sudoku generator
function generateSudoku(difficulty: "easy" | "medium" | "hard") {
  const base = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  
  const puzzle = base.map(row => [...row]);
  const solution = base.map(row => [...row]);
  
  const removeCount = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;
  let removed = 0;
  while (removed < removeCount) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  
  return { puzzle, solution };
}

interface LeaderboardEntry {
  id: string;
  nickname: string;
  time_seconds: number;
  difficulty: string;
  mistakes: number;
}

export default function SudokuEN() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [gameState, setGameState] = useState<"ready" | "playing" | "complete" | "gameover">("ready");
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [userInput, setUserInput] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [time, setTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getGrade = useCallback(() => {
    const totalTime = time + (mistakes * 30);
    if (totalTime < 180) return { grade: "Master", emoji: "👑", color: "text-yellow-400" };
    if (totalTime < 300) return { grade: "Expert", emoji: "💎", color: "text-purple-400" };
    if (totalTime < 480) return { grade: "Advanced", emoji: "🌟", color: "text-blue-400" };
    if (totalTime < 600) return { grade: "Intermediate", emoji: "✨", color: "text-green-400" };
    return { grade: "Beginner", emoji: "📊", color: "text-gray-400" };
  }, [time, mistakes]);

  const gradeInfo = getGrade();

  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("sudoku_leaderboard")
      .select("*")
      .eq("difficulty", difficulty)
      .order("time_seconds", { ascending: true })
      .limit(10);
    if (data) setLeaderboard(data);
  }, [difficulty]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    const { puzzle: p, solution: s } = generateSudoku(difficulty);
    setPuzzle(p);
    setSolution(s);
    setUserInput(p.map(row => [...row]));
    setSelectedCell(null);
    setTime(0);
    setMistakes(0);
    setGameState("playing");
    setHasSubmitted(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (puzzle[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || gameState !== "playing") return;
    const [row, col] = selectedCell;
    if (puzzle[row][col] !== 0) return;

    const newInput = userInput.map(r => [...r]);
    newInput[row][col] = num;
    setUserInput(newInput);

    if (num !== solution[row][col]) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      // 시간 패널티: +3초
      setTime((prev) => prev + PENALTY_SECONDS);
      // 최대 틀림 횟수 초과 시 게임 오버
      if (newMistakes >= MAX_MISTAKES) {
        setGameState("gameover");
        return;
      }
    }

    // Check completion
    let complete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newInput[r][c] !== solution[r][c]) complete = false;
      }
    }
    if (complete) {
      setGameState("complete");
      setShowRankingPrompt(true);
    }
  };

  const submitScore = async () => {
    if (!nickname.trim() || hasSubmitted) return;
    await supabase.from("sudoku_leaderboard").insert({
      nickname: nickname.trim(),
      difficulty,
      time_seconds: time,
      mistakes,
    });
    setHasSubmitted(true);
    setShowNicknameModal(false);
    fetchLeaderboard();
  };

  const shareResult = async () => {
    const text = `🧩 SLOX Sudoku Complete!\n\nDifficulty: ${difficulty}\nTime: ${formatTime(time)}\nMistakes: ${mistakes}\nGrade: ${gradeInfo.grade} ${gradeInfo.emoji}\n\nPlay Sudoku! 👇\nhttps://slox.co.kr/en/sudoku`;
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-4xl mx-auto bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="flex items-center justify-between h-14 px-4">
              <Link href="/en" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-white">SLOX</span>
              </Link>
              <Link href="/sudoku" className="px-3 py-1.5 text-sm text-dark-400 hover:text-white">🇰🇷 한국어</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {gameState === "ready" && (
            <div className="text-center">
              <div className="text-6xl mb-6">🧩</div>
              <h1 className="text-4xl font-black text-white mb-4">Sudoku</h1>
              <p className="text-dark-400 mb-8">Brain Training Puzzle</p>

              <div className="flex justify-center gap-2 mb-8">
                {(["easy", "medium", "hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      difficulty === d
                        ? "bg-emerald-500 text-black"
                        : "bg-dark-800 text-dark-400 hover:text-white"
                    }`}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>

              {/* 패널티 정보 */}
              <div className="flex justify-center gap-3 mb-6">
                <div className="px-3 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">Mistake Limit</span>
                  <span className="text-red-400 font-bold">{MAX_MISTAKES} times</span>
                </div>
                <div className="px-3 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">Time Penalty</span>
                  <span className="text-orange-400 font-bold">+{PENALTY_SECONDS}s</span>
                </div>
              </div>

              <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl">
                Start Game →
              </button>

              <div className="mt-12 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <h3 className="text-lg font-bold text-white mb-4">🏆 Top 10 ({difficulty})</h3>
                <div className="space-y-2">
                  {leaderboard.length === 0 ? (
                    <p className="text-dark-500">No challengers yet!</p>
                  ) : (
                    leaderboard.map((entry, idx) => (
                      <div key={entry.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-dark-800/50">
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-bold text-dark-400">{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`}</span>
                          <span className="text-white">{entry.nickname}</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{formatTime(entry.time_seconds)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6 text-sm">
                <div className="px-3 py-1.5 bg-dark-800 rounded-lg">
                  <span className="text-dark-400">⏱ </span>
                  <span className="text-cyan-400 font-bold">{formatTime(time)}</span>
                </div>
                <div className={`px-3 py-1.5 rounded-lg ${mistakes >= MAX_MISTAKES - 3 ? 'bg-red-500/20' : 'bg-dark-800'}`}>
                  <span className="text-dark-400">❌ </span>
                  <span className={`font-bold ${mistakes >= MAX_MISTAKES - 3 ? 'text-red-400' : 'text-orange-400'}`}>
                    {mistakes}/{MAX_MISTAKES}
                  </span>
                  <span className="text-dark-500 text-xs ml-1">({MAX_MISTAKES - mistakes} left)</span>
                </div>
              </div>

              {/* Sudoku Grid */}
              <div className="inline-block bg-dark-800 p-2 rounded-xl">
                <div className="grid grid-cols-9 gap-0.5">
                  {userInput.map((row, r) =>
                    row.map((cell, c) => (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg font-bold transition-all
                          ${puzzle[r][c] !== 0 ? "bg-dark-700 text-white" : "bg-dark-900 hover:bg-dark-800"}
                          ${selectedCell?.[0] === r && selectedCell?.[1] === c ? "ring-2 ring-emerald-500" : ""}
                          ${cell !== 0 && cell !== solution[r][c] ? "text-red-400" : cell !== 0 ? "text-emerald-400" : "text-transparent"}
                          ${c === 2 || c === 5 ? "mr-1" : ""}
                          ${r === 2 || r === 5 ? "mb-1" : ""}
                        `}
                      >
                        {cell || ""}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Number Buttons */}
              <div className="flex justify-center gap-2 mt-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    className="w-10 h-10 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-lg transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button onClick={() => setGameState("ready")} className="mt-6 px-4 py-2 text-dark-500 hover:text-white text-sm">
                ← Back
              </button>
            </div>
          )}

          {gameState === "complete" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <div className="text-5xl mb-4">{gradeInfo.emoji}</div>
                <h2 className={`text-4xl font-black mb-2 ${gradeInfo.color}`}>{gradeInfo.grade}</h2>
                <p className="text-dark-400">Time: {formatTime(time)} • Mistakes: {mistakes}</p>
                <p className="text-dark-500 text-sm">(includes +{mistakes * PENALTY_SECONDS}s penalty)</p>
                <div className="mt-8 flex flex-col gap-3">
                  <button onClick={() => setGameState("ready")} className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl">Play Again</button>
                  <button onClick={shareResult} className="py-3 px-6 bg-dark-800 text-white font-medium rounded-xl border border-dark-700">{showCopied ? "✅ Copied!" : "📤 Share"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 게임 오버 화면 */}
          {gameState === "gameover" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-red-500/30">
                <div className="text-6xl mb-4">😵</div>
                <h2 className="text-4xl font-black mb-2 text-red-400">Game Over!</h2>
                <p className="text-dark-400 mb-2">You made {MAX_MISTAKES} mistakes</p>
                <p className="text-dark-500 text-sm">Time: {formatTime(time)}</p>
                <div className="mt-8">
                  <button 
                    onClick={startGame} 
                    className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
                  >
                    🔄 Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{gradeInfo.emoji}</div>
              <h3 className={`text-3xl font-black ${gradeInfo.color}`}>{formatTime(time)}</h3>
              <p className="text-dark-400">{gradeInfo.grade}</p>
            </div>
            <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl mb-2">🏆 Register Ranking!</button>
            <button onClick={shareResult} className="w-full py-3 bg-dark-800 text-white font-medium rounded-xl border border-dark-700 mb-2">📤 Share</button>
            <button onClick={() => setShowRankingPrompt(false)} className="w-full py-2 text-dark-500 text-sm">Maybe Later</button>
          </div>
        </div>
      )}

      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Enter Your Nickname</h3>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" maxLength={10} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4 focus:outline-none focus:border-emerald-500" />
            <div className="flex gap-2">
              <button onClick={() => setShowNicknameModal(false)} className="flex-1 py-3 bg-dark-800 text-dark-400 rounded-xl">Cancel</button>
              <button onClick={submitScore} disabled={!nickname.trim()} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl disabled:opacity-50">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

