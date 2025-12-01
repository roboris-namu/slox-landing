"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const tools = [
  { href: "/salary", emoji: "💰", label: "연봉 계산기" },
  { href: "/severance", emoji: "💼", label: "퇴직금 계산기" },
  { href: "/typing", emoji: "⌨️", label: "타자 테스트" },
  { href: "/reaction", emoji: "⚡", label: "반응속도 테스트" },
  { href: "/cps", emoji: "🖱️", label: "CPS 테스트" },
  { href: "/aim", emoji: "🎯", label: "에임 트레이너" },
  { href: "/memory", emoji: "🧠", label: "숫자 기억 게임" },
];

export default function MobileToolsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 데스크톱에서는 렌더링 안함
  if (!isMobile) return null;

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-indigo-500 via-accent-500 to-cyan-500 rounded-full shadow-lg shadow-accent-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="무료 도구 열기"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-dark-900 rounded-t-3xl border-t border-white/10 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
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

        {/* 도구 리스트 */}
        <div className="p-4 pb-8 overflow-y-auto" style={{ maxHeight: "calc(80vh - 100px)" }}>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-4 bg-dark-800/50 hover:bg-dark-800 border border-white/[0.05] hover:border-accent-500/30 rounded-xl transition-all active:scale-95"
              >
                <span className="text-2xl">{tool.emoji}</span>
                <span className="text-sm font-medium text-white">{tool.label}</span>
              </Link>
            ))}
          </div>

          {/* SLOX 홍보 */}
          <div className="mt-6 text-center">
            <p className="text-dark-500 text-xs">
              Powered by <span className="text-accent-400 font-medium">SLOX</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

