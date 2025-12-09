"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-4xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-glass">
            <div className="flex items-center justify-between h-16 px-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
              </Link>
              <Link 
                href="/" 
                className="text-dark-300 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-violet-500/20 via-indigo-500/5 to-transparent blur-3xl" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* 뱃지 */}
          <div className="animate-on-scroll text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-xl rounded-full text-sm font-medium text-white/70 border border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              About SLOX
            </span>
          </div>

          {/* 로고 */}
          <div className="animate-on-scroll flex justify-center mb-8" style={{ animationDelay: "0.1s" }}>
            <div className="relative w-28 h-28">
              <Image
                src="/logo.svg"
                alt="SLOX"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* 타이틀 */}
          <div className="animate-on-scroll text-center" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              당신의 <span className="gradient-text-safe">개발 파트너</span>
            </h1>
            <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto leading-relaxed">
              SLOX는 아이디어를 현실로 만드는 개발 스튜디오입니다.<br className="hidden md:block" />
              홈페이지, 앱, AI 챗봇까지 모든 디지털 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 미션 & 비전 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 미션 */}
            <div className="animate-on-scroll glass-card p-8 glow-border" style={{ animationDelay: "0.3s" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-violet-500/20">
                <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">미션</h3>
              <p className="text-dark-400 leading-relaxed">
                복잡한 기술을 쉽고 아름답게. 누구나 자신만의 디지털 서비스를 
                가질 수 있도록 합리적인 비용과 높은 품질로 개발합니다.
              </p>
            </div>

            {/* 비전 */}
            <div className="animate-on-scroll glass-card p-8 glow-border" style={{ animationDelay: "0.4s" }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 border border-cyan-500/20">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">비전</h3>
              <p className="text-dark-400 leading-relaxed">
                모든 사람과 기업이 기술의 혜택을 누릴 수 있는 세상. 
                SLOX는 그 다리가 되어 디지털 혁신을 이끕니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 영역 */}
      <section className="py-20 px-4 bg-dark-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll text-center mb-12" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              제공 서비스
            </h2>
            <p className="text-dark-400">전문적인 개발 서비스를 합리적인 가격에</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌐",
                title: "홈페이지 제작",
                desc: "반응형 웹사이트부터 복잡한 웹 애플리케이션까지",
                color: "from-blue-500/20 to-indigo-500/20",
                borderColor: "border-blue-500/20",
              },
              {
                icon: "📱",
                title: "앱 개발",
                desc: "iOS, Android 네이티브 및 크로스플랫폼 앱",
                color: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/20",
              },
              {
                icon: "🤖",
                title: "AI 챗봇",
                desc: "24시간 고객 응대, 업무 자동화 챗봇 구축",
                color: "from-cyan-500/20 to-teal-500/20",
                borderColor: "border-cyan-500/20",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="animate-on-scroll glass-card p-6 text-center glass-card-hover"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mx-auto mb-5 border ${service.borderColor}`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 왜 SLOX인가 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              왜 <span className="gradient-text-safe">SLOX</span>인가요?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "💎", title: "합리적인 가격", desc: "불필요한 비용 없이 핵심 가치에 집중" },
              { icon: "⚡", title: "빠른 개발", desc: "체계적인 프로세스로 신속하게 전달" },
              { icon: "🎨", title: "세련된 디자인", desc: "최신 트렌드를 반영한 모던 UI/UX" },
              { icon: "🛡️", title: "지속적인 지원", desc: "런칭 후에도 안정적인 유지보수" },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate-on-scroll flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-white/[0.05]">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-dark-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 무료 도구 섹션 */}
      <section className="py-20 px-4 bg-dark-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              무료 도구 🎁
            </h2>
            <p className="text-dark-400">누구나 무료로 사용할 수 있는 유용한 도구들</p>
          </div>

          <div className="animate-on-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" style={{ animationDelay: "0.2s" }}>
            {[
              { href: "/reaction", icon: "⚡", name: "반응속도", hot: true },
              { href: "/cps", icon: "🖱️", name: "CPS 테스트", hot: true },
              { href: "/typing", icon: "⌨️", name: "타자 테스트" },
              { href: "/aim", icon: "🎯", name: "에임 트레이너" },
              { href: "/salary", icon: "💰", name: "연봉 계산기", hot: true },
              { href: "/bmi", icon: "⚖️", name: "BMI 계산기" },
              { href: "/qr", icon: "📱", name: "QR 생성기" },
              { href: "/password", icon: "🔐", name: "비밀번호 생성" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="relative flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group"
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="text-sm text-dark-300 group-hover:text-white transition-colors">{tool.name}</span>
                {tool.hot && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium">
                    HOT
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="animate-on-scroll text-center mt-8" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-white transition-colors"
            >
              더 많은 도구 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll glass-card p-8 md:p-12 text-center glow-border">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              프로젝트가 있으신가요?
            </h2>
            <p className="text-dark-400 mb-8 max-w-md mx-auto">
              아이디어만 있어도 괜찮아요. 무료 상담을 통해 최적의 솔루션을 찾아드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/#contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:-translate-y-1"
              >
                <span className="flex items-center gap-2 justify-center">
                  무료 상담 받기
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>

              <a
                href="https://pf.kakao.com/_tixaYn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#FEE500] text-[#1A1A1A] font-semibold rounded-2xl transition-all duration-300 hover:bg-[#FFE94A] hover:shadow-[0_0_30px_rgba(254,229,0,0.3)] hover:-translate-y-1"
              >
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
                  </svg>
                  카카오톡 문의
                </span>
              </a>
            </div>

            {/* 연락처 정보 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-dark-400">
              <a href="mailto:hyoincho9123@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hyoincho9123@gmail.com
              </a>
              <span className="hidden sm:block text-dark-700">|</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24시간 내 응답
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 px-4 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-dark-400 text-sm">© 2025 SLOX. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-dark-500 hover:text-dark-300 transition-colors">
              개인정보처리방침
            </Link>
            <a
              href="https://pf.kakao.com/_tixaYn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-accent-500/20 transition-colors"
            >
              <svg className="w-4 h-4 text-dark-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

