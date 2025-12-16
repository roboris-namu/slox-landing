"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// 게임 설정
const GAMES = [
  { table: "reaction_leaderboard", name: "반응속도", emoji: "⚡", color: "#f59e0b" },
  { table: "color_leaderboard", name: "색깔찾기", emoji: "🎨", color: "#ec4899" },
  { table: "cardmatch_leaderboard", name: "카드맞추기", emoji: "🃏", color: "#8b5cf6" },
  { table: "cps_leaderboard", name: "CPS", emoji: "👆", color: "#06b6d4" },
  { table: "memory_leaderboard", name: "기억력", emoji: "🧠", color: "#10b981" },
  { table: "aim_leaderboard", name: "에임", emoji: "🎯", color: "#ef4444" },
  { table: "quiz_leaderboard", name: "상식퀴즈", emoji: "📚", color: "#6366f1" },
  { table: "iq_leaderboard", name: "IQ테스트", emoji: "🧩", color: "#a855f7" },
  { table: "sudoku_leaderboard", name: "스도쿠", emoji: "🔢", color: "#14b8a6" },
  { table: "typing_leaderboard", name: "타이핑", emoji: "⌨️", color: "#3b82f6" },
];

interface DailyData {
  date: string;
  count: number;
  cumulative: number;
}

interface GameStat {
  name: string;
  emoji: string;
  count: number;
  color: string;
  todayCount: number;
}

interface RecentEntry {
  nickname: string;
  game: string;
  emoji: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 통계 데이터
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [todayNew, setTodayNew] = useState(0);
  const [weekNew, setWeekNew] = useState(0);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [gameStats, setGameStats] = useState<GameStat[]>([]);
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 비밀번호 확인 (간단하게 환경변수 또는 하드코딩)
  const ADMIN_PASSWORD = "slox2024!"; // 나중에 환경변수로 변경 권장

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("slox_admin_auth", "true");
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  // 데이터 로드
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();
      
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);
      const weekAgoISO = weekAgo.toISOString();

      let total = 0;
      let todayTotal = 0;
      let weekTotal = 0;
      const gameStatsTemp: GameStat[] = [];
      const allEntries: { date: string; game: string }[] = [];
      const recentTemp: RecentEntry[] = [];

      // 각 게임별 데이터 수집
      for (const game of GAMES) {
        // 총 참여자 수
        const { count } = await supabase
          .from(game.table)
          .select("*", { count: "exact", head: true });
        
        const gameCount = count || 0;
        total += gameCount;

        // 오늘 신규
        const { count: todayCount } = await supabase
          .from(game.table)
          .select("*", { count: "exact", head: true })
          .gte("created_at", todayISO);
        
        todayTotal += todayCount || 0;

        // 이번 주 신규
        const { count: weekCount } = await supabase
          .from(game.table)
          .select("*", { count: "exact", head: true })
          .gte("created_at", weekAgoISO);
        
        weekTotal += weekCount || 0;

        gameStatsTemp.push({
          name: game.name,
          emoji: game.emoji,
          count: gameCount,
          color: game.color,
          todayCount: todayCount || 0,
        });

        // 일별 데이터 (최근 30일)
        const { data: entries } = await supabase
          .from(game.table)
          .select("created_at")
          .order("created_at", { ascending: true });

        if (entries) {
          entries.forEach((e) => {
            const date = new Date(e.created_at).toISOString().split("T")[0];
            allEntries.push({ date, game: game.name });
          });
        }

        // 최근 등록 (각 게임에서 최근 2개씩)
        const { data: recent } = await supabase
          .from(game.table)
          .select("nickname, created_at")
          .order("created_at", { ascending: false })
          .limit(2);

        if (recent) {
          recent.forEach((r) => {
            recentTemp.push({
              nickname: r.nickname,
              game: game.name,
              emoji: game.emoji,
              created_at: r.created_at,
            });
          });
        }
      }

      setTotalParticipants(total);
      setTodayNew(todayTotal);
      setWeekNew(weekTotal);
      setGameStats(gameStatsTemp.sort((a, b) => b.count - a.count));

      // 일별 누적 데이터 계산
      const dateCountMap: Record<string, number> = {};
      allEntries.forEach((e) => {
        dateCountMap[e.date] = (dateCountMap[e.date] || 0) + 1;
      });

      const sortedDates = Object.keys(dateCountMap).sort();
      let cumulative = 0;
      const dailyDataTemp: DailyData[] = [];
      
      // 최근 30일만
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0];

      sortedDates.forEach((date) => {
        cumulative += dateCountMap[date];
        if (date >= thirtyDaysAgoStr) {
          dailyDataTemp.push({
            date: date.slice(5), // MM-DD 형식
            count: dateCountMap[date],
            cumulative,
          });
        }
      });

      setDailyData(dailyDataTemp);

      // 최근 등록 정렬
      recentTemp.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentEntries(recentTemp.slice(0, 10));

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 이전 인증 상태 확인
    const auth = localStorage.getItem("slox_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
      // 5분마다 자동 갱신
      const interval = setInterval(fetchAllData, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchAllData]);

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-white">SLOX 관리자</h1>
            <p className="text-dark-400 text-sm mt-2">대시보드 접근을 위해 비밀번호를 입력하세요</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="비밀번호..."
            className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-bold rounded-xl"
          >
            로그인
          </button>
          <Link href="/" className="block text-center text-dark-500 text-sm mt-4 hover:text-white">
            ← 홈으로
          </Link>
        </div>
      </div>
    );
  }

  // 대시보드
  return (
    <div className="min-h-screen bg-dark-950">
      {/* 헤더 */}
      <header className="bg-dark-900/80 backdrop-blur-xl border-b border-dark-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">SLOX 대시보드</h1>
              <p className="text-dark-400 text-xs">팀 성과 현황판</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-dark-500 text-xs">
                마지막 업데이트: {lastUpdated.toLocaleTimeString("ko-KR")}
              </span>
            )}
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {loading ? "⏳ 로딩..." : "🔄 새로고침"}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("slox_admin_auth");
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 bg-dark-800 hover:bg-red-500/20 text-dark-400 hover:text-red-400 rounded-lg text-sm transition-all"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 핵심 지표 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👥</span>
              <span className="text-dark-400 text-sm">총 참여자</span>
            </div>
            <div className="text-3xl font-black text-white">{totalParticipants.toLocaleString()}명</div>
            <div className="text-purple-400 text-sm mt-1">누적 전체</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🆕</span>
              <span className="text-dark-400 text-sm">오늘 신규</span>
            </div>
            <div className="text-3xl font-black text-white">{todayNew.toLocaleString()}명</div>
            <div className="text-green-400 text-sm mt-1">+{todayNew} today</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📅</span>
              <span className="text-dark-400 text-sm">이번 주</span>
            </div>
            <div className="text-3xl font-black text-white">{weekNew.toLocaleString()}명</div>
            <div className="text-cyan-400 text-sm mt-1">최근 7일</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎮</span>
              <span className="text-dark-400 text-sm">게임 수</span>
            </div>
            <div className="text-3xl font-black text-white">{GAMES.length}개</div>
            <div className="text-orange-400 text-sm mt-1">활성 게임</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 누적 성장 그래프 */}
          <div className="lg:col-span-2 bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📈</span> 누적 성장 그래프
              <span className="text-dark-500 text-sm font-normal">(최근 30일)</span>
            </h2>
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                    name="누적 참여자"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-dark-500">
                {loading ? "로딩 중..." : "데이터가 없습니다"}
              </div>
            )}
          </div>

          {/* 실시간 피드 */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏆</span> 최근 랭킹 등록
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </h2>
            <div className="space-y-3 max-h-[280px] overflow-y-auto">
              {recentEntries.length > 0 ? (
                recentEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-dark-800/50 rounded-lg">
                    <span className="text-xl">{entry.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{entry.nickname}</p>
                      <p className="text-dark-500 text-xs">{entry.game}</p>
                    </div>
                    <span className="text-dark-500 text-xs whitespace-nowrap">
                      {formatTimeAgo(entry.created_at)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-dark-500 py-8">
                  {loading ? "로딩 중..." : "최근 기록이 없습니다"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 게임별 통계 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 바 차트 */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🎮</span> 게임별 인기 순위
            </h2>
            {gameStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gameStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    width={80}
                    tickFormatter={(value) => {
                      const game = gameStats.find((g) => g.name === value);
                      return `${game?.emoji || ""} ${value}`;
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}명`, "참여자"]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {gameStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-dark-500">
                {loading ? "로딩 중..." : "데이터가 없습니다"}
              </div>
            )}
          </div>

          {/* 게임별 상세 */}
          <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>📊</span> 게임별 상세 통계
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {gameStats.map((game, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-xl"
                  style={{ borderLeft: `3px solid ${game.color}` }}
                >
                  <span className="text-2xl">{game.emoji}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{game.name}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-dark-400">총 {game.count}명</span>
                      {game.todayCount > 0 && (
                        <span className="text-green-400">+{game.todayCount} 오늘</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">{i + 1}</span>
                    <span className="text-dark-500 text-sm">위</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 일별 신규 등록 그래프 */}
        <div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span>📅</span> 일별 신규 등록 추이
            <span className="text-dark-500 text-sm font-normal">(최근 30일)</span>
          </h2>
          {dailyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}명`, "신규 등록"]}
                />
                <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-dark-500">
              {loading ? "로딩 중..." : "데이터가 없습니다"}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="text-center text-dark-500 text-sm">
          <p>🔥 화이팅! 계속 성장하고 있어요! 🚀</p>
          <p className="mt-2">
            <Link href="/" className="text-accent-purple hover:underline">
              SLOX 홈으로
            </Link>
            {" • "}
            <Link href="/admin/event" className="text-accent-purple hover:underline">
              이벤트 관리
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

