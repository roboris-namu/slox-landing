/**
 * /jeongbidosa/present
 *
 * 정비도사 발표/시연용 단일 페이지.
 *
 * 컨셉:
 *   - "한 페이지에 모든 것" — 워드 보고서를 그래픽으로 풀어쓴 인터랙티브 페이지
 *   - 좌측 sticky 네비게이션으로 섹션 간 부드러운 이동
 *   - 다크 톤(slox.co.kr 분위기) + premium-gradient 강조
 *   - 진입 시 비밀번호 입력 (별도 환경변수: JEONGBIDOSA_PRESENT_PASSWORD)
 *
 * 인증 흐름:
 *   1) 페이지 진입 → GET /api/jeongbidosa/present/check 로 쿠키 검증
 *   2) 미인증 → 비밀번호 폼 표시
 *   3) POST /api/jeongbidosa/present/login 으로 비밀번호 전달 → 쿠키 발급
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------------
// 섹션 정의 (좌측 네비게이션과 1:1 매핑)
// ----------------------------------------------------------------------------

interface SectionDef {
  id: string;
  /** 좌측 네비에 표시되는 짧은 라벨 */
  navLabel: string;
  /** 섹션 헤더에 표시되는 전체 제목 */
  title: string;
  /** 섹션 헤더 위에 표시되는 카테고리(스텝 표기) */
  kicker: string;
}

const SECTIONS: SectionDef[] = [
  { id: 'hero', navLabel: '한눈에', title: '정비도사 — 한눈에 보기', kicker: 'OVERVIEW' },
  { id: 'what', navLabel: '뭐예요?', title: '정비도사가 뭐예요?', kicker: '01 · AT A GLANCE' },
  { id: 'who', navLabel: '누구를 위해', title: '누구의 문제를 푸나', kicker: '02 · PAIN → SOLUTION' },
  { id: 'why', navLabel: '왜 RAG?', title: '왜 RAG 인가', kicker: '03 · MOTIVATION' },
  { id: 'arch', navLabel: '시스템', title: '시스템 아키텍처', kicker: '04 · ARCHITECTURE' },
  { id: 'rag', navLabel: 'RAG 6단계', title: 'RAG 동작 원리', kicker: '05 · PIPELINE' },
  { id: 'data', navLabel: '데이터', title: '지식베이스 & 임베딩', kicker: '06 · DATA' },
  { id: 'infra', navLabel: '인프라', title: '인프라 & 호스팅', kicker: '07 · INFRA' },
  { id: 'stack', navLabel: '스택', title: '기술 스택', kicker: '08 · STACK' },
  { id: 'launch', navLabel: '상용화', title: '앱 스토어 & 수익화', kicker: '09 · LAUNCH' },
  { id: 'ai', navLabel: 'AI 활용', title: 'AI 도구 활용 사례', kicker: '10 · AI USAGE' },
  { id: 'vision', navLabel: '확장 전략', title: '확장 전략 — 글로벌 아카이브', kicker: '11 · STRATEGY' },
  { id: 'team', navLabel: '팀', title: '팀 아주그냥 (AjouJust)', kicker: '12 · TEAM' },
  { id: 'roadmap', navLabel: '로드맵', title: '앞으로의 로드맵', kicker: '13 · ROADMAP' },
  { id: 'cta', navLabel: '체험', title: '직접 사용해 보세요', kicker: 'TRY IT' },
];

/** id 로 섹션 정의를 찾는다 (인덱스 변동에 강하도록) */
const sec = (id: string): SectionDef => SECTIONS.find((s) => s.id === id)!;

/** 정비도사 앱 스토어 링크 (slox.co.kr 앱 카탈로그와 동일) */
const STORE_LINKS = {
  ios: 'https://apps.apple.com/kr/app/id6768004471',
  android:
    'https://play.google.com/store/apps/details?id=com.slox.slox_jeongbidosa',
};

/** 애플 로고 (단색) */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** 구글 플레이 로고 (컬러 삼각형) */
function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 283"
      className={className}
      preserveAspectRatio="xMidYMid"
      aria-hidden="true"
    >
      <path
        d="M119.553 134.214 4.85 256.054a32.587 32.587 0 0 0 47.99 19.654l129.116-74.46-62.403-67.034Z"
        fill="#EA4335"
      />
      <path
        d="m235.586 113.452-55.84-32.302-62.857 55.962 63.119 63.106 55.418-32.012a32.13 32.13 0 0 0 .16-54.754Z"
        fill="#FBBC04"
      />
      <path
        d="M4.85 26.875A31.928 31.928 0 0 0 4 35.16v211.737a32 32 0 0 0 .85 8.276l118.642-117.605L4.85 26.875Z"
        fill="#4285F4"
      />
      <path
        d="m120.398 141.516 59.348-58.366L50.629 8.378A32.604 32.604 0 0 0 4.85 26.87l115.548 114.646Z"
        fill="#34A853"
      />
    </svg>
  );
}

/** 스토어 다운로드 배지 버튼 (App Store / Google Play 공용) */
function StoreBadge({
  store,
  href,
}: {
  store: 'ios' | 'android';
  href: string;
}) {
  const isIos = store === 'ios';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-5 py-3 hover:border-white/35 hover:bg-black/80 transition-all shadow-lg min-w-[180px]"
    >
      {isIos ? (
        <AppleGlyph className="h-7 w-7 text-white shrink-0" />
      ) : (
        <GooglePlayGlyph className="h-6 w-6 shrink-0" />
      )}
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-white/55">
          {isIos ? 'Download on the' : 'GET IT ON'}
        </span>
        <span className="block text-base font-semibold text-white -mt-0.5">
          {isIos ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </a>
  );
}

// ----------------------------------------------------------------------------
// 메인 페이지 컴포넌트
// ----------------------------------------------------------------------------

export default function JeongbidosaPresentPage() {
  const [authStatus, setAuthStatus] = useState<'checking' | 'unauth' | 'auth'>(
    'checking',
  );

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/jeongbidosa/present/check', {
        cache: 'no-store',
      });
      const json = await res.json();
      setAuthStatus(json.authorized ? 'auth' : 'unauth');
    } catch {
      setAuthStatus('unauth');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authStatus === 'checking') {
    return (
      <main className="min-h-screen bg-dark-950 bg-mesh-gradient text-white flex items-center justify-center">
        <p className="text-white/50 text-sm">불러오는 중...</p>
      </main>
    );
  }

  if (authStatus === 'unauth') {
    return <LoginGate onSuccess={() => setAuthStatus('auth')} />;
  }

  return <PresentBody />;
}

// ----------------------------------------------------------------------------
// 비밀번호 게이트
// ----------------------------------------------------------------------------

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/jeongbidosa/present/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? '로그인에 실패했습니다.');
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 bg-mesh-gradient text-white flex items-center justify-center px-4 relative">
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 transition-colors backdrop-blur"
      >
        ← 메인으로
      </Link>

      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-dark-900/60 border border-white/10 rounded-2xl p-7 backdrop-blur shadow-2xl"
      >
        <div className="text-center mb-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 mb-3">
            <span className="text-2xl">🔧</span>
          </div>
          <h1 className="text-xl font-bold mb-1">정비도사 발표 페이지</h1>
          <p className="text-xs text-white/50">
            비밀번호를 입력하면 프로젝트 전체 구조를 둘러볼 수 있어요.
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          autoFocus
          className="w-full px-3 py-2.5 bg-dark-950/60 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500/40"
        />

        {error && (
          <p className="mt-2 text-xs text-red-300/90">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-4 py-2.5 bg-premium-gradient text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? '확인 중...' : '입장하기'}
        </button>

        {/* 비밀번호 힌트 — 팀원이 까먹었을 때 떠올리도록 앞 4자만 노출.
            외부인이 페이지를 새로 발견해도 의미를 추론하기 어렵습니다. */}
        <div className="mt-4 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[11px] text-white/50 leading-relaxed">
            <span className="text-white/70 font-semibold">힌트</span> · 우리 팀명(영문 소문자) 뒤에 올해 연도. 시작 4자{' '}
            <code className="px-1 py-0.5 rounded bg-dark-950/60 text-accent-300 font-mono text-[11px]">
              ajou
            </code>
            <span className="text-white/30">…</span> (12자, 특수문자 없음)
          </p>
        </div>

        <p className="mt-4 text-[11px] text-white/30 text-center">
          팀 아주그냥 (AjouJust) · 인공지능 데이터 실무
        </p>
      </form>
    </main>
  );
}

// ----------------------------------------------------------------------------
// 본문 — 사이드바 + 섹션 스택
// ----------------------------------------------------------------------------

function PresentBody() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [navOpen, setNavOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /** 스크롤에 따라 활성 섹션을 갱신 (좌측 네비 하이라이트) */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.getAttribute('id');
          if (id) setActiveId(id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el && observerRef.current) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-dark-950 bg-mesh-gradient text-white">
      {/* 상단 바: 메인 / 진행도 / 모바일 메뉴 */}
      <header className="sticky top-0 z-40 backdrop-blur bg-dark-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            ← slox.co.kr
          </Link>
          <p className="text-[11px] sm:text-xs text-white/40 truncate">
            정비도사 · 팀 아주그냥
          </p>
          <button
            onClick={() => setNavOpen((v) => !v)}
            className="lg:hidden text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10"
          >
            {navOpen ? '닫기' : '목차'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 py-10 lg:py-16">
        {/* 좌측 네비 (데스크탑 sticky / 모바일 토글) */}
        <aside
          className={`${navOpen ? 'block' : 'hidden'} lg:block lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto`}
        >
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">
            Contents
          </p>
          <ul className="space-y-1">
            {SECTIONS.map((s, idx) => {
              const active = s.id === activeId;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                      active
                        ? 'bg-white/10 text-white border-l-2 border-accent-400'
                        : 'text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono w-5 ${
                        active ? 'text-accent-300' : 'text-white/30'
                      }`}
                    >
                      {String(idx).padStart(2, '0')}
                    </span>
                    <span className="truncate">{s.navLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={async () => {
              await fetch('/api/jeongbidosa/present/logout', { method: 'POST' });
              window.location.reload();
            }}
            className="mt-6 w-full text-[11px] text-white/40 hover:text-white/70 transition-colors"
          >
            로그아웃
          </button>
        </aside>

        {/* 본문 섹션 스택 */}
        <div className="space-y-24 lg:space-y-32">
          <HeroSection />
          <WhatSection />
          <WhoSection />
          <WhySection />
          <ArchitectureSection />
          <RagSection />
          <DataSection />
          <InfraSection />
          <StackSection />
          <LaunchSection />
          <AISection />
          <VisionSection />
          <TeamSection />
          <RoadmapSection />
          <CtaSection />

          <footer className="pt-12 border-t border-white/5 text-center">
            <p className="text-xs text-white/40">
              팀 아주그냥 (AjouJust) · 아주대학교 인공지능 데이터 실무
            </p>
            <p className="text-[10px] text-white/25 mt-1">
              Operations & Hosting Sponsored by SLOX
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

// ----------------------------------------------------------------------------
// 공용 — 섹션 헤더
// ----------------------------------------------------------------------------

function SectionHeader({ section }: { section: SectionDef }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-accent-300/80 font-mono mb-2">
        {section.kicker}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {section.title}
      </h2>
    </div>
  );
}

function Section({ section, children }: { section: SectionDef; children: React.ReactNode }) {
  return (
    <section id={section.id} className="scroll-mt-20">
      <SectionHeader section={section} />
      {children}
    </section>
  );
}

// ----------------------------------------------------------------------------
// 1. Hero
// ----------------------------------------------------------------------------

function HeroSection() {
  const section = sec('hero');
  const stats = [
    { label: '평균 응답', value: '1.5s', sub: 'p50 latency' },
    { label: '환각률', value: '<2%', sub: '근거 없는 답변' },
    { label: '지식 항목', value: '267', sub: '엄선·검수 데이터' },
    { label: '플랫폼', value: '3', sub: 'iOS · Android · Web' },
  ];

  return (
    <section id={section.id} className="scroll-mt-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-dark-900/80 via-dark-950/60 to-dark-900/40 p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            App Store · Google Play 출시 완료
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            🔧 정비도사
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            검색 증강 생성(RAG) 기반의 한국어 자동차 정비 챗봇.
            <br className="hidden sm:block" />
            <span className="text-white/90">
              일반 LLM이 자주 만들어내는 “그럴듯한 거짓말”을 줄이는 것이 목표
            </span>
            입니다.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <p className="text-[11px] text-white/45 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// 1-A. 정비도사가 뭐예요? (At a Glance — 30초 직관 설명)
// ----------------------------------------------------------------------------

function WhatSection() {
  const section = sec('what');
  const flow = [
    {
      step: '①',
      title: '질문',
      body: '음성이나 텍스트로 정비 질문 — “엔진오일 언제 갈아요?”',
      emoji: '🎙️',
    },
    {
      step: '②',
      title: '답변',
      body: 'RAG 가 검증된 정비 지식만으로 답변 — [S1][S2] 출처 마커 부착',
      emoji: '✅',
    },
    {
      step: '③',
      title: '누적',
      body: '질문·답변이 다시 아카이브로 쌓여 — 정비 지식이 자산이 됩니다',
      emoji: '📚',
    },
  ];
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        처음 보셔도 30초면 이해할 수 있어요.{' '}
        <span className="text-white font-semibold">
          정비 경력 수십 년 베테랑이, 검증된 정비 매뉴얼만 펴 놓고 답해주는 AI
        </span>{' '}
        — 그게 정비도사입니다.
      </p>

      {/* WHAT — 한 문장 정의 */}
      <div className="rounded-2xl border border-accent-400/30 bg-accent-500/10 p-6 mb-5">
        <p className="text-[11px] font-mono text-accent-300 uppercase tracking-widest mb-2">
          What · 한 문장으로
        </p>
        <p className="text-lg sm:text-xl font-semibold leading-relaxed">
          “한국 자동차 정비 RAG 챗봇 —{' '}
          <span className="text-accent-200">MVP 는 자동차</span>, 확장은{' '}
          <span className="text-accent-200">글로벌 기계 정비 아카이브</span>”
        </p>
      </div>

      {/* 3단계 직관 플로우 */}
      <div className="grid sm:grid-cols-3 gap-3">
        {flow.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-accent-300 font-mono text-lg">{f.step}</span>
              <span className="text-base font-semibold">{f.title}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-dark-900/40 p-4">
        <p className="text-xs text-white/55 leading-relaxed">
          <span className="text-white/80 font-semibold">ⓘ MVP</span> = Minimum
          Viable Product · 가치 검증용 최소 핵심 기능. 정비도사(한국 자동차)로 RAG
          구조를 검증한 뒤, <span className="text-white/80">데이터만 교체</span>해
          트랙터·산업기기·군 무기체계로 확장합니다.
        </p>
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 1-B. 누구의 문제를 푸나 (Pain → Solution)
// ----------------------------------------------------------------------------

function WhoSection() {
  const section = sec('who');
  const pairs = [
    {
      who: '자가정비 운전자',
      icon: '🚗',
      pain: '증상은 느끼는데 원인을 모르고, 정비소 견적이 적정한지 판단 못 함',
      solution: '한국어 음성+텍스트 즉답 — 1.5초 내 사전 진단',
    },
    {
      who: '신입 정비기사',
      icon: '🔧',
      pain: '매뉴얼이 분산되어 있고 선배 의존도가 높아 온보딩 비용이 큼',
      solution: '출처 마커 [S1][S2] 로 검증 가능한 매뉴얼 기반 응답',
    },
    {
      who: '일반 소비자',
      icon: '🧾',
      pain: '견적의 정당성을 판단 못 해 바가지에 노출, 구매 전 점검 정보 부족',
      solution: '검증된 데이터만으로 답하는 RAG 6단계 파이프라인',
    },
    {
      who: '정비소 운영자',
      icon: '🏭',
      pain: '신입 교육 비용·표준 절차 미비로 사고·재작업 손실',
      solution: '검색 패턴을 세그먼트별로 누적 — 운영 자산화(admin)',
    },
    {
      who: '글로벌 OEM·딜러',
      icon: '🌐',
      pain: '북미 자가정비 시장 대응 채널 부재, 정비 노하우 디지털화 수단 없음',
      solution: '데이터셋만 교체하면 다국어·도메인 확장 가능한 구조',
    },
  ];
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        “누구에게 왜 필요한가?”를 5개 이해관계자 그룹의 실제 문제(Pain)와 해결책
        (Solution)으로 1:1 매핑했습니다.
      </p>

      <div className="space-y-3">
        {pairs.map((p, i) => (
          <div
            key={p.who}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 grid sm:grid-cols-[180px_1fr_1fr] gap-3 sm:gap-4 items-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <p className="text-[10px] font-mono text-white/35">
                  P{i + 1} → S{i + 1}
                </p>
                <p className="text-sm font-semibold">{p.who}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-red-300/70 text-sm">⚠️</span>
              <p className="text-xs text-white/60 leading-relaxed">{p.pain}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-emerald-300/80 text-sm">→</span>
              <p className="text-xs text-white/80 leading-relaxed">
                {p.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 2. Why RAG (문제 → 해결)
// ----------------------------------------------------------------------------

function WhySection() {
  const section = sec('why');
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-8 leading-relaxed">
        일반 ChatGPT 에게 정비 질문을 하면 답은 “그럴듯하지만” 출처가 없습니다.
        실제 운전자에게는 위험할 수 있어요. 우리는{' '}
        <span className="text-white font-semibold">
          엄선된 267건의 정비 지식만을 근거로 답하도록
        </span>{' '}
        강제해 환각을 구조적으로 막습니다.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <ProblemCard
          tone="bad"
          title="일반 LLM"
          bullets={[
            '학습 시점 이후 데이터 미반영',
            '출처가 없어 검증 불가',
            '"그럴듯한 거짓말"(환각) 위험',
            '한국 차량/부품 명칭 혼동',
          ]}
        />
        <ProblemCard
          tone="good"
          title="정비도사 (RAG)"
          bullets={[
            '엄선된 267건 지식만 근거로 사용',
            '답변마다 [S1][S2] 출처 표시',
            '관련 없는 질문은 정중히 거절',
            '운영자가 즉시 데이터 추가/수정',
          ]}
        />
      </div>
    </Section>
  );
}

function ProblemCard({
  tone,
  title,
  bullets,
}: {
  tone: 'bad' | 'good';
  title: string;
  bullets: string[];
}) {
  const isGood = tone === 'good';
  return (
    <div
      className={`rounded-2xl p-6 border ${
        isGood
          ? 'border-emerald-400/30 bg-emerald-500/5'
          : 'border-red-400/20 bg-red-500/5'
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{isGood ? '✅' : '⚠️'}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li
            key={b}
            className={`flex gap-2 text-sm ${
              isGood ? 'text-white/80' : 'text-white/65'
            }`}
          >
            <span className="text-white/30">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3. 시스템 아키텍처
// ----------------------------------------------------------------------------

function ArchitectureSection() {
  const section = sec('arch');
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        클라이언트(앱·웹)는 같은 백엔드 API 한 곳을 바라봅니다. 음성 처리와 광고만
        플랫폼별로 다르고, 핵심 RAG 로직은 단일 서버에서 일관되게 동작합니다.
      </p>

      <DiagramCard
        src="/jeongbidosa/01_system_architecture.png"
        alt="시스템 아키텍처 다이어그램"
        caption="클라이언트 → Vercel(Next.js API) → Supabase(pgvector) / OpenAI"
      />

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        <MiniBlock
          icon="📱"
          title="Mobile (Flutter)"
          body="speech_to_text · flutter_tts · google_mobile_ads"
        />
        <MiniBlock
          icon="🌐"
          title="Web (Next.js)"
          body="Web Speech API · 동일 API 재사용"
        />
        <MiniBlock
          icon="⚙️"
          title="Backend"
          body="Vercel Edge · Supabase pgvector · OpenAI"
        />
      </div>
    </Section>
  );
}

function MiniBlock({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <span>{icon}</span>
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="text-xs text-white/55 leading-relaxed">{body}</p>
    </div>
  );
}

function DiagramCard({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all"
      >
        <div className="relative aspect-[16/9] sm:aspect-[16/8] bg-white p-4 sm:p-6">
          {/* 다이어그램 원본은 흰 배경 가정 → 흰 배경 패널 위에 얹어 가독성 보장 */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 클릭해 확대
        </div>
        {caption && (
          <p className="px-4 py-3 text-xs text-white/55 text-center border-t border-white/5 bg-dark-950/40">
            {caption}
          </p>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur p-4 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl p-4 sm:p-6 overflow-auto">
            <Image
              src={src}
              alt={alt}
              width={2400}
              height={1350}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20"
          >
            닫기 ✕
          </button>
        </div>
      )}
    </>
  );
}

// ----------------------------------------------------------------------------
// 4. RAG 6단계 (인터랙티브 stepper)
// ----------------------------------------------------------------------------

const RAG_STEPS = [
  {
    n: 1,
    title: '질문 수신',
    short: '사용자 질문이 API 에 도착',
    detail:
      '“브레이크가 밀려요” 같은 자연어 질문을 클라이언트가 그대로 백엔드에 전달합니다. 별도 키워드 추출은 하지 않습니다.',
  },
  {
    n: 2,
    title: '임베딩 변환',
    short: '질문을 벡터로 변환',
    detail:
      'OpenAI text-embedding-3-small 모델로 1536차원 벡터를 만듭니다. 의미가 비슷한 문장은 비슷한 좌표에 위치합니다.',
  },
  {
    n: 3,
    title: '벡터 검색',
    short: 'pgvector 로 가장 유사한 지식 찾기',
    detail:
      'Supabase 의 pgvector + HNSW 인덱스로 코사인 유사도 기준 상위 K개를 가져옵니다. 267건 규모에서는 수 ms 내에 응답.',
  },
  {
    n: 4,
    title: '컨텍스트 조립',
    short: '검색된 지식을 프롬프트에 삽입',
    detail:
      '상위 K개 항목을 [S1] [S2] 형태로 번호를 붙여 시스템 프롬프트에 끼워넣습니다. 모델은 이 안에서만 답변하도록 강제됩니다.',
  },
  {
    n: 5,
    title: '응답 생성',
    short: 'gpt-4o-mini 로 답변 합성',
    detail:
      '“여기 있는 지식만 사용해라, 없으면 모른다고 말해라”를 시스템 프롬프트에 명시. 응답에는 반드시 출처 마커가 들어갑니다.',
  },
  {
    n: 6,
    title: '출력 + 음성',
    short: '텍스트 + TTS 로 사용자에게 반환',
    detail:
      '클라이언트는 답변을 화면에 출력하고, 모바일은 flutter_tts 로, 웹은 Web Speech API 로 한국어 음성을 재생합니다.',
  },
];

function RagSection() {
  const section = sec('rag');
  const [active, setActive] = useState(1);
  const current = RAG_STEPS.find((s) => s.n === active)!;

  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        한 번의 질문이 답변까지 가는 6단계입니다. 단계를 클릭하면 자세한 설명을
        볼 수 있어요.
      </p>

      <DiagramCard
        src="/jeongbidosa/02_rag_pipeline.png"
        alt="RAG 파이프라인 다이어그램"
        caption="질문 → 임베딩 → 검색 → 컨텍스트 → 응답 → 음성"
      />

      <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-4">
        {/* 단계 칩 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {RAG_STEPS.map((s) => {
            const isActive = s.n === active;
            return (
              <button
                key={s.n}
                onClick={() => setActive(s.n)}
                className={`text-left rounded-xl p-3 border transition-all ${
                  isActive
                    ? 'bg-accent-500/15 border-accent-400/50 ring-1 ring-accent-400/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <p
                  className={`text-[10px] font-mono mb-1 ${
                    isActive ? 'text-accent-300' : 'text-white/40'
                  }`}
                >
                  STEP {s.n}
                </p>
                <p className="text-sm font-semibold leading-tight">
                  {s.title}
                </p>
                <p className="text-[11px] text-white/50 mt-1 leading-snug">
                  {s.short}
                </p>
              </button>
            );
          })}
        </div>

        {/* 상세 패널 */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-dark-900/80 to-dark-950/60 p-6 min-h-[200px]">
          <p className="text-[11px] font-mono text-accent-300 mb-1.5">
            STEP {current.n}
          </p>
          <h3 className="text-xl font-semibold mb-3">{current.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            {current.detail}
          </p>
        </div>
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 5. 데이터 (DB 스키마 시각화)
// ----------------------------------------------------------------------------

function DataSection() {
  const section = sec('data');
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        지식은 단 하나의 테이블에 모입니다. 컬럼은 가볍지만, 임베딩 컬럼이
        검색 품질의 핵심입니다.
      </p>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-dark-900/60 px-5 py-3 border-b border-white/10 flex items-center justify-between">
          <p className="text-sm font-mono text-white/80">
            jeongbidosa_knowledge
          </p>
          <p className="text-[11px] text-white/40">Supabase · PostgreSQL 15</p>
        </div>

        <div className="divide-y divide-white/5">
          <SchemaRow
            col="id"
            type="bigserial PK"
            note="자동 증가 식별자"
          />
          <SchemaRow
            col="term"
            type="text"
            note="용어/증상 (예: 브레이크 밀림)"
          />
          <SchemaRow
            col="description"
            type="text"
            note="해당 용어의 설명/의미"
          />
          <SchemaRow
            col="role"
            type="text"
            note="기능·역할 (예: 제동력 전달)"
          />
          <SchemaRow
            col="details"
            type="text"
            note="원인/조치 등 상세 정비 정보"
          />
          <SchemaRow
            col="embedding"
            type="vector(1536)"
            note="text-embedding-3-small 결과 · HNSW 인덱스"
            highlight
          />
          <SchemaRow col="created_at" type="timestamptz" note="등록 시각" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <MiniBlock
          icon="🧠"
          title="임베딩 전략"
          body="term + description + role + details 를 한 문자열로 합쳐 1회 임베딩"
        />
        <MiniBlock
          icon="🔍"
          title="검색 인덱스"
          body="HNSW(cosine) 인덱스 + LIMIT K. 267건 규모에서 수 ms"
        />
        <MiniBlock
          icon="🛠"
          title="운영 도구"
          body="/jeongbidosa/admin 에서 CRUD · 엑셀 일괄 업로드 · AI 답변 미리보기"
        />
      </div>
    </Section>
  );
}

function SchemaRow({
  col,
  type,
  note,
  highlight,
}: {
  col: string;
  type: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[140px_140px_1fr] gap-3 items-center px-5 py-3 text-sm ${
        highlight ? 'bg-accent-500/5' : ''
      }`}
    >
      <p className="font-mono text-white/90">{col}</p>
      <p className="font-mono text-[11px] text-accent-300/90">{type}</p>
      <p className="text-xs text-white/55">{note}</p>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 6. 인프라
// ----------------------------------------------------------------------------

function InfraSection() {
  const section = sec('infra');
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        직접 서버를 운영하지 않습니다. CDN·DB·LLM API 모두 매니지드 서비스를
        조합해, 최소 인력으로 글로벌 트래픽을 감당하도록 설계했습니다.
      </p>

      <DiagramCard
        src="/jeongbidosa/03_infrastructure.png"
        alt="인프라 토폴로지"
        caption="Cloudflare → Vercel(Edge/Node) → Supabase + OpenAI"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <InfraCard icon="☁️" name="Cloudflare" role="DNS · CDN · SSL" />
        <InfraCard icon="▲" name="Vercel" role="Next.js 호스팅 · Edge Functions" />
        <InfraCard icon="🟢" name="Supabase" role="PostgreSQL · pgvector" />
        <InfraCard icon="🧠" name="OpenAI" role="임베딩 · gpt-4o-mini" />
      </div>
    </Section>
  );
}

function InfraCard({
  icon,
  name,
  role,
}: {
  icon: string;
  name: string;
  role: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-[11px] text-white/50 mt-1">{role}</p>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 7. 기술 스택
// ----------------------------------------------------------------------------

function StackSection() {
  const section = sec('stack');
  const groups = [
    {
      title: '프론트엔드',
      tone: 'from-blue-500/20 to-cyan-500/10',
      items: [
        ['Next.js 14', 'App Router · TypeScript'],
        ['Flutter 3', 'iOS · Android 단일 코드베이스'],
        ['Tailwind CSS', '디자인 시스템'],
      ],
    },
    {
      title: '백엔드 / AI',
      tone: 'from-purple-500/20 to-pink-500/10',
      items: [
        ['OpenAI API', 'embedding · gpt-4o-mini'],
        ['Supabase pgvector', '벡터 검색 · HNSW'],
        ['Next.js Route Handlers', '서버리스 API'],
      ],
    },
    {
      title: '인프라 / 운영',
      tone: 'from-emerald-500/20 to-teal-500/10',
      items: [
        ['Vercel', 'CI/CD · Edge'],
        ['Cloudflare', 'DNS · CDN'],
        ['AdMob', '배너 · 전면광고'],
      ],
    },
  ];
  return (
    <Section section={section}>
      <div className="grid md:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div
            key={g.title}
            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${g.tone} p-5`}
          >
            <p className="text-[11px] font-mono text-white/60 uppercase tracking-widest mb-3">
              {g.title}
            </p>
            <ul className="space-y-2.5">
              {g.items.map(([name, desc]) => (
                <li key={name}>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-[11px] text-white/55">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 8. 상용화
// ----------------------------------------------------------------------------

function LaunchSection() {
  const section = sec('launch');
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        “동작하는 데모”가 아니라 “실제 출시한 앱” 입니다. 두 스토어의 심사를
        모두 통과해, 실 사용자 앞에 놓이는 운영 부담까지 함께 다룹니다.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <StoreCard
          icon="🍎"
          name="App Store (iOS)"
          status="배포 완료"
          href={STORE_LINKS.ios}
          rows={[
            ['Bundle ID', 'com.slox.slox_jeongbidosa'],
            ['최소 OS', 'iOS 14.0+'],
            ['리뷰', '심사 통과'],
          ]}
        />
        <StoreCard
          icon="🤖"
          name="Google Play (Android)"
          status="배포 완료"
          href={STORE_LINKS.android}
          rows={[
            ['Package', 'com.slox.slox_jeongbidosa'],
            ['최소 OS', 'Android 8.0+ (API 26)'],
            ['형식', 'AAB(App Bundle)'],
          ]}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-semibold mb-3">📈 수익화 — 사용자 친화적 광고 정책</p>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <span className="text-accent-300">•</span>
            <span>하단 배너: 항상 노출. 상호작용에 영향 없음.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-300">•</span>
            <span>전면광고: 검색 5회마다 + 30초 쿨다운. 과노출 방지.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-300">•</span>
            <span>TTS 재생 중에는 광고 보류 — 사용자 음성 청취를 방해하지 않음.</span>
          </li>
        </ul>
      </div>
    </Section>
  );
}

function StoreCard({
  icon,
  name,
  status,
  rows,
  href,
}: {
  icon: string;
  name: string;
  status: string;
  rows: [string, string][];
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-semibold flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {name}
        </p>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
          {status}
        </span>
      </div>
      <dl className="space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
            <dt className="text-white/45">{k}</dt>
            <dd className="text-white/85 font-mono text-xs text-right">{v}</dd>
          </div>
        ))}
      </dl>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-300 group-hover:text-accent-200 transition-colors">
          스토어에서 열기
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-white/10 bg-dark-900/40 p-5 hover:border-accent-400/40 hover:bg-dark-900/70 transition-all"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-dark-900/40 p-5">
      {inner}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 9. AI 활용
// ----------------------------------------------------------------------------

function AISection() {
  const section = sec('ai');
  const cases = [
    {
      area: '코드 생성',
      ratio: '~70%',
      detail: 'Cursor + Claude 로 RAG·UI·인증 골격 자동 생성. 사람은 검토와 보정.',
    },
    {
      area: '데이터 시드',
      ratio: '~80%',
      detail: '267건 정비 지식의 초안을 LLM 으로 생성 후 정비 현업 출신 팀원이 검수.',
    },
    {
      area: '문서화',
      ratio: '100%',
      detail: '발표 문서 / 보고서 / 다이어그램 캡션을 LLM 보조로 작성. 사실 확인은 직접 수행.',
    },
    {
      area: '디버깅',
      ratio: '활용',
      detail: 'iOS 빌드 오류, AdMob 정책, 스토어 심사 가이드 해석에 적극 활용.',
    },
  ];
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        AI 는 답을 대신 써주는 도구가 아니라 <span className="text-white">속도를 7~10배 끌어올리는 협업자</span> 입니다.
        최종 책임과 검수는 사람이 합니다.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {cases.map((c) => (
          <div
            key={c.area}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">{c.area}</p>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-500/15 text-accent-300">
                {c.ratio}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{c.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 9-B. 확장 전략 (글로벌 아카이브)
// ----------------------------------------------------------------------------

function VisionSection() {
  const section = sec('vision');
  const horizons = [
    {
      icon: '🧩',
      tag: 'DOMAIN',
      title: '도메인 확장',
      lead: '한국 자동차 → 트랙터 · 산업기기 · 군 무기체계',
      body: 'RAG 아키텍처는 그대로 두고 데이터셋만 교체하면 전혀 다른 정비 영역으로 즉시 확장됩니다.',
      tone: 'from-emerald-500/15 to-teal-500/5 border-emerald-400/25',
    },
    {
      icon: '🌐',
      tag: 'GLOBAL',
      title: '글로벌 · 다국어',
      lead: '영문 우선 다국어 빌드 → 북미 자가정비(DIY) 시장',
      body: '셀프 정비 문화가 큰 북미를 첫 타깃으로, 동일 백엔드에 언어만 얹어 글로벌 사용자에게 확장합니다.',
      tone: 'from-sky-500/15 to-blue-500/5 border-sky-400/25',
    },
    {
      icon: '🤝',
      tag: 'B2B',
      title: 'B2B 사업화',
      lead: 'OEM · 딜러 채널 + 정비 노하우 디지털 자산화',
      body: '현대차·KIA 등 OEM 영업 채널 컨택을 검토. 차종별 정비 노하우를 디지털 아카이브 자산으로 제공합니다.',
      tone: 'from-purple-500/15 to-pink-500/5 border-purple-400/25',
    },
  ];
  return (
    <Section section={section}>
      <p className="text-white/65 max-w-3xl mb-6 leading-relaxed">
        정비도사의 진짜 가치는 “자동차 챗봇” 하나가 아니라{' '}
        <span className="text-white font-semibold">확장 가능한 구조</span>{' '}
        그 자체입니다.
      </p>

      {/* 핵심 명제 배너 */}
      <div className="rounded-2xl border border-accent-400/30 bg-gradient-to-br from-accent-500/15 via-dark-950/40 to-purple-500/15 p-6 mb-5">
        <p className="text-[11px] font-mono text-accent-300 uppercase tracking-widest mb-2">
          Core Thesis
        </p>
        <p className="text-lg sm:text-xl font-semibold leading-relaxed">
          같은 RAG 파이프라인 ·{' '}
          <span className="text-accent-200">데이터만 교체</span> → 어떤 정비
          도메인이든 확장. <br className="hidden sm:block" />
          누적된 답변은 다시{' '}
          <span className="text-accent-200">글로벌 기계 정비 아카이브</span>로
          자산화됩니다.
        </p>
      </div>

      {/* 3개 확장 축 */}
      <div className="grid md:grid-cols-3 gap-3">
        {horizons.map((h) => (
          <div
            key={h.tag}
            className={`rounded-2xl border bg-gradient-to-br ${h.tone} p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{h.icon}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
                {h.tag}
              </span>
            </div>
            <p className="text-base font-semibold mb-1">{h.title}</p>
            <p className="text-[11px] text-accent-200 font-mono mb-3 leading-snug">
              {h.lead}
            </p>
            <p className="text-xs text-white/60 leading-relaxed">{h.body}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-white/45 mt-5 text-center italic">
        “MVP 는 자동차. 목적지는 전 세계 기계 정비 지식이 모이는 아카이브.”
      </p>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 10. 팀
// ----------------------------------------------------------------------------

function TeamSection() {
  const section = sec('team');
  const members = [
    {
      name: '양석원',
      enName: 'YANG SEOKWON',
      lead: true,
      sub: 'Team Lead · Full-Stack · Architecture · Release',
      emoji: '🎯',
      role: 'Next.js + Flutter 풀스택 구현, 시스템 아키텍처 설계, App Store / Google Play 출시, slox.co.kr 운영 총괄',
    },
    {
      name: '김준수',
      enName: 'KIM JUNSU',
      sub: 'Domain Expert · Automotive Knowledge · QA',
      emoji: '🔧',
      role: '자동차 정비 지식 검수, 증상-원인-조치 데이터 정확성 보증, 도메인 용어 일관성 가이드',
    },
    {
      name: '구호림',
      enName: 'KOO HORIM',
      sub: 'Data Curator · Knowledge Base · Categorization',
      emoji: '🗂️',
      role: '267건 RAG 지식베이스 정리, 카테고리 분류 체계 설계, 엑셀 일괄 업로드 형식 정립',
    },
    {
      name: '김헌수',
      enName: 'KIM HEONSU',
      sub: 'Strategy & Vision · Expansion · B2B Direction',
      emoji: '🧭',
      role: '차종·연식별 분류 컨셉, 군/산업기기 확장성 기획, B2B 사업화 방향 제시',
    },
  ];
  return (
    <Section section={section}>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-dark-950/40 to-blue-500/10 p-6 mb-5">
        <p className="text-[11px] font-mono text-white/50 mb-1">TEAM NAME</p>
        <p className="text-2xl font-bold">아주그냥 (AjouJust)</p>
        <p className="text-sm text-white/60 mt-2 leading-relaxed">
          개발 · 도메인 · 데이터 · 전략 — 네 시선이 하나의 RAG 아카이브로.
          <br />
          “같은 코드를 짜는 4명보다, 다른 곳을 보는 4명이 더 멀리 간다.”
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {members.map((m) => (
          <div
            key={m.name}
            className={`rounded-2xl border p-5 ${
              m.lead
                ? 'border-accent-400/40 bg-accent-500/10 ring-1 ring-accent-400/20'
                : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">{m.emoji}</div>
              {m.lead && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-400/20 text-accent-200 border border-accent-400/30">
                  팀장
                </span>
              )}
            </div>
            <p className="text-base font-semibold">
              {m.name}
              {m.lead && <span className="text-white/50 font-normal"> (팀장)</span>}
            </p>
            <p className="text-[10px] text-white/35 font-mono tracking-wide mt-0.5">
              {m.enName}
            </p>
            <p className="text-[11px] text-accent-300 font-mono mt-2 leading-snug">
              {m.sub}
            </p>
            <p className="text-xs text-white/55 mt-3 leading-relaxed">
              {m.role}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-white/30 mt-5 text-center">
        담당교수 임성열 · 아주대학교 인공지능 데이터 실무 · Operations & Hosting by SLOX
      </p>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 11. 로드맵
// ----------------------------------------------------------------------------

function RoadmapSection() {
  const section = sec('roadmap');
  const phases = [
    {
      tag: 'NOW',
      tone: 'emerald',
      title: 'v1.0 — 검증',
      items: ['267건 지식 시드 (한국 자동차)', 'iOS·Android 출시', 'AdMob 수익화'],
    },
    {
      tag: 'NEXT',
      tone: 'sky',
      title: 'v1.5 — 확장',
      items: ['차종·연식별 카테고리 분류', '대화 컨텍스트 유지', '운영 대시보드 지표'],
    },
    {
      tag: 'LATER',
      tone: 'purple',
      title: 'v2.0 — 멀티모달',
      items: ['차량 사진 업로드 진단', '정비소 연계 견적', '부품 가격 비교'],
    },
  ];
  return (
    <Section section={section}>
      <div className="grid md:grid-cols-3 gap-3">
        {phases.map((p) => (
          <div
            key={p.tag}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 relative"
          >
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full
                ${
                  p.tone === 'emerald'
                    ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30'
                    : p.tone === 'sky'
                      ? 'bg-sky-400/15 text-sky-300 border border-sky-400/30'
                      : 'bg-purple-400/15 text-purple-300 border border-purple-400/30'
                }`}
            >
              {p.tag}
            </span>
            <p className="mt-3 text-base font-semibold">{p.title}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-white/65">
              {p.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-white/30">•</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ----------------------------------------------------------------------------
// 12. CTA — 라이브 데모
// ----------------------------------------------------------------------------

function CtaSection() {
  const section = sec('cta');
  return (
    <Section section={section}>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent-500/15 via-dark-950/40 to-purple-500/15 p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
        <div className="relative">
          <p className="text-[11px] font-mono text-accent-300 uppercase tracking-widest mb-3">
            Try it now
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            바로 써보면 가장 빠릅니다
          </h3>
          <p className="text-white/65 max-w-xl mx-auto mb-7 leading-relaxed">
            App Store · Google Play 에 정식 출시되어 있습니다. 지금 바로 설치하거나,
            설치 없이 웹에서 질문해 보세요. “엔진에서 딸깍 소리가 나요” 한 문장이면
            충분합니다.
          </p>

          {/* 스토어 다운로드 배지 — 클릭 시 각 스토어로 이동 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <StoreBadge store="ios" href={STORE_LINKS.ios} />
            <StoreBadge store="android" href={STORE_LINKS.android} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jeongbidosa"
              className="inline-flex items-center justify-center px-6 py-3 bg-premium-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              💬 웹에서 바로 질문하기
            </Link>
            <Link
              href="/jeongbidosa/admin"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white border border-white/15 rounded-xl hover:bg-white/15 transition-colors"
            >
              🛠 어드민 (지식 관리)
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
