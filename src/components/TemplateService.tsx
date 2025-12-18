"use client";

import { useState, useEffect, useRef } from "react";

// 카테고리 정의
const categories = [
  { id: "personal", name: "개인", emoji: "🧑", color: "from-blue-500 to-indigo-600" },
  { id: "family", name: "가족/친구", emoji: "👨‍👩‍👧", color: "from-pink-500 to-rose-600" },
  { id: "business", name: "비즈니스", emoji: "💼", color: "from-violet-500 to-purple-600" },
  { id: "event", name: "이벤트", emoji: "🎉", color: "from-amber-500 to-orange-600" },
];

// 템플릿 타입 정의
interface Template {
  code: string;
  name: string;
  desc: string;
  preview: string; // 미리보기 이미지 경로 또는 이모지
  demoUrl: string;
  available: boolean;
}

interface SubCategory {
  id: string;
  name: string;
  emoji: string;
  templates: Template[];
}

// 전체 템플릿 데이터
const templateData: Record<string, SubCategory[]> = {
  personal: [
    {
      id: "minimal",
      name: "미니멀 프로필",
      emoji: "🎯",
      templates: [
        { code: "P01", name: "화이트 미니멀", desc: "깔끔한 화이트 톤", preview: "🤍", demoUrl: "/template/P01", available: true },
        { code: "P02", name: "다크 엘레강스", desc: "세련된 다크 테마", preview: "🖤", demoUrl: "/template/P02", available: true },
        { code: "P03", name: "모던 그라데이션", desc: "트렌디한 컬러감", preview: "💜", demoUrl: "/template/P03", available: true },
      ],
    },
    {
      id: "portfolio",
      name: "포트폴리오",
      emoji: "🖼️",
      templates: [
        { code: "P04", name: "갤러리 스타일", desc: "작품 중심 레이아웃", preview: "🎨", demoUrl: "/template/P04", available: false },
        { code: "P05", name: "그리드 모던", desc: "정돈된 그리드 뷰", preview: "📐", demoUrl: "/template/P05", available: false },
        { code: "P06", name: "스토리텔링", desc: "스크롤 애니메이션", preview: "📖", demoUrl: "/template/P06", available: false },
      ],
    },
    {
      id: "resume",
      name: "이력서",
      emoji: "📄",
      templates: [
        { code: "P07", name: "클래식 이력서", desc: "전통적인 구성", preview: "📋", demoUrl: "/template/P07", available: false },
        { code: "P08", name: "크리에이티브 CV", desc: "창의적인 디자인", preview: "✨", demoUrl: "/template/P08", available: false },
        { code: "P09", name: "심플 원페이지", desc: "한 페이지 완결", preview: "📃", demoUrl: "/template/P09", available: false },
      ],
    },
    {
      id: "linktree",
      name: "링크트리형",
      emoji: "🔗",
      templates: [
        { code: "P10", name: "심플 링크", desc: "깔끔한 링크 모음", preview: "🔗", demoUrl: "/template/P10", available: false },
        { code: "P11", name: "아이콘 카드", desc: "아이콘 중심 구성", preview: "🃏", demoUrl: "/template/P11", available: false },
        { code: "P12", name: "프로필 링크", desc: "프로필+링크 조합", preview: "👤", demoUrl: "/template/P12", available: false },
      ],
    },
    {
      id: "developer",
      name: "개발자 프로필",
      emoji: "💻",
      templates: [
        { code: "P13", name: "GitHub 스타일", desc: "개발자 감성", preview: "🐙", demoUrl: "/template/P13", available: false },
        { code: "P14", name: "터미널 테마", desc: "해커 감성 디자인", preview: "⌨️", demoUrl: "/template/P14", available: false },
        { code: "P15", name: "테크 모던", desc: "기술 중심 레이아웃", preview: "🚀", demoUrl: "/template/P15", available: false },
      ],
    },
  ],
  family: [
    {
      id: "family-album",
      name: "패밀리 앨범",
      emoji: "👨‍👩‍👧‍👦",
      templates: [
        { code: "F01", name: "따뜻한 가족", desc: "포근한 분위기", preview: "🏠", demoUrl: "/template/F01", available: false },
        { code: "F02", name: "모던 패밀리", desc: "세련된 가족 앨범", preview: "📸", demoUrl: "/template/F02", available: false },
        { code: "F03", name: "타임라인", desc: "시간순 기록", preview: "📅", demoUrl: "/template/F03", available: false },
      ],
    },
    {
      id: "pet",
      name: "반려동물",
      emoji: "🐕",
      templates: [
        { code: "F04", name: "댕댕이 일기", desc: "강아지 전용", preview: "🐶", demoUrl: "/template/F04", available: false },
        { code: "F05", name: "냥이 앨범", desc: "고양이 전용", preview: "🐱", demoUrl: "/template/F05", available: false },
        { code: "F06", name: "펫 다이어리", desc: "모든 반려동물", preview: "🐾", demoUrl: "/template/F06", available: false },
      ],
    },
    {
      id: "kids",
      name: "아이 성장일기",
      emoji: "👶",
      templates: [
        { code: "F07", name: "베이비 그로스", desc: "성장 기록", preview: "👶", demoUrl: "/template/F07", available: false },
        { code: "F08", name: "키즈 타임라인", desc: "연령별 기록", preview: "📏", demoUrl: "/template/F08", available: false },
        { code: "F09", name: "포토 다이어리", desc: "사진 중심", preview: "📷", demoUrl: "/template/F09", available: false },
      ],
    },
    {
      id: "friends",
      name: "동창회/동호회",
      emoji: "🎓",
      templates: [
        { code: "F10", name: "동창회 모임", desc: "학교 동창 페이지", preview: "🎓", demoUrl: "/template/F10", available: false },
        { code: "F11", name: "동호회 소개", desc: "취미 모임용", preview: "⚽", demoUrl: "/template/F11", available: false },
        { code: "F12", name: "여행 기록", desc: "여행 추억 페이지", preview: "✈️", demoUrl: "/template/F12", available: false },
      ],
    },
  ],
  business: [
    {
      id: "company",
      name: "회사 소개",
      emoji: "🏢",
      templates: [
        { code: "B01", name: "코퍼레이트", desc: "정통 기업 스타일", preview: "🏢", demoUrl: "/template/B01", available: false },
        { code: "B02", name: "스타트업", desc: "활기찬 스타트업", preview: "🚀", demoUrl: "/template/B02", available: false },
        { code: "B03", name: "모던 비즈니스", desc: "세련된 기업 이미지", preview: "💼", demoUrl: "/template/B03", available: false },
      ],
    },
    {
      id: "freelancer",
      name: "1인 사업자",
      emoji: "👤",
      templates: [
        { code: "B04", name: "프리랜서 프로", desc: "전문가 이미지", preview: "💪", demoUrl: "/template/B04", available: false },
        { code: "B05", name: "크리에이터", desc: "창작자용", preview: "🎨", demoUrl: "/template/B05", available: false },
        { code: "B06", name: "컨설턴트", desc: "전문 서비스", preview: "📊", demoUrl: "/template/B06", available: false },
      ],
    },
    {
      id: "shop",
      name: "카페/식당",
      emoji: "☕",
      templates: [
        { code: "B07", name: "카페 무드", desc: "아늑한 카페 분위기", preview: "☕", demoUrl: "/template/B07", available: false },
        { code: "B08", name: "레스토랑", desc: "메뉴 중심 구성", preview: "🍽️", demoUrl: "/template/B08", available: false },
        { code: "B09", name: "베이커리", desc: "빵집/디저트 샵", preview: "🥐", demoUrl: "/template/B09", available: false },
      ],
    },
    {
      id: "beauty",
      name: "헤어샵/네일",
      emoji: "💇",
      templates: [
        { code: "B10", name: "헤어 살롱", desc: "미용실용", preview: "💇", demoUrl: "/template/B10", available: false },
        { code: "B11", name: "네일 아트", desc: "네일샵용", preview: "💅", demoUrl: "/template/B11", available: false },
        { code: "B12", name: "뷰티 샵", desc: "종합 뷰티", preview: "💄", demoUrl: "/template/B12", available: false },
      ],
    },
    {
      id: "namecard",
      name: "온라인 명함",
      emoji: "💳",
      templates: [
        { code: "B13", name: "심플 명함", desc: "깔끔한 명함", preview: "📇", demoUrl: "/template/B13", available: false },
        { code: "B14", name: "QR 명함", desc: "QR코드 포함", preview: "📱", demoUrl: "/template/B14", available: false },
        { code: "B15", name: "프리미엄 명함", desc: "고급스러운 디자인", preview: "✨", demoUrl: "/template/B15", available: false },
      ],
    },
  ],
  event: [
    {
      id: "wedding",
      name: "웨딩 초대장",
      emoji: "💍",
      templates: [
        { code: "E01", name: "로맨틱 웨딩", desc: "낭만적인 분위기", preview: "💒", demoUrl: "/template/E01", available: false },
        { code: "E02", name: "모던 웨딩", desc: "세련된 청첩장", preview: "💍", demoUrl: "/template/E02", available: false },
        { code: "E03", name: "플라워 웨딩", desc: "꽃 테마 디자인", preview: "💐", demoUrl: "/template/E03", available: false },
      ],
    },
    {
      id: "birthday",
      name: "돌잔치/생일",
      emoji: "🎂",
      templates: [
        { code: "E04", name: "첫 돌잔치", desc: "아기 돌잔치용", preview: "👶", demoUrl: "/template/E04", available: false },
        { code: "E05", name: "생일파티", desc: "생일 초대장", preview: "🎈", demoUrl: "/template/E05", available: false },
        { code: "E06", name: "키즈 파티", desc: "어린이 파티", preview: "🎪", demoUrl: "/template/E06", available: false },
      ],
    },
    {
      id: "party",
      name: "송년회/신년회",
      emoji: "🥳",
      templates: [
        { code: "E07", name: "송년회", desc: "연말 모임용", preview: "🎆", demoUrl: "/template/E07", available: false },
        { code: "E08", name: "신년회", desc: "새해 모임용", preview: "🎊", demoUrl: "/template/E08", available: false },
        { code: "E09", name: "회식 모임", desc: "팀/회사 모임", preview: "🍻", demoUrl: "/template/E09", available: false },
      ],
    },
    {
      id: "exhibition",
      name: "전시/공연",
      emoji: "🎭",
      templates: [
        { code: "E10", name: "전시회", desc: "전시 안내 페이지", preview: "🖼️", demoUrl: "/template/E10", available: false },
        { code: "E11", name: "공연 안내", desc: "공연/콘서트용", preview: "🎵", demoUrl: "/template/E11", available: false },
        { code: "E12", name: "페스티벌", desc: "축제 홍보용", preview: "🎪", demoUrl: "/template/E12", available: false },
      ],
    },
  ],
};

export default function TemplateService() {
  const [activeCategory, setActiveCategory] = useState("personal");
  const [activeSubCategory, setActiveSubCategory] = useState("minimal");
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
  }, [activeCategory, activeSubCategory]); // 탭 변경 시 다시 관찰

  // 카테고리 변경 시 첫 번째 서브카테고리로 초기화
  useEffect(() => {
    const subCategories = templateData[activeCategory];
    if (subCategories && subCategories.length > 0) {
      setActiveSubCategory(subCategories[0].id);
    }
  }, [activeCategory]);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const subCategories = templateData[activeCategory] || [];
  const currentSubCategory = subCategories.find(s => s.id === activeSubCategory);
  const currentTemplates = currentSubCategory?.templates || [];

  return (
    <section id="services" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
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
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            마음에 드는 템플릿 코드를 선택하세요 ✨
          </p>
        </div>

        {/* 1단계: 카테고리 탭 */}
        <div className="animate-on-scroll flex justify-center mb-8" style={{ animationDelay: "0.3s" }}>
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

        {/* 2단계: 서브카테고리 선택 */}
        <div className="animate-on-scroll flex justify-center gap-2 flex-wrap mb-8" style={{ animationDelay: "0.35s" }}>
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubCategory(sub.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSubCategory === sub.id
                  ? "bg-white text-slate-900 shadow-lg"
                  : "bg-slate-800/50 text-white/60 hover:text-white hover:bg-slate-700/50 border border-white/10"
              }`}
            >
              <span>{sub.emoji}</span>
              <span>{sub.name}</span>
            </button>
          ))}
        </div>

        {/* 3단계: 템플릿 카드 (3개씩) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {currentTemplates.map((template, index) => (
            <a
              key={template.code}
              href={template.available ? template.demoUrl : undefined}
              onClick={(e) => !template.available && e.preventDefault()}
              className={`animate-on-scroll group relative block rounded-2xl overflow-hidden transition-all duration-300 ${
                template.available 
                  ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 cursor-pointer" 
                  : "opacity-60 cursor-not-allowed"
              }`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* 카드 배경 */}
              <div className={`relative bg-slate-800/70 border border-white/10 ${template.available ? "group-hover:border-white/20" : ""} rounded-2xl overflow-hidden`}>
                {/* 미리보기 영역 - iframe 실시간 프리뷰 */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  {template.available ? (
                    <>
                      {/* 실제 페이지 축소 미리보기 */}
                      <div className="absolute inset-0 origin-top-left scale-[0.25] w-[400%] h-[400%] pointer-events-none">
                        <iframe 
                          src={template.demoUrl}
                          className="w-full h-full border-0"
                          loading="lazy"
                          title={`${template.name} 미리보기`}
                        />
                      </div>
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-slate-900 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          미리보기 →
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-40">{template.preview}</span>
                      </div>
                      {/* 준비중 뱃지 */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 text-white/60 rounded-full text-xs">
                        준비중
                      </div>
                    </>
                  )}
                </div>

                {/* 카드 정보 */}
                <div className="p-5">
                  {/* 코드 뱃지 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      template.available 
                        ? `bg-gradient-to-r ${currentCategory?.color} text-white`
                        : "bg-slate-700 text-white/50"
                    }`}>
                      {template.code}
                    </span>
                    <span className={`text-lg font-bold ${template.available ? "text-yellow-400" : "text-white/30"}`}>
                      9,900<span className="text-sm text-white/50">원</span>
                    </span>
                  </div>

                  {/* 제목 & 설명 */}
                  <h4 className="font-bold text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-white/50">{template.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 포함 사항 */}
        <div className="animate-on-scroll" style={{ animationDelay: "0.7s" }}>
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
        <div className="animate-on-scroll mt-12 text-center" style={{ animationDelay: "0.8s" }}>
          <p className="text-white/60 mb-4">
            원하는 템플릿 코드를 선택하셨나요?
          </p>
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
