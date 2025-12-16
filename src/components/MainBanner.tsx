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

type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'de' | 'fr' | 'es' | 'pt';

const bannersByLocale: Record<Locale, BannerItem[]> = {
  ko: [
    { id: 1, title: "반응속도 테스트", subtitle: "당신은 얼마나 빠른가요?", description: "초록불이 켜지면 클릭! 1등에게 문화상품권 증정!", buttonText: "도전하기 →", href: "/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 이벤트 진행중", badgeColor: "bg-red-500" },
    { id: 2, title: "상식 퀴즈", subtitle: "당신의 상식을 테스트하세요!", description: "역사, 과학, 지리 등 10문제! 빨리 맞출수록 높은 점수!", buttonText: "퀴즈 시작 →", href: "/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NEW", badgeColor: "bg-purple-500" },
    { id: 3, title: "IQ 테스트", subtitle: "멘사 스타일 패턴 분석!", description: "패턴을 찾아 당신의 IQ를 측정해보세요!", buttonText: "테스트 시작 →", href: "/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NEW", badgeColor: "bg-pink-500" },
    { id: 4, title: "스도쿠", subtitle: "숫자 퍼즐의 고전!", description: "9x9 빈칸을 채워 완성하세요. 난이도별 랭킹 도전!", buttonText: "플레이 →", href: "/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NEW", badgeColor: "bg-cyan-500" },
    { id: 5, title: "오늘의 운세", subtitle: "당신의 오늘 하루는?", description: "12가지 별자리로 알아보는 오늘의 운세! 매일 업데이트됩니다.", buttonText: "운세 확인하기 →", href: "/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "매일 새로워요", badgeColor: "bg-orange-500" },
  ],
  en: [
    { id: 1, title: "Reaction Test", subtitle: "How fast are you?", description: "Click when green! Win a gift card for 1st place!", buttonText: "Challenge →", href: "/en/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 EVENT", badgeColor: "bg-red-500" },
    { id: 2, title: "Trivia Quiz", subtitle: "Test your knowledge!", description: "10 questions on history, science & more!", buttonText: "Start Quiz →", href: "/en/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NEW", badgeColor: "bg-purple-500" },
    { id: 3, title: "IQ Test", subtitle: "Mensa-style patterns!", description: "Find patterns and measure your IQ!", buttonText: "Start Test →", href: "/en/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NEW", badgeColor: "bg-pink-500" },
    { id: 4, title: "Sudoku", subtitle: "Classic number puzzle!", description: "Fill the 9x9 grid. Compete on leaderboards!", buttonText: "Play →", href: "/en/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NEW", badgeColor: "bg-cyan-500" },
    { id: 5, title: "Daily Fortune", subtitle: "What's your day like?", description: "Check your daily horoscope! Updated every day.", buttonText: "Check Fortune →", href: "/en/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "Daily", badgeColor: "bg-orange-500" },
  ],
  ja: [
    { id: 1, title: "反応速度テスト", subtitle: "あなたはどれくらい速い？", description: "緑になったらクリック！1位にギフト券進呈！", buttonText: "チャレンジ →", href: "/ja/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 イベント中", badgeColor: "bg-red-500" },
    { id: 2, title: "常識クイズ", subtitle: "あなたの常識をテスト！", description: "歴史、科学など10問！早く答えるほど高得点！", buttonText: "クイズ開始 →", href: "/ja/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NEW", badgeColor: "bg-purple-500" },
    { id: 3, title: "IQテスト", subtitle: "メンサ式パターン分析！", description: "パターンを見つけてIQを測定！", buttonText: "テスト開始 →", href: "/ja/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NEW", badgeColor: "bg-pink-500" },
    { id: 4, title: "数独", subtitle: "数字パズルの定番！", description: "9x9を完成させよう。難易度別ランキング！", buttonText: "プレイ →", href: "/ja/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NEW", badgeColor: "bg-cyan-500" },
    { id: 5, title: "今日の運勢", subtitle: "今日はどんな日？", description: "12星座の運勢を毎日更新！", buttonText: "運勢を見る →", href: "/ja/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "毎日更新", badgeColor: "bg-orange-500" },
  ],
  zh: [
    { id: 1, title: "反应速度测试", subtitle: "你有多快？", description: "绿灯亮起时点击！第一名赢礼品卡！", buttonText: "挑战 →", href: "/zh/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 活动中", badgeColor: "bg-red-500" },
    { id: 2, title: "常识问答", subtitle: "测试你的知识！", description: "历史、科学等10题！答得越快分数越高！", buttonText: "开始问答 →", href: "/zh/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NEW", badgeColor: "bg-purple-500" },
    { id: 3, title: "IQ测试", subtitle: "门萨式图案分析！", description: "找出规律，测量你的IQ！", buttonText: "开始测试 →", href: "/zh/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NEW", badgeColor: "bg-pink-500" },
    { id: 4, title: "数独", subtitle: "经典数字拼图！", description: "填满9x9格子，挑战排行榜！", buttonText: "开始玩 →", href: "/zh/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NEW", badgeColor: "bg-cyan-500" },
    { id: 5, title: "今日运势", subtitle: "你的今天如何？", description: "每日更新的星座运势！", buttonText: "查看运势 →", href: "/zh/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "每日更新", badgeColor: "bg-orange-500" },
  ],
  de: [
    { id: 1, title: "Reaktionstest", subtitle: "Wie schnell bist du?", description: "Klicke bei Grün! Gewinne einen Gutschein!", buttonText: "Herausforderung →", href: "/de/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 EVENT", badgeColor: "bg-red-500" },
    { id: 2, title: "Wissensquiz", subtitle: "Teste dein Wissen!", description: "10 Fragen zu Geschichte, Wissenschaft & mehr!", buttonText: "Quiz starten →", href: "/de/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NEU", badgeColor: "bg-purple-500" },
    { id: 3, title: "IQ-Test", subtitle: "Mensa-Muster!", description: "Finde Muster und miss deinen IQ!", buttonText: "Test starten →", href: "/de/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NEU", badgeColor: "bg-pink-500" },
    { id: 4, title: "Sudoku", subtitle: "Klassisches Zahlenrätsel!", description: "Fülle das 9x9-Gitter aus!", buttonText: "Spielen →", href: "/de/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NEU", badgeColor: "bg-cyan-500" },
    { id: 5, title: "Tageshoroskop", subtitle: "Wie wird dein Tag?", description: "Täglich aktualisiertes Horoskop!", buttonText: "Horoskop sehen →", href: "/de/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "Täglich", badgeColor: "bg-orange-500" },
  ],
  fr: [
    { id: 1, title: "Test de Réaction", subtitle: "Êtes-vous rapide?", description: "Cliquez au vert! Gagnez une carte cadeau!", buttonText: "Défi →", href: "/fr/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 ÉVÉNEMENT", badgeColor: "bg-red-500" },
    { id: 2, title: "Quiz Culture", subtitle: "Testez vos connaissances!", description: "10 questions sur l'histoire, la science & plus!", buttonText: "Commencer →", href: "/fr/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NOUVEAU", badgeColor: "bg-purple-500" },
    { id: 3, title: "Test de QI", subtitle: "Motifs style Mensa!", description: "Trouvez les motifs et mesurez votre QI!", buttonText: "Commencer →", href: "/fr/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NOUVEAU", badgeColor: "bg-pink-500" },
    { id: 4, title: "Sudoku", subtitle: "Puzzle de chiffres classique!", description: "Remplissez la grille 9x9!", buttonText: "Jouer →", href: "/fr/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NOUVEAU", badgeColor: "bg-cyan-500" },
    { id: 5, title: "Horoscope du Jour", subtitle: "Comment sera votre journée?", description: "Horoscope mis à jour quotidiennement!", buttonText: "Voir l'horoscope →", href: "/fr/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "Quotidien", badgeColor: "bg-orange-500" },
  ],
  es: [
    { id: 1, title: "Test de Reacción", subtitle: "¿Qué tan rápido eres?", description: "¡Haz clic en verde! ¡Gana una tarjeta regalo!", buttonText: "Desafío →", href: "/es/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 EVENTO", badgeColor: "bg-red-500" },
    { id: 2, title: "Quiz de Cultura", subtitle: "¡Pon a prueba tus conocimientos!", description: "10 preguntas de historia, ciencia y más!", buttonText: "Empezar →", href: "/es/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NUEVO", badgeColor: "bg-purple-500" },
    { id: 3, title: "Test de IQ", subtitle: "¡Patrones estilo Mensa!", description: "¡Encuentra patrones y mide tu IQ!", buttonText: "Empezar →", href: "/es/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NUEVO", badgeColor: "bg-pink-500" },
    { id: 4, title: "Sudoku", subtitle: "¡Puzzle de números clásico!", description: "¡Completa la cuadrícula 9x9!", buttonText: "Jugar →", href: "/es/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NUEVO", badgeColor: "bg-cyan-500" },
    { id: 5, title: "Horóscopo del Día", subtitle: "¿Cómo será tu día?", description: "¡Horóscopo actualizado diariamente!", buttonText: "Ver horóscopo →", href: "/es/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "Diario", badgeColor: "bg-orange-500" },
  ],
  pt: [
    { id: 1, title: "Teste de Reação", subtitle: "Quão rápido você é?", description: "Clique no verde! Ganhe um vale-presente!", buttonText: "Desafio →", href: "/pt/reaction", gradient: "from-green-500 via-emerald-500 to-teal-500", emoji: "⚡", badge: "🎁 EVENTO", badgeColor: "bg-red-500" },
    { id: 2, title: "Quiz de Conhecimentos", subtitle: "Teste seus conhecimentos!", description: "10 perguntas de história, ciência e mais!", buttonText: "Começar →", href: "/pt/quiz", gradient: "from-indigo-500 via-purple-500 to-pink-500", emoji: "📚", badge: "NOVO", badgeColor: "bg-purple-500" },
    { id: 3, title: "Teste de QI", subtitle: "Padrões estilo Mensa!", description: "Encontre padrões e meça seu QI!", buttonText: "Começar →", href: "/pt/iq", gradient: "from-pink-500 via-rose-500 to-red-500", emoji: "🧩", badge: "NOVO", badgeColor: "bg-pink-500" },
    { id: 4, title: "Sudoku", subtitle: "Puzzle de números clássico!", description: "Complete a grade 9x9!", buttonText: "Jogar →", href: "/pt/sudoku", gradient: "from-cyan-500 via-blue-500 to-indigo-600", emoji: "🔢", badge: "NOVO", badgeColor: "bg-cyan-500" },
    { id: 5, title: "Horóscopo do Dia", subtitle: "Como será seu dia?", description: "Horóscopo atualizado diariamente!", buttonText: "Ver horóscopo →", href: "/pt/fortune", gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🔮", badge: "Diário", badgeColor: "bg-orange-500" },
  ],
};

interface MainBannerProps {
  locale?: Locale;
}

export default function MainBanner({ locale = 'ko' }: MainBannerProps) {
  const banners = bannersByLocale[locale] || bannersByLocale.ko;
  
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
  }, [isAutoPlaying, banners.length]);

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

