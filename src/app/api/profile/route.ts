import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트 (RLS 우회를 위해 service_role key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
// service_role key가 있으면 사용 (RLS 우회), 없으면 anon key 사용
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// 디버그: 어떤 키를 사용하는지 로그
console.log("🔑 [API/profile] Using key type:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "anon");

/**
 * 👤 프로필 조회 API
 * GET /api/profile?userId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId가 필요합니다" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();  // single() 대신 maybeSingle() 사용

    if (error) {
      console.error("❌ [API/profile] 조회 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      // 프로필 없음 (신규 가입자)
      return NextResponse.json({ profile: null, notFound: true }, { status: 200 });
    }

    // 캐시 비활성화 (실시간 데이터)
    return NextResponse.json({ profile: data }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("❌ [API/profile] GET 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * 👤 프로필 생성 API
 * POST /api/profile
 * Body: { id, nickname, email, avatar_url? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nickname, email, avatar_url } = body;

    if (!id || !nickname) {
      return NextResponse.json({ error: "id와 nickname이 필요합니다" }, { status: 400 });
    }

    // 닉네임 중복 확인 (maybeSingle 사용 - 결과 없어도 에러 안남)
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("nickname", nickname.trim())
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "이미 사용 중인 닉네임입니다" }, { status: 409 });
    }

    // 프로필 생성
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id,
        nickname: nickname.trim(),
        email,
        avatar_url: avatar_url || null,
      })
      .select();

    if (error) {
      console.error("❌ [API/profile] 생성 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0] || data, { status: 201 });
  } catch (err) {
    console.error("❌ [API/profile] POST 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * 👤 프로필 수정 API
 * PATCH /api/profile
 * Body: { userId, nickname?, country?, avatar_url? }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, nickname, country, avatar_url, total_score, game_scores } = body;

    console.log("🔄 [API/profile] PATCH 요청:", { userId, nickname, country, total_score, game_scores });

    if (!userId) {
      return NextResponse.json({ error: "userId가 필요합니다" }, { status: 400 });
    }

    // 닉네임 변경 시 중복 확인
    if (nickname) {
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("nickname", nickname.trim())
        .neq("id", userId)
        .maybeSingle();  // single() 대신 maybeSingle() 사용 (결과 없어도 에러 안남)

      if (existing) {
        return NextResponse.json({ error: "이미 사용 중인 닉네임입니다" }, { status: 409 });
      }
    }

    // 업데이트할 필드 구성
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (nickname) updates.nickname = nickname.trim();
    if (country) updates.country = country;
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (total_score !== undefined) updates.total_score = total_score;
    if (game_scores !== undefined) updates.game_scores = game_scores;

    console.log("🔄 [API/profile] 업데이트 시도:", { userId, updates });

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select();

    console.log("📊 [API/profile] 업데이트 결과:", { data, error });

    if (error) {
      console.error("❌ [API/profile] 수정 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      // 프로필이 없으면 먼저 조회해보기
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();
      
      console.log("📊 [API/profile] 기존 프로필 확인:", existingProfile);
      
      if (!existingProfile) {
        return NextResponse.json({ error: "프로필을 찾을 수 없습니다. userId: " + userId }, { status: 404 });
      }
      
      // 프로필은 있는데 업데이트가 안됐으면 다시 시도
      return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
    }

    console.log("✅ [API/profile] 수정 성공:", data[0].nickname);
    return NextResponse.json({ success: true, profile: data[0] });
  } catch (err) {
    console.error("❌ [API/profile] PATCH 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

