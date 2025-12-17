import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";

export const metadata: Metadata = {
  title: "SLOX - Ferramentas Online Grátis | Teste QI・Teste de Reação・Jogos",
  description: "SLOX - Caixa de ferramentas online grátis. Teste QI, teste de reação, Sudoku, quiz, calculadora IMC, gerador QR e mais de 26 ferramentas grátis.",
  keywords: ["teste QI", "teste de reação", "ferramentas online grátis", "sudoku", "quiz", "jogos cerebrais", "SLOX"],
  openGraph: { title: "SLOX - Ferramentas Online Grátis", locale: "pt_BR" },
};

export default function PortugueseHome() {
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
    <main className="relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between h-16 px-6">
              <a href="/pt" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold">S</span></div><span className="font-bold text-lg text-white">SLOX</span></a>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/pt/reaction" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🎮 Jogos</Link>
                <Link href="/pt/bmi" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🧮 Calculadoras</Link>
                <LanguageSelector locale="pt" />
              </div>
              <div className="md:hidden"><LanguageSelector locale="pt" /></div>
            </div>
          </div>
        </div>
      </nav>

      <MainBanner locale="pt" />

      <HallOfFameCarousel />

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
