"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const getSupabase = () => {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

// 관리자 비밀번호 (실제로는 환경변수로 관리하는 것이 좋음)
const ADMIN_PASSWORD = "slox2024!";

interface Winner {
  nickname: string;
  score: number;
  email: string | null;
  created_at: string;
  grade?: string;
}

interface PrizeHistory {
  id: string;
  nickname: string;
  email: string;
  score: number;
  prize_code: string;
  month_year: string;
  sent_at: string;
}

export default function AdminEventPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [prizeCode, setPrizeCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [prizeHistory, setPrizeHistory] = useState<PrizeHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 비밀번호 확인
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
      // 세션 저장 (브라우저 닫으면 만료)
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setPasswordError("비밀번호가 틀렸습니다");
    }
  };

  // 세션 확인
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // 데이터 로드
  const loadData = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    setIsLoading(true);

    // 현재 1등 가져오기
    const { data: winnerData } = await supabase
      .from("reaction_leaderboard")
      .select("nickname, score, email, created_at, grade")
      .order("score", { ascending: true })
      .limit(1)
      .single();

    if (winnerData) {
      setCurrentWinner(winnerData);
    }

    // 발송 이력 가져오기
    const { data: historyData } = await supabase
      .from("winners")
      .select("*")
      .eq("game_type", "reaction")
      .order("created_at", { ascending: false });

    if (historyData) {
      setPrizeHistory(historyData.map((h: Record<string, unknown>) => ({
        id: h.id as string,
        nickname: h.nickname as string,
        email: h.email as string,
        score: h.score as number,
        prize_code: h.prize_code as string,
        month_year: h.month_year as string,
        sent_at: h.prize_sent_at as string,
      })));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // 상품권 발송
  const handleSendPrize = async () => {
    if (!currentWinner?.email) {
      setSendResult({ success: false, message: "당첨자 이메일이 등록되지 않았습니다" });
      return;
    }
    if (!prizeCode.trim()) {
      setSendResult({ success: false, message: "상품권 코드를 입력해주세요" });
      return;
    }

    setIsSending(true);
    setSendResult(null);

    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase 연결 실패");

      // 현재 월 계산
      const now = new Date();
      const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

      // 이미 이번 달에 발송했는지 확인
      const { data: existing } = await supabase
        .from("winners")
        .select("id")
        .eq("game_type", "reaction")
        .eq("month_year", monthYear)
        .single();

      if (existing) {
        setSendResult({ success: false, message: "이번 달에 이미 상품권을 발송했습니다" });
        setIsSending(false);
        return;
      }

      // Edge Function 호출하여 이메일 발송
      const response = await fetch("/api/send-prize-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentWinner.email,
          nickname: currentWinner.nickname,
          score: currentWinner.score,
          prizeCode: prizeCode.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("이메일 발송 실패");
      }

      // DB에 발송 이력 저장
      await supabase.from("winners").insert({
        game_type: "reaction",
        nickname: currentWinner.nickname,
        email: currentWinner.email,
        score: currentWinner.score,
        prize_code: prizeCode.trim(),
        month_year: monthYear,
        prize_sent_at: new Date().toISOString(),
      });

      setSendResult({ success: true, message: `${currentWinner.email}로 상품권이 발송되었습니다!` });
      setPrizeCode("");
      loadData(); // 이력 새로고침

    } catch (error) {
      console.error("발송 오류:", error);
      setSendResult({ success: false, message: "발송 중 오류가 발생했습니다" });
    }

    setIsSending(false);
  };

  // 이메일 마스킹
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 3) + "***";
    return `${maskedLocal}@${domain}`;
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <div className="bg-dark-900 border border-dark-700 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔐</div>
            <h1 className="text-white text-2xl font-bold">관리자 인증</h1>
            <p className="text-dark-400 text-sm mt-2">이벤트 관리 페이지입니다</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-accent-purple"
            />
            {passwordError && (
              <p className="text-red-400 text-sm">{passwordError}</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 메인 대시보드
  return (
    <div className="min-h-screen bg-dark-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl md:text-3xl font-bold flex items-center gap-3">
              🎁 이벤트 관리
            </h1>
            <p className="text-dark-400 mt-1">반응속도 테스트 월간 이벤트</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_auth");
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 rounded-xl transition-colors"
          >
            로그아웃
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="text-4xl animate-spin mb-4">⚡</div>
            <p className="text-dark-400">로딩 중...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 현재 1등 카드 */}
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6">
              <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                👑 현재 1등
              </h2>
              
              {currentWinner ? (
                <div className="bg-dark-800 rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider">닉네임</p>
                      <p className="text-white font-bold text-lg">{currentWinner.nickname}</p>
                    </div>
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider">기록</p>
                      <p className="text-yellow-400 font-bold text-lg">{currentWinner.score}ms</p>
                    </div>
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider">이메일</p>
                      {currentWinner.email ? (
                        <p className="text-green-400 font-medium">{currentWinner.email}</p>
                      ) : (
                        <p className="text-red-400">❌ 미등록</p>
                      )}
                    </div>
                    <div>
                      <p className="text-dark-500 text-xs uppercase tracking-wider">등록일</p>
                      <p className="text-dark-300">
                        {new Date(currentWinner.created_at).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  </div>

                  {/* 이메일 복사 버튼 */}
                  {currentWinner.email && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentWinner.email!);
                        alert("이메일이 복사되었습니다!");
                      }}
                      className="mt-4 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-sm transition-colors"
                    >
                      📋 이메일 복사
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-dark-400">아직 참가자가 없습니다</p>
              )}
            </div>

            {/* 상품권 발송 카드 */}
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6">
              <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                🎫 상품권 발송
              </h2>

              {!currentWinner?.email ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400">
                    ⚠️ 현재 1등이 이메일을 등록하지 않았습니다. 발송할 수 없습니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      문화상품권 코드 입력
                    </label>
                    <input
                      type="text"
                      value={prizeCode}
                      onChange={(e) => setPrizeCode(e.target.value)}
                      placeholder="예: 1234-5678-9012-3456"
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-accent-purple font-mono"
                    />
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                    <p className="text-yellow-400 text-sm">
                      📧 발송 대상: <strong>{currentWinner.email}</strong>
                    </p>
                  </div>

                  {sendResult && (
                    <div className={`rounded-xl p-3 ${
                      sendResult.success 
                        ? "bg-green-500/10 border border-green-500/30" 
                        : "bg-red-500/10 border border-red-500/30"
                    }`}>
                      <p className={sendResult.success ? "text-green-400" : "text-red-400"}>
                        {sendResult.success ? "✅" : "❌"} {sendResult.message}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleSendPrize}
                    disabled={isSending || !prizeCode.trim()}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? "발송 중..." : "📧 당첨자에게 발송하기"}
                  </button>
                </div>
              )}
            </div>

            {/* 발송 이력 */}
            <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6">
              <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                📜 발송 이력
              </h2>

              {prizeHistory.length > 0 ? (
                <div className="space-y-3">
                  {prizeHistory.map((history) => (
                    <div
                      key={history.id}
                      className="bg-dark-800 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">🎁</div>
                        <div>
                          <p className="text-white font-bold">{history.nickname}</p>
                          <p className="text-dark-400 text-sm">
                            {history.month_year} | {maskEmail(history.email)} | {history.score}ms
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          ✅ 발송완료
                        </span>
                        <p className="text-dark-500 text-xs mt-1">
                          {new Date(history.sent_at).toLocaleDateString("ko-KR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-dark-400 text-center py-8">아직 발송 이력이 없습니다</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

