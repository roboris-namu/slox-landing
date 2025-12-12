"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Language = "ko" | "en";

interface FortuneProps {
  initialLang?: Language;
}

// 별자리 데이터
const zodiacSigns = [
  { id: "aries", emoji: "♈", ko: "양자리", en: "Aries", dates: "3/21-4/19" },
  { id: "taurus", emoji: "♉", ko: "황소자리", en: "Taurus", dates: "4/20-5/20" },
  { id: "gemini", emoji: "♊", ko: "쌍둥이자리", en: "Gemini", dates: "5/21-6/20" },
  { id: "cancer", emoji: "♋", ko: "게자리", en: "Cancer", dates: "6/21-7/22" },
  { id: "leo", emoji: "♌", ko: "사자자리", en: "Leo", dates: "7/23-8/22" },
  { id: "virgo", emoji: "♍", ko: "처녀자리", en: "Virgo", dates: "8/23-9/22" },
  { id: "libra", emoji: "♎", ko: "천칭자리", en: "Libra", dates: "9/23-10/22" },
  { id: "scorpio", emoji: "♏", ko: "전갈자리", en: "Scorpio", dates: "10/23-11/21" },
  { id: "sagittarius", emoji: "♐", ko: "사수자리", en: "Sagittarius", dates: "11/22-12/21" },
  { id: "capricorn", emoji: "♑", ko: "염소자리", en: "Capricorn", dates: "12/22-1/19" },
  { id: "aquarius", emoji: "♒", ko: "물병자리", en: "Aquarius", dates: "1/20-2/18" },
  { id: "pisces", emoji: "♓", ko: "물고기자리", en: "Pisces", dates: "2/19-3/20" },
];

// 운세 메시지 (각 카테고리별 다양한 메시지)
const fortuneMessages = {
  ko: {
    overall: [
      "오늘은 모든 일이 순조롭게 풀리는 날! 자신감을 가지세요 ✨",
      "예상치 못한 행운이 찾아올 수 있어요. 눈을 크게 뜨세요! 👀",
      "오늘은 조금 신중하게 행동하는 것이 좋겠어요 🤔",
      "창의력이 폭발하는 날! 새로운 아이디어를 시도해보세요 💡",
      "주변 사람들에게 좋은 영향을 줄 수 있는 날이에요 🌟",
      "오늘의 작은 노력이 큰 결과로 돌아올 거예요 💪",
      "직감을 믿으세요. 오늘은 당신의 감이 정확해요! 🎯",
      "새로운 만남이 기다리고 있을지도? 열린 마음으로! 💫",
    ],
    love: [
      "사랑이 가득한 하루! 마음을 표현해보세요 💕",
      "소중한 사람과 특별한 순간을 만들어보세요 💑",
      "혼자만의 시간도 소중해요. 나를 사랑하는 날! 🥰",
      "로맨틱한 기회가 올 수 있어요. 준비하세요! 💘",
      "소통이 중요한 날. 진심을 담아 대화하세요 💬",
      "작은 배려가 큰 감동을 줄 수 있어요 🌹",
    ],
    money: [
      "금전운이 상승 중! 투자에 관심을 가져보세요 📈",
      "오늘은 지출을 조금 줄이는 게 좋겠어요 💰",
      "예상치 못한 수입이 있을 수 있어요! 🎁",
      "재정 계획을 세우기 좋은 날이에요 📊",
      "나를 위한 작은 투자는 괜찮아요 🛍️",
      "절약이 미래의 풍요를 가져와요 🐷",
    ],
    health: [
      "에너지가 넘치는 날! 운동을 해보세요 🏃",
      "충분한 휴식이 필요해요. 무리하지 마세요 😴",
      "건강한 음식으로 몸에 활력을! 🥗",
      "스트레칭으로 몸을 풀어주세요 🧘",
      "물을 충분히 마시세요. 수분 보충 중요! 💧",
      "마음의 건강도 챙기세요. 명상 추천! 🧘‍♀️",
    ],
    work: [
      "업무 효율이 최고인 날! 중요한 일을 처리하세요 📋",
      "동료들과의 협업이 좋은 결과를 가져와요 🤝",
      "새로운 프로젝트를 시작하기 좋은 때! 🚀",
      "차분하게 계획을 세워보세요 📝",
      "리더십을 발휘할 기회가 올 수 있어요 👔",
      "작은 성과도 큰 의미가 있어요. 자축하세요! 🎉",
    ],
  },
  en: {
    overall: [
      "Everything goes smoothly today! Be confident ✨",
      "Unexpected luck may come. Keep your eyes open! 👀",
      "Today, it's better to act carefully 🤔",
      "Creativity explodes! Try new ideas 💡",
      "You can positively influence people around you 🌟",
      "Today's small effort will bring big results 💪",
      "Trust your intuition. Your sense is accurate today! 🎯",
      "New encounters may await. Keep an open mind! 💫",
    ],
    love: [
      "A day full of love! Express your heart 💕",
      "Create special moments with loved ones 💑",
      "Alone time is precious too. A day to love yourself! 🥰",
      "A romantic opportunity may come. Be ready! 💘",
      "Communication is key today. Talk with sincerity 💬",
      "Small gestures can bring big impressions 🌹",
    ],
    money: [
      "Financial luck is rising! Consider investments 📈",
      "Today might be good to reduce spending 💰",
      "Unexpected income may come! 🎁",
      "A good day to make financial plans 📊",
      "A small investment in yourself is okay 🛍️",
      "Saving brings future abundance 🐷",
    ],
    health: [
      "Full of energy! Try exercising 🏃",
      "You need enough rest. Don't overwork 😴",
      "Healthy food for vitality! 🥗",
      "Loosen up with some stretching 🧘",
      "Drink plenty of water. Hydration is important! 💧",
      "Take care of mental health too. Try meditation! 🧘‍♀️",
    ],
    work: [
      "Work efficiency at its peak! Handle important tasks 📋",
      "Collaboration with colleagues brings good results 🤝",
      "Great time to start new projects! 🚀",
      "Calmly make your plans 📝",
      "A chance to show leadership may come 👔",
      "Small achievements matter. Celebrate! 🎉",
    ],
  },
};

// 행운 아이템
const luckyItems = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  colors: {
    ko: ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라", "분홍", "하늘색", "골드", "실버", "검정", "흰색"],
    en: ["Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Purple", "Pink", "Sky Blue", "Gold", "Silver", "Black", "White"],
  },
  directions: {
    ko: ["동쪽", "서쪽", "남쪽", "북쪽", "동북쪽", "동남쪽", "서북쪽", "서남쪽"],
    en: ["East", "West", "South", "North", "Northeast", "Southeast", "Northwest", "Southwest"],
  },
  items: {
    ko: ["커피", "책", "꽃", "향수", "시계", "펜", "열쇠", "거울", "동전", "반지", "사진", "음악"],
    en: ["Coffee", "Book", "Flower", "Perfume", "Watch", "Pen", "Key", "Mirror", "Coin", "Ring", "Photo", "Music"],
  },
};

// 번역
const translations = {
  ko: {
    title: "오늘의",
    titleHighlight: " 운세",
    subtitle: "별자리를 선택하고 오늘의 운세를 확인하세요!",
    badge: "🔮 오늘의 운세",
    selectZodiac: "별자리 선택",
    yourFortune: "의 오늘 운세",
    overall: "🌟 총운",
    love: "💕 애정운",
    money: "💰 금전운",
    health: "💪 건강운",
    work: "📋 직장운",
    luckyItems: "🍀 행운의 아이템",
    luckyNumber: "행운의 숫자",
    luckyColor: "행운의 색상",
    luckyDirection: "행운의 방향",
    luckyItem: "행운의 아이템",
    score: "오늘의 운세 점수",
    share: "📤 공유하기",
    retry: "🔄 다른 별자리 보기",
    backToMain: "← 홈으로",
    todayDate: "오늘 날짜",
    copied: "클립보드에 복사되었습니다!",
  },
  en: {
    title: "Today's",
    titleHighlight: " Fortune",
    subtitle: "Select your zodiac sign and check today's fortune!",
    badge: "🔮 Daily Fortune",
    selectZodiac: "Select Zodiac",
    yourFortune: "'s Fortune Today",
    overall: "🌟 Overall",
    love: "💕 Love",
    money: "💰 Money",
    health: "💪 Health",
    work: "📋 Work",
    luckyItems: "🍀 Lucky Items",
    luckyNumber: "Lucky Number",
    luckyColor: "Lucky Color",
    luckyDirection: "Lucky Direction",
    luckyItem: "Lucky Item",
    score: "Today's Fortune Score",
    share: "📤 Share",
    retry: "🔄 Try Another Sign",
    backToMain: "← Home",
    todayDate: "Today's Date",
    copied: "Copied to clipboard!",
  },
};

export default function Fortune({ initialLang = "ko" }: FortuneProps) {
  const [lang] = useState<Language>(initialLang);
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [fortune, setFortune] = useState<{
    overall: string;
    love: string;
    money: string;
    health: string;
    work: string;
    score: number;
    luckyNumber: number[];
    luckyColor: string;
    luckyDirection: string;
    luckyItem: string;
  } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const t = translations[lang];

  // 날짜 기반 시드 생성 (같은 날 같은 운세)
  const getDateSeed = useCallback(() => {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  }, []);

  // 시드 기반 랜덤
  const seededRandom = useCallback((seed: number, index: number) => {
    const x = Math.sin(seed * 9999 + index * 7777) * 10000;
    return x - Math.floor(x);
  }, []);

  // 운세 생성
  const generateFortune = useCallback((zodiacId: string) => {
    const dateSeed = getDateSeed();
    const zodiacIndex = zodiacSigns.findIndex(z => z.id === zodiacId);
    const seed = dateSeed + zodiacIndex * 1000;

    const messages = fortuneMessages[lang];
    
    const getRandomFromArray = <T,>(arr: T[], seedOffset: number): T => {
      const idx = Math.floor(seededRandom(seed, seedOffset) * arr.length);
      return arr[idx];
    };

    // 행운의 숫자 3개
    const numbers: number[] = [];
    for (let i = 0; i < 3; i++) {
      let num;
      do {
        num = Math.floor(seededRandom(seed, 100 + i * 10) * 45) + 1;
      } while (numbers.includes(num));
      numbers.push(num);
    }
    numbers.sort((a, b) => a - b);

    // 운세 점수 (60-100)
    const score = Math.floor(seededRandom(seed, 200) * 40) + 60;

    setFortune({
      overall: getRandomFromArray(messages.overall, 1),
      love: getRandomFromArray(messages.love, 2),
      money: getRandomFromArray(messages.money, 3),
      health: getRandomFromArray(messages.health, 4),
      work: getRandomFromArray(messages.work, 5),
      score,
      luckyNumber: numbers,
      luckyColor: getRandomFromArray(luckyItems.colors[lang], 6),
      luckyDirection: getRandomFromArray(luckyItems.directions[lang], 7),
      luckyItem: getRandomFromArray(luckyItems.items[lang], 8),
    });
  }, [lang, getDateSeed, seededRandom]);

  // 별자리 선택
  const selectZodiac = (zodiacId: string) => {
    setIsRevealing(true);
    setSelectedZodiac(zodiacId);
    
    setTimeout(() => {
      generateFortune(zodiacId);
      setIsRevealing(false);
    }, 1500);
  };

  // 공유하기
  const handleShare = () => {
    if (!fortune || !selectedZodiac) return;
    
    const zodiac = zodiacSigns.find(z => z.id === selectedZodiac);
    const today = new Date().toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US");
    
    const text = lang === "ko"
      ? `🔮 ${today} ${zodiac?.ko} 운세\n\n⭐ 운세 점수: ${fortune.score}점\n\n${fortune.overall}\n\n🍀 행운의 숫자: ${fortune.luckyNumber.join(", ")}\n🎨 행운의 색상: ${fortune.luckyColor}\n\n👉 나도 확인하기: ${window.location.href}`
      : `🔮 ${zodiac?.en} Fortune for ${today}\n\n⭐ Score: ${fortune.score}/100\n\n${fortune.overall}\n\n🍀 Lucky Numbers: ${fortune.luckyNumber.join(", ")}\n🎨 Lucky Color: ${fortune.luckyColor}\n\n👉 Check yours: ${window.location.href}`;
    
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // 다시하기
  const handleRetry = () => {
    setSelectedZodiac(null);
    setFortune(null);
  };

  // 오늘 날짜
  const today = new Date().toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <main className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full text-sm text-purple-300 mb-4 border border-purple-500/30">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-dark-400 mb-2">{t.subtitle}</p>
          <p className="text-sm text-purple-400">{today}</p>
        </div>

        {/* 별자리 선택 화면 */}
        {!selectedZodiac && !isRevealing && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-center mb-8 text-purple-300">{t.selectZodiac}</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {zodiacSigns.map((zodiac) => (
                <button
                  key={zodiac.id}
                  onClick={() => selectZodiac(zodiac.id)}
                  className="group p-4 md:p-6 bg-dark-900/50 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-indigo-500/20 border border-dark-800 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{zodiac.emoji}</div>
                  <div className="text-sm font-medium text-white">{lang === "ko" ? zodiac.ko : zodiac.en}</div>
                  <div className="text-xs text-dark-500 mt-1">{zodiac.dates}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 로딩 애니메이션 */}
        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl animate-bounce mb-6">🔮</div>
            <div className="text-xl text-purple-300 animate-pulse">
              {lang === "ko" ? "운세를 확인하고 있어요..." : "Reading your fortune..."}
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* 운세 결과 */}
        {fortune && selectedZodiac && !isRevealing && (
          <div className="animate-fade-in space-y-6">
            {/* 별자리 & 점수 */}
            <div className="text-center p-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-3xl">
              <div className="text-5xl mb-4">
                {zodiacSigns.find(z => z.id === selectedZodiac)?.emoji}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {lang === "ko" 
                  ? zodiacSigns.find(z => z.id === selectedZodiac)?.ko 
                  : zodiacSigns.find(z => z.id === selectedZodiac)?.en}
                {t.yourFortune}
              </h2>
              <div className="mt-6">
                <div className="text-sm text-purple-400 mb-2">{t.score}</div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                  {fortune.score}
                  <span className="text-2xl text-dark-400">/100</span>
                </div>
                {/* 점수 바 */}
                <div className="mt-4 w-full max-w-xs mx-auto h-3 bg-dark-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-1000 ease-out"
                    style={{ width: `${fortune.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 운세 카테고리 */}
            <div className="grid gap-4">
              {[
                { key: "overall", label: t.overall, message: fortune.overall, color: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/30" },
                { key: "love", label: t.love, message: fortune.love, color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/30" },
                { key: "money", label: t.money, message: fortune.money, color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
                { key: "health", label: t.health, message: fortune.health, color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30" },
                { key: "work", label: t.work, message: fortune.work, color: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/30" },
              ].map((item, index) => (
                <div 
                  key={item.key}
                  className={`p-5 bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-medium text-white mb-2">{item.label}</h3>
                  <p className="text-dark-300">{item.message}</p>
                </div>
              ))}
            </div>

            {/* 행운의 아이템 */}
            <div className="p-6 bg-dark-900/50 border border-dark-800 rounded-2xl">
              <h3 className="text-lg font-medium text-center text-purple-300 mb-6">{t.luckyItems}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <div className="text-2xl mb-2">🔢</div>
                  <div className="text-xs text-dark-400 mb-1">{t.luckyNumber}</div>
                  <div className="font-bold text-yellow-400">{fortune.luckyNumber.join(", ")}</div>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-xs text-dark-400 mb-1">{t.luckyColor}</div>
                  <div className="font-bold text-pink-400">{fortune.luckyColor}</div>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <div className="text-2xl mb-2">🧭</div>
                  <div className="text-xs text-dark-400 mb-1">{t.luckyDirection}</div>
                  <div className="font-bold text-blue-400">{fortune.luckyDirection}</div>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-xs text-dark-400 mb-1">{t.luckyItem}</div>
                  <div className="font-bold text-green-400">{fortune.luckyItem}</div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium rounded-xl transition-all hover:scale-105"
              >
                {showCopied ? t.copied : t.share}
              </button>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
              >
                {t.retry}
              </button>
            </div>
          </div>
        )}

        {/* 하단 링크 */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-dark-500 hover:text-purple-400 transition-colors">
            {t.backToMain}
          </Link>
        </div>
      </div>
    </main>
  );
}

