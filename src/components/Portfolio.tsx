"use client";

import { useEffect, useRef, useState } from "react";

const portfolioData = [
  {
    id: 1,
    title: "스타트업 기업 홈페이지",
    category: "website",
    tags: ["Next.js", "반응형"],
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🌐",
  },
  {
    id: 2,
    title: "헬스케어 모바일 앱",
    category: "app",
    tags: ["Flutter", "iOS/Android"],
    gradient: "from-violet-500 to-purple-600",
    emoji: "📱",
  },
  {
    id: 3,
    title: "고객상담 AI 챗봇",
    category: "chatbot",
    tags: ["AI", "자연어처리"],
    gradient: "from-cyan-500 to-teal-500",
    emoji: "🤖",
  },
  {
    id: 4,
    title: "레스토랑 예약 플랫폼",
    category: "website",
    tags: ["React", "실시간"],
    gradient: "from-orange-500 to-red-500",
    emoji: "🍽️",
  },
  {
    id: 5,
    title: "교육 플랫폼 앱",
    category: "app",
    tags: ["Flutter", "동영상"],
    gradient: "from-green-500 to-emerald-600",
    emoji: "📚",
  },
  {
    id: 6,
    title: "쇼핑몰 CS 챗봇",
    category: "chatbot",
    tags: ["AI", "주문조회"],
    gradient: "from-pink-500 to-rose-600",
    emoji: "🛒",
  },
];

const categories = [
  { id: "all", label: "전체", emoji: "✨" },
  { id: "website", label: "홈페이지", emoji: "🌐" },
  { id: "app", label: "앱", emoji: "📱" },
  { id: "chatbot", label: "AI 챗봇", emoji: "🤖" },
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
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-lg">🎨</span>
            <span className="text-sm text-white/70">포트폴리오</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ animationDelay: "0.1s" }}>
            완성한 프로젝트
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            SLOX가 만들어낸 결과물을 확인해 보세요
          </p>
        </div>

        {/* 필터 버튼 */}
        <div
          className="animate-on-scroll flex flex-wrap justify-center gap-3 mb-14"
          style={{ animationDelay: "0.25s" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? "bg-white text-slate-900 shadow-lg shadow-white/20"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item, index) => (
            <div
              key={item.id}
              className="animate-on-scroll group"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-slate-800/50 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30">
                {/* 썸네일 영역 */}
                <div className={`h-52 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                  {/* 패턴 */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                  
                  {/* 이모지 아이콘 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
                      {item.emoji}
                    </div>
                  </div>
                  
                  {/* 하단 그라데이션 */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 text-sm font-medium rounded-lg"
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
