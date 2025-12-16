"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Language = "ko" | "en";

interface DailyQuoteProps {
  initialLang?: Language;
}

// 카테고리 정의
const categories = [
  { id: "motivation", emoji: "🔥", ko: "동기부여", en: "Motivation" },
  { id: "love", emoji: "💕", ko: "사랑", en: "Love" },
  { id: "success", emoji: "🏆", ko: "성공", en: "Success" },
  { id: "wisdom", emoji: "🦉", ko: "지혜", en: "Wisdom" },
  { id: "happiness", emoji: "😊", ko: "행복", en: "Happiness" },
  { id: "courage", emoji: "💪", ko: "용기", en: "Courage" },
  { id: "friendship", emoji: "🤝", ko: "우정", en: "Friendship" },
  { id: "life", emoji: "🌱", ko: "인생", en: "Life" },
];

// 명언 데이터
const quotes = {
  ko: {
    motivation: [
      { text: "시작이 반이다.", author: "아리스토텔레스" },
      { text: "할 수 있다고 믿는 사람은 결국 해낸다.", author: "버질" },
      { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
      { text: "포기하지 않으면 실패란 없다.", author: "앤드류 카네기" },
      { text: "작은 기회로부터 종종 위대한 업적이 시작된다.", author: "데모스테네스" },
      { text: "당신이 할 수 있다고 믿든, 없다고 믿든, 당신 말이 맞다.", author: "헨리 포드" },
      { text: "성공은 매일 반복한 작은 노력들의 합이다.", author: "로버트 콜리어" },
      { text: "꿈을 이루고 싶다면 먼저 깨어나야 한다.", author: "J.M. 파워" },
    ],
    love: [
      { text: "사랑은 소유가 아니라 존중이다.", author: "에리히 프롬" },
      { text: "사랑받고 싶다면 사랑하라, 그리고 사랑스럽게 행동하라.", author: "벤자민 프랭클린" },
      { text: "진정한 사랑은 주는 것이지 받는 것이 아니다.", author: "오 헨리" },
      { text: "사랑은 눈으로 보지 않고 마음으로 보는 것이다.", author: "셰익스피어" },
      { text: "가장 큰 사랑은 자기 자신을 사랑하는 것이다.", author: "오스카 와일드" },
      { text: "사랑은 삶을 살 만한 가치가 있게 만든다.", author: "헬렌 켈러" },
    ],
    success: [
      { text: "성공의 비결은 시작하는 것이다.", author: "마크 트웨인" },
      { text: "실패는 성공의 어머니다.", author: "토마스 에디슨" },
      { text: "성공한 사람이 되려 하지 말고 가치 있는 사람이 되려고 하라.", author: "알버트 아인슈타인" },
      { text: "성공은 열정을 잃지 않고 실패에서 실패로 걸어가는 것이다.", author: "윈스턴 처칠" },
      { text: "기회는 일어나는 것이 아니라 만들어내는 것이다.", author: "크리스 그로서" },
      { text: "성공의 80%는 그 자리에 나타나는 것이다.", author: "우디 앨런" },
    ],
    wisdom: [
      { text: "아는 것이 힘이다.", author: "프랜시스 베이컨" },
      { text: "내가 아는 한 가지는 내가 아무것도 모른다는 것이다.", author: "소크라테스" },
      { text: "배움에는 끝이 없다.", author: "공자" },
      { text: "현명한 자는 말하기 전에 생각하고, 어리석은 자는 생각하기 전에 말한다.", author: "작자 미상" },
      { text: "인생에서 가장 큰 영광은 넘어지지 않는 것이 아니라 매번 일어서는 것이다.", author: "넬슨 만델라" },
      { text: "변화를 두려워하지 마라. 변하지 않는 것을 두려워하라.", author: "작자 미상" },
    ],
    happiness: [
      { text: "행복은 습관이다. 그것을 몸에 지녀라.", author: "허버드" },
      { text: "행복은 목적지가 아니라 여행이다.", author: "벤 스위트랜드" },
      { text: "가장 행복한 사람은 가장 많이 가진 사람이 아니라 가장 감사할 줄 아는 사람이다.", author: "작자 미상" },
      { text: "행복은 만들어 가는 것이지, 찾는 것이 아니다.", author: "작자 미상" },
      { text: "오늘을 행복하게 사는 것이 가장 좋은 복수다.", author: "작자 미상" },
      { text: "행복의 비결은 필요한 것을 원하는 것이 아니라 가진 것을 원하는 것이다.", author: "작자 미상" },
    ],
    courage: [
      { text: "용기란 두려움이 없는 것이 아니라 두려움보다 더 중요한 것이 있다는 판단이다.", author: "앰브로스 레드문" },
      { text: "시도해보지 않은 것에서만 진정한 실패가 있다.", author: "진 바에즈" },
      { text: "두려움은 희망보다 오래 지속되지 않는다.", author: "작자 미상" },
      { text: "용기 있는 자가 아름다운 것을 얻는다.", author: "작자 미상" },
      { text: "위험을 감수하지 않으면 아무것도 얻을 수 없다.", author: "작자 미상" },
    ],
    friendship: [
      { text: "친구란 네가 누구인지 알면서도 너를 사랑하는 사람이다.", author: "엘버트 허버드" },
      { text: "좋은 친구는 별과 같다. 항상 보이지 않아도 항상 거기 있다.", author: "작자 미상" },
      { text: "친구를 얻는 유일한 방법은 스스로 친구가 되는 것이다.", author: "랄프 왈도 에머슨" },
      { text: "진정한 친구는 어려울 때 알 수 있다.", author: "아이소포스" },
      { text: "우정은 천천히 익는 과일이다.", author: "아리스토텔레스" },
    ],
    life: [
      { text: "인생은 짧다. 미소 짓고, 사랑하고, 웃어라.", author: "작자 미상" },
      { text: "삶이 레몬을 주면 레모네이드를 만들어라.", author: "엘버트 허버드" },
      { text: "인생에서 가장 중요한 것은 경험이다.", author: "랄프 왈도 에머슨" },
      { text: "오늘 하루도 당신의 인생이다. 소중하게 살아라.", author: "작자 미상" },
      { text: "인생은 자전거 타기와 같다. 균형을 잡으려면 계속 움직여야 한다.", author: "알버트 아인슈타인" },
      { text: "어제는 역사이고, 내일은 미스터리이며, 오늘은 선물이다.", author: "빌 키인" },
    ],
  },
  en: {
    motivation: [
      { text: "Well begun is half done.", author: "Aristotle" },
      { text: "He who believes he can, will.", author: "Virgil" },
      { text: "Never put off till tomorrow what you can do today.", author: "Benjamin Franklin" },
      { text: "There is no failure except in no longer trying.", author: "Andrew Carnegie" },
      { text: "From a small spark may burst a flame.", author: "Demosthenes" },
      { text: "Whether you think you can or you can't, you're right.", author: "Henry Ford" },
      { text: "Success is the sum of small efforts repeated daily.", author: "Robert Collier" },
      { text: "To achieve your dreams, you must first wake up.", author: "J.M. Power" },
    ],
    love: [
      { text: "Love is not about possession, it's about appreciation.", author: "Erich Fromm" },
      { text: "If you want to be loved, love and be lovable.", author: "Benjamin Franklin" },
      { text: "True love is giving, not receiving.", author: "O. Henry" },
      { text: "Love looks not with the eyes, but with the heart.", author: "Shakespeare" },
      { text: "To love oneself is the beginning of a lifelong romance.", author: "Oscar Wilde" },
      { text: "Life is nothing without love.", author: "Helen Keller" },
    ],
    success: [
      { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
      { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
      { text: "Try not to become a person of success, but rather a person of value.", author: "Albert Einstein" },
      { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
      { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
      { text: "Eighty percent of success is showing up.", author: "Woody Allen" },
    ],
    wisdom: [
      { text: "Knowledge is power.", author: "Francis Bacon" },
      { text: "I know that I know nothing.", author: "Socrates" },
      { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
      { text: "The wise speak only of what they know.", author: "J.R.R. Tolkien" },
      { text: "The greatest glory is not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
      { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    ],
    happiness: [
      { text: "Happiness is a habit. Cultivate it.", author: "Elbert Hubbard" },
      { text: "Happiness is a journey, not a destination.", author: "Ben Sweetland" },
      { text: "The happiest people don't have the best, they make the best of what they have.", author: "Unknown" },
      { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "The best revenge is massive success.", author: "Frank Sinatra" },
      { text: "Happiness is wanting what you have.", author: "Unknown" },
    ],
    courage: [
      { text: "Courage is not the absence of fear, but rather the judgment that something else is more important.", author: "Ambrose Redmoon" },
      { text: "The only real failure in life is not to be true to the best one knows.", author: "Buddha" },
      { text: "Fear lasts longer than hope.", author: "Unknown" },
      { text: "Fortune favors the brave.", author: "Virgil" },
      { text: "Nothing ventured, nothing gained.", author: "Unknown" },
    ],
    friendship: [
      { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
      { text: "Good friends are like stars. You don't always see them, but they're always there.", author: "Unknown" },
      { text: "The only way to have a friend is to be one.", author: "Ralph Waldo Emerson" },
      { text: "A friend in need is a friend indeed.", author: "Unknown" },
      { text: "Friendship is a slow-ripening fruit.", author: "Aristotle" },
    ],
    life: [
      { text: "Life is short. Smile while you still have teeth.", author: "Unknown" },
      { text: "When life gives you lemons, make lemonade.", author: "Elbert Hubbard" },
      { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
      { text: "Today is a gift. That's why it's called the present.", author: "Unknown" },
      { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
      { text: "Yesterday is history, tomorrow is mystery, today is a gift.", author: "Bill Keane" },
    ],
  },
};

// 번역
const translations = {
  ko: {
    title: "오늘의",
    titleHighlight: " 명언",
    subtitle: "하루를 시작하는 영감을 얻어보세요!",
    badge: "💬 오늘의 명언",
    selectCategory: "카테고리 선택",
    randomQuote: "🎲 랜덤 명언",
    allCategories: "전체",
    todaysQuote: "오늘의 명언",
    share: "📤 공유하기",
    newQuote: "🔄 다른 명언",
    backToMain: "← 홈으로",
    copied: "클립보드에 복사되었습니다!",
    author: "- ",
  },
  en: {
    title: "Daily",
    titleHighlight: " Quote",
    subtitle: "Get inspired to start your day!",
    badge: "💬 Daily Quote",
    selectCategory: "Select Category",
    randomQuote: "🎲 Random Quote",
    allCategories: "All",
    todaysQuote: "Today's Quote",
    share: "📤 Share",
    newQuote: "🔄 New Quote",
    backToMain: "← Home",
    copied: "Copied to clipboard!",
    author: "- ",
  },
};

export default function DailyQuote({ initialLang = "ko" }: DailyQuoteProps) {
  const [lang] = useState<Language>(initialLang);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [quote, setQuote] = useState<{ text: string; author: string; category: string } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const t = translations[lang];

  // 명언 생성 (완전 랜덤)
  const generateQuote = useCallback((categoryId: string | null) => {
    let selectedQuotes: { text: string; author: string }[];
    let category: string;

    if (categoryId) {
      selectedQuotes = quotes[lang][categoryId as keyof typeof quotes.ko];
      category = categoryId;
    } else {
      // 랜덤 카테고리
      const randomCatIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomCatIndex].id;
      selectedQuotes = quotes[lang][randomCategory as keyof typeof quotes.ko];
      category = randomCategory;
    }

    const quoteIndex = Math.floor(Math.random() * selectedQuotes.length);
    const selectedQuote = selectedQuotes[quoteIndex];

    setQuote({
      text: selectedQuote.text,
      author: selectedQuote.author,
      category,
    });
  }, [lang]);

  // 카테고리 선택
  const selectCategory = (categoryId: string | null) => {
    setIsRevealing(true);
    setCurrentCategory(categoryId);
    
    setTimeout(() => {
      generateQuote(categoryId);
      setIsRevealing(false);
    }, 1000);
  };

  // 다른 명언 보기 (같은 카테고리에서)
  const handleNewQuote = () => {
    setIsRevealing(true);
    
    setTimeout(() => {
      generateQuote(currentCategory);
      setIsRevealing(false);
    }, 500);
  };

  // 카카오 인앱 브라우저 감지
  const isKakaoInApp = () => {
    if (typeof window === "undefined") return false;
    return navigator.userAgent.toLowerCase().includes("kakaotalk");
  };

  // 공유하기
  const handleShare = async () => {
    if (!quote) return;
    
    const categoryInfo = categories.find(c => c.id === quote.category);
    const categoryName = lang === "ko" ? categoryInfo?.ko : categoryInfo?.en;
    
    const text = `💬 오늘의 명언 [${categoryName}]\n\n"${quote.text}"\n\n${t.author}${quote.author}\n\n👉 나도 확인하기: https://www.slox.co.kr/quote`;

    // 카카오 인앱 브라우저면 클립보드로
    if (isKakaoInApp()) {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      return;
    }

    // Web Share API 지원하면 사용
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
      }
    }
    
    // 지원 안 하면 클립보드 복사
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // 처음으로 돌아가기
  const handleRetry = () => {
    setCurrentCategory(null);
    setQuote(null);
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full text-sm text-amber-300 mb-4 border border-amber-500/30">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-dark-400 mb-2">{t.subtitle}</p>
          <p className="text-sm text-amber-400">{today}</p>
        </div>

        {/* 카테고리 선택 화면 */}
        {!quote && !isRevealing && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium text-center mb-8 text-amber-300">{t.selectCategory}</h2>
            
            {/* 랜덤 버튼 */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => selectCategory(null)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                {t.randomQuote}
              </button>
            </div>

            <p className="text-center text-dark-500 mb-6">또는 카테고리 선택</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className="group p-4 md:p-6 bg-dark-900/50 hover:bg-gradient-to-br hover:from-amber-500/20 hover:to-orange-500/20 border border-dark-800 hover:border-amber-500/50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{category.emoji}</div>
                  <div className="text-sm font-medium text-white">{lang === "ko" ? category.ko : category.en}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 로딩 애니메이션 */}
        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl animate-bounce mb-6">💬</div>
            <div className="text-xl text-amber-300 animate-pulse">
              {lang === "ko" ? "명언을 찾고 있어요..." : "Finding a quote for you..."}
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* 명언 결과 */}
        {quote && !isRevealing && (
          <div className="animate-fade-in">
            {/* 카테고리 표시 */}
            <div className="flex justify-center mb-6">
              <div className="px-4 py-2 bg-dark-800/50 rounded-full text-sm flex items-center gap-2">
                <span>{categories.find(c => c.id === quote.category)?.emoji}</span>
                <span className="text-amber-400">
                  {lang === "ko" 
                    ? categories.find(c => c.id === quote.category)?.ko 
                    : categories.find(c => c.id === quote.category)?.en}
                </span>
              </div>
            </div>

            {/* 명언 카드 */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 rounded-3xl text-center relative overflow-hidden">
              {/* 따옴표 장식 */}
              <div className="absolute top-4 left-6 text-6xl text-amber-500/20 font-serif">&ldquo;</div>
              <div className="absolute bottom-4 right-6 text-6xl text-amber-500/20 font-serif">&rdquo;</div>
              
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8">
                  {quote.text}
                </p>
                <p className="text-lg text-amber-400">
                  {t.author}{quote.author}
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all hover:scale-105"
              >
                {showCopied ? t.copied : t.share}
              </button>
              <button
                onClick={handleNewQuote}
                className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
              >
                {t.newQuote}
              </button>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-dark-900 hover:bg-dark-800 text-dark-400 hover:text-white font-medium rounded-xl transition-all border border-dark-700"
              >
                🏠 처음으로
              </button>
            </div>

            {/* 다른 카테고리 */}
            <div className="mt-12">
              <p className="text-center text-dark-500 mb-4">다른 카테고리도 확인해보세요</p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.filter(c => c.id !== quote.category).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => selectCategory(category.id)}
                    className="px-3 py-1.5 bg-dark-800/50 hover:bg-dark-700/50 text-dark-400 hover:text-white text-sm rounded-full transition-all flex items-center gap-1"
                  >
                    <span>{category.emoji}</span>
                    <span>{lang === "ko" ? category.ko : category.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 하단 링크 */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-dark-500 hover:text-amber-400 transition-colors">
            {t.backToMain}
          </Link>
        </div>
      </div>
    </main>
  );
}

