"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero 섹션 컴포넌트
 * - 프리미엄 다크 테마 + 강화된 애니메이션
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-violet-500/15 via-indigo-500/5 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="section-container relative z-10 pt-24">
        <div className="flex flex-col items-center text-center">
          
          {/* 캐릭터 로고 - 더 작고 세련되게 */}
          <div className="animate-on-scroll mb-6">
            <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto">
              <Image
                src="/logo.svg"
                alt="SLOX"
                fill
                className="object-contain object-left"
                style={{ objectPosition: "0 0" }}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* 브랜드명 - 크고 임팩트있게 */}
          <div
            className="animate-on-scroll mb-6"
            style={{ animationDelay: "0.05s" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-violet-200 bg-clip-text text-transparent">
                SLOX
              </span>
            </h1>
          </div>

          {/* 프리미엄 뱃지 */}
          <div
            className="animate-on-scroll mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl rounded-full text-sm font-medium text-white/70 border border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              당신의 개발 파트너
            </span>
          </div>

          {/* 메인 타이틀 - 더 크고 임팩트있게 */}
          <div
            className="animate-on-scroll mb-6"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
              <span className="block mb-2">홈페이지 · 앱 제작</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI 챗봇 구축
                </span>
                {/* 밑줄 효과 */}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-full opacity-60"></span>
              </span>
            </h2>
          </div>

          {/* 서브 카피 */}
          <div
            className="animate-on-scroll mb-12"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-lg md:text-xl text-white/50 max-w-md leading-relaxed">
              아이디어를 현실로 만들어 드립니다
            </p>
          </div>

          {/* CTA 버튼 */}
          <div
            className="animate-on-scroll flex flex-col sm:flex-row gap-4 mb-20"
            style={{ animationDelay: "0.4s" }}
          >
            <button 
              onClick={scrollToContact} 
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                무료 상담 받기
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <a 
              href="https://pf.kakao.com/_tixaYn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-[#FEE500] text-[#1A1A1A] font-semibold rounded-2xl transition-all duration-300 hover:bg-[#FFE94A] hover:shadow-[0_0_30px_rgba(254,229,0,0.3)] hover:-translate-y-1 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2 justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
                </svg>
                카카오톡 문의
              </span>
            </a>
          </div>

          {/* 신뢰 지표 - 더 세련되게 */}
          <div
            className="animate-on-scroll"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="inline-flex items-center gap-8 md:gap-12 px-8 py-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              {[
                { value: "50+", label: "프로젝트" },
                { value: "98%", label: "만족도" },
                { value: "24h", label: "빠른 응답" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-white/40 mt-1">
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
