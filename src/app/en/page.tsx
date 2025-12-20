import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";
import LanguageSelector from "@/components/LanguageSelector";
import LiveRanking from "@/components/LiveRanking";
import BattleTicker from "@/components/BattleTicker";
import DesktopToolsDropdown from "@/components/DesktopToolsDropdown";
import NavUserProfile, { NavUserProfileMobile } from "@/components/NavUserProfile";

export const metadata: Metadata = {
  title: "SLOX - Free Online Tools | IQ Test, Reaction Test, Games & More",
  description: "SLOX - Your free online toolbox. IQ Test, Reaction Speed Test, Sudoku, Trivia Quiz, BMI Calculator, QR Generator and 26+ free tools. Test your brain and have fun!",
  keywords: ["IQ test", "reaction test", "free online tools", "sudoku", "trivia quiz", "brain games", "CPS test", "memory test", "SLOX"],
  openGraph: {
    title: "SLOX - Free Online Tools | Games & Tests",
    description: "26+ free online tools: IQ Test, Reaction Test, Sudoku, Quiz and more!",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "de_DE", "fr_FR", "es_ES", "pt_BR"],
  },
};

export default function EnglishHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <BattleTicker lang="en" />
      <LiveRanking locale="en" />
      <MainBanner locale="en" />
      <HallOfFameCarousel locale="en" />
      <FreeToolsSection />
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-glass">
          <div className="flex items-center justify-between h-16 px-6">
            <a href="/en" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/en/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 Notice
              </Link>
              <DesktopToolsDropdown locale="en" />
              <LanguageSelector currentLocale="en" />
              <NavUserProfile locale="en" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="en" mobile />
              <a href="/en/notice" className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all" title="Notice"><span className="text-lg">📢</span></a>
              <NavUserProfileMobile locale="en" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


/* CategoryQuickLinks 임시 숨김 */

function FreeToolsSection() {
  const tools = [
    { emoji: "⚡", name: "Reaction Test", href: "/en/reaction", badge: "EVENT" },
    { emoji: "🧠", name: "IQ Test", href: "/en/iq", badge: "NEW" },
    { emoji: "📚", name: "Quiz", href: "/en/quiz", badge: "NEW" },
    { emoji: "🧩", name: "Sudoku", href: "/en/sudoku", badge: "NEW" },
    { emoji: "🎨", name: "Color Test", href: "/en/color" },
    { emoji: "🖱️", name: "CPS Test", href: "/en/cps" },
    { emoji: "🧠", name: "Memory", href: "/en/memory" },
    { emoji: "🎯", name: "Aim Test", href: "/en/aim" },
    { emoji: "📱", name: "QR Generator", href: "/en/qr" },
    { emoji: "🔐", name: "Password", href: "/en/password" },
    { emoji: "✍️", name: "Char Count", href: "/en/character-count" },
    { emoji: "🎲", name: "Random", href: "/en/random" },
    { emoji: "⚖️", name: "BMI", href: "/en/bmi" },
    { emoji: "📅", name: "D-Day", href: "/en/dday" },
    { emoji: "🔢", name: "Percent", href: "/en/percent" },
    { emoji: "🎂", name: "Age", href: "/en/age" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            🛠️ Free Online Tools
          </h2>
          <p className="text-dark-400 text-lg">
            26+ free tools to test, calculate, and generate!
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative p-4 bg-dark-800/30 hover:bg-dark-700/50 border border-dark-700/50 hover:border-dark-600 rounded-xl transition-all hover:-translate-y-1"
            >
              {tool.badge && (
                <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  tool.badge === 'EVENT' ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black'
                }`}>
                  {tool.badge}
                </span>
              )}
              <div className="text-2xl mb-2">{tool.emoji}</div>
              <div className="text-sm font-medium text-dark-300 group-hover:text-white transition-colors">
                {tool.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/[0.05] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <span className="font-bold text-xl text-white">SLOX</span>
              <p className="text-dark-500 text-sm">Free Online Tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <a href="/en" className="hover:text-white transition-colors">Home</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="mailto:hyoincho9123@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} SLOX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

