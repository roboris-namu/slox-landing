"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * 퇴직금 계산 결과
 */
interface SeveranceResult {
  totalDays: number;           // 총 재직일수
  years: number;               // 재직 년수
  months: number;              // 재직 개월수
  days: number;                // 재직 일수
  dailyWage: number;           // 1일 평균임금
  severancePay: number;        // 퇴직금
  taxAmount: number;           // 퇴직소득세 (간이)
  netSeverance: number;        // 실수령 퇴직금
}

/**
 * 두 날짜 사이의 일수 계산
 */
const getDaysBetween = (start: Date, end: Date): number => {
  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * 재직기간을 년/월/일로 변환
 */
const getWorkPeriod = (totalDays: number): { years: number; months: number; days: number } => {
  const years = Math.floor(totalDays / 365);
  const remainingDays = totalDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;
  return { years, months, days };
};

/**
 * 퇴직소득세 계산 (간이 계산)
 * 실제로는 더 복잡하지만 간소화된 버전
 */
const calculateTax = (severancePay: number, years: number): number => {
  if (years < 1) return 0;
  
  // 퇴직소득공제
  const baseDeduction = Math.min(severancePay * 0.4, 8000000 + (years - 1) * 800000);
  const taxableIncome = Math.max(0, severancePay - baseDeduction);
  
  // 환산급여
  const convertedIncome = (taxableIncome / years) * 12;
  
  // 세율 적용 (간이)
  let tax = 0;
  if (convertedIncome <= 14000000) {
    tax = convertedIncome * 0.06;
  } else if (convertedIncome <= 50000000) {
    tax = 840000 + (convertedIncome - 14000000) * 0.15;
  } else if (convertedIncome <= 88000000) {
    tax = 6240000 + (convertedIncome - 50000000) * 0.24;
  } else {
    tax = 15360000 + (convertedIncome - 88000000) * 0.35;
  }
  
  // 연분연승
  const annualTax = (tax / 12) * years;
  
  return Math.round(annualTax);
};

/**
 * 퇴직금 계산 함수
 */
const calculateSeverance = (
  startDate: Date,
  endDate: Date,
  monthlySalary: number
): SeveranceResult | null => {
  const totalDays = getDaysBetween(startDate, endDate);
  
  if (totalDays < 0) return null;
  
  const { years, months, days } = getWorkPeriod(totalDays);
  
  // 1일 평균임금 = 최근 3개월 임금 / 90일
  const dailyWage = Math.round((monthlySalary * 3) / 90);
  
  // 퇴직금 = 1일 평균임금 × 30일 × (총 재직일수 / 365)
  const severancePay = Math.round(dailyWage * 30 * (totalDays / 365));
  
  // 퇴직소득세
  const taxAmount = calculateTax(severancePay, years);
  
  // 실수령액
  const netSeverance = severancePay - taxAmount;
  
  return {
    totalDays,
    years,
    months,
    days,
    dailyWage,
    severancePay,
    taxAmount,
    netSeverance,
  };
};

/**
 * 숫자 포맷팅 (천 단위 콤마)
 */
const formatNumber = (num: number): string => {
  return num.toLocaleString("ko-KR");
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
const formatDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export default function SeveranceCalculator() {
  const today = new Date();
  const defaultStartDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
  
  const [startDate, setStartDate] = useState<string>(formatDateString(defaultStartDate));
  const [endDate, setEndDate] = useState<string>(formatDateString(today));
  const [monthlySalary, setMonthlySalary] = useState<string>("3000000");
  const [result, setResult] = useState<SeveranceResult | null>(null);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const salary = parseInt(monthlySalary.replace(/,/g, "")) || 0;
    
    if (start && end && salary > 0) {
      setResult(calculateSeverance(start, end, salary));
    } else {
      setResult(null);
    }
  }, [startDate, endDate, monthlySalary]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setMonthlySalary(value);
  };

  // 빠른 재직기간 선택
  const quickPeriodOptions = [
    { label: "1년", years: 1 },
    { label: "2년", years: 2 },
    { label: "3년", years: 3 },
    { label: "5년", years: 5 },
    { label: "10년", years: 10 },
    { label: "20년", years: 20 },
  ];

  const setQuickPeriod = (years: number) => {
    const end = new Date();
    const start = new Date(end.getFullYear() - years, end.getMonth(), end.getDate());
    setStartDate(formatDateString(start));
    setEndDate(formatDateString(end));
  };

  // 빠른 월급 선택
  const quickSalaryOptions = [200, 250, 300, 350, 400, 500];

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
            <div className="flex items-center gap-4">
              <Link 
                href="/salary"
                className="text-dark-400 hover:text-white transition-colors text-sm"
              >
                연봉 계산기
              </Link>
              <Link 
                href="/"
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">2025년 최신 기준</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              퇴직금
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 계산기</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              재직기간과 월급을 입력하면 예상 퇴직금을 계산해드립니다
            </p>
          </div>

          {/* 💡 퇴직금 계산 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <p className="text-white font-medium mb-1">퇴직금 계산 팁</p>
                <p className="text-dark-400 text-sm">
                  퇴직금은 1년 이상 근무 시 발생하며, 평균임금 × 근속일수 ÷ 365로 계산됩니다.
                  평균임금에는 기본급 외 상여금, 연차수당 등이 포함됩니다!
                </p>
              </div>
            </div>
          </div>

          {/* 계산기 카드 */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            {/* 입사일 / 퇴사일 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-white font-medium mb-3">
                  입사일
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-accent-purple transition-colors"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-3">
                  퇴사일
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-accent-purple transition-colors"
                />
              </div>
            </div>

            {/* 빠른 재직기간 선택 */}
            <div className="mb-8">
              <label className="block text-dark-400 text-sm mb-3">
                빠른 재직기간 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {quickPeriodOptions.map((option) => (
                  <button
                    key={option.years}
                    onClick={() => setQuickPeriod(option.years)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white transition-all"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 월급 입력 */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">
                월 평균 급여 (세전)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatNumber(parseInt(monthlySalary) || 0)}
                  onChange={handleSalaryChange}
                  className="w-full px-4 py-4 bg-dark-800 border border-dark-700 rounded-xl text-white text-2xl font-bold focus:outline-none focus:border-accent-purple transition-colors"
                  placeholder="월급을 입력하세요"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 text-lg">
                  원
                </span>
              </div>
            </div>

            {/* 빠른 월급 선택 */}
            <div className="mb-8">
              <label className="block text-dark-400 text-sm mb-3">
                빠른 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {quickSalaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setMonthlySalary((option * 10000).toString())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      parseInt(monthlySalary) === option * 10000
                        ? "bg-accent-purple text-white"
                        : "bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white"
                    }`}
                  >
                    {option}만원
                  </button>
                ))}
              </div>
            </div>

            {/* 결과 */}
            {result && result.totalDays > 0 && (
              <div className="space-y-6">
                {/* 재직기간 표시 */}
                <div className="p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-2">재직기간</p>
                  <p className="text-white text-xl font-bold">
                    {result.years > 0 && `${result.years}년 `}
                    {result.months > 0 && `${result.months}개월 `}
                    {result.days > 0 && `${result.days}일`}
                    <span className="text-dark-400 text-sm font-normal ml-2">
                      (총 {formatNumber(result.totalDays)}일)
                    </span>
                  </p>
                </div>

                {/* 퇴직금 하이라이트 */}
                <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-xl border border-accent-purple/30">
                  <div className="text-center">
                    <p className="text-dark-300 text-sm mb-2">예상 퇴직금</p>
                    <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                      {formatNumber(result.severancePay)}원
                    </p>
                    {result.taxAmount > 0 && (
                      <p className="text-dark-400">
                        퇴직소득세 공제 후: <span className="text-white font-semibold">{formatNumber(result.netSeverance)}원</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 상세 내역 */}
                <div>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-purple rounded-full"></span>
                    계산 상세
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-dark-300">1일 평균임금</span>
                          <span className="text-white">{formatNumber(result.dailyWage)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">재직일수</span>
                          <span className="text-white">{formatNumber(result.totalDays)}일</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-300">퇴직금</span>
                          <span className="text-white font-medium">{formatNumber(result.severancePay)}원</span>
                        </div>
                      </div>
                    </div>

                    {result.taxAmount > 0 && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-red-400">퇴직소득세 (예상)</span>
                          <span className="text-red-400 font-medium">-{formatNumber(result.taxAmount)}원</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-accent-purple/10 border border-accent-purple/20 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-accent-purple font-medium">실수령 퇴직금</span>
                        <span className="text-accent-cyan font-bold text-lg">{formatNumber(result.netSeverance)}원</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1년 미만 경고 */}
                {result.totalDays < 365 && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ 재직기간이 1년 미만인 경우, 법적으로 퇴직금 지급 의무가 없을 수 있습니다.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 📋 퇴직금 정보 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>📊</span> 퇴직금 계산 공식
            </h3>
            <div className="bg-dark-800/50 p-4 rounded-lg mb-3">
              <p className="text-cyan-400 font-mono text-center">
                퇴직금 = (1일 평균임금) × 30일 × (총 근속일수 ÷ 365)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-emerald-400 font-medium">📅 지급 시기</p>
                <p className="text-dark-400 mt-1">퇴직일로부터 14일 이내</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-green-400 font-medium">💵 퇴직소득세</p>
                <p className="text-dark-400 mt-1">근속연수에 따라 공제</p>
              </div>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-3">📌 퇴직금 계산 방법</h3>
            <ul className="text-dark-400 text-sm space-y-2">
              <li>• <strong className="text-white">퇴직금</strong> = 1일 평균임금 × 30일 × (재직일수 ÷ 365)</li>
              <li>• <strong className="text-white">1일 평균임금</strong> = 최근 3개월 임금 총액 ÷ 90일</li>
              <li>• 재직기간 1년 이상 근로자에게 퇴직금 지급 의무 발생</li>
              <li>• 실제 퇴직금은 상여금, 연차수당 등에 따라 달라질 수 있습니다.</li>
            </ul>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/salary"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💰 연봉 실수령액 계산기
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

