"use client";

import { useEffect, useRef, useState } from "react";

const portfolioData = [
  {
    id: 1,
    title: "스타트업 기업 홈페이지",
    description: "브랜드 아이덴티티를 담은 모던 웹사이트",
    category: "website",
    tags: ["Next.js", "반응형", "SEO"],
    gradient: "from-blue-600 to-indigo-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "헬스케어 모바일 앱",
    description: "건강 관리를 위한 크로스플랫폼 앱",
    category: "app",
    tags: ["Flutter", "iOS", "Android"],
    gradient: "from-violet-600 to-purple-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "고객상담 AI 챗봇",
    description: "자연어 처리 기반 스마트 상담 시스템",
    category: "chatbot",
    tags: ["AI", "NLP", "24/7"],
    gradient: "from-cyan-600 to-teal-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "레스토랑 예약 플랫폼",
    description: "실시간 예약 시스템 웹 애플리케이션",
    category: "website",
    tags: ["React", "실시간", "결제"],
    gradient: "from-orange-600 to-red-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "교육 플랫폼 앱",
    description: "온라인 강의 및 학습 관리 시스템",
    category: "app",
    tags: ["Flutter", "동영상", "LMS"],
    gradient: "from-green-600 to-emerald-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "쇼핑몰 CS 챗봇",
    description: "주문조회, FAQ 자동응답 시스템",
    category: "chatbot",
    tags: ["AI", "자동화", "CS"],
    gradient: "from-pink-600 to-rose-700",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const categories = [
  { id: "all", label: "전체" },
  { id: "website", label: "웹사이트" },
  { id: "app", label: "모바일 앱" },
  { id: "chatbot", label: "AI 챗봇" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPortfolio =
    activeCategory === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

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
  }, [activeCategory]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="animate-on-scroll text-sm font-semibold text-violet-400 mb-4 tracking-widest uppercase">
            Portfolio
          </p>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-white mb-6" style={{ animationDelay: "0.1s" }}>
            작업 사례
          </h2>
          <p className="animate-on-scroll text-lg text-white/50 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            SLOX가 완성한 프로젝트들을 확인해 보세요
          </p>
        </div>

        {/* 필터 버튼 */}
        <div
          className="animate-on-scroll flex flex-wrap justify-center gap-2 mb-12"
          style={{ animationDelay: "0.25s" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "bg-white/[0.03] text-white/60 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item, index) => (
            <div
              key={item.id}
              className="animate-on-scroll group"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-slate-800/30 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2">
                {/* 상단 그라데이션 바 */}
                <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />
                
                <div className="p-6">
                  {/* 아이콘 */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  {/* 제목 */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* 설명 */}
                  <p className="text-white/50 text-sm mb-5 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 bg-white/[0.04] text-white/50 text-xs font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
