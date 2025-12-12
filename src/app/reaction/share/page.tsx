"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// 등급 정보
const gradeInfo: Record<string, { emoji: string; color: string; message: string }> = {
  Challenger: { emoji: "⚡", color: "from-cyan-400 to-cyan-600", message: "인간의 한계를 초월한 반응속도!" },
  Master: { emoji: "🏆", color: "from-purple-400 to-purple-600", message: "프로게이머급 반응속도!" },
  Diamond: { emoji: "💎", color: "from-blue-400 to-blue-600", message: "상위 1%의 뛰어난 반응속도!" },
  Platinum: { emoji: "🥇", color: "from-teal-400 to-teal-600", message: "우수한 반응속도입니다!" },
  Gold: { emoji: "🥈", color: "from-yellow-400 to-yellow-600", message: "평균 이상의 좋은 반응속도!" },
  Silver: { emoji: "🥉", color: "from-gray-300 to-gray-500", message: "조금만 연습하면 더 좋아질 거예요!" },
  Bronze: { emoji: "🌱", color: "from-orange-400 to-orange-600", message: "꾸준히 연습해보세요!" },
};

function ShareContent() {
  const searchParams = useSearchParams();
  
  const time = parseInt(searchParams.get("t") || "0");
  const grade = searchParams.get("g") || "Bronze";
  const nickname = searchParams.get("n") || "";
  
  const info = gradeInfo[grade] || gradeInfo.Bronze;
  
  return (
    <main className="min-h-screen bg-dark-950 text-white flex flex-col items-center justify-center p-4">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* 결과 카드 */}
        <div className="bg-dark-900/80 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 text-center">
          {/* 헤더 */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-bold text-purple-400">반응속도 테스트</span>
          </div>

          {/* 누가 공유했는지 */}
          {nickname && (
            <div className="mb-4 text-dark-400 text-sm">
              <span className="text-white font-medium">{nickname}</span>님의 기록
            </div>
          )}

          {/* 등급 */}
          <div className="text-6xl mb-4">{info.emoji}</div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-2`}>
            {grade}
          </div>

          {/* 시간 */}
          <div className="text-5xl font-bold text-white mb-2">
            {time}<span className="text-2xl text-purple-400">ms</span>
          </div>

          {/* 메시지 */}
          <p className="text-dark-400 text-sm mb-8">{info.message}</p>

          {/* CTA 버튼 */}
          <Link
            href="/reaction"
            className="block w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20"
          >
            🎮 나도 테스트하기!
          </Link>

          {/* 이벤트 안내 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-xl">
            <div className="text-yellow-400 font-bold text-sm mb-1">🎁 EVENT!</div>
            <div className="text-white text-sm">1등에게 문화상품권 5천원!</div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-6 text-dark-500 text-sm">
          Powered by <span className="text-purple-400 font-bold">SLOX</span>
        </div>
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">로딩중...</div>
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}

