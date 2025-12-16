"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface IQQuestion {
  id: number;
  pattern: string[]; // 이모지 패턴
  options: string[];
  answer: number;
  difficulty: number; // 1-5
}

// IQ/멘사 스타일 패턴 문제
const iqQuestions: IQQuestion[] = [
  // 난이도 1 - 쉬운 패턴
  {
    id: 1,
    pattern: ["🔴", "🔵", "🔴", "🔵", "?"],
    options: ["🔴", "🟢", "🔵", "🟡"],
    answer: 0,
    difficulty: 1,
  },
  {
    id: 2,
    pattern: ["⬛", "⬛", "⬜", "⬛", "⬛", "⬜", "⬛", "⬛", "?"],
    options: ["⬛", "⬜", "🔲", "🔳"],
    answer: 1,
    difficulty: 1,
  },
  {
    id: 3,
    pattern: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "?"],
    options: ["6️⃣", "5️⃣", "4️⃣", "7️⃣"],
    answer: 1,
    difficulty: 1,
  },
  // 난이도 2 - 약간 어려움
  {
    id: 4,
    pattern: ["🌑", "🌒", "🌓", "🌔", "?"],
    options: ["🌑", "🌕", "🌖", "🌗"],
    answer: 1,
    difficulty: 2,
  },
  {
    id: 5,
    pattern: ["🔺", "🔺🔺", "🔺🔺🔺", "?"],
    options: ["🔺🔺", "🔺🔺🔺🔺", "🔺", "🔺🔺🔺🔺🔺"],
    answer: 1,
    difficulty: 2,
  },
  {
    id: 6,
    pattern: ["🅰️", "🅱️", "🅰️", "🅱️", "🅱️", "🅰️", "🅱️", "🅱️", "?"],
    options: ["🅰️", "🅱️", "🅰️🅱️", "🅱️🅱️"],
    answer: 1,
    difficulty: 2,
  },
  // 난이도 3 - 중간
  {
    id: 7,
    pattern: ["2", "4", "8", "16", "?"],
    options: ["20", "24", "32", "64"],
    answer: 2,
    difficulty: 3,
  },
  {
    id: 8,
    pattern: ["🟥", "🟧", "🟨", "🟩", "?"],
    options: ["🟦", "🟪", "⬜", "⬛"],
    answer: 0,
    difficulty: 3,
  },
  {
    id: 9,
    pattern: ["◀️", "▶️", "◀️◀️", "▶️▶️", "◀️◀️◀️", "?"],
    options: ["▶️▶️", "▶️▶️▶️", "◀️◀️◀️◀️", "▶️"],
    answer: 1,
    difficulty: 3,
  },
  {
    id: 10,
    pattern: ["1", "1", "2", "3", "5", "8", "?"],
    options: ["10", "11", "12", "13"],
    answer: 3,
    difficulty: 3,
  },
  // 난이도 4 - 어려움
  {
    id: 11,
    pattern: ["🔲", "🔳", "🔲🔲", "🔳🔳", "🔲🔲🔲", "?"],
    options: ["🔳🔳", "🔳🔳🔳", "🔲🔲🔲🔲", "🔳"],
    answer: 1,
    difficulty: 4,
  },
  {
    id: 12,
    pattern: ["⭕", "⭕❌", "⭕❌⭕", "⭕❌⭕❌", "?"],
    options: ["⭕❌⭕❌⭕", "❌⭕❌⭕❌", "⭕⭕❌❌⭕", "❌❌⭕⭕❌"],
    answer: 0,
    difficulty: 4,
  },
  {
    id: 13,
    pattern: ["3", "6", "11", "18", "27", "?"],
    options: ["36", "38", "40", "42"],
    answer: 1,
    difficulty: 4,
  },
  {
    id: 14,
    pattern: ["🔵", "🔵🔴", "🔵🔴🔵", "🔵🔴🔵🔴", "🔵🔴🔵🔴🔵", "?"],
    options: ["🔵🔴🔵🔴🔵🔴", "🔴🔵🔴🔵🔴🔵", "🔵🔵🔴🔴🔵🔵", "🔴🔴🔵🔵🔴🔴"],
    answer: 0,
    difficulty: 4,
  },
  // 난이도 5 - 매우 어려움
  {
    id: 15,
    pattern: ["1", "4", "9", "16", "25", "?"],
    options: ["30", "35", "36", "49"],
    answer: 2,
    difficulty: 5,
  },
  {
    id: 16,
    pattern: ["🔴", "🔵🔵", "🔴🔴🔴", "🔵🔵🔵🔵", "?"],
    options: ["🔴🔴🔴🔴🔴", "🔵🔵🔵🔵🔵", "🔴🔴🔴🔴", "🔵🔵🔵"],
    answer: 0,
    difficulty: 5,
  },
  {
    id: 17,
    pattern: ["2", "3", "5", "7", "11", "13", "?"],
    options: ["15", "17", "19", "21"],
    answer: 1,
    difficulty: 5,
  },
  {
    id: 18,
    pattern: ["📦", "📦📦", "📦📦📦📦", "📦📦📦📦📦📦📦📦", "?"],
    options: ["📦 x 10", "📦 x 12", "📦 x 16", "📦 x 32"],
    answer: 2,
    difficulty: 5,
  },
  {
    id: 19,
    pattern: ["A1", "B2", "C3", "D4", "?"],
    options: ["E5", "F6", "E4", "D5"],
    answer: 0,
    difficulty: 4,
  },
  {
    id: 20,
    pattern: ["🟡", "🟡🟢", "🟡🟢🔵", "🟡🟢🔵🟣", "?"],
    options: ["🟡🟢🔵🟣🔴", "🔴🟡🟢🔵🟣", "🟡🟢🔵🟣🟤", "🟡🟢🔵🟣⚫"],
    answer: 0,
    difficulty: 5,
  },
];

type GameState = "ready" | "playing" | "result";

interface LeaderboardEntry {
  id: number;
  nickname: string;
  score: number;
  iq_score: number;
  correct_count: number;
  time_seconds: number;
  created_at: string;
}

const QUESTION_TIME = 30; // 문제당 30초
const QUESTIONS_PER_GAME = 12;

export default function IQTest() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<IQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [totalTime, setTotalTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // 랭킹 관련
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 랭킹 불러오기
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, count } = await supabase
        .from("iq_leaderboard")
        .select("*", { count: "exact" })
        .order("iq_score", { ascending: false })
        .limit(10);

      if (data) {
        setLeaderboard(data);
        setTotalCount(count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 게임 시작
  const startGame = () => {
    // 난이도별로 문제 선택 (쉬운 것부터 어려운 순서로)
    const easy = iqQuestions.filter(q => q.difficulty <= 2).sort(() => Math.random() - 0.5).slice(0, 4);
    const medium = iqQuestions.filter(q => q.difficulty === 3).sort(() => Math.random() - 0.5).slice(0, 4);
    const hard = iqQuestions.filter(q => q.difficulty >= 4).sort(() => Math.random() - 0.5).slice(0, 4);
    
    setQuestions([...easy, ...medium, ...hard]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setTotalTime(0);
    setShowResult(false);
    setShowRankingPrompt(false);
    setHasSubmitted(false);
    setGameState("playing");
  };

  // 타이머
  useEffect(() => {
    if (gameState !== "playing" || showResult) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return QUESTION_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    totalTimerRef.current = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [gameState, currentIndex, showResult]);

  // 시간 초과 처리
  const handleTimeout = () => {
    setSelectedAnswer(-1);
    setIsCorrect(false);
    setShowResult(true);
    
    setTimeout(() => {
      goToNext();
    }, 1500);
  };

  // 답변 선택
  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null || showResult) return;

    const correct = index === questions[currentIndex].answer;
    setSelectedAnswer(index);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const difficulty = questions[currentIndex].difficulty;
      const timeBonus = Math.floor(timeLeft * 2);
      const difficultyBonus = difficulty * 20;
      setScore((prev) => prev + 50 + timeBonus + difficultyBonus);
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      goToNext();
    }, 1500);
  };

  // 다음 문제로
  const goToNext = () => {
    if (currentIndex + 1 >= QUESTIONS_PER_GAME) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
      setGameState("result");
      setShowRankingPrompt(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
      setTimeLeft(QUESTION_TIME);
    }
  };

  // IQ 점수 계산 (간단한 공식)
  const calculateIQ = () => {
    // 기본 IQ 100에서 시작
    // 정답 개수에 따라 가산
    const baseIQ = 80;
    const correctBonus = correctCount * 10;
    const speedBonus = Math.max(0, Math.floor((QUESTIONS_PER_GAME * 30 - totalTime) / 20));
    return Math.min(160, baseIQ + correctBonus + speedBonus);
  };

  // IQ 등급
  const getIQGrade = (iq: number) => {
    if (iq >= 145) return { grade: "천재", emoji: "🧠", color: "text-purple-400", desc: "상위 0.1%" };
    if (iq >= 130) return { grade: "수재", emoji: "💎", color: "text-blue-400", desc: "상위 2%" };
    if (iq >= 115) return { grade: "우수", emoji: "⭐", color: "text-cyan-400", desc: "상위 15%" };
    if (iq >= 100) return { grade: "평균", emoji: "👍", color: "text-green-400", desc: "평균" };
    if (iq >= 85) return { grade: "보통", emoji: "😊", color: "text-yellow-400", desc: "평균 이하" };
    return { grade: "노력필요", emoji: "📚", color: "text-orange-400", desc: "더 노력해요!" };
  };

  // 랭킹 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || hasSubmitted) return;

    const iqScore = calculateIQ();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("iq_leaderboard").insert({
        nickname: nickname.trim(),
        score,
        iq_score: iqScore,
        correct_count: correctCount,
        time_seconds: totalTime,
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

  const currentQuestion = questions[currentIndex];
  const iqScore = calculateIQ();
  const iqGrade = getIQGrade(iqScore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🧠 IQ 테스트
          </h1>
          <p className="text-dark-400">패턴을 찾아 당신의 IQ를 측정하세요!</p>
        </div>

        {/* 대기 화면 */}
        {gameState === "ready" && (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">🧩</div>
            <h2 className="text-2xl font-bold mb-4">멘사 스타일 IQ 테스트</h2>
            <div className="text-dark-400 mb-8 space-y-2">
              <p>• 총 12문제, 문제당 30초</p>
              <p>• 패턴을 분석하고 다음에 올 것을 맞추세요</p>
              <p>• 난이도가 점점 올라갑니다!</p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              🚀 테스트 시작
            </button>

            {/* 랭킹 미리보기 */}
            {leaderboard.length > 0 && (
              <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
                <h3 className="text-lg font-bold mb-4">🏆 IQ 랭킹 TOP 5</h3>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                        <span className="font-medium">{entry.nickname}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-purple-400 font-bold">IQ {entry.iq_score}</span>
                        <span className="text-dark-500 text-sm ml-2">({entry.correct_count}/12)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 게임 화면 */}
        {gameState === "playing" && currentQuestion && (
          <div className="py-8">
            {/* 진행 상황 */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-dark-400">
                문제 <span className="text-white font-bold">{currentIndex + 1}</span> / {QUESTIONS_PER_GAME}
                <span className="ml-2 text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                  난이도 {currentQuestion.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-dark-400">
                  점수: <span className="text-purple-400 font-bold">{score}</span>
                </div>
                <div className={`px-3 py-1 rounded-full font-bold ${timeLeft <= 10 ? "bg-red-500 animate-pulse" : "bg-dark-700"}`}>
                  ⏱️ {timeLeft}초
                </div>
              </div>
            </div>

            {/* 진행 바 */}
            <div className="h-2 bg-dark-700 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_GAME) * 100}%` }}
              />
            </div>

            {/* 문제 카드 */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-3xl p-8 mb-6 text-center">
              <p className="text-dark-400 mb-4">다음 패턴에서 ?에 들어갈 것은?</p>
              <div className="text-3xl md:text-4xl font-mono tracking-wider flex flex-wrap justify-center gap-2">
                {currentQuestion.pattern.map((item, i) => (
                  <span 
                    key={i} 
                    className={item === "?" ? "text-purple-400 animate-pulse" : ""}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 선택지 */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-6 rounded-2xl border-2 font-medium transition-all text-center text-2xl ";
                
                if (showResult) {
                  if (index === currentQuestion.answer) {
                    buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                  } else if (index === selectedAnswer && !isCorrect) {
                    buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    buttonClass += "bg-dark-800/50 border-dark-700 text-dark-500";
                  }
                } else {
                  buttonClass += "bg-dark-800/50 border-dark-700 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer";
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* 결과 표시 */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-2xl text-center font-bold text-lg ${
                isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}>
                {selectedAnswer === -1 ? "⏰ 시간 초과!" : isCorrect ? "✅ 정답!" : "❌ 오답!"}
              </div>
            )}
          </div>
        )}

        {/* 결과 화면 */}
        {gameState === "result" && (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4">{iqGrade.emoji}</div>
            <h2 className={`text-4xl font-bold mb-2 ${iqGrade.color}`}>IQ {iqScore}</h2>
            <p className="text-xl text-dark-400 mb-2">{iqGrade.grade}</p>
            <p className="text-dark-500">{iqGrade.desc}</p>
            
            <div className="my-8 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-400">{score}</div>
                  <div className="text-dark-400 text-sm">총점</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">{correctCount}/{QUESTIONS_PER_GAME}</div>
                  <div className="text-dark-400 text-sm">정답</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">{totalTime}초</div>
                  <div className="text-dark-400 text-sm">소요시간</div>
                </div>
              </div>
            </div>

            {/* 랭킹 등록 */}
            {showRankingPrompt && !hasSubmitted && (
              <div className="mb-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">🏆 랭킹에 등록하시겠습니까?</h3>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임 입력"
                    maxLength={10}
                    className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={submitScore}
                    disabled={!nickname.trim() || isSubmitting}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 rounded-xl font-medium transition-colors"
                  >
                    {isSubmitting ? "..." : "등록"}
                  </button>
                </div>
              </div>
            )}

            {hasSubmitted && (
              <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                ✅ 랭킹에 등록되었습니다!
              </div>
            )}

            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              🔄 다시 도전하기
            </button>

            {/* 랭킹 */}
            {leaderboard.length > 0 && (
              <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700 text-left">
                <h3 className="text-lg font-bold mb-4 text-center">🏆 IQ 랭킹</h3>
                <div className="space-y-2">
                  {leaderboard.map((entry, i) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-8">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                        <span className="font-medium">{entry.nickname}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-purple-400 font-bold">IQ {entry.iq_score}</span>
                        <span className="text-dark-500 text-sm ml-2">({entry.correct_count}/12)</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-dark-500 text-sm mt-4">
                  총 {totalCount}명 참여
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

