import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 정적 캐시 완전 비활성화
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 서버 사이드 Supabase 클라이언트 (RLS 우회를 위해 service_role key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 🏆 실시간 랭킹 API
 * - 광고 차단기 우회를 위한 서버 사이드 프록시
 * - GET /api/rankings (전체 랭킹)
 * - GET /api/rankings?userId=xxx (내 순위 포함)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // 전체 랭킹 조회
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nickname, total_score, attendance_count, avatar_url, country, game_scores")
      .order("total_score", { ascending: false })
      .limit(100);

    if (error) {
      console.error("❌ [API/rankings] Supabase 에러:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // userId가 있으면 내 순위 계산
    let myRank = null;
    if (userId && data) {
      // 먼저 내 프로필 점수 가져오기
      const { data: myProfile } = await supabase
        .from("profiles")
        .select("total_score")
        .eq("id", userId)
        .single();

      if (myProfile) {
        // 나보다 점수 높은 사람 수 + 1 = 내 순위
        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .gt("total_score", myProfile.total_score);

        myRank = (count || 0) + 1;
      }
    }

    // 캐시 비활성화 (실시간 데이터)
    return NextResponse.json({ data: data || [], myRank }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("❌ [API/rankings] 서버 에러:", err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다" },
      { status: 500 }
    );
  }
}

