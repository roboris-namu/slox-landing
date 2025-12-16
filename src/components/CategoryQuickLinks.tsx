"use client";

import Link from "next/link";

interface Category {
  id: string;
  emoji: string;
  title: string;
  count: number;
  color: string;
  hoverColor: string;
  items: { title: string; href: string; emoji: string }[];
}

const categories: Category[] = [
  {
    id: "games",
    emoji: "🎮",
    title: "게임",
    count: 10,
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:border-purple-500/50",
    items: [
      { title: "반응속도", href: "/reaction", emoji: "⚡" },
      { title: "색깔찾기", href: "/color", emoji: "🎨" },
      { title: "카드맞추기", href: "/memory", emoji: "🃏" },
      { title: "CPS테스트", href: "/cps", emoji: "🖱️" },
      { title: "상식퀴즈", href: "/quiz", emoji: "📚" },
      { title: "IQ테스트", href: "/iq", emoji: "🧩" },
      { title: "스도쿠", href: "/sudoku", emoji: "🔢" },
      { title: "타자테스트", href: "/typing", emoji: "⌨️" },
    ],
  },
  {
    id: "calculators",
    emoji: "🧮",
    title: "계산기",
    count: 6,
    color: "from-emerald-500 to-teal-500",
    hoverColor: "hover:border-emerald-500/50",
    items: [
      { title: "연봉계산기", href: "/salary", emoji: "💰" },
      { title: "BMI계산기", href: "/bmi", emoji: "⚖️" },
      { title: "퇴직금계산기", href: "/severance", emoji: "🏦" },
      { title: "적금계산기", href: "/savings", emoji: "🐷" },
      { title: "나이계산기", href: "/age", emoji: "🎂" },
      { title: "퍼센트계산기", href: "/percent", emoji: "📊" },
    ],
  },
  {
    id: "generators",
    emoji: "🔧",
    title: "생성기",
    count: 4,
    color: "from-blue-500 to-cyan-500",
    hoverColor: "hover:border-blue-500/50",
    items: [
      { title: "QR코드", href: "/qr", emoji: "📱" },
      { title: "비밀번호", href: "/password", emoji: "🔐" },
      { title: "랜덤숫자", href: "/random", emoji: "🎲" },
      { title: "글자수세기", href: "/character-count", emoji: "📝" },
    ],
  },
  {
    id: "lifestyle",
    emoji: "🔮",
    title: "운세/심리",
    count: 4,
    color: "from-orange-500 to-red-500",
    hoverColor: "hover:border-orange-500/50",
    items: [
      { title: "오늘의운세", href: "/fortune", emoji: "🔮" },
      { title: "오늘의명언", href: "/quote", emoji: "📖" },
      { title: "SLOX테스트", href: "/slox-test", emoji: "🦊" },
      { title: "D-Day계산기", href: "/dday", emoji: "📅" },
    ],
  },
];

export default function CategoryQuickLinks() {
  const totalCount = categories.reduce((acc, cat) => acc + cat.count, 0);

  return (
    <section className="relative py-6 md:py-8 z-30">
      <div className="max-w-6xl mx-auto px-4">
        {/* 카테고리 버튼들 - 1줄, 중앙 정렬 */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              {/* 버튼 */}
              <button
                className={`flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 bg-dark-800/60 hover:bg-dark-800 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300`}
              >
                <span className="text-lg md:text-xl">{category.emoji}</span>
                <span className="font-medium text-white text-xs md:text-sm">{category.title}</span>
                <span className={`px-1.5 py-0.5 bg-gradient-to-r ${category.color} text-white text-[10px] md:text-xs font-bold rounded-full`}>
                  {category.count}
                </span>
              </button>

              {/* 드롭다운 메뉴 */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-dark-800/98 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl shadow-black/50">
                  {/* 화살표 */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-800/98 border-l border-t border-white/15 rotate-45" />
                  <div className="relative p-3">
                    <div className="grid grid-cols-2 gap-1.5">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-xs text-white/80 hover:text-white whitespace-nowrap">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 전체 보기 버튼 */}
        <div className="flex justify-center mt-4">
          <Link
            href="/tools"
            className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-accent-500/20 to-cyan-500/20 border border-accent-500/30 hover:border-accent-500/50 rounded-full transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">🛠️</span>
            <span className="text-white/80 group-hover:text-white text-sm font-medium">
              전체 {totalCount}개 도구 보기
            </span>
            <svg className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

