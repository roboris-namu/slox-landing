import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";
import LanguageSelector from "@/components/LanguageSelector";
import LiveRanking from "@/components/LiveRanking";
import DesktopToolsDropdown from "@/components/DesktopToolsDropdown";
import NavUserProfile, { NavUserProfileMobile } from "@/components/NavUserProfile";

export const metadata: Metadata = {
  title: "SLOX - Herramientas Online Gratis | Test IQ・Test de Reacción・Juegos",
  description: "SLOX - Caja de herramientas online gratis. Test IQ, test de reacción, Sudoku, quiz, calculadora IMC, generador QR y más de 26 herramientas gratis.",
  keywords: ["test IQ", "test de reacción", "herramientas online gratis", "sudoku", "quiz", "juegos mentales", "SLOX"],
  openGraph: { title: "SLOX - Herramientas Online Gratis", locale: "es_ES" },
};

export default function SpanishHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <LiveRanking locale="es" />
      <MainBanner locale="es" />
      <HallOfFameCarousel locale="es" />
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
            <a href="/es" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/es/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 Avisos
              </Link>
              <DesktopToolsDropdown locale="es" />
              <LanguageSelector currentLocale="es" />
              <NavUserProfile locale="es" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="es" mobile />
              <a href="/es/notice" className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all" title="Avisos"><span className="text-lg">📢</span></a>
              <NavUserProfileMobile locale="es" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FreeToolsSection() {
  const tools = [
    { emoji: "⚡", name: "Reacción", href: "/es/reaction", badge: "EVENTO" },
    { emoji: "🧠", name: "Test IQ", href: "/es/iq", badge: "NUEVO" },
    { emoji: "📚", name: "Quiz", href: "/es/quiz", badge: "NUEVO" },
    { emoji: "🧩", name: "Sudoku", href: "/es/sudoku", badge: "NUEVO" },
    { emoji: "🎨", name: "Color", href: "/es/color" },
    { emoji: "🖱️", name: "CPS", href: "/es/cps" },
    { emoji: "🧠", name: "Memoria", href: "/es/memory" },
    { emoji: "🎯", name: "Puntería", href: "/es/aim" },
    { emoji: "📱", name: "QR", href: "/es/qr" },
    { emoji: "🔐", name: "Contraseña", href: "/es/password" },
    { emoji: "✍️", name: "Caracteres", href: "/es/character-count" },
    { emoji: "🎲", name: "Aleatorio", href: "/es/random" },
    { emoji: "⚖️", name: "IMC", href: "/es/bmi" },
    { emoji: "📅", name: "Día D", href: "/es/dday" },
    { emoji: "🔢", name: "Porcentaje", href: "/es/percent" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🛠️ Herramientas Online Gratis</h2>
          <p className="text-dark-400">Más de 26 herramientas gratis</p>
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
