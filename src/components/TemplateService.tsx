"use client";

import { useState, useEffect, useRef } from "react";

// 카테고리 정의
const categories = [
  { id: "personal", name: "개인", emoji: "🧑", color: "from-blue-500 to-indigo-600" },
  { id: "family", name: "가족/친구", emoji: "👨‍👩‍👧", color: "from-pink-500 to-rose-600" },
  { id: "business", name: "비즈니스", emoji: "💼", color: "from-violet-500 to-purple-600" },
  { id: "event", name: "이벤트", emoji: "🎉", color: "from-amber-500 to-orange-600" },
];

// 템플릿 데이터
const templates = {
  personal: [
    { id: "p1", name: "미니멀 프로필", desc: "깔끔한 자기소개 페이지", preview: "🎯", popular: true },
    { id: "p2", name: "포트폴리오", desc: "작업물 전시 갤러리", preview: "🖼️" },
    { id: "p3", name: "이력서", desc: "온라인 이력서/CV", preview: "📄" },
    { id: "p4", name: "링크트리형", desc: "SNS 링크 모음", preview: "🔗" },
    { id: "p5", name: "개발자 프로필", desc: "GitHub 스타일", preview: "💻" },
  ],
  family: [
    { id: "f1", name: "패밀리 앨범", desc: "가족 사진 & 스토리", preview: "👨‍👩‍👧‍👦", popular: true },
    { id: "f2", name: "반려동물", desc: "우리집 댕댕이/냥이", preview: "🐕" },
    { id: "f3", name: "아이 성장일기", desc: "육아 기록 페이지", preview: "👶" },
    { id: "f4", name: "동창회", desc: "친구들 모임 페이지", preview: "🎓" },
    { id: "f5", name: "동호회", desc: "취미 모임 소개", preview: "⚽" },
  ],
  business: [
    { id: "b1", name: "회사 소개", desc: "기업 브랜딩 페이지", preview: "🏢", popular: true },
    { id: "b2", name: "1인 사업자", desc: "프리랜서/개인사업", preview: "👤" },
    { id: "b3", name: "카페/식당", desc: "메뉴 & 위치 안내", preview: "☕" },
    { id: "b4", name: "헤어샵/네일", desc: "예약 & 갤러리", preview: "💇" },
    { id: "b5", name: "온라인 명함", desc: "디지털 명함 페이지", preview: "💳" },
  ],
  event: [
    { id: "e1", name: "웨딩 초대장", desc: "모바일 청첩장", preview: "💍", popular: true },
    { id: "e2", name: "돌잔치", desc: "첫 생일 초대장", preview: "🎂" },
    { id: "e3", name: "생일파티", desc: "파티 초대 페이지", preview: "🎈" },
    { id: "e4", name: "송년회/신년회", desc: "모임 안내 페이지", preview: "🥳" },
    { id: "e5", name: "전시/공연", desc: "행사 홍보 페이지", preview: "🎭" },
  ],
};

export default function TemplateService() {
  const [activeCategory, setActiveCategory] = useState("personal");
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

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentTemplates = templates[activeCategory as keyof typeof templates];

  return (
    <section id="services" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
            <span className="text-lg">☕</span>
            <span className="text-sm text-yellow-400 font-medium">커피 두 잔 값으로 나만의 홈페이지!</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ animationDelay: "0.1s" }}>
            전 템플릿{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              9,900원
            </span>
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto mb-2" style={{ animationDelay: "0.2s" }}>
            개인 · 가족 · 회사 · 이벤트
          </p>
          <p className="animate-on-scroll text-base text-white/40" style={{ animationDelay: "0.25s" }}>
            고민 끝, 선택만 하세요 ✨
          </p>
        </div>

        {/* 카테고리 탭 */}
        <div className="animate-on-scroll flex justify-center mb-12" style={{ animationDelay: "0.3s" }}>
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/70 border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {activeCategory === cat.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-xl opacity-90`} />
                )}
                <span className="relative z-10">{cat.emoji}</span>
                <span className="relative z-10 hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 템플릿 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {currentTemplates.map((template, index) => (
            <div
              key={template.id}
              className="animate-on-scroll group relative"
              style={{ animationDelay: `${0.35 + index * 0.05}s` }}
            >
              <div className={`relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 cursor-pointer ${
                template.popular
                  ? `bg-gradient-to-br ${currentCategory?.color} shadow-lg shadow-black/20`
                  : "bg-slate-800/70 border border-white/10 hover:border-white/20"
              }`}>
                {/* BEST 뱃지 */}
                {template.popular && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-white text-slate-900 text-xs font-bold rounded-full shadow-lg">
                    ⭐ BEST
                  </span>
                )}

                {/* 미리보기 이모지 */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 ${
                  template.popular
                    ? "bg-white/20"
                    : "bg-slate-700/50"
                }`}>
                  {template.preview}
                </div>

                {/* 템플릿 정보 */}
                <h4 className={`font-bold mb-1 ${template.popular ? "text-white" : "text-white"}`}>
                  {template.name}
                </h4>
                <p className={`text-sm mb-4 ${template.popular ? "text-white/70" : "text-white/50"}`}>
                  {template.desc}
                </p>

                {/* 가격 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className={`text-xl font-bold ${template.popular ? "text-white" : "text-yellow-400"}`}>
                      9,900
                    </span>
                    <span className={`text-sm ${template.popular ? "text-white/70" : "text-white/50"}`}>원</span>
                  </div>
                  
                  {/* 선택 버튼 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    template.popular
                      ? "bg-white/20 group-hover:bg-white/30"
                      : "bg-slate-700 group-hover:bg-slate-600"
                  }`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 포함 사항 */}
        <div className="animate-on-scroll mt-16" style={{ animationDelay: "0.6s" }}>
          <div className="rounded-2xl bg-slate-800/50 border border-white/10 p-8">
            <h4 className="text-lg font-bold text-white mb-6 text-center">
              🎁 9,900원에 모두 포함
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "📱", text: "모바일 최적화" },
                { icon: "🌐", text: "Vercel 무료 호스팅" },
                { icon: "🔒", text: "SSL 보안 인증서" },
                { icon: "✏️", text: "내용 수정 1회 무료" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/30">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-on-scroll mt-12 text-center" style={{ animationDelay: "0.7s" }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-lg">📧</span>
            <span>지금 바로 신청하기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

