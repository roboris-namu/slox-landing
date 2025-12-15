"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "ko" | "en";

interface RoadmapItem {
  id: string;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  status: "done" | "in-progress" | "pending";
  items: { title: { ko: string; en: string }; done: boolean }[];
}

const roadmap: RoadmapItem[] = [
  {
    id: "phase1",
    title: { ko: "1단계: 추천시스템 기초", en: "Phase 1: RecSys Fundamentals" },
    description: { ko: "협업 필터링, 콘텐츠 기반, 하이브리드 방식 이해", en: "Understanding CF, Content-based, Hybrid approaches" },
    status: "in-progress",
    items: [
      { title: { ko: "📖 Recommender Systems (차루 아가르왈) 읽기", en: "📖 Reading 'Recommender Systems' (Aggarwal)" }, done: true },
      { title: { ko: "📖 추천 시스템 입문 (가자마) 읽기", en: "📖 Reading 'Intro to RecSys' (Kazama)" }, done: true },
      { title: { ko: "📖 파이썬과 JAX로 추천 시스템 구축하기", en: "📖 Building RecSys with Python & JAX" }, done: false },
      { title: { ko: "💻 MovieLens 데이터셋 실습", en: "💻 MovieLens dataset practice" }, done: false },
    ],
  },
  {
    id: "phase2",
    title: { ko: "2단계: LLM 기초", en: "Phase 2: LLM Fundamentals" },
    description: { ko: "Transformer, GPT, 프롬프트 엔지니어링 이해", en: "Understanding Transformer, GPT, Prompt Engineering" },
    status: "in-progress",
    items: [
      { title: { ko: "📖 Do it! LLM 에이전트 개발 입문 읽기", en: "📖 Reading 'Do it! LLM Agent Dev'" }, done: false },
      { title: { ko: "📄 Attention Is All You Need 논문 정독", en: "📄 Reading 'Attention Is All You Need'" }, done: false },
      { title: { ko: "💻 GPT API 실습 (프롬프트 설계)", en: "💻 GPT API practice (prompt design)" }, done: false },
      { title: { ko: "💻 RAG 파이프라인 구현", en: "💻 Implementing RAG pipeline" }, done: false },
    ],
  },
  {
    id: "phase3",
    title: { ko: "3단계: LLM + RecSys 결합 논문", en: "Phase 3: LLM + RecSys Papers" },
    description: { ko: "핵심 논문 5편 정독 및 정리", en: "Reading and summarizing 5 key papers" },
    status: "pending",
    items: [
      { title: { ko: "📄 P5: Pretrain, Prompt, Predict (2022)", en: "📄 P5: Pretrain, Prompt, Predict (2022)" }, done: false },
      { title: { ko: "📄 Chat-REC: Interactive Explainable LLMs (2023)", en: "📄 Chat-REC: Interactive Explainable LLMs (2023)" }, done: false },
      { title: { ko: "📄 LLMRec: Graph Augmentation (2023)", en: "📄 LLMRec: Graph Augmentation (2023)" }, done: false },
      { title: { ko: "📄 Explainable Recommendation Survey (2020)", en: "📄 Explainable Recommendation Survey (2020)" }, done: false },
      { title: { ko: "📄 LLM for Recommendation Survey (2024)", en: "📄 LLM for Recommendation Survey (2024)" }, done: false },
    ],
  },
  {
    id: "phase4",
    title: { ko: "4단계: 실험 설계", en: "Phase 4: Experiment Design" },
    description: { ko: "데이터셋, 평가 메트릭, 베이스라인 정의", en: "Dataset, metrics, baseline definition" },
    status: "pending",
    items: [
      { title: { ko: "📊 데이터셋 선정 (MovieLens / Amazon)", en: "📊 Dataset selection (MovieLens / Amazon)" }, done: false },
      { title: { ko: "📏 평가 메트릭 정의 (NDCG, Hit Rate, 설명 품질)", en: "📏 Metrics definition (NDCG, Hit Rate, Explanation Quality)" }, done: false },
      { title: { ko: "🎯 베이스라인 모델 구현", en: "🎯 Baseline model implementation" }, done: false },
      { title: { ko: "🤖 LLM 프롬프트 설계", en: "🤖 LLM prompt design" }, done: false },
    ],
  },
  {
    id: "phase5",
    title: { ko: "5단계: 논문 작성", en: "Phase 5: Paper Writing" },
    description: { ko: "서론, 관련 연구, 방법론, 실험, 결론", en: "Introduction, Related Work, Method, Experiment, Conclusion" },
    status: "pending",
    items: [
      { title: { ko: "✍️ 서론 (Introduction) 작성", en: "✍️ Writing Introduction" }, done: false },
      { title: { ko: "📚 관련 연구 (Related Work) 작성", en: "📚 Writing Related Work" }, done: false },
      { title: { ko: "🔬 방법론 (Methodology) 작성", en: "🔬 Writing Methodology" }, done: false },
      { title: { ko: "📊 실험 결과 (Experiments) 작성", en: "📊 Writing Experiments" }, done: false },
      { title: { ko: "🎯 결론 (Conclusion) 작성", en: "🎯 Writing Conclusion" }, done: false },
    ],
  },
];

const translations = {
  ko: {
    badge: "📚 학습 로드맵",
    title: "LLM 기반 추천시스템",
    titleHighlight: " 연구 여정",
    subtitle: "석사 논문을 위한 체계적인 학습 계획과 진행 상황",
    
    statusDone: "완료",
    statusInProgress: "진행 중",
    statusPending: "예정",
    
    progressLabel: "전체 진행률",
    
    booksTitle: "📖 읽고 있는 책",
    booksSubtitle: "추천시스템 & LLM 기초 다지기",
    
    papersLink: "📄 논문 리뷰 노트 →",
    demoLink: "🎬 연구 데모 →",
    backToThesis: "← 연구 메인",
    backToMain: "← SLOX 메인",
  },
  en: {
    badge: "📚 Learning Roadmap",
    title: "LLM-based RecSys",
    titleHighlight: " Research Journey",
    subtitle: "Systematic learning plan and progress for Master's thesis",
    
    statusDone: "Done",
    statusInProgress: "In Progress",
    statusPending: "Pending",
    
    progressLabel: "Overall Progress",
    
    booksTitle: "📖 Currently Reading",
    booksSubtitle: "Building foundations in RecSys & LLM",
    
    papersLink: "📄 Paper Review Notes →",
    demoLink: "🎬 Research Demo →",
    backToThesis: "← Research Main",
    backToMain: "← SLOX Home",
  },
};

const books = [
  {
    title: { ko: "Recommender Systems", en: "Recommender Systems" },
    author: { ko: "차루 아가르왈", en: "Charu Aggarwal" },
    year: "2021",
    progress: 60,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: { ko: "추천 시스템 입문", en: "Intro to RecSys" },
    author: { ko: "가자마 마사히로 외", en: "Kazama et al." },
    year: "2023",
    progress: 45,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: { ko: "파이썬과 JAX로 추천 시스템", en: "RecSys with Python & JAX" },
    author: { ko: "Bryan Bischof 외", en: "Bryan Bischof et al." },
    year: "2025",
    progress: 20,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: { ko: "Do it! LLM 에이전트 개발", en: "Do it! LLM Agent Dev" },
    author: { ko: "이성용", en: "Lee Sung-yong" },
    year: "2025",
    progress: 30,
    color: "from-orange-500 to-red-600",
  },
];

export default function RoadmapPage() {
  const [lang, setLang] = useState<Language>("ko");
  const t = translations[lang];

  const totalItems = roadmap.reduce((acc, phase) => acc + phase.items.length, 0);
  const doneItems = roadmap.reduce((acc, phase) => acc + phase.items.filter((i) => i.done).length, 0);
  const overallProgress = Math.round((doneItems / totalItems) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* 언어 선택 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/thesis" className="text-slate-400 hover:text-white transition-colors">
            {t.backToThesis}
          </Link>
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg">
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "ko" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇰🇷 한국어
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                lang === "en" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 rounded-full text-sm text-emerald-400 mb-6 border border-emerald-500/20">
            {t.badge}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* 전체 진행률 */}
        <div className="mb-12 p-6 bg-slate-800/30 border border-slate-700 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-medium">{t.progressLabel}</span>
            <span className="text-2xl font-bold text-emerald-400">{overallProgress}%</span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-slate-500 text-sm mt-2">
            {doneItems} / {totalItems} {lang === "ko" ? "항목 완료" : "items completed"}
          </p>
        </div>

        {/* 읽고 있는 책 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">{t.booksTitle}</h2>
          <p className="text-slate-400 mb-6">{t.booksSubtitle}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {books.map((book, i) => (
              <div key={i} className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{book.title[lang]}</h3>
                    <p className="text-slate-500 text-sm">{book.author[lang]} ({book.year})</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{book.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${book.color} rounded-full`}
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 로드맵 타임라인 */}
        <div className="space-y-6">
          {roadmap.map((phase, phaseIndex) => (
            <div
              key={phase.id}
              className={`p-6 rounded-2xl border ${
                phase.status === "done"
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : phase.status === "in-progress"
                  ? "bg-blue-500/5 border-blue-500/20"
                  : "bg-slate-800/30 border-slate-700"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    phase.status === "done"
                      ? "bg-emerald-500 text-white"
                      : phase.status === "in-progress"
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {phaseIndex + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{phase.title[lang]}</h3>
                  <p className="text-slate-500 text-sm">{phase.description[lang]}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    phase.status === "done"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : phase.status === "in-progress"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {phase.status === "done" ? t.statusDone : phase.status === "in-progress" ? t.statusInProgress : t.statusPending}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-2 pl-14">
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      item.done ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    <span className="text-lg">{item.done ? "✅" : "⬜"}</span>
                    <span className="text-sm">{item.title[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 링크들 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/thesis/papers"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors font-medium"
          >
            {t.papersLink}
          </Link>
          <Link
            href="/thesis"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors font-medium"
          >
            {t.demoLink}
          </Link>
        </div>

        {/* 푸터 */}
        <div className="text-center pt-8 mt-12 border-t border-slate-800">
          <Link href="/" className="text-slate-500 hover:text-emerald-400 transition-colors">
            {t.backToMain}
          </Link>
          <p className="text-slate-600 text-sm mt-4">© 2025 SLOX Research</p>
        </div>
      </div>
    </main>
  );
}

