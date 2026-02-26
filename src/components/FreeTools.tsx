"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * 게임 & 도구 섹션 - 심플 그리드
 */

const games = [
  { href: "/reaction", emoji: "⚡", title: "반응속도 테스트", desc: "당신의 반응속도는?", accent: "amber" },
  { href: "/cps", emoji: "🖱️", title: "CPS 테스트", desc: "초당 클릭 수", accent: "blue" },
  { href: "/typing", emoji: "⌨️", title: "타이핑 테스트", desc: "분당 타자 수", accent: "purple" },
  { href: "/quiz", emoji: "📚", title: "상식 퀴즈", desc: "당신의 상식은?", accent: "green" },
  { href: "/iq", emoji: "🧩", title: "IQ 테스트", desc: "패턴 분석 능력", accent: "pink" },
  { href: "/sudoku", emoji: "🔢", title: "스도쿠", desc: "숫자 퍼즐", accent: "cyan" },
  { href: "/color", emoji: "🎨", title: "색깔 찾기", desc: "다른 색을 찾아라", accent: "violet" },
  { href: "/card-match", emoji: "🃏", title: "카드 맞추기", desc: "카드 기억력 게임", accent: "rose" },
  { href: "/aim", emoji: "🎯", title: "에임 트레이너", desc: "정확도 훈련", accent: "red" },
  { href: "/memory", emoji: "🧠", title: "기억력 테스트", desc: "숫자 기억력", accent: "indigo" },
];

const tools = [
  { href: "/salary", emoji: "💰", title: "연봉 계산기" },
  { href: "/bmi", emoji: "⚖️", title: "BMI 계산기" },
  { href: "/qr", emoji: "📱", title: "QR 생성기" },
  { href: "/password", emoji: "🔐", title: "비밀번호 생성" },
  { href: "/random", emoji: "🎲", title: "랜덤 뽑기" },
  { href: "/fortune", emoji: "🔮", title: "오늘의 운세" },
  { href: "/dday", emoji: "📅", title: "디데이 계산기" },
  { href: "/character-count", emoji: "✍️", title: "글자수 세기" },
  { href: "/age", emoji: "🎂", title: "나이 계산기" },
  { href: "/percent", emoji: "📊", title: "퍼센트 계산" },
  { href: "/lotto", emoji: "🎰", title: "로또 번호 생성" },
  { href: "/quote", emoji: "💬", title: "오늘의 명언" },
  { href: "/severance", emoji: "💼", title: "퇴직금 계산" },
  { href: "/savings", emoji: "🏧", title: "적금 계산기" },
];

// 게임별 그라데이션 색상 매핑
const accentStyles: Record<string, string> = {
  amber: "hover:border-amber-500/30 hover:bg-amber-500/5",
  blue: "hover:border-blue-500/30 hover:bg-blue-500/5",
  purple: "hover:border-purple-500/30 hover:bg-purple-500/5",
  green: "hover:border-green-500/30 hover:bg-green-500/5",
  pink: "hover:border-pink-500/30 hover:bg-pink-500/5",
  cyan: "hover:border-cyan-500/30 hover:bg-cyan-500/5",
  violet: "hover:border-violet-500/30 hover:bg-violet-500/5",
  rose: "hover:border-rose-500/30 hover:bg-rose-500/5",
  red: "hover:border-red-500/30 hover:bg-red-500/5",
  indigo: "hover:border-indigo-500/30 hover:bg-indigo-500/5",
};

export default function FreeTools() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-6">

        {/* ===== Games ===== */}
        <div id="games" className="mb-20 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-2">
              게임
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              전 세계 유저와 경쟁하고 랭킹에 도전하세요.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {games.map((game, i) => (
              <Link
                key={game.href}
                href={game.href}
                className={`animate-on-scroll group relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 ${accentStyles[game.accent]}`}
                style={{ animationDelay: `${0.04 * i}s` }}
              >
                <span className="text-3xl block mb-3">{game.emoji}</span>
                <h3 className="font-semibold text-white text-sm mb-0.5">{game.title}</h3>
                <p className="text-[11px] text-white/30">{game.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== Tools ===== */}
        <div id="tools" className="scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="animate-on-scroll text-2xl md:text-3xl font-bold text-white mb-2">
              도구
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              계산기, 생성기 등 — 모두 무료
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {tools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="animate-on-scroll group flex items-center gap-2.5 px-3 py-3 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
                style={{ animationDelay: `${0.02 * i}s` }}
              >
                <span className="text-base flex-shrink-0">{tool.emoji}</span>
                <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors truncate">
                  {tool.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
