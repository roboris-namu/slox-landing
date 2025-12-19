import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 동적 라우트로 설정 (정적 생성 방지)
export const dynamic = "force-dynamic";

// 런타임에 동적으로 클라이언트 생성
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase 환경 변수가 설정되지 않았습니다");
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  const supabase = getSupabaseClient();
  try {
    // 1. 이벤트 설정 가져오기
    const { data: configData, error: configError } = await supabase
      .from("event_config")
      .select("*")
      .eq("is_active", true)
      .maybeSingle();

    if (configError) {
      console.error("❌ [API/event] event_config 조회 에러:", configError);
    }

    // 2. 반응 테스트 현재 1등 가져오기
    const { data: leaderData, error: leaderError } = await supabase
      .from("reaction_leaderboard")
      .select("nickname, score, email")
      .order("score", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (leaderError) {
      console.error("❌ [API/event] reaction_leaderboard 조회 에러:", leaderError);
    }

    // 3. 역대 당첨자 가져오기
    const { data: winnersData, error: winnersError } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(12);

    if (winnersError) {
      console.error("❌ [API/event] winners 조회 에러:", winnersError);
    }

    return NextResponse.json({
      config: configData || null,
      currentLeader: leaderData ? {
        nickname: leaderData.nickname,
        score: leaderData.score,
        email: leaderData.email || null,
      } : null,
      winners: winnersData || [],
    }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("❌ [API/event] GET 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

