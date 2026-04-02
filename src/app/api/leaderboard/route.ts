import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

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

// ─── 인메모리 캐시 (15초 TTL) ───
interface CacheEntry { data: unknown; ts: number }
const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 15_000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
  return null;
}
function setCache(key: string, data: unknown) {
  cache.set(key, { data, ts: Date.now() });
}

// 종합 순위 맵 (전체 프로필을 1번만 쿼리해서 위치 기반 순위 계산)
async function getOverallRankMap(): Promise<Map<string, number>> {
  const cached = getCached<Map<string, number>>("overallRankMap");
  if (cached) return cached;

  const { data: allProfiles } = await supabase
    .from("profiles")
    .select("id, total_score")
    .order("total_score", { ascending: false });

  const rankMap = new Map<string, number>();
  if (allProfiles) {
    let currentRank = 1;
    for (let i = 0; i < allProfiles.length; i++) {
      if (i > 0 && (allProfiles[i].total_score || 0) < (allProfiles[i - 1].total_score || 0)) {
        currentRank = i + 1;
      }
      rankMap.set(allProfiles[i].id, currentRank);
    }
  }

  setCache("overallRankMap", rankMap);
  return rankMap;
}

/**
 * 🏆 범용 리더보드 조회 API
 * GET /api/leaderboard?game=reaction&limit=10&myScore=957
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get("game");
    const limit = parseInt(searchParams.get("limit") || "10");
    const myScore = searchParams.get("myScore");

    if (!game || !GAME_CONFIG[game]) {
      return NextResponse.json(
        { error: "유효한 game 파라미터가 필요합니다", validGames: Object.keys(GAME_CONFIG) },
        { status: 400 }
      );
    }

    const config = GAME_CONFIG[game];
    const cacheKey = `lb:${game}:${limit}`;

    // 캐시 확인
    const cached = getCached<{ data: unknown[]; totalCount: number }>(cacheKey);
    if (cached && !myScore) {
      return NextResponse.json({ ...cached, myRank: null }, {
        headers: { "Cache-Control": "public, max-age=15, stale-while-revalidate=30" },
      });
    }

    // 리더보드 + 참가자 수를 병렬 조회
    const [leaderboardResult, countResult, myRankResult] = await Promise.all([
      supabase.from(config.table).select("*").order(config.scoreField, { ascending: config.orderAsc }).limit(limit),
      supabase.from(config.table).select("*", { count: "exact", head: true }),
      myScore && !isNaN(parseFloat(myScore))
        ? supabase.from(config.table).select("*", { count: "exact", head: true })[config.orderAsc ? "lt" : "gt"](config.scoreField, parseFloat(myScore))
        : Promise.resolve({ count: null }),
    ]);

    const { data, error } = leaderboardResult;
    const totalCount = countResult.count || 0;
    const myRank = myRankResult.count != null ? (myRankResult.count || 0) + 1 : null;

    if (error) {
      console.error(`❌ [API/leaderboard] ${game} 조회 에러:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 회원 프로필 + 종합 순위 동기화 (N+1 제거: 1번의 정렬 쿼리로 전체 순위 계산)
    if (data && data.length > 0) {
      const userIds = data.filter((d) => d.user_id).map((d) => d.user_id);
      if (userIds.length > 0) {
        const [profilesResult, rankMap] = await Promise.all([
          supabase.from("profiles").select("id, nickname, avatar_url").in("id", userIds),
          getOverallRankMap(),
        ]);

        if (profilesResult.data) {
          const profileMap = new Map(
            profilesResult.data.map((p) => [p.id, { nickname: p.nickname, avatar_url: p.avatar_url }])
          );

          data.forEach((entry) => {
            if (entry.user_id && profileMap.has(entry.user_id)) {
              const profile = profileMap.get(entry.user_id)!;
              entry.nickname = profile.nickname || entry.nickname;
              entry.avatar_url = profile.avatar_url;
              entry.overall_rank = rankMap.get(entry.user_id);
            }
          });
        }
      }
    }

    const responseData = { data: data || [], totalCount, myRank };
    setCache(cacheKey, { data: data || [], totalCount });

    return NextResponse.json(responseData, {
      headers: { "Cache-Control": "public, max-age=15, stale-while-revalidate=30" },
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
 * 🔄 해당 게임의 상위 회원들 순위를 전체 재계산
 * - 새 점수 등록 시 호출되어 모든 회원의 game_scores를 실시간 동기화
 */
async function recalculateAllRanks(game: string, config: { table: string; scoreField: string; orderAsc: boolean }) {
  try {
    // 1. 해당 게임 리더보드 상위 20명 가져오기 (10위 밖 회원도 업데이트 위해 여유있게)
    const { data: leaderboard } = await supabase
      .from(config.table)
      .select("*")
      .order(config.scoreField, { ascending: config.orderAsc })
      .limit(20);
    
    if (!leaderboard) return;
    
    // 2. 회원인 엔트리만 필터링하고 순위 매기기
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const memberEntries = (leaderboard as any[])
      .map((entry, index) => ({ userId: entry.user_id, rank: index + 1 }))
      .filter((entry) => entry.userId);
    
    if (memberEntries.length === 0) return;
    
    // 3. 각 회원의 프로필 가져오기
    const userIds = memberEntries.map((e) => e.userId);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, total_score, game_scores")
      .in("id", userIds);
    
    if (!profiles) return;
    
    // 4. 각 회원의 game_scores 업데이트
    for (const profile of profiles) {
      const memberEntry = memberEntries.find((e) => e.userId === profile.id);
      if (!memberEntry) continue;
      
      const newRank = memberEntry.rank;
      const gameScores = profile.game_scores || {};
      const oldRank = gameScores[game]?.rank;
      const oldPoints = gameScores[game]?.points || 0;
      const newPoints = getRankPoints(newRank);
      
      // 순위가 변경되었거나, 10위 밖으로 밀려났으면 업데이트
      if (oldRank !== newRank || (newRank > 10 && oldRank <= 10)) {
        const pointsDiff = newPoints - oldPoints;
        
        if (newRank <= 10) {
          // 10위 이내: 순위와 점수 업데이트
          await supabase
            .from("profiles")
            .update({
              total_score: Math.max(0, (profile.total_score || 0) + pointsDiff),
              game_scores: { ...gameScores, [game]: { rank: newRank, points: newPoints } },
              updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);
          
          console.log(`🔄 [recalculateAllRanks] ${game}: ${profile.id} 순위 ${oldRank || "없음"} → ${newRank} (${pointsDiff > 0 ? "+" : ""}${pointsDiff}점)`);
        } else if (oldRank && oldRank <= 10) {
          // 10위 밖으로 밀려남: 해당 게임 점수 제거
          const updatedGameScores = { ...gameScores };
          delete updatedGameScores[game];
          
          await supabase
            .from("profiles")
            .update({
              total_score: Math.max(0, (profile.total_score || 0) - oldPoints),
              game_scores: updatedGameScores,
              updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);
          
          console.log(`🔄 [recalculateAllRanks] ${game}: ${profile.id} 10위 밖으로 밀려남 (${oldRank} → ${newRank}, -${oldPoints}점)`);
        }
      }
    }
    
    console.log(`✅ [recalculateAllRanks] ${game} 순위 재계산 완료`);
  } catch (err) {
    console.error(`❌ [recalculateAllRanks] ${game} 에러:`, err);
  }
}

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
    const newScoreValue = scoreData[config.scoreField];

    // 점수 값 유효성 검사
    if (newScoreValue === undefined || newScoreValue === null || isNaN(Number(newScoreValue))) {
      return NextResponse.json({ error: "유효한 점수가 필요합니다" }, { status: 400 });
    }

    // userId가 있으면 추가
    if (userId) {
      scoreData.user_id = userId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;
    let isUpdate = false;

    // 👤 로그인 유저: 기존 점수가 있으면 더 좋은 점수일 때만 업데이트 (UPSERT)
    if (userId) {
      const { data: existing } = await supabase
        .from(config.table)
        .select("*")
        .eq("user_id", userId)
        .order(config.scoreField, { ascending: config.orderAsc })
        .limit(1)
        .maybeSingle();

      if (existing) {
        const existingScore = existing[config.scoreField];
        const isBetter = config.orderAsc 
          ? Number(newScoreValue) < Number(existingScore)  // 낮을수록 좋은 게임 (반응속도, 스도쿠)
          : Number(newScoreValue) > Number(existingScore); // 높을수록 좋은 게임

        if (isBetter) {
          // 기존 기록보다 좋으면 업데이트
          const { data: updated, error: updateError } = await supabase
            .from(config.table)
            .update(scoreData)
            .eq("id", existing.id)
            .select()
            .single();

          if (updateError) {
            console.error(`❌ [API/leaderboard] ${game} 업데이트 에러:`, updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
          }
          data = updated;
          isUpdate = true;
          console.log(`🔄 [API/leaderboard] ${game} 기존 기록 업데이트: ${existingScore} → ${newScoreValue}`);
        } else {
          // 기존 기록이 더 좋으면 새로 등록하지 않고 기존 데이터 반환
          console.log(`ℹ️ [API/leaderboard] ${game} 기존 기록(${existingScore})이 더 좋음. 새 점수(${newScoreValue}) 무시`);
          
          // 순위 계산만 해서 반환
          const compareOperator = config.orderAsc ? "lt" : "gt";
          const { count } = await supabase
            .from(config.table)
            .select("*", { count: "exact", head: true })
            [compareOperator](config.scoreField, existingScore);
          
          return NextResponse.json({ 
            success: true, 
            data: existing,
            rank: (count || 0) + 1,
            pointsEarned: 0,
            existingBetter: true,
          }, { status: 200 });
        }
      }
    }

    // 새 기록 삽입 (비로그인 유저 또는 첫 기록인 로그인 유저)
    if (!data) {
      const { data: inserted, error } = await supabase
        .from(config.table)
        .insert(scoreData)
        .select()
        .single();

      if (error) {
        console.error(`❌ [API/leaderboard] ${game} 제출 에러:`, error);
        // 중복 키 에러인 경우 더 친절한 메시지
        if (error.code === "23505") {
          return NextResponse.json({ error: "이미 등록된 점수가 있습니다. 더 높은 점수로 다시 도전해보세요!" }, { status: 409 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      data = inserted;
    }

    // 👤 회원이면 순위 계산 후 점수 업데이트
    let rank = null;
    let pointsEarned = 0;
    
    // 🔄 새 점수 등록 후, 상위 10명 전체의 순위 재계산 (실시간 순위 동기화)
    await recalculateAllRanks(game, config);
    
    if (data) {
      const scoreValue = data[config.scoreField];
      
      // 순위 계산: 나보다 좋은 점수를 가진 사람 수 + 1
      const compareOperator = config.orderAsc ? "lt" : "gt";
      const { count } = await supabase
        .from(config.table)
        .select("*", { count: "exact", head: true })
        [compareOperator](config.scoreField, scoreValue);
      
      rank = (count || 0) + 1;
      pointsEarned = userId && rank <= 10 ? getRankPoints(rank) : 0;
      console.log(`📊 [API/leaderboard] ${game} 순위 계산: ${rank}등, +${pointsEarned}점 (${isUpdate ? "업데이트" : "신규"})`);
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

