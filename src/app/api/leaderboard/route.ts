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

    // 회원 닉네임 + 프로필사진 + 종합순위 동기화
    if (data && data.length > 0) {
      const userIds = data.filter((d) => d.user_id).map((d) => d.user_id);
      if (userIds.length > 0) {
        // 프로필 정보 + total_score 가져오기
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, nickname, avatar_url, total_score")
          .in("id", userIds);

        if (profiles) {
          // 종합 순위 계산을 위해 각 회원의 total_score보다 높은 사람 수 계산
          const profileMap = new Map<string, { nickname: string; avatar_url: string; overall_rank: number }>();
          
          for (const profile of profiles) {
            // 해당 회원보다 높은 점수를 가진 사람 수 조회
            const { count } = await supabase
              .from("profiles")
              .select("*", { count: "exact", head: true })
              .gt("total_score", profile.total_score || 0);
            
            const overallRank = (count || 0) + 1;
            profileMap.set(profile.id, {
              nickname: profile.nickname,
              avatar_url: profile.avatar_url,
              overall_rank: overallRank,
            });
          }
          
          data.forEach((entry) => {
            if (entry.user_id && profileMap.has(entry.user_id)) {
              const profile = profileMap.get(entry.user_id);
              entry.nickname = profile?.nickname || entry.nickname;
              entry.avatar_url = profile?.avatar_url;
              entry.overall_rank = profile?.overall_rank; // 종합 순위 추가
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

// 순위에 따른 점수 계산
const getRankPoints = (rank: number): number => {
  if (rank === 1) return 200;
  if (rank <= 3) return 100;
  if (rank <= 10) return 50;
  return 0; // 10등 밖은 점수 없음
};

/**
 * 🏆 점수 제출 API (회원 점수 업데이트 포함)
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

    // 👤 회원이면 순위 계산 후 점수 업데이트
    let rank = null;
    let pointsEarned = 0;
    
    if (userId && data) {
      const scoreValue = data[config.scoreField];
      
      // 순위 계산: 나보다 좋은 점수를 가진 사람 수 + 1
      const compareOperator = config.orderAsc ? "lt" : "gt"; // 낮을수록 좋으면 lt, 높을수록 좋으면 gt
      const { count } = await supabase
        .from(config.table)
        .select("*", { count: "exact", head: true })
        [compareOperator](config.scoreField, scoreValue);
      
      rank = (count || 0) + 1;
      console.log(`📊 [API/leaderboard] ${game} 순위 계산: ${rank}등 (점수: ${scoreValue})`);
      
      // 10등 이내일 때만 회원 점수 업데이트
      if (rank <= 10) {
        const points = getRankPoints(rank);
        
        // 현재 프로필 가져오기
        const { data: profile } = await supabase
          .from("profiles")
          .select("total_score, game_scores")
          .eq("id", userId)
          .single();
        
        if (profile) {
          const gameScores = profile.game_scores || {};
          const prevRank = gameScores[game]?.rank || Infinity;
          
          // 더 좋은 순위일 때만 업데이트
          if (rank < prevRank) {
            const previousPoints = gameScores[game]?.points || 0;
            const pointsDiff = points - previousPoints;
            
            if (pointsDiff > 0) {
              await supabase
                .from("profiles")
                .update({
                  total_score: (profile.total_score || 0) + pointsDiff,
                  game_scores: { ...gameScores, [game]: { rank, points } },
                  updated_at: new Date().toISOString(),
                })
                .eq("id", userId);
              
              pointsEarned = pointsDiff;
              console.log(`✅ [API/leaderboard] ${game} 회원 점수 업데이트: ${rank}등, +${pointsDiff}점`);
            }
          } else {
            console.log(`ℹ️ [API/leaderboard] ${game} 이전 순위(${prevRank}등)보다 낮음, 업데이트 스킵`);
          }
        }
      } else {
        console.log(`ℹ️ [API/leaderboard] ${game} ${rank}등 - 10등 밖이므로 점수 없음`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data,
      rank, // 순위 반환
      pointsEarned, // 획득 점수 반환
    }, { status: 201 });
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

