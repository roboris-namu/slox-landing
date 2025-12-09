"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// 카테고리별 도구 분류
const toolCategories = [
  {
    name: "게임 & 테스트",
    icon: "🎮",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    tools: [
      { href: "/reaction", emoji: "⚡", label: "반응속도 테스트", desc: "당신의 반응속도는 몇 ms?", best: true },
      { href: "/cps", emoji: "🖱️", label: "CPS 테스트", desc: "초당 클릭 속도 측정", best: true },
      { href: "/typing", emoji: "⌨️", label: "타자 테스트", desc: "타자 속도와 정확도" },
      { href: "/aim", emoji: "🎯", label: "에임 트레이너", desc: "마우스 정확도 훈련" },
      { href: "/memory", emoji: "🧠", label: "숫자 기억 게임", desc: "기억력 테스트" },
      { href: "/color", emoji: "🎨", label: "색상 찾기 게임", desc: "색상 구별 능력" },
      { href: "/card-match", emoji: "🃏", label: "카드 짝 맞추기", desc: "집중력 & 기억력" },
    ],
  },
  {
    name: "금융 계산기",
    icon: "💰",
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    tools: [
      { href: "/salary", emoji: "💵", label: "연봉 계산기", desc: "실수령액 바로 계산", best: true },
      { href: "/severance", emoji: "💼", label: "퇴직금 계산기", desc: "퇴직금 예상 금액" },
      { href: "/loan", emoji: "🏦", label: "대출이자 계산기", desc: "대출 이자 계산" },
      { href: "/savings", emoji: "🏧", label: "적금이자 계산기", desc: "적금 만기 금액" },
    ],
  },
  {
    name: "생활 계산기",
    icon: "🧮",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    tools: [
      { href: "/bmi", emoji: "⚖️", label: "BMI 계산기", desc: "건강한 체중 확인", isNew: true },
      { href: "/dday", emoji: "📅", label: "D-day 계산기", desc: "날짜 계산", isNew: true },
      { href: "/age", emoji: "🎂", label: "나이 계산기", desc: "만 나이 & 한국 나이", isNew: true },
      { href: "/percent", emoji: "🔢", label: "퍼센트 계산기", desc: "퍼센트 간편 계산" },
    ],
  },
  {
    name: "유틸리티",
    icon: "🛠️",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    tools: [
      { href: "/character-count", emoji: "✍️", label: "글자수 세기", desc: "글자/단어/바이트 수", isNew: true },
      { href: "/qr", emoji: "📱", label: "QR코드 생성기", desc: "무료 QR코드 생성", isNew: true },
      { href: "/password", emoji: "🔐", label: "비밀번호 생성기", desc: "안전한 비밀번호", isNew: true },
      { href: "/random", emoji: "🎲", label: "랜덤 뽑기", desc: "무작위 선택" },
      { href: "/lotto", emoji: "🎰", label: "로또 번호 생성기", desc: "행운의 번호", isNew: true },
    ],
  },
  {
    name: "심리 테스트",
    icon: "🎭",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    tools: [
      { href: "/slox-test", emoji: "🐂", label: "나와 닮은 황소", desc: "SLOX 캐릭터 테스트" },
    ],
  },
];

export default function ToolsPage() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const totalTools = toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <div ref={sectionRef} className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-5xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-glass">
            <div className="flex items-center justify-between h-16 px-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
              </Link>
              <Link 
                href="/" 
                className="text-dark-300 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-purple-500/20 via-indigo-500/5 to-transparent blur-3xl" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* 뱃지 */}
          <div className="animate-on-scroll mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-full text-sm font-medium text-white/80 border border-white/[0.08]">
              <span className="text-lg">🎁</span>
              회원가입 없이 무료
            </span>
          </div>

          {/* 타이틀 */}
          <h1 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ animationDelay: "0.1s" }}>
            무료 도구 <span className="gradient-text-safe">{totalTools}종</span>
          </h1>
          
          <p className="animate-on-scroll text-dark-400 text-lg max-w-lg mx-auto mb-8" style={{ animationDelay: "0.2s" }}>
            게임, 계산기, 유틸리티까지<br className="sm:hidden" /> 다양한 도구를 무료로 이용하세요
          </p>

          {/* 카테고리 퀵링크 */}
          <div className="animate-on-scroll flex flex-wrap justify-center gap-2" style={{ animationDelay: "0.3s" }}>
            {toolCategories.map((cat) => (
              <a
                key={cat.name}
                href={`#${cat.color}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 ${
                  cat.color === "purple" ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" :
                  cat.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" :
                  cat.color === "blue" ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" :
                  cat.color === "cyan" ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20" :
                  "bg-pink-500/10 text-pink-400 hover:bg-pink-500/20"
                }`}
              >
                {cat.icon} {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리별 도구 */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {toolCategories.map((category, catIndex) => (
            <div key={category.name} id={category.color} className="scroll-mt-28">
              {/* 카테고리 헤더 */}
              <div className="animate-on-scroll flex items-center gap-3 mb-6" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                  <p className="text-dark-500 text-sm">{category.tools.length}개 도구</p>
                </div>
              </div>

              {/* 도구 그리드 */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="animate-on-scroll group"
                    style={{ animationDelay: `${catIndex * 0.1 + toolIndex * 0.05}s` }}
                  >
                    <div className={`relative glass-card p-5 h-full transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1 group-active:scale-95 ${
                      tool.best ? "ring-1 ring-purple-500/30" : ""
                    }`}>
                      {/* 배지 */}
                      {tool.best && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                          BEST
                        </span>
                      )}
                      {tool.isNew && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                          NEW
                        </span>
                      )}

                      <div className="flex items-start gap-4">
                        {/* 아이콘 */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{tool.emoji}</span>
                        </div>

                        {/* 텍스트 */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold mb-1 group-hover:text-white transition-colors">
                            {tool.label}
                          </h3>
                          <p className="text-dark-400 text-sm group-hover:text-dark-300 transition-colors">
                            {tool.desc}
                          </p>
                        </div>

                        {/* 화살표 */}
                        <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-on-scroll glass-card p-8 md:p-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              원하는 도구가 없나요?
            </h3>
            <p className="text-dark-400 mb-6">
              필요한 도구를 요청해 주세요. 검토 후 추가해 드릴게요!
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:-translate-y-0.5"
            >
              도구 요청하기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 px-4 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-dark-400 text-sm">© 2025 SLOX. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
              회사소개
            </Link>
            <Link href="/privacy" className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

