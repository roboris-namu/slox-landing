"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "홈페이지 제작",
    description: "브랜드 아이덴티티를 담은 반응형 웹사이트를 만들어 드립니다",
    features: ["반응형 디자인", "SEO 최적화", "빠른 로딩 속도"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    number: "01",
  },
  {
    title: "앱 제작",
    description: "iOS & Android 크로스플랫폼 모바일 앱을 개발해 드립니다",
    features: ["Flutter 기반", "앱스토어 등록", "관리자 기능 제공"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20",
    borderColor: "border-violet-500/30",
    number: "02",
  },
  {
    title: "AI 챗봇",
    description: "24시간 스마트한 고객 응대 시스템을 구축해 드립니다",
    features: ["자연어 처리", "자동 학습 기능", "맞춤 시나리오"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-500",
    bgGlow: "bg-cyan-500/20",
    borderColor: "border-cyan-500/30",
    number: "03",
  },
];

export default function Services() {
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
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 섹션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      
      {/* 장식 요소 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-20">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/70">서비스 안내</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ animationDelay: "0.1s" }}>
            무엇을 만들어 드릴까요?
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            필요한 서비스를 선택하시면 최적의 솔루션을 제안해 드립니다
          </p>
        </div>

        {/* 서비스 카드 - 대형 카드 레이아웃 */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-on-scroll"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className={`group relative rounded-3xl p-1 bg-gradient-to-r ${service.gradient} overflow-hidden`}>
                <div className="relative bg-slate-900 rounded-[22px] p-8 md:p-12 overflow-hidden">
                  {/* 배경 글로우 */}
                  <div className={`absolute top-0 right-0 w-96 h-96 ${service.bgGlow} rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    {/* 넘버링 */}
                    <div className="hidden md:block text-8xl font-black text-white/5 absolute -left-4 -top-4">
                      {service.number}
                    </div>
                    
                    {/* 아이콘 */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg shadow-black/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    
                    {/* 콘텐츠 */}
                    <div className="flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-white/60 text-lg mb-6">
                        {service.description}
                      </p>
                      
                      {/* 특징 태그 */}
                      <div className="flex flex-wrap gap-3">
                        {service.features.map((feature) => (
                          <span 
                            key={feature} 
                            className={`px-4 py-2 rounded-full bg-white/5 border ${service.borderColor} text-white/80 text-sm font-medium`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* 화살표 */}
                    <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                      <svg className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
