"use client";

import { useEffect, useRef } from "react";

const t: Record<string, { subCopy: string; cta: string; stats: [string, string, string] }> = {
  ko: { subCopy: "누구나 무료로 즐기는 게임과 도구", cta: "지금 시작하기", stats: ["무료 도구", "지원 언어", "글로벌 랭킹"] },
  en: { subCopy: "Free games & tools for everyone, everywhere.", cta: "Start Playing", stats: ["Free Tools", "Languages", "Global Ranking"] },
  ja: { subCopy: "誰でも無料で楽しめるゲームとツール", cta: "今すぐ始める", stats: ["無料ツール", "対応言語", "グローバルランキング"] },
  zh: { subCopy: "人人免费畅玩的游戏和工具", cta: "立即开始", stats: ["免费工具", "支持语言", "全球排名"] },
  de: { subCopy: "Kostenlose Spiele & Tools für alle.", cta: "Jetzt starten", stats: ["Kostenlose Tools", "Sprachen", "Globales Ranking"] },
  fr: { subCopy: "Jeux et outils gratuits pour tous.", cta: "Commencer", stats: ["Outils gratuits", "Langues", "Classement mondial"] },
  es: { subCopy: "Juegos y herramientas gratis para todos.", cta: "Empezar", stats: ["Herramientas", "Idiomas", "Ranking global"] },
  pt: { subCopy: "Jogos e ferramentas grátis para todos.", cta: "Começar", stats: ["Ferramentas", "Idiomas", "Ranking global"] },
};

export default function Hero({ locale = "ko" }: { locale?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const l = t[locale] || t.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[90dvh] flex items-center justify-center relative pt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-indigo-500/8 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="animate-on-scroll mb-6">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-white leading-none">
              SLOX
            </h1>
          </div>

          <div className="animate-on-scroll mb-5" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl md:text-3xl font-medium text-white/50 tracking-tight">
              Play · Compete · Rank
            </p>
          </div>

          <div className="animate-on-scroll mb-14" style={{ animationDelay: "0.15s" }}>
            <p className="text-sm md:text-base text-white/25 max-w-sm">
              {l.subCopy}
            </p>
          </div>

          <div className="animate-on-scroll" style={{ animationDelay: "0.25s" }}>
            <a
              href="#games"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-950 font-bold text-sm rounded-2xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
            >
              {l.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <div className="animate-on-scroll mt-20" style={{ animationDelay: "0.35s" }}>
            <div className="flex items-center gap-10 md:gap-16">
              {[
                { value: "24+", label: l.stats[0] },
                { value: "8", label: l.stats[1] },
                { value: "Live", label: l.stats[2] },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] md:text-xs text-white/25 mt-1 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
