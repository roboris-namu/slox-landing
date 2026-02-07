"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 섹션 - 글로벌 게임 플랫폼
 * 심플하고 임팩트 있는 첫 인상
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[90dvh] flex items-center justify-center relative pt-20"
    >
      {/* 배경 - 단일 글로우만 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-indigo-500/8 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* 브랜드 */}
          <div className="animate-on-scroll mb-6">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-white leading-none">
              SLOX
            </h1>
          </div>

          {/* 태그라인 */}
          <div className="animate-on-scroll mb-5" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl md:text-3xl font-medium text-white/50 tracking-tight">
              Play · Compete · Rank
            </p>
          </div>

          {/* 서브 카피 */}
          <div className="animate-on-scroll mb-14" style={{ animationDelay: "0.15s" }}>
            <p className="text-sm md:text-base text-white/25 max-w-sm">
              Free games & tools for everyone, everywhere.
            </p>
          </div>

          {/* CTA */}
          <div className="animate-on-scroll" style={{ animationDelay: "0.25s" }}>
            <a
              href="#games"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-950 font-bold text-sm rounded-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
            >
              Start Playing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* 숫자 지표 */}
          <div className="animate-on-scroll mt-20" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-10 md:gap-16">
              {[
                { value: "24+", label: "Free Tools" },
                { value: "8", label: "Languages" },
                { value: "Live", label: "Global Ranking" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] md:text-xs text-white/25 mt-1 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
