"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";
import AdBanner from "@/components/AdBanner";

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/iq" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/iq" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/iq" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/iq" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/iq" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/iq" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/iq" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/iq" },
];

interface IQQuestion {
  id: number;
  pattern: string[];
  options: string[];
  answer: number;
  difficulty: number;
}

const iqQuestions: IQQuestion[] = [
  { id: 1, pattern: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🟢", "🔵", "🟡"], answer: 0, difficulty: 1 },
  { id: 2, pattern: ["⬛", "⬛", "⬜", "⬛", "⬛", "⬜", "⬛", "⬛", "?"], options: ["⬛", "⬜", "🔲", "🔳"], answer: 1, difficulty: 1 },
  { id: 3, pattern: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "?"], options: ["6️⃣", "5️⃣", "4️⃣", "7️⃣"], answer: 1, difficulty: 1 },
  { id: 4, pattern: ["🌑", "🌒", "🌓", "🌔", "?"], options: ["🌑", "🌕", "🌖", "🌗"], answer: 1, difficulty: 2 },
  { id: 5, pattern: ["🔺", "🔺🔺", "🔺🔺🔺", "?"], options: ["🔺🔺", "🔺🔺🔺🔺", "🔺", "🔺🔺🔺🔺🔺"], answer: 1, difficulty: 2 },
  { id: 6, pattern: ["🅰️", "🅱️", "🅰️", "🅱️", "🅱️", "🅰️", "🅱️", "🅱️", "?"], options: ["🅰️", "🅱️", "🅰️🅱️", "🅱️🅱️"], answer: 1, difficulty: 2 },
  { id: 7, pattern: ["2", "4", "8", "16", "?"], options: ["20", "24", "32", "64"], answer: 2, difficulty: 3 },
  { id: 8, pattern: ["🟥", "🟧", "🟨", "🟩", "?"], options: ["🟦", "🟪", "⬜", "⬛"], answer: 0, difficulty: 3 },
  { id: 9, pattern: ["◀️", "▶️", "◀️◀️", "▶️▶️", "◀️◀️◀️", "?"], options: ["▶️▶️", "▶️▶️▶️", "◀️◀️◀️◀️", "▶️"], answer: 1, difficulty: 3 },
  { id: 10, pattern: ["1", "1", "2", "3", "5", "8", "?"], options: ["10", "11", "12", "13"], answer: 3, difficulty: 3 },
  { id: 11, pattern: ["🔲", "🔳", "🔲🔲", "🔳🔳", "🔲🔲🔲", "?"], options: ["🔳🔳", "🔳🔳🔳", "🔲🔲🔲🔲", "🔳"], answer: 1, difficulty: 4 },
  { id: 12, pattern: ["⭕", "⭕❌", "⭕❌⭕", "⭕❌⭕❌", "?"], options: ["⭕❌⭕❌⭕", "❌⭕❌⭕❌", "⭕⭕❌❌⭕", "❌❌⭕⭕❌"], answer: 0, difficulty: 4 },
  { id: 13, pattern: ["3", "6", "11", "18", "27", "?"], options: ["36", "38", "40", "42"], answer: 1, difficulty: 4 },
  { id: 14, pattern: ["🔵", "🔵🔴", "🔵🔴🔵", "🔵🔴🔵🔴", "🔵🔴🔵🔴🔵", "?"], options: ["🔵🔴🔵🔴🔵🔴", "🔴🔵🔴🔵🔴🔵", "🔵🔵🔴🔴🔵🔵", "🔴🔴🔵🔵🔴🔴"], answer: 0, difficulty: 4 },
  { id: 15, pattern: ["1", "4", "9", "16", "25", "?"], options: ["30", "35", "36", "49"], answer: 2, difficulty: 5 },
  { id: 16, pattern: ["🔴", "🔵🔵", "🔴🔴🔴", "🔵🔵🔵🔵", "?"], options: ["🔴🔴🔴🔴🔴", "🔵🔵🔵🔵🔵", "🔴🔴🔴🔴", "🔵🔵🔵"], answer: 0, difficulty: 5 },
  { id: 17, pattern: ["2", "3", "5", "7", "11", "13", "?"], options: ["15", "17", "19", "21"], answer: 1, difficulty: 5 },
  { id: 18, pattern: ["📦", "📦📦", "📦📦📦📦", "📦📦📦📦📦📦📦📦", "?"], options: ["📦 x 10", "📦 x 12", "📦 x 16", "📦 x 32"], answer: 2, difficulty: 5 },
  { id: 19, pattern: ["A1", "B2", "C3", "D4", "?"], options: ["E5", "F6", "E4", "D5"], answer: 0, difficulty: 4 },
  { id: 20, pattern: ["🟡", "🟡🟢", "🟡🟢🔵", "🟡🟢🔵🟣", "?"], options: ["🟡🟢🔵🟣🔴", "🔴🟡🟢🔵🟣", "🟡🟢🔵🟣🟤", "🟡🟢🔵🟣⚫"], answer: 0, difficulty: 5 },
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
  grade?: string;
  country?: string;
  user_id?: string;
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

const QUESTION_TIME = 30;
const QUESTIONS_PER_GAME = 12;

interface IQTestProps {
  locale?: string;
  battleMode?: boolean; // 🥊 배틀 모드
  onBattleComplete?: (score: number) => void; // 🥊 배틀 완료 콜백
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IQTest({ locale = "ko", battleMode = false, onBattleComplete }: IQTestProps = {}) {
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
          if (profile?.nickname) { setCurrentUserNickname(profile.nickname); setNickname(profile.nickname); }
        } catch { /* 무시 */ }
        
        // 🎮 pending_game_score 확인
        try {
          const pendingScore = localStorage.getItem("pending_game_score");
          if (pendingScore) {
            const data = JSON.parse(pendingScore);
            if (data.game === "iq" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              setCorrectCount(data.correctCount || 0);
              setScore(data.score || 0);
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
      const response = await fetch("/api/leaderboard?game=iq&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (error) { console.error("Failed to fetch leaderboard:", error); }
  }, []);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 결과 시 정확한 순위 계산 + 배틀 처리
  useEffect(() => {
    if (gameState === "result" && score > 0) {
      const calculatedIQ = 70 + Math.round(score * 3);
      
      // 🥊 배틀 모드: 게임 완료 시 점수 전달
      if (battleMode && onBattleComplete && !battleCompleted) {
        setBattleCompleted(true);
        onBattleComplete(calculatedIQ);
      }
      
      fetch(`/api/leaderboard?game=iq&limit=10&myScore=${calculatedIQ}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
    }
  }, [gameState, score, battleMode, onBattleComplete, battleCompleted]);

  // 🥊 도전장 만들기 함수
  const createBattle = async () => {
    if (!currentUserId || !nickname) {
      alert("로그인이 필요합니다.");
      return;
    }
    
    const calculatedIQ = 70 + Math.round(score * 3);

    setIsCreatingBattle(true);
    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          challengerId: currentUserId,
          challengerNickname: nickname,
          challengerScore: calculatedIQ,
          game: "iq",
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
    
    const calculatedIQ = 70 + Math.round(score * 3);
    const text = `🥊 ${nickname}의 도전장!\n\n🧩 IQ 테스트: ${calculatedIQ}\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert("복사되었습니다! 친구에게 공유하세요 🎮");
    } catch {
      prompt("텍스트를 복사하세요:", text);
    }
  };

  const startGame = () => {
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
      const difficulty = questions[currentIndex].difficulty;
      const timeBonus = Math.floor(timeLeft * 2);
      const difficultyBonus = difficulty * 20;
      setScore((prev) => prev + 50 + timeBonus + difficultyBonus);
      setCorrectCount((prev) => prev + 1);
    }
    setTimeout(() => { goToNext(); }, 1500);
  };

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

  const calculateIQ = () => {
    const baseIQ = 70;
    const correctBonus = Math.round(correctCount * 6.7);
    const scoreBonus = Math.min(10, Math.floor(score / 150));
    return Math.min(160, Math.max(70, baseIQ + correctBonus + scoreBonus));
  };

  const getIQGrade = (iq: number) => {
    if (iq >= 145) return { grade: "천재", emoji: "🧠", color: "text-purple-400", desc: "상위 0.1%" };
    if (iq >= 130) return { grade: "수재", emoji: "💎", color: "text-blue-400", desc: "상위 2%" };
    if (iq >= 115) return { grade: "우수", emoji: "⭐", color: "text-cyan-400", desc: "상위 15%" };
    if (iq >= 100) return { grade: "평균", emoji: "👍", color: "text-green-400", desc: "평균" };
    if (iq >= 85) return { grade: "보통", emoji: "😊", color: "text-yellow-400", desc: "평균 이하" };
    return { grade: "노력필요", emoji: "📚", color: "text-orange-400", desc: "더 노력해요!" };
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
    const iqScore = calculateIQ();
    const gradeInfo = getIQGrade(iqScore);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "iq",
          data: {
        nickname: finalNickname.slice(0, 20),
        score,
        iq_score: iqScore,
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

  const isKakaoInApp = () => {
    if (typeof window === "undefined") return false;
    return navigator.userAgent.toLowerCase().includes("kakaotalk");
  };

  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    shareCardRef.current.style.display = "block";
    try {
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } finally { shareCardRef.current.style.display = "none"; }
  };

  const shareResult = async () => {
    const iqScore = calculateIQ();
    const gradeInfo = getIQGrade(iqScore);
    const shareUrl = "https://www.slox.co.kr/iq";
    const firstPlace = leaderboard[0];
    
    const text = `🧠 IQ 테스트 결과!\n\n` +
      `${gradeInfo.emoji} IQ ${iqScore} (${gradeInfo.grade})\n` +
      `✅ 정답: ${correctCount}/${QUESTIONS_PER_GAME}\n` +
      `⏱️ 소요시간: ${totalTime}초\n\n` +
      (firstPlace ? `🏆 현재 1위: ${firstPlace.nickname} (IQ ${firstPlace.iq_score})\n\n` : "") +
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

  const shareAsImage = async () => {
    if (isKakaoInApp()) {
      alert("📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!");
      return;
    }
    const blob = await generateImage();
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `iq-${calculateIQ()}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🧠 IQ 테스트! https://www.slox.co.kr/iq` };
      if (navigator.canShare?.(shareData)) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `iq-${calculateIQ()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!"), 500);
    }
  };

  const currentQuestion = questions[currentIndex];
  const iqScore = calculateIQ();
  const iqGrade = getIQGrade(iqScore);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - 로그인 상태 표시 포함 */}
      <GameNavBar
        locale="ko"
        backText="← 메인"
        languageOptions={languageOptions}
      />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-purple-400 text-sm font-medium">🧠 IQ 테스트</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              IQ
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> 테스트</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">패턴을 분석하고 당신의 IQ를 측정하세요!</p>
          </div>

          {gameState === "ready" && (
            <div className="flex justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">문제 수</span>
                <span className="text-white font-bold">12개</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">문제당</span>
                <span className="text-white font-bold">30초</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">유형</span>
                <span className="text-white font-bold">패턴분석</span>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="px-5 py-2 rounded-xl border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="text-dark-400 text-xs">현재 점수</p>
                      <p className="text-2xl font-black text-white">{score}점</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
                  <span className="text-purple-400 text-sm font-bold">난이도 {currentQuestion?.difficulty || 1}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className={`text-center px-4 py-2 rounded-xl transition-all ${timeLeft <= 10 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'}`}>
                  <p className="text-dark-400 text-xs">⏱️ 남은 시간</p>
                  <p className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}초</p>
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

          {gameState === "ready" && (
            <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium mb-1">IQ 테스트 팁</p>
                  <p className="text-dark-400 text-sm">패턴의 규칙을 찾아보세요. 숫자, 색상, 개수 등 다양한 규칙이 있습니다!</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative rounded-2xl p-6 mb-8 min-h-[400px] bg-dark-900">
            {gameState === "ready" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-bounce">🧩</div>
                <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                <p className="text-dark-400 mb-6">멘사 스타일 패턴 문제!</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                  🎮 테스트 시작
                </button>
              </div>
            )}

            {gameState === "playing" && currentQuestion && (
              <div className="py-4">
                <div className="h-2 bg-dark-700 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_GAME) * 100}%` }} />
                </div>
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 mb-6 text-center">
                  <p className="text-dark-400 mb-4">다음 패턴에서 ?에 들어갈 것은?</p>
                  <div className="text-2xl md:text-3xl font-mono tracking-wider flex flex-wrap justify-center gap-2">
                    {currentQuestion.pattern.map((item, i) => (
                      <span key={i} className={item === "?" ? "text-purple-400 animate-pulse" : "text-white"}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, index) => {
                    let buttonClass = "p-5 rounded-xl border-2 font-medium transition-all text-center text-xl outline-none ";
                    if (showResult) {
                      if (index === currentQuestion.answer) buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                      else if (index === selectedAnswer && !isCorrect) buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                      else buttonClass += "bg-dark-800/50 border-dark-700/50 text-dark-500";
                    } else {
                      buttonClass += "bg-dark-800/50 border-transparent hover:border-purple-500 hover:bg-purple-500/10 focus:border-transparent focus:bg-dark-800/50 active:border-purple-500 active:bg-purple-500/20 cursor-pointer text-white";
                    }
                    return (
                      <button key={index} onClick={() => selectAnswer(index)} disabled={showResult} className={buttonClass}>{option}</button>
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

            {gameState === "result" && (
              <div className="py-4 text-center">
                <div className="text-6xl mb-4">{iqGrade.emoji}</div>
                <h2 className={`text-4xl font-bold mb-2 ${iqGrade.color}`}>IQ {iqScore}</h2>
                <p className="text-xl text-dark-400 mb-1">{iqGrade.grade}</p>
                <p className="text-dark-500 text-sm">{iqGrade.desc}</p>
                
                <div className="my-6 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
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

                {hasSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                    ✅ 랭킹에 등록되었습니다!
                  </div>
                )}

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

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#a855f7", fontSize: "12px" }}>🧠 IQ 테스트</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{iqGrade.emoji}</div>
              <div style={{ fontSize: "36px", fontWeight: "bold", marginTop: "8px", color: "#a855f7" }}>IQ {iqScore}</div>
              <div style={{ fontSize: "18px", color: "#9ca3af", marginTop: "4px" }}>{iqGrade.grade}</div>
              <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "6px" }}>정답 {correctCount}/{QUESTIONS_PER_GAME} • {totalTime}초</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#2e1065", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                <div style={{ color: "#a855f7", fontSize: "10px" }}>📊 정답률</div>
                <div style={{ color: "#c084fc", fontSize: "18px", fontWeight: "bold" }}>{Math.round(correctCount / QUESTIONS_PER_GAME * 100)}%</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/iq")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#7c3aed", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}>
              <span>{new Date().toLocaleDateString("ko-KR")}</span>
              <span style={{ color: "#a855f7" }}>slox.co.kr/iq</span>
            </div>
          </div>

          {/* 📊 광고 배너 */}
          <AdBanner className="mb-8" />

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
                        <span className={entry.grade === "천재" ? "text-purple-400" : entry.grade === "수재" ? "text-blue-400" : entry.grade === "우수" ? "text-cyan-400" : "text-dark-400"}>{entry.grade || "평균"}</span>
                        <span>•</span>
                        <span>{entry.correct_count}/12</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 font-bold">IQ {entry.iq_score}</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-dark-500">
                <span className="text-4xl mb-2 block">🧠</span>
                아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!
              </div>
            )}
          </div>

          {/* 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    {(() => {
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => iqScore > (e.iq_score || 0)) === -1 ? totalCount + 1 : leaderboard.findIndex(e => iqScore > (e.iq_score || 0)) + 1);
                      const isFirstPlace = leaderboard.length === 0 || iqScore > (leaderboard[0]?.iq_score || 0);
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : "🧠"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${calculatedRank}위!`}
                          </h3>
                          <p className={`text-3xl font-black ${iqGrade.color}`}>IQ {iqScore}</p>
                          <p className="text-dark-400 text-sm">{iqGrade.grade}</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && iqScore <= (leaderboard[0]?.iq_score || 0) && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">IQ {leaderboard[0]?.iq_score || 0}</p>
                          <p className="text-xs text-dark-400">{leaderboard[0]?.nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-purple-400 font-bold">IQ {iqScore}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 🔐 비회원 로그인 유도 */}
                  {!currentUserId && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">🎮 회원으로 등록하면 점수가 누적돼요!</p>
                      <button onClick={() => { localStorage.setItem("pending_game_score", JSON.stringify({ game: "iq", correctCount, score, timestamp: Date.now() })); window.location.href = "/login?redirect=/iq"; }} className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all">로그인하고 이 점수로 등록! →</button>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30">
                    <span className="flex items-center justify-center gap-2"><span className="text-xl">🏆</span>랭킹 등록하기!</span>
                  </button>
                  {/* 🥊 도전장 보내기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && iqScore > 0 && (
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
                  <div className="text-5xl mb-3">{iqGrade.emoji}</div>
                  <h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3>
                  <p className="text-dark-400 text-sm">IQ {iqScore}</p>
                </div>
                {currentUserId && currentUserNickname ? (
                  <div className="relative mb-4"><input type="text" value={currentUserNickname} disabled className="w-full px-4 py-3 bg-dark-900 border border-accent-500/50 rounded-xl text-white cursor-not-allowed opacity-80" /><div className="absolute right-3 top-1/2 -translate-y-1/2"><span className="text-xs px-2 py-1 rounded bg-accent-500/20 text-accent-400 border border-accent-500/30 font-medium">✓ 회원</span></div></div>
                ) : (<input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />)}
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
                  <p className="text-white text-center font-bold mb-2">🧩 IQ {70 + Math.round(score * 3)}</p>
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
                <p className="text-purple-400 font-medium">1️⃣ 패턴 분석</p>
                <p className="text-dark-400 mt-1">주어진 패턴을 분석하세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-pink-400 font-medium">2️⃣ 규칙 찾기</p>
                <p className="text-dark-400 mt-1">숫자, 색상, 개수 등의 규칙!</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">3️⃣ 빠르게!</p>
                <p className="text-dark-400 mt-1">30초 안에 정답 선택!</p>
              </div>
            </div>
          </div>

          {/* 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">🏆 IQ 등급표</h3>
            <p className="text-dark-400 text-xs text-center mb-4">💡 정답 개수 + 속도로 IQ 계산!</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">🧠 천재</span>
                <span className="text-white text-xs ml-2">IQ 145+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💎 수재</span>
                <span className="text-white text-xs ml-2">IQ 130+</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-400 text-sm font-bold">⭐ 우수</span>
                <span className="text-white text-xs ml-2">IQ 115+</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg text-center border border-green-400/50">
                <span className="text-green-400 text-sm font-bold">👍 평균</span>
                <span className="text-white text-xs ml-2">IQ 100+</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">😊 보통</span>
                <span className="text-white text-xs ml-2">IQ 85+</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">📚 노력필요</span>
                <span className="text-white text-xs ml-2">IQ 85 미만</span>
              </div>
            </div>
          </div>

          {/* 다른 게임 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 게임</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/quiz" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📚 상식 퀴즈</Link>
              <Link href="/sudoku" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔢 스도쿠</Link>
              <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ 반응속도 테스트</Link>
              <Link href="/memory" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🧠 숫자 기억 게임</Link>
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
