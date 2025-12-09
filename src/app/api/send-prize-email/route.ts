import { NextRequest, NextResponse } from "next/server";

// 이메일 발송 API 엔드포인트
// 실제 프로덕션에서는 Resend, SendGrid, Nodemailer 등을 사용
export async function POST(request: NextRequest) {
  try {
    const { email, nickname, score, prizeCode } = await request.json();

    // 유효성 검사
    if (!email || !nickname || !prizeCode) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다" },
        { status: 400 }
      );
    }

    // Resend API 키가 설정된 경우 실제 이메일 발송
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Resend를 사용한 실제 이메일 발송
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SLOX Event <onboarding@resend.dev>", // Resend 기본 도메인 (인증 불필요)
          to: email,
          subject: "🎉 [SLOX] 반응속도 테스트 1등 축하드립니다!",
          html: `
            <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #fbbf24; font-size: 28px; margin: 0;">🏆 축하합니다!</h1>
              </div>
              
              <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; margin-bottom: 20px;">
                <p style="color: #e5e7eb; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                  안녕하세요, <strong style="color: #fbbf24;">${nickname}</strong>님!
                </p>
                <p style="color: #e5e7eb; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                  SLOX 반응속도 테스트에서 <strong style="color: #22c55e;">${score}ms</strong>의 기록으로 
                  이번 달 <strong style="color: #fbbf24;">1등</strong>을 달성하셨습니다! 🎊
                </p>
                <p style="color: #e5e7eb; font-size: 16px; line-height: 1.8; margin: 0;">
                  약속드린 문화상품권 5,000원을 보내드립니다.
                </p>
              </div>
              
              <div style="background: linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(249,115,22,0.2) 100%); border: 2px solid rgba(251,191,36,0.3); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 20px;">
                <p style="color: #fbbf24; font-size: 14px; margin: 0 0 10px 0;">문화상품권 코드</p>
                <p style="color: white; font-size: 24px; font-weight: bold; font-family: monospace; letter-spacing: 2px; margin: 0;">
                  ${prizeCode}
                </p>
              </div>
              
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0;">
                  💡 <strong>사용 방법:</strong><br>
                  컬쳐랜드(cultureland.co.kr) 또는 카카오페이에서 사용하실 수 있습니다.
                </p>
              </div>
              
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  다음 달에도 1등에 도전해보세요! 💪<br>
                  <a href="https://www.slox.co.kr/reaction" style="color: #a78bfa;">slox.co.kr/reaction</a>
                </p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API 오류:", errorData);
        return NextResponse.json(
          { error: "이메일 발송에 실패했습니다" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "이메일이 발송되었습니다" });
    } else {
      // API 키가 없으면 로그만 출력 (개발/테스트용)
      console.log("========== 이메일 발송 (테스트 모드) ==========");
      console.log(`수신자: ${email}`);
      console.log(`닉네임: ${nickname}`);
      console.log(`기록: ${score}ms`);
      console.log(`상품권 코드: ${prizeCode}`);
      console.log("================================================");

      // 테스트 모드에서도 성공 응답 반환
      return NextResponse.json({ 
        success: true, 
        message: "이메일 발송 완료 (테스트 모드 - 실제 발송되지 않음)",
        testMode: true 
      });
    }

  } catch (error) {
    console.error("이메일 발송 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

