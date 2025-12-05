"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * 상환 방식 타입
 */
type RepaymentType = "equalPrincipalInterest" | "equalPrincipal" | "bullet";

/**
 * 대출 계산 결과
 */
interface LoanResult {
  monthlyPayment: number;
  lastMonthPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  interestRatio: number;
}

/**
 * 상환 스케줄 항목
 */
interface ScheduleItem {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * 원리금균등상환 계산
 */
const calculateEqualPrincipalInterest = (
  principal: number,
  annualRate: number,
  months: number
): { result: LoanResult; schedule: ScheduleItem[] } => {
  const monthlyRate = annualRate / 100 / 12;
  
  const monthlyPayment = monthlyRate === 0 
    ? principal / months
    : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  
  const schedule: ScheduleItem[] = [];
  let balance = principal;
  let totalInterest = 0;
  
  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPart = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    
    schedule.push({
      month,
      payment: Math.round(monthlyPayment),
      principal: Math.round(principalPart),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }
  
  const totalPayment = monthlyPayment * months;
  
  return {
    result: {
      monthlyPayment: Math.round(monthlyPayment),
      lastMonthPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal,
      interestRatio: (totalInterest / principal) * 100,
    },
    schedule,
  };
};

/**
 * 원금균등상환 계산
 */
const calculateEqualPrincipal = (
  principal: number,
  annualRate: number,
  months: number
): { result: LoanResult; schedule: ScheduleItem[] } => {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPrincipal = principal / months;
  
  const schedule: ScheduleItem[] = [];
  let balance = principal;
  let totalInterest = 0;
  
  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const payment = monthlyPrincipal + interest;
    balance = Math.max(0, balance - monthlyPrincipal);
    totalInterest += interest;
    
    schedule.push({
      month,
      payment: Math.round(payment),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }
  
  const totalPayment = principal + totalInterest;
  
  return {
    result: {
      monthlyPayment: Math.round(schedule[0]?.payment || 0),
      lastMonthPayment: Math.round(schedule[schedule.length - 1]?.payment || 0),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal,
      interestRatio: (totalInterest / principal) * 100,
    },
    schedule,
  };
};

/**
 * 만기일시상환 계산
 */
const calculateBullet = (
  principal: number,
  annualRate: number,
  months: number
): { result: LoanResult; schedule: ScheduleItem[] } => {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyInterest = principal * monthlyRate;
  
  const schedule: ScheduleItem[] = [];
  
  for (let month = 1; month <= months; month++) {
    const isLastMonth = month === months;
    schedule.push({
      month,
      payment: Math.round(isLastMonth ? monthlyInterest + principal : monthlyInterest),
      principal: Math.round(isLastMonth ? principal : 0),
      interest: Math.round(monthlyInterest),
      balance: Math.round(isLastMonth ? 0 : principal),
    });
  }
  
  const totalInterest = monthlyInterest * months;
  const totalPayment = principal + totalInterest;
  
  return {
    result: {
      monthlyPayment: Math.round(monthlyInterest),
      lastMonthPayment: Math.round(monthlyInterest + principal),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal,
      interestRatio: (totalInterest / principal) * 100,
    },
    schedule,
  };
};

/**
 * 대출이자 계산기 메인 컴포넌트
 */
export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>("100000000");
  const [annualRate, setAnnualRate] = useState<string>("4.5");
  const [months, setMonths] = useState<string>("360");
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equalPrincipalInterest");
  
  const [result, setResult] = useState<LoanResult | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  
  useEffect(() => {
    const principalNum = parseInt(principal.replace(/,/g, "")) || 0;
    const rateNum = parseFloat(annualRate) || 0;
    const monthsNum = parseInt(months) || 0;
    
    if (principalNum <= 0 || rateNum < 0 || monthsNum <= 0) {
      setResult(null);
      setSchedule([]);
      return;
    }
    
    let calcResult;
    switch (repaymentType) {
      case "equalPrincipalInterest":
        calcResult = calculateEqualPrincipalInterest(principalNum, rateNum, monthsNum);
        break;
      case "equalPrincipal":
        calcResult = calculateEqualPrincipal(principalNum, rateNum, monthsNum);
        break;
      case "bullet":
        calcResult = calculateBullet(principalNum, rateNum, monthsNum);
        break;
    }
    
    setResult(calcResult.result);
    setSchedule(calcResult.schedule);
  }, [principal, annualRate, months, repaymentType]);
  
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };
  
  const handlePrincipalChange = (value: string) => {
    const numOnly = value.replace(/[^0-9]/g, "");
    setPrincipal(numOnly);
  };
  
  const quickAmounts = [
    { label: "5천만", value: "50000000" },
    { label: "1억", value: "100000000" },
    { label: "2억", value: "200000000" },
    { label: "3억", value: "300000000" },
    { label: "5억", value: "500000000" },
  ];
  
  const quickPeriods = [
    { label: "1년", value: "12" },
    { label: "3년", value: "36" },
    { label: "5년", value: "60" },
    { label: "10년", value: "120" },
    { label: "20년", value: "240" },
    { label: "30년", value: "360" },
  ];

  return (
    <main className="min-h-screen py-12 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-block mb-6 text-dark-400 hover:text-white transition-colors"
          >
            ← 메인으로
          </Link>
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-4">
            <span className="text-green-400 text-sm font-medium">🏦 대출이자 계산기</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">대출이자</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"> 계산기</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            상환방식별 월 상환금액과 총 이자를 계산해보세요!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 섹션 */}
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📝</span> 대출 정보 입력
            </h2>
            
            {/* 대출 원금 */}
            <div className="mb-6">
              <label className="block text-dark-300 text-sm mb-2">대출 원금</label>
              <div className="relative">
                <input
                  type="text"
                  value={parseInt(principal || "0").toLocaleString("ko-KR")}
                  onChange={(e) => handlePrincipalChange(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="대출 금액 입력"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">원</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setPrincipal(item.value)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      principal === item.value
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
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
                  max="30"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="연이자율 입력"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400">%</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {["3.0", "3.5", "4.0", "4.5", "5.0", "6.0"].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setAnnualRate(rate)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      annualRate === rate
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : "bg-dark-800 text-dark-400 hover:text-white border border-dark-700"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
            
            {/* 대출 기간 */}
            <div className="mb-6">
              <label className="block text-dark-300 text-sm mb-2">대출 기간 (개월)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="대출 기간 입력"
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
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : "bg-dark-800 text-dark-400 hover:text-white border border-dark-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 상환 방식 */}
            <div className="mb-6">
              <label className="block text-dark-300 text-sm mb-2">상환 방식</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setRepaymentType("equalPrincipalInterest")}
                  className={`p-3 rounded-xl text-left transition-all ${
                    repaymentType === "equalPrincipalInterest"
                      ? "bg-green-500/20 border-2 border-green-500"
                      : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                  }`}
                >
                  <div className="font-medium text-white">원리금균등상환</div>
                  <div className="text-xs text-dark-400 mt-1">매월 동일한 금액 상환 (원금+이자)</div>
                </button>
                <button
                  onClick={() => setRepaymentType("equalPrincipal")}
                  className={`p-3 rounded-xl text-left transition-all ${
                    repaymentType === "equalPrincipal"
                      ? "bg-green-500/20 border-2 border-green-500"
                      : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                  }`}
                >
                  <div className="font-medium text-white">원금균등상환</div>
                  <div className="text-xs text-dark-400 mt-1">매월 동일한 원금 + 잔액이자 상환</div>
                </button>
                <button
                  onClick={() => setRepaymentType("bullet")}
                  className={`p-3 rounded-xl text-left transition-all ${
                    repaymentType === "bullet"
                      ? "bg-green-500/20 border-2 border-green-500"
                      : "bg-dark-800 border border-dark-700 hover:border-dark-600"
                  }`}
                >
                  <div className="font-medium text-white">만기일시상환</div>
                  <div className="text-xs text-dark-400 mt-1">매월 이자만 납부, 만기에 원금 상환</div>
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
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="text-dark-400 text-sm mb-1">
                    {repaymentType === "equalPrincipal" ? "첫 달 상환금액" : "월 상환금액"}
                  </div>
                  <div className="text-3xl font-bold text-green-400">
                    {formatNumber(result.monthlyPayment)}
                    <span className="text-lg text-dark-400 ml-1">원</span>
                  </div>
                  {repaymentType === "equalPrincipal" && (
                    <div className="text-sm text-dark-400 mt-2">
                      마지막 달: <span className="text-white">{formatNumber(result.lastMonthPayment)}원</span>
                    </div>
                  )}
                  {repaymentType === "bullet" && (
                    <div className="text-sm text-dark-400 mt-2">
                      만기 시: <span className="text-white">{formatNumber(result.lastMonthPayment)}원</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-dark-800/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-dark-700">
                    <span className="text-dark-400">대출 원금</span>
                    <span className="text-white font-medium">{formatNumber(result.principal)}원</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-dark-700">
                    <span className="text-dark-400">총 이자</span>
                    <span className="text-red-400 font-medium">{formatNumber(result.totalInterest)}원</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-dark-700">
                    <span className="text-dark-400">총 상환금액</span>
                    <span className="text-white font-bold text-lg">{formatNumber(result.totalPayment)}원</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-dark-400">이자 비율</span>
                    <span className="text-yellow-400 font-medium">{result.interestRatio.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="bg-dark-800/50 rounded-xl p-4">
                  <div className="text-sm text-dark-400 mb-3">원금 vs 이자 비율</div>
                  <div className="h-6 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                      style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
                    />
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-400 transition-all duration-500"
                      style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-green-400">원금 {((result.principal / result.totalPayment) * 100).toFixed(1)}%</span>
                    <span className="text-red-400">이자 {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="w-full py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl transition-colors"
                >
                  {showSchedule ? "📉 상환 스케줄 접기" : "📈 상환 스케줄 보기"}
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-dark-400">
                <p className="text-5xl mb-4">🏦</p>
                <p>대출 정보를 입력하면<br />결과가 표시됩니다</p>
              </div>
            )}
          </div>
        </div>

        {/* 상환 스케줄 테이블 */}
        {showSchedule && schedule.length > 0 && (
          <div className="glass-card p-6 rounded-2xl mt-8">
            <h3 className="text-lg font-bold text-white mb-4">📅 월별 상환 스케줄</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="py-3 px-2 text-left text-dark-400">회차</th>
                    <th className="py-3 px-2 text-right text-dark-400">상환금액</th>
                    <th className="py-3 px-2 text-right text-dark-400">원금</th>
                    <th className="py-3 px-2 text-right text-dark-400">이자</th>
                    <th className="py-3 px-2 text-right text-dark-400">잔액</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(0, 12).map((item) => (
                    <tr key={item.month} className="border-b border-dark-800 hover:bg-dark-800/50">
                      <td className="py-3 px-2 text-white">{item.month}회</td>
                      <td className="py-3 px-2 text-right text-white">{formatNumber(item.payment)}원</td>
                      <td className="py-3 px-2 text-right text-green-400">{formatNumber(item.principal)}원</td>
                      <td className="py-3 px-2 text-right text-red-400">{formatNumber(item.interest)}원</td>
                      <td className="py-3 px-2 text-right text-dark-400">{formatNumber(item.balance)}원</td>
                    </tr>
                  ))}
                  {schedule.length > 24 && (
                    <tr>
                      <td colSpan={5} className="py-3 text-center text-dark-500">
                        ... {schedule.length - 24}개월 생략 ...
                      </td>
                    </tr>
                  )}
                  {schedule.length > 12 && schedule.slice(-12).map((item) => (
                    <tr key={`last-${item.month}`} className="border-b border-dark-800 hover:bg-dark-800/50">
                      <td className="py-3 px-2 text-white">{item.month}회</td>
                      <td className="py-3 px-2 text-right text-white">{formatNumber(item.payment)}원</td>
                      <td className="py-3 px-2 text-right text-green-400">{formatNumber(item.principal)}원</td>
                      <td className="py-3 px-2 text-right text-red-400">{formatNumber(item.interest)}원</td>
                      <td className="py-3 px-2 text-right text-dark-400">{formatNumber(item.balance)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 상환방식 비교 */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> 상환방식 비교
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-800/50 p-4 rounded-xl">
              <div className="text-green-400 font-medium mb-2">원리금균등상환</div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>✓ 매월 동일 금액 상환</li>
                <li>✓ 예산 계획 수립 용이</li>
                <li>✗ 초기 이자 비중 높음</li>
              </ul>
            </div>
            <div className="bg-dark-800/50 p-4 rounded-xl">
              <div className="text-blue-400 font-medium mb-2">원금균등상환</div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>✓ 총 이자 가장 적음</li>
                <li>✓ 시간 갈수록 부담 감소</li>
                <li>✗ 초기 상환 부담 큼</li>
              </ul>
            </div>
            <div className="bg-dark-800/50 p-4 rounded-xl">
              <div className="text-purple-400 font-medium mb-2">만기일시상환</div>
              <ul className="text-sm text-dark-400 space-y-1">
                <li>✓ 월 부담 가장 적음</li>
                <li>✓ 단기 자금 운용에 유리</li>
                <li>✗ 총 이자 가장 많음</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 다른 도구 */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <h3 className="text-white font-medium mb-4">🔗 다른 계산기</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
              💰 연봉 실수령액 계산기
            </Link>
            <Link href="/severance" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
              💼 퇴직금 계산기
            </Link>
            <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
              ⚡ 반응속도 테스트
            </Link>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 text-center text-dark-500 text-sm">
          <p>
            Powered by{" "}
            <Link href="/" className="text-accent-purple hover:text-accent-cyan transition-colors">
              SLOX
            </Link>
          </p>
          <p className="mt-1">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
        </footer>
      </div>
    </main>
  );
}

