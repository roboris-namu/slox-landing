import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 구글로 가입한 사용자 ID 목록
const googleUserIds = [
  { id: '422e3263-b8d0-4063-b109-fa4ec806db82', email: 'greenyellow0301@gmail.com', nickname: '🦊' },
  { id: 'bc85a427-cb01-4ac9-8877-80e8421347f7', email: 'gocppps@gmail.com', nickname: 'gsbob' },
  { id: 'b0dde2df-a543-4280-985e-7d3c8002a45b', email: 'namugocps@gmail.com', nickname: '오동이' },
  { id: '093d1f83-b0da-49dd-b59a-cc34ee5002df', email: 'devmarsvax@gmail.com', nickname: 'mars' },
  { id: 'a0e3cbe5-e5b7-4790-9221-d8bd865dffd9', email: 'namurobori@gmail.com', nickname: 'リンゴ' },
];

const NEW_PASSWORD = 'slox2025!';

export async function POST(request: Request) {
  // 보안: 간단한 시크릿 키 확인
  const { secret } = await request.json();
  if (secret !== 'slox-admin-2025') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: { email: string; nickname: string; success: boolean; error?: string }[] = [];

  for (const user of googleUserIds) {
    try {
      const { error } = await supabase.auth.admin.updateUserById(user.id, {
        password: NEW_PASSWORD
      });

      if (error) {
        results.push({ email: user.email, nickname: user.nickname, success: false, error: error.message });
      } else {
        results.push({ email: user.email, nickname: user.nickname, success: true });
      }
    } catch (err) {
      results.push({ 
        email: user.email, 
        nickname: user.nickname, 
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error' 
      });
    }
  }

  return NextResponse.json({ 
    message: '구글 계정 사용자 비밀번호 설정 완료',
    newPassword: NEW_PASSWORD,
    results 
  });
}

