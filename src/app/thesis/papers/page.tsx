"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "ko" | "en";

interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: "llm-recsys" | "explainable" | "survey" | "foundation";
  status: "read" | "reading" | "pending";
  keyPoints: { ko: string[]; en: string[] };
  limitations: { ko: string[]; en: string[] };
  myNotes: { ko: string; en: string };
  link?: string;
}

const papers: Paper[] = [
  {
    id: "p5",
    title: "Recommendation as Language Processing (P5)",
    authors: "Shijie Geng, Shuchang Liu, Zuohui Fu, et al.",
    venue: "RecSys",
    year: 2022,
    category: "llm-recsys",
    status: "pending",
    keyPoints: {
      ko: [
        "추천을 자연어 처리 문제로 재정의",
        "통합된 Pretrain-Prompt-Predict 프레임워크",
        "다양한 추천 태스크를 하나의 모델로",
      ],
      en: [
        "Redefines recommendation as NLP problem",
        "Unified Pretrain-Prompt-Predict framework",
        "Multiple recommendation tasks in one model",
      ],
    },
    limitations: {
      ko: ["대규모 언어모델 필요", "실시간 추천에 제약"],
      en: ["Requires large LM", "Constraints on real-time recommendation"],
    },
    myNotes: {
      ko: "내 연구에서 프롬프트 설계 방법론 참고 예정",
      en: "Will reference prompt design methodology for my research",
    },
  },
  {
    id: "chatrec",
    title: "Chat-REC: Interactive and Explainable LLMs-Augmented Recommender",
    authors: "Yunfan Gao, Tao Sheng, Youlin Xiang, et al.",
    venue: "arXiv",
    year: 2023,
    category: "llm-recsys",
    status: "pending",
    keyPoints: {
      ko: [
        "대화형 추천 인터페이스",
        "LLM을 통한 설명 생성",
        "사용자 피드백 반영 가능",
      ],
      en: [
        "Conversational recommendation interface",
        "Explanation generation via LLM",
        "User feedback integration",
      ],
    },
    limitations: {
      ko: ["응답 지연 문제", "환각(hallucination) 가능성"],
      en: ["Response latency issues", "Potential hallucination"],
    },
    myNotes: {
      ko: "내 연구 주제와 가장 유사 - 핵심 참고 논문!",
      en: "Most similar to my research topic - key reference!",
    },
  },
  {
    id: "llmrec",
    title: "LLMRec: Large Language Models with Graph Augmentation for Recommendation",
    authors: "Wei Wei, Xubin Ren, Jiabin Tang, et al.",
    venue: "WSDM",
    year: 2024,
    category: "llm-recsys",
    status: "pending",
    keyPoints: {
      ko: [
        "그래프 기반 사용자-아이템 관계 모델링",
        "LLM으로 그래프 정보 증강",
        "콜드 스타트 문제 완화",
      ],
      en: [
        "Graph-based user-item relationship modeling",
        "Graph augmentation via LLM",
        "Cold-start problem mitigation",
      ],
    },
    limitations: {
      ko: ["계산 복잡도 높음", "그래프 구축 비용"],
      en: ["High computational complexity", "Graph construction cost"],
    },
    myNotes: {
      ko: "그래프 + LLM 결합 아이디어 참고",
      en: "Reference for Graph + LLM combination idea",
    },
  },
  {
    id: "xrec-survey",
    title: "Explainable Recommendation: A Survey and New Perspectives",
    authors: "Yongfeng Zhang, Xu Chen",
    venue: "FnTIR",
    year: 2020,
    category: "explainable",
    status: "pending",
    keyPoints: {
      ko: [
        "설명 가능 추천의 분류 체계",
        "다양한 설명 유형 정의",
        "평가 방법론 제시",
      ],
      en: [
        "Taxonomy of explainable recommendation",
        "Definition of explanation types",
        "Evaluation methodology",
      ],
    },
    limitations: {
      ko: ["LLM 이전 연구", "최신 트렌드 미반영"],
      en: ["Pre-LLM research", "Missing recent trends"],
    },
    myNotes: {
      ko: "Related Work 작성 시 핵심 인용 논문",
      en: "Key citation for Related Work section",
    },
  },
  {
    id: "llm-rec-survey",
    title: "A Survey on Large Language Models for Recommendation",
    authors: "Likang Wu, Zhi Zheng, Zhaopeng Qiu, et al.",
    venue: "arXiv",
    year: 2024,
    category: "survey",
    status: "pending",
    keyPoints: {
      ko: [
        "LLM + 추천시스템 전체 동향 정리",
        "다양한 접근법 분류",
        "향후 연구 방향 제시",
      ],
      en: [
        "Comprehensive LLM + RecSys overview",
        "Classification of approaches",
        "Future research directions",
      ],
    },
    limitations: {
      ko: ["너무 광범위", "깊이 있는 분석 부족"],
      en: ["Too broad", "Lacks in-depth analysis"],
    },
    myNotes: {
      ko: "전체 그림 파악용 - 서론 작성 시 참고",
      en: "For overall picture - reference for Introduction",
    },
  },
  {
    id: "attention",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, et al.",
    venue: "NeurIPS",
    year: 2017,
    category: "foundation",
    status: "pending",
    keyPoints: {
      ko: [
        "Transformer 아키텍처 제안",
        "Self-Attention 메커니즘",
        "NLP 패러다임 전환",
      ],
      en: [
        "Transformer architecture proposal",
        "Self-Attention mechanism",
        "NLP paradigm shift",
      ],
    },
    limitations: {
      ko: ["추천 도메인 직접 적용 없음"],
      en: ["No direct application to recommendation domain"],
    },
    myNotes: {
      ko: "LLM 이해를 위한 필수 기초 논문",
      en: "Essential foundation for understanding LLM",
    },
  },
];

const translations = {
  ko: {
    badge: "📄 논문 리뷰 노트",
    title: "핵심 논문",
    titleHighlight: " 정리",
    subtitle: "LLM 기반 설명 가능한 추천시스템 연구를 위한 필수 논문들",
    
    filterAll: "전체",
    filterLlmRecsys: "LLM+RecSys",
    filterExplainable: "Explainable",
    filterSurvey: "Survey",
    filterFoundation: "Foundation",
    
    statusRead: "읽음",
    statusReading: "읽는 중",
    statusPending: "읽을 예정",
    
    keyPointsLabel: "📌 핵심 포인트",
    limitationsLabel: "⚠️ 한계점",
    myNotesLabel: "📝 내 연구 연결점",
    
    readPaperBtn: "📖 논문 읽기",
    
    summaryTitle: "📊 논문 리뷰 현황",
    totalPapers: "전체 논문",
    readPapers: "읽은 논문",
    remainingPapers: "남은 논문",
    
    roadmapLink: "📚 학습 로드맵 →",
    demoLink: "🎬 연구 데모 →",
    backToThesis: "← 연구 메인",
    backToMain: "← SLOX 메인",
  },
  en: {
    badge: "📄 Paper Review Notes",
    title: "Key Papers",
    titleHighlight: " Summary",
    subtitle: "Essential papers for LLM-based Explainable Recommendation research",
    
    filterAll: "All",
    filterLlmRecsys: "LLM+RecSys",
    filterExplainable: "Explainable",
    filterSurvey: "Survey",
    filterFoundation: "Foundation",
    
    statusRead: "Read",
    statusReading: "Reading",
    statusPending: "To Read",
    
    keyPointsLabel: "📌 Key Points",
    limitationsLabel: "⚠️ Limitations",
    myNotesLabel: "📝 Connection to My Research",
    
    readPaperBtn: "📖 Read Paper",
    
    summaryTitle: "📊 Paper Review Status",
    totalPapers: "Total Papers",
    readPapers: "Papers Read",
    remainingPapers: "Remaining",
    
    roadmapLink: "📚 Learning Roadmap →",
    demoLink: "🎬 Research Demo →",
    backToThesis: "← Research Main",
    backToMain: "← SLOX Home",
  },
};

const categoryColors = {
  "llm-recsys": "from-blue-500 to-indigo-600",
  explainable: "from-green-500 to-emerald-600",
  survey: "from-purple-500 to-pink-600",
  foundation: "from-orange-500 to-red-600",
};

const categoryLabels = {
  "llm-recsys": { ko: "LLM+RecSys", en: "LLM+RecSys" },
  explainable: { ko: "Explainable", en: "Explainable" },
  survey: { ko: "Survey", en: "Survey" },
  foundation: { ko: "Foundation", en: "Foundation" },
};

export default function PapersPage() {
  const [lang, setLang] = useState<Language>("ko");
  const [filter, setFilter] = useState<string>("all");
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  
  const t = translations[lang];

  const filteredPapers = filter === "all" ? papers : papers.filter((p) => p.category === filter);
  
  const readCount = papers.filter((p) => p.status === "read").length;
  const totalCount = papers.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 배경 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full text-sm text-blue-400 mb-6 border border-blue-500/20">
            {t.badge}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl text-center">
            <div className="text-3xl font-bold text-white">{totalCount}</div>
            <div className="text-slate-500 text-sm">{t.totalPapers}</div>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
            <div className="text-3xl font-bold text-emerald-400">{readCount}</div>
            <div className="text-slate-500 text-sm">{t.readPapers}</div>
          </div>
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
            <div className="text-3xl font-bold text-orange-400">{totalCount - readCount}</div>
            <div className="text-slate-500 text-sm">{t.remainingPapers}</div>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: "all", label: t.filterAll },
            { key: "llm-recsys", label: t.filterLlmRecsys },
            { key: "explainable", label: t.filterExplainable },
            { key: "survey", label: t.filterSurvey },
            { key: "foundation", label: t.filterFoundation },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === f.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 논문 목록 */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                expandedPaper === paper.id
                  ? "bg-slate-800/50 border-blue-500/30"
                  : "bg-slate-800/30 border-slate-700 hover:border-slate-600"
              }`}
              onClick={() => setExpandedPaper(expandedPaper === paper.id ? null : paper.id)}
            >
              {/* 헤더 */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${categoryColors[paper.category]} text-white`}
                    >
                      {categoryLabels[paper.category][lang]}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        paper.status === "read"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : paper.status === "reading"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {paper.status === "read" ? t.statusRead : paper.status === "reading" ? t.statusReading : t.statusPending}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{paper.title}</h3>
                  <p className="text-slate-500 text-sm">
                    {paper.authors} • {paper.venue} {paper.year}
                  </p>
                </div>
                <div className="text-2xl text-slate-500">{expandedPaper === paper.id ? "▲" : "▼"}</div>
              </div>

              {/* 확장 내용 */}
              {expandedPaper === paper.id && (
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-400 mb-2">{t.keyPointsLabel}</h4>
                    <ul className="space-y-1">
                      {paper.keyPoints[lang].map((point, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-emerald-400">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-orange-400 mb-2">{t.limitationsLabel}</h4>
                    <ul className="space-y-1">
                      {paper.limitations[lang].map((lim, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-orange-400">•</span>
                          {lim}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <h4 className="text-sm font-medium text-purple-400 mb-2">{t.myNotesLabel}</h4>
                    <p className="text-white text-sm">{paper.myNotes[lang]}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 링크들 */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/thesis/roadmap"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors font-medium"
          >
            {t.roadmapLink}
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
          <Link href="/" className="text-slate-500 hover:text-blue-400 transition-colors">
            {t.backToMain}
          </Link>
          <p className="text-slate-600 text-sm mt-4">© 2025 SLOX Research</p>
        </div>
      </div>
    </main>
  );
}

