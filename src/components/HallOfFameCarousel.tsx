"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface LeaderboardEntry {
  nickname: string;
  score: number;
  grade: string;
  percentile: number;
  device_type: string;
}

interface GameLeaderboard {
  game: string;
  gameName: string;
  emoji: string;
  href: string;
  unit: string;
  entries: LeaderboardEntry[];
  color: string;
}

const gradeColors: Record<string, string> = {
  "챌린저": "text-cyan-300",
  "마스터": "text-purple-400",
  "다이아몬드": "text-blue-400",
  "플래티넘": "text-teal-400",
  "골드": "text-yellow-400",
  "실버": "text-gray-300",
  "브론즈": "text-orange-400",
  "아이언": "text-stone-400",
  // English
  "Challenger": "text-cyan-300",
  "Master": "text-purple-400",
  "Diamond": "text-blue-400",
  "Platinum": "text-teal-400",
  "Gold": "text-yellow-400",
  "Silver": "text-gray-300",
  "Bronze": "text-orange-400",
  "Iron": "text-stone-400",
};

const gameConfigs = [
  { table: "reaction_leaderboard", game: "reaction", gameName: "반응속도", emoji: "⚡", href: "/reaction", unit: "ms", color: "from-yellow-500/20 to-orange-500/20", scoreField: "score", orderAsc: true },
  { table: "cps_leaderboard", game: "cps", gameName: "CPS", emoji: "🖱️", href: "/cps", unit: "CPS", color: "from-purple-500/20 to-pink-500/20", scoreField: "score", orderAsc: false },
  { table: "typing_leaderboard", game: "typing", gameName: "타자속도", emoji: "⌨️", href: "/typing", unit: "타/분", color: "from-cyan-500/20 to-blue-500/20", scoreField: "wpm", orderAsc: false },
  { table: "memory_leaderboard", game: "memory", gameName: "숫자기억", emoji: "🧠", href: "/memory", unit: "자리", color: "from-green-500/20 to-emerald-500/20", scoreField: "score", orderAsc: false },
  { table: "color_leaderboard", game: "color", gameName: "색상찾기", emoji: "👁️", href: "/color", unit: "Lv", color: "from-pink-500/20 to-rose-500/20", scoreField: "level", orderAsc: false },
  { table: "aim_leaderboard", game: "aim", gameName: "에임", emoji: "🎯", href: "/aim", unit: "점", color: "from-red-500/20 to-orange-500/20", scoreField: "score", orderAsc: false },
  { table: "cardmatch_leaderboard", game: "card", gameName: "카드매칭", emoji: "🃏", href: "/card-match", unit: "점", color: "from-indigo-500/20 to-purple-500/20", scoreField: "score", orderAsc: false },
];

export default function HallOfFameCarousel() {
  const [leaderboards, setLeaderboards] = useState<GameLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllLeaderboards = useCallback(async () => {
    try {
      const results = await Promise.all(
        gameConfigs.map(async (config) => {
          const { data, error } = await supabase
            .from(config.table)
            .select("nickname, " + config.scoreField + ", grade, percentile, device_type")
            .order(config.scoreField, { ascending: config.orderAsc })
            .limit(3);

          if (error) {
            console.error(`${config.game} 로드 실패:`, error);
            return null;
          }

          return {
            game: config.game,
            gameName: config.gameName,
            emoji: config.emoji,
            href: config.href,
            unit: config.unit,
            color: config.color,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entries: (data || []).map((entry: any) => ({
              nickname: entry.nickname as string,
              score: entry[config.scoreField] as number,
              grade: entry.grade as string,
              percentile: entry.percentile as number,
              device_type: entry.device_type as string,
            })),
          };
        })
      );

      setLeaderboards(results.filter((r): r is GameLeaderboard => r !== null && r.entries.length > 0));
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllLeaderboards();
  }, [fetchAllLeaderboards]);

  if (isLoading) {
    return (
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              🏆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">명예의 전당</span>
            </h2>
            <p className="text-dark-400">최고의 기록에 도전하세요!</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse text-dark-400">로딩 중...</div>
          </div>
        </div>
      </section>
    );
  }

  if (leaderboards.length === 0) {
    return null;
  }

  // 무한 스크롤을 위해 데이터 복제
  const duplicatedLeaderboards = [...leaderboards, ...leaderboards];

  return (
    <section className="py-16 overflow-hidden relative">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            🏆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">명예의 전당</span>
          </h2>
          <p className="text-dark-400">최고의 기록에 도전하세요! 당신의 이름을 남기세요 ✨</p>
        </div>
      </div>

      {/* 필름 스트립 스타일 캐러셀 */}
      <div className="relative">
        {/* 좌우 페이드 효과 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        {/* 스크롤 컨테이너 */}
        <div className="flex gap-6 animate-scroll-left hover:pause-animation">
          {duplicatedLeaderboards.map((lb, idx) => (
            <Link
              key={`${lb.game}-${idx}`}
              href={lb.href}
              className="flex-shrink-0 w-72 group"
            >
              <div className={`bg-gradient-to-br ${lb.color} backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:shadow-xl hover:shadow-purple-500/10`}>
                {/* 게임 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lb.emoji}</span>
                    <span className="text-white font-bold">{lb.gameName}</span>
                  </div>
                  <span className="text-xs text-dark-400 group-hover:text-accent-cyan transition-colors">
                    도전하기 →
                  </span>
                </div>

                {/* 랭킹 리스트 */}
                <div className="space-y-2">
                  {lb.entries.map((entry, rank) => (
                    <div
                      key={rank}
                      className={`flex items-center gap-3 p-2 rounded-xl ${
                        rank === 0 ? "bg-yellow-500/20" :
                        rank === 1 ? "bg-gray-400/10" :
                        "bg-orange-500/10"
                      }`}
                    >
                      {/* 순위 메달 */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        rank === 0 ? "bg-yellow-500 text-black" :
                        rank === 1 ? "bg-gray-300 text-black" :
                        "bg-orange-600 text-white"
                      }`}>
                        {rank + 1}
                      </div>

                      {/* 닉네임 & 등급 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {entry.nickname}
                        </p>
                        <p className={`text-xs ${gradeColors[entry.grade] || "text-dark-400"}`}>
                          {entry.grade}
                        </p>
                      </div>

                      {/* 점수 */}
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">
                          {typeof entry.score === 'number' && entry.score % 1 !== 0 
                            ? entry.score.toFixed(1) 
                            : entry.score}
                        </p>
                        <p className="text-dark-400 text-xs">{lb.unit}</p>
                      </div>
                    </div>
                  ))}

                  {/* 빈 슬롯 */}
                  {lb.entries.length < 3 && Array.from({ length: 3 - lb.entries.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex items-center justify-center p-2 rounded-xl bg-dark-800/30 border border-dashed border-dark-700">
                      <span className="text-dark-500 text-xs">도전자 모집 중...</span>
                    </div>
                  ))}
                </div>

                {/* 하단 */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-dark-500 text-xs">TOP 3</span>
                  <span className="text-accent-purple text-xs font-medium group-hover:text-accent-cyan transition-colors">
                    🎮 플레이하기
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center">
          <Link 
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-medium rounded-xl hover:opacity-90 transition-all hover:scale-105"
          >
            <span>🎮</span>
            <span>전체 게임 보기</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

