"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BattleRecord {
  id: string;
  game: string;
  gameEmoji: string;
  winnerName: string;
  loserName: string;
  isDraw: boolean;
  pointsTransferred: number;
  completedAt: string;
}

interface BattleTickerProps {
  lang?: "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
}

// 번역
const translations = {
  ko: {
    title: "실시간 배틀",
    win: "승리",
    draw: "무승부",
    points: "점",
    noBattles: "아직 배틀이 없어요",
    tryBattle: "첫 번째 배틀에 도전하세요!",
  },
  en: {
    title: "Live Battles",
    win: "won",
    draw: "Draw",
    points: "pts",
    noBattles: "No battles yet",
    tryBattle: "Be the first to battle!",
  },
  ja: {
    title: "リアルタイムバトル",
    win: "勝利",
    draw: "引き分け",
    points: "点",
    noBattles: "まだバトルがありません",
    tryBattle: "最初のバトルに挑戦!",
  },
  zh: {
    title: "实时对战",
    win: "胜利",
    draw: "平局",
    points: "分",
    noBattles: "还没有对战",
    tryBattle: "成为第一个挑战者!",
  },
  es: {
    title: "Batallas en vivo",
    win: "ganó",
    draw: "Empate",
    points: "pts",
    noBattles: "Aún no hay batallas",
    tryBattle: "¡Sé el primero en batallar!",
  },
  pt: {
    title: "Batalhas ao vivo",
    win: "venceu",
    draw: "Empate",
    points: "pts",
    noBattles: "Ainda não há batalhas",
    tryBattle: "Seja o primeiro a batalhar!",
  },
  de: {
    title: "Live-Kämpfe",
    win: "gewann",
    draw: "Unentschieden",
    points: "Pkt",
    noBattles: "Noch keine Kämpfe",
    tryBattle: "Sei der Erste!",
  },
  fr: {
    title: "Batailles en direct",
    win: "a gagné",
    draw: "Égalité",
    points: "pts",
    noBattles: "Pas encore de batailles",
    tryBattle: "Soyez le premier!",
  },
};

export default function BattleTicker({ lang = "ko" }: BattleTickerProps) {
  const [battles, setBattles] = useState<BattleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang] || translations.ko;

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
    
    // 30초마다 새로고침
    const interval = setInterval(fetchBattles, 30000);
    return () => clearInterval(interval);
  }, []);

  // 배틀이 없거나 로딩 중이면 표시 안 함
  if (loading || battles.length === 0) {
    return null;
  }

  // 티커 아이템 생성 (구분자: 공백)
  const tickerItems = battles.map((battle, index) => {
    const isLast = index === battles.length - 1;
    
    if (battle.isDraw) {
      return (
        <span key={battle.id} className="inline-flex items-center gap-1">
          <span>{battle.gameEmoji}</span>
          <span className="text-white font-medium">{battle.winnerName}</span>
          <span className="text-dark-400">vs</span>
          <span className="text-white font-medium">{battle.loserName}</span>
          <span className="text-yellow-400 font-bold">🤝 {t.draw}</span>
          {/* 아이템 간 구분: 공백 */}
          <span className="inline-block w-10" />
          {/* 한 바퀴 끝: 큰 공백 */}
          {isLast && <span className="inline-block w-32" />}
        </span>
      );
    }
    
    return (
      <span key={battle.id} className="inline-flex items-center gap-1">
        <span>{battle.gameEmoji}</span>
        <span className="text-green-400 font-medium">{battle.winnerName}</span>
        <span className="text-dark-400">→</span>
        <span className="text-red-400 font-medium">{battle.loserName}</span>
        <span className="text-white">{t.win}!</span>
        {battle.pointsTransferred > 0 && (
          <span className="text-yellow-400 font-bold">
            (-{battle.pointsTransferred}{t.points})
          </span>
        )}
        {/* 아이템 간 구분: 공백 */}
        <span className="inline-block w-10" />
        {/* 한 바퀴 끝: 큰 공백 */}
        {isLast && <span className="inline-block w-32" />}
      </span>
    );
  });

  // 충분히 많은 아이템으로 무한 스크롤 (한 바퀴 뒤 쉼표)
  const duplicatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

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
          <div className="flex-1 overflow-hidden relative">
            {/* 좌우 그라데이션 페이드 */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-800/80 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-800/80 to-transparent z-10" />
            
            {/* 스크롤 애니메이션 */}
            <div className="animate-ticker whitespace-nowrap text-sm">
              {duplicatedItems}
            </div>
          </div>
        </div>
      </div>
      
        {/* CSS 애니메이션 */}
        <style jsx>{`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
          .animate-ticker {
            animation: ticker 30s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
      {/* 티커 높이만큼 공간 확보 */}
      <div className="h-10" />
    </>
  );
}

