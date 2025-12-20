import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 캐시 비활성화
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 서비스 롤 키로 Supabase 클라이언트 생성
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};

// 게임 이모지 매핑
const GAME_EMOJI: Record<string, string> = {
  reaction: "⚡",
  cps: "👆",
  memory: "🧠",
  color: "🎨",
  aim: "🎯",
  cardmatch: "🃏",
  quiz: "❓",
  iq: "🧩",
  sudoku: "🔢",
  typing: "⌨️",
};

/**
 * GET: 최근 배틀 기록 조회 (티커용)
 */
export async function GET() {
  try {
    const supabase = getSupabase();

    // 완료된 배틀 최근 10개 조회
    const { data: battles, error } = await supabase
      .from("challenges")
      .select("*")
      .in("status", ["completed", "forfeited"])
      .order("completed_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("❌ [API/battle/recent] 조회 에러:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!battles || battles.length === 0) {
      return NextResponse.json({ battles: [] });
    }

    // 닉네임 최신화를 위해 유저 ID 수집
    const userIds = new Set<string>();
    battles.forEach((b) => {
      if (b.challenger_id) userIds.add(b.challenger_id);
      if (b.opponent_id) userIds.add(b.opponent_id);
    });

    // 프로필에서 최신 닉네임 가져오기
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, nickname")
      .in("id", Array.from(userIds));

    const nicknameMap = new Map<string, string>();
    profiles?.forEach((p) => nicknameMap.set(p.id, p.nickname));

    // 티커용 데이터 가공
    const tickerData = battles.map((battle) => {
      const challengerName = nicknameMap.get(battle.challenger_id) || battle.challenger_nickname;
      const opponentName = nicknameMap.get(battle.opponent_id) || battle.opponent_nickname;
      const gameEmoji = GAME_EMOJI[battle.game] || "🎮";
      
      let winnerName = "";
      let loserName = "";
      
      if (battle.is_draw) {
        winnerName = challengerName;
        loserName = opponentName;
      } else if (battle.winner_id === battle.challenger_id) {
        winnerName = challengerName;
        loserName = opponentName;
      } else {
        winnerName = opponentName;
        loserName = challengerName;
      }

      return {
        id: battle.id,
        game: battle.game,
        gameEmoji,
        winnerName,
        loserName,
        isDraw: battle.is_draw,
        pointsTransferred: battle.points_transferred,
        completedAt: battle.completed_at,
      };
    });

    return NextResponse.json({ battles: tickerData }, {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
  } catch (err) {
    console.error("❌ [API/battle/recent] 서버 에러:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

