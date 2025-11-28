"use client";

import { useEffect, useRef } from "react";

const pricingData = [
  {
    category: "홈페이지 제작",
    emoji: "🌐",
    gradient: "from-blue-500 to-indigo-600",
    items: [
      { name: "기본형", price: "70~150", unit: "만원", features: ["소개 페이지", "반응형", "템플릿 기반"] },
      { name: "고급형", price: "150~300", unit: "만원+", features: ["맞춤 디자인", "쇼핑몰", "다국어"], popular: true },
      { name: "유지보수", price: "월 5", unit: "만원~", features: ["정기 업데이트", "보안 관리", "콘텐츠 수정"] },
    ],
  },
  {
    category: "앱 제작",
    emoji: "📱",
    gradient: "from-violet-500 to-purple-600",
    items: [
      { name: "기본형", price: "200~400", unit: "만원", features: ["Flutter", "기본 기능", "스토어 등록"] },
      { name: "고급형", price: "400", unit: "만원+", features: ["고급 기능", "서버 연동", "분석"], popular: true },
      { name: "유지보수", price: "월 10", unit: "만원~", features: ["OS 대응", "버그 수정", "기능 개선"] },
    ],
  },
  {
    category: "AI 챗봇",
    emoji: "🤖",
    gradient: "from-cyan-500 to-teal-500",
    items: [
      { name: "기본형", price: "100~200", unit: "만원", features: ["룰 기반", "FAQ", "기본 시나리오"] },
      { name: "고급형", price: "200", unit: "만원+", features: ["AI 학습", "자연어 처리", "데이터 분석"], popular: true },
      { name: "유지보수", price: "월 7", unit: "만원~", features: ["학습", "최적화", "시나리오 추가"] },
    ],
  },
];

export default function Pricing() {
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
    <section id="pricing" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-20">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-lg">💰</span>
            <span className="text-sm text-white/70">가격 안내</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ animationDelay: "0.1s" }}>
            투명한 가격 정책
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            프로젝트 규모에 맞는 합리적인 가격을 제안합니다
          </p>
        </div>

        {/* 가격 카테고리 */}
        <div className="space-y-16">
          {pricingData.map((group, groupIndex) => (
            <div
              key={group.category}
              className="animate-on-scroll"
              style={{ animationDelay: `${0.2 + groupIndex * 0.15}s` }}
            >
              {/* 카테고리 헤더 */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {group.emoji}
                </div>
                <h3 className="text-2xl font-bold text-white">{group.category}</h3>
              </div>

              {/* 가격 카드 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  <div
                    key={`${group.category}-${item.name}`}
                    className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                      item.popular 
                        ? `bg-gradient-to-br ${group.gradient} shadow-xl shadow-black/30` 
                        : "bg-slate-800/70 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-slate-900 text-xs font-bold rounded-full shadow-lg">
                        ⭐ BEST
                      </span>
                    )}

                    <p className={`text-sm font-medium mb-2 ${item.popular ? 'text-white/80' : 'text-white/50'}`}>
                      {item.name}
                    </p>
                    
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className={`text-3xl font-bold ${item.popular ? 'text-white' : 'text-white'}`}>
                        {item.price}
                      </span>
                      <span className={`text-lg ${item.popular ? 'text-white/80' : 'text-white/60'}`}>
                        {item.unit}
                      </span>
                    </div>
                    
                    <div className={`w-full h-px mb-5 ${item.popular ? 'bg-white/20' : 'bg-white/10'}`} />
                    
                    <ul className="space-y-3">
                      {item.features.map((feature) => (
                        <li key={feature} className={`flex items-center gap-3 text-sm ${item.popular ? 'text-white/90' : 'text-white/70'}`}>
                          <svg className={`w-5 h-5 flex-shrink-0 ${item.popular ? 'text-white' : 'text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="animate-on-scroll mt-16 text-center" style={{ animationDelay: "0.6s" }}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl">💬</span>
            <p className="text-white/70">
              정확한 견적은 <span className="text-cyan-400 font-semibold">무료 상담</span> 후 안내해 드립니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
