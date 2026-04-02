import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// ─── 인메모리 캐시 (15초 TTL) ───
let rankingsCache: { data: unknown[]; ts: number } | null = null;
const CACHE_TTL = 15_000;

/**
 * 🏆 실시간 랭킹 API
 * GET /api/rankings (전체 랭킹)
 * GET /api/rankings?userId=xxx (내 순위 포함)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // 캐시된 데이터 확인
    let data;
    if (rankingsCache && Date.now() - rankingsCache.ts < CACHE_TTL) {
      data = rankingsCache.data;
    } else {
      const { data: fresh, error } = await supabase
        .from("profiles")
        .select("id, nickname, total_score, attendance_count, avatar_url, country, game_scores")
        .order("total_score", { ascending: false })
        .limit(500);

      if (error) {
        console.error("❌ [API/rankings] Supabase 에러:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      data = fresh || [];
      rankingsCache = { data, ts: Date.now() };
    }

    // userId → 이미 정렬된 data에서 순위 계산 (추가 쿼리 불필요)
    let myRank = null;
    if (userId && data) {
      const idx = (data as { id: string }[]).findIndex((u) => u.id === userId);
      if (idx >= 0) {
        myRank = idx + 1;
      } else {
        // top 100 밖의 유저: 단일 count 쿼리
        const { data: myProfile } = await supabase
          .from("profiles")
          .select("total_score")
          .eq("id", userId)
          .single();
        if (myProfile) {
          const { count } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .gt("total_score", myProfile.total_score);
          myRank = (count || 0) + 1;
        }
      }
    }

    return NextResponse.json({ data, myRank }, {
      headers: { "Cache-Control": "public, max-age=15, stale-while-revalidate=30" },
    });
  } catch (err) {
    console.error("❌ [API/rankings] 서버 에러:", err);
    return NextResponse.json({ error: "서버 에러가 발생했습니다" }, { status: 500 });
  }
}

