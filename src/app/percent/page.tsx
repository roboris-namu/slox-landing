"use client";

import { useState } from "react";
import Link from "next/link";

export default function PercentCalculator() {
  // 타입 1: A의 B%는?
  const [val1A, setVal1A] = useState<string>("");
  const [val1B, setVal1B] = useState<string>("");
  const result1 = val1A && val1B ? (parseFloat(val1A) * parseFloat(val1B)) / 100 : null;

  // 타입 2: A에서 B% 증가/감소
  const [val2A, setVal2A] = useState<string>("");
  const [val2B, setVal2B] = useState<string>("");
  const result2Plus = val2A && val2B ? parseFloat(val2A) * (1 + parseFloat(val2B) / 100) : null;
  const result2Minus = val2A && val2B ? parseFloat(val2A) * (1 - parseFloat(val2B) / 100) : null;

  // 타입 3: A는 B의 몇 %?
  const [val3A, setVal3A] = useState<string>("");
  const [val3B, setVal3B] = useState<string>("");
  const result3 = val3A && val3B && parseFloat(val3B) !== 0 
    ? (parseFloat(val3A) / parseFloat(val3B)) * 100 
    : null;

  // 타입 4: A에서 B로 변화율
  const [val4A, setVal4A] = useState<string>("");
  const [val4B, setVal4B] = useState<string>("");
  const result4 = val4A && val4B && parseFloat(val4A) !== 0 
    ? ((parseFloat(val4B) - parseFloat(val4A)) / parseFloat(val4A)) * 100 
    : null;

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="text-indigo-400 text-sm font-medium">🔢 퍼센트 계산기</span>
              <span className="px-1.5 py-0.5 text-xs bg-indigo-500/20 text-indigo-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">퍼센트 계산기</h1>
            <p className="text-dark-400 text-lg">다양한 백분율 계산을 쉽게 하세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 타입 1: A의 B%는? */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">1</span>
                A의 B%는?
              </h3>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <input
                  type="number"
                  value={val1A}
                  onChange={(e) => setVal1A(e.target.value)}
                  placeholder="100"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <span className="text-dark-400">의</span>
                <input
                  type="number"
                  value={val1B}
                  onChange={(e) => setVal1B(e.target.value)}
                  placeholder="20"
                  className="w-20 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <span className="text-dark-400">%는?</span>
              </div>
              {result1 !== null && (
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3 text-center">
                  <span className="text-indigo-400 text-2xl font-bold">{formatNumber(result1)}</span>
                </div>
              )}
              <p className="text-dark-500 text-xs mt-3">예: 할인 금액 계산</p>
            </div>

            {/* 타입 2: 증가/감소 */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">2</span>
                A에서 B% 증가/감소
              </h3>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <input
                  type="number"
                  value={val2A}
                  onChange={(e) => setVal2A(e.target.value)}
                  placeholder="1000"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-dark-400">에서</span>
                <input
                  type="number"
                  value={val2B}
                  onChange={(e) => setVal2B(e.target.value)}
                  placeholder="10"
                  className="w-20 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-dark-400">%</span>
              </div>
              {result2Plus !== null && result2Minus !== null && (
                <div className="space-y-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 flex justify-between items-center">
                    <span className="text-dark-400 text-sm">증가 (+)</span>
                    <span className="text-emerald-400 text-xl font-bold">{formatNumber(result2Plus)}</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex justify-between items-center">
                    <span className="text-dark-400 text-sm">감소 (-)</span>
                    <span className="text-red-400 text-xl font-bold">{formatNumber(result2Minus)}</span>
                  </div>
                </div>
              )}
              <p className="text-dark-500 text-xs mt-3">예: 가격 인상/할인 후 금액</p>
            </div>

            {/* 타입 3: A는 B의 몇 %? */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">3</span>
                A는 B의 몇 %?
              </h3>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <input
                  type="number"
                  value={val3A}
                  onChange={(e) => setVal3A(e.target.value)}
                  placeholder="25"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="text-dark-400">는</span>
                <input
                  type="number"
                  value={val3B}
                  onChange={(e) => setVal3B(e.target.value)}
                  placeholder="100"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <span className="text-dark-400">의 몇 %?</span>
              </div>
              {result3 !== null && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                  <span className="text-amber-400 text-2xl font-bold">{formatNumber(result3)}%</span>
                </div>
              )}
              <p className="text-dark-500 text-xs mt-3">예: 득점률, 달성률 계산</p>
            </div>

            {/* 타입 4: 변화율 */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">4</span>
                A에서 B로 변화율
              </h3>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <input
                  type="number"
                  value={val4A}
                  onChange={(e) => setVal4A(e.target.value)}
                  placeholder="100"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-cyan-500 outline-none"
                />
                <span className="text-dark-400">→</span>
                <input
                  type="number"
                  value={val4B}
                  onChange={(e) => setVal4B(e.target.value)}
                  placeholder="120"
                  className="w-24 p-2 bg-dark-800 border border-dark-700 rounded-lg text-white text-center focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
              {result4 !== null && (
                <div className={`${result4 >= 0 ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-lg p-3 text-center`}>
                  <span className={`${result4 >= 0 ? 'text-cyan-400' : 'text-red-400'} text-2xl font-bold`}>
                    {result4 >= 0 ? '+' : ''}{formatNumber(result4)}%
                  </span>
                </div>
              )}
              <p className="text-dark-500 text-xs mt-3">예: 성장률, 수익률 계산</p>
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl mt-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/age" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎂 나이 계산기</Link>
              <Link href="/bmi" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚖️ BMI 계산기</Link>
              <Link href="/dday" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📅 D-day 계산기</Link>
              <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">💰 연봉 계산기</Link>
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

