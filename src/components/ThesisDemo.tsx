"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "ko" | "en";

const translations = {
  ko: {
    badge: "🎓 석사 논문 연구",
    title: "LLM 기반",
    titleHighlight: " 설명 가능한 추천시스템",
    subtitle: "대규모 언어모델을 활용하여 추천 이유를 자연어로 설명하는 차세대 추천시스템 연구",
    
    problemTitle: "❓ 연구 문제",
    problemDesc: "기존 추천시스템은 '왜' 추천하는지 설명하지 않아 사용자 신뢰도가 낮습니다",
    
    solutionTitle: "💡 제안 방법",
    solutionDesc: "LLM을 활용해 추천 이유를 자연스러운 문장으로 생성합니다",
    
    comparisonTitle: "📊 비교: 기존 vs 제안",
    beforeLabel: "기존 방식",
    afterLabel: "제안 방식 (LLM)",
    
    demoTitle: "🎬 실시간 데모",
    demoDesc: "추천 영화를 선택하면 LLM이 설명을 생성합니다",
    selectMovie: "영화 선택",
    generating: "설명 생성 중...",
    
    userProfile: "👤 사용자 프로필",
    recentMovies: "최근 본 영화",
    preferredGenres: "선호 장르",
    
    recommendedMovie: "🎬 추천 영화",
    llmExplanation: "💬 LLM 생성 설명",
    
    architectureTitle: "🏗️ 시스템 구조",
    
    contributionTitle: "📈 기대 효과",
    contribution1: "사용자 신뢰도 향상",
    contribution2: "클릭률(CTR) 증가",
    contribution3: "추천 수용률 개선",
    
    techStack: "🛠️ 기술 스택",
    
    relatedTitle: "📂 연구 자료",
    experimentLink: "🧪 A/B 비교 실험",
    experimentDesc: "어떤 추천이 더 신뢰가 가나요? 투표하기",
    roadmapLink: "📚 학습 로드맵",
    roadmapDesc: "읽고 있는 책과 학습 진행 상황",
    papersLink: "📄 논문 리뷰 노트",
    papersDesc: "핵심 논문 정리 및 분석",
    
    contactTitle: "📬 연구자 정보",
    university: "대학교",
    department: "학과",
    
    backToMain: "← 메인으로",
  },
  en: {
    badge: "🎓 Master's Thesis Research",
    title: "LLM-Enhanced",
    titleHighlight: " Explainable Recommendation",
    subtitle: "Next-generation recommendation system that explains 'why' using Large Language Models",
    
    problemTitle: "❓ Research Problem",
    problemDesc: "Traditional recommender systems don't explain 'why', leading to low user trust",
    
    solutionTitle: "💡 Proposed Method",
    solutionDesc: "Using LLM to generate natural language explanations for recommendations",
    
    comparisonTitle: "📊 Comparison: Before vs After",
    beforeLabel: "Traditional",
    afterLabel: "Proposed (LLM)",
    
    demoTitle: "🎬 Live Demo",
    demoDesc: "Select a movie to see LLM-generated explanation",
    selectMovie: "Select Movie",
    generating: "Generating explanation...",
    
    userProfile: "👤 User Profile",
    recentMovies: "Recent Movies",
    preferredGenres: "Preferred Genres",
    
    recommendedMovie: "🎬 Recommended Movie",
    llmExplanation: "💬 LLM-Generated Explanation",
    
    architectureTitle: "🏗️ System Architecture",
    
    contributionTitle: "📈 Expected Impact",
    contribution1: "Improved User Trust",
    contribution2: "Higher Click-Through Rate",
    contribution3: "Better Recommendation Acceptance",
    
    techStack: "🛠️ Tech Stack",
    
    relatedTitle: "📂 Research Materials",
    experimentLink: "🧪 A/B Comparison Experiment",
    experimentDesc: "Which recommendation do you trust more? Vote now",
    roadmapLink: "📚 Learning Roadmap",
    roadmapDesc: "Books I'm reading and learning progress",
    papersLink: "📄 Paper Review Notes",
    papersDesc: "Key paper summaries and analysis",
    
    contactTitle: "📬 Researcher Info",
    university: "University",
    department: "Department",
    
    backToMain: "← Home",
  },
};

// 샘플 데이터
const movies = {
  ko: [
    { id: 1, title: "인터스텔라", genre: "SF", rating: 9.0 },
    { id: 2, title: "기생충", genre: "드라마", rating: 8.5 },
    { id: 3, title: "어벤져스: 엔드게임", genre: "액션", rating: 8.4 },
  ],
  en: [
    { id: 1, title: "Interstellar", genre: "Sci-Fi", rating: 9.0 },
    { id: 2, title: "Parasite", genre: "Drama", rating: 8.5 },
    { id: 3, title: "Avengers: Endgame", genre: "Action", rating: 8.4 },
  ],
};

const explanations = {
  ko: {
    1: "최근 '인셉션'과 '그래비티'를 즐겁게 보셨네요! 이 영화도 우주를 배경으로 한 SF 대작입니다. 크리스토퍼 놀란 감독의 작품을 좋아하시는 것 같아 강력 추천드려요. 평점 9.0으로 많은 분들이 극찬한 작품입니다.",
    2: "사회적 메시지가 담긴 드라마를 선호하시는 것 같아요. '기생충'은 봉준호 감독의 걸작으로, 빈부격차를 날카롭게 풍자한 작품입니다. 아카데미 작품상 수상작이에요!",
    3: "히어로 영화를 꾸준히 보셨네요! 마블 시리즈의 대미를 장식하는 이 작품은 그동안 쌓아온 스토리의 완결판입니다. 감동과 액션 모두 잡은 작품이에요.",
  },
  en: {
    1: "You recently enjoyed 'Inception' and 'Gravity'! This is also an epic sci-fi set in space. Since you seem to love Christopher Nolan's work, I highly recommend it. With a 9.0 rating, it's critically acclaimed!",
    2: "You seem to prefer dramas with social messages. 'Parasite' is Bong Joon-ho's masterpiece, sharply satirizing wealth inequality. It won the Academy Award for Best Picture!",
    3: "You've been consistently watching superhero movies! This Marvel epic is the culmination of years of storytelling. It delivers both emotion and action perfectly.",
  },
};

const beforeExplanations = {
  ko: ["추천 영화입니다.", "비슷한 사용자가 좋아한 영화", "인기 영화"],
  en: ["Recommended movie.", "Users like you watched this", "Popular movie"],
};

export default function ThesisDemo() {
  const [lang, setLang] = useState<Language>("ko");
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const t = translations[lang];
  const movieList = movies[lang];

  const handleSelectMovie = (id: number) => {
    setSelectedMovie(id);
    setShowExplanation(false);
    setIsGenerating(true);
    
    // 타이핑 효과를 위한 딜레이
    setTimeout(() => {
      setIsGenerating(false);
      setShowExplanation(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* 언어 선택 */}
        <div className="flex justify-end mb-8">
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg">
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "ko" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "en" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full text-sm text-blue-400 mb-6 border border-blue-500/20">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* 문제 & 해결 */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
            <h3 className="text-xl font-bold text-red-400 mb-3">{t.problemTitle}</h3>
            <p className="text-slate-400">{t.problemDesc}</p>
            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
              <p className="text-slate-500 text-sm">{lang === "ko" ? "기존 추천:" : "Traditional:"}</p>
              <p className="text-white font-mono mt-1">&quot;{lang === "ko" ? "이 영화를 추천합니다" : "We recommend this movie"}&quot;</p>
              <p className="text-red-400 text-sm mt-2">→ {lang === "ko" ? "왜요? 🤔" : "But why? 🤔"}</p>
            </div>
          </div>
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl">
            <h3 className="text-xl font-bold text-green-400 mb-3">{t.solutionTitle}</h3>
            <p className="text-slate-400">{t.solutionDesc}</p>
            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
              <p className="text-slate-500 text-sm">{lang === "ko" ? "LLM 설명:" : "LLM Explanation:"}</p>
              <p className="text-white font-mono mt-1 text-sm">&quot;{lang === "ko" ? "SF를 좋아하시는 것 같아 추천드려요!" : "Since you enjoy sci-fi, you'll love this!"}&quot;</p>
              <p className="text-green-400 text-sm mt-2">→ {lang === "ko" ? "이해됐어요! ✅" : "Makes sense! ✅"}</p>
            </div>
          </div>
        </div>

        {/* 비교 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.comparisonTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">❌</span>
                <h3 className="text-lg font-bold text-slate-300">{t.beforeLabel}</h3>
              </div>
              <div className="space-y-3">
                {beforeExplanations[lang].map((text, i) => (
                  <div key={i} className="p-3 bg-slate-900/50 rounded-lg text-slate-500 text-sm">
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h3 className="text-lg font-bold text-blue-300">{t.afterLabel}</h3>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg text-white text-sm leading-relaxed">
                {lang === "ko" 
                  ? "최근 '인셉션'과 '그래비티'를 즐겁게 보셨네요! 이 영화도 우주를 배경으로 한 SF 대작입니다. 크리스토퍼 놀란 감독의 작품을 좋아하시는 것 같아 강력 추천드려요."
                  : "You recently enjoyed 'Inception' and 'Gravity'! This is also an epic sci-fi set in space. Since you seem to love Christopher Nolan's work, I highly recommend it."
                }
              </div>
            </div>
          </div>
        </div>

        {/* 인터랙티브 데모 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">{t.demoTitle}</h2>
          <p className="text-slate-400 text-center mb-8">{t.demoDesc}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* 사용자 프로필 */}
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">{t.userProfile}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-sm mb-2">{t.recentMovies}</p>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "ko" ? ["인셉션", "그래비티", "마션"] : ["Inception", "Gravity", "The Martian"]).map((m, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-2">{t.preferredGenres}</p>
                  <div className="flex flex-wrap gap-2">
                    {(lang === "ko" ? ["SF", "스릴러", "액션"] : ["Sci-Fi", "Thriller", "Action"]).map((g, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 영화 선택 */}
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl">
              <h3 className="text-lg font-bold mb-4">{t.selectMovie}</h3>
              <div className="space-y-3">
                {movieList.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedMovie === movie.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-slate-700/30 hover:bg-slate-700/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{movie.title}</p>
                        <p className="text-sm opacity-70">{movie.genre}</p>
                      </div>
                      <div className="text-yellow-400">⭐ {movie.rating}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LLM 설명 결과 */}
          {selectedMovie && (
            <div className="mt-6 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                {t.llmExplanation}
              </h3>
              {isGenerating ? (
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  {t.generating}
                </div>
              ) : showExplanation && (
                <p className="text-white leading-relaxed animate-fade-in">
                  {explanations[lang][selectedMovie as keyof typeof explanations.ko]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 시스템 구조 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.architectureTitle}</h2>
          <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl overflow-x-auto">
            <div className="flex items-center justify-center gap-4 min-w-max py-4">
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-center">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm">{lang === "ko" ? "사용자 데이터" : "User Data"}</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-sm">{lang === "ko" ? "추천 모델" : "Rec Model"}</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="p-4 bg-pink-500/20 border border-pink-500/30 rounded-xl text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-sm">LLM</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center">
                <div className="text-2xl mb-2">💬</div>
                <div className="text-sm">{lang === "ko" ? "자연어 설명" : "NL Explanation"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 기대 효과 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.contributionTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl text-center">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-2xl font-bold text-green-400 mb-2">+25%</div>
              <div className="text-slate-400">{t.contribution1}</div>
            </div>
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl text-center">
              <div className="text-4xl mb-4">👆</div>
              <div className="text-2xl font-bold text-blue-400 mb-2">+15%</div>
              <div className="text-slate-400">{t.contribution2}</div>
            </div>
            <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-2xl text-center">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-2xl font-bold text-purple-400 mb-2">+20%</div>
              <div className="text-slate-400">{t.contribution3}</div>
            </div>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.techStack}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Python", "PyTorch", "Transformers", "GPT-4", "MovieLens", "BERT", "Flask"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 관련 페이지 링크 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">{t.relatedTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/thesis/experiment"
              className="group p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl hover:border-purple-400/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-4xl">🧪</div>
                <div>
                  <h3 className="text-lg font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                    {t.experimentLink}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{t.experimentDesc}</p>
                </div>
              </div>
            </Link>
            <Link
              href="/thesis/roadmap"
              className="group p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl hover:border-emerald-400/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-4xl">📚</div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    {t.roadmapLink}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{t.roadmapDesc}</p>
                </div>
              </div>
            </Link>
            <Link
              href="/thesis/papers"
              className="group p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl hover:border-blue-400/50 transition-all hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="text-4xl">📄</div>
                <div>
                  <h3 className="text-lg font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                    {t.papersLink}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{t.papersDesc}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center pt-8 border-t border-slate-800">
          <Link href="/" className="text-slate-500 hover:text-blue-400 transition-colors">
            {t.backToMain}
          </Link>
          <p className="text-slate-600 text-sm mt-4">
            © 2025 SLOX Research
          </p>
        </div>
      </div>
    </main>
  );
}

