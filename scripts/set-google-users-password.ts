/**
 * 구글 계정 사용자들의 비밀번호를 일괄 설정하는 스크립트
 * 실행: npx ts-node scripts/set-google-users-password.ts
 */

import { createClient } from '@supabase/supabase-js';

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
  '422e3263-b8d0-4063-b109-fa4ec806db82', // greenyellow0301@gmail.com - 🦊
  'bc85a427-cb01-4ac9-8877-80e8421347f7', // gocppps@gmail.com - gsbob
  'b0dde2df-a543-4280-985e-7d3c8002a45b', // namugocps@gmail.com - 오동이
  '093d1f83-b0da-49dd-b59a-cc34ee5002df', // devmarsvax@gmail.com - mars
  'a0e3cbe5-e5b7-4790-9221-d8bd865dffd9', // namurobori@gmail.com - リンゴ
];

const NEW_PASSWORD = 'slox2025!';

async function setPasswordsForGoogleUsers() {
  console.log('🔐 구글 계정 사용자 비밀번호 설정 시작...\n');

  for (const userId of googleUserIds) {
    try {
      const { data, error } = await supabase.auth.admin.updateUserById(userId, {
        password: NEW_PASSWORD
      });

      if (error) {
        console.log(`❌ 실패 (${userId}): ${error.message}`);
      } else {
        console.log(`✅ 성공: ${data.user.email} - 비밀번호 설정 완료`);
      }
    } catch (err) {
      console.log(`❌ 에러 (${userId}):`, err);
    }
  }

  console.log('\n✨ 완료! 모든 구글 사용자가 이메일 + 비밀번호(slox2025!)로 로그인 가능합니다.');
}

setPasswordsForGoogleUsers();

