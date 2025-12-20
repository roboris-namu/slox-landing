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
  title: "SLOX - Outils en Ligne Gratuits | Test QI・Test de Réaction・Jeux",
  description: "SLOX - Boîte à outils en ligne gratuite. Test QI, test de réaction, Sudoku, quiz, calculateur IMC, générateur QR et plus de 26 outils gratuits.",
  keywords: ["test QI", "test de réaction", "outils en ligne gratuits", "sudoku", "quiz", "jeux cérébraux", "SLOX"],
  openGraph: { title: "SLOX - Outils en Ligne Gratuits", locale: "fr_FR" },
};

export default function FrenchHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <LiveRanking locale="fr" />
      <BattleTicker lang="fr" />
      <MainBanner locale="fr" />
      <HallOfFameCarousel locale="fr" />
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
            <a href="/fr" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/fr/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 Annonces
              </Link>
              <DesktopToolsDropdown locale="fr" />
              <LanguageSelector currentLocale="fr" />
              <NavUserProfile locale="fr" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="fr" mobile />
              <a href="/fr/notice" className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-all" title="Annonces"><span className="text-lg">📢</span></a>
              <NavUserProfileMobile locale="fr" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FreeToolsSection() {
  const tools = [
    { emoji: "⚡", name: "Réaction", href: "/fr/reaction", badge: "ÉVÉNEMENT" },
    { emoji: "🧠", name: "Test QI", href: "/fr/iq", badge: "NOUVEAU" },
    { emoji: "📚", name: "Quiz", href: "/fr/quiz", badge: "NOUVEAU" },
    { emoji: "🧩", name: "Sudoku", href: "/fr/sudoku", badge: "NOUVEAU" },
    { emoji: "🎨", name: "Couleur", href: "/fr/color" },
    { emoji: "🖱️", name: "CPS", href: "/fr/cps" },
    { emoji: "🧠", name: "Mémoire", href: "/fr/memory" },
    { emoji: "🎯", name: "Précision", href: "/fr/aim" },
    { emoji: "📱", name: "QR Code", href: "/fr/qr" },
    { emoji: "🔐", name: "Mot de passe", href: "/fr/password" },
    { emoji: "✍️", name: "Caractères", href: "/fr/character-count" },
    { emoji: "🎲", name: "Aléatoire", href: "/fr/random" },
    { emoji: "⚖️", name: "IMC", href: "/fr/bmi" },
    { emoji: "📅", name: "Jour J", href: "/fr/dday" },
    { emoji: "🔢", name: "Pourcentage", href: "/fr/percent" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🛠️ Outils en Ligne Gratuits</h2>
          <p className="text-dark-400">Plus de 26 outils gratuits</p>
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
