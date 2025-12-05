"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function RandomPicker() {
  const [input, setInput] = useState<string>("");
  const [pickCount, setPickCount] = useState<number>(1);
  const [results, setResults] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationText, setAnimationText] = useState<string>("");

  // 입력 파싱 (콤마, 줄바꿈, 공백 구분)
  const getItems = useCallback(() => {
    return input
      .split(/[,\n]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }, [input]);

  const items = getItems();

  // 랜덤 뽑기
  const handlePick = useCallback(() => {
    if (items.length === 0) return;

    setIsAnimating(true);
    setResults([]);

    // 애니메이션 효과
    let count = 0;
    const maxCount = 20;
    const interval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setAnimationText(randomItem);
      count++;

      if (count >= maxCount) {
        clearInterval(interval);
        
        // 최종 결과 선정
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, Math.min(pickCount, items.length));
        
        setResults(picked);
        setAnimationText("");
        setIsAnimating(false);
      }
    }, 80);
  }, [items, pickCount]);

  // 초기화
  const handleReset = () => {
    setResults([]);
    setAnimationText("");
  };

  // 예시 데이터
  const examples = [
    { label: "점심 메뉴", data: "짜장면, 짬뽕, 볶음밥, 탕수육, 김밥, 라면, 비빔밥, 돈까스" },
    { label: "1~10 숫자", data: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10" },
    { label: "가위바위보", data: "가위, 바위, 보" },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-orange-400 text-sm font-medium">🎲 랜덤 뽑기</span>
              <span className="px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">랜덤 뽑기</h1>
            <p className="text-dark-400 text-lg">무엇이든 랜덤으로 뽑아보세요!</p>
          </div>

          {/* 입력 영역 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <label className="block text-dark-300 text-sm font-medium mb-2">
              항목 입력 (콤마 또는 줄바꿈으로 구분)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 짜장면, 짬뽕, 볶음밥&#10;또는&#10;홍길동&#10;김철수&#10;이영희"
              className="w-full h-32 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-orange-500 outline-none"
            />
            
            {/* 예시 버튼 */}
            <div className="mt-3 flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setInput(ex.data)}
                  className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-xs transition-all"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* 항목 수 표시 */}
            {items.length > 0 && (
              <p className="mt-3 text-dark-400 text-sm">
                총 <span className="text-orange-400 font-bold">{items.length}</span>개 항목
              </p>
            )}
          </div>

          {/* 뽑기 설정 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <label className="text-dark-300 text-sm">뽑을 개수:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPickCount(Math.max(1, pickCount - 1))}
                    className="w-8 h-8 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-all"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white font-bold">{pickCount}</span>
                  <button
                    onClick={() => setPickCount(Math.min(items.length || 10, pickCount + 1))}
                    className="w-8 h-8 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                >
                  초기화
                </button>
                <button
                  onClick={handlePick}
                  disabled={items.length === 0 || isAnimating}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnimating ? "뽑는 중..." : "🎲 뽑기!"}
                </button>
              </div>
            </div>
          </div>

          {/* 결과 영역 */}
          <div className="glass-card p-6 rounded-xl mb-6 min-h-[200px] flex flex-col items-center justify-center">
            {isAnimating && (
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 animate-pulse">
                  {animationText}
                </div>
                <p className="text-dark-400 mt-2">뽑는 중...</p>
              </div>
            )}

            {!isAnimating && results.length > 0 && (
              <div className="text-center w-full">
                <p className="text-dark-400 mb-4">🎉 결과</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-xl animate-bounce"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-orange-400 text-xl font-bold">{result}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handlePick}
                  className="mt-6 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                >
                  🔄 다시 뽑기
                </button>
              </div>
            )}

            {!isAnimating && results.length === 0 && (
              <div className="text-center text-dark-500">
                <div className="text-6xl mb-4">🎲</div>
                <p>항목을 입력하고 뽑기 버튼을 눌러주세요</p>
              </div>
            )}
          </div>

          {/* 활용 예시 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="text-white font-bold mb-4">💡 활용 예시</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🍜</div>
                <p className="text-dark-300 text-xs">점심 메뉴</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🎁</div>
                <p className="text-dark-300 text-xs">당첨자 추첨</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">👥</div>
                <p className="text-dark-300 text-xs">팀 나누기</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🎮</div>
                <p className="text-dark-300 text-xs">순서 정하기</p>
              </div>
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/percent" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔢 퍼센트 계산기</Link>
              <Link href="/age" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎂 나이 계산기</Link>
              <Link href="/dday" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📅 D-day 계산기</Link>
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

