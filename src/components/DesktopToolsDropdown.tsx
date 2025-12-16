"use client";

import { useState } from "react";
import Link from "next/link";

// 도구 타입 정의
interface Tool {
  href: string;
  emoji: string;
  label: string;
  best?: boolean;
  isNew?: boolean;
  event?: boolean; // 이벤트 진행 중
}

interface ToolCategory {
  name: string;
  color: string;
  tools: Tool[];
}

// 카테고리별 도구 분류
const toolCategories: ToolCategory[] = [
  {
    name: "🎮 게임 & 테스트",
    color: "purple",
    tools: [
      { href: "/reaction", emoji: "⚡", label: "반응속도 테스트", best: true, event: true },
      { href: "/quiz", emoji: "📚", label: "상식 퀴즈", isNew: true },
      { href: "/iq", emoji: "🧩", label: "IQ 테스트", isNew: true },
      { href: "/sudoku", emoji: "🔢", label: "스도쿠", isNew: true },
      { href: "/color", emoji: "🎨", label: "색상 찾기 게임" },
      { href: "/card-match", emoji: "🃏", label: "카드 짝 맞추기" },
      { href: "/cps", emoji: "🖱️", label: "CPS 테스트" },
      { href: "/typing", emoji: "⌨️", label: "타자 테스트" },
      { href: "/aim", emoji: "🎯", label: "에임 트레이너" },
      { href: "/memory", emoji: "🧠", label: "숫자 기억 게임" },
    ],
  },
  {
    name: "💰 금융 계산기",
    color: "emerald",
    tools: [
      { href: "/salary", emoji: "💵", label: "연봉 계산기", best: true },
      { href: "/severance", emoji: "💼", label: "퇴직금 계산기" },
      { href: "/loan", emoji: "🏦", label: "대출이자 계산기" },
      { href: "/savings", emoji: "🏧", label: "적금이자 계산기" },
    ],
  },
  {
    name: "🧮 생활 계산기",
    color: "blue",
    tools: [
      { href: "/bmi", emoji: "⚖️", label: "BMI 계산기" },
      { href: "/dday", emoji: "📅", label: "D-day 계산기" },
      { href: "/age", emoji: "🎂", label: "나이 계산기" },
      { href: "/percent", emoji: "🔢", label: "퍼센트 계산기" },
    ],
  },
  {
    name: "🛠️ 유틸리티",
    color: "cyan",
    tools: [
      { href: "/character-count", emoji: "✍️", label: "글자수 세기" },
      { href: "/qr", emoji: "📱", label: "QR코드 생성기" },
      { href: "/password", emoji: "🔐", label: "비밀번호 생성기" },
      { href: "/random", emoji: "🎲", label: "랜덤 뽑기" },
      { href: "/lotto", emoji: "🎰", label: "로또 번호 생성기" },
    ],
  },
  {
    name: "🎭 심리 테스트",
    color: "pink",
    tools: [
      { href: "/slox-test", emoji: "🐂", label: "나와 닮은 황소" },
      { href: "/fortune", emoji: "🔮", label: "오늘의 운세", isNew: true },
      { href: "/quote", emoji: "💬", label: "오늘의 명언", isNew: true },
    ],
  },
];

export default function DesktopToolsDropdown() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 손가락 힌트 - 항상 표시 (호버 시 숨김, 삼성 인터넷 호환) */}
      {!isHovered && (
        <div className="absolute -top-6 -left-6 pointer-events-none z-50">
          <span className="animate-poke-finger text-2xl">
            👆
          </span>
        </div>
      )}

      {/* 도구 버튼 */}
      <button 
        className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-1 text-dark-300 hover:text-white hover:bg-white/[0.05]"
      >
        도구
        <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* 도구 개수 배지 */}
        <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-purple-300 font-medium">
          24
        </span>
      </button>

      {/* 드롭다운 - 넓은 버전 */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-dark-900/95 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {/* 화살표 */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-900/95 border-l border-t border-white/[0.08] rotate-45" />
        
        <div className="p-4 relative">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.05]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              🛠️ 무료 도구 모음
            </h3>
            <span className="text-xs text-dark-500">클릭하여 이용하세요</span>
          </div>

          {/* 카테고리 그리드 */}
          <div className="grid grid-cols-2 gap-5">
            {toolCategories.map((category) => (
              <div key={category.name} className={`${category.name === "🎭 심리 테스트" ? "col-span-2" : ""} pb-4 border-b border-white/[0.04] last:border-0 last:pb-0`}>
                {/* 카테고리 헤더 */}
                <h4 className={`text-xs font-semibold mb-2.5 flex items-center gap-1.5 ${
                  category.color === "purple" ? "text-purple-400" :
                  category.color === "emerald" ? "text-emerald-400" :
                  category.color === "blue" ? "text-blue-400" :
                  category.color === "cyan" ? "text-cyan-400" :
                  "text-pink-400"
                }`}>
                  {category.name}
                  <span className="text-dark-600 text-[10px] font-normal">({category.tools.length})</span>
                </h4>
                
                {/* 도구 리스트 */}
                <div className={`space-y-0.5 ${category.name === "🎭 심리 테스트" ? "flex gap-2" : ""}`}>
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-lg transition-all whitespace-nowrap ${
                        tool.best 
                          ? "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-medium" 
                          : tool.isNew 
                            ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-medium"
                            : "text-dark-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="text-base">{tool.emoji}</span>
                      <span className="text-xs">{tool.label}</span>
                      {tool.best && (
                        <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-400">BEST</span>
                      )}
                      {tool.event && (
                        <span className="text-[9px] bg-gradient-to-r from-yellow-500/30 to-red-500/30 px-1.5 py-0.5 rounded text-yellow-400 animate-pulse">🎁 EVENT</span>
                      )}
                      {tool.isNew && (
                        <span className="text-[9px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-1.5 py-0.5 rounded text-pink-400 animate-pulse border border-pink-500/30">NEW</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 푸터 */}
          <div className="mt-4 pt-3 border-t border-white/[0.05] text-center">
            <p className="text-dark-500 text-xs">
              Powered by <span className="text-purple-400 font-medium">SLOX</span> · 모든 도구 무료 이용
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

