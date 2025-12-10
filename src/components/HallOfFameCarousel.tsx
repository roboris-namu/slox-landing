"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase 클라이언트를 lazy하게 생성 (빌드 시 환경변수 없을 때 에러 방지)
const getSupabase = (): SupabaseClient | null => {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

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
  bgColor: string;
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
  { table: "reaction_leaderboard", game: "reaction", gameName: "반응속도", emoji: "⚡", href: "/reaction", unit: "ms", color: "from-yellow-500 to-orange-500", bgColor: "from-yellow-500/20 to-orange-500/20", scoreField: "score", orderAsc: true },
  { table: "cps_leaderboard", game: "cps", gameName: "CPS", emoji: "🖱️", href: "/cps", unit: "CPS", color: "from-purple-500 to-pink-500", bgColor: "from-purple-500/20 to-pink-500/20", scoreField: "score", orderAsc: false },
  { table: "typing_leaderboard", game: "typing", gameName: "타자속도", emoji: "⌨️", href: "/typing", unit: "타/분", color: "from-cyan-500 to-blue-500", bgColor: "from-cyan-500/20 to-blue-500/20", scoreField: "wpm", orderAsc: false },
  { table: "memory_leaderboard", game: "memory", gameName: "숫자기억", emoji: "🧠", href: "/memory", unit: "자리", color: "from-green-500 to-emerald-500", bgColor: "from-green-500/20 to-emerald-500/20", scoreField: "score", orderAsc: false },
  { table: "color_leaderboard", game: "color", gameName: "색상찾기", emoji: "👁️", href: "/color", unit: "점", color: "from-pink-500 to-rose-500", bgColor: "from-pink-500/20 to-rose-500/20", scoreField: "score", orderAsc: false },
  { table: "aim_leaderboard", game: "aim", gameName: "에임", emoji: "🎯", href: "/aim", unit: "점", color: "from-red-500 to-orange-500", bgColor: "from-red-500/20 to-orange-500/20", scoreField: "score", orderAsc: false },
  { table: "cardmatch_leaderboard", game: "card", gameName: "카드매칭", emoji: "🃏", href: "/card-match", unit: "점", color: "from-indigo-500 to-purple-500", bgColor: "from-indigo-500/20 to-purple-500/20", scoreField: "score", orderAsc: false },
];

export default function HallOfFameCarousel() {
  const [leaderboards, setLeaderboards] = useState<GameLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 클라이언트 사이드에서만 Supabase 클라이언트 생성
  const supabase = useMemo(() => getSupabase(), []);

  const fetchAllLeaderboards = useCallback(async () => {
    // Supabase 클라이언트가 없으면 기본 데이터로 표시
    if (!supabase) {
      // 기본 게임 목록만 표시 (데이터 없이)
      setLeaderboards(gameConfigs.map(config => ({
        game: config.game,
        gameName: config.gameName,
        emoji: config.emoji,
        href: config.href,
        unit: config.unit,
        color: config.color,
        bgColor: config.bgColor,
        entries: [],
      })));
      setIsLoading(false);
      return;
    }

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
          }

          return {
            game: config.game,
            gameName: config.gameName,
            emoji: config.emoji,
            href: config.href,
            unit: config.unit,
            color: config.color,
            bgColor: config.bgColor,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entries: (data || []).map((entry: any) => ({
              nickname: entry.nickname as string,
              score: parseFloat(entry[config.scoreField]) || 0, // 문자열도 숫자로 변환
              grade: entry.grade as string,
              percentile: entry.percentile as number,
              device_type: entry.device_type as string,
            })),
          };
        })
      );

      setLeaderboards(results);
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
      // 에러 시에도 기본 게임 목록 표시
      setLeaderboards(gameConfigs.map(config => ({
        game: config.game,
        gameName: config.gameName,
        emoji: config.emoji,
        href: config.href,
        unit: config.unit,
        color: config.color,
        bgColor: config.bgColor,
        entries: [],
      })));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchAllLeaderboards();
  }, [fetchAllLeaderboards]);

  // 무한 스크롤을 위해 데이터 복제 (최소 14개 = 7 * 2)
  const displayLeaderboards = leaderboards.length > 0 ? leaderboards : gameConfigs.map(config => ({
    game: config.game,
    gameName: config.gameName,
    emoji: config.emoji,
    href: config.href,
    unit: config.unit,
    color: config.color,
    bgColor: config.bgColor,
    entries: [],
  }));
  const duplicatedLeaderboards = [...displayLeaderboards, ...displayLeaderboards];

  return (
    <section className="py-20 overflow-hidden relative">
      {/* 배경 효과 - 더 화려하게 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none" />
      
      {/* 상단 장식 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          {/* 트로피 아이콘 애니메이션 */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 animate-pulse">
            <span className="text-5xl">🏆</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
              명예의 전당
            </span>
          </h2>
          
          <p className="text-lg text-dark-300 mb-2">
            🔥 최고의 기록에 <span className="text-yellow-400 font-bold">도전</span>하세요!
          </p>
          <p className="text-sm text-dark-500">
            당신의 이름을 영원히 남기세요 ✨
          </p>
        </div>
      </div>

      {/* 필름 스트립 스타일 캐러셀 */}
      <div className="relative overflow-hidden">
        {/* 좌우 페이드 효과 - 모바일에서는 좁게, PC에서는 넓게 */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        {/* 스크롤 컨테이너 - 모바일에서도 살짝 멀리서 시작 */}
        <div 
          className="flex gap-4 sm:gap-6 md:gap-8 animate-scroll-left pl-[30vw] sm:pl-[25vw] md:pl-[20vw] lg:pl-[20vw]"
          style={{ width: "max-content" }}
        >
          {duplicatedLeaderboards.map((lb, idx) => {
            const isEventGame = lb.game === "reaction"; // 🎁 현재 이벤트 중인 게임
            const isSecondLoopStart = idx === displayLeaderboards.length; // 🔄 두 번째 루프 시작점
            
            return (
            <div key={`${lb.game}-${idx}`} className={`flex-shrink-0 flex items-center ${isSecondLoopStart ? "ml-16 sm:ml-24 md:ml-32" : ""}`}>
              <Link
                href={lb.href}
                className="flex-shrink-0 w-72 sm:w-76 md:w-80 group"
              >
              <div className={`relative bg-gradient-to-br ${lb.bgColor} backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:z-20 overflow-hidden ${
                isEventGame 
                  ? "border-2 border-yellow-400/70 shadow-lg shadow-yellow-500/30 hover:border-yellow-300 hover:shadow-yellow-500/50" 
                  : "border border-white/10 hover:border-white/30 hover:shadow-purple-500/20"
              }`}>
                {/* 🎁 이벤트 리본 */}
                {isEventGame && (
                  <>
                    <div className="absolute -top-1 -right-1 z-20">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-lg animate-pulse">
                          🎁 EVENT
                        </div>
                        {/* 반짝이 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    {/* 이벤트 카드 글로우 테두리 */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/50 animate-pulse pointer-events-none" />
                  </>
                )}
                
                {/* 카드 내부 글로우 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${lb.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                
                {/* 게임 헤더 */}
                <div className="relative flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lb.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{lb.emoji}</span>
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg block">{lb.gameName}</span>
                      <span className="text-dark-400 text-xs">테스트</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${isEventGame ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-500/50" : "bg-white/10"}`}>
                    <span className={`text-xs font-medium transition-colors ${isEventGame ? "text-yellow-300" : "text-white/80 group-hover:text-cyan-400"}`}>
                      도전하기 →
                    </span>
                  </div>
                </div>

                {/* 랭킹 리스트 */}
                <div className="relative space-y-3">
                  {lb.entries.length > 0 ? (
                    lb.entries.map((entry, rank) => (
                      <div
                        key={rank}
                        className={`relative flex items-center gap-3 p-3 rounded-2xl transition-all ${
                          rank === 0 && isEventGame 
                            ? "bg-gradient-to-r from-yellow-500/40 to-orange-500/30 border-2 border-yellow-400 shadow-lg shadow-yellow-500/20" 
                            : rank === 0 
                              ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/20 border border-yellow-500/30" 
                              : rank === 1 
                                ? "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border border-gray-400/20" 
                                : "bg-gradient-to-r from-orange-600/20 to-orange-700/10 border border-orange-600/20"
                        }`}
                      >
                        {/* 💎 1등 당첨 유력 배지 (이벤트 게임만) - 시안 색상 */}
                        {rank === 0 && isEventGame && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-cyan-500/30 animate-pulse whitespace-nowrap">
                              💎 당첨 유력!
                            </div>
                          </div>
                        )}
                        {/* 순위 메달 */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-lg ${
                          rank === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black" :
                          rank === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-black" :
                          "bg-gradient-to-br from-orange-500 to-orange-700 text-white"
                        }`}>
                          {rank === 0 ? "👑" : rank + 1}
                        </div>

                        {/* 닉네임 & 등급 */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate">
                            {entry.nickname}
                          </p>
                          <p className={`text-xs font-medium ${gradeColors[entry.grade] || "text-dark-400"}`}>
                            {entry.grade || "-"}
                          </p>
                        </div>

                        {/* 점수 */}
                        <div className="text-right">
                          <p className={`font-black text-lg bg-gradient-to-r ${lb.color} text-transparent bg-clip-text`}>
                            {typeof entry.score === 'number' && entry.score % 1 !== 0 
                              ? entry.score.toFixed(1) 
                              : entry.score}
                          </p>
                          <p className="text-dark-500 text-xs">{lb.unit}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // 빈 슬롯 - 도전 유도
                    Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={`empty-${i}`} 
                        className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        <div className="text-center">
                          <span className="text-2xl mb-1 block">
                            {i === 0 ? "👑" : i === 1 ? "🥈" : "🥉"}
                          </span>
                          <span className="text-dark-400 text-sm font-medium">
                            {i === 0 ? "1등을 노려보세요!" : "도전자 모집 중..."}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* 하단 CTA */}
                <div className="relative mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-sm">🏅</span>
                      <span className="text-dark-400 text-xs">TOP 3</span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${lb.color} opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105`}>
                      <span className="text-white text-sm font-bold">
                        🎮 플레이
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          );
          })}
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center">
          <Link 
            href="/tools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            <span className="text-xl">🎮</span>
            <span className="text-lg">전체 게임 도전하기</span>
            <span className="text-xl">→</span>
          </Link>
          <p className="mt-4 text-dark-500 text-sm">
            7가지 게임에서 당신의 실력을 증명하세요!
          </p>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-950/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-dark-300">랭킹 불러오는 중...</p>
          </div>
        </div>
      )}
    </section>
  );
}
