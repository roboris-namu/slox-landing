import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SLOX - Kostenlose Online-Tools | IQ-Test・Reaktionstest・Spiele",
  description: "SLOX - Kostenlose Online-Toolbox. IQ-Test, Reaktionstest, Sudoku, Quiz, BMI-Rechner, QR-Generator und über 26 kostenlose Tools.",
  keywords: ["IQ-Test", "Reaktionstest", "kostenlose Online-Tools", "Sudoku", "Quiz", "Gehirnspiele", "SLOX"],
  openGraph: { title: "SLOX - Kostenlose Online-Tools", locale: "de_DE" },
};

export default function GermanHome() {
  const banners = [
    { title: "⚡ Reaktionstest", subtitle: "🎁 Gewinne einen Gutschein! Event läuft", cta: "Herausforderung", href: "/de/reaction", gradient: "from-purple-600 via-pink-500 to-red-500", badge: "🎁 EVENT" },
    { title: "🧠 IQ-Test", subtitle: "Wie hoch ist dein IQ? 12 Muster-Fragen", cta: "Test starten", href: "/de/iq", gradient: "from-indigo-600 via-purple-500 to-pink-500", badge: "✨ NEU" },
    { title: "📚 Wissensquiz", subtitle: "Teste dein Wissen! 10 Fragen", cta: "Quiz starten", href: "/de/quiz", gradient: "from-blue-600 via-cyan-500 to-teal-500", badge: "✨ NEU" },
    { title: "🧩 Sudoku", subtitle: "Gehirntraining - 3 Schwierigkeiten", cta: "Spielen", href: "/de/sudoku", gradient: "from-emerald-600 via-teal-500 to-cyan-500", badge: "✨ NEU" },
    { title: "🎨 Farbe finden", subtitle: "Finde die andere Farbe! Augentest", cta: "Herausforderung", href: "/de/color", gradient: "from-orange-600 via-amber-500 to-yellow-500" },
    { title: "🖱️ CPS-Test", subtitle: "Klicks pro Sekunde", cta: "Testen", href: "/de/cps", gradient: "from-rose-600 via-red-500 to-orange-500" },
  ];

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
    <main className="relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between h-16 px-6">
              <a href="/de" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold">S</span></div><span className="font-bold text-lg text-white">SLOX</span></a>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/de/reaction" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🎮 Spiele</Link>
                <Link href="/de/bmi" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🧮 Rechner</Link>
                <LanguageSelector locale="de" />
              </div>
              <div className="md:hidden"><LanguageSelector locale="de" /></div>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="flex animate-scroll-left-slow">
              {[...banners, ...banners].map((b, i) => (
                <Link key={i} href={b.href} className={`flex-shrink-0 w-[85vw] md:w-[600px] mx-2 p-8 md:p-10 rounded-2xl bg-gradient-to-br ${b.gradient} relative group`}>
                  {b.badge && <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">{b.badge}</span>}
                  <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{b.title}</h2>
                  <p className="text-white/80 mb-6">{b.subtitle}</p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-bold rounded-xl">{b.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <footer className="bg-dark-950 border-t border-white/[0.05] py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold">S</span></div><span className="font-bold text-xl text-white">SLOX</span></div>
          <p className="text-dark-500 text-sm">© {new Date().getFullYear()} SLOX</p>
        </div>
      </footer>
    </main>
  );
}

function LanguageSelector({ locale }: { locale: string }) {
  const langs = [
    { code: 'ko', name: '한국어', flag: '🇰🇷', path: '/' },
    { code: 'en', name: 'English', flag: '🇺🇸', path: '/en' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', path: '/ja' },
    { code: 'zh', name: '中文', flag: '🇨🇳', path: '/zh' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', path: '/de' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', path: '/fr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', path: '/es' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', path: '/pt' },
  ];
  const cur = langs.find(l => l.code === locale)!;
  return (
    <div className="relative group">
      <button className="px-3 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] flex items-center gap-2">
        <span>{cur.flag}</span><span className="hidden sm:inline">{cur.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className="absolute right-0 top-full mt-2 w-40 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {langs.map((l) => (<a key={l.code} href={l.path} className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 ${l.code === locale ? 'text-cyan-400' : 'text-dark-300'}`}><span>{l.flag}</span>{l.name}</a>))}
      </div>
    </div>
  );
}

