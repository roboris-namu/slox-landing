import { Metadata } from "next";
import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import HallOfFameCarousel from "@/components/HallOfFameCarousel";
import LanguageSelector from "@/components/LanguageSelector";

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
      <MainBanner locale="en" />
      <HallOfFameCarousel locale="en" />
      <CategoryQuickLinks />
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
              <Link href="/en/reaction" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                🎮 Games
              </Link>
              <Link href="/en/bmi" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                🧮 Calculators
              </Link>
              <Link href="/en/qr" className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300">
                🔧 Generators
              </Link>
              <LanguageSelector currentLocale="en" />
            </div>
            
            <div className="md:hidden">
              <LanguageSelector currentLocale="en" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


function CategoryQuickLinks() {
  const categories = [
    {
      name: "🎮 Games",
      count: 10,
      tools: [
        { name: "Reaction Test", href: "/en/reaction", badge: "🎁" },
        { name: "IQ Test", href: "/en/iq", badge: "NEW" },
        { name: "Trivia Quiz", href: "/en/quiz", badge: "NEW" },
        { name: "Sudoku", href: "/en/sudoku", badge: "NEW" },
        { name: "Color Finder", href: "/en/color" },
        { name: "CPS Test", href: "/en/cps" },
        { name: "Memory Test", href: "/en/memory" },
        { name: "Aim Test", href: "/en/aim" },
      ],
    },
    {
      name: "🧮 Calculators",
      count: 6,
      tools: [
        { name: "BMI Calculator", href: "/en/bmi" },
        { name: "Percentage", href: "/en/percent" },
        { name: "D-Day", href: "/en/dday" },
        { name: "Age Calculator", href: "/en/age" },
      ],
    },
    {
      name: "🔧 Generators",
      count: 4,
      tools: [
        { name: "QR Code", href: "/en/qr" },
        { name: "Password", href: "/en/password" },
        { name: "Random Picker", href: "/en/random" },
        { name: "Character Count", href: "/en/character-count" },
      ],
    },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <button className="px-4 py-3 bg-dark-800/50 hover:bg-dark-700/50 border border-dark-700 hover:border-dark-600 rounded-xl transition-all flex items-center gap-2">
                <span className="font-medium text-white">{category.name}</span>
                <span className="text-xs text-dark-400 bg-dark-700/50 px-2 py-0.5 rounded-full">{category.count}</span>
              </button>
              <div className="absolute left-0 top-full mt-2 w-56 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    <span>{tool.name}</span>
                    {tool.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${tool.badge === '🎁' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                        {tool.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

