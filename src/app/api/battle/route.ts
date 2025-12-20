import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 캐시 비활성화
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 서비스 롤 키로 Supabase 클라이언트 생성 (RLS 우회, 광고차단기 우회)
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};

// 점수 계산 함수: 패자 점수의 10% (최소 5, 최대 50)
const calculatePointsTransfer = (loserScore: number): number => {
  const stolen = Math.floor(Math.abs(loserScore) * 0.1);
  return Math.max(5, Math.min(50, stolen));
};

/**
 * GET: 도전장 정보 조회
 * ?id=abc123
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const challengeId = searchParams.get("id");

    if (!challengeId) {
      return NextResponse.json(
        { error: "도전장 ID가 필요합니다" },
        { status: 400 }
      );
    }

    // 도전장 조회
    const { data: challenge, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", challengeId)
      .maybeSingle();

    if (error) {
      console.error("❌ [API/battle] 조회 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!challenge) {
      return NextResponse.json(
        { error: "도전장을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    // 만료 체크
    if (challenge.status === "pending" && new Date(challenge.expires_at) < new Date()) {
      // 만료 상태로 업데이트
      await supabase
        .from("challenges")
        .update({ status: "expired" })
        .eq("id", challengeId);
      
      challenge.status = "expired";
    }

    // 🔄 최신 닉네임 동기화 (프로필에서 가져오기)
    const userIds = [challenge.challenger_id, challenge.opponent_id].filter(Boolean);
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, nickname")
        .in("id", userIds);
      
      if (profiles) {
        for (const profile of profiles) {
          if (profile.id === challenge.challenger_id) {
            challenge.challenger_nickname = profile.nickname;
          }
          if (profile.id === challenge.opponent_id) {
            challenge.opponent_nickname = profile.nickname;
          }
        }
      }
    }

    return NextResponse.json({ challenge }, {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
  } catch (err) {
    console.error("❌ [API/battle] GET 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * POST: 도전장 생성 / 수락 / 완료 / 기권
 * action: 'create' | 'accept' | 'complete' | 'forfeit'
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "create":
        return await handleCreate(supabase, body);
      case "accept":
        return await handleAccept(supabase, body);
      case "complete":
        return await handleComplete(supabase, body);
      case "forfeit":
        return await handleForfeit(supabase, body);
      default:
        return NextResponse.json(
          { error: "유효하지 않은 action입니다" },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error("❌ [API/battle] POST 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

/**
 * 도전장 생성
 */
async function handleCreate(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  body: {
    challengerId: string;
    challengerNickname: string;
    challengerScore: number;
    game: string;
  }
) {
  const { challengerId, challengerNickname, challengerScore, game } = body;

  if (!challengerId || !challengerNickname || challengerScore === undefined || !game) {
    return NextResponse.json(
      { error: "필수 파라미터가 누락되었습니다" },
      { status: 400 }
    );
  }

  // 도전장 생성
  const { data, error } = await supabase
    .from("challenges")
    .insert({
      challenger_id: challengerId,
      challenger_nickname: challengerNickname,
      challenger_score: challengerScore,
      game: game,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("❌ [API/battle] 도전장 생성 에러:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/battle] 도전장 생성 완료: ${data.id}`);
  return NextResponse.json({ challenge: data, battleUrl: `/battle/${data.id}` });
}

/**
 * 도전 수락
 */
async function handleAccept(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  body: {
    challengeId: string;
    opponentId: string;
    opponentNickname: string;
  }
) {
  const { challengeId, opponentId, opponentNickname } = body;

  if (!challengeId || !opponentId || !opponentNickname) {
    return NextResponse.json(
      { error: "필수 파라미터가 누락되었습니다" },
      { status: 400 }
    );
  }

  // 도전장 조회
  const { data: challenge, error: fetchError } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", challengeId)
    .maybeSingle();

  if (fetchError || !challenge) {
    return NextResponse.json(
      { error: "도전장을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  // 상태 체크
  if (challenge.status !== "pending") {
    return NextResponse.json(
      { error: `이미 ${challenge.status} 상태인 도전장입니다` },
      { status: 400 }
    );
  }

  // 만료 체크
  if (new Date(challenge.expires_at) < new Date()) {
    await supabase
      .from("challenges")
      .update({ status: "expired" })
      .eq("id", challengeId);
    return NextResponse.json(
      { error: "만료된 도전장입니다" },
      { status: 400 }
    );
  }

  // 자기 자신에게 도전 불가
  if (challenge.challenger_id === opponentId) {
    return NextResponse.json(
      { error: "자기 자신에게는 도전할 수 없습니다" },
      { status: 400 }
    );
  }

  // 수락 처리
  const { data, error } = await supabase
    .from("challenges")
    .update({
      opponent_id: opponentId,
      opponent_nickname: opponentNickname,
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", challengeId)
    .select()
    .single();

  if (error) {
    console.error("❌ [API/battle] 수락 에러:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/battle] 도전 수락: ${challengeId} by ${opponentNickname}`);
  return NextResponse.json({ challenge: data });
}

/**
 * 게임 완료 및 결과 처리
 */
async function handleComplete(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  body: {
    challengeId: string;
    opponentScore: number;
  }
) {
  const { challengeId, opponentScore } = body;

  if (!challengeId || opponentScore === undefined) {
    return NextResponse.json(
      { error: "필수 파라미터가 누락되었습니다" },
      { status: 400 }
    );
  }

  // 도전장 조회
  const { data: challenge, error: fetchError } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", challengeId)
    .maybeSingle();

  if (fetchError || !challenge) {
    return NextResponse.json(
      { error: "도전장을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  // 상태 체크
  if (challenge.status !== "accepted") {
    return NextResponse.json(
      { error: "수락된 상태의 도전장만 완료할 수 있습니다" },
      { status: 400 }
    );
  }

  // 게임 유형에 따라 승패 결정
  // 낮을수록 좋은 게임: reaction, sudoku
  // 높을수록 좋은 게임: iq, cps, memory, color, aim, cardmatch, quiz, typing
  const lowerIsBetter = ["reaction", "sudoku"].includes(challenge.game);
  
  let winnerId: string | null = null;
  let loserId: string | null = null;
  let isDraw = false;

  if (challenge.challenger_score === opponentScore) {
    // 무승부
    isDraw = true;
  } else if (lowerIsBetter) {
    // 낮을수록 좋은 게임
    if (opponentScore < challenge.challenger_score) {
      winnerId = challenge.opponent_id;
      loserId = challenge.challenger_id;
    } else {
      winnerId = challenge.challenger_id;
      loserId = challenge.opponent_id;
    }
  } else {
    // 높을수록 좋은 게임
    if (opponentScore > challenge.challenger_score) {
      winnerId = challenge.opponent_id;
      loserId = challenge.challenger_id;
    } else {
      winnerId = challenge.challenger_id;
      loserId = challenge.opponent_id;
    }
  }

  // 점수 이전 계산
  let pointsTransferred = 0;
  if (!isDraw && winnerId && loserId) {
    // 패자 프로필 조회
    const { data: loserProfile } = await supabase
      .from("profiles")
      .select("total_score")
      .eq("id", loserId)
      .maybeSingle();

    const loserScore = loserProfile?.total_score || 0;
    pointsTransferred = calculatePointsTransfer(loserScore);

    // 승자 점수 증가
    await supabase
      .from("profiles")
      .update({ 
        total_score: supabase.rpc ? undefined : 0, // RPC 사용 필요
      })
      .eq("id", winnerId);

    // SQL로 점수 업데이트 (atomic)
    await supabase.rpc("update_battle_scores", {
      winner_user_id: winnerId,
      loser_user_id: loserId,
      points: pointsTransferred,
    });
  }

  // 도전장 업데이트
  const { data, error } = await supabase
    .from("challenges")
    .update({
      opponent_score: opponentScore,
      status: "completed",
      winner_id: winnerId,
      is_draw: isDraw,
      points_transferred: pointsTransferred,
      completed_at: new Date().toISOString(),
    })
    .eq("id", challengeId)
    .select()
    .single();

  if (error) {
    console.error("❌ [API/battle] 완료 처리 에러:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/battle] 배틀 완료: ${challengeId}, 승자: ${winnerId || "무승부"}, 이전 포인트: ${pointsTransferred}`);
  
  return NextResponse.json({ 
    challenge: data,
    result: {
      isDraw,
      winnerId,
      loserId,
      pointsTransferred,
    }
  });
}

/**
 * 기권 처리 (게임 중 이탈)
 */
async function handleForfeit(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  body: {
    challengeId: string;
    forfeiterId: string; // 기권한 사람
  }
) {
  const { challengeId, forfeiterId } = body;

  if (!challengeId || !forfeiterId) {
    return NextResponse.json(
      { error: "필수 파라미터가 누락되었습니다" },
      { status: 400 }
    );
  }

  // 도전장 조회
  const { data: challenge, error: fetchError } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", challengeId)
    .maybeSingle();

  if (fetchError || !challenge) {
    return NextResponse.json(
      { error: "도전장을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  // 상태 체크
  if (challenge.status !== "accepted") {
    return NextResponse.json(
      { error: "수락된 상태의 도전장만 기권할 수 있습니다" },
      { status: 400 }
    );
  }

  // 기권자가 참가자인지 확인
  if (challenge.challenger_id !== forfeiterId && challenge.opponent_id !== forfeiterId) {
    return NextResponse.json(
      { error: "참가자만 기권할 수 있습니다" },
      { status: 400 }
    );
  }

  // 승자 결정 (기권하지 않은 사람)
  const winnerId = challenge.challenger_id === forfeiterId 
    ? challenge.opponent_id 
    : challenge.challenger_id;
  const loserId = forfeiterId;

  // 패자 프로필 조회
  const { data: loserProfile } = await supabase
    .from("profiles")
    .select("total_score")
    .eq("id", loserId)
    .maybeSingle();

  const loserScore = loserProfile?.total_score || 0;
  const pointsTransferred = calculatePointsTransfer(loserScore);

  // 점수 업데이트 (RPC 함수 호출)
  if (winnerId) {
    await supabase.rpc("update_battle_scores", {
      winner_user_id: winnerId,
      loser_user_id: loserId,
      points: pointsTransferred,
    });
  }

  // 도전장 업데이트
  const { data, error } = await supabase
    .from("challenges")
    .update({
      status: "forfeited",
      winner_id: winnerId,
      points_transferred: pointsTransferred,
      completed_at: new Date().toISOString(),
    })
    .eq("id", challengeId)
    .select()
    .single();

  if (error) {
    console.error("❌ [API/battle] 기권 처리 에러:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`✅ [API/battle] 기권 처리: ${challengeId}, 기권자: ${forfeiterId}, 이전 포인트: ${pointsTransferred}`);
  
  return NextResponse.json({ 
    challenge: data,
    result: {
      winnerId,
      loserId,
      pointsTransferred,
      forfeited: true,
    }
  });
}

