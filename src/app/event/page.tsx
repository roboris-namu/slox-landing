"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase 클라이언트
const getSupabase = (): SupabaseClient | null => {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
};

interface Winner {
  id: string;
  game_type: string;
  nickname: string;
  email: string;
  score: number;
  grade: string;
  month_year: string;
  created_at: string;
}

interface EventConfig {
  game_type: string;
  is_active: boolean;
  prize_name: string;
  prize_amount: number;
}

export default function EventPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [, setEventConfig] = useState<EventConfig | null>(null); // 나중에 사용 예정
  const [isLoading, setIsLoading] = useState(true);
  const [daysUntilNextDraw, setDaysUntilNextDraw] = useState(0);

  const supabase = useMemo(() => getSupabase(), []);

  // 다음 추첨일까지 남은 일수 계산
  useEffect(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
    const diffTime = nextMonth.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilNextDraw(diffDays);
  }, []);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // 이벤트 설정 로드
        const { data: configData } = await supabase
          .from("event_config")
          .select("*")
          .eq("is_active", true)
          .single();

        if (configData) {
          setEventConfig(configData);
        }

        // 당첨자 로드
        const { data: winnersData } = await supabase
          .from("winners")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(12);

        if (winnersData) {
          setWinners(winnersData);
        }
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  // 이메일 마스킹 함수
  const maskEmail = (email: string) => {
    if (!email || !email.includes("@")) return "***@***.***";
    const [local, domain] = email.split("@");
    const maskedLocal = local.slice(0, 3) + "***";
    return `${maskedLocal}@${domain}`;
  };

  // 게임 타입 한글 변환
  const getGameName = (gameType: string) => {
    const names: Record<string, string> = {
      reaction: "반응속도 테스트",
      cps: "CPS 테스트",
      typing: "타자 테스트",
      memory: "숫자 기억 게임",
      color: "색상 찾기 게임",
      aim: "에임 트레이너",
      card: "카드 짝 맞추기",
    };
    return names[gameType] || gameType;
  };

  // 월 표시 변환
  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split("-");
    return `${year}년 ${parseInt(month)}월`;
  };

  return (
    <main className="min-h-screen bg-dark-950 pt-28 pb-20">
      {/* 배경 효과 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-yellow-500/20 to-red-500/20 border-2 border-yellow-500/30">
            <span className="text-6xl animate-bounce">🎁</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              SLOX EVENT
            </span>
          </h1>
          <p className="text-lg text-dark-300">
            매달 1등에게 <span className="text-yellow-400 font-bold">문화상품권</span>을 드립니다!
          </p>
        </div>

        {/* 이벤트 안내 카드 */}
        <div className="bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                🎉 반응속도 테스트 이벤트 진행 중!
              </h2>
              <p className="text-dark-300">
                매달 1일 오전 10시 기준 <span className="text-yellow-400 font-bold">반응속도 테스트 1등</span>에게
                <span className="text-yellow-400 font-bold"> 문화상품권 5,000원</span>을 드립니다!
              </p>
            </div>
          </div>

          {/* 참여 방법 */}
          <div className="bg-black/20 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📋 참여 방법
            </h3>
            <ol className="space-y-4 text-dark-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span>반응속도 테스트에서 <strong className="text-white">최고 기록</strong>을 달성하세요!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <span><strong className="text-white">1등 달성 시</strong> 축하 팝업이 뜨며 이메일을 등록할 수 있어요!</span>
                  <p className="text-xs text-dark-500 mt-1">💡 이메일 미등록 시 상품 수령이 불가합니다.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span>매달 1일 오전 10시 기준 <strong className="text-white">최종 1등</strong>에게 오후 2시 상품 발송!</span>
              </li>
            </ol>
            
          </div>

          {/* 🎆 1등 달성 시 미리보기 */}
          <div className="bg-black/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              ✨ 1등 달성 시 이런 화면이!
            </h3>
            
            {/* 축하 팝업 미리보기 */}
            <div className="relative bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border-2 border-yellow-500/50 rounded-2xl p-6 text-center">
              {/* 폭죽 이모지들 - 애니메이션 */}
              <div className="absolute -top-2 left-4 text-3xl animate-bounce" style={{ animationDelay: "0s" }}>🎉</div>
              <div className="absolute -top-2 right-4 text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>🎊</div>
              <div className="absolute top-1/2 -left-2 text-2xl animate-bounce" style={{ animationDelay: "0.4s" }}>✨</div>
              <div className="absolute top-1/2 -right-2 text-2xl animate-bounce" style={{ animationDelay: "0.6s" }}>🌟</div>
              <div className="absolute -bottom-2 left-1/4 text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>🎆</div>
              <div className="absolute -bottom-2 right-1/4 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎇</div>
              
              {/* 메인 컨텐츠 */}
              <div className="relative z-10">
                <div className="text-6xl mb-4 animate-pulse">👑</div>
                <h4 className="text-2xl font-black text-yellow-400 mb-2">
                  🎉 축하합니다! 1등입니다!
                </h4>
                <p className="text-white mb-1">
                  <span className="text-yellow-400 font-bold text-3xl">142</span>
                  <span className="text-dark-400 text-lg">ms</span>
                </p>
                <p className="text-sm text-dark-400 mb-4">반응속도 테스트 역대 1등!</p>
                
                {/* 이메일 등록 미리보기 */}
                <div className="bg-black/40 rounded-xl p-4 max-w-xs mx-auto">
                  <p className="text-sm text-dark-300 mb-3">
                    🎁 상품 수령을 위해 이메일을 등록하세요!
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-dark-800 rounded-lg px-3 py-2 text-left text-dark-500 text-sm border border-white/10">
                      example@email.com
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg text-sm">
                      등록
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 반짝이는 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            </div>
            
            <p className="text-center text-dark-500 text-sm mt-4">
              👆 실제로 1등 달성 시 화려한 폭죽 효과와 함께 이 화면이 나타나요!
            </p>
          </div>

          {/* 다음 추첨일 */}
          <div className="flex items-center justify-between bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏰</span>
              <div>
                <p className="text-sm text-dark-400">다음 추첨까지</p>
                <p className="text-2xl font-black text-yellow-400">D-{daysUntilNextDraw}</p>
              </div>
            </div>
            <Link
              href="/reaction"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-yellow-500/30"
            >
              🎮 지금 도전하기
            </Link>
          </div>
        </div>

        {/* 당첨자 목록 */}
        <div className="bg-dark-900/50 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            역대 당첨자
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-dark-400">로딩 중...</p>
            </div>
          ) : winners.length > 0 ? (
            <div className="space-y-4">
              {winners.map((winner, index) => (
                <div
                  key={winner.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                      : "bg-dark-800/50 border border-white/5"
                  }`}
                >
                  {/* 월 */}
                  <div className="text-center min-w-[80px]">
                    <p className={`text-lg font-bold ${index === 0 ? "text-yellow-400" : "text-white"}`}>
                      {formatMonthYear(winner.month_year)}
                    </p>
                    <p className="text-xs text-dark-500">당첨</p>
                  </div>

                  {/* 구분선 */}
                  <div className="w-px h-12 bg-white/10" />

                  {/* 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">👑</span>
                      <span className="text-white font-bold">{winner.nickname}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        winner.grade === "챌린저" ? "bg-cyan-500/20 text-cyan-400" :
                        winner.grade === "마스터" ? "bg-purple-500/20 text-purple-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {winner.grade}
                      </span>
                    </div>
                    <p className="text-sm text-dark-400">
                      {getGameName(winner.game_type)} · {winner.score}ms · {maskEmail(winner.email)}
                    </p>
                  </div>

                  {/* 상품 */}
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">🎁 문화상품권</p>
                    <p className="text-sm text-dark-500">5,000원</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎯</span>
              <p className="text-dark-400 mb-2">아직 당첨자가 없습니다.</p>
              <p className="text-dark-500 text-sm">첫 번째 당첨자가 되어보세요!</p>
            </div>
          )}
        </div>

        {/* 유의사항 */}
        <div className="mt-8 p-6 bg-dark-900/30 rounded-2xl border border-white/5">
          <h3 className="text-sm font-bold text-dark-400 mb-3">📌 유의사항</h3>
          <ul className="space-y-1 text-xs text-dark-500">
            <li>• 매달 1일 오전 10시 기준으로 1등을 선정합니다.</li>
            <li>• 1등 달성 시 반드시 이메일을 등록해야 상품 수령이 가능합니다.</li>
            <li>• 상품은 매달 1일 오후 2시에 등록된 이메일로 발송됩니다.</li>
            <li>• 부정한 방법으로 기록 달성 시 당첨이 취소될 수 있습니다.</li>
            <li>• 이벤트 내용은 사전 공지 없이 변경될 수 있습니다.</li>
          </ul>
        </div>

        {/* 홈으로 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

