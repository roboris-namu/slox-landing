import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";
import LanguageSelector from "@/components/LanguageSelector";
import LiveRanking from "@/components/LiveRanking";
import DesktopToolsDropdown from "@/components/DesktopToolsDropdown";
import NavUserProfile, { NavUserProfileMobile } from "@/components/NavUserProfile";

export const metadata: Metadata = {
  title: "SLOX - Kostenlose Online-Tools | IQ-Test・Reaktionstest・Spiele",
  description: "SLOX - Kostenlose Online-Toolbox. IQ-Test, Reaktionstest, Sudoku, Quiz, BMI-Rechner, QR-Generator und über 26 kostenlose Tools.",
  keywords: ["IQ-Test", "Reaktionstest", "kostenlose Online-Tools", "Sudoku", "Quiz", "Gehirnspiele", "SLOX"],
  openGraph: { title: "SLOX - Kostenlose Online-Tools", locale: "de_DE" },
};

export default function GermanHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <LiveRanking locale="de" />
      <MainBanner locale="de" />
      <HallOfFameCarousel locale="de" />
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
            <a href="/de" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/de/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 Hinweis
              </Link>
              <DesktopToolsDropdown locale="de" />
              <LanguageSelector currentLocale="de" />
              <NavUserProfile locale="de" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="de" mobile />
              <NavUserProfileMobile locale="de" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FreeToolsSection() {
  const tools = [
    { emoji: "⚡", name: "Reaktion", href: "/de/reaction", badge: "EVENT" },
    { emoji: "🧠", name: "IQ-Test", href: "/de/iq", badge: "NEU" },
    { emoji: "📚", name: "Quiz", href: "/de/quiz", badge: "NEU" },
    { emoji: "🧩", name: "Sudoku", href: "/de/sudoku", badge: "NEU" },
    { emoji: "🎨", name: "Farbtest", href: "/de/color" },
    { emoji: "🖱️", name: "CPS", href: "/de/cps" },
    { emoji: "🧠", name: "Gedächtnis", href: "/de/memory" },
    { emoji: "🎯", name: "Zieltest", href: "/de/aim" },
    { emoji: "📱", name: "QR-Code", href: "/de/qr" },
    { emoji: "🔐", name: "Passwort", href: "/de/password" },
    { emoji: "✍️", name: "Zeichen", href: "/de/character-count" },
    { emoji: "🎲", name: "Zufall", href: "/de/random" },
    { emoji: "⚖️", name: "BMI", href: "/de/bmi" },
    { emoji: "📅", name: "D-Day", href: "/de/dday" },
    { emoji: "🔢", name: "Prozent", href: "/de/percent" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🛠️ Kostenlose Online-Tools</h2>
          <p className="text-dark-400">Über 26 kostenlose Tools</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {tools.map((t) => (
            <Link key={t.name} href={t.href} className="group relative p-4 bg-dark-800/30 hover:bg-dark-700/50 border border-dark-700/50 rounded-xl transition-all hover:-translate-y-1">
              {t.badge && <span className="absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-black">{t.badge}</span>}
              <div className="text-2xl mb-2">{t.emoji}</div>
              <div className="text-sm text-dark-300 group-hover:text-white">{t.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/[0.05] py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl text-white">SLOX</span>
        </div>
        <p className="text-dark-500 text-sm">© {new Date().getFullYear()} SLOX</p>
      </div>
    </footer>
  );
}
