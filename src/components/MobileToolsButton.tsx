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

export default function MobileToolsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleClick = () => {
    setIsOpen(true);
    setShowHint(false);
    localStorage.setItem("toolsHintSeen", "true");
  };

  return (
    <>
      {/* 손가락 + 버튼 컨테이너 - 함께 플로팅 */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        {/* 손가락 포인터 - 버튼 왼쪽 위에서 통통 찌르기 (삼성 인터넷 호환) */}
        {showHint && !isOpen && (
          <div className="absolute -top-8 -left-4 pointer-events-none z-50">
            <span className="animate-poke-finger text-3xl">
              👆
            </span>
          </div>
        )}

        {/* 플로팅 버튼 */}
        <button
          onClick={handleClick}
          className={`w-14 h-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ${
            showHint && !isOpen ? "animate-pulse-gentle ring-4 ring-purple-400/50 ring-opacity-50" : ""
          }`}
          aria-label="무료 도구 열기"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-900 rounded-t-3xl border-t border-white/10 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        {/* 핸들 바 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-dark-700 rounded-full" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-white/[0.05]">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            🛠️ 무료 도구
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 카테고리별 도구 리스트 */}
        <div className="p-4 pb-8 overflow-y-auto" style={{ maxHeight: "calc(85vh - 100px)" }}>
          {toolCategories.map((category, index) => (
            <div key={category.name} className={`${index !== 0 ? "mt-6 pt-5 border-t border-white/[0.06]" : ""}`}>
              {/* 카테고리 헤더 */}
              <h4 className={`text-xs font-semibold mb-3 px-1 flex items-center gap-2 ${
                category.color === "purple" ? "text-purple-400" :
                category.color === "emerald" ? "text-emerald-400" :
                category.color === "blue" ? "text-blue-400" :
                category.color === "cyan" ? "text-cyan-400" :
                "text-pink-400"
              }`}>
                {category.name}
                <span className="text-dark-600 text-[10px] font-normal">({category.tools.length})</span>
              </h4>
              
              {/* 도구 그리드 */}
              <div className="grid grid-cols-2 gap-2">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center gap-2 p-3 bg-dark-800/50 hover:bg-dark-800 border rounded-xl transition-all active:scale-95 ${
                      tool.best ? "border-purple-500/50 bg-purple-500/10" : "border-white/[0.05] hover:border-white/[0.1]"
                    }`}
                  >
                    {tool.best && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold rounded-full shadow-lg">
                        BEST
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[9px] font-bold rounded-full shadow-lg">
                        NEW
                      </span>
                    )}
                    <span className="text-lg flex-shrink-0">{tool.emoji}</span>
                    <span className="text-xs font-medium text-white leading-tight">{tool.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* SLOX 홍보 */}
          <div className="mt-4 text-center">
            <p className="text-dark-500 text-xs">
              Powered by <span className="text-purple-400 font-medium">SLOX</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
