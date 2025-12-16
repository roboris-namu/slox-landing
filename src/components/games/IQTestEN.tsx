"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 영어 IQ 테스트 - 패턴 문제들
const questions = [
  { id: 1, pattern: "2, 4, 8, 16, ?", options: ["24", "32", "30", "28"], answer: 1, hint: "Each number is multiplied by 2" },
  { id: 2, pattern: "1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "14"], answer: 2, hint: "Fibonacci sequence" },
  { id: 3, pattern: "3, 6, 11, 18, ?", options: ["25", "27", "29", "31"], answer: 1, hint: "+3, +5, +7, +9" },
  { id: 4, pattern: "A=1, B=2, C=3... then F+G=?", options: ["11", "12", "13", "14"], answer: 2, hint: "6+7=13" },
  { id: 5, pattern: "100, 50, 25, ?", options: ["12.5", "10", "15", "20"], answer: 0, hint: "Divided by 2" },
  { id: 6, pattern: "1, 4, 9, 16, 25, ?", options: ["30", "35", "36", "40"], answer: 2, hint: "Square numbers" },
  { id: 7, pattern: "2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], answer: 1, hint: "Differences: 4, 6, 8, 10, 12" },
  { id: 8, pattern: "ABC:CBA = DEF:?", options: ["EFD", "FED", "DEF", "FDE"], answer: 1, hint: "Reverse the letters" },
  { id: 9, pattern: "64, 32, 16, 8, ?", options: ["2", "4", "6", "0"], answer: 1, hint: "Divided by 2" },
  { id: 10, pattern: "1, 8, 27, 64, ?", options: ["100", "125", "150", "175"], answer: 1, hint: "Cube numbers" },
  { id: 11, pattern: "11, 13, 17, 19, 23, ?", options: ["27", "29", "31", "33"], answer: 1, hint: "Prime numbers" },
  { id: 12, pattern: "Z, X, V, T, ?", options: ["R", "S", "Q", "P"], answer: 0, hint: "Skip one letter backwards" },
];

interface LeaderboardEntry {
  id: string;
  nickname: string;
  iq_score: number;
  correct_count: number;
  time_seconds: number;
  grade: string;
  created_at: string;
}

export default function IQTestEN() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "result">("ready");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;

  // IQ 계산 (정답 개수 기반)
  const calculateIQ = useCallback(() => {
    const baseIQ = 70;
    const perQuestion = 10;
    const timeBonus = Math.max(0, Math.floor((300 - totalTime) / 30));
    return Math.min(160, baseIQ + (correctCount * perQuestion) + timeBonus);
  }, [correctCount, totalTime]);

  const iqScore = calculateIQ();

  const getGrade = useCallback(() => {
    if (iqScore >= 145) return { grade: "Genius", emoji: "👑", color: "text-yellow-400" };
    if (iqScore >= 130) return { grade: "Gifted", emoji: "💎", color: "text-purple-400" };
    if (iqScore >= 115) return { grade: "Superior", emoji: "🌟", color: "text-blue-400" };
    if (iqScore >= 100) return { grade: "Bright", emoji: "✨", color: "text-green-400" };
    if (iqScore >= 85) return { grade: "Average", emoji: "📊", color: "text-gray-400" };
    return { grade: "Below Average", emoji: "📈", color: "text-orange-400" };
  }, [iqScore]);

  const iqGrade = getGrade();

  // 리더보드 가져오기
  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("iq_leaderboard")
      .select("*")
      .order("iq_score", { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 게임 시작
  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers([]);
    setStartTime(Date.now());
    setHasSubmitted(false);
  };

  // 답변 선택
  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      setGameState("result");
      setShowRankingPrompt(true);
    }
  };

  // 점수 제출
  const submitScore = async () => {
    if (!nickname.trim() || hasSubmitted) return;
    
    const gradeInfo = getGrade();
    await supabase.from("iq_leaderboard").insert({
      nickname: nickname.trim(),
      iq_score: iqScore,
      correct_count: correctCount,
      time_seconds: totalTime,
      grade: gradeInfo.grade,
    });

    setHasSubmitted(true);
    setShowNicknameModal(false);
    fetchLeaderboard();
  };

  // 공유
  const shareResult = async () => {
    const gradeInfo = getGrade();
    const text = `🧠 SLOX IQ Test Result!\n\n` +
      `IQ: ${iqScore}\n` +
      `Grade: ${gradeInfo.grade} ${gradeInfo.emoji}\n` +
      `Correct: ${correctCount}/12\n` +
      `Time: ${totalTime}s\n\n` +
      `Test your IQ too! 👇\nhttps://slox.co.kr/en/iq`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
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
              <div className="flex items-center gap-2">
                <Link href="/en" className="px-3 py-1.5 text-sm text-dark-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/iq" className="px-3 py-1.5 text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1">
                  🇰🇷 한국어
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Ready State */}
          {gameState === "ready" && (
            <div className="text-center">
              <div className="text-6xl mb-6">🧠</div>
              <h1 className="text-4xl font-black text-white mb-4">IQ Test</h1>
              <p className="text-dark-400 mb-8">12 pattern recognition questions<br />Measure your intelligence!</p>
              
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/30"
              >
                Start Test →
              </button>

              {/* Leaderboard */}
              <div className="mt-12 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <h3 className="text-lg font-bold text-white mb-4">🏆 Top 10</h3>
                <div className="space-y-2">
                  {leaderboard.length === 0 ? (
                    <p className="text-dark-500">No challengers yet!</p>
                  ) : (
                    leaderboard.map((entry, idx) => (
                      <div key={entry.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-dark-800/50">
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-bold text-dark-400">
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`}
                          </span>
                          <span className="text-white">{entry.nickname}</span>
                        </div>
                        <span className="text-purple-400 font-bold">IQ {entry.iq_score}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Playing State */}
          {gameState === "playing" && (
            <div className="max-w-xl mx-auto">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>Question {currentQuestion + 1}/12</span>
                  <span>{Math.floor((Date.now() - startTime) / 1000)}s</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                    style={{ width: `${((currentQuestion + 1) / 12) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800 text-center">
                <div className="text-3xl font-mono font-bold text-white mb-8">
                  {questions[currentQuestion].pattern}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className="py-4 px-6 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-purple-500 rounded-xl text-white font-medium transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result State */}
          {gameState === "result" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <div className="text-5xl mb-4">{iqGrade.emoji}</div>
                <h2 className={`text-5xl font-black mb-2 ${iqGrade.color}`}>IQ {iqScore}</h2>
                <p className="text-xl text-white mb-2">{iqGrade.grade}</p>
                <p className="text-dark-400">
                  Correct: {correctCount}/12 • Time: {totalTime}s
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={() => setGameState("ready")}
                    className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={shareResult}
                    className="py-3 px-6 bg-dark-800 text-white font-medium rounded-xl border border-dark-700"
                  >
                    {showCopied ? "✅ Copied!" : "📤 Share Result"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranking Prompt */}
      {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{iqGrade.emoji}</div>
              <h3 className={`text-3xl font-black ${iqGrade.color}`}>IQ {iqScore}</h3>
              <p className="text-dark-400">{iqGrade.grade}</p>
            </div>
            <button
              onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl mb-2"
            >
              🏆 Register Ranking!
            </button>
            <button
              onClick={shareResult}
              className="w-full py-3 bg-dark-800 text-white font-medium rounded-xl border border-dark-700 mb-2"
            >
              📤 Share with Friends
            </button>
            <button
              onClick={() => setShowRankingPrompt(false)}
              className="w-full py-2 text-dark-500 text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* Nickname Modal */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Enter Your Nickname</h3>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname"
              maxLength={10}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4 focus:outline-none focus:border-purple-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowNicknameModal(false)}
                className="flex-1 py-3 bg-dark-800 text-dark-400 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={submitScore}
                disabled={!nickname.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

