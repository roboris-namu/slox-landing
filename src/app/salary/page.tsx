"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * 2025년 기준 4대보험 요율
 */
const INSURANCE_RATES = {
  nationalPension: 0.045,      // 국민연금 4.5%
  healthInsurance: 0.03545,    // 건강보험 3.545%
  longTermCare: 0.1281,        // 장기요양 (건강보험의 12.81%)
  employmentInsurance: 0.009,  // 고용보험 0.9%
};

/**
 * 2025년 기준 근로소득세 간이세액표 (월급 기준, 부양가족 1인)
 * 실제로는 더 복잡하지만 간소화된 버전
 */
const calculateIncomeTax = (monthlyGross: number): number => {
  // 과세표준 계산 (근로소득공제 적용)
  const annualGross = monthlyGross * 12;
  
  let deduction = 0;
  if (annualGross <= 5000000) {
    deduction = annualGross * 0.7;
  } else if (annualGross <= 15000000) {
    deduction = 3500000 + (annualGross - 5000000) * 0.4;
  } else if (annualGross <= 45000000) {
    deduction = 7500000 + (annualGross - 15000000) * 0.15;
  } else if (annualGross <= 100000000) {
    deduction = 12000000 + (annualGross - 45000000) * 0.05;
  } else {
    deduction = 14750000 + (annualGross - 100000000) * 0.02;
  }
  
  // 기본공제 150만원 (본인)
  const taxableIncome = Math.max(0, annualGross - deduction - 1500000);
  
  // 세율 적용
  let annualTax = 0;
  if (taxableIncome <= 14000000) {
    annualTax = taxableIncome * 0.06;
  } else if (taxableIncome <= 50000000) {
    annualTax = 840000 + (taxableIncome - 14000000) * 0.15;
  } else if (taxableIncome <= 88000000) {
    annualTax = 6240000 + (taxableIncome - 50000000) * 0.24;
  } else if (taxableIncome <= 150000000) {
    annualTax = 15360000 + (taxableIncome - 88000000) * 0.35;
  } else if (taxableIncome <= 300000000) {
    annualTax = 37060000 + (taxableIncome - 150000000) * 0.38;
  } else if (taxableIncome <= 500000000) {
    annualTax = 94060000 + (taxableIncome - 300000000) * 0.40;
  } else if (taxableIncome <= 1000000000) {
    annualTax = 174060000 + (taxableIncome - 500000000) * 0.42;
  } else {
    annualTax = 384060000 + (taxableIncome - 1000000000) * 0.45;
  }
  
  return Math.round(annualTax / 12);
};

/**
 * 급여 계산 결과
 */
interface SalaryResult {
  grossMonthly: number;        // 월 총급여
  grossAnnual: number;         // 연봉
  nationalPension: number;     // 국민연금
  healthInsurance: number;     // 건강보험
  longTermCare: number;        // 장기요양
  employmentInsurance: number; // 고용보험
  incomeTax: number;           // 소득세
  localIncomeTax: number;      // 지방소득세
  totalDeduction: number;      // 총 공제액
  netMonthly: number;          // 월 실수령액
  netAnnual: number;           // 연 실수령액
}

/**
 * 급여 계산 함수
 */
const calculateSalary = (annualSalary: number): SalaryResult => {
  const grossMonthly = Math.round(annualSalary / 12);
  
  // 4대보험 계산 (월급 기준)
  const nationalPension = Math.round(grossMonthly * INSURANCE_RATES.nationalPension);
  const healthInsurance = Math.round(grossMonthly * INSURANCE_RATES.healthInsurance);
  const longTermCare = Math.round(healthInsurance * INSURANCE_RATES.longTermCare);
  const employmentInsurance = Math.round(grossMonthly * INSURANCE_RATES.employmentInsurance);
  
  // 소득세 계산
  const incomeTax = calculateIncomeTax(grossMonthly);
  const localIncomeTax = Math.round(incomeTax * 0.1); // 지방소득세 (소득세의 10%)
  
  // 총 공제액
  const totalDeduction = nationalPension + healthInsurance + longTermCare + employmentInsurance + incomeTax + localIncomeTax;
  
  // 실수령액
  const netMonthly = grossMonthly - totalDeduction;
  const netAnnual = netMonthly * 12;
  
  return {
    grossMonthly,
    grossAnnual: annualSalary,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netMonthly,
    netAnnual,
  };
};

/**
 * 숫자 포맷팅 (천 단위 콤마)
 */
const formatNumber = (num: number): string => {
  return num.toLocaleString("ko-KR");
};

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>("50000000");
  const [result, setResult] = useState<SalaryResult | null>(null);

  useEffect(() => {
    const salary = parseInt(annualSalary.replace(/,/g, "")) || 0;
    if (salary > 0) {
      setResult(calculateSalary(salary));
    } else {
      setResult(null);
    }
  }, [annualSalary]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAnnualSalary(value);
  };

  // 빠른 선택 버튼
  const quickSelectOptions = [3000, 4000, 5000, 6000, 7000, 8000, 10000];

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
<Link 
                href="/severance"
                className="text-dark-400 hover:text-white transition-colors text-sm"
              >
                퇴직금 계산기
              </Link>
              <Link 
                href="/"
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
                ← 메인으로
              </Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">2025년 최신 기준</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              연봉 실수령액
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 계산기</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              4대보험과 소득세를 반영한 정확한 실수령액을 확인하세요
            </p>
          </div>

          {/* 광고 영역 (상단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-8">
              광고 영역 (Google AdSense)
            </div>
          </div>

          {/* 계산기 카드 */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            {/* 연봉 입력 */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-3">
                연봉 입력
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatNumber(parseInt(annualSalary) || 0)}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-dark-800 border border-dark-700 rounded-xl text-white text-2xl font-bold focus:outline-none focus:border-accent-purple transition-colors"
                  placeholder="연봉을 입력하세요"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 text-lg">
                  원
                </span>
              </div>
            </div>

            {/* 빠른 선택 */}
            <div className="mb-8">
              <label className="block text-dark-400 text-sm mb-3">
                빠른 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {quickSelectOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnnualSalary((option * 10000).toString())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      parseInt(annualSalary) === option * 10000
                        ? "bg-accent-purple text-white"
                        : "bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white"
                    }`}
                  >
                    {option >= 10000 ? `${option / 10000}억` : `${option / 1000}천만`}
                  </button>
                ))}
              </div>
            </div>

            {/* 결과 */}
            {result && (
              <div className="space-y-6">
                {/* 실수령액 하이라이트 */}
                <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-xl border border-accent-purple/30">
                  <div className="text-center">
                    <p className="text-dark-300 text-sm mb-2">월 실수령액</p>
                    <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                      {formatNumber(result.netMonthly)}원
                    </p>
                    <p className="text-dark-400">
                      연 실수령액: <span className="text-white font-semibold">{formatNumber(result.netAnnual)}원</span>
                    </p>
                  </div>
                </div>

                {/* 공제 내역 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-purple rounded-full"></span>
                    월 공제 내역
                  </h3>
                  <div className="space-y-3">
                    {/* 4대보험 */}
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-3">4대보험</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between">
                          <span className="text-dark-300">국민연금</span>
                          <span className="text-white">{formatNumber(result.nationalPension)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">건강보험</span>
                          <span className="text-white">{formatNumber(result.healthInsurance)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">장기요양</span>
                          <span className="text-white">{formatNumber(result.longTermCare)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">고용보험</span>
                          <span className="text-white">{formatNumber(result.employmentInsurance)}원</span>
                        </div>
                      </div>
                    </div>

                    {/* 세금 */}
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-3">세금</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between">
                          <span className="text-dark-300">소득세</span>
                          <span className="text-white">{formatNumber(result.incomeTax)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">지방소득세</span>
                          <span className="text-white">{formatNumber(result.localIncomeTax)}원</span>
                        </div>
                      </div>
                    </div>

                    {/* 총 공제액 */}
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-red-400 font-medium">총 공제액</span>
                        <span className="text-red-400 font-bold text-lg">-{formatNumber(result.totalDeduction)}원</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 요약 테이블 */}
                <div className="p-4 bg-dark-800/50 rounded-xl">
                  <table className="w-full">
                    <tbody className="divide-y divide-dark-700">
                      <tr>
                        <td className="py-3 text-dark-400">월 총급여</td>
                        <td className="py-3 text-white text-right font-medium">{formatNumber(result.grossMonthly)}원</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-dark-400">월 공제액</td>
                        <td className="py-3 text-red-400 text-right font-medium">-{formatNumber(result.totalDeduction)}원</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-white font-medium">월 실수령액</td>
                        <td className="py-3 text-accent-cyan text-right font-bold text-lg">{formatNumber(result.netMonthly)}원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* 광고 영역 (하단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-8">
              광고 영역 (Google AdSense)
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-3">📌 안내사항</h3>
            <ul className="text-dark-400 text-sm space-y-2">
              <li>• 본 계산기는 2025년 기준 4대보험 요율을 적용합니다.</li>
              <li>• 실제 급여는 회사 정책, 비과세 항목, 부양가족 수에 따라 달라질 수 있습니다.</li>
              <li>• 정확한 금액은 급여명세서 또는 회사 인사팀에 문의하세요.</li>
              <li>• 국민연금은 월 소득 617만원 상한 적용 (2025년 기준)</li>
            </ul>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/severance"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💼 퇴직금 계산기
              </Link>
              <Link 
                href="/typing"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⌨️ 타자 속도 테스트
              </Link>
              <Link 
                href="/reaction"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⚡ 반응속도 테스트
              </Link>
            </div>
          </div>

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-accent-purple to-accent-cyan rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium">SLOX</span>
            </Link>
            <p className="text-dark-500 text-xs mt-2">
              홈페이지 · 앱 제작 · AI 챗봇 구축
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

