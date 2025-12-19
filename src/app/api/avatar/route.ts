import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 서버 사이드 Supabase 클라이언트 (RLS 우회를 위해 service_role key 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xtqpbyfgptuxwrevxxtm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ";

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 📷 아바타 업로드 API
 * POST /api/avatar
 * Body: FormData with file, userId, oldAvatarUrl?
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const userId = formData.get("userId") as string | null;
    const oldAvatarUrl = formData.get("oldAvatarUrl") as string | null;

    if (!file || !userId) {
      return NextResponse.json({ error: "file과 userId가 필요합니다" }, { status: 400 });
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "파일 크기는 5MB 이하로 업로드해주세요" }, { status: 400 });
    }

    // 이미지 타입 검증
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "이미지 파일만 업로드 가능합니다" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // 이전 이미지 삭제 (있다면)
    if (oldAvatarUrl && oldAvatarUrl.includes("avatars")) {
      const oldPath = oldAvatarUrl.split("/avatars/")[1];
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    }

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // 새 이미지 업로드
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, buffer, { 
        contentType: file.type,
        upsert: true 
      });

    if (uploadError) {
      console.error("❌ [API/avatar] 업로드 에러:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Public URL 가져오기
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);

    // 프로필 업데이트
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ 
        avatar_url: urlData.publicUrl, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", userId);

    if (updateError) {
      console.error("❌ [API/avatar] 프로필 업데이트 에러:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      avatar_url: urlData.publicUrl 
    }, { status: 201 });
  } catch (err) {
    console.error("❌ [API/avatar] POST 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

