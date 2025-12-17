import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";

export const metadata: Metadata = {
  title: "SLOX - 免费在线工具 | IQ测试・反应速度测试・游戏",
  description: "SLOX - 免费在线工具箱。IQ测试、反应速度测试、数独、问答游戏、BMI计算器、二维码生成器等26种以上免费工具。",
  keywords: ["IQ测试", "反应速度测试", "免费在线工具", "数独", "问答", "脑力游戏", "SLOX"],
  openGraph: { title: "SLOX - 免费在线工具", locale: "zh_CN" },
};

export default function ChineseHome() {
  const tools = [
    { emoji: "⚡", name: "反应测试", href: "/zh/reaction", badge: "活动" },
    { emoji: "🧠", name: "IQ测试", href: "/zh/iq", badge: "新" },
    { emoji: "📚", name: "问答", href: "/zh/quiz", badge: "新" },
    { emoji: "🧩", name: "数独", href: "/zh/sudoku", badge: "新" },
    { emoji: "🎨", name: "颜色测试", href: "/zh/color" },
    { emoji: "🖱️", name: "CPS", href: "/zh/cps" },
    { emoji: "🧠", name: "记忆力", href: "/zh/memory" },
    { emoji: "🎯", name: "瞄准", href: "/zh/aim" },
    { emoji: "📱", name: "二维码", href: "/zh/qr" },
    { emoji: "🔐", name: "密码", href: "/zh/password" },
    { emoji: "✍️", name: "字数", href: "/zh/character-count" },
    { emoji: "🎲", name: "随机", href: "/zh/random" },
    { emoji: "⚖️", name: "BMI", href: "/zh/bmi" },
    { emoji: "📅", name: "D-Day", href: "/zh/dday" },
    { emoji: "🔢", name: "百分比", href: "/zh/percent" },
  ];

  return (
    <main className="relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-6xl mx-auto bg-dark-900/60 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-glass">
            <div className="flex items-center justify-between h-16 px-6">
              <a href="/zh" className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold text-sm">S</span></div><span className="font-bold text-lg text-white">SLOX</span></a>
              <div className="hidden md:flex items-center gap-1">
                <Link href="/zh/reaction" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🎮 游戏</Link>
                <Link href="/zh/bmi" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05]">🧮 计算器</Link>
                <LanguageSelector locale="zh" />
              </div>
              <div className="md:hidden"><LanguageSelector locale="zh" /></div>
            </div>
          </div>
        </div>
      </nav>

      <MainBanner locale="zh" />

      <HallOfFameCarousel locale="zh" />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">🛠️ 免费在线工具</h2>
            <p className="text-dark-400">26种以上免费工具</p>
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
