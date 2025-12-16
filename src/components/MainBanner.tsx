"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  href: string;
  gradient: string;
  emoji: string;
  badge?: string;
  badgeColor?: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    title: "오늘의 운세",
    subtitle: "당신의 오늘 하루는?",
    description: "12가지 별자리로 알아보는 오늘의 운세! 매일 업데이트됩니다.",
    buttonText: "운세 확인하기 →",
    href: "/fortune",
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    emoji: "🔮",
    badge: "매일 새로워요",
    badgeColor: "bg-pink-500",
  },
  {
    id: 2,
    title: "반응속도 테스트",
    subtitle: "당신은 얼마나 빠른가요?",
    description: "초록불이 켜지면 클릭! 1등에게 문화상품권 증정!",
    buttonText: "도전하기 →",
    href: "/reaction",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    emoji: "⚡",
    badge: "🎁 이벤트 진행중",
    badgeColor: "bg-red-500",
  },
  {
    id: 3,
    title: "색깔 찾기 게임",
    subtitle: "당신의 눈썰미는?",
    description: "미묘하게 다른 색깔을 찾아보세요. 레벨이 올라갈수록 어려워져요!",
    buttonText: "플레이하기 →",
    href: "/color",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    emoji: "🎨",
  },
  {
    id: 4,
    title: "카드 맞추기",
    subtitle: "기억력을 테스트하세요!",
    description: "짝을 맞추고 콤보를 터뜨려 최고 점수에 도전하세요!",
    buttonText: "게임 시작 →",
    href: "/memory",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    emoji: "🃏",
  },
  {
    id: 5,
    title: "오늘의 명언",
    subtitle: "하루를 시작하는 한마디",
    description: "영감을 주는 명언으로 하루를 시작해보세요.",
    buttonText: "명언 보기 →",
    href: "/quote",
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    emoji: "📝",
    badge: "NEW",
    badgeColor: "bg-blue-500",
  },
];

export default function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // 다음/이전 슬라이드
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // 5초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % banners.length);
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + banners.length) % banners.length);
  }, [currentIndex, goToSlide]);

  // 터치 이벤트 핸들러
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
  };

  const currentBanner = banners[currentIndex];

  return (
    <section className="relative pt-24 pb-8 md:pt-28 md:pb-12">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentBanner.gradient} opacity-10 transition-all duration-700`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* 배너 카드 */}
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* 슬라이드 컨테이너 */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`w-full flex-shrink-0 bg-gradient-to-br ${banner.gradient} p-8 md:p-12 min-h-[280px] md:min-h-[320px] flex flex-col justify-center relative overflow-hidden`}
              >
                {/* 배경 패턴 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                </div>

                {/* 콘텐츠 */}
                <div className="relative z-10 max-w-xl">
                  {/* 배지 */}
                  {banner.badge && (
                    <span className={`inline-block px-3 py-1 ${banner.badgeColor} text-white text-xs font-bold rounded-full mb-4 animate-pulse`}>
                      {banner.badge}
                    </span>
                  )}

                  {/* 이모지 + 타이틀 */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl md:text-5xl">{banner.emoji}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {banner.title}
                    </h2>
                  </div>

                  {/* 서브타이틀 */}
                  <p className="text-xl md:text-2xl text-white/90 font-medium mb-3">
                    {banner.subtitle}
                  </p>

                  {/* 설명 */}
                  <p className="text-white/70 text-sm md:text-base mb-6 max-w-md">
                    {banner.description}
                  </p>

                  {/* CTA 버튼 */}
                  <Link
                    href={banner.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-white/90 transition-all hover:scale-105 hover:shadow-xl"
                  >
                    {banner.buttonText}
                  </Link>
                </div>

                {/* 큰 이모지 (데코) */}
                <div className="absolute right-4 md:right-12 bottom-4 md:bottom-8 text-[100px] md:text-[150px] opacity-20 select-none pointer-events-none">
                  {banner.emoji}
                </div>
              </div>
            ))}
          </div>

          {/* 화살표 버튼 (데스크탑) */}
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
            aria-label="이전"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
            aria-label="다음"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-6">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>

        {/* 스와이프 힌트 (모바일) */}
        <p className="md:hidden text-center text-white/40 text-xs mt-3">
          ← 스와이프하여 더 보기 →
        </p>
      </div>
    </section>
  );
}

