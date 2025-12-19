"use client";

import { useEffect, useState, useCallback } from "react";
import { Locale, liveRankingTranslations } from "@/locales";

// 게임별 점수 타입
interface GameScore {
  rank: number;
  points: number;
}

// 랭킹 데이터 타입
interface RankingUser {
  id: string;
  nickname: string;
  total_score: number;
  attendance_count: number;
  avatar_url?: string;
  country?: string;
  game_scores?: Record<string, GameScore>;
}

// 국가 코드 → 국기 매핑
const COUNTRY_FLAGS: Record<string, string> = {
  KR: "🇰🇷", US: "🇺🇸", JP: "🇯🇵", CN: "🇨🇳", DE: "🇩🇪", FR: "🇫🇷", ES: "🇪🇸", BR: "🇧🇷",
  GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", IN: "🇮🇳", RU: "🇷🇺", IT: "🇮🇹", MX: "🇲🇽", TH: "🇹🇭",
  VN: "🇻🇳", ID: "🇮🇩", PH: "🇵🇭", MY: "🇲🇾", SG: "🇸🇬", NZ: "🇳🇿", OTHER: "🌍"
};

// 게임 타입 다국어 매핑
const GAME_NAMES: Record<Locale, Record<string, string>> = {
  ko: { reaction: "반응", typing: "타자", quiz: "퀴즈", iq: "IQ", cps: "CPS", aim: "에임", memory: "기억", color: "색상", cardmatch: "카드", sudoku: "스도쿠" },
  en: { reaction: "Reaction", typing: "Typing", quiz: "Quiz", iq: "IQ", cps: "CPS", aim: "Aim", memory: "Memory", color: "Color", cardmatch: "Cards", sudoku: "Sudoku" },
  ja: { reaction: "反応", typing: "タイピング", quiz: "クイズ", iq: "IQ", cps: "CPS", aim: "エイム", memory: "記憶", color: "色", cardmatch: "カード", sudoku: "数独" },
  zh: { reaction: "反应", typing: "打字", quiz: "问答", iq: "IQ", cps: "CPS", aim: "瞄准", memory: "记忆", color: "颜色", cardmatch: "卡牌", sudoku: "数独" },
  de: { reaction: "Reaktion", typing: "Tippen", quiz: "Quiz", iq: "IQ", cps: "CPS", aim: "Zielen", memory: "Gedächtnis", color: "Farbe", cardmatch: "Karten", sudoku: "Sudoku" },
  fr: { reaction: "Réaction", typing: "Frappe", quiz: "Quiz", iq: "QI", cps: "CPS", aim: "Visée", memory: "Mémoire", color: "Couleur", cardmatch: "Cartes", sudoku: "Sudoku" },
  es: { reaction: "Reacción", typing: "Tecleo", quiz: "Quiz", iq: "IQ", cps: "CPS", aim: "Puntería", memory: "Memoria", color: "Color", cardmatch: "Cartas", sudoku: "Sudoku" },
  pt: { reaction: "Reação", typing: "Digitação", quiz: "Quiz", iq: "QI", cps: "CPS", aim: "Mira", memory: "Memória", color: "Cor", cardmatch: "Cartas", sudoku: "Sudoku" },
};

interface LiveRankingProps {
  locale?: Locale;
}

/**
 * 🏆 실시간 종합 랭킹 컴포넌트
 * - 1~100위까지 표시
 * - 1등: 왕관 + 황금 글로우 + 네온 효과
 * - 2등: 은색 효과
 * - 3등: 동색 효과
 * - 점수 카운팅 애니메이션
 */
export default function LiveRanking({ locale = "ko" }: LiveRankingProps) {
  const t = liveRankingTranslations[locale];
  const gameNames = GAME_NAMES[locale];
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // 랭킹 데이터 로드 함수 (API 라우트를 통해 호출 - 광고 차단기 우회)
  const fetchRankings = useCallback(async () => {
    console.log("🔄 [LiveRanking] API 호출 시작 ========================");
    
    try {
      // 자체 API 라우트를 통해 호출 (광고 차단기 우회)
      const response = await fetch("/api/rankings");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      console.log("📊 [LiveRanking] API 응답 data 길이:", result?.data?.length);

      if (result.error) {
        console.error("❌ [LiveRanking] API 에러:", result.error);
        setError(true);
      } else if (Array.isArray(result.data) && result.data.length > 0) {
        console.log("✅ [LiveRanking] 성공! 유저 수:", result.data.length);
        setRankings(result.data);
        setError(false);
      } else {
        console.warn("⚠️ [LiveRanking] 빈 배열!");
        setRankings([]);
        setError(false);
      }
    } catch (err) {
      console.error("❌ [LiveRanking] fetch 에러:", err);
      setError(true);
    } finally {
      setLoading(false);
      console.log("🔄 [LiveRanking] API 호출 완료 ========================");
    }
  }, []);

  // 초기 로드 + 주기적 갱신
  useEffect(() => {
    fetchRankings();

    // 2초 후에도 로딩중이면 강제 해제 (더 빠르게!)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // 실시간 구독 (60초마다 갱신)
    const interval = setInterval(() => fetchRankings(), 60000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fetchRankings]);

  // 메달/왕관 이모지
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  // 랭크별 스타일 클래스
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 via-amber-500/30 to-yellow-500/20 border-2 border-yellow-400/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]";
      case 2:
        return "bg-gradient-to-r from-slate-400/10 via-gray-300/20 to-slate-400/10 border border-gray-400/40";
      case 3:
        return "bg-gradient-to-r from-orange-700/10 via-amber-700/20 to-orange-700/10 border border-orange-500/40";
      default:
        return "bg-dark-800/50 border border-white/5 hover:border-white/10";
    }
  };

  // 텍스트 스타일
  const getTextStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 font-black text-2xl";
      case 2:
        return "text-gray-300 font-bold text-xl";
      case 3:
        return "text-orange-400 font-bold text-xl";
      default:
        return "text-dark-300 font-semibold";
    }
  };

  // 닉네임 스타일
  const getNicknameStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-300 font-bold text-lg animate-pulse";
      case 2:
        return "text-gray-200 font-semibold";
      case 3:
        return "text-orange-300 font-semibold";
      default:
        return "text-white";
    }
  };

  // 표시할 랭킹 수
  const displayRankings = showAll ? rankings : rankings.slice(0, 10);

  // 수동 재시도 핸들러
  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRetryCount((prev) => prev + 1);
    fetchRankings();
  };

  if (loading) {
    return (
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 타이틀은 바로 표시 */}
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="text-4xl animate-bounce">🏆</span>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              {t.title}
            </h2>
            <span className="text-4xl animate-bounce" style={{ animationDelay: "0.1s" }}>🏆</span>
          </div>
          
          {/* 로딩 스켈레톤 */}
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-16 bg-dark-800/50 rounded-xl border border-white/5"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-dark-400 text-sm mt-4 animate-pulse">{t.loading}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">{t.errorTitle}</h2>
          <p className="text-dark-400 mb-4">{t.errorDesc}</p>
          <button 
            onClick={handleRetry}
            className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl transition-colors"
          >
            🔄 {t.retry} {retryCount > 0 && `(${retryCount})`}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-16 px-4 relative overflow-hidden">
      {/* 배경 글로우 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* 타이틀 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl animate-bounce">🏆</span>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              {t.title}
            </h2>
            <span className="text-4xl animate-bounce" style={{ animationDelay: "0.1s" }}>🏆</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-dark-400 text-sm">
            <span>🔥 {t.subtitle}</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">LIVE</span>
            </span>
          </div>
          {/* 상품 안내 배너 */}
          <div className="mt-3 inline-flex flex-col sm:flex-row items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500/10 via-amber-500/15 to-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <span className="text-lg">🎁</span>
            <span className="text-yellow-400 text-sm font-medium">{t.prizeInfo}</span>
          </div>
        </div>

        {/* 랭킹 목록 */}
        <div className="space-y-3">
          {displayRankings.length === 0 ? (
            <div className="text-center py-20 bg-dark-800/50 rounded-2xl border border-white/5">
              <p className="text-6xl mb-4">👻</p>
              <p className="text-dark-400">{t.noMembers}</p>
              <p className="text-dark-500 text-sm mt-2">
                <a href={locale === "ko" ? "/login" : `/${locale}/login`} className="text-accent-400 hover:underline">{t.joinButton}</a>
              </p>
            </div>
          ) : (
            displayRankings.map((user, index) => {
              const rank = index + 1;
              const icon = getRankIcon(rank);
              
              return (
                <div
                  key={user.id}
                  className={`
                    relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                    ${getRankStyle(rank)}
                    ${rank === 1 ? "scale-105 my-4" : "hover:scale-[1.02]"}
                  `}
                >
                  {/* 1등 특수 효과 */}
                  {rank === 1 && (
                    <>
                      {/* 빛나는 테두리 */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse" />
                      {/* 스파클 효과 */}
                      <div className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: "3s" }}>✨</div>
                      <div className="absolute -bottom-2 -left-2 text-xl animate-ping">⭐</div>
                    </>
                  )}

                  {/* 순위 */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
                    rank === 1 ? "bg-yellow-500/30" :
                    rank === 2 ? "bg-gray-400/20" :
                    rank === 3 ? "bg-orange-500/20" :
                    "bg-dark-700/50"
                  }`}>
                    {icon ? (
                      <span className="text-2xl">{icon}</span>
                    ) : (
                      <span className={getTextStyle(rank)}>{rank}</span>
                    )}
                  </div>

                  {/* 국기 */}
                  <span className="text-xl flex-shrink-0">
                    {COUNTRY_FLAGS[user.country || "KR"] || "🌍"}
                  </span>

                  {/* 아바타 */}
                  <div className={`
                    w-12 h-12 rounded-full overflow-hidden flex-shrink-0
                    ${rank === 1 ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-dark-900" :
                      rank === 2 ? "ring-2 ring-gray-400 ring-offset-1 ring-offset-dark-900" :
                      rank === 3 ? "ring-2 ring-orange-400 ring-offset-1 ring-offset-dark-900" :
                      "ring-1 ring-white/10"
                    }
                  `}>
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.nickname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-lg font-bold ${
                        rank === 1 ? "bg-yellow-500/30 text-yellow-400" :
                        rank === 2 ? "bg-gray-500/30 text-gray-300" :
                        rank === 3 ? "bg-orange-500/30 text-orange-400" :
                        "bg-dark-700 text-dark-400"
                      }`}>
                        {user.nickname.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* 닉네임 & 출석 */}
                  <div className="flex-1 min-w-0">
                    <p className={`truncate ${getNicknameStyle(rank)}`}>
                      {user.nickname}
                      {rank === 1 && <span className="ml-2 text-sm">👑 {t.champion}</span>}
                    </p>
                    {/* 1등 문화상품권 유력 배너 */}
                    {rank === 1 && (
                      <div className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg">
                        <span className="text-sm">🎁</span>
                        <span className="text-xs font-bold text-green-400">{t.prizeWinner}</span>
                        <span className="text-green-500 animate-pulse">✓</span>
                      </div>
                    )}
                    {/* 👤 게임 순위 배지들 */}
                    {user.game_scores && Object.keys(user.game_scores).length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        {Object.entries(user.game_scores)
                          .filter(([, gs]) => gs.rank <= 10)
                          .sort((a, b) => a[1].rank - b[1].rank)
                          .slice(0, 5) // 최대 5개만 표시
                          .map(([gameType, gs]) => (
                            <span
                              key={gameType}
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                gs.rank === 1
                                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                  : gs.rank <= 3
                                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                  : "bg-dark-700 text-dark-300 border border-dark-600"
                              }`}
                            >
                              {gameNames[gameType] || gameType} {gs.rank}{locale === "ko" ? "등" : locale === "ja" ? "位" : locale === "zh" ? "名" : ""}
                            </span>
                          ))}
                        {Object.entries(user.game_scores).filter(([, gs]) => gs.rank <= 10).length > 5 && (
                          <span className="text-[10px] text-dark-500">+{Object.entries(user.game_scores).filter(([, gs]) => gs.rank <= 10).length - 5}</span>
                        )}
                      </div>
                    )}
                    <p className="text-dark-500 text-xs flex items-center gap-2 mt-1">
                      <span>📅 {t.attendance} {user.attendance_count}{t.days}</span>
                      {rank <= 3 && <span className="text-yellow-500">• {t.top} {rank}!</span>}
                    </p>
                  </div>

                  {/* 점수 */}
                  <div className="text-right">
                    <p className={`font-mono font-bold ${
                      rank === 1 ? "text-2xl text-yellow-400" :
                      rank === 2 ? "text-xl text-gray-300" :
                      rank === 3 ? "text-xl text-orange-400" :
                      "text-lg text-white"
                    }`}>
                      {user.total_score.toLocaleString()}
                      <span className="text-dark-500 text-sm ml-1">{locale === "ko" ? "점" : locale === "ja" ? "点" : locale === "zh" ? "分" : "pts"}</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 더보기/접기 버튼 */}
        {rankings.length > 10 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-dark-800/80 hover:bg-dark-700 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
            >
              {showAll ? (
                <>
                  <span className="mr-2">👆</span>
                  {t.viewTop10}
                </>
              ) : (
                <>
                  <span className="mr-2">👇</span>
                  {t.viewAll} ({rankings.length}{t.members})
                </>
              )}
            </button>
          </div>
        )}

        {/* 참여 유도 */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-purple-500/10 via-accent-500/10 to-cyan-500/10 border border-white/10 rounded-2xl">
            <div className="text-4xl">🎯</div>
            <div className="text-left">
              <p className="text-white font-semibold">{t.joinCta}</p>
              <p className="text-dark-400 text-sm">{t.joinDesc}</p>
            </div>
            <a
              href={locale === "ko" ? "/login" : `/${locale}/login`}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-accent-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1"
            >
              🚀 {t.joinButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

