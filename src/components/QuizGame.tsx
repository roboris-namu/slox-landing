"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import AdBanner from "./AdBanner";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";


// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/quiz" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/quiz" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/quiz" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/quiz" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/quiz" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/quiz" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/quiz" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/quiz" },
];

// 다국어 번역
const quizTranslations: Record<string, {
  gradeTable: string;
  gradeDesc: string;
  grades: { name: string; emoji: string; range: string }[];
}> = {
  ko: {
    gradeTable: "🏆 등급표",
    gradeDesc: "💡 점수 = (정답 수 × 1000) + 남은 시간",
    grades: [
      { name: "천재", emoji: "🧠", range: "10,000점+" },
      { name: "박학다식", emoji: "📚", range: "8,000~9,999" },
      { name: "상식왕", emoji: "👑", range: "6,000~7,999" },
      { name: "평범", emoji: "😊", range: "4,000~5,999" },
      { name: "노력필요", emoji: "📖", range: "2,000~3,999" },
      { name: "공부하자", emoji: "😅", range: "0~1,999" },
    ],
  },
  en: {
    gradeTable: "🏆 Grade Table",
    gradeDesc: "💡 Score = (Correct × 1000) + Time Left",
    grades: [
      { name: "Genius", emoji: "🧠", range: "10,000+" },
      { name: "Scholar", emoji: "📚", range: "8,000~9,999" },
      { name: "Expert", emoji: "👑", range: "6,000~7,999" },
      { name: "Average", emoji: "😊", range: "4,000~5,999" },
      { name: "Needs Work", emoji: "📖", range: "2,000~3,999" },
      { name: "Beginner", emoji: "😅", range: "0~1,999" },
    ],
  },
  ja: {
    gradeTable: "🏆 等級表",
    gradeDesc: "💡 スコア = (正解数 × 1000) + 残り時間",
    grades: [
      { name: "天才", emoji: "🧠", range: "10,000+" },
      { name: "博識", emoji: "📚", range: "8,000~9,999" },
      { name: "達人", emoji: "👑", range: "6,000~7,999" },
      { name: "普通", emoji: "😊", range: "4,000~5,999" },
      { name: "努力必要", emoji: "📖", range: "2,000~3,999" },
      { name: "初心者", emoji: "😅", range: "0~1,999" },
    ],
  },
  zh: {
    gradeTable: "🏆 等级表",
    gradeDesc: "💡 分数 = (正确数 × 1000) + 剩余时间",
    grades: [
      { name: "天才", emoji: "🧠", range: "10,000+" },
      { name: "博学", emoji: "📚", range: "8,000~9,999" },
      { name: "专家", emoji: "👑", range: "6,000~7,999" },
      { name: "普通", emoji: "😊", range: "4,000~5,999" },
      { name: "需努力", emoji: "📖", range: "2,000~3,999" },
      { name: "初学者", emoji: "😅", range: "0~1,999" },
    ],
  },
  de: {
    gradeTable: "🏆 Bewertungstabelle",
    gradeDesc: "💡 Punkte = (Richtig × 1000) + Restzeit",
    grades: [
      { name: "Genie", emoji: "🧠", range: "10.000+" },
      { name: "Gelehrter", emoji: "📚", range: "8.000~9.999" },
      { name: "Experte", emoji: "👑", range: "6.000~7.999" },
      { name: "Normal", emoji: "😊", range: "4.000~5.999" },
      { name: "Übung nötig", emoji: "📖", range: "2.000~3.999" },
      { name: "Anfänger", emoji: "😅", range: "0~1.999" },
    ],
  },
  fr: {
    gradeTable: "🏆 Tableau des grades",
    gradeDesc: "💡 Score = (Correct × 1000) + Temps restant",
    grades: [
      { name: "Génie", emoji: "🧠", range: "10 000+" },
      { name: "Érudit", emoji: "📚", range: "8 000~9 999" },
      { name: "Expert", emoji: "👑", range: "6 000~7 999" },
      { name: "Moyen", emoji: "😊", range: "4 000~5 999" },
      { name: "À améliorer", emoji: "📖", range: "2 000~3 999" },
      { name: "Débutant", emoji: "😅", range: "0~1 999" },
    ],
  },
  es: {
    gradeTable: "🏆 Tabla de grados",
    gradeDesc: "💡 Puntos = (Correctas × 1000) + Tiempo restante",
    grades: [
      { name: "Genio", emoji: "🧠", range: "10.000+" },
      { name: "Erudito", emoji: "📚", range: "8.000~9.999" },
      { name: "Experto", emoji: "👑", range: "6.000~7.999" },
      { name: "Normal", emoji: "😊", range: "4.000~5.999" },
      { name: "Mejorar", emoji: "📖", range: "2.000~3.999" },
      { name: "Principiante", emoji: "😅", range: "0~1.999" },
    ],
  },
  pt: {
    gradeTable: "🏆 Tabela de níveis",
    gradeDesc: "💡 Pontos = (Corretas × 1000) + Tempo restante",
    grades: [
      { name: "Gênio", emoji: "🧠", range: "10.000+" },
      { name: "Estudioso", emoji: "📚", range: "8.000~9.999" },
      { name: "Especialista", emoji: "👑", range: "6.000~7.999" },
      { name: "Normal", emoji: "😊", range: "4.000~5.999" },
      { name: "Melhorar", emoji: "📖", range: "2.000~3.999" },
      { name: "Iniciante", emoji: "😅", range: "0~1.999" },
    ],
  },
};

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  category: string;
}

const quizQuestions: Question[] = [
  { id: 1, question: "대한민국의 수도는?", options: ["부산", "서울", "인천", "대전"], answer: 1, category: "지리" },
  { id: 2, question: "태양계에서 가장 큰 행성은?", options: ["지구", "화성", "목성", "토성"], answer: 2, category: "과학" },
  { id: 3, question: "한글을 창제한 왕은?", options: ["태조", "세종대왕", "정조", "영조"], answer: 1, category: "역사" },
  { id: 4, question: "물의 화학식은?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1, category: "과학" },
  { id: 5, question: "세계에서 가장 긴 강은?", options: ["아마존강", "나일강", "양쯔강", "미시시피강"], answer: 1, category: "지리" },
  { id: 6, question: "광복절은 몇 월 며칠인가요?", options: ["3월 1일", "6월 6일", "8월 15일", "10월 3일"], answer: 2, category: "역사" },
  { id: 7, question: "인체에서 가장 큰 장기는?", options: ["심장", "폐", "간", "피부"], answer: 3, category: "과학" },
  { id: 8, question: "피카소의 국적은?", options: ["프랑스", "이탈리아", "스페인", "네덜란드"], answer: 2, category: "예술" },
  { id: 9, question: "1년은 몇 주인가요?", options: ["48주", "50주", "52주", "54주"], answer: 2, category: "일반" },
  { id: 10, question: "지구의 위성은?", options: ["태양", "달", "화성", "금성"], answer: 1, category: "과학" },
  { id: 11, question: "'로미오와 줄리엣'의 작가는?", options: ["셰익스피어", "괴테", "톨스토이", "헤밍웨이"], answer: 0, category: "문학" },
  { id: 12, question: "올림픽은 몇 년마다 열리나요?", options: ["2년", "3년", "4년", "5년"], answer: 2, category: "스포츠" },
  { id: 13, question: "비틀즈의 출신 국가는?", options: ["미국", "영국", "호주", "캐나다"], answer: 1, category: "음악" },
  { id: 14, question: "DNA의 풀네임에서 D는?", options: ["Double", "Deoxyribo", "Digital", "Dynamic"], answer: 1, category: "과학" },
  { id: 15, question: "세계에서 인구가 가장 많은 나라는?", options: ["인도", "미국", "중국", "인도네시아"], answer: 0, category: "지리" },
  { id: 16, question: "축구 월드컵 우승 횟수가 가장 많은 나라는?", options: ["독일", "아르헨티나", "브라질", "이탈리아"], answer: 2, category: "스포츠" },
  { id: 17, question: "에펠탑이 있는 도시는?", options: ["런던", "파리", "로마", "베를린"], answer: 1, category: "지리" },
  { id: 18, question: "빛의 3원색이 아닌 것은?", options: ["빨강", "초록", "파랑", "노랑"], answer: 3, category: "과학" },
  { id: 19, question: "한국 전쟁이 시작된 연도는?", options: ["1945년", "1948년", "1950년", "1953년"], answer: 2, category: "역사" },
  { id: 20, question: "'모나리자'를 그린 화가는?", options: ["미켈란젤로", "레오나르도 다빈치", "라파엘로", "보티첼리"], answer: 1, category: "예술" },
];

type GameState = "ready" | "playing" | "result";

interface LeaderboardEntry {
  id: number;
  nickname: string;
  score: number;
  correct_count: number;
  time_seconds: number;
  created_at: string;
  grade?: string;
  country?: string;
  user_id?: string | null;
  avatar_url?: string;
  overall_rank?: number;
}

// 국가 옵션
const COUNTRY_OPTIONS = [
  { code: "KR", flag: "🇰🇷", name: "한국" },
  { code: "US", flag: "🇺🇸", name: "미국" },
  { code: "JP", flag: "🇯🇵", name: "일본" },
  { code: "CN", flag: "🇨🇳", name: "중국" },
  { code: "DE", flag: "🇩🇪", name: "독일" },
  { code: "FR", flag: "🇫🇷", name: "프랑스" },
  { code: "ES", flag: "🇪🇸", name: "스페인" },
  { code: "BR", flag: "🇧🇷", name: "브라질" },
  { code: "GB", flag: "🇬🇧", name: "영국" },
  { code: "CA", flag: "🇨🇦", name: "캐나다" },
  { code: "AU", flag: "🇦🇺", name: "호주" },
  { code: "IN", flag: "🇮🇳", name: "인도" },
  { code: "RU", flag: "🇷🇺", name: "러시아" },
  { code: "IT", flag: "🇮🇹", name: "이탈리아" },
  { code: "MX", flag: "🇲🇽", name: "멕시코" },
  { code: "TH", flag: "🇹🇭", name: "태국" },
  { code: "VN", flag: "🇻🇳", name: "베트남" },
  { code: "ID", flag: "🇮🇩", name: "인도네시아" },
  { code: "PH", flag: "🇵🇭", name: "필리핀" },
  { code: "MY", flag: "🇲🇾", name: "말레이시아" },
  { code: "SG", flag: "🇸🇬", name: "싱가포르" },
  { code: "NZ", flag: "🇳🇿", name: "뉴질랜드" },
  { code: "OTHER", flag: "🌍", name: "기타" },
];

const QUESTION_TIME = 15;
const QUESTIONS_PER_GAME = 10;

interface QuizGameProps {
  locale?: string;
  battleMode?: boolean; // 🥊 배틀 모드
  onBattleComplete?: (score: number) => void; // 🥊 배틀 완료 콜백
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function QuizGame({ locale: _propLocale, battleMode = false, onBattleComplete }: QuizGameProps = {}) {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeBonus, setTimeBonus] = useState(0); // 남은 시간 총합
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [totalTime, setTotalTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [locale, setLocale] = useState("ko");

  // 쿠키에서 언어 감지
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    const savedLocale = getCookie("SLOX_LOCALE") || "ko";
    setLocale(savedLocale);
  }, []);

  const qt = quizTranslations[locale] || quizTranslations.ko;
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("KR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // 👤 로그인 유저 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);
  
  // 🥊 배틀 관련 상태
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [battleUrl, setBattleUrl] = useState<string | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  // 👤 로그인 상태 확인 (광고 차단기 우회)
  useEffect(() => {
    const checkUser = async () => {
      let userId: string | null = null;
      try {
        const sloxSession = localStorage.getItem("slox-session");
        if (sloxSession) {
          const parsed = JSON.parse(sloxSession);
          if (parsed?.user?.id) userId = parsed.user.id;
        }
        if (!userId) {
          const keys = Object.keys(localStorage);
          for (const key of keys) {
            if (key.includes("sb-") && key.includes("-auth-token")) {
              const value = localStorage.getItem(key);
              if (value) {
                const parsed = JSON.parse(value);
                if (parsed?.user?.id) { userId = parsed.user.id; break; }
              }
            }
          }
        }
      } catch { /* 무시 */ }
      if (!userId) {
        try {
      const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) userId = session.user.id;
        } catch { /* 차단됨 */ }
      }
      if (userId) {
        setCurrentUserId(userId);
        try {
          const response = await fetch(`/api/profile?userId=${userId}`);
          const { profile } = await response.json();
          if (profile?.nickname) {
          setCurrentUserNickname(profile.nickname);
          setNickname(profile.nickname);
        }
        } catch { /* 무시 */ }
        
        // 🎮 pending_game_score 확인
        try {
          const pendingScore = localStorage.getItem("pending_game_score");
          if (pendingScore) {
            const data = JSON.parse(pendingScore);
            if (data.game === "quiz" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              setCorrectCount(data.correctCount || 0);
              setTimeBonus(data.timeBonus || 0);
              setGameState("result");
              setTimeout(() => { setShowNicknameModal(true); }, 500);
            }
            localStorage.removeItem("pending_game_score");
          }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
  }, []);

  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=quiz&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (error) { console.error("Failed to fetch leaderboard:", error); }
  }, []);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 결과 시 정확한 순위 계산
  useEffect(() => {
    if (gameState === "result" && correctCount > 0) {
      // score = correctCount * 1000 + timeBonus (API scoreField와 일치)
      const myFinalScore = correctCount * 1000 + timeBonus;
      fetch(`/api/leaderboard?game=quiz&limit=10&myScore=${myFinalScore}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
      
      // 🥊 배틀 모드: 게임 완료 시 점수 전달
      if (battleMode && onBattleComplete && !battleCompleted) {
        setBattleCompleted(true);
        onBattleComplete(correctCount);
      }
    }
  }, [gameState, correctCount, timeBonus, battleMode, onBattleComplete, battleCompleted]);

  // 🥊 도전장 만들기 함수
  const createBattle = async () => {
    if (!currentUserId || !nickname) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsCreatingBattle(true);
    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          challengerId: currentUserId,
          challengerNickname: nickname,
          challengerScore: correctCount,
          game: "quiz",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "도전장 생성 실패");
      }

      const fullUrl = `https://www.slox.co.kr${data.battleUrl}`;
      setBattleUrl(fullUrl);
      setShowBattleModal(true);
    } catch (error) {
      console.error("도전장 생성 에러:", error);
      alert("도전장 생성에 실패했습니다.");
    } finally {
      setIsCreatingBattle(false);
    }
  };

  // 🥊 도전장 링크 복사
  const copyBattleUrl = async () => {
    if (!battleUrl) return;
    
    const text = `🥊 ${nickname}의 도전장!\n\n❓ 상식퀴즈: ${correctCount}/${QUESTIONS_PER_GAME}점\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다! 친구에게 공유하세요 🎮");
    } catch {
      prompt("텍스트를 복사하세요:", text);
    }
  };

  const startGame = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, QUESTIONS_PER_GAME));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCorrectCount(0);
    setTimeBonus(0);
    setTimeLeft(QUESTION_TIME);
    setTotalTime(0);
    setShowResult(false);
    setShowRankingPrompt(false);
    setHasSubmitted(false);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing" || showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { handleTimeout(); return QUESTION_TIME; }
        return prev - 1;
      });
    }, 1000);
    totalTimerRef.current = setInterval(() => { setTotalTime((prev) => prev + 1); }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, currentIndex, showResult]);

  const handleTimeout = () => {
    setSelectedAnswer(-1);
    setIsCorrect(false);
    setShowResult(true);
    setTimeout(() => { goToNext(); }, 1500);
  };

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null || showResult) return;
    const correct = index === questions[currentIndex].answer;
    setSelectedAnswer(index);
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setCorrectCount((prev) => prev + 1);
      setTimeBonus((prev) => prev + timeLeft); // 남은 시간 누적
    }
    setTimeout(() => { goToNext(); }, 1500);
  };

  // 최종 점수 계산: (정답 수 × 1000) + 남은 시간 총합
  const getFinalScore = () => correctCount * 1000 + timeBonus;

  const goToNext = () => {
    // 모바일에서 버튼 focus 제거
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
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

  const getGrade = () => {
    const finalScore = getFinalScore();
    if (finalScore >= 10000) return { grade: "천재", emoji: "🧠", color: "text-purple-400" };
    if (finalScore >= 8000) return { grade: "박학다식", emoji: "📚", color: "text-blue-400" };
    if (finalScore >= 6000) return { grade: "상식왕", emoji: "👑", color: "text-yellow-400" };
    if (finalScore >= 4000) return { grade: "평범", emoji: "😊", color: "text-green-400" };
    if (finalScore >= 2000) return { grade: "노력필요", emoji: "📖", color: "text-orange-400" };
    return { grade: "공부하자", emoji: "😅", color: "text-red-400" };
  };

  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  const submitScore = async () => {
    // 🔄 실시간 세션 재확인 (로그아웃 후 등록 방지)
    let realUserId: string | null = null;
    let realUserNickname: string | null = null;
    try {
      const sloxSession = localStorage.getItem("slox-session");
      if (sloxSession) {
        const parsed = JSON.parse(sloxSession);
        if (parsed?.user?.id) {
          realUserId = parsed.user.id;
          const res = await fetch(`/api/profile?userId=${parsed.user.id}`);
          const { profile } = await res.json();
          if (profile?.nickname) realUserNickname = profile.nickname;
        }
      }
      if (!realUserId) {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.includes("sb-") && key.includes("-auth-token")) {
            const value = localStorage.getItem(key);
            if (value) {
              const parsed = JSON.parse(value);
              if (parsed?.user?.id) { 
                realUserId = parsed.user.id;
                const res = await fetch(`/api/profile?userId=${parsed.user.id}`);
                const { profile } = await res.json();
                if (profile?.nickname) realUserNickname = profile.nickname;
                break; 
              }
            }
          }
        }
      }
    } catch { /* 무시 */ }
    
    const finalNickname = realUserId && realUserNickname ? realUserNickname : nickname.trim();
    const finalUserId = realUserId;
    if (!finalNickname || isSubmitting || hasSubmitted) return;
    setIsSubmitting(true);
    const gradeInfo = getGrade();
    const finalScore = getFinalScore();
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "quiz",
          data: {
        nickname: finalNickname.slice(0, 20),
        score: finalScore,
        correct_count: correctCount,
        time_seconds: totalTime,
        grade: gradeInfo.grade,
        country: selectedCountry,
          },
          userId: finalUserId,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // 👤 회원 점수 업데이트는 API에서 자동 처리됨
        setHasSubmitted(true); setShowNicknameModal(false); setShowRankingPrompt(false); fetchLeaderboard();
      } else {
        throw new Error(result.error);
      }
    } catch (error) { console.error("Failed to submit score:", error); }
    finally { setIsSubmitting(false); }
  };

  // 카카오 인앱 브라우저 감지
  const isKakaoInApp = () => {
    if (typeof window === "undefined") return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("kakaotalk");
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
    const shareUrl = "https://www.slox.co.kr/quiz";
    const firstPlace = leaderboard[0];
    
    const text = `📚 상식 퀴즈 결과!\n\n` +
      `${gradeInfo.emoji} ${gradeInfo.grade}\n` +
      `✅ 정답: ${correctCount}/${QUESTIONS_PER_GAME}\n` +
      `🎯 점수: ${getFinalScore().toLocaleString()}점\n` +
      `⏱️ 소요시간: ${totalTime}초\n\n` +
      (firstPlace ? `🏆 현재 1위: ${firstPlace.nickname} (${firstPlace.score}점)\n\n` : "") +
      `나도 도전하기 👇\n${shareUrl}`;

    if (isKakaoInApp()) {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      return;
    }

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
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
      const file = new File([blob], `quiz-${getFinalScore()}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `📚 상식 퀴즈! https://www.slox.co.kr/quiz` };
      if (navigator.canShare?.(shareData)) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `quiz-${getFinalScore()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!"), 500);
    }
  };

  const currentQuestion = questions[currentIndex];
  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - 로그인 상태 표시 포함 */}
      <GameNavBar
        locale="ko"
        backText="← 메인"
        languageOptions={languageOptions}
      />

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-indigo-400 text-sm font-medium">📚 상식 퀴즈</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              상식
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"> 퀴즈</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">10문제로 당신의 상식을 테스트하세요!</p>
          </div>

          {/* 게임 모드 안내 */}
          {gameState === "ready" && (
            <div className="flex justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">문제 수</span>
                <span className="text-white font-bold">10개</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">문제당</span>
                <span className="text-white font-bold">15초</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">분야</span>
                <span className="text-white font-bold">다양함</span>
              </div>
            </div>
          )}

          {/* 게임 상태 표시 */}
          {gameState === "playing" && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="px-5 py-2 rounded-xl border-2 border-indigo-500/50 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-dark-400 text-xs">현재 점수</p>
                      <p className="text-2xl font-black text-white">{(correctCount * 1000 + timeBonus).toLocaleString()}점</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className={`text-center px-4 py-2 rounded-xl transition-all ${timeLeft <= 5 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'}`}>
                  <p className="text-dark-400 text-xs">⏱️ 남은 시간</p>
                  <p className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>{timeLeft}초</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">문제</p>
                  <p className="text-xl font-bold text-green-400">{currentIndex + 1}/{QUESTIONS_PER_GAME}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">정답</p>
                  <p className="text-xl font-bold text-yellow-400">{correctCount}개</p>
                </div>
              </div>
            </div>
          )}

          {/* 팁 */}
          {gameState === "ready" && (
            <div className="mb-8 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium mb-1">상식 퀴즈 팁</p>
                  <p className="text-dark-400 text-sm">빨리 정답을 맞출수록 높은 점수! 시간 보너스를 노려보세요.</p>
                </div>
              </div>
            </div>
          )}

          {/* 게임 영역 */}
          <div className="relative rounded-2xl p-6 mb-8 min-h-[400px] bg-dark-900">
            {/* 대기 화면 */}
            {gameState === "ready" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-bounce">📚</div>
                <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                <p className="text-dark-400 mb-6">역사, 과학, 지리 등 다양한 분야!</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                  🎮 게임 시작
                </button>
              </div>
            )}

            {/* 문제 화면 */}
            {gameState === "playing" && currentQuestion && (
              <div className="py-4">
                <div className="h-2 bg-dark-700 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_GAME) * 100}%` }} />
                </div>
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 mb-6">
                  <div className="text-sm text-indigo-400 mb-2">📂 {currentQuestion.category}</div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{currentQuestion.question}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, index) => {
                    let buttonClass = "p-4 rounded-xl border-2 font-medium transition-all text-left outline-none ";
                    if (showResult) {
                      if (index === currentQuestion.answer) buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                      else if (index === selectedAnswer && !isCorrect) buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                      else buttonClass += "bg-dark-800/50 border-dark-700/50 text-dark-500";
                    } else {
                      buttonClass += "bg-dark-800/50 border-transparent hover:border-indigo-500 hover:bg-indigo-500/10 focus:border-transparent focus:bg-dark-800/50 active:border-indigo-500 active:bg-indigo-500/20 cursor-pointer text-white";
                    }
                    return (
                      <button key={index} onClick={() => selectAnswer(index)} disabled={showResult} className={buttonClass}>
                        <span className="text-lg mr-3">{["A", "B", "C", "D"][index]}.</span>{option}
                      </button>
                    );
                  })}
                </div>
                {showResult && (
                  <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {selectedAnswer === -1 ? "⏰ 시간 초과!" : isCorrect ? "✅ 정답!" : "❌ 오답!"}
                  </div>
                )}
              </div>
            )}

            {/* 결과 화면 */}
            {gameState === "result" && (
              <div className="py-4 text-center">
                <div className="text-6xl mb-4">{gradeInfo.emoji}</div>
                <h2 className={`text-3xl font-bold mb-2 ${gradeInfo.color}`}>{gradeInfo.grade}</h2>
                
                <div className="my-6 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-yellow-400">{getFinalScore().toLocaleString()}</div>
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

                {hasSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
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
                  <button onClick={startGame} className="px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl">
                    🔄 다시 도전
                  </button>
                </div>
                
                {!hasSubmitted && correctCount > 0 && (
                  <button onClick={() => setShowNicknameModal(true)} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                    🏆 랭킹 등록!
                  </button>
                )}
                
                {/* 🥊 도전장 만들기 버튼 (회원만, 배틀모드 아닐 때) */}
                {currentUserId && !battleMode && correctCount > 0 && (
                  <button
                    onClick={createBattle}
                    disabled={isCreatingBattle}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>🥊</span>
                      {isCreatingBattle ? "생성 중..." : "친구에게 도전장 보내기!"}
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 공유 카드 (숨김) */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#818cf8", fontSize: "12px" }}>📚 상식 퀴즈</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{gradeInfo.emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: "#818cf8" }}>{gradeInfo.grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#fde047", marginTop: "8px" }}>{getFinalScore().toLocaleString()}<span style={{ fontSize: "18px", color: "#ca8a04" }}> 점</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>정답 {correctCount}/{QUESTIONS_PER_GAME} • {totalTime}초</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#1e1b4b", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                <div style={{ color: "#818cf8", fontSize: "10px" }}>📊 정답률</div>
                <div style={{ color: "#a5b4fc", fontSize: "18px", fontWeight: "bold" }}>{Math.round(correctCount / QUESTIONS_PER_GAME * 100)}%</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/quiz")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}>
              <span>{new Date().toLocaleDateString("ko-KR")}</span>
              <span style={{ color: "#818cf8" }}>slox.co.kr/quiz</span>
            </div>
          </div>

          {/* 명예의전당 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium flex items-center gap-2"><span>🏆</span> 명예의전당</h3>
              <button onClick={fetchLeaderboard} className="text-dark-500 hover:text-white text-xs">🔄 새로고침</button>
            </div>
            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    {/* 순위 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    {/* 아바타 */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden ${entry.user_id ? "ring-2 ring-accent-500/50" : "bg-dark-600 text-dark-400"}`}>
                      {entry.user_id && entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : entry.user_id ? (
                        <div className="w-full h-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white">{entry.nickname?.charAt(0).toUpperCase()}</div>
                      ) : (
                        <span>{entry.nickname?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    {/* 국기 */}
                    <span className="text-base flex-shrink-0">{COUNTRY_OPTIONS.find(c => c.code === entry.country)?.flag || "🌍"}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        {/* 👤 회원 배지 + 순위 배지 (분리) */}
                        {entry.user_id && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ 회원</span>
                        )}
                        {/* 종합 순위 배지 */}
                        {entry.user_id && entry.overall_rank && entry.overall_rank <= 10 && (
                          entry.overall_rank === 1 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-300 border border-yellow-500/50 font-bold shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse">👑 종합1위</span>
                          ) : entry.overall_rank === 2 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gray-400/20 text-gray-300 border border-gray-400/40 font-bold">🥈 종합2위</span>
                          ) : entry.overall_rank === 3 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold">🥉 종합3위</span>
                          ) : (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">🏆 종합{entry.overall_rank}위</span>
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={entry.grade === "천재" ? "text-purple-400" : entry.grade === "박학다식" ? "text-blue-400" : entry.grade === "상식왕" ? "text-yellow-400" : "text-dark-400"}>{entry.grade || "평범"}</span>
                        <span>•</span>
                        <span>{entry.correct_count}/10</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score.toLocaleString()}점</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-dark-500">
                <span className="text-4xl mb-2 block">📚</span>
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
                    {(() => {
                      const myScore = getFinalScore();
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => myScore > (e.score || 0)) === -1 ? totalCount + 1 : leaderboard.findIndex(e => myScore > (e.score || 0)) + 1);
                      const isFirstPlace = leaderboard.length === 0 || myScore > (leaderboard[0]?.score || 0);
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : "📚"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${calculatedRank}위!`}
                          </h3>
                          <p className={`text-3xl font-black ${gradeInfo.color}`}>{getFinalScore().toLocaleString()}점</p>
                          <p className="text-dark-400 text-sm">{gradeInfo.grade}</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && getFinalScore() <= (leaderboard[0]?.score || 0) && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">{(leaderboard[0]?.score || 0).toLocaleString()}점</p>
                          <p className="text-xs text-dark-400">{leaderboard[0]?.nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-indigo-400 font-bold">{getFinalScore().toLocaleString()}점</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 🔐 비회원 로그인 유도 */}
                  {!currentUserId && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">🎮 회원으로 등록하면 점수가 누적돼요!</p>
                      <button onClick={() => { localStorage.setItem("pending_game_score", JSON.stringify({ game: "quiz", correctCount, timeBonus, timestamp: Date.now() })); window.location.href = "/login?redirect=/quiz"; }} className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all">로그인하고 이 점수로 등록! →</button>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30">
                    <span className="flex items-center justify-center gap-2"><span className="text-xl">🏆</span>랭킹 등록하기!</span>
                  </button>
                  {/* 🥊 도전장 보내기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && correctCount > 0 && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (locale === "ko" ? "생성 중..." : "Creating...")
                          : (locale === "ko" ? "친구에게 도전장 보내기!" : "Send Challenge!")}
                      </span>
                    </button>
                  )}
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
                  <p className="text-dark-400 text-sm">{getFinalScore().toLocaleString()}점</p>
                </div>
                {/* 👤 회원 로그인 시 닉네임 고정 */}
                {currentUserId && currentUserNickname ? (
                  <div className="relative mb-4">
                    <input type="text" value={currentUserNickname} disabled className="w-full px-4 py-3 bg-dark-900 border border-accent-500/50 rounded-xl text-white cursor-not-allowed opacity-80" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2"><span className="text-xs px-2 py-1 rounded bg-accent-500/20 text-accent-400 border border-accent-500/30 font-medium">✓ 회원</span></div>
                  </div>
                ) : (
                  <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                )}
                {currentUserId && <p className="text-xs text-dark-500 mb-4 -mt-2">💡 회원은 프로필 닉네임으로 자동 등록됩니다</p>}
                {/* 🔐 비로그인 시 로그인 유도 */}
                {!currentUserId && (
                  <div className="mb-4 p-3 bg-accent-purple/10 rounded-lg border border-accent-purple/20">
                    <p className="text-xs text-dark-300 mb-1">💡 로그인하면 회원 점수에 반영됩니다</p>
                    <a href="/login" target="_blank" rel="noopener noreferrer" className="text-accent-purple text-xs hover:underline">로그인하러 가기 (새 탭) →</a>
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-dark-400 text-sm mb-2">국가 선택</label>
                  <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white">
                    {COUNTRY_OPTIONS.map((country) => (<option key={country.code} value={country.code}>{country.flag} {country.name}</option>))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">취소</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : "등록!"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 🥊 도전장 링크 모달 */}
          {showBattleModal && battleUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🥊</div>
                  <h3 className="text-white text-xl font-bold mb-2">도전장 생성 완료!</h3>
                  <p className="text-dark-400 text-sm">링크를 친구에게 공유하세요!</p>
                </div>

                <div className="bg-dark-800 rounded-xl p-4 mb-4">
                  <p className="text-white text-center font-bold mb-2">❓ {correctCount}/{QUESTIONS_PER_GAME}점</p>
                  <p className="text-dark-400 text-xs text-center break-all">{battleUrl}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={copyBattleUrl}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all"
                  >
                    📋 링크 복사하기
                  </button>
                  <button
                    onClick={() => setShowBattleModal(false)}
                    className="w-full py-2 text-dark-400 hover:text-white transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 게임 방법 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2"><span>🎯</span> 게임 방법</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-indigo-400 font-medium">1️⃣ 문제 읽기</p>
                <p className="text-dark-400 mt-1">10문제가 출제됩니다</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">2️⃣ 빠르게 선택</p>
                <p className="text-dark-400 mt-1">15초 안에 정답 선택!</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">3️⃣ 보너스</p>
                <p className="text-dark-400 mt-1">빨리 맞출수록 높은 점수!</p>
              </div>
            </div>
          </div>

          {/* 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">{qt.gradeTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-4">{qt.gradeDesc}</p>
            <div className="flex flex-col items-center gap-2">
              {qt.grades.map((grade, idx) => {
                const colors = [
                  { bg: "from-purple-500/20 to-purple-400/20", border: "border-purple-400/50", text: "text-purple-400", width: "w-44" },
                  { bg: "from-blue-500/20 to-blue-400/20", border: "border-blue-400/50", text: "text-blue-400", width: "w-48" },
                  { bg: "from-yellow-500/20 to-yellow-400/20", border: "border-yellow-400/50", text: "text-yellow-400", width: "w-52" },
                  { bg: "from-green-500/20 to-green-400/20", border: "border-green-400/50", text: "text-green-400", width: "w-56" },
                  { bg: "from-orange-500/20 to-orange-400/20", border: "border-orange-400/50", text: "text-orange-400", width: "w-60" },
                  { bg: "from-red-500/20 to-red-400/20", border: "border-red-400/50", text: "text-red-400", width: "w-64" },
                ][idx];
                return (
                  <div key={idx} className={`${colors.width} p-2 bg-gradient-to-r ${colors.bg} rounded-lg text-center border ${colors.border}`}>
                    <span className={`${colors.text} text-sm font-bold`}>{grade.emoji} {grade.name}</span>
                    <span className="text-white text-xs ml-2">{grade.range}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 다른 게임 링크 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 게임</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/iq" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🧩 IQ 테스트</Link>
              <Link href="/sudoku" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔢 스도쿠</Link>
              <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ 반응속도 테스트</Link>
              <Link href="/color" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎨 색상 찾기 게임</Link>
            </div>
          </div>

          <AdBanner className="my-8" />

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
            <p className="text-dark-500 text-xs mt-2">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
          </div>
        </div>
      </main>
    </div>
  );
}
