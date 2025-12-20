"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface BattleRecord {
  id: string;
  game: string;
  gameEmoji: string;
  winnerName: string;
  winnerImage: string | null;
  loserName: string;
  loserImage: string | null;
  isDraw: boolean;
  pointsTransferred: number;
  completedAt: string;
}

interface BattleTickerProps {
  lang?: "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
}

// 게임 이름 매핑
const GAME_NAMES: Record<string, Record<string, string>> = {
  ko: { reaction: "반응", cps: "클릭", memory: "기억력", color: "색상", aim: "조준", cardmatch: "카드", quiz: "퀴즈", iq: "IQ", sudoku: "스도쿠", typing: "타자" },
  en: { reaction: "Reaction", cps: "CPS", memory: "Memory", color: "Color", aim: "Aim", cardmatch: "Cards", quiz: "Quiz", iq: "IQ", sudoku: "Sudoku", typing: "Typing" },
  ja: { reaction: "反応", cps: "クリック", memory: "記憶", color: "色彩", aim: "エイム", cardmatch: "カード", quiz: "クイズ", iq: "IQ", sudoku: "数独", typing: "タイピング" },
  zh: { reaction: "反应", cps: "点击", memory: "记忆", color: "颜色", aim: "瞄准", cardmatch: "卡牌", quiz: "问答", iq: "IQ", sudoku: "数独", typing: "打字" },
  es: { reaction: "Reacción", cps: "CPS", memory: "Memoria", color: "Color", aim: "Puntería", cardmatch: "Cartas", quiz: "Quiz", iq: "IQ", sudoku: "Sudoku", typing: "Mecanografía" },
  pt: { reaction: "Reação", cps: "CPS", memory: "Memória", color: "Cor", aim: "Mira", cardmatch: "Cartas", quiz: "Quiz", iq: "IQ", sudoku: "Sudoku", typing: "Digitação" },
  de: { reaction: "Reaktion", cps: "CPS", memory: "Gedächtnis", color: "Farbe", aim: "Zielen", cardmatch: "Karten", quiz: "Quiz", iq: "IQ", sudoku: "Sudoku", typing: "Tippen" },
  fr: { reaction: "Réaction", cps: "CPS", memory: "Mémoire", color: "Couleur", aim: "Visée", cardmatch: "Cartes", quiz: "Quiz", iq: "IQ", sudoku: "Sudoku", typing: "Frappe" },
};

// 번역
const translations = {
  ko: { title: "실시간 배틀", win: "(승)", lose: "(패)", steal: "점 강탈!", draw: "무승부" },
  en: { title: "Live Battles", win: "(W)", lose: "(L)", steal: "pts stolen!", draw: "Draw" },
  ja: { title: "リアルタイムバトル", win: "(勝)", lose: "(敗)", steal: "点強奪!", draw: "引き分け" },
  zh: { title: "实时对战", win: "(胜)", lose: "(败)", steal: "分抢夺!", draw: "平局" },
  es: { title: "Batallas en vivo", win: "(G)", lose: "(P)", steal: "pts robados!", draw: "Empate" },
  pt: { title: "Batalhas ao vivo", win: "(V)", lose: "(D)", steal: "pts roubados!", draw: "Empate" },
  de: { title: "Live-Kämpfe", win: "(S)", lose: "(N)", steal: "Pkt gestohlen!", draw: "Unentschieden" },
  fr: { title: "Batailles en direct", win: "(V)", lose: "(D)", steal: "pts volés!", draw: "Égalité" },
};

export default function BattleTicker({ lang = "ko" }: BattleTickerProps) {
  const [battles, setBattles] = useState<BattleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang] || translations.ko;
  const gameNames = GAME_NAMES[lang] || GAME_NAMES.ko;

  // 스크롤 관련 refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 상태
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 배틀 기록 가져오기
  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const res = await fetch("/api/battle/recent");
        const data = await res.json();
        if (data.battles) {
          setBattles(data.battles);
        }
      } catch (err) {
        console.error("배틀 기록 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBattles();
    const interval = setInterval(fetchBattles, 30000);
    return () => clearInterval(interval);
  }, []);

  // 자동 스크롤 애니메이션 (requestAnimationFrame 기반)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || battles.length === 0) return;

    const speed = 1; // 픽셀/프레임

    const animate = () => {
      if (!isPaused && !isDragging && scrollContainer) {
        scrollPositionRef.current += speed;

        // 무한 스크롤: 절반 지점에서 처음으로 리셋
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current = 0;
        }

        scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging, battles.length]);

  // 드래그 시작
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = clientX;
    scrollLeftRef.current = scrollPositionRef.current;

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  // 드래그 중
  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;

    const delta = startXRef.current - clientX;
    scrollPositionRef.current = scrollLeftRef.current + delta;

    // 음수 방지
    if (scrollPositionRef.current < 0) {
      scrollPositionRef.current = 0;
    }

    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    }
  }, [isDragging]);

  // 드래그 종료
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    // 1초 후 자동 스크롤 재개
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  }, []);

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  // 호버 시 일시정지
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };
  const handleMouseLeaveContainer = () => {
    if (!isDragging) {
      resumeTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  };

  // 배틀이 없거나 로딩 중이면 표시 안 함
  if (loading || battles.length === 0) {
    return null;
  }

  // 프로필 이미지 컴포넌트
  const ProfileImg = ({ src, name, color }: { src: string | null; name: string; color: string }) => (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${color} text-[10px] font-bold text-white overflow-hidden flex-shrink-0`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" draggable={false} />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </span>
  );

  // 티커 아이템 생성
  const renderBattleItem = (battle: BattleRecord, index: number) => {
    const gameName = gameNames[battle.game] || battle.game;

    if (battle.isDraw) {
      return (
        <span key={`${battle.id}-${index}`} className="inline-flex items-center gap-1.5 mr-12">
          <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-xs font-medium">{battle.gameEmoji} {gameName}</span>
          <ProfileImg src={battle.winnerImage} name={battle.winnerName} color="bg-dark-600" />
          <span className="text-white font-medium">{battle.winnerName}</span>
          <span className="text-dark-400">vs</span>
          <ProfileImg src={battle.loserImage} name={battle.loserName} color="bg-dark-600" />
          <span className="text-white font-medium">{battle.loserName}</span>
          <span className="text-yellow-400 font-bold">🤝 {t.draw}</span>
        </span>
      );
    }

    return (
      <span key={`${battle.id}-${index}`} className="inline-flex items-center gap-1.5 mr-12">
        <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-xs font-medium">{battle.gameEmoji} {gameName}</span>
        <ProfileImg src={battle.winnerImage} name={battle.winnerName} color="bg-green-600" />
        <span className="text-green-400 font-bold">{battle.winnerName}</span>
        <span className="text-green-300 text-xs">{t.win}</span>
        <span className="text-dark-500">▸</span>
        <ProfileImg src={battle.loserImage} name={battle.loserName} color="bg-red-600" />
        <span className="text-red-400">{battle.loserName}</span>
        <span className="text-red-300 text-xs">{t.lose}</span>
        {battle.pointsTransferred > 0 && (
          <span className="text-yellow-400 font-bold">🔥 {battle.pointsTransferred}{t.steal}</span>
        )}
      </span>
    );
  };

  // 무한 스크롤을 위해 아이템 복제
  const duplicatedBattles = [...battles, ...battles, ...battles, ...battles];

  return (
    <>
      {/* 티커 고정 - 네비바 바로 아래 */}
      <div className="fixed top-24 left-0 right-0 z-40 bg-gradient-to-r from-dark-900/95 via-dark-800/95 to-dark-900/95 backdrop-blur-md border-b border-dark-700/50 overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            {/* 타이틀 */}
            <Link
              href="/reaction"
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full shrink-0 hover:from-red-500/30 hover:to-orange-500/30 transition-all"
            >
              <span className="text-sm">🥊</span>
              <span className="text-xs font-bold text-white">{t.title}</span>
            </Link>

            {/* 티커 */}
            <div
              className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeaveContainer}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 좌우 그라데이션 페이드 */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-800/95 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-800/95 to-transparent z-10 pointer-events-none" />

              {/* 스크롤 컨테이너 */}
              <div
                ref={scrollRef}
                className="whitespace-nowrap text-sm select-none"
                style={{ willChange: "transform" }}
              >
                {duplicatedBattles.map((battle, index) => renderBattleItem(battle, index))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 티커 높이 + 여백 확보 */}
      <div className="h-20" />
    </>
  );
}
