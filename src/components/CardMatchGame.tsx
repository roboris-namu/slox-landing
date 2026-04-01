"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import AdBanner from "./AdBanner";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";


// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/card-match" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/card-match" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/card-match" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/card-match" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/card-match" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/card-match" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/card-match" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/card-match" },
];

interface CardMatchLeaderboardEntry {
  id: string;
  nickname: string;
  time_seconds: number;
  moves: number;
  pairs: number;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  score?: number;
  country?: string;
  user_id?: string;
  avatar_url?: string;
  overall_rank?: number;
}

// 등급 번역 (영어→한국어)
const gradeTranslations: Record<string, string> = {
  "Challenger": "챌린저", "Master": "마스터", "Diamond": "다이아몬드", "Platinum": "플래티넘",
  "Gold": "골드", "Silver": "실버", "Bronze": "브론즈", "Iron": "아이언"
};
const translateGrade = (grade: string): string => gradeTranslations[grade] || grade;

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

type GameState = "waiting" | "memorize" | "countdown" | "playing" | "result";

// 카드에 사용할 이모지들
const CARD_EMOJIS = ["🐶", "🐱", "🐼", "🦊", "🐨", "🐯", "🦁", "🐸", "🐵", "🐰", "🐻", "🐲"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

// 🎮 단일 모드: 4x4 (8쌍), 60초 제한, 5초 기억시간
const GAME_SETTINGS = {
  cols: 4,
  rows: 4,
  memorizeTime: 5,
  timeLimit: 60,
};

interface CardMatchGameProps {
  locale?: string;
  battleMode?: boolean; // 🥊 배틀 모드
  onBattleComplete?: (score: number) => void; // 🥊 배틀 완료 콜백
}

export default function CardMatchGame({ locale = "ko", battleMode = false, onBattleComplete }: CardMatchGameProps) {
  const lang = locale;
  const [state, setState] = useState<GameState>("waiting");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0); // 🆕 누적 점수
  const [mistakes, setMistakes] = useState(0); // 🆕 틀린 횟수 (퍼펙트 판정용)
  const [timer, setTimer] = useState(0);
  const [memorizeTimer, setMemorizeTimer] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const [showComboEffect, setShowComboEffect] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState<{ points: number; combo: number } | null>(null); // 🆕 점수 팝업
  const [bestScore, setBestScore] = useState<number | null>(null); // 🆕 최고 점수

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // 리더보드 상태
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<CardMatchLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("KR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  
  // 👤 로그인 유저 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);
  
  // 🥊 배틀 관련 상태
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [battleUrl, setBattleUrl] = useState<string | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);

  const totalPairs = (GAME_SETTINGS.cols * GAME_SETTINGS.rows) / 2; // 8쌍

  useEffect(() => { setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window); }, []);
  
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
            if (data.game === "cardmatch" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              setScore(data.score || 0);
              setTimer(data.timer || 0);
              setMistakes(data.mistakes || 0);
              setMatchedPairs(data.matchedPairs || 0);
              setState("result");
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
      const response = await fetch("/api/leaderboard?game=cardmatch&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

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
    if (!finalNickname || isSubmitting) return;
    setIsSubmitting(true);
    const currentScore = getFinalScore();
    const gradeInfo = getGrade();
    const percentile = currentScore >= 3500 ? 1 : currentScore >= 2800 ? 5 : currentScore >= 2200 ? 15 : currentScore >= 1600 ? 30 : currentScore >= 1000 ? 50 : currentScore >= 600 ? 70 : currentScore >= 300 ? 85 : 95;
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "cardmatch",
          data: {
        nickname: finalNickname.slice(0, 20), 
        time_seconds: timer, 
        moves, 
        pairs: totalPairs, 
        device_type: isMobile ? "mobile" : "pc",
        score: currentScore,
        grade: gradeInfo.grade,
        percentile: percentile,
        country: selectedCountry,
          },
          userId: finalUserId,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      // 👤 회원 점수 업데이트는 API에서 자동 처리됨
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) { console.error("등록 실패:", err); alert("등록 실패!"); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 완료/시간초과 시 정확한 순위 계산 + 0.8초 후 팝업
  useEffect(() => {
    if (state === "result" && matchedPairs > 0) {
      // 실제 최종 점수로 순위 계산 (누적점수 + 시간보너스 + 퍼펙트보너스)
      const timeBonus = timer * 10;
      const perfectBonus = mistakes === 0 ? 500 : 0;
      const finalScoreForRank = score + timeBonus + perfectBonus;
      fetch(`/api/leaderboard?game=cardmatch&limit=10&myScore=${finalScoreForRank}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
      if (!hasSubmittedScore) {
      const timerRef = setTimeout(() => { setShowRankingPrompt(true); }, 800);
      return () => clearTimeout(timerRef);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, hasSubmittedScore, matchedPairs, score, timer, mistakes]);

  // 🏆 최고 점수 갱신 + 배틀 완료 처리 (성공/시간초과 모두)
  useEffect(() => {
    if (state === "result") {
      // 최종 점수 계산: 누적점수 + 시간보너스 + 퍼펙트보너스
      const timeBonus = timer * 10;
      const perfectBonus = (mistakes === 0 && matchedPairs === totalPairs) ? 500 : 0;
      const finalScore = score + timeBonus + perfectBonus;
      
      // 완료 시에만 최고 점수 갱신 (시간 초과 시에도 점수 있음)
      if (bestScore === null || finalScore > bestScore) {
        setBestScore(finalScore);
      }
      
      // 🥊 배틀 모드: 게임 완료 시 최종 점수 전달 (성공/시간초과 모두)
      if (battleMode && onBattleComplete && !battleCompleted) {
        setBattleCompleted(true);
        // 최종 점수 전달 (누적점수 + 시간보너스 + 퍼펙트보너스)
        onBattleComplete(finalScore);
      }
    }
  }, [state, matchedPairs, totalPairs, score, timer, mistakes, bestScore, battleMode, onBattleComplete, battleCompleted]);

  // 🔊 오디오 컨텍스트
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 🔊 사운드 효과
  const playSound = useCallback((type: "flip" | "match" | "fail" | "combo" | "countdown" | "complete" | "start") => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      switch (type) {
        case "flip":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case "match":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.35);
          break;
        case "fail":
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "combo":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.08);
          oscillator.frequency.setValueAtTime(1319, ctx.currentTime + 0.16);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
        case "countdown":
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(440, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case "start":
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "complete":
          // 승리 팡파레
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          const gain2 = ctx.createGain();
          osc1.connect(gain1);
          osc2.connect(gain2);
          gain1.connect(ctx.destination);
          gain2.connect(ctx.destination);
          osc1.type = "sine";
          osc2.type = "sine";
          osc1.frequency.setValueAtTime(523, ctx.currentTime);
          osc1.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
          osc1.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
          osc1.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
          osc2.frequency.setValueAtTime(392, ctx.currentTime);
          osc2.frequency.setValueAtTime(494, ctx.currentTime + 0.15);
          osc2.frequency.setValueAtTime(587, ctx.currentTime + 0.3);
          osc2.frequency.setValueAtTime(784, ctx.currentTime + 0.45);
          gain1.gain.setValueAtTime(0.2, ctx.currentTime);
          gain2.gain.setValueAtTime(0.15, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          osc1.start(ctx.currentTime);
          osc2.start(ctx.currentTime);
          osc1.stop(ctx.currentTime + 0.7);
          osc2.stop(ctx.currentTime + 0.7);
          break;
      }
    } catch {
      // 오디오 실패 시 무시
    }
  }, [getAudioContext]);

  // 💥 파티클 생성
  const createParticles = useCallback((x: number, y: number, count: number = 15) => {
    const colors = ["#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ff9ff3"];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
        velocity: Math.random() * 100 + 60,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.includes(p))), 600);
  }, []);

  // 📳 화면 흔들림
  const triggerShake = useCallback(() => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 150);
  }, []);

  // 🃏 카드 생성
  const generateCards = useCallback(() => {
    const { cols, rows } = GAME_SETTINGS;
    const pairCount = (cols * rows) / 2;
    const selectedEmojis = CARD_EMOJIS.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    // 셔플
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    return cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  }, []);

  // 🥊 도전장 만들기 함수
  const createBattle = async () => {
    if (!currentUserId || !nickname) {
      alert(lang === "ko" ? "로그인이 필요합니다." : "Login required.");
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
          challengerScore: getFinalScore(), // 최종 점수로 경쟁
          game: "cardmatch",
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
      alert(lang === "ko" ? "도전장 생성에 실패했습니다." : "Failed to create challenge.");
    } finally {
      setIsCreatingBattle(false);
    }
  };

  // 🥊 도전장 링크 복사
  const copyBattleUrl = async () => {
    if (!battleUrl) return;
    
    const finalScore = getFinalScore();
    const text = lang === "ko"
      ? `🥊 ${nickname}의 도전장!\n\n🃏 카드매칭: ${finalScore}점\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`
      : `🥊 ${nickname}'s Challenge!\n\n🃏 Card Match: ${finalScore}pts\n\nCan you beat this? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert(lang === "ko" ? "복사되었습니다! 친구에게 공유하세요 🎮" : "Copied! Share with friends 🎮");
    } catch {
      prompt(lang === "ko" ? "텍스트를 복사하세요:" : "Copy this text:", text);
    }
  };

  // 🎮 게임 시작
  const startGame = useCallback(() => {
    // 카드 생성 시 바로 앞면(isFlipped: true)으로 설정
    const newCards = generateCards().map(card => ({ ...card, isFlipped: true }));
    
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setCombo(0);
    setMaxCombo(0);
    setScore(0); // 🆕 점수 초기화
    setMistakes(0); // 🆕 실수 초기화
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    setTimer(GAME_SETTINGS.timeLimit); // 60초 제한
    setMemorizeTimer(GAME_SETTINGS.memorizeTime); // 5초 기억시간
    setCards(newCards); // 앞면이 보이는 상태로 카드 설정
    setState("memorize");
    
    const memorizeInterval = setInterval(() => {
      setMemorizeTimer(prev => {
        if (prev <= 1) {
          clearInterval(memorizeInterval);
          // 기억 시간 끝! 카드 뒤집고 게임 시작
          setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })));
          setState("playing");
          playSound("start");
          return 0;
        }
        // 마지막 3초는 사운드
        if (prev <= 3) {
          playSound("countdown");
        }
        return prev - 1;
      });
    }, 1000);
  }, [generateCards, playSound]);

  // ⏱️ 게임 타이머 (카운트다운)
  useEffect(() => {
    if (state === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            // 시간 초과! 게임 오버
            if (timerRef.current) clearInterval(timerRef.current);
            setState("result");
            playSound("fail");
            return 0;
          }
          // 마지막 10초 경고음
          if (prev <= 10) {
            playSound("countdown");
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [state, playSound]);

  // 🃏 카드 클릭
  const handleCardClick = useCallback((cardId: number) => {
    if (state !== "playing") return;
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    playSound("flip");
    
    // 카드 뒤집기
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    // 두 장 뒤집었을 때
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);
      
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // 짝 맞춤! 🎉
        setTimeout(() => {
          playSound("match");
          
          // 파티클 효과
          if (gameAreaRef.current) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            createParticles(rect.width / 2, rect.height / 2, 20);
          }
          
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          
          // 🆕 콤보 기반 점수 시스템
          const newCombo = combo + 1;
          const pointsEarned = 100 * newCombo; // 콤보 배수!
          setCombo(newCombo);
          if (newCombo > maxCombo) setMaxCombo(newCombo);
          setScore(prev => prev + pointsEarned);
          
          // 🆕 점수 팝업 표시
          setShowScorePopup({ points: pointsEarned, combo: newCombo });
          setTimeout(() => setShowScorePopup(null), 600);
          
          // 콤보 효과 (2연속 이상)
          if (newCombo >= 2) {
            playSound("combo");
            setShowComboEffect(true);
            setTimeout(() => setShowComboEffect(false), 500);
          }
          
          setMatchedPairs(prev => {
            const newPairs = prev + 1;
            // 모든 쌍 맞춤 = 게임 완료
            if (newPairs === totalPairs) {
              if (timerRef.current) clearInterval(timerRef.current);
              setTimeout(() => {
                setState("result");
                playSound("complete");
              }, 500);
            }
            return newPairs;
          });
          
          setFlippedCards([]);
        }, 300);
      } else {
        // 짝 불일치 - 시간 패널티! 😱
        setTimeout(() => {
          playSound("fail");
          triggerShake();
          setCombo(0); // 콤보 리셋!
          setMistakes(prev => prev + 1); // 🆕 실수 카운트
          
          // 🔥 시간 3초 차감 + 패널티 표시!
          setTimer(prev => Math.max(0, prev - 3));
          setShowTimePenalty(true);
          setTimeout(() => setShowTimePenalty(false), 500);
          
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [state, cards, flippedCards, combo, maxCombo, totalPairs, playSound, createParticles, triggerShake]);

  // 🏆 최종 점수 계산 (누적 점수 + 보너스)
  const getFinalScore = useCallback(() => {
    // 클리어 못했으면 현재 점수만
    if (matchedPairs < totalPairs) return score;
    
    // 클리어 보너스
    const timeBonus = timer * 10; // 남은 시간 × 10
    const perfectBonus = mistakes === 0 ? 500 : 0; // 퍼펙트 보너스
    
    return score + timeBonus + perfectBonus;
  }, [score, timer, mistakes, matchedPairs, totalPairs]);

  // 🎖️ 등급 계산 (하향 조정된 기준)
  const getGrade = useCallback(() => {
    const finalScore = getFinalScore();
    // 퍼펙트 플레이: 100+200+...+800 = 3600 + 시간보너스(~300) + 퍼펙트(500) = ~4400
    if (finalScore >= 2500) return { grade: "챌린저", color: "text-cyan-300", emoji: "👑" };
    if (finalScore >= 2000) return { grade: "마스터", color: "text-purple-400", emoji: "💎" };
    if (finalScore >= 1600) return { grade: "다이아몬드", color: "text-blue-400", emoji: "💠" };
    if (finalScore >= 1200) return { grade: "플래티넘", color: "text-teal-400", emoji: "🏆" };
    if (finalScore >= 900) return { grade: "골드", color: "text-yellow-400", emoji: "🥇" };
    if (finalScore >= 600) return { grade: "실버", color: "text-gray-300", emoji: "🥈" };
    if (finalScore >= 300) return { grade: "브론즈", color: "text-orange-400", emoji: "🥉" };
    return { grade: "아이언", color: "text-stone-400", emoji: "🪨" };
  }, [getFinalScore]);

  // ⏱️ 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 이미지 생성
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    try {
      shareCardRef.current.style.display = "block";
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      shareCardRef.current.style.display = "none";
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } catch { if (shareCardRef.current) shareCardRef.current.style.display = "none"; return null; }
  };

  // 공유하기 상태
  const [showCopied, setShowCopied] = useState(false);

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInApp = () => navigator.userAgent.toLowerCase().includes("kakaotalk");

  // 공유하기 (텍스트)
  const shareResult = async () => {
    const gradeInfo = getGrade();
    const shareUrl = "https://www.slox.co.kr/card-match";
    const finalScore = getFinalScore();
    
    // 1등 정보
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const firstPlaceScore = firstPlace?.score ?? 0;
    const isNewFirst = !firstPlace || finalScore > firstPlaceScore;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => finalScore > (e.score ?? 0)) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => finalScore > (e.score ?? 0)) + 1);
    
    const text = `🃏 카드 매칭 게임 결과!\n\n${gradeInfo.emoji} ${gradeInfo.grade}\n📊 ${finalScore}점 ${isNewFirst ? "🔥 새로운 1등!" : `(현재 ${myRank}위)`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlaceScore}점)\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`;
    
    const isKakao = isKakaoInApp();
    
    if (!isKakao && typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      prompt("텍스트를 복사하세요:", text);
    }
  };

  // 이미지 공유
  const shareAsImage = async () => {
    if (isKakaoInApp()) {
      alert("📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!");
      return;
    }

    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `cardmatch-${getFinalScore()}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🃏 카드 매칭 게임! https://www.slox.co.kr/card-match` };
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(shareData) : false;
      if (canShare) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `cardmatch-${getFinalScore()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!\n갤러리에서 이미지를 직접 공유해주세요."), 500);
    }
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">🃏 카드 짝 맞추기</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              카드
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 짝 맞추기</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              카드를 기억하고 짝을 맞춰보세요!
            </p>
          </div>

          {/* 게임 모드 안내 */}
          {state === "waiting" && (
            <div className="flex justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">카드</span>
                <span className="text-white font-bold">4×4</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">제한시간</span>
                <span className="text-white font-bold">60초</span>
              </div>
              <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                <span className="text-dark-400 text-xs block">기억시간</span>
                <span className="text-white font-bold">5초</span>
              </div>
            </div>
          )}

          {/* 게임 상태 표시 */}
          {(state === "playing" || state === "memorize") && (
            <div className="flex flex-col items-center gap-3 mb-6">
              {/* 🎯 실시간 점수 표시 */}
              {state === "playing" && (
                <div className="flex items-center gap-3">
                  <div className={`px-5 py-2 rounded-xl border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="text-dark-400 text-xs">누적 점수</p>
                        <p className="text-2xl font-black text-white">
                          {score}점
                          {combo > 0 && <span className="text-orange-400 text-lg ml-2">🔥{combo}x</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                  {mistakes === 0 && matchedPairs > 0 && (
                    <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                      <span className="text-green-400 text-sm font-bold">✨ 퍼펙트!</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-center items-center gap-4">
                {/* 기억 시간 카운트다운 - 왼쪽 */}
                {state === "memorize" && (
                  <div className={`text-center px-5 py-2 rounded-xl border-2 transition-all ${
                    memorizeTimer <= 3 
                      ? 'bg-red-500/20 border-red-500/50 animate-pulse' 
                      : 'bg-yellow-500/20 border-yellow-500/50'
                  }`}>
                    <p className="text-xs font-medium text-yellow-400">👀 기억하세요!</p>
                    <p className={`text-2xl font-black ${memorizeTimer <= 3 ? 'text-red-400' : 'text-yellow-300'}`}>
                      {memorizeTimer}초
                    </p>
                  </div>
                )}
                
                <div className={`text-center px-4 py-2 rounded-xl transition-all ${
                  timer <= 10 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'
                }`}>
                  <p className="text-dark-400 text-xs">⏱️ 남은 시간</p>
                  <p className={`text-xl font-bold ${timer <= 10 ? 'text-red-400' : timer <= 30 ? 'text-yellow-400' : 'text-white'}`}>
                    {formatTime(timer)}
                  </p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">짝</p>
                  <p className="text-xl font-bold text-green-400">{matchedPairs}/{totalPairs}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">🖱️ 클릭</p>
                  <p className="text-xl font-bold text-yellow-400">{moves}</p>
                </div>
                {combo > 0 && (
                  <div className="text-center px-4 py-2 bg-orange-500/20 rounded-xl border border-orange-500/30">
                    <p className="text-dark-400 text-xs">콤보</p>
                    <p className="text-xl font-bold text-orange-400">🔥 {combo}x</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 💡 팁 */}
          {state === "waiting" && (
            <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium mb-1">기억력 게임 팁</p>
                  <p className="text-dark-400 text-sm">
                    카드 위치를 이미지나 패턴으로 기억해보세요. 
                    비슷한 이모지끼리 묶어서 외우면 더 쉬워요!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 게임 영역 - 긴박 모드 효과 */}
          <div
            ref={gameAreaRef}
            className={`relative rounded-2xl p-6 mb-8 min-h-[400px] transition-all duration-300 ${
              screenShake ? "animate-screen-shake" : ""
            } ${
              state === "playing" && timer <= 10 
                ? "bg-red-950/50 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                : state === "playing" && timer <= 30
                  ? "bg-orange-950/30 border border-orange-500/30"
                  : "bg-dark-900"
            }`}
          >
            {/* 긴박 모드 오버레이 */}
            {state === "playing" && timer <= 10 && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-fast border-4 border-red-500/30" />
            )}

            {/* 시간 패널티 표시 - 대비 강하게! */}
            {showTimePenalty && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                {/* 어두운 오버레이 (눈 편하게 50%) */}
                <div className="absolute inset-0 bg-black/50 rounded-2xl" />
                {/* 패널티 텍스트 */}
                <div className="relative animate-time-penalty-pop">
                  <div className="text-7xl md:text-9xl font-black text-center"
                    style={{
                      color: '#FFD700',
                      textShadow: '0 0 20px #FFD700, 0 0 40px #FFA500, 0 0 60px #FF6B00, 0 4px 0 #B8860B',
                      WebkitTextStroke: '2px #B8860B'
                    }}
                  >
                    -3초
                  </div>
                  <div className="text-2xl text-white text-center mt-3 font-bold tracking-wider">
                    ⚡ TIME PENALTY ⚡
                  </div>
                </div>
              </div>
            )}
            {/* 파티클 */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute pointer-events-none animate-particle-burst"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  ["--angle" as string]: `${particle.angle}rad`,
                  ["--velocity" as string]: `${particle.velocity}px`,
                }}
              />
            ))}

            {/* 콤보 효과 */}
            {showComboEffect && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 animate-combo-burst">
                  🔥 {combo} COMBO!
                </div>
              </div>
            )}

            {/* 🆕 점수 팝업 효과 */}
            {showScorePopup && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="animate-score-popup text-center">
                  <p className="text-4xl font-black text-green-400 drop-shadow-lg">
                    +{showScorePopup.points}
                  </p>
                  {showScorePopup.combo > 1 && (
                    <p className="text-lg font-bold text-orange-400">
                      ×{showScorePopup.combo} 콤보!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 대기 화면 */}
            {state === "waiting" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-float">🃏</div>
                <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                <p className="text-dark-400 mb-6">카드를 기억하고 짝을 맞춰보세요!</p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
                >
                  🎮 게임 시작
                </button>
              </div>
            )}


            {/* 카드 그리드 - 완전 중앙 정렬 */}
            {(state === "memorize" || state === "playing") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${GAME_SETTINGS.cols}, minmax(60px, 80px))`,
                  }}
                >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      relative aspect-square rounded-xl cursor-pointer transition-all duration-300
                      ${card.isMatched ? "scale-95" : "hover:scale-105 active:scale-95"}
                    `}
                    style={{
                      animation: state === "memorize" ? `card-appear 0.3s ease-out ${index * 0.05}s both` : undefined,
                    }}
                  >
                    {/* 카드 내용 - 앞면/뒷면 전환 */}
                    {(card.isFlipped || card.isMatched) ? (
                      // 앞면 (이모지 보임)
                      <div 
                        className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-200
                          ${card.isMatched 
                            ? "bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/30" 
                            : "bg-dark-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                          }
                        `}
                      >
                        <span className="text-4xl">{card.emoji}</span>
                      </div>
                    ) : (
                      // 뒷면 (물음표)
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-shadow">
                        <span className="text-3xl">❓</span>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* 결과 화면 */}
            {state === "result" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] py-6">
                {/* 시간 초과 vs 성공 - 둘 다 점수/등급 표시! */}
                {matchedPairs === totalPairs ? (
                  <p className="text-green-400 text-sm font-medium mb-2">🎉 완료!</p>
                ) : (
                  <p className="text-red-400 text-sm font-medium mb-2">⏰ 시간 초과! ({matchedPairs}/{totalPairs} 짝)</p>
                )}
                
                {/* 등급 & 점수 - 항상 표시 */}
                <div className="text-6xl mb-2 animate-bounce-in">{getGrade().emoji}</div>
                <p className={`text-4xl font-black ${getGrade().color} mb-1`}>
                  {getGrade().grade} 등급
                </p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                  {getFinalScore()}점
                </p>
                
                {/* 퍼펙트 표시 */}
                {mistakes === 0 && matchedPairs === totalPairs && (
                  <p className="text-green-400 text-lg font-bold mb-2 animate-pulse">✨ PERFECT CLEAR! ✨</p>
                )}
                
                {/* 점수 상세 내역 - 새 시스템 */}
                <div className="bg-dark-800/50 rounded-xl p-4 mb-4 w-full max-w-sm">
                  <p className="text-dark-400 text-xs mb-2 text-center">📊 점수 계산</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-dark-400">매치 점수 (콤보 누적)</span>
                      <span className="text-white">+{score}점</span>
                    </div>
                    {matchedPairs === totalPairs && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-dark-400">시간 보너스 ({timer}초 × 10)</span>
                          <span className="text-green-400">+{timer * 10}점</span>
                        </div>
                        {mistakes === 0 && (
                          <div className="flex justify-between">
                            <span className="text-dark-400">퍼펙트 보너스</span>
                            <span className="text-yellow-400">+500점</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="border-t border-dark-700 pt-2 mt-2 flex justify-between font-bold">
                      <span className="text-white">총점</span>
                      <span className={getGrade().color}>{getFinalScore()}점</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dark-700 text-xs text-dark-500 text-center">
                    최대 콤보: {maxCombo}x · 실수: {mistakes}회
                  </div>
                </div>

                {bestScore !== null && (
                  <p className="text-dark-400 text-sm mb-4">
                    🏆 최고 기록: {bestScore}점
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button onClick={shareResult} className="flex-1 px-4 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl">{showCopied ? "✅ 복사됨!" : "📤 공유"}</button>
                  <button onClick={shareAsImage} className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl">🖼️ 이미지 공유</button>
                  <button onClick={startGame} className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl">🔄 다시</button>
                </div>
                {!hasSubmittedScore && getFinalScore() > 0 && matchedPairs === totalPairs && (
                  <button onClick={() => setShowNicknameModal(true)} className="w-full max-w-sm mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">🏆 랭킹 등록!</button>
                )}
                
                {/* 🥊 도전장 만들기 버튼 (회원만, 배틀모드 아닐 때, 완료 시) */}
                {currentUserId && !battleMode && matchedPairs === totalPairs && (
                  <button
                    onClick={createBattle}
                    disabled={isCreatingBattle}
                    className="w-full max-w-sm mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50"
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

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> 명예의전당</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄 새로고침</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">🃏</div><p className="text-dark-400">아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!</p></div>
            ) : (
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
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-dark-700 text-dark-400">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          ["Challenger", "챌린저"].includes(entry.grade || "") ? "text-cyan-300" :
                          ["Master", "마스터"].includes(entry.grade || "") ? "text-purple-400" :
                          ["Diamond", "다이아몬드"].includes(entry.grade || "") ? "text-blue-400" :
                          ["Platinum", "플래티넘"].includes(entry.grade || "") ? "text-teal-400" :
                          ["Gold", "골드"].includes(entry.grade || "") ? "text-yellow-400" :
                          ["Silver", "실버"].includes(entry.grade || "") ? "text-gray-300" :
                          ["Bronze", "브론즈"].includes(entry.grade || "") ? "text-orange-400" :
                          "text-stone-400"
                        }>{translateGrade(entry.grade || getGrade().grade)}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score || 0}점</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>🃏 카드 짝 맞추기</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{getGrade().emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: getFinalScore() >= 1200 ? "#fde047" : getFinalScore() >= 1000 ? "#facc15" : "#c084fc" }}>{getGrade().grade} 등급</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{getFinalScore()}<span style={{ fontSize: "18px", color: "#7c3aed" }}> 점</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>{moves}회 / 최대 {maxCombo}콤보</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}><div style={{ color: "#67e8f9", fontSize: "10px" }}>🔥 최대 콤보</div><div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{maxCombo}x</div></div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/card-match")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}><span>{new Date().toLocaleDateString("ko-KR")}</span><span style={{ color: "#8b5cf6" }}>slox.co.kr/card-match</span></div>
          </div>

          {/* 🚀 자동 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    {(() => {
                      const currentScore = getFinalScore();
                      // 점수 기준 내림차순 정렬 - 높은 점수가 높은 순위
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => currentScore > (e.score || 0)) === -1 ? totalCount + 1 : leaderboard.findIndex(e => currentScore > (e.score || 0)) + 1);
                      const isFirstPlace = leaderboard.length === 0 || currentScore > (leaderboard[0].score || 0);
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : calculatedRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${calculatedRank}위!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{currentScore}점</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && getFinalScore() <= (leaderboard[0].score || 0) && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score || 0}점</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-purple-400 font-bold">{getFinalScore()}점</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 🔐 비회원 로그인 유도 */}
                  {!currentUserId && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">🎮 회원으로 등록하면 점수가 누적돼요!</p>
                      <button onClick={() => { localStorage.setItem("pending_game_score", JSON.stringify({ game: "cardmatch", score, timer, mistakes, matchedPairs, timestamp: Date.now() })); window.location.href = "/login?redirect=/card-match"; }} className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all">로그인하고 이 점수로 등록! →</button>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      랭킹 등록하기!
                    </span>
                  </button>
                  {/* 🥊 도전장 보내기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && getFinalScore() > 0 && (
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
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade().emoji}</div><h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3><p className="text-dark-400 text-sm">{getFinalScore()}점</p></div>
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
                  <p className="text-white text-center font-bold mb-2">🃏 {getFinalScore()}점</p>
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

          {/* 게임 설명 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🎯</span> 게임 방법
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">1️⃣ 기억하기</p>
                <p className="text-dark-400 mt-1">카드 위치를 기억하세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-pink-400 font-medium">2️⃣ 찾기</p>
                <p className="text-dark-400 mt-1">같은 그림 카드를 찾으세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">3️⃣ 주의!</p>
                <p className="text-dark-400 mt-1">틀리면 -3초 패널티!</p>
              </div>
            </div>
          </div>

          {/* 🏆 등급표 - 새 시스템 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">🏆 등급표</h3>
            <p className="text-dark-400 text-xs text-center mb-2">💡 매치마다 +100 × 콤보배수!</p>
            <p className="text-dark-500 text-xs text-center mb-6">클리어 시: 남은시간×10 + 퍼펙트 보너스(+500)</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 챌린저</span>
                <span className="text-white text-xs ml-2">2500+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 마스터</span>
                <span className="text-white text-xs ml-2">2000+</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 다이아몬드</span>
                <span className="text-white text-xs ml-2">1600+</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 플래티넘</span>
                <span className="text-white text-xs ml-2">1200+</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 골드</span>
                <span className="text-white text-xs ml-2">900+</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 실버</span>
                <span className="text-white text-xs ml-2">600+</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 브론즈</span>
                <span className="text-white text-xs ml-2">300+</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 아이언</span>
                <span className="text-white text-xs ml-2">0+</span>
              </div>
            </div>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 게임</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/memory"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                🧠 숫자 기억 게임
              </Link>
              <Link
                href="/reaction"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⚡ 반응속도 테스트
              </Link>
              <Link
                href="/color"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                🎨 색상 찾기 게임
              </Link>
            </div>
          </div>

          <AdBanner className="my-8" />

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

