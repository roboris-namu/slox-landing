import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트 (RLS 우회를 위해 service_role key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// 게임별 설정
const gameConfigs = [
  { table: "reaction_leaderboard", game: "reaction", scoreField: "score", orderAsc: true },
  { table: "quiz_leaderboard", game: "quiz", scoreField: "score", orderAsc: false },
  { table: "iq_leaderboard", game: "iq", scoreField: "iq_score", orderAsc: false },
  { table: "sudoku_leaderboard", game: "sudoku", scoreField: "time_seconds", orderAsc: true },
  { table: "color_leaderboard", game: "color", scoreField: "score", orderAsc: false },
  { table: "cardmatch_leaderboard", game: "card", scoreField: "score", orderAsc: false },
  { table: "cps_leaderboard", game: "cps", scoreField: "score", orderAsc: false },
  { table: "typing_leaderboard", game: "typing", scoreField: "wpm", orderAsc: false },
  { table: "memory_leaderboard", game: "memory", scoreField: "score", orderAsc: false },
  { table: "aim_leaderboard", game: "aim", scoreField: "score", orderAsc: false },
];

/**
 * 🏆 명예의 전당 API
 * - 광고 차단기 우회를 위한 서버 사이드 프록시
 * - GET /api/hall-of-fame
 */
export async function GET() {
  try {
    // 모든 게임 리더보드를 병렬로 조회
    const results = await Promise.all(
      gameConfigs.map(async (config) => {
        const { data, error } = await supabase
          .from(config.table)
          .select("*")
          .order(config.scoreField, { ascending: config.orderAsc })
          .limit(3);

        if (error) {
          console.error(`❌ [API/hall-of-fame] ${config.game} 로드 실패:`, error);
          return { game: config.game, entries: [], error: error.message };
        }

        // 🔄 회원 닉네임 + 아바타 + 종합순위 동기화 (최신 프로필 정보 반영)
        if (data && data.length > 0) {
          const userIds = data.filter((d) => d.user_id).map((d) => d.user_id);
          if (userIds.length > 0) {
            // 종합순위 계산을 위해 전체 프로필 가져오기
            const { data: allProfiles } = await supabase
              .from("profiles")
              .select("id, nickname, avatar_url, total_score")
              .order("total_score", { ascending: false, nullsFirst: false });

            if (allProfiles) {
              // 종합순위 계산 (total_score 기준)
              const profileMap = new Map<string, { nickname: string; avatar_url: string | null; overall_rank: number }>();
              allProfiles.forEach((p, index) => {
                profileMap.set(p.id, {
                  nickname: p.nickname,
                  avatar_url: p.avatar_url,
                  overall_rank: index + 1, // 1등부터 시작
                });
              });

              data.forEach((entry) => {
                if (entry.user_id && profileMap.has(entry.user_id)) {
                  const profile = profileMap.get(entry.user_id);
                  entry.nickname = profile?.nickname || entry.nickname;
                  entry.avatar_url = profile?.avatar_url;
                  entry.overall_rank = profile?.overall_rank; // 종합순위 추가
                }
              });
            }
          }
        }

        return {
          game: config.game,
          scoreField: config.scoreField,
          entries: data || [],
        };
      })
    );

    // 캐시 비활성화 (실시간 데이터)
    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("❌ [API/hall-of-fame] 서버 에러:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다" },
      { status: 500 }
    );
  }
}

