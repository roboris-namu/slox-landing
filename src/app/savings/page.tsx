"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type InterestType = "simple" | "compound";
type TaxType = "normal" | "taxFree" | "taxReduced";

interface SavingsResult {
  totalPrincipal: number;      // 원금 합계
  grossInterest: number;       // 세전 이자
  tax: number;                 // 세금
  netInterest: number;         // 세후 이자
  maturityAmount: number;      // 만기 수령액
  effectiveRate: number;       // 실질 수익률 (%)
}

// 세율
const TAX_RATES = {
  normal: 0.154,      // 일반과세 15.4% (소득세 14% + 지방소득세 1.4%)
  taxFree: 0,         // 비과세
  taxReduced: 0.095,  // 세금우대 9.5%
};

// 단리 계산
const calculateSimpleInterest = (
  monthlyDeposit: number,
  months: number,
  annualRate: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  let totalInterest = 0;
  
  // 각 월 납입금에 대한 이자 계산 (남은 개월수 만큼 이자)
  for (let i = 1; i <= months; i++) {
    const remainingMonths = months - i + 1;
    totalInterest += monthlyDeposit * monthlyRate * remainingMonths;
  }
  
  return totalInterest;
};

// 복리 계산 (월복리)
const calculateCompoundInterest = (
  monthlyDeposit: number,
  months: number,
  annualRate: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  let totalAmount = 0;
  
  // 각 월 납입금의 복리 계산
  for (let i = 1; i <= months; i++) {
    const remainingMonths = months - i + 1;
    totalAmount += monthlyDeposit * Math.pow(1 + monthlyRate, remainingMonths);
  }
  
  const totalPrincipal = monthlyDeposit * months;
  return totalAmount - totalPrincipal;
};

// 적금 계산
const calculateSavings = (
  monthlyDeposit: number,
  months: number,
  annualRate: number,
  interestType: InterestType,
  taxType: TaxType
): SavingsResult => {
  const totalPrincipal = monthlyDeposit * months;
  
  const grossInterest = interestType === "simple"
    ? calculateSimpleInterest(monthlyDeposit, months, annualRate)
    : calculateCompoundInterest(monthlyDeposit, months, annualRate);
  
  const taxRate = TAX_RATES[taxType];
  const tax = Math.round(grossInterest * taxRate);
  const netInterest = grossInterest - tax;
  const maturityAmount = totalPrincipal + netInterest;
  const effectiveRate = (netInterest / totalPrincipal) * 100;
  
  return {
    totalPrincipal: Math.round(totalPrincipal),
    grossInterest: Math.round(grossInterest),
    tax: Math.round(tax),
    netInterest: Math.round(netInterest),
    maturityAmount: Math.round(maturityAmount),
    effectiveRate,
  };
};

const formatNumber = (num: number): string => num.toLocaleString("ko-KR");

export default function SavingsCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("500000");
  const [months, setMonths] = useState<string>("12");
  const [annualRate, setAnnualRate] = useState<string>("4.0");
  const [interestType, setInterestType] = useState<InterestType>("simple");
  const [taxType, setTaxType] = useState<TaxType>("normal");
  const [result, setResult] = useState<SavingsResult | null>(null);
  
  useEffect(() => {
    const depositNum = parseInt(monthlyDeposit.replace(/,/g, "")) || 0;
    const monthsNum = parseInt(months) || 0;
    const rateNum = parseFloat(annualRate) || 0;
    
    if (depositNum <= 0 || monthsNum <= 0 || rateNum <= 0) {
      setResult(null);
      return;
    }
    
    setResult(calculateSavings(depositNum, monthsNum, rateNum, interestType, taxType));
  }, [monthlyDeposit, months, annualRate, interestType, taxType]);
  
  const handleDepositChange = (value: string) => {
    setMonthlyDeposit(value.replace(/[^0-9]/g, ""));
  };
  
  const quickDeposits = [
    { label: "10만", value: "100000" },
    { label: "30만", value: "300000" },
    { label: "50만", value: "500000" },
    { label: "100만", value: "1000000" },
    { label: "200만", value: "2000000" },
  ];
  
  const quickPeriods = [
    { label: "6개월", value: "6" },
    { label: "12개월", value: "12" },
    { label: "24개월", value: "24" },
    { label: "36개월", value: "36" },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/loan" className="text-dark-400 hover:text-white transition-colors text-sm">
                대출이자 계산기
              </Link>
              <Link href="/salary" className="text-dark-400 hover:text-white transition-colors text-sm">
                연봉 계산기
              </Link>
              <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                ← 메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-blue-400 text-sm font-medium">💰 적금이자 계산기</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">적금이자</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> 계산기</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              적금 만기 시 수령액을 미리 계산해보세요!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 입력 섹션 */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📝</span> 적금 정보 입력
              </h2>
              
              {/* 월 적금액 */}
              <div className="mb-6">
                <label className="block text-dark-300 text-sm mb-2">월 납입금액</label>
                <div className="relative">
                  <input
                    type="text"
                    value={parseInt(monthlyDeposit || "0").toLocaleString("ko-KR")}
                    onChange={(e) => handleDepositChange(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">원</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickDeposits.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setMonthlyDeposit(item.value)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        monthlyDeposit === item.value
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          : "bg-dark-800 text-dark-400 hover:text-white border border-dark-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 적금 기간 */}
              <div className="mb-6">
                <label className="block text-dark-300 text-sm mb-2">적금 기간</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">개월</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickPeriods.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setMonths(item.value)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        months === item.value
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          : "bg-dark-800 text-dark-400 hover:text-white border border-dark-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 연이자율 */}
              <div className="mb-6">
                <label className="block text-dark-300 text-sm mb-2">연이자율 (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">%</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["2.0", "3.0", "3.5", "4.0", "4.5", "5.0"].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setAnnualRate(rate)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        annualRate === rate
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          : "bg-dark-800 text-dark-400 hover:text-white border border-dark-700"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 이자 계산 방식 */}
              <div className="mb-6">
                <label className="block text-dark-300 text-sm mb-2">이자 계산 방식</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInterestType("simple")}
                    className={`p-3 rounded-xl text-center transition-all ${
                      interestType === "simple"
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                    }`}
                  >
                    <div className="font-medium text-white">단리</div>
                    <div className="text-xs text-dark-400 mt-1">일반 적금</div>
                  </button>
                  <button
                    onClick={() => setInterestType("compound")}
                    className={`p-3 rounded-xl text-center transition-all ${
                      interestType === "compound"
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                    }`}
                  >
                    <div className="font-medium text-white">복리 (월복리)</div>
                    <div className="text-xs text-dark-400 mt-1">복리 적금</div>
                  </button>
                </div>
              </div>
              
              {/* 세금 옵션 */}
              <div>
                <label className="block text-dark-300 text-sm mb-2">세금 옵션</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTaxType("normal")}
                    className={`p-3 rounded-xl text-center transition-all ${
                      taxType === "normal"
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                    }`}
                  >
                    <div className="font-medium text-white text-sm">일반과세</div>
                    <div className="text-xs text-dark-400 mt-1">15.4%</div>
                  </button>
                  <button
                    onClick={() => setTaxType("taxReduced")}
                    className={`p-3 rounded-xl text-center transition-all ${
                      taxType === "taxReduced"
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                    }`}
                  >
                    <div className="font-medium text-white text-sm">세금우대</div>
                    <div className="text-xs text-dark-400 mt-1">9.5%</div>
                  </button>
                  <button
                    onClick={() => setTaxType("taxFree")}
                    className={`p-3 rounded-xl text-center transition-all ${
                      taxType === "taxFree"
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                    }`}
                  >
                    <div className="font-medium text-white text-sm">비과세</div>
                    <div className="text-xs text-dark-400 mt-1">0%</div>
                  </button>
                </div>
              </div>
            </div>

            {/* 결과 섹션 */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📊</span> 계산 결과
              </h2>
              
              {result ? (
                <div className="space-y-4">
                  {/* 만기 수령액 */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="text-dark-400 text-sm mb-1">만기 수령액</div>
                    <div className="text-3xl font-bold text-blue-400">
                      {formatNumber(result.maturityAmount)}
                      <span className="text-lg text-dark-400 ml-1">원</span>
                    </div>
                    <div className="text-sm text-dark-400 mt-2">
                      실질 수익률: <span className="text-cyan-400">{result.effectiveRate.toFixed(2)}%</span>
                    </div>
                  </div>
                  
                  {/* 상세 내역 */}
                  <div className="bg-dark-800/50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dark-700">
                      <span className="text-dark-400">납입 원금</span>
                      <span className="text-white font-medium">{formatNumber(result.totalPrincipal)}원</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dark-700">
                      <span className="text-dark-400">세전 이자</span>
                      <span className="text-green-400 font-medium">+{formatNumber(result.grossInterest)}원</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dark-700">
                      <span className="text-dark-400">이자 과세 ({taxType === "normal" ? "15.4%" : taxType === "taxReduced" ? "9.5%" : "0%"})</span>
                      <span className="text-red-400 font-medium">-{formatNumber(result.tax)}원</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dark-700">
                      <span className="text-dark-400">세후 이자</span>
                      <span className="text-cyan-400 font-medium">+{formatNumber(result.netInterest)}원</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-dark-400 font-medium">만기 수령액</span>
                      <span className="text-white font-bold text-lg">{formatNumber(result.maturityAmount)}원</span>
                    </div>
                  </div>
                  
                  {/* 그래프 */}
                  <div className="bg-dark-800/50 rounded-xl p-4">
                    <div className="text-sm text-dark-400 mb-3">원금 vs 이자 비율</div>
                    <div className="h-6 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                        style={{ width: `${(result.totalPrincipal / result.maturityAmount) * 100}%` }}
                      />
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${(result.netInterest / result.maturityAmount) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="text-blue-400">원금 {((result.totalPrincipal / result.maturityAmount) * 100).toFixed(1)}%</span>
                      <span className="text-cyan-400">이자 {((result.netInterest / result.maturityAmount) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-dark-400">
                  <p className="text-5xl mb-4">💰</p>
                  <p>적금 정보를 입력하면<br />결과가 표시됩니다</p>
                </div>
              )}
            </div>
          </div>

          {/* 이자 계산 방식 설명 */}
          <div className="glass-card p-6 rounded-2xl mt-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>💡</span> 이자 계산 방식 안내
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-dark-800/50 p-4 rounded-xl">
                <div className="text-blue-400 font-medium mb-2">단리 (Simple Interest)</div>
                <ul className="text-sm text-dark-400 space-y-1">
                  <li>✓ 원금에 대해서만 이자 계산</li>
                  <li>✓ 대부분의 정기적금에 적용</li>
                  <li>✓ 계산이 간단하고 예측 가능</li>
                </ul>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-xl">
                <div className="text-cyan-400 font-medium mb-2">복리 (Compound Interest)</div>
                <ul className="text-sm text-dark-400 space-y-1">
                  <li>✓ 이자에 이자가 붙는 방식</li>
                  <li>✓ 장기 투자에 유리</li>
                  <li>✓ 실제 수익이 더 높음</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 세금 옵션 설명 */}
          <div className="glass-card p-6 rounded-2xl mt-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📋</span> 세금 옵션 안내
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-dark-800/50 p-4 rounded-xl">
                <div className="text-yellow-400 font-medium mb-2">일반과세 (15.4%)</div>
                <p className="text-sm text-dark-400">
                  소득세 14% + 지방소득세 1.4%<br />
                  일반적인 예금/적금에 적용
                </p>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-xl">
                <div className="text-green-400 font-medium mb-2">세금우대 (9.5%)</div>
                <p className="text-sm text-dark-400">
                  농특세 1.4% + 소득세 8.1%<br />
                  조합 출자금, 일부 저축은행
                </p>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-xl">
                <div className="text-purple-400 font-medium mb-2">비과세 (0%)</div>
                <p className="text-sm text-dark-400">
                  세금 면제<br />
                  청년희망적금, ISA 등 특수상품
                </p>
              </div>
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-2xl mt-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 계산기</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/loan" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                🏦 대출이자 계산기
              </Link>
              <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                💰 연봉 실수령액 계산기
              </Link>
              <Link href="/severance" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                💼 퇴직금 계산기
              </Link>
            </div>
          </div>

          {/* 푸터 */}
          <footer className="mt-12 text-center text-dark-500 text-sm">
            <p>
              Powered by{" "}
              <Link href="/" className="text-accent-purple hover:text-accent-cyan transition-colors">SLOX</Link>
            </p>
            <p className="mt-1">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
          </footer>
        </div>
      </main>
    </div>
  );
}



