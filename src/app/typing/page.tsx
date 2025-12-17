"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko", flag: "🇰🇷", name: "한국어", path: "/typing" },
  { locale: "en", flag: "🇺🇸", name: "English", path: "/en/typing" },
  { locale: "ja", flag: "🇯🇵", name: "日本語", path: "/ja/typing" },
  { locale: "zh", flag: "🇨🇳", name: "中文", path: "/zh/typing" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch", path: "/de/typing" },
  { locale: "fr", flag: "🇫🇷", name: "Français", path: "/fr/typing" },
  { locale: "es", flag: "🇪🇸", name: "Español", path: "/es/typing" },
  { locale: "pt", flag: "🇧🇷", name: "Português", path: "/pt/typing" },
];

interface TypingLeaderboardEntry {
  id: string;
  nickname: string;
  wpm: number;
  accuracy: number;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
}

/**
 * 타자 연습용 문장들
 */
const SENTENCES = [
  "빠른 갈색 여우가 게으른 개를 뛰어넘습니다.",
  "오늘 하루도 열심히 일하고 행복한 저녁 보내세요.",
  "프로그래밍은 창의력과 논리력을 동시에 요구합니다.",
  "커피 한 잔의 여유가 하루를 바꿀 수 있습니다.",
  "성공은 작은 노력들이 모여 만들어지는 결과입니다.",
  "인공지능 기술이 우리의 일상을 변화시키고 있습니다.",
  "좋은 코드는 읽기 쉽고 유지보수가 편한 코드입니다.",
  "매일 조금씩 성장하면 일년 후엔 큰 변화가 있습니다.",
  "실패를 두려워하지 말고 도전하는 용기가 필요합니다.",
  "건강한 몸에 건강한 정신이 깃든다는 말이 있습니다.",
  "시간은 누구에게나 공평하게 주어지는 자원입니다.",
  "꿈을 이루기 위해서는 끊임없는 노력이 필요합니다.",
  "작은 습관의 변화가 인생을 바꿀 수 있습니다.",
  "배움에는 끝이 없고 겸손함이 필요합니다.",
  "오늘 할 일을 내일로 미루지 않는 것이 중요합니다.",
];

/**
 * 타자 결과
 */
interface TypingResult {
  wpm: number;           // 분당 타수
  cpm: number;           // 분당 글자수
  accuracy: number;      // 정확도
  time: number;          // 소요 시간 (초)
  totalChars: number;    // 총 글자수
  correctChars: number;  // 맞은 글자수
}

/**
 * 랜덤 문장 가져오기
 */
const getRandomSentence = (): string => {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
};

/**
 * 한글 글자를 키 입력 횟수로 변환
 * 예: "건" = ㄱ(1) + ㅓ(1) + ㄴ(1) = 3타
 */
const getKeyStrokes = (text: string): number => {
  let strokes = 0;
  
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    // 한글 음절 범위 (가 ~ 힣)
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const syllableIndex = code - 0xAC00;
      const cho = Math.floor(syllableIndex / (21 * 28)); // 초성
      const jung = Math.floor((syllableIndex % (21 * 28)) / 28); // 중성
      const jong = syllableIndex % 28; // 종성
      
      // 초성 타수 (쌍자음은 2타)
      const doubleChosung = [1, 4, 8, 10, 13]; // ㄲ, ㄸ, ㅃ, ㅆ, ㅉ
      strokes += doubleChosung.includes(cho) ? 2 : 1;
      
      // 중성 타수 (복합모음은 2타)
      const doubleJungsung = [9, 10, 11, 14, 15, 16, 19]; // ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ
      strokes += doubleJungsung.includes(jung) ? 2 : 1;
      
      // 종성 타수 (복합받침은 2타, 없으면 0타)
      if (jong > 0) {
        const doubleJongsung = [3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18]; // ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ
        strokes += doubleJongsung.includes(jong) ? 2 : 1;
      }
    } else {
      // 영문, 숫자, 특수문자, 공백 등은 1타
      strokes += 1;
    }
  }
  
  return strokes;
};

export default function TypingTest() {
  const [sentence, setSentence] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [result, setResult] = useState<TypingResult | null>(null);
  const [currentCpm, setCurrentCpm] = useState<number>(0); // 실시간 타수 🔥
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  // 리더보드 상태
  const [leaderboard, setLeaderboard] = useState<TypingLeaderboardEntry[]>([]);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // 초기 문장 설정
  useEffect(() => {
    setSentence(getRandomSentence());
  }, []);

  // 타이머 + 실시간 타수 계산 🔥
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
        
        // 실시간 타수 계산!
        if (input.length > 0 && elapsed > 0) {
          const timeInMinutes = (now - startTime) / 1000 / 60;
          const keyStrokes = getKeyStrokes(input);
          const cpm = Math.round(keyStrokes / timeInMinutes);
          setCurrentCpm(cpm);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished, startTime, input]);

  // 리더보드 가져오기
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("typing_leaderboard").select("*").order("wpm", { ascending: false }).limit(10);
      if (error) throw error;
      if (data) setLeaderboard(data);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

  // 점수 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || !result) return;
    setIsSubmitting(true);
    const gradeInfo = getGrade(result.cpm);
    // 백분위 (난이도 상향)
    const percentile = isMobile 
      ? (result.cpm >= 480 ? 1 : result.cpm >= 400 ? 5 : result.cpm >= 330 ? 15 : result.cpm >= 270 ? 30 : result.cpm >= 210 ? 50 : result.cpm >= 150 ? 70 : result.cpm >= 90 ? 85 : 95)
      : (result.cpm >= 650 ? 1 : result.cpm >= 550 ? 5 : result.cpm >= 450 ? 15 : result.cpm >= 370 ? 30 : result.cpm >= 300 ? 50 : result.cpm >= 230 ? 70 : result.cpm >= 150 ? 85 : 95);
    try {
      const { error } = await supabase.from("typing_leaderboard").insert({ 
        nickname: nickname.trim().slice(0, 20), 
        wpm: result.cpm,  // 타/분
        accuracy: result.accuracy, 
        device_type: isMobile ? "mobile" : "pc",
        grade: gradeInfo.grade,
        percentile: percentile,
      });
      if (error) throw error;
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) { console.error("등록 실패:", err); alert("등록 실패!"); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 끝나면 0.8초 후 자동 랭킹 등록 팝업 표시
  useEffect(() => {
    if (isFinished && !hasSubmittedScore && result && result.cpm > 0) {
      const timer = setTimeout(() => { setShowRankingPrompt(true); }, 800);
      return () => clearTimeout(timer);
    }
  }, [isFinished, hasSubmittedScore, result]);

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

  const saveAsImage = async () => {
    const blob = await generateImage();
    if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.download = `typing-${result?.cpm || 0}.png`; link.href = url; link.click(); URL.revokeObjectURL(url); }
  };

  // 결과 계산
  const calculateResult = useCallback((): TypingResult => {
    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === sentence[i]) {
        correctChars++;
      }
    }
    
    const accuracy = Math.round((correctChars / sentence.length) * 100);
    
    // 키 입력 횟수 기준 타수 계산 (한컴타자 방식)
    const keyStrokes = getKeyStrokes(input);
    const cpm = Math.round(keyStrokes / timeInMinutes);
    const wpm = Math.round(cpm / 5); // 평균 5타 = 1단어
    
    return {
      wpm,
      cpm,
      accuracy,
      time: Math.round(timeInSeconds),
      totalChars: sentence.length,
      correctChars,
    };
  }, [input, sentence, startTime]);

  // 입력 처리
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 첫 입력 시 시작
    if (!isStarted && value.length === 1) {
      setIsStarted(true);
      setStartTime(Date.now());
    }
    
    setInput(value);
    
    // 완료 체크
    if (value.length >= sentence.length) {
      setIsFinished(true);
      setResult(calculateResult());
    }
  };

  // 다시 시작
  const restart = () => {
    setSentence(getRandomSentence());
    setInput("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(0);
    setElapsedTime(0);
    setResult(null);
    setCurrentCpm(0);
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 결과 공유 (이미지로)
  const shareResult = async () => {
    if (!result) return;
    const blob = await generateImage();
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `typing-${result.cpm}.png`, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) { 
        try { 
          await navigator.share({ files: [file], title: "타자 속도 테스트 결과!", text: "나도 테스트하기 👉 https://www.slox.co.kr/typing" }); 
          return; 
        } catch { /* 취소 */ } 
      }
    }
    if (blob) { 
      const url = URL.createObjectURL(blob); 
      const link = document.createElement("a"); 
      link.download = `typing-test-${result.cpm}.png`; 
      link.href = url; 
      link.click(); 
      URL.revokeObjectURL(url); 
    }
  };

  // 글자별 색상 렌더링
  const renderSentence = () => {
    return sentence.split("").map((char, index) => {
      let colorClass = "text-dark-400"; // 기본
      
      if (index < input.length) {
        if (input[index] === char) {
          colorClass = "text-green-400"; // 맞음
        } else {
          colorClass = "text-red-400 bg-red-400/20"; // 틀림
        }
      } else if (index === input.length) {
        colorClass = "text-white bg-accent-purple/30"; // 현재 위치
      }
      
      return (
        <span key={index} className={`${colorClass} transition-colors`}>
          {char}
        </span>
      );
    });
  };

  // 모바일 감지
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 등급 계산 (모바일은 약 75% 수준 - 난이도 상향)
  const getGrade = (cpm: number): { grade: string; color: string; emoji: string } => {
    if (isMobile) {
      // 모바일 등급 기준 (난이도 상향: 약 75% 수준)
      if (cpm >= 480) return { grade: "챌린저", color: "text-cyan-300", emoji: "👑" };
      if (cpm >= 400) return { grade: "마스터", color: "text-purple-400", emoji: "💎" };
      if (cpm >= 330) return { grade: "다이아몬드", color: "text-blue-400", emoji: "💠" };
      if (cpm >= 270) return { grade: "플래티넘", color: "text-teal-400", emoji: "🏆" };
      if (cpm >= 210) return { grade: "골드", color: "text-yellow-400", emoji: "🥇" };
      if (cpm >= 150) return { grade: "실버", color: "text-gray-300", emoji: "🥈" };
      if (cpm >= 90) return { grade: "브론즈", color: "text-orange-400", emoji: "🥉" };
      return { grade: "아이언", color: "text-stone-400", emoji: "🪨" };
    }
    // 데스크톱 등급 기준
    if (cpm >= 650) return { grade: "챌린저", color: "text-cyan-300", emoji: "👑" };
    if (cpm >= 550) return { grade: "마스터", color: "text-purple-400", emoji: "💎" };
    if (cpm >= 450) return { grade: "다이아몬드", color: "text-blue-400", emoji: "💠" };
    if (cpm >= 370) return { grade: "플래티넘", color: "text-teal-400", emoji: "🏆" };
    if (cpm >= 300) return { grade: "골드", color: "text-yellow-400", emoji: "🥇" };
    if (cpm >= 230) return { grade: "실버", color: "text-gray-300", emoji: "🥈" };
    if (cpm >= 150) return { grade: "브론즈", color: "text-orange-400", emoji: "🥉" };
    return { grade: "아이언", color: "text-stone-400", emoji: "🪨" };
  };

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
            <div className="flex items-center gap-4">
              {/* 언어 선택 드롭다운 */}
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-dark-300 hover:text-white bg-dark-800 rounded-lg border border-dark-700"
                >
                  <span>🇰🇷</span>
                  <span className="hidden sm:inline">한국어</span>
                  <span className="text-xs">▼</span>
                </button>
                {showLanguageMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)} />
                    <div className="absolute right-0 mt-2 w-40 bg-dark-900 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                      {languageOptions.map((lang) => (
                        <Link
                          key={lang.locale}
                          href={lang.path}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-dark-800 transition-colors ${
                            lang.locale === "ko" ? "bg-dark-800 text-white" : "text-dark-300"
                          }`}
                          onClick={() => setShowLanguageMenu(false)}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">← 메인</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">⌨️ 한글 타자 연습</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              타자 속도
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 테스트</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              당신의 타자 속도는 몇 타일까요? 지금 바로 테스트해보세요!
            </p>
          </div>

          {/* 💡 타자 속도 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <p className="text-white font-medium mb-1">타자 속도 향상 팁</p>
                <p className="text-dark-400 text-sm">
                  올바른 손가락 배치(홈 포지션)를 유지하고 키보드를 보지 않고 치는 연습을 해보세요.
                  정확도가 먼저, 속도는 자연스럽게 따라옵니다!
                </p>
              </div>
            </div>
          </div>

          {/* 타이머 & 상태 + 🔥 실시간 타수 */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-8">
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">경과 시간</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{elapsedTime}<span className="text-lg text-dark-400">초</span></p>
            </div>
            {/* 🔥 실시간 타수 - 박진감! */}
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">🔥 현재 속도</p>
              <p className={`text-2xl sm:text-3xl font-bold transition-all ${currentCpm >= 500 ? "text-purple-400 animate-pulse" : currentCpm >= 400 ? "text-cyan-400" : currentCpm >= 300 ? "text-green-400" : "text-yellow-400"}`}>
                {currentCpm}<span className="text-lg text-dark-400">타</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">진행률</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-cyan">
                {Math.round((input.length / sentence.length) * 100)}<span className="text-lg text-dark-400">%</span>
              </p>
            </div>
          </div>

          {/* 타자 영역 */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            {!isFinished ? (
              <>
                {/* 문장 표시 */}
                <div className="p-6 bg-dark-800/50 rounded-xl mb-6">
                  <p className="text-xl sm:text-2xl leading-relaxed font-mono tracking-wide">
                    {renderSentence()}
                  </p>
                </div>

                {/* 입력창 */}
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    placeholder={isStarted ? "" : "클릭하고 타이핑을 시작하세요!"}
                    className="w-full px-6 py-4 bg-dark-800 border-2 border-dark-700 rounded-xl text-white text-xl font-mono focus:outline-none focus:border-accent-purple transition-colors placeholder:text-dark-500"
                    autoFocus
                    disabled={isFinished}
                  />
                </div>

                {/* 힌트 */}
                <p className="text-center text-dark-500 text-sm mt-4">
                  💡 문장을 정확하게 입력하면 자동으로 완료됩니다
                </p>
              </>
            ) : (
              /* 결과 화면 */
              result && (
                <div className="text-center">
                  <div className="mb-8">
                    <p className="text-6xl mb-4">{getGrade(result.cpm).emoji}</p>
                    <p className={`text-2xl font-bold ${getGrade(result.cpm).color}`}>
                      {getGrade(result.cpm).grade}
                    </p>
                  </div>

                  {/* 메인 결과 */}
                  <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-xl border border-accent-purple/30 mb-6">
                    <p className="text-dark-300 text-sm mb-2">타자 속도</p>
                    <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {result.cpm}<span className="text-2xl">타/분</span>
                    </p>
                  </div>

                  {/* 상세 결과 */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">정확도</p>
                      <p className="text-2xl font-bold text-white">{result.accuracy}%</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">소요 시간</p>
                      <p className="text-2xl font-bold text-white">{result.time}초</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">WPM</p>
                      <p className="text-2xl font-bold text-white">{result.wpm}</p>
                    </div>
                  </div>

                  {/* 버튼들 */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">📤 공유</button>
                    <button onClick={saveAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 저장</button>
                    <button onClick={restart} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">🔄 다시</button>
                  </div>
                  {!hasSubmittedScore && result && (
                    <button onClick={() => setShowNicknameModal(true)} className="w-full max-w-sm mx-auto mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">🏆 랭킹 등록!</button>
                  )}
                </div>
              )
            )}
          </div>

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> 명예의전당</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄 새로고침</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">⌨️</div><p className="text-dark-400">아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          entry.grade === "챌린저" ? "text-cyan-300" :
                          entry.grade === "마스터" ? "text-purple-400" :
                          entry.grade === "다이아몬드" ? "text-blue-400" :
                          entry.grade === "플래티넘" ? "text-teal-400" :
                          entry.grade === "골드" ? "text-yellow-400" :
                          entry.grade === "실버" ? "text-gray-300" :
                          entry.grade === "브론즈" ? "text-orange-400" :
                          "text-stone-400"
                        }>{entry.grade || getGrade(entry.wpm).grade}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.wpm}타/분</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {leaderboard.length}명</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>⌨️ 타자 속도 테스트</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{result ? getGrade(result.cpm).emoji : "⌨️"}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: result && result.cpm >= 600 ? "#c084fc" : result && result.cpm >= 500 ? "#22d3ee" : "#4ade80" }}>{result ? getGrade(result.cpm).grade : ""}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{result?.cpm || 0}<span style={{ fontSize: "18px", color: "#7c3aed" }}> 타/분</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>정확도 {result?.accuracy || 0}% / {result?.time || 0}초</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}><div style={{ color: "#67e8f9", fontSize: "10px" }}>🎯 정확도</div><div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{result?.accuracy || 0}%</div></div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/typing")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}><span>{new Date().toLocaleDateString("ko-KR")}</span><span style={{ color: "#8b5cf6" }}>slox.co.kr/typing</span></div>
          </div>

          {/* 🚀 자동 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    {(() => {
                      const myRank = leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => result.cpm > e.wpm) === -1 ? leaderboard.length + 1 : leaderboard.findIndex(e => result.cpm > e.wpm) + 1;
                      const isFirstPlace = leaderboard.length === 0 || result.cpm > leaderboard[0].wpm;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : myRank <= 3 ? "🏆" : myRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : myRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${myRank}위!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{result.cpm}타/분 (정확도 {result.accuracy}%)</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && result.cpm <= leaderboard[0].wpm && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].wpm}타/분</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-purple-400 font-bold">{result.cpm}타/분</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      랭킹 등록하기!
                    </span>
                  </button>
                  <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">나중에 할게요</button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 모달 */}
          {showNicknameModal && result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(result.cpm).emoji}</div><h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3><p className="text-dark-400 text-sm">{result.cpm}타/분 (정확도 {result.accuracy}%)</p></div>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">취소</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : "등록!"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 📝 타자 테스트란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>📊</span> 타자 속도 측정이란?
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              타자 속도는 WPM(Words Per Minute) 또는 타/분으로 측정합니다. 
              평균 타자 속도는 200~300타/분이며, 전문 타이피스트는 500타/분 이상을 기록합니다.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-green-400 font-medium">💼 업무</p>
                <p className="text-dark-400 mt-1">문서 작성, 코딩 생산성 향상</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-teal-400 font-medium">🎓 학습</p>
                <p className="text-dark-400 mt-1">리포트, 과제 작성 효율화</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">📊 타자 속도 등급표</h3>
            <p className="text-dark-400 text-xs text-center mb-6">
              {isMobile ? "📱 모바일" : "💻 데스크톱"} 기준 (타/분)
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 챌린저</span>
                <span className="text-white text-xs ml-2">{isMobile ? "480" : "650"}+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 마스터</span>
                <span className="text-white text-xs ml-2">{isMobile ? "400~479" : "550~649"}</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 다이아몬드</span>
                <span className="text-white text-xs ml-2">{isMobile ? "330~399" : "450~549"}</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 플래티넘</span>
                <span className="text-white text-xs ml-2">{isMobile ? "270~329" : "370~449"}</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 골드</span>
                <span className="text-white text-xs ml-2">{isMobile ? "210~269" : "300~369"}</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 실버</span>
                <span className="text-white text-xs ml-2">{isMobile ? "150~209" : "230~299"}</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 브론즈</span>
                <span className="text-white text-xs ml-2">{isMobile ? "90~149" : "150~229"}</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 아이언</span>
                <span className="text-white text-xs ml-2">~{isMobile ? "89" : "149"}</span>
              </div>
            </div>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/reaction"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⚡ 반응속도 테스트
              </Link>
              <Link 
                href="/salary"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💰 연봉 실수령액 계산기
              </Link>
              <Link 
                href="/severance"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💼 퇴직금 계산기
              </Link>
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
            <p className="text-dark-500 text-xs mt-2">
              홈페이지 · 앱 제작 · AI 챗봇 구축
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

