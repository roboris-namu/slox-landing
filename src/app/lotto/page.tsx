"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface LottoGame {
  numbers: number[];
  id: number;
}

// 번호별 색상 (로또 공식 색상)
const getBallColor = (num: number): string => {
  if (num <= 10) return "from-yellow-400 to-yellow-500"; // 노랑
  if (num <= 20) return "from-blue-400 to-blue-500"; // 파랑
  if (num <= 30) return "from-red-400 to-red-500"; // 빨강
  if (num <= 40) return "from-gray-400 to-gray-500"; // 회색
  return "from-green-400 to-green-500"; // 초록
};

export default function LottoGenerator() {
  const [games, setGames] = useState<LottoGame[]>([]);
  const [gameCount, setGameCount] = useState<number>(5);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // 로또 번호 생성 (1~45 중 6개)
  const generateNumbers = useCallback((): number[] => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }, []);

  // 게임 생성
  const handleGenerate = useCallback(() => {
    setIsAnimating(true);
    setGames([]);

    // 애니메이션 효과
    setTimeout(() => {
      const newGames: LottoGame[] = [];
      for (let i = 0; i < gameCount; i++) {
        newGames.push({
          numbers: generateNumbers(),
          id: Date.now() + i,
        });
      }
      setGames(newGames);
      setIsAnimating(false);
    }, 500);
  }, [gameCount, generateNumbers]);

  // 초기화
  const handleReset = () => {
    setGames([]);
  };

  const gameCounts = [1, 3, 5, 10];

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
              ← 메인으로
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <span className="text-yellow-400 text-sm font-medium">🎰 로또 번호 생성기</span>
              <span className="px-1.5 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">로또 번호 생성기</h1>
            <p className="text-dark-400 text-lg">행운의 로또 6/45 번호를 생성해보세요!</p>
          </div>

          {/* 설정 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <label className="text-dark-300 text-sm mb-2 block">생성할 게임 수</label>
                <div className="flex gap-2">
                  {gameCounts.map((count) => (
                    <button
                      key={count}
                      onClick={() => setGameCount(count)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        gameCount === count
                          ? "bg-yellow-500 text-dark-900 font-bold"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                      }`}
                    >
                      {count}게임
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {games.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    초기화
                  </button>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={isAnimating}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-dark-900 rounded-lg font-bold transition-all disabled:opacity-50"
                >
                  {isAnimating ? "생성 중..." : "🎰 번호 생성!"}
                </button>
              </div>
            </div>
          </div>

          {/* 결과 */}
          <div className="space-y-4">
            {isAnimating && (
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="text-4xl animate-bounce">🎰</div>
                <p className="text-dark-400 mt-2">행운의 번호를 뽑는 중...</p>
              </div>
            )}

            {!isAnimating && games.length === 0 && (
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="text-6xl mb-4">🍀</div>
                <p className="text-dark-500">번호 생성 버튼을 눌러주세요</p>
              </div>
            )}

            {!isAnimating && games.map((game, index) => (
              <div
                key={game.id}
                className="glass-card p-4 rounded-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-dark-500 text-sm w-16">게임 {index + 1}</span>
                  <div className="flex gap-2 flex-wrap">
                    {game.numbers.map((num, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getBallColor(num)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 색상 안내 */}
          <div className="glass-card p-6 rounded-xl mt-8">
            <h3 className="text-white font-bold mb-4">🎨 번호별 색상</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500"></div>
                <span className="text-dark-400 text-sm">1~10</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500"></div>
                <span className="text-dark-400 text-sm">11~20</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-500"></div>
                <span className="text-dark-400 text-sm">21~30</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                <span className="text-dark-400 text-sm">31~40</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-500"></div>
                <span className="text-dark-400 text-sm">41~45</span>
              </div>
            </div>
          </div>

          {/* 안내 */}
          <div className="glass-card p-6 rounded-xl mt-6">
            <h3 className="text-white font-bold mb-3">💡 안내</h3>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li>• 로또 6/45: 1~45 중 6개 번호 선택</li>
              <li>• 생성된 번호는 완전히 랜덤입니다</li>
              <li>• 당첨을 보장하지 않으며, 재미로만 사용해주세요 😊</li>
            </ul>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl mt-6">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/random" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎲 랜덤 뽑기</Link>
              <Link href="/password" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔐 비밀번호 생성기</Link>
              <Link href="/percent" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔢 퍼센트 계산기</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href="/" className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}



