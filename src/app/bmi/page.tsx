"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  emoji: string;
  minWeight: number;
  maxWeight: number;
  idealWeight: number;
}

const getBMICategory = (bmi: number): { category: string; color: string; emoji: string } => {
  if (bmi < 18.5) return { category: "저체중", color: "text-blue-400", emoji: "🥶" };
  if (bmi < 23) return { category: "정상", color: "text-green-400", emoji: "😊" };
  if (bmi < 25) return { category: "과체중", color: "text-yellow-400", emoji: "😐" };
  if (bmi < 30) return { category: "비만", color: "text-orange-400", emoji: "😟" };
  return { category: "고도비만", color: "text-red-400", emoji: "😰" };
};

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("70");

  const result = useMemo<BMIResult | null>(() => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) return null;

    const bmi = w / (h * h);
    const { category, color, emoji } = getBMICategory(bmi);

    // 정상 BMI 범위 (18.5 ~ 23)
    const minWeight = 18.5 * h * h;
    const maxWeight = 23 * h * h;
    const idealWeight = 22 * h * h; // 이상적인 BMI = 22

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
      emoji,
      minWeight: parseFloat(minWeight.toFixed(1)),
      maxWeight: parseFloat(maxWeight.toFixed(1)),
      idealWeight: parseFloat(idealWeight.toFixed(1)),
    };
  }, [height, weight]);

  const weightDiff = result ? parseFloat(weight) - result.idealWeight : 0;

  // BMI 게이지 위치 계산 (0 ~ 100%)
  const gaugePosition = useMemo(() => {
    if (!result) return 50;
    const bmi = result.bmi;
    // BMI 15 ~ 35 범위를 0 ~ 100%로 매핑
    const pos = ((bmi - 15) / 20) * 100;
    return Math.max(0, Math.min(100, pos));
  }, [result]);

  const quickHeights = [150, 160, 165, 170, 175, 180, 185];
  const quickWeights = [50, 60, 70, 80, 90, 100];

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
            <div className="flex items-center space-x-4">
              <Link href="/salary" className="text-dark-400 hover:text-white transition-colors text-sm">
                💰 연봉 계산기
              </Link>
              <Link href="/character-count" className="text-dark-400 hover:text-white transition-colors text-sm">
                ✍️ 글자수 세기
              </Link>
              <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                ← 메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <span className="text-pink-400 text-sm font-medium">⚖️ BMI 계산기</span>
              <span className="px-1.5 py-0.5 text-xs bg-pink-500/20 text-pink-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">BMI 계산기</h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              키와 체중을 입력하면 체질량지수(BMI)와 비만도를 바로 확인할 수 있습니다.
            </p>
          </div>

          {/* 입력 폼 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">
                  키 (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="키를 입력하세요"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickHeights.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHeight(h.toString())}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        height === h.toString()
                          ? "bg-pink-600 text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
                      }`}
                    >
                      {h}cm
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">
                  체중 (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="체중을 입력하세요"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickWeights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w.toString())}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        weight === w.toString()
                          ? "bg-pink-600 text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
                      }`}
                    >
                      {w}kg
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 결과 */}
          {result && (
            <div className="glass-card p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">측정 결과</h2>

              {/* BMI 수치 */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-white mb-2">{result.bmi}</div>
                <div className={`text-2xl font-semibold ${result.color} flex items-center justify-center gap-2`}>
                  <span className="text-3xl">{result.emoji}</span>
                  {result.category}
                </div>
              </div>

              {/* BMI 게이지 바 */}
              <div className="mb-8">
                <div className="relative h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500">
                  <div
                    className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-300"
                    style={{ left: `${gaugePosition}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-dark-900 text-xs font-bold px-2 py-1 rounded">
                      {result.bmi}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-dark-400">
                  <span>저체중<br/>18.5 미만</span>
                  <span>정상<br/>18.5~22.9</span>
                  <span>과체중<br/>23~24.9</span>
                  <span>비만<br/>25~29.9</span>
                  <span>고도비만<br/>30 이상</span>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">적정 체중 범위</p>
                  <p className="text-white text-xl font-bold">
                    {result.minWeight} ~ {result.maxWeight}kg
                  </p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">이상적 체중 (BMI 22)</p>
                  <p className="text-green-400 text-xl font-bold">{result.idealWeight}kg</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">현재 vs 이상 체중</p>
                  <p className={`text-xl font-bold ${weightDiff > 0 ? "text-red-400" : weightDiff < 0 ? "text-blue-400" : "text-green-400"}`}>
                    {weightDiff > 0 ? "+" : ""}{weightDiff.toFixed(1)}kg
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BMI 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">📊 BMI 분류 기준 (아시아-태평양 기준)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-dark-800 text-white text-sm">
                  <tr>
                    <th className="p-3 rounded-tl-lg">분류</th>
                    <th className="p-3">BMI 범위</th>
                    <th className="p-3 rounded-tr-lg">설명</th>
                  </tr>
                </thead>
                <tbody className="text-dark-300 text-sm">
                  <tr className="border-b border-dark-800">
                    <td className="p-3 text-blue-400 font-medium">저체중</td>
                    <td className="p-3">18.5 미만</td>
                    <td className="p-3">영양 섭취 증가 권장</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-3 text-green-400 font-medium">정상</td>
                    <td className="p-3">18.5 ~ 22.9</td>
                    <td className="p-3">건강한 체중 유지</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-3 text-yellow-400 font-medium">과체중</td>
                    <td className="p-3">23 ~ 24.9</td>
                    <td className="p-3">체중 관리 시작 권장</td>
                  </tr>
                  <tr className="border-b border-dark-800">
                    <td className="p-3 text-orange-400 font-medium">비만</td>
                    <td className="p-3">25 ~ 29.9</td>
                    <td className="p-3">적극적인 체중 감량 필요</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-red-400 font-medium">고도비만</td>
                    <td className="p-3">30 이상</td>
                    <td className="p-3">전문가 상담 권장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BMI 설명 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ BMI란?</h3>
            <p className="text-dark-300 leading-relaxed mb-4">
              BMI(Body Mass Index, 체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값으로,
              비만도를 간단하게 측정하는 지표입니다.
            </p>
            <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
              <p className="text-white font-mono text-center text-lg">
                BMI = 체중(kg) ÷ 키(m)²
              </p>
            </div>
            <p className="text-dark-400 text-sm mt-4">
              ※ BMI는 간편한 지표이지만, 근육량이 많은 운동선수나 노인, 임산부 등에게는 
              정확하지 않을 수 있습니다. 정확한 건강 상태 확인은 전문가와 상담하세요.
            </p>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">💰 연봉 계산기</Link>
              <Link href="/loan" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🏦 대출이자 계산기</Link>
              <Link href="/character-count" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">✍️ 글자수 세기</Link>
              <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ 반응속도 테스트</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href="/" className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
        <p className="mb-4">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
        <div className="flex justify-center space-x-4">
          <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
          <Link href="/" className="hover:text-white">메인으로</Link>
        </div>
      </footer>
    </div>
  );
}

