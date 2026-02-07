"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * 게임 & 도구 섹션 - 심플 그리드
 */

const games = [
  { href: "/reaction", emoji: "⚡", title: "Reaction Test", desc: "How fast are you?", accent: "amber" },
  { href: "/cps", emoji: "🖱️", title: "CPS Test", desc: "Clicks per second", accent: "blue" },
  { href: "/typing", emoji: "⌨️", title: "Typing Test", desc: "Words per minute", accent: "purple" },
  { href: "/quiz", emoji: "📚", title: "Trivia Quiz", desc: "Test your knowledge", accent: "green" },
  { href: "/iq", emoji: "🧩", title: "IQ Test", desc: "Pattern analysis", accent: "pink" },
  { href: "/sudoku", emoji: "🔢", title: "Sudoku", desc: "Number puzzle", accent: "cyan" },
  { href: "/color", emoji: "🎨", title: "Color Finder", desc: "Find the odd one", accent: "violet" },
  { href: "/card-match", emoji: "🃏", title: "Card Match", desc: "Memory game", accent: "rose" },
  { href: "/aim", emoji: "🎯", title: "Aim Trainer", desc: "Precision training", accent: "red" },
  { href: "/memory", emoji: "🧠", title: "Memory Test", desc: "Number memory", accent: "indigo" },
];

const tools = [
  { href: "/salary", emoji: "💰", title: "Salary Calculator" },
  { href: "/bmi", emoji: "⚖️", title: "BMI Calculator" },
  { href: "/qr", emoji: "📱", title: "QR Generator" },
  { href: "/password", emoji: "🔐", title: "Password Gen" },
  { href: "/random", emoji: "🎲", title: "Random Picker" },
  { href: "/fortune", emoji: "🔮", title: "Daily Fortune" },
  { href: "/dday", emoji: "📅", title: "D-Day Calculator" },
  { href: "/character-count", emoji: "✍️", title: "Char Counter" },
  { href: "/age", emoji: "🎂", title: "Age Calculator" },
  { href: "/percent", emoji: "📊", title: "Percent Calc" },
  { href: "/lotto", emoji: "🎰", title: "Lotto Generator" },
  { href: "/quote", emoji: "💬", title: "Daily Quote" },
  { href: "/severance", emoji: "💼", title: "Severance Calc" },
  { href: "/savings", emoji: "🏧", title: "Savings Calc" },
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
              Games
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              Compete with players worldwide. Climb the leaderboard.
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
              Tools
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              Calculators, generators & more — all free.
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
