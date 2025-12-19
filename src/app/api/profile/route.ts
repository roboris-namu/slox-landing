import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      .single();

    if (error && error.code === "PGRST116") {
      // 프로필 없음 (신규 가입자)
      return NextResponse.json({ profile: null, notFound: true }, { status: 200 });
    }

    if (error) {
      console.error("❌ [API/profile] 조회 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
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

    // 닉네임 중복 확인
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("nickname", nickname.trim())
      .single();

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
      .select()
      .single();

    if (error) {
      console.error("❌ [API/profile] 생성 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
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
    const { userId, nickname, country, avatar_url } = body;

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
        .single();

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

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("❌ [API/profile] 수정 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ [API/profile] PATCH 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

