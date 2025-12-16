import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SLOX - Outils en Ligne Gratuits | Test QI・Test de Réaction・Jeux",
  description: "SLOX - Boîte à outils en ligne gratuite. Test QI, test de réaction, Sudoku, quiz, calculateur IMC, générateur QR et plus de 26 outils gratuits.",
  keywords: ["test QI", "test de réaction", "outils en ligne gratuits", "sudoku", "quiz", "jeux cérébraux", "SLOX"],
  openGraph: { title: "SLOX - Outils en Ligne Gratuits", locale: "fr_FR" },
};

export default function FrenchHome() {
  const banners = [
    { title: "⚡ Test de Réaction", subtitle: "🎁 Gagnez une carte cadeau! Événement en cours", cta: "Défi", href: "/fr/reaction", gradient: "from-purple-600 via-pink-500 to-red-500", badge: "🎁 ÉVÉNEMENT" },
    { title: "🧠 Test de QI", subtitle: "Quel est votre QI? 12 questions", cta: "Commencer", href: "/fr/iq", gradient: "from-indigo-600 via-purple-500 to-pink-500", badge: "✨ NOUVEAU" },
    { title: "📚 Quiz Culture", subtitle: "Testez vos connaissances! 10 questions", cta: "Commencer", href: "/fr/quiz", gradient: "from-blue-600 via-cyan-500 to-teal-500", badge: "✨ NOUVEAU" },
    { title: "🧩 Sudoku", subtitle: "Entraînement cérébral - 3 niveaux", cta: "Jouer", href: "/fr/sudoku", gradient: "from-emerald-600 via-teal-500 to-cyan-500", badge: "✨ NOUVEAU" },
    { title: "🎨 Trouver la Couleur", subtitle: "Trouvez la couleur différente!", cta: "Défi", href: "/fr/color", gradient: "from-orange-600 via-amber-500 to-yellow-500" },
    { title: "🖱️ Test CPS", subtitle: "Clics par seconde", cta: "Tester", href: "/fr/cps", gradient: "from-rose-600 via-red-500 to-orange-500" },
  ];

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
    <main className="relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between h-16 px-6">
              <a href="/fr" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold">S</span></div><span className="font-bold text-lg text-white">SLOX</span></a>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/fr/reaction" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🎮 Jeux</Link>
                <Link href="/fr/bmi" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🧮 Calculateurs</Link>
                <LanguageSelector locale="fr" />
              </div>
              <div className="md:hidden"><LanguageSelector locale="fr" /></div>
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

