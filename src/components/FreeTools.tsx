"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// 인기 도구 (BEST + 대표적인 것들)
const popularTools = [
  {
    href: "/reaction",
    emoji: "⚡",
    title: "반응속도 테스트",
    desc: "당신의 반응속도는 몇 ms?",
    gradient: "from-yellow-500 to-orange-500",
    bgGlow: "bg-yellow-500/20",
    badge: "BEST",
    badgeColor: "from-purple-500 to-pink-500",
  },
  {
    href: "/cps",
    emoji: "🖱️",
    title: "CPS 테스트",
    desc: "초당 클릭 속도 측정",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    badge: "BEST",
    badgeColor: "from-purple-500 to-pink-500",
  },
  {
    href: "/salary",
    emoji: "💰",
    title: "연봉 계산기",
    desc: "실수령액 바로 계산",
    gradient: "from-emerald-500 to-green-500",
    bgGlow: "bg-emerald-500/20",
    badge: "BEST",
    badgeColor: "from-purple-500 to-pink-500",
  },
  {
    href: "/typing",
    emoji: "⌨️",
    title: "타자 테스트",
    desc: "타자 속도와 정확도 측정",
    gradient: "from-purple-500 to-indigo-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    href: "/bmi",
    emoji: "⚖️",
    title: "BMI 계산기",
    desc: "건강한 체중 확인",
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "bg-pink-500/20",
    badge: "NEW",
    badgeColor: "from-cyan-500 to-blue-500",
  },
  {
    href: "/qr",
    emoji: "📱",
    title: "QR코드 생성기",
    desc: "무료 QR코드 만들기",
    gradient: "from-indigo-500 to-violet-500",
    bgGlow: "bg-indigo-500/20",
    badge: "NEW",
    badgeColor: "from-cyan-500 to-blue-500",
  },
];

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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="animate-on-scroll">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-full text-sm font-medium text-white/80 border border-white/[0.08] mb-6">
              <span className="text-lg">🎁</span>
              모두 무료로 이용 가능
            </span>
          </div>
          
          <h2 className="animate-on-scroll text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text-safe">무료 도구</span> 21종
          </h2>
          
          <p className="animate-on-scroll text-dark-400 text-lg max-w-md mx-auto" style={{ animationDelay: "0.2s" }}>
            회원가입 없이 바로 사용하세요
          </p>
        </div>

        {/* 도구 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {popularTools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="animate-on-scroll group relative"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className={`absolute inset-0 ${tool.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative glass-card p-5 md:p-6 h-full glass-card-hover group-active:scale-95 transition-transform">
                {/* 배지 */}
                {tool.badge && (
                  <span className={`absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r ${tool.badgeColor} text-white text-[10px] font-bold rounded-full shadow-lg`}>
                    {tool.badge}
                  </span>
                )}

                {/* 아이콘 */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-2xl md:text-3xl">{tool.emoji}</span>
                </div>

                {/* 텍스트 */}
                <h3 className="text-white font-semibold mb-1 group-hover:text-white transition-colors">
                  {tool.title}
                </h3>
                <p className="text-dark-400 text-sm group-hover:text-dark-300 transition-colors">
                  {tool.desc}
                </p>

                {/* 화살표 */}
                <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="animate-on-scroll text-center" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            전체 도구 보기
            <span className="text-dark-400">21종</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

