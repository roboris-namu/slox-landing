"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  user_id?: string | null;
  avatar_url?: string | null;
  country?: string;
  overall_rank?: number;
  // typing
  wpm?: number;
  // iq
  iq_score?: number;
  // sudoku
  time_seconds?: number;
}

interface OverallEntry {
  id: string;
  nickname: string;
  total_score: number;
  avatar_url?: string | null;
  country?: string;
}

const FLAGS: Record<string, string> = {
  KR: "🇰🇷", US: "🇺🇸", JP: "🇯🇵", CN: "🇨🇳", DE: "🇩🇪", FR: "🇫🇷", ES: "🇪🇸", BR: "🇧🇷",
  GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", IN: "🇮🇳", RU: "🇷🇺", IT: "🇮🇹", MX: "🇲🇽", TH: "🇹🇭",
  VN: "🇻🇳", ID: "🇮🇩", PH: "🇵🇭", MY: "🇲🇾", SG: "🇸🇬", NZ: "🇳🇿",
};

type GameTab = "overall" | "reaction" | "cps" | "typing" | "memory" | "aim" | "color" | "quiz" | "iq" | "cardmatch" | "sudoku";

const GAME_TABS: { key: GameTab; scoreField: string; unit: string; }[] = [
  { key: "overall", scoreField: "total_score", unit: "pts" },
  { key: "reaction", scoreField: "score", unit: "ms" },
  { key: "cps", scoreField: "score", unit: "cps" },
  { key: "typing", scoreField: "wpm", unit: "WPM" },
  { key: "memory", scoreField: "score", unit: "" },
  { key: "aim", scoreField: "score", unit: "" },
  { key: "color", scoreField: "score", unit: "lv" },
  { key: "quiz", scoreField: "score", unit: "" },
  { key: "iq", scoreField: "iq_score", unit: "" },
  { key: "cardmatch", scoreField: "score", unit: "" },
  { key: "sudoku", scoreField: "time_seconds", unit: "s" },
];

const tabLabels: Record<string, Record<GameTab, string>> = {
  ko: { overall: "종합", reaction: "반응속도", cps: "CPS", typing: "타이핑", memory: "기억력", aim: "에임", color: "색깔찾기", quiz: "퀴즈", iq: "IQ", cardmatch: "카드", sudoku: "스도쿠" },
  en: { overall: "Overall", reaction: "Reaction", cps: "CPS", typing: "Typing", memory: "Memory", aim: "Aim", color: "Color", quiz: "Quiz", iq: "IQ", cardmatch: "Cards", sudoku: "Sudoku" },
  ja: { overall: "総合", reaction: "反応速度", cps: "CPS", typing: "タイピング", memory: "記憶力", aim: "エイム", color: "カラー", quiz: "クイズ", iq: "IQ", cardmatch: "カード", sudoku: "数独" },
  zh: { overall: "综合", reaction: "反应", cps: "CPS", typing: "打字", memory: "记忆", aim: "瞄准", color: "颜色", quiz: "问答", iq: "IQ", cardmatch: "卡牌", sudoku: "数独" },
};

const MAX_COUNT = 500;

const sectionT: Record<string, { title: string; desc: string; more: string; less: string; pts: string; noData: string }> = {
  ko: { title: "랭킹", desc: "전 세계 유저와 경쟁하세요", more: "더보기", less: "접기", pts: "점", noData: "아직 기록이 없습니다" },
  en: { title: "Ranking", desc: "Compete with players worldwide", more: "Show more", less: "Show less", pts: "pts", noData: "No records yet" },
  ja: { title: "ランキング", desc: "世界中のプレイヤーと競争しよう", more: "もっと見る", less: "閉じる", pts: "点", noData: "まだ記録がありません" },
  zh: { title: "排行榜", desc: "与全球玩家一决高下", more: "查看更多", less: "收起", pts: "分", noData: "暂无记录" },
  de: { title: "Rangliste", desc: "Tritt gegen Spieler weltweit an", more: "Mehr anzeigen", less: "Weniger", pts: "Pkt", noData: "Noch keine Daten" },
  fr: { title: "Classement", desc: "Affrontez des joueurs du monde entier", more: "Voir plus", less: "Réduire", pts: "pts", noData: "Pas encore de données" },
  es: { title: "Ranking", desc: "Compite con jugadores de todo el mundo", more: "Ver más", less: "Ver menos", pts: "pts", noData: "Sin datos aún" },
  pt: { title: "Ranking", desc: "Compita com jogadores do mundo todo", more: "Ver mais", less: "Ver menos", pts: "pts", noData: "Sem dados ainda" },
};

const PREVIEW_COUNT = 5;

const rankAccent = (rank: number) => {
  if (rank === 1) return "border-l-yellow-500/60";
  if (rank === 2) return "border-l-white/20";
  if (rank === 3) return "border-l-amber-700/40";
  return "border-l-transparent";
};

const rankColor = (rank: number) => {
  if (rank === 1) return "text-yellow-500";
  if (rank === 2) return "text-white/50";
  if (rank === 3) return "text-amber-600";
  return "text-white/20";
};

function getScoreDisplay(entry: LeaderboardEntry, tab: GameTab): string {
  if (tab === "typing") return String(entry.wpm ?? entry.score);
  if (tab === "iq") return String(entry.iq_score ?? entry.score);
  if (tab === "sudoku") return String(entry.time_seconds ?? entry.score);
  return String(entry.score);
}

export default function RankingPreview({ locale = "ko" }: { locale?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sec = sectionT[locale] || sectionT.en;
  const labels = tabLabels[locale] || tabLabels.en;

  const [activeTab, setActiveTab] = useState<GameTab>("overall");
  const [overallData, setOverallData] = useState<OverallEntry[]>([]);
  const [gameData, setGameData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const fetchOverall = useCallback(async () => {
    try {
      const res = await fetch("/api/rankings");
      const json = await res.json();
      if (Array.isArray(json.data)) setOverallData(json.data.slice(0, MAX_COUNT));
    } catch {}
  }, []);

  const fetchGame = useCallback(async (game: string) => {
    try {
      const res = await fetch(`/api/leaderboard?game=${game}&limit=${MAX_COUNT}`);
      const json = await res.json();
      if (Array.isArray(json.data)) setGameData(json.data);
    } catch {}
  }, []);

  useEffect(() => {
    setLoading(true);
    setExpanded(false);
    if (activeTab === "overall") {
      fetchOverall().finally(() => setLoading(false));
    } else {
      fetchGame(activeTab).finally(() => setLoading(false));
    }
  }, [activeTab, fetchOverall, fetchGame]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const els = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, overallData, gameData, expanded]);

  const tabConfig = GAME_TABS.find((t) => t.key === activeTab)!;

  const renderRow = (
    rank: number,
    nickname: string,
    score: string,
    unit: string,
    avatarUrl?: string | null,
    country?: string,
    isMember?: boolean,
    idx?: number
  ) => (
    <div
      key={`${activeTab}-${rank}-${nickname}`}
      className={`
        animate-on-scroll flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl
        border border-white/[0.06] bg-white/[0.02]
        border-l-2 ${rankAccent(rank)}
        transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]
      `}
      style={{ animationDelay: `${0.06 * (idx ?? rank - 1)}s` }}
    >
      <span className={`w-6 text-center font-bold text-sm tabular-nums ${rankColor(rank)}`}>
        {rank}
      </span>

      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/[0.08]">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.04] text-white/30 text-[10px] sm:text-xs font-semibold">
            {nickname.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2">
        <span className="text-xs sm:text-sm text-white/50 flex-shrink-0">
          {FLAGS[country || ""] || "🌍"}
        </span>
        <span className="text-xs sm:text-sm text-white truncate">{nickname}</span>
        {isMember && (
          <span className="flex-shrink-0 px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20 text-[9px] text-indigo-400/80 font-medium">
            ✓
          </span>
        )}
      </div>

      <span className="text-xs sm:text-sm font-mono text-white/40 tabular-nums flex-shrink-0">
        {Number(score).toLocaleString()}
        {unit && <span className="text-white/15 text-[10px] sm:text-xs ml-1">{unit}</span>}
      </span>
    </div>
  );

  return (
    <section ref={sectionRef} className="pb-16 md:pb-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="w-12 h-px bg-white/[0.08] mx-auto mb-10" />

        <div className="text-center mb-8">
          <h2 className="animate-on-scroll text-2xl md:text-3xl font-bold text-white mb-2">
            {sec.title}
          </h2>
          <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
            {sec.desc}
          </p>
        </div>

        {/* Game Tabs */}
        <div className="mb-8 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-center gap-1 min-w-max">
            {GAME_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.key
                    ? "bg-white/[0.12] text-white border border-white/[0.15]"
                    : "bg-transparent text-white/30 border border-transparent hover:text-white/50 hover:bg-white/[0.04]"
                  }
                `}
              >
                {labels[tab.key]}
              </button>
            ))}
          </div>
        </div>

        {/* Ranking List */}
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="space-y-2">
              {[...Array(PREVIEW_COUNT)].map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-pulse" />
              ))}
            </div>
          ) : activeTab === "overall" ? (
            overallData.length === 0 ? (
              <div className="animate-on-scroll text-center py-14 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-white/30 text-sm">{sec.noData}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(expanded ? overallData : overallData.slice(0, PREVIEW_COUNT)).map((user, i) =>
                  renderRow(i + 1, user.nickname, String(user.total_score), sec.pts, user.avatar_url, user.country, true, i)
                )}
              </div>
            )
          ) : (
            gameData.length === 0 ? (
              <div className="animate-on-scroll text-center py-14 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <p className="text-white/30 text-sm">{sec.noData}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(expanded ? gameData : gameData.slice(0, PREVIEW_COUNT)).map((entry, i) =>
                  renderRow(
                    i + 1,
                    entry.nickname,
                    getScoreDisplay(entry, activeTab),
                    tabConfig.unit,
                    entry.avatar_url,
                    entry.country,
                    !!entry.user_id,
                    i
                  )
                )}
              </div>
            )
          )}

          {(() => {
            const totalCount = activeTab === "overall" ? overallData.length : gameData.length;
            if (totalCount <= PREVIEW_COUNT) return null;
            const hiddenCount = totalCount - PREVIEW_COUNT;
            return (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 text-xs text-white/40 hover:text-white/70"
                >
                  {expanded ? sec.less : `${sec.more} (+${hiddenCount})`}
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
