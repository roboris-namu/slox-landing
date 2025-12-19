import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";
import LanguageSelector from "@/components/LanguageSelector";
import LiveRanking from "@/components/LiveRanking";
import DesktopToolsDropdown from "@/components/DesktopToolsDropdown";
import NavUserProfile, { NavUserProfileMobile } from "@/components/NavUserProfile";

export const metadata: Metadata = {
  title: "SLOX - 無料オンラインツール | IQテスト・反応速度テスト・ゲーム",
  description: "SLOX - 無料オンラインツールボックス。IQテスト、反応速度テスト、数独、クイズ、BMI計算機、QRコード生成など26種類以上の無料ツール。",
  keywords: ["IQテスト", "反応速度テスト", "無料オンラインツール", "数独", "クイズ", "脳トレ", "SLOX"],
  openGraph: {
    title: "SLOX - 無料オンラインツール",
    description: "26種類以上の無料オンラインツール",
    locale: "ja_JP",
  },
};

export default function JapaneseHome() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <LiveRanking locale="ja" />
      <MainBanner locale="ja" />
      <HallOfFameCarousel locale="ja" />
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
            <a href="/ja" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-accent-500 to-cyan-500 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">SLOX</span>
            </a>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/ja/notice" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                📢 お知らせ
              </Link>
              <DesktopToolsDropdown locale="ja" />
              <LanguageSelector currentLocale="ja" />
              <NavUserProfile locale="ja" />
            </div>
            
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale="ja" mobile />
              <NavUserProfileMobile locale="ja" />
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
    { emoji: "⚡", name: "反応速度", href: "/ja/reaction", badge: "EVENT" },
    { emoji: "🧠", name: "IQテスト", href: "/ja/iq", badge: "NEW" },
    { emoji: "📚", name: "クイズ", href: "/ja/quiz", badge: "NEW" },
    { emoji: "🧩", name: "数独", href: "/ja/sudoku", badge: "NEW" },
    { emoji: "🎨", name: "色テスト", href: "/ja/color" },
    { emoji: "🖱️", name: "CPS", href: "/ja/cps" },
    { emoji: "🧠", name: "記憶力", href: "/ja/memory" },
    { emoji: "🎯", name: "エイム", href: "/ja/aim" },
    { emoji: "📱", name: "QR生成", href: "/ja/qr" },
    { emoji: "🔐", name: "パスワード", href: "/ja/password" },
    { emoji: "✍️", name: "文字数", href: "/ja/character-count" },
    { emoji: "🎲", name: "ランダム", href: "/ja/random" },
    { emoji: "⚖️", name: "BMI", href: "/ja/bmi" },
    { emoji: "📅", name: "D-Day", href: "/ja/dday" },
    { emoji: "🔢", name: "パーセント", href: "/ja/percent" },
    { emoji: "🎂", name: "年齢", href: "/ja/age" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            🛠️ 無料オンラインツール
          </h2>
          <p className="text-dark-400 text-lg">
            26種類以上の無料ツール
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
              <p className="text-dark-500 text-sm">無料オンラインツール</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <a href="/ja" className="hover:text-white transition-colors">ホーム</a>
            <a href="/about" className="hover:text-white transition-colors">会社紹介</a>
            <a href="/privacy" className="hover:text-white transition-colors">プライバシー</a>
            <a href="mailto:hyoincho9123@gmail.com" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>
          
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} SLOX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

