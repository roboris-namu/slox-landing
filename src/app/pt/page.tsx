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
  title: "SLOX - Ferramentas Online Grátis | Teste QI・Teste de Reação・Jogos",
  description: "SLOX - Caixa de ferramentas online grátis. Teste QI, teste de reação, Sudoku, quiz, calculadora IMC, gerador QR e mais de 26 ferramentas grátis.",
  keywords: ["teste QI", "teste de reação", "ferramentas online grátis", "sudoku", "quiz", "jogos cerebrais", "SLOX"],
  openGraph: { title: "SLOX - Ferramentas Online Grátis", locale: "pt_BR" },
};

export default function PortugueseHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <BattleTicker lang="pt" />
      <LiveRanking locale="pt" />
      <MainBanner locale="pt" />
      <HallOfFameCarousel locale="pt" />
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
            <a href="/pt" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/pt/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 Avisos
              </Link>
              <DesktopToolsDropdown locale="pt" />
              <LanguageSelector currentLocale="pt" />
              <NavUserProfile locale="pt" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="pt" mobile />
              <a href="/pt/notice" className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all" title="Avisos"><span className="text-lg">📢</span></a>
              <NavUserProfileMobile locale="pt" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FreeToolsSection() {
  const tools = [
    { emoji: "⚡", name: "Reação", href: "/pt/reaction", badge: "EVENTO" },
    { emoji: "🧠", name: "Teste QI", href: "/pt/iq", badge: "NOVO" },
    { emoji: "📚", name: "Quiz", href: "/pt/quiz", badge: "NOVO" },
    { emoji: "🧩", name: "Sudoku", href: "/pt/sudoku", badge: "NOVO" },
    { emoji: "🎨", name: "Cor", href: "/pt/color" },
    { emoji: "🖱️", name: "CPS", href: "/pt/cps" },
    { emoji: "🧠", name: "Memória", href: "/pt/memory" },
    { emoji: "🎯", name: "Mira", href: "/pt/aim" },
    { emoji: "📱", name: "QR", href: "/pt/qr" },
    { emoji: "🔐", name: "Senha", href: "/pt/password" },
    { emoji: "✍️", name: "Caracteres", href: "/pt/character-count" },
    { emoji: "🎲", name: "Aleatório", href: "/pt/random" },
    { emoji: "⚖️", name: "IMC", href: "/pt/bmi" },
    { emoji: "📅", name: "Dia D", href: "/pt/dday" },
    { emoji: "🔢", name: "Porcentagem", href: "/pt/percent" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🛠️ Ferramentas Online Grátis</h2>
          <p className="text-dark-400">Mais de 26 ferramentas grátis</p>
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
