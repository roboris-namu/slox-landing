"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero 섹션 컴포넌트
 * - 프리미엄 다크 테마 디자인
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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
    >
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 메인 글로우 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent-500/20 via-indigo-500/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent blur-3xl" />
        
        {/* 오브 효과 */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent-400 rounded-full animate-pulse-slow opacity-60" />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-slow opacity-50" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse-slow opacity-40" style={{ animationDelay: "2s" }} />
      </div>

      <div className="section-container relative z-10 pt-24">
        <div className="flex flex-col items-center text-center">
          
          {/* 로고 영역 */}
          <div className="animate-on-scroll mb-10">
            <div className="relative w-72 h-28 md:w-80 md:h-32 lg:w-[360px] lg:h-36 mx-auto">
              <Image
                src="/logo.svg"
                alt="SLOX"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* 프리미엄 뱃지 */}
          <div
            className="animate-on-scroll mb-10"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.05] backdrop-blur-xl rounded-full text-sm font-medium text-dark-200 border border-white/[0.08] shadow-glass">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              작지만 강한 개발 스튜디오
            </span>
          </div>

          {/* 메인 타이틀 */}
          <div
            className="animate-on-scroll mb-6"
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-[2.75rem] md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              홈페이지 · 앱 제작
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent">
                AI 챗봇 구축
              </span>
            </h1>
          </div>

          {/* 서브 카피 */}
          <div
            className="animate-on-scroll mb-14"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-lg md:text-xl text-dark-300 max-w-lg leading-relaxed">
              아이디어를 현실로 만들어 드립니다
            </p>
          </div>

          {/* CTA 버튼 */}
          <div
            className="animate-on-scroll flex flex-col sm:flex-row gap-4 mb-24"
            style={{ animationDelay: "0.4s" }}
          >
            <button 
              onClick={scrollToContact} 
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-accent-500 to-cyan-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-glow-md hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                무료 상담 받기
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {/* 호버 시 빛나는 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-accent-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <a 
              href="#" 
              className="group px-8 py-4 bg-[#FEE500] text-[#1A1A1A] font-semibold rounded-2xl transition-all duration-300 hover:bg-[#FFE94A] hover:shadow-[0_8px_30px_rgba(254,229,0,0.25)] hover:-translate-y-1 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
                </svg>
                카카오톡 문의
              </span>
            </a>
          </div>

          {/* 신뢰 지표 - 프리미엄 스타일 */}
          <div
            className="animate-on-scroll"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center justify-center gap-10 md:gap-20">
              {[
                { value: "50+", label: "프로젝트" },
                { value: "98%", label: "만족도" },
                { value: "24h", label: "응답" },
              ].map((stat, index) => (
                <div key={index} className="relative text-center group">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-dark-200 bg-clip-text text-transparent tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-dark-400 mt-1.5 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  {/* 구분선 (마지막 제외) */}
                  {index < 2 && (
                    <div className="absolute -right-5 md:-right-10 top-1/2 -translate-y-1/2 w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
