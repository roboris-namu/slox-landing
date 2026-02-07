import Hero from "@/components/Hero";
import FreeTools from "@/components/FreeTools";
import Contact from "@/components/Contact";
import LanguageSelector from "@/components/LanguageSelector";
import NavUserProfile, { NavUserProfileMobile } from "@/components/NavUserProfile";

/**
 * SLOX 메인 랜딩페이지
 * - 심플 & 글로벌: Hero → Games/Tools → Contact → Footer
 */
export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <FreeTools />
      <Contact />
      <Footer />
    </main>
  );
}

/**
 * 네비게이션 - 미니멀 글래스모피즘
 */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-5xl mx-auto bg-dark-900/70 backdrop-blur-2xl rounded-2xl border border-white/[0.06] shadow-glass">
          <div className="flex items-center justify-between h-14 px-5">
            {/* 로고 */}
            <a href="/" className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </a>

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#games" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">
                Games
              </a>
              <a href="#tools" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">
                Tools
              </a>
              <a href="#contact" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">
                Contact
              </a>
              <div className="w-px h-5 bg-white/[0.08] mx-1" />
              <LanguageSelector />
              <NavUserProfile />
            </div>

            {/* 모바일 메뉴 */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector mobile />
              <NavUserProfileMobile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * 푸터 - 미니멀
 */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 브랜드 */}
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-white tracking-tight">SLOX</span>
            <span className="text-dark-500 text-xs">© {new Date().getFullYear()}</span>
          </div>

          {/* 링크 */}
          <div className="flex items-center gap-5 text-xs text-dark-400">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/notice" className="hover:text-white transition-colors">Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
