"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

type GameState = "waiting" | "ready" | "click" | "result" | "tooEarly";

/**
 * 등급 계산 (롤 스타일) - 모바일/데스크톱 분리
 */
const getGrade = (ms: number, isMobile: boolean = false): { grade: string; color: string; emoji: string; message: string } => {
  if (isMobile) {
    // 모바일 기준 (터치 반응 느림 반영)
    if (ms < 200) return { grade: "챌린저", color: "text-cyan-300", emoji: "👑", message: "전설의 반응속도!" };
    if (ms < 280) return { grade: "마스터", color: "text-purple-400", emoji: "💎", message: "인간의 한계를 넘었어요!" };
    if (ms < 360) return { grade: "다이아몬드", color: "text-blue-400", emoji: "💠", message: "프로게이머 수준!" };
    if (ms < 450) return { grade: "플래티넘", color: "text-teal-400", emoji: "🏆", message: "상위권 반응속도!" };
    if (ms < 550) return { grade: "골드", color: "text-yellow-400", emoji: "🥇", message: "평균보다 빠르네요!" };
    if (ms < 700) return { grade: "실버", color: "text-gray-300", emoji: "🥈", message: "평균적인 속도예요" };
    if (ms < 900) return { grade: "브론즈", color: "text-orange-400", emoji: "🥉", message: "조금 느린 편이에요" };
    return { grade: "아이언", color: "text-stone-400", emoji: "🪨", message: "연습이 필요해요!" };
  }
  // 데스크톱 기준
  if (ms < 120) return { grade: "챌린저", color: "text-cyan-300", emoji: "👑", message: "전설의 반응속도!" };
  if (ms < 150) return { grade: "마스터", color: "text-purple-400", emoji: "💎", message: "인간의 한계를 넘었어요!" };
  if (ms < 180) return { grade: "다이아몬드", color: "text-blue-400", emoji: "💠", message: "프로게이머 수준!" };
  if (ms < 220) return { grade: "플래티넘", color: "text-teal-400", emoji: "🏆", message: "상위권 반응속도!" };
  if (ms < 270) return { grade: "골드", color: "text-yellow-400", emoji: "🥇", message: "평균보다 빠르네요!" };
  if (ms < 330) return { grade: "실버", color: "text-gray-300", emoji: "🥈", message: "평균적인 속도예요" };
  if (ms < 400) return { grade: "브론즈", color: "text-orange-400", emoji: "🥉", message: "조금 느린 편이에요" };
  return { grade: "아이언", color: "text-stone-400", emoji: "🪨", message: "연습이 필요해요!" };
};

export default function ReactionTest() {
  const [state, setState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    setState("ready");
    
    // 2~5초 사이 랜덤 대기
    const delay = Math.random() * 3000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setState("click");
      setStartTime(Date.now());
    }, delay);
  }, []);

  // 클릭 처리
  const handleClick = useCallback(() => {
    if (state === "waiting") {
      startGame();
    } else if (state === "ready") {
      // 너무 일찍 클릭
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setState("tooEarly");
    } else if (state === "click") {
      // 반응 시간 측정
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setAttempts(prev => [...prev, reaction]);
      setState("result");
    } else if (state === "result" || state === "tooEarly") {
      // 다시 시작
      startGame();
    }
  }, [state, startTime, startGame]);

  // 리셋
  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState("waiting");
    setReactionTime(0);
    setAttempts([]);
  };

  // 평균 계산
  const getAverage = (): number => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  // 최고 기록
  const getBest = (): number => {
    if (attempts.length === 0) return 0;
    return Math.min(...attempts);
  };

  // 공유하기 (텍스트 + URL)
  const shareResult = async () => {
    const avg = getAverage();
    const best = getBest();
    const lastGrade = getGrade(reactionTime, isMobile);
    const shareUrl = 'https://www.slox.co.kr/reaction';
    const shareText = `⚡ 반응속도 테스트 결과!

${lastGrade.emoji} 현재: ${reactionTime}ms (${lastGrade.grade})
🎯 평균: ${avg}ms
🏆 최고: ${best}ms

나도 테스트하기 👉`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
          url: shareUrl
        });
      } catch {
        // 공유 취소시 무시
      }
    } else {
      // PC: 클립보드에 복사
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 상태별 배경색
  const getBgColor = (): string => {
    switch (state) {
      case "waiting": return "bg-dark-900";
      case "ready": return "bg-red-600";
      case "click": return "bg-green-500";
      case "result": return "bg-dark-900";
      case "tooEarly": return "bg-yellow-600";
      default: return "bg-dark-900";
    }
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
              <Link 
                href="/typing"
                className="text-dark-400 hover:text-white transition-colors text-sm"
              >
                타자 테스트
              </Link>
              <Link 
                href="/"
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
                ← 메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">⚡ 반응속도 측정</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              반응속도
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 테스트</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              초록색이 되면 최대한 빠르게 클릭하세요!
            </p>
          </div>

          {/* 광고 영역 (상단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-6">
              광고 영역 (Google AdSense)
            </div>
          </div>

          {/* 게임 영역 */}
          <div 
            onClick={handleClick}
            className={`${getBgColor()} rounded-2xl cursor-pointer transition-colors duration-100 select-none mb-8`}
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8">
              {state === "waiting" && (
                <>
                  <p className="text-6xl mb-4">🎯</p>
                  <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                  <p className="text-dark-400">클릭하여 시작하세요</p>
                </>
              )}
              
              {state === "ready" && (
                <>
                  <p className="text-6xl mb-4">🔴</p>
                  <p className="text-2xl font-bold text-white mb-2">기다리세요...</p>
                  <p className="text-red-200">초록색이 될 때까지 기다리세요!</p>
                </>
              )}
              
              {state === "click" && (
                <>
                  <p className="text-6xl mb-4">🟢</p>
                  <p className="text-3xl font-bold text-white mb-2">지금 클릭!</p>
                  <p className="text-green-100">최대한 빠르게!</p>
                </>
              )}
              
              {state === "tooEarly" && (
                <>
                  <p className="text-6xl mb-4">😅</p>
                  <p className="text-2xl font-bold text-white mb-2">너무 빨랐어요!</p>
                  <p className="text-yellow-100">초록색이 될 때까지 기다리세요</p>
                  <p className="text-yellow-200 text-sm mt-4">클릭하여 다시 시도</p>
                </>
              )}
              
              {state === "result" && (
                <>
                  <p className="text-5xl mb-4">{getGrade(reactionTime, isMobile).emoji}</p>
                  <p className={`text-xl font-bold ${getGrade(reactionTime, isMobile).color} mb-2`}>
                    {getGrade(reactionTime, isMobile).grade}
                  </p>
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                    {reactionTime}ms
                  </p>
                  <p className="text-dark-400 mb-4">{getGrade(reactionTime, isMobile).message}</p>
                  <p className="text-dark-500 text-sm">클릭하여 다시 시도</p>
                </>
              )}
            </div>
          </div>

          {/* 기록 */}
          {attempts.length > 0 && (
            <div className="glass-card p-6 rounded-2xl mb-8">
              {/* 결과 요약 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">현재</p>
                  <p className="text-2xl font-bold text-white">{reactionTime}ms</p>
                  <p className={`text-xs ${getGrade(reactionTime, isMobile).color}`}>{getGrade(reactionTime, isMobile).grade}</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">평균</p>
                  <p className="text-2xl font-bold text-accent-cyan">{getAverage()}ms</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">최고</p>
                  <p className="text-2xl font-bold text-accent-purple">{getBest()}ms</p>
                </div>
              </div>
              
              {/* 최근 기록 */}
              <div className="mb-6">
                <p className="text-dark-400 text-sm mb-2">최근 기록 ({attempts.length}회)</p>
                <div className="flex flex-wrap gap-2">
                  {attempts.slice(-10).map((time, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        time === getBest() 
                          ? "bg-accent-purple/20 text-accent-purple" 
                          : "bg-dark-800 text-dark-300"
                      }`}
                    >
                      {time}ms
                    </span>
                  ))}
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={shareResult}
                  className="flex-1 px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all"
                >
                  📤 공유하기
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
                >
                  🔄 기록 초기화
                </button>
              </div>
            </div>
          )}

          {/* 광고 영역 (하단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-6">
              광고 영역 (Google AdSense)
            </div>
          </div>

          {/* 등급 안내 (롤 스타일 - 계층형) */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">🎮 반응속도 티어표</h3>
            <p className="text-accent-cyan text-xs text-center mb-6">
              {isMobile ? "📱 모바일 기준" : "🖥️ 데스크톱 기준"}
            </p>
            <div className="flex flex-col items-center gap-2">
              {/* 챌린저 */}
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 챌린저</span>
                <span className="text-white text-xs ml-2">&lt;{isMobile ? "200" : "120"}ms</span>
              </div>
              {/* 마스터 */}
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 마스터</span>
                <span className="text-white text-xs ml-2">{isMobile ? "200~279" : "120~149"}ms</span>
              </div>
              {/* 다이아 */}
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 다이아</span>
                <span className="text-white text-xs ml-2">{isMobile ? "280~359" : "150~179"}ms</span>
              </div>
              {/* 플래티넘 */}
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 플래티넘</span>
                <span className="text-white text-xs ml-2">{isMobile ? "360~449" : "180~219"}ms</span>
              </div>
              {/* 골드 */}
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 골드</span>
                <span className="text-white text-xs ml-2">{isMobile ? "450~549" : "220~269"}ms</span>
              </div>
              {/* 실버 */}
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 실버</span>
                <span className="text-white text-xs ml-2">{isMobile ? "550~699" : "270~329"}ms</span>
              </div>
              {/* 브론즈 */}
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 브론즈</span>
                <span className="text-white text-xs ml-2">{isMobile ? "700~899" : "330~399"}ms</span>
              </div>
              {/* 아이언 */}
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 아이언</span>
                <span className="text-white text-xs ml-2">{isMobile ? "900" : "400"}ms+</span>
              </div>
            </div>
            <p className="text-dark-500 text-xs mt-6 text-center">
              {isMobile 
                ? "💡 모바일 터치 반응 시간을 고려한 기준입니다"
                : "💡 평균 반응속도는 약 250~300ms (골드~실버) 입니다"
              }
            </p>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/typing"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⌨️ 타자 속도 테스트
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

