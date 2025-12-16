"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // 정답 인덱스 (0-3)
  category: string;
}

// 상식 퀴즈 문제들
const quizQuestions: Question[] = [
  {
    id: 1,
    question: "대한민국의 수도는?",
    options: ["부산", "서울", "인천", "대전"],
    answer: 1,
    category: "지리",
  },
  {
    id: 2,
    question: "태양계에서 가장 큰 행성은?",
    options: ["지구", "화성", "목성", "토성"],
    answer: 2,
    category: "과학",
  },
  {
    id: 3,
    question: "한글을 창제한 왕은?",
    options: ["태조", "세종대왕", "정조", "영조"],
    answer: 1,
    category: "역사",
  },
  {
    id: 4,
    question: "물의 화학식은?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    answer: 1,
    category: "과학",
  },
  {
    id: 5,
    question: "세계에서 가장 긴 강은?",
    options: ["아마존강", "나일강", "양쯔강", "미시시피강"],
    answer: 1,
    category: "지리",
  },
  {
    id: 6,
    question: "광복절은 몇 월 며칠인가요?",
    options: ["3월 1일", "6월 6일", "8월 15일", "10월 3일"],
    answer: 2,
    category: "역사",
  },
  {
    id: 7,
    question: "인체에서 가장 큰 장기는?",
    options: ["심장", "폐", "간", "피부"],
    answer: 3,
    category: "과학",
  },
  {
    id: 8,
    question: "피카소의 국적은?",
    options: ["프랑스", "이탈리아", "스페인", "네덜란드"],
    answer: 2,
    category: "예술",
  },
  {
    id: 9,
    question: "1년은 몇 주인가요?",
    options: ["48주", "50주", "52주", "54주"],
    answer: 2,
    category: "일반",
  },
  {
    id: 10,
    question: "지구의 위성은?",
    options: ["태양", "달", "화성", "금성"],
    answer: 1,
    category: "과학",
  },
  {
    id: 11,
    question: "'로미오와 줄리엣'의 작가는?",
    options: ["셰익스피어", "괴테", "톨스토이", "헤밍웨이"],
    answer: 0,
    category: "문학",
  },
  {
    id: 12,
    question: "올림픽은 몇 년마다 열리나요?",
    options: ["2년", "3년", "4년", "5년"],
    answer: 2,
    category: "스포츠",
  },
  {
    id: 13,
    question: "비틀즈의 출신 국가는?",
    options: ["미국", "영국", "호주", "캐나다"],
    answer: 1,
    category: "음악",
  },
  {
    id: 14,
    question: "DNA의 풀네임에서 D는?",
    options: ["Double", "Deoxyribo", "Digital", "Dynamic"],
    answer: 1,
    category: "과학",
  },
  {
    id: 15,
    question: "세계에서 인구가 가장 많은 나라는?",
    options: ["인도", "미국", "중국", "인도네시아"],
    answer: 0,
    category: "지리",
  },
  {
    id: 16,
    question: "축구 월드컵 우승 횟수가 가장 많은 나라는?",
    options: ["독일", "아르헨티나", "브라질", "이탈리아"],
    answer: 2,
    category: "스포츠",
  },
  {
    id: 17,
    question: "에펠탑이 있는 도시는?",
    options: ["런던", "파리", "로마", "베를린"],
    answer: 1,
    category: "지리",
  },
  {
    id: 18,
    question: "빛의 3원색이 아닌 것은?",
    options: ["빨강", "초록", "파랑", "노랑"],
    answer: 3,
    category: "과학",
  },
  {
    id: 19,
    question: "한국 전쟁이 시작된 연도는?",
    options: ["1945년", "1948년", "1950년", "1953년"],
    answer: 2,
    category: "역사",
  },
  {
    id: 20,
    question: "'모나리자'를 그린 화가는?",
    options: ["미켈란젤로", "레오나르도 다빈치", "라파엘로", "보티첼리"],
    answer: 1,
    category: "예술",
  },
];

type GameState = "ready" | "playing" | "result";

interface LeaderboardEntry {
  id: number;
  nickname: string;
  score: number;
  correct_count: number;
  time_seconds: number;
  created_at: string;
}

const QUESTION_TIME = 15; // 문제당 15초
const QUESTIONS_PER_GAME = 10;

export default function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<Question[]>([]);
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
        .from("quiz_leaderboard")
        .select("*", { count: "exact" })
        .order("score", { ascending: false })
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
    // 랜덤으로 10문제 선택
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, QUESTIONS_PER_GAME));
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
          // 시간 초과
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
    setSelectedAnswer(-1); // 시간 초과 표시
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
      // 점수 = 기본 100점 + 남은 시간 보너스
      const timeBonus = timeLeft * 5;
      setScore((prev) => prev + 100 + timeBonus);
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      goToNext();
    }, 1500);
  };

  // 다음 문제로
  const goToNext = () => {
    if (currentIndex + 1 >= QUESTIONS_PER_GAME) {
      // 게임 종료
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

  // 등급 계산
  const getGrade = () => {
    if (correctCount >= 10) return { grade: "천재", emoji: "🧠", color: "text-purple-400" };
    if (correctCount >= 8) return { grade: "박학다식", emoji: "📚", color: "text-blue-400" };
    if (correctCount >= 6) return { grade: "상식왕", emoji: "👑", color: "text-yellow-400" };
    if (correctCount >= 4) return { grade: "평범", emoji: "😊", color: "text-green-400" };
    if (correctCount >= 2) return { grade: "노력필요", emoji: "📖", color: "text-orange-400" };
    return { grade: "공부하자", emoji: "😅", color: "text-red-400" };
  };

  // 랭킹 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || hasSubmitted) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("quiz_leaderboard").insert({
        nickname: nickname.trim(),
        score,
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
  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            📚 상식 퀴즈
          </h1>
          <p className="text-dark-400">10문제를 풀고 당신의 상식을 테스트하세요!</p>
        </div>

        {/* 대기 화면 */}
        {gameState === "ready" && (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">🧠</div>
            <h2 className="text-2xl font-bold mb-4">상식 퀴즈에 도전하세요!</h2>
            <div className="text-dark-400 mb-8 space-y-2">
              <p>• 총 10문제, 문제당 15초</p>
              <p>• 빨리 맞출수록 높은 점수!</p>
              <p>• 역사, 과학, 지리 등 다양한 분야</p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              🚀 시작하기
            </button>

            {/* 랭킹 미리보기 */}
            {leaderboard.length > 0 && (
              <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
                <h3 className="text-lg font-bold mb-4">🏆 랭킹 TOP 5</h3>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, i) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                        <span className="font-medium">{entry.nickname}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold">{entry.score}점</span>
                        <span className="text-dark-500 text-sm ml-2">({entry.correct_count}/10)</span>
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
              </div>
              <div className="flex items-center gap-4">
                <div className="text-dark-400">
                  점수: <span className="text-yellow-400 font-bold">{score}</span>
                </div>
                <div className={`px-3 py-1 rounded-full font-bold ${timeLeft <= 5 ? "bg-red-500 animate-pulse" : "bg-dark-700"}`}>
                  ⏱️ {timeLeft}초
                </div>
              </div>
            </div>

            {/* 진행 바 */}
            <div className="h-2 bg-dark-700 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_GAME) * 100}%` }}
              />
            </div>

            {/* 문제 카드 */}
            <div className="bg-dark-800/50 border border-dark-700 rounded-3xl p-8 mb-6">
              <div className="text-sm text-indigo-400 mb-2">📂 {currentQuestion.category}</div>
              <h2 className="text-xl md:text-2xl font-bold">{currentQuestion.question}</h2>
            </div>

            {/* 선택지 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-4 rounded-2xl border-2 font-medium transition-all text-left ";
                
                if (showResult) {
                  if (index === currentQuestion.answer) {
                    buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                  } else if (index === selectedAnswer && !isCorrect) {
                    buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    buttonClass += "bg-dark-800/50 border-dark-700 text-dark-500";
                  }
                } else {
                  buttonClass += "bg-dark-800/50 border-dark-700 hover:border-indigo-500 hover:bg-indigo-500/10 cursor-pointer";
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <span className="text-lg mr-3">{["A", "B", "C", "D"][index]}.</span>
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
                {selectedAnswer === -1 ? "⏰ 시간 초과!" : isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다!"}
              </div>
            )}
          </div>
        )}

        {/* 결과 화면 */}
        {gameState === "result" && (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4">{gradeInfo.emoji}</div>
            <h2 className={`text-3xl font-bold mb-2 ${gradeInfo.color}`}>{gradeInfo.grade}</h2>
            
            <div className="my-8 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">{score}</div>
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
              <div className="mb-8 p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
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
              <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                ✅ 랭킹에 등록되었습니다!
              </div>
            )}

            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              🔄 다시 도전하기
            </button>

            {/* 랭킹 */}
            {leaderboard.length > 0 && (
              <div className="mt-12 p-6 bg-dark-800/50 rounded-2xl border border-dark-700 text-left">
                <h3 className="text-lg font-bold mb-4 text-center">🏆 실시간 랭킹</h3>
                <div className="space-y-2">
                  {leaderboard.map((entry, i) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-dark-900/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-8">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}</span>
                        <span className="font-medium">{entry.nickname}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-bold">{entry.score}점</span>
                        <span className="text-dark-500 text-sm ml-2">({entry.correct_count}/10)</span>
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

