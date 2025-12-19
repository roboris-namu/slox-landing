import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트 (RLS 우회를 위해 service_role key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// 게임별 테이블 및 설정
const GAME_CONFIG: Record<string, { table: string; scoreField: string; orderAsc: boolean }> = {
  reaction: { table: "reaction_leaderboard", scoreField: "score", orderAsc: true },
  cps: { table: "cps_leaderboard", scoreField: "score", orderAsc: false },
  memory: { table: "memory_leaderboard", scoreField: "score", orderAsc: false },
  color: { table: "color_leaderboard", scoreField: "score", orderAsc: false },
  aim: { table: "aim_leaderboard", scoreField: "score", orderAsc: false },
  cardmatch: { table: "cardmatch_leaderboard", scoreField: "score", orderAsc: false },
  quiz: { table: "quiz_leaderboard", scoreField: "score", orderAsc: false },
  iq: { table: "iq_leaderboard", scoreField: "iq_score", orderAsc: false },
  sudoku: { table: "sudoku_leaderboard", scoreField: "time_seconds", orderAsc: true },
  typing: { table: "typing_leaderboard", scoreField: "wpm", orderAsc: false },
};

/**
 * 🏆 범용 리더보드 조회 API
 * GET /api/leaderboard?game=reaction&limit=10
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get("game");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!game || !GAME_CONFIG[game]) {
      return NextResponse.json(
        { error: "유효한 game 파라미터가 필요합니다", validGames: Object.keys(GAME_CONFIG) },
        { status: 400 }
      );
    }

    const config = GAME_CONFIG[game];

    // 리더보드 조회
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order(config.scoreField, { ascending: config.orderAsc })
      .limit(limit);

    // 전체 참가자 수
    const { count } = await supabase
      .from(config.table)
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(`❌ [API/leaderboard] ${game} 조회 에러:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 회원 닉네임 + 프로필사진 동기화
    if (data && data.length > 0) {
      const userIds = data.filter((d) => d.user_id).map((d) => d.user_id);
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nickname, avatar_url")
          .in("id", userIds);

        if (profiles) {
          const profileMap = new Map(
            profiles.map((p) => [p.id, { nickname: p.nickname, avatar_url: p.avatar_url }])
          );
          data.forEach((entry) => {
            if (entry.user_id && profileMap.has(entry.user_id)) {
              const profile = profileMap.get(entry.user_id);
              entry.nickname = profile?.nickname || entry.nickname;
              entry.avatar_url = profile?.avatar_url;
            }
          });
        }
      }
    }

    // 캐시 비활성화 (실시간 데이터)
    return NextResponse.json({
      data: data || [],
      totalCount: count || 0,
    }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("❌ [API/leaderboard] GET 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * 🏆 점수 제출 API
 * POST /api/leaderboard
 * Body: { game, data: { nickname, score, ... }, userId? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { game, data: scoreData, userId } = body;

    if (!game || !GAME_CONFIG[game]) {
      return NextResponse.json(
        { error: "유효한 game이 필요합니다" },
        { status: 400 }
      );
    }

    if (!scoreData) {
      return NextResponse.json({ error: "data가 필요합니다" }, { status: 400 });
    }

    const config = GAME_CONFIG[game];

    // userId가 있으면 추가
    if (userId) {
      scoreData.user_id = userId;
    }

    // 점수 제출
    const { data, error } = await supabase
      .from(config.table)
      .insert(scoreData)
      .select()
      .single();

    if (error) {
      console.error(`❌ [API/leaderboard] ${game} 제출 에러:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("❌ [API/leaderboard] POST 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * 🏆 점수 업데이트 API (이메일 등록 등)
 * PATCH /api/leaderboard
 * Body: { game, id, updates }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { game, id, updates } = body;

    if (!game || !GAME_CONFIG[game] || !id || !updates) {
      return NextResponse.json({ error: "game, id, updates가 필요합니다" }, { status: 400 });
    }

    const config = GAME_CONFIG[game];

    const { data, error } = await supabase
      .from(config.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`❌ [API/leaderboard] ${game} 업데이트 에러:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("❌ [API/leaderboard] PATCH 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

