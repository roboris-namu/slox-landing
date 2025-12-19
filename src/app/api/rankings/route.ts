import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트 (광고 차단기 우회)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 🏆 실시간 랭킹 API
 * - 광고 차단기 우회를 위한 서버 사이드 프록시
 * - GET /api/rankings
 */
export async function GET() {
  try {
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

    // 캐시 헤더 설정 (60초 캐시)
    return NextResponse.json(data || [], {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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

