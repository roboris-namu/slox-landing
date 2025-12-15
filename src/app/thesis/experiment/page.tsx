"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "ko" | "en";
type Choice = "A" | "B" | "C" | null;

interface VoteStats {
  A: number;
  B: number;
  C: number;
  total: number;
}

const translations = {
  ko: {
    badge: "🧪 사용자 실험",
    title: "어떤 추천이 더",
    titleHighlight: " 신뢰가 가나요?",
    subtitle: "3가지 추천 방식을 비교하고 투표해주세요. 연구에 큰 도움이 됩니다!",
    
    profileTitle: "👤 가상 사용자 프로필",
    recentMovies: "최근 본 영화",
    preferredGenres: "선호 장르",
    
    recommendedMovie: "추천 영화",
    
    optionA: "A. 설명 없음",
    optionADesc: "기존 추천 방식",
    optionB: "B. 단순 설명",
    optionBDesc: "규칙 기반 설명",
    optionC: "C. LLM 설명",
    optionCDesc: "AI 생성 설명",
    
    selectBtn: "이게 더 신뢰가 가요!",
    selected: "✓ 선택됨",
    
    statsTitle: "📊 실시간 투표 현황",
    totalVotes: "총 참여자",
    people: "명",
    
    resultTitle: "🎉 투표 완료!",
    resultDesc: "소중한 의견 감사합니다. 연구에 큰 도움이 됩니다.",
    tryAgain: "다시 투표하기",
    
    insightTitle: "💡 연구 인사이트",
    insight1: "LLM 설명이 사용자 신뢰도를 높이는 경향",
    insight2: "구체적인 이유가 있을수록 설득력 증가",
    insight3: "개인화된 설명이 일반적 설명보다 효과적",
    
    backToThesis: "← 연구 메인",
    backToMain: "← SLOX 메인",
  },
  en: {
    badge: "🧪 User Experiment",
    title: "Which recommendation",
    titleHighlight: " do you trust more?",
    subtitle: "Compare 3 recommendation styles and vote. Your input helps our research!",
    
    profileTitle: "👤 Virtual User Profile",
    recentMovies: "Recent Movies",
    preferredGenres: "Preferred Genres",
    
    recommendedMovie: "Recommended Movie",
    
    optionA: "A. No Explanation",
    optionADesc: "Traditional style",
    optionB: "B. Simple Explanation",
    optionBDesc: "Rule-based",
    optionC: "C. LLM Explanation",
    optionCDesc: "AI-generated",
    
    selectBtn: "I trust this more!",
    selected: "✓ Selected",
    
    statsTitle: "📊 Live Voting Results",
    totalVotes: "Total Participants",
    people: "",
    
    resultTitle: "🎉 Vote Submitted!",
    resultDesc: "Thank you for your valuable input. It helps our research greatly.",
    tryAgain: "Vote Again",
    
    insightTitle: "💡 Research Insights",
    insight1: "LLM explanations tend to increase user trust",
    insight2: "Specific reasons are more persuasive",
    insight3: "Personalized > Generic explanations",
    
    backToThesis: "← Research Main",
    backToMain: "← SLOX Home",
  },
};

const movieScenarios = {
  ko: [
    {
      profile: {
        recentMovies: ["인셉션", "그래비티", "마션"],
        genres: ["SF", "스릴러", "액션"],
      },
      movie: { title: "인터스텔라", year: 2014, rating: 9.0, poster: "🎬" },
      explanations: {
        A: "인터스텔라를 추천합니다.",
        B: "SF 장르를 좋아하는 사용자들에게 인기 있는 영화입니다.",
        C: "최근 '인셉션'과 '그래비티'를 즐겁게 보셨네요! 이 영화도 우주를 배경으로 한 SF 대작입니다. 크리스토퍼 놀란 감독의 작품을 좋아하시는 것 같아 강력 추천드려요. 시간과 사랑에 대한 깊은 메시지도 인상적입니다.",
      },
    },
    {
      profile: {
        recentMovies: ["올드보이", "기생충", "살인의 추억"],
        genres: ["스릴러", "드라마", "미스터리"],
      },
      movie: { title: "마더", year: 2009, rating: 8.3, poster: "🎭" },
      explanations: {
        A: "마더를 추천합니다.",
        B: "봉준호 감독의 스릴러 영화입니다.",
        C: "'기생충'과 '살인의 추억'을 보셨군요! 같은 봉준호 감독의 작품으로, 모성애와 광기를 다룬 강렬한 스릴러입니다. 김혜자 배우의 압도적인 연기가 인상적인 작품이에요.",
      },
    },
    {
      profile: {
        recentMovies: ["어바웃 타임", "노팅힐", "러브 액츄얼리"],
        genres: ["로맨스", "코미디", "드라마"],
      },
      movie: { title: "비포 선라이즈", year: 1995, rating: 8.5, poster: "💕" },
      explanations: {
        A: "비포 선라이즈를 추천합니다.",
        B: "로맨스 영화를 좋아하는 분들께 추천드립니다.",
        C: "'어바웃 타임'처럼 시간과 사랑을 다루면서도, 더 현실적이고 대화 중심인 로맨스예요. 기차에서 만난 두 사람의 하룻밤 대화가 주는 설렘이 일품입니다. 후속작까지 이어지는 시리즈물이에요!",
      },
    },
  ],
  en: [
    {
      profile: {
        recentMovies: ["Inception", "Gravity", "The Martian"],
        genres: ["Sci-Fi", "Thriller", "Action"],
      },
      movie: { title: "Interstellar", year: 2014, rating: 9.0, poster: "🎬" },
      explanations: {
        A: "We recommend Interstellar.",
        B: "Popular movie among users who like Sci-Fi.",
        C: "You recently enjoyed 'Inception' and 'Gravity'! This is also an epic sci-fi set in space. Since you seem to love Christopher Nolan's work, I highly recommend it. The deep message about time and love is impressive too.",
      },
    },
    {
      profile: {
        recentMovies: ["Oldboy", "Parasite", "Memories of Murder"],
        genres: ["Thriller", "Drama", "Mystery"],
      },
      movie: { title: "Mother", year: 2009, rating: 8.3, poster: "🎭" },
      explanations: {
        A: "We recommend Mother.",
        B: "A thriller by director Bong Joon-ho.",
        C: "You watched 'Parasite' and 'Memories of Murder'! This is another Bong Joon-ho film - an intense thriller about motherhood and madness. Kim Hye-ja's overwhelming performance is remarkable.",
      },
    },
    {
      profile: {
        recentMovies: ["About Time", "Notting Hill", "Love Actually"],
        genres: ["Romance", "Comedy", "Drama"],
      },
      movie: { title: "Before Sunrise", year: 1995, rating: 8.5, poster: "💕" },
      explanations: {
        A: "We recommend Before Sunrise.",
        B: "Recommended for romance movie lovers.",
        C: "Like 'About Time', it deals with time and love, but more realistic and dialogue-driven. The thrill of two strangers talking through the night in Vienna is magical. It's part of a trilogy!",
      },
    },
  ],
};

export default function ExperimentPage() {
  const [lang, setLang] = useState<Language>("ko");
  const [choice, setChoice] = useState<Choice>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stats, setStats] = useState<VoteStats>({ A: 47, B: 89, C: 206, total: 342 });
  
  const t = translations[lang];
  const scenarios = movieScenarios[lang];
  const scenario = scenarios[scenarioIndex];

  // 로컬 스토리지에서 투표 여부 확인
  useEffect(() => {
    const voted = localStorage.getItem("thesis-experiment-voted");
    if (voted) {
      setHasVoted(true);
      setChoice(voted as Choice);
    }
  }, []);

  const handleVote = (selected: Choice) => {
    if (hasVoted || !selected) return;
    
    setIsAnimating(true);
    setChoice(selected);
    
    // 통계 업데이트 (시뮬레이션)
    setStats(prev => ({
      ...prev,
      [selected]: prev[selected] + 1,
      total: prev.total + 1,
    }));
    
    setTimeout(() => {
      setHasVoted(true);
      setIsAnimating(false);
      localStorage.setItem("thesis-experiment-voted", selected);
    }, 800);
  };

  const resetVote = () => {
    setHasVoted(false);
    setChoice(null);
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    localStorage.removeItem("thesis-experiment-voted");
  };

  const getPercentage = (key: "A" | "B" | "C") => {
    return Math.round((stats[key] / stats.total) * 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* 네비게이션 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/thesis" className="text-slate-400 hover:text-white transition-colors">
            {t.backToThesis}
          </Link>
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg">
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "ko" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "en" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-500/10 rounded-full text-sm text-purple-400 mb-6 border border-purple-500/20">
            {t.badge}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* 사용자 프로필 */}
        <div className="mb-8 p-6 bg-slate-800/30 border border-slate-700 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">{t.profileTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 text-sm mb-2">{t.recentMovies}</p>
              <div className="flex flex-wrap gap-2">
                {scenario.profile.recentMovies.map((m, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-2">{t.preferredGenres}</p>
              <div className="flex flex-wrap gap-2">
                {scenario.profile.genres.map((g, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 추천 영화 정보 */}
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl text-center">
          <p className="text-slate-400 text-sm mb-2">{t.recommendedMovie}</p>
          <div className="text-5xl mb-3">{scenario.movie.poster}</div>
          <h2 className="text-2xl font-bold">{scenario.movie.title}</h2>
          <p className="text-slate-400">{scenario.movie.year} • ⭐ {scenario.movie.rating}</p>
        </div>

        {/* 3가지 옵션 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Option A */}
          <div
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              choice === "A"
                ? "bg-red-500/20 border-red-500/50 scale-[1.02]"
                : "bg-slate-800/30 border-slate-700 hover:border-slate-500"
            } ${hasVoted && choice !== "A" ? "opacity-50" : ""}`}
            onClick={() => !hasVoted && handleVote("A")}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">❌</span>
              <div>
                <h3 className="font-bold text-red-400">{t.optionA}</h3>
                <p className="text-slate-500 text-xs">{t.optionADesc}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl min-h-[120px] flex items-center">
              <p className="text-slate-300">{scenario.explanations.A}</p>
            </div>
            {!hasVoted && (
              <button className="w-full mt-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-all">
                {t.selectBtn}
              </button>
            )}
            {choice === "A" && (
              <div className="mt-4 text-center text-red-400 font-medium">{t.selected}</div>
            )}
          </div>

          {/* Option B */}
          <div
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              choice === "B"
                ? "bg-yellow-500/20 border-yellow-500/50 scale-[1.02]"
                : "bg-slate-800/30 border-slate-700 hover:border-slate-500"
            } ${hasVoted && choice !== "B" ? "opacity-50" : ""}`}
            onClick={() => !hasVoted && handleVote("B")}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-bold text-yellow-400">{t.optionB}</h3>
                <p className="text-slate-500 text-xs">{t.optionBDesc}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl min-h-[120px] flex items-center">
              <p className="text-slate-300">{scenario.explanations.B}</p>
            </div>
            {!hasVoted && (
              <button className="w-full mt-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-lg text-sm transition-all">
                {t.selectBtn}
              </button>
            )}
            {choice === "B" && (
              <div className="mt-4 text-center text-yellow-400 font-medium">{t.selected}</div>
            )}
          </div>

          {/* Option C */}
          <div
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              choice === "C"
                ? "bg-green-500/20 border-green-500/50 scale-[1.02]"
                : "bg-slate-800/30 border-slate-700 hover:border-slate-500"
            } ${hasVoted && choice !== "C" ? "opacity-50" : ""}`}
            onClick={() => !hasVoted && handleVote("C")}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-bold text-green-400">{t.optionC}</h3>
                <p className="text-slate-500 text-xs">{t.optionCDesc}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-xl min-h-[120px] flex items-center">
              <p className="text-slate-300 text-sm leading-relaxed">{scenario.explanations.C}</p>
            </div>
            {!hasVoted && (
              <button className="w-full mt-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg text-sm transition-all">
                {t.selectBtn}
              </button>
            )}
            {choice === "C" && (
              <div className="mt-4 text-center text-green-400 font-medium">{t.selected}</div>
            )}
          </div>
        </div>

        {/* 실시간 투표 현황 */}
        <div className={`p-6 bg-slate-800/30 border border-slate-700 rounded-2xl mb-8 transition-all ${isAnimating ? "animate-pulse" : ""}`}>
          <h3 className="text-lg font-bold mb-4">{t.statsTitle}</h3>
          
          <div className="space-y-4">
            {/* A */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400">{t.optionA}</span>
                <span className="text-slate-400">{getPercentage("A")}% ({stats.A}{t.people})</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage("A")}%` }}
                />
              </div>
            </div>

            {/* B */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-yellow-400">{t.optionB}</span>
                <span className="text-slate-400">{getPercentage("B")}% ({stats.B}{t.people})</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage("B")}%` }}
                />
              </div>
            </div>

            {/* C */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">{t.optionC}</span>
                <span className="text-slate-400">{getPercentage("C")}% ({stats.C}{t.people}) 🏆</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage("C")}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-sm mt-4 text-center">
            {t.totalVotes}: {stats.total}{t.people}
          </p>
        </div>

        {/* 투표 완료 메시지 */}
        {hasVoted && (
          <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl mb-8 text-center">
            <h3 className="text-2xl font-bold mb-2">{t.resultTitle}</h3>
            <p className="text-slate-400 mb-4">{t.resultDesc}</p>
            <button
              onClick={resetVote}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>
        )}

        {/* 연구 인사이트 */}
        <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl mb-8">
          <h3 className="text-lg font-bold mb-4">{t.insightTitle}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">📈</span>
              <p className="text-slate-300">{t.insight1}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <p className="text-slate-300">{t.insight2}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">👤</span>
              <p className="text-slate-300">{t.insight3}</p>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center pt-8 border-t border-slate-800">
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/thesis" className="text-purple-400 hover:text-purple-300 transition-colors">
              {t.backToThesis}
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/" className="text-slate-500 hover:text-white transition-colors">
              {t.backToMain}
            </Link>
          </div>
          <p className="text-slate-600 text-sm">© 2025 SLOX Research</p>
        </div>
      </div>
    </main>
  );
}

