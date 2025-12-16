"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const questions = [
  { q: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Rome"], answer: 1 },
  { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
  { q: "What is the largest planet in our solar system?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: 1 },
  { q: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
  { q: "What is H2O commonly known as?", options: ["Salt", "Water", "Sugar", "Oxygen"], answer: 1 },
  { q: "Who wrote Romeo and Juliet?", options: ["Dickens", "Shakespeare", "Austen", "Hemingway"], answer: 1 },
  { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
  { q: "How many bones are in the adult human body?", options: ["106", "206", "306", "406"], answer: 1 },
  { q: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
];

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  correct_count: number;
  created_at: string;
}

export default function QuizGameEN() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "result">("ready");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;
  const score = correctCount * 100 + answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 10 : 0), 0);

  const getGrade = useCallback(() => {
    if (correctCount >= 10) return { grade: "Perfect", emoji: "👑", color: "text-yellow-400" };
    if (correctCount >= 8) return { grade: "Excellent", emoji: "🌟", color: "text-purple-400" };
    if (correctCount >= 6) return { grade: "Good", emoji: "✨", color: "text-blue-400" };
    if (correctCount >= 4) return { grade: "Average", emoji: "📊", color: "text-green-400" };
    return { grade: "Keep Trying", emoji: "💪", color: "text-orange-400" };
  }, [correctCount]);

  const gradeInfo = getGrade();

  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("quiz_leaderboard")
      .select("*")
      .order("score", { ascending: false })
      .limit(10);
    if (data) setLeaderboard(data);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setAnswers([...answers, -1]);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
      } else {
        setGameState("result");
        setShowRankingPrompt(true);
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, currentQuestion, answers]);

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(15);
    setHasSubmitted(false);
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      setGameState("result");
      setShowRankingPrompt(true);
    }
  };

  const submitScore = async () => {
    if (!nickname.trim() || hasSubmitted) return;
    await supabase.from("quiz_leaderboard").insert({
      nickname: nickname.trim(),
      score,
      correct_count: correctCount,
      time_seconds: 150 - timeLeft,
    });
    setHasSubmitted(true);
    setShowNicknameModal(false);
    fetchLeaderboard();
  };

  const shareResult = async () => {
    const text = `📚 SLOX Trivia Quiz Result!\n\nScore: ${score}\nCorrect: ${correctCount}/10\nGrade: ${gradeInfo.grade} ${gradeInfo.emoji}\n\nTest your knowledge! 👇\nhttps://slox.co.kr/en/quiz`;
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
              <Link href="/quiz" className="px-3 py-1.5 text-sm text-dark-400 hover:text-white">🇰🇷 한국어</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {gameState === "ready" && (
            <div className="text-center">
              <div className="text-6xl mb-6">📚</div>
              <h1 className="text-4xl font-black text-white mb-4">Trivia Quiz</h1>
              <p className="text-dark-400 mb-8">10 questions • 15 seconds each</p>
              <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl">
                Start Quiz →
              </button>

              <div className="mt-12 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <h3 className="text-lg font-bold text-white mb-4">🏆 Top 10</h3>
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
                        <span className="text-blue-400 font-bold">{entry.score}pts</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="max-w-xl mx-auto">
              <div className="mb-8">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>Q{currentQuestion + 1}/10</span>
                  <span className={timeLeft <= 5 ? "text-red-400" : ""}>{timeLeft}s</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all" style={{ width: `${(timeLeft / 15) * 100}%` }} />
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <h2 className="text-xl font-bold text-white mb-6 text-center">{questions[currentQuestion].q}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button key={idx} onClick={() => selectAnswer(idx)} className="w-full py-4 px-6 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-blue-500 rounded-xl text-white font-medium transition-all text-left">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {gameState === "result" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <div className="text-5xl mb-4">{gradeInfo.emoji}</div>
                <h2 className={`text-4xl font-black mb-2 ${gradeInfo.color}`}>{score} pts</h2>
                <p className="text-xl text-white mb-2">{gradeInfo.grade}</p>
                <p className="text-dark-400">Correct: {correctCount}/10</p>
                <div className="mt-8 flex flex-col gap-3">
                  <button onClick={() => setGameState("ready")} className="py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl">Try Again</button>
                  <button onClick={shareResult} className="py-3 px-6 bg-dark-800 text-white font-medium rounded-xl border border-dark-700">{showCopied ? "✅ Copied!" : "📤 Share"}</button>
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
              <h3 className={`text-3xl font-black ${gradeInfo.color}`}>{score} pts</h3>
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
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" maxLength={10} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4 focus:outline-none focus:border-blue-500" />
            <div className="flex gap-2">
              <button onClick={() => setShowNicknameModal(false)} className="flex-1 py-3 bg-dark-800 text-dark-400 rounded-xl">Cancel</button>
              <button onClick={submitScore} disabled={!nickname.trim()} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl disabled:opacity-50">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

