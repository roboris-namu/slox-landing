"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface DdayResult {
  days: number;
  weeks: number;
  months: number;
  hours: number;
  minutes: number;
  isPast: boolean;
  weekday: string;
}

const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

export default function DdayCalculator() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [eventName, setEventName] = useState<string>("");

  const result = useMemo<DdayResult | null>(() => {
    if (!targetDate) return null;

    const target = new Date(targetDate + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    const absDays = Math.abs(diffDays);
    const weeks = Math.floor(absDays / 7);
    const months = Math.floor(absDays / 30);

    return {
      days: diffDays,
      weeks,
      months,
      hours: Math.abs(diffHours),
      minutes: Math.abs(diffMinutes),
      isPast: diffDays < 0,
      weekday: weekdays[target.getDay()],
    };
  }, [targetDate]);

  // 빠른 선택 날짜들
  const quickDates = useMemo(() => {
    const dates = [];
    const t = new Date();

    // 내일
    const tomorrow = new Date(t);
    tomorrow.setDate(t.getDate() + 1);
    dates.push({ label: "내일", date: tomorrow });

    // 1주일 후
    const oneWeek = new Date(t);
    oneWeek.setDate(t.getDate() + 7);
    dates.push({ label: "1주일 후", date: oneWeek });

    // 1개월 후
    const oneMonth = new Date(t);
    oneMonth.setMonth(t.getMonth() + 1);
    dates.push({ label: "1개월 후", date: oneMonth });

    // 100일 후
    const hundredDays = new Date(t);
    hundredDays.setDate(t.getDate() + 100);
    dates.push({ label: "100일 후", date: hundredDays });

    // 1년 후
    const oneYear = new Date(t);
    oneYear.setFullYear(t.getFullYear() + 1);
    dates.push({ label: "1년 후", date: oneYear });

    // 올해 크리스마스
    const christmas = new Date(t.getFullYear(), 11, 25);
    if (christmas < t) christmas.setFullYear(t.getFullYear() + 1);
    dates.push({ label: "크리스마스", date: christmas });

    // 올해/내년 새해
    const newYear = new Date(t.getFullYear() + 1, 0, 1);
    dates.push({ label: "새해", date: newYear });

    return dates;
  }, []);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const getDdayText = () => {
    if (!result) return "";
    if (result.days === 0) return "D-Day";
    if (result.days > 0) return `D-${result.days}`;
    return `D+${Math.abs(result.days)}`;
  };

  const copyToClipboard = () => {
    const text = eventName 
      ? `${eventName}: ${getDdayText()} (${targetDate} ${result?.weekday})`
      : `${getDdayText()} (${targetDate} ${result?.weekday})`;
    navigator.clipboard.writeText(text);
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
            <div className="flex items-center space-x-4">
              <Link href="/salary" className="text-dark-400 hover:text-white transition-colors text-sm">
                💰 연봉 계산기
              </Link>
              <Link href="/bmi" className="text-dark-400 hover:text-white transition-colors text-sm">
                ⚖️ BMI 계산기
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="text-amber-400 text-sm font-medium">📅 D-day 계산기</span>
              <span className="px-1.5 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">D-day 계산기</h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              특정 날짜까지 남은 일수, 지난 일수를 계산하세요.
            </p>
          </div>

          {/* 입력 폼 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="mb-6">
              <label className="block text-dark-300 text-sm font-medium mb-2">
                이벤트 이름 (선택)
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="예: 결혼기념일, 수능, 여행 출발일"
                className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-dark-300 text-sm font-medium mb-2">
                날짜 선택
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm font-medium mb-2">
                빠른 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {quickDates.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setTargetDate(formatDate(item.date))}
                    className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 결과 */}
          {result && (
            <div className="glass-card p-6 rounded-xl mb-8">
              {eventName && (
                <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">{eventName}</h2>
              )}

              {/* D-day 대형 표시 */}
              <div className="text-center mb-8">
                <div className={`text-7xl font-bold mb-2 ${
                  result.days === 0 
                    ? "text-green-400" 
                    : result.isPast 
                      ? "text-blue-400" 
                      : "text-amber-400"
                }`}>
                  {getDdayText()}
                </div>
                <div className="text-dark-400 text-lg">
                  {targetDate.replace(/-/g, ".")} ({result.weekday})
                </div>
                {result.days === 0 && (
                  <div className="mt-4 text-2xl">🎉 오늘입니다! 🎉</div>
                )}
              </div>

              {/* 상세 정보 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">일</p>
                  <p className="text-white text-2xl font-bold">{Math.abs(result.days).toLocaleString()}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">주</p>
                  <p className="text-white text-2xl font-bold">{result.weeks.toLocaleString()}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">시간</p>
                  <p className="text-white text-2xl font-bold">{result.hours.toLocaleString()}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">분</p>
                  <p className="text-white text-2xl font-bold">{result.minutes.toLocaleString()}</p>
                </div>
              </div>

              {/* 복사 버튼 */}
              <div className="text-center">
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-all"
                >
                  📋 결과 복사하기
                </button>
              </div>
            </div>
          )}

          {/* 날짜 계산 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">📌 D-day 표기 방식</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                <h4 className="text-amber-400 font-semibold mb-2">D-N (미래)</h4>
                <p className="text-dark-300 text-sm">
                  목표 날짜까지 N일 남았음을 의미합니다.<br/>
                  예: D-30 = 30일 남음
                </p>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                <h4 className="text-blue-400 font-semibold mb-2">D+N (과거)</h4>
                <p className="text-dark-300 text-sm">
                  목표 날짜로부터 N일 지났음을 의미합니다.<br/>
                  예: D+100 = 100일 지남
                </p>
              </div>
            </div>
          </div>

          {/* 활용 예시 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">💡 활용 예시</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">💑</div>
                <p className="text-dark-300 text-sm">연인 기념일</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">📚</div>
                <p className="text-dark-300 text-sm">시험/수능</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">✈️</div>
                <p className="text-dark-300 text-sm">여행 출발</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">🎂</div>
                <p className="text-dark-300 text-sm">생일</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">💼</div>
                <p className="text-dark-300 text-sm">프로젝트 마감</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">🏋️</div>
                <p className="text-dark-300 text-sm">운동 목표</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">🎄</div>
                <p className="text-dark-300 text-sm">크리스마스</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <div className="text-2xl mb-1">🎊</div>
                <p className="text-dark-300 text-sm">새해</p>
              </div>
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">💰 연봉 계산기</Link>
              <Link href="/bmi" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚖️ BMI 계산기</Link>
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

