import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 캐시 비활성화
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 서비스 롤 키로 Supabase 클라이언트 생성 (RLS 우회)
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};

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

interface DailyData {
  date: string;
  count: number;
  cumulative: number;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    
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

    // 일별 누적 데이터 계산
    const dateCountMap: Record<string, number> = {};
    allEntries.forEach((e) => {
      dateCountMap[e.date] = (dateCountMap[e.date] || 0) + 1;
    });

    const sortedDates = Object.keys(dateCountMap).sort();
    let cumulative = 0;
    const dailyDataTemp: DailyData[] = [];

    // 최근 30일만
    const last30Days = sortedDates.slice(-30);
    // 30일 이전 누적 계산
    sortedDates.slice(0, -30).forEach((date) => {
      cumulative += dateCountMap[date];
    });

    last30Days.forEach((date) => {
      cumulative += dateCountMap[date];
      dailyDataTemp.push({
        date: date.slice(5), // MM-DD 형식
        count: dateCountMap[date],
        cumulative,
      });
    });

    // 최근 등록 정렬
    const sortedRecent = recentTemp
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10);

    return NextResponse.json({
      totalParticipants: total,
      todayNew: todayTotal,
      weekNew: weekTotal,
      gameStats: gameStatsTemp.sort((a, b) => b.count - a.count),
      dailyData: dailyDataTemp,
      recentEntries: sortedRecent,
    }, {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
  } catch (err) {
    console.error("❌ [API/admin/dashboard] 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

