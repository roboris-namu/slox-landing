"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 카테고리별 도구 분류
const toolCategories = [
  {
    name: "🎮 게임 & 테스트",
    color: "purple",
    tools: [
      { href: "/reaction", emoji: "⚡", label: "반응속도 테스트", best: true },
      { href: "/cps", emoji: "🖱️", label: "CPS 테스트", best: true },
      { href: "/typing", emoji: "⌨️", label: "타자 테스트" },
      { href: "/aim", emoji: "🎯", label: "에임 트레이너" },
      { href: "/memory", emoji: "🧠", label: "숫자 기억 게임" },
      { href: "/color", emoji: "🎨", label: "색상 찾기 게임" },
      { href: "/card-match", emoji: "🃏", label: "카드 짝 맞추기" },
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
      { href: "/bmi", emoji: "⚖️", label: "BMI 계산기", isNew: true },
      { href: "/dday", emoji: "📅", label: "D-day 계산기", isNew: true },
      { href: "/age", emoji: "🎂", label: "나이 계산기", isNew: true },
      { href: "/percent", emoji: "🔢", label: "퍼센트 계산기" },
    ],
  },
  {
    name: "🛠️ 유틸리티",
    color: "cyan",
    tools: [
      { href: "/character-count", emoji: "✍️", label: "글자수 세기", isNew: true },
      { href: "/qr", emoji: "📱", label: "QR코드 생성기", isNew: true },
      { href: "/password", emoji: "🔐", label: "비밀번호 생성기", isNew: true },
      { href: "/random", emoji: "🎲", label: "랜덤 뽑기" },
      { href: "/lotto", emoji: "🎰", label: "로또 번호 생성기", isNew: true },
    ],
  },
  {
    name: "🎭 심리 테스트",
    color: "pink",
    tools: [
      { href: "/slox-test", emoji: "🐂", label: "나와 닮은 황소" },
    ],
  },
];

export default function DesktopToolsDropdown() {
  const [showHint, setShowHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // localStorage에서 힌트 본 적 있는지 확인
    const hintSeen = localStorage.getItem("slox_pc_tools_hint");
    if (!hintSeen) {
      // 처음 방문이면 1초 후에 힌트 표시
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleHover = () => {
    setIsHovered(true);
    if (showHint) {
      // 호버하면 잠시 후 힌트 숨기고 저장
      setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("slox_pc_tools_hint", "true");
      }, 300);
    }
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 손가락 힌트 - 왼쪽 위에서 찌르는 모양 (모바일과 동일) */}
      {showHint && !isHovered && (
        <div className="absolute -top-6 -left-6 pointer-events-none z-50">
          <div className="animate-poke-finger">
            <span className="text-2xl drop-shadow-lg inline-block" style={{ transform: "rotate(135deg)" }}>
              👆
            </span>
          </div>
        </div>
      )}

      {/* 도구 버튼 */}
      <button 
        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-1 ${
          showHint && !isHovered 
            ? "text-purple-400 bg-purple-500/10 ring-2 ring-purple-500/40 animate-pulse-gentle" 
            : "text-dark-300 hover:text-white hover:bg-white/[0.05]"
        }`}
      >
        도구
        <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* 도구 개수 배지 */}
        <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-purple-300 font-medium">
          21
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
          <div className="grid grid-cols-2 gap-4">
            {toolCategories.map((category) => (
              <div key={category.name} className={category.name === "🎭 심리 테스트" ? "col-span-2" : ""}>
                {/* 카테고리 헤더 */}
                <h4 className={`text-xs font-semibold mb-2 ${
                  category.color === "purple" ? "text-purple-400" :
                  category.color === "emerald" ? "text-emerald-400" :
                  category.color === "blue" ? "text-blue-400" :
                  category.color === "cyan" ? "text-cyan-400" :
                  "text-pink-400"
                }`}>
                  {category.name}
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
                      {tool.isNew && (
                        <span className="text-[9px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-400">NEW</span>
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

