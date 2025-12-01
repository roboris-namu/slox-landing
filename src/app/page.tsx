import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

/**
 * SLOX 메인 랜딩페이지
 * - 프리미엄 다크 테마 적용
 */
export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <Hero />
      <Services />
      <TechStack />
      <Pricing />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}

/**
 * 네비게이션 - 글래스모피즘 다크 테마
 */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-glass">
          <div className="flex items-center justify-between h-16 px-6">
            {/* 로고 */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#services" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                서비스
              </a>
              <a href="#pricing" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                가격
              </a>
              <a href="#portfolio" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                포트폴리오
              </a>
              {/* 도구 드롭다운 */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-1">
                  도구
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/[0.08] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <a href="/salary" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      💰 연봉 계산기
                    </a>
                    <a href="/severance" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      💼 퇴직금 계산기
                    </a>
                    <a href="/typing" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      ⌨️ 타자 테스트
                    </a>
                    <a href="/reaction" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all">
                      ⚡ 반응속도 테스트
                    </a>
                  </div>
                </div>
              </div>
              <a href="#contact" className="ml-3 px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-accent-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-0.5">
                문의하기
              </a>
            </div>
            
            {/* 모바일 CTA */}
            <a href="#contact" className="md:hidden px-4 py-2 bg-gradient-to-r from-accent-500 to-cyan-500 text-white text-sm font-semibold rounded-xl">
              문의
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * 푸터 - 프리미엄 다크 테마
 */
function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/[0.05]">
      {/* 상단 글로우 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 브랜드 */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-white">SLOX</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              당신의 개발 파트너<br />
              아이디어를 현실로 만들어 드립니다
            </p>
          </div>
          
          {/* 서비스 */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-dark-300 uppercase tracking-wider">서비스</h4>
            <ul className="space-y-3">
              {["홈페이지 제작", "앱 제작", "AI 챗봇"].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-dark-400 hover:text-accent-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 무료 도구 */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-dark-300 uppercase tracking-wider">무료 도구</h4>
            <ul className="space-y-3">
              <li>
                <a href="/salary" className="text-sm text-dark-400 hover:text-accent-400 transition-colors duration-300">
                  💰 연봉 계산기
                </a>
              </li>
              <li>
                <a href="/severance" className="text-sm text-dark-400 hover:text-accent-400 transition-colors duration-300">
                  💼 퇴직금 계산기
                </a>
              </li>
              <li>
                <a href="/typing" className="text-sm text-dark-400 hover:text-accent-400 transition-colors duration-300">
                  ⌨️ 타자 테스트
                </a>
              </li>
              <li>
                <a href="/reaction" className="text-sm text-dark-400 hover:text-accent-400 transition-colors duration-300">
                  ⚡ 반응속도 테스트
                </a>
              </li>
            </ul>
          </div>
          
          {/* 연락처 */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-dark-300 uppercase tracking-wider">연락처</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hyoincho9123@gmail.com" className="text-sm text-dark-400 hover:text-cyan-400 transition-colors duration-300">
                  hyoincho9123@gmail.com
                </a>
              </li>
              <li>
                <a href="https://pf.kakao.com/_tixaYn/chat" target="_blank" rel="noopener noreferrer" className="text-sm text-dark-400 hover:text-cyan-400 transition-colors duration-300">
                  카카오톡 채널
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 하단 */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} SLOX. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a href="https://pf.kakao.com/_tixaYn/chat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-accent-500/20 hover:border-accent-500/30 transition-all duration-300 group">
              <svg className="w-4 h-4 text-dark-400 group-hover:text-accent-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.52 1.64 4.74 4.12 6.04-.18.64-.65 2.33-.75 2.69-.12.44.16.43.34.31.14-.09 2.19-1.48 3.08-2.08.39.04.79.06 1.21.06 5.52 0 10-3.48 10-7.02S17.52 3 12 3z" />
              </svg>
            </a>
            <a href="mailto:hyoincho9123@gmail.com" className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 group">
              <svg className="w-4 h-4 text-dark-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
