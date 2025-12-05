"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  items: string;
  itemsPlaceholder: string;
  count: string;
  pick: string;
  result: string;
  reset: string;
  examples: string;
  lunchExample: string;
  teamExample: string;
  gameExample: string;
  whatIsRandom: string;
  randomExplanation: string;
  useCases: string;
  lottery: string;
  decision: string;
  team: string;
  otherTools: string;
  backToMain: string;
}> = {
  ko: {
    title: "랜덤 뽑기",
    subtitle: "여러 항목 중에서 랜덤으로 선택하세요",
    items: "항목 입력",
    itemsPlaceholder: "각 줄에 하나씩 입력하세요\n예: 짜장면\n짬뽕\n탕수육",
    count: "뽑을 개수",
    pick: "랜덤 뽑기!",
    result: "결과",
    reset: "초기화",
    examples: "예시",
    lunchExample: "오늘 점심 메뉴",
    teamExample: "팀 구성",
    gameExample: "게임 캐릭터",
    whatIsRandom: "랜덤 뽑기란?",
    randomExplanation: "랜덤 뽑기는 여러 선택지 중에서 무작위로 항목을 선택하는 도구입니다. 점심 메뉴 결정, 팀 배정, 추첨 등에 활용할 수 있습니다.",
    useCases: "활용 예시",
    lottery: "추첨/경품",
    decision: "결정 도우미",
    team: "팀 배정",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
  },
  en: {
    title: "Random Picker",
    subtitle: "Randomly pick from multiple items",
    items: "Enter Items",
    itemsPlaceholder: "Enter one per line\nExample: Pizza\nBurger\nSushi",
    count: "Pick Count",
    pick: "Random Pick!",
    result: "Result",
    reset: "Reset",
    examples: "Examples",
    lunchExample: "Today's Lunch",
    teamExample: "Team Building",
    gameExample: "Game Character",
    whatIsRandom: "What is Random Picker?",
    randomExplanation: "Random Picker randomly selects items from multiple choices. Use it for lunch decisions, team assignments, lotteries, and more.",
    useCases: "Use Cases",
    lottery: "Lottery/Prize",
    decision: "Decision Helper",
    team: "Team Assignment",
    otherTools: "Other Tools",
    backToMain: "← Back",
  },
  ja: {
    title: "ランダム選択",
    subtitle: "複数の項目からランダムに選択",
    items: "項目入力",
    itemsPlaceholder: "1行に1つずつ入力\n例: ラーメン\n寿司\nカレー",
    count: "選択数",
    pick: "ランダム選択！",
    result: "結果",
    reset: "リセット",
    examples: "例",
    lunchExample: "今日のランチ",
    teamExample: "チーム編成",
    gameExample: "ゲームキャラ",
    whatIsRandom: "ランダム選択とは？",
    randomExplanation: "ランダム選択は複数の選択肢から無作為に項目を選ぶツールです。ランチ決定、チーム割り当て、抽選などに活用できます。",
    useCases: "活用例",
    lottery: "抽選/景品",
    decision: "決定ヘルパー",
    team: "チーム割り当て",
    otherTools: "他のツール",
    backToMain: "← 戻る",
  },
  zh: {
    title: "随机抽选",
    subtitle: "从多个选项中随机选择",
    items: "输入选项",
    itemsPlaceholder: "每行一个选项\n例如: 披萨\n汉堡\n寿司",
    count: "抽选数量",
    pick: "随机抽选！",
    result: "结果",
    reset: "重置",
    examples: "示例",
    lunchExample: "今天午餐",
    teamExample: "团队组建",
    gameExample: "游戏角色",
    whatIsRandom: "什么是随机抽选？",
    randomExplanation: "随机抽选从多个选项中随机选择项目。可用于午餐决定、团队分配、抽奖等。",
    useCases: "使用场景",
    lottery: "抽奖/奖品",
    decision: "决策助手",
    team: "团队分配",
    otherTools: "其他工具",
    backToMain: "← 返回",
  },
  es: {
    title: "Selector Aleatorio",
    subtitle: "Elige aleatoriamente entre multiples opciones",
    items: "Ingresar Opciones",
    itemsPlaceholder: "Una por linea\nEjemplo: Pizza\nHamburguesa\nSushi",
    count: "Cantidad",
    pick: "Seleccionar!",
    result: "Resultado",
    reset: "Reiniciar",
    examples: "Ejemplos",
    lunchExample: "Almuerzo de Hoy",
    teamExample: "Formar Equipo",
    gameExample: "Personaje de Juego",
    whatIsRandom: "Que es el Selector Aleatorio?",
    randomExplanation: "El selector aleatorio elige elementos al azar de multiples opciones. Usalo para decisiones de almuerzo, asignacion de equipos, sorteos y mas.",
    useCases: "Casos de Uso",
    lottery: "Sorteo/Premio",
    decision: "Ayuda para Decidir",
    team: "Asignacion de Equipo",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
  },
  pt: {
    title: "Seletor Aleatorio",
    subtitle: "Escolha aleatoriamente entre multiplas opcoes",
    items: "Inserir Opcoes",
    itemsPlaceholder: "Uma por linha\nExemplo: Pizza\nHamburguer\nSushi",
    count: "Quantidade",
    pick: "Selecionar!",
    result: "Resultado",
    reset: "Reiniciar",
    examples: "Exemplos",
    lunchExample: "Almoco de Hoje",
    teamExample: "Formar Equipe",
    gameExample: "Personagem de Jogo",
    whatIsRandom: "O que e Seletor Aleatorio?",
    randomExplanation: "O seletor aleatorio escolhe itens aleatoriamente de multiplas opcoes. Use para decisoes de almoco, atribuicao de equipes, sorteios e mais.",
    useCases: "Casos de Uso",
    lottery: "Sorteio/Premio",
    decision: "Ajuda para Decidir",
    team: "Atribuicao de Equipe",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
  },
  de: {
    title: "Zufallsauswahl",
    subtitle: "Wahle zufallig aus mehreren Optionen",
    items: "Optionen eingeben",
    itemsPlaceholder: "Eine pro Zeile\nBeispiel: Pizza\nBurger\nSushi",
    count: "Anzahl",
    pick: "Auswahlen!",
    result: "Ergebnis",
    reset: "Zurucksetzen",
    examples: "Beispiele",
    lunchExample: "Heutiges Mittagessen",
    teamExample: "Team bilden",
    gameExample: "Spielcharakter",
    whatIsRandom: "Was ist Zufallsauswahl?",
    randomExplanation: "Die Zufallsauswahl wahlt zufallig Elemente aus mehreren Optionen. Verwenden Sie es fur Mittagsentscheidungen, Teamzuweisungen, Verlosungen und mehr.",
    useCases: "Anwendungsfalle",
    lottery: "Verlosung/Preis",
    decision: "Entscheidungshilfe",
    team: "Teamzuweisung",
    otherTools: "Andere Tools",
    backToMain: "← Zuruck",
  },
  fr: {
    title: "Selecteur Aleatoire",
    subtitle: "Choisissez au hasard parmi plusieurs options",
    items: "Entrer les Options",
    itemsPlaceholder: "Une par ligne\nExemple: Pizza\nBurger\nSushi",
    count: "Nombre",
    pick: "Selectionner!",
    result: "Resultat",
    reset: "Reinitialiser",
    examples: "Exemples",
    lunchExample: "Dejeuner d'Aujourd'hui",
    teamExample: "Former une Equipe",
    gameExample: "Personnage de Jeu",
    whatIsRandom: "Qu'est-ce que le Selecteur Aleatoire?",
    randomExplanation: "Le selecteur aleatoire choisit au hasard des elements parmi plusieurs options. Utilisez-le pour les decisions de dejeuner, l'affectation d'equipes, les tirages au sort et plus.",
    useCases: "Cas d'Utilisation",
    lottery: "Tirage/Prix",
    decision: "Aide a la Decision",
    team: "Affectation d'Equipe",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
  },
};

interface RandomPickerProps {
  lang?: Lang;
}

const languageOptions: { code: Lang; label: string; flag: string }[] = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function RandomPicker({ lang = "ko" }: RandomPickerProps) {
  const [currentLang, setCurrentLang] = useState<Lang>(lang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[currentLang];
  const [input, setInput] = useState("");
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageChange = (newLang: Lang) => {
    setCurrentLang(newLang);
    setShowLangMenu(false);
    const basePath = newLang === "ko" ? "/random" : `/${newLang}/random`;
    window.history.pushState({}, "", basePath);
  };

  const pick = useCallback(() => {
    const items = input.split("\n").map((s) => s.trim()).filter((s) => s);
    if (items.length === 0) return;

    setIsAnimating(true);
    setResults([]);

    const pickCount = Math.min(count, items.length);
    let animationCount = 0;
    const interval = setInterval(() => {
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      setResults(shuffled.slice(0, pickCount));
      animationCount++;
      if (animationCount >= 15) {
        clearInterval(interval);
        setIsAnimating(false);
        const finalShuffled = [...items].sort(() => Math.random() - 0.5);
        setResults(finalShuffled.slice(0, pickCount));
      }
    }, 100);
  }, [input, count]);

  const setExample = (example: string) => {
    const examples: Record<string, string> = {
      lunch: "짜장면\n짬뽕\n볶음밥\n탕수육\n라면\n김밥",
      team: "Alice\nBob\nCharlie\nDavid\nEve\nFrank",
      game: "Warrior\nMage\nArcher\nAssassin\nPriest",
    };
    setInput(examples[example] || "");
    setResults([]);
  };

  const mainPath = currentLang === "ko" ? "/" : `/${currentLang}`;
  const currentLangOption = languageOptions.find(l => l.code === currentLang);
  const items = input.split("\n").map((s) => s.trim()).filter((s) => s);

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={mainPath} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 transition-colors text-sm"
                >
                  <span>{currentLangOption?.flag}</span>
                  <span className="text-dark-300">{currentLangOption?.label}</span>
                  <svg className={`w-3 h-3 text-dark-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          currentLang === option.code ? 'bg-dark-700 text-white' : 'text-dark-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link href={mainPath} className="text-dark-300 hover:text-white transition-colors text-sm">
                {t.backToMain}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="text-amber-400 text-sm font-medium">🎲 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4">
                <label className="block text-dark-300 text-sm font-medium mb-2">{t.items}</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.itemsPlaceholder}
                  className="w-full h-48 p-4 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <p className="text-dark-500 text-xs mt-1">{items.length} items</p>
              </div>

              <div className="mb-4">
                <p className="text-dark-400 text-sm mb-2">{t.examples}</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setExample("lunch")} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-sm">🍜 {t.lunchExample}</button>
                  <button onClick={() => setExample("team")} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-sm">👥 {t.teamExample}</button>
                  <button onClick={() => setExample("game")} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-sm">🎮 {t.gameExample}</button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-dark-300 text-sm font-medium mb-2">{t.count}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${count === n ? "bg-amber-600 text-white" : "bg-dark-700 text-dark-300 hover:bg-dark-600"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={pick}
                disabled={items.length === 0 || isAnimating}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:bg-dark-700 disabled:text-dark-500 text-white font-semibold rounded-lg transition-all"
              >
                🎲 {t.pick}
              </button>
            </div>

            <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center min-h-[300px]">
              {results.length > 0 ? (
                <div className="text-center">
                  <h3 className="text-dark-400 text-sm mb-4">{t.result}</h3>
                  <div className="space-y-3">
                    {results.map((r, i) => (
                      <div
                        key={i}
                        className={`text-3xl font-bold text-amber-400 ${isAnimating ? "animate-pulse" : ""}`}
                      >
                        🎯 {r}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setResults([])}
                    className="mt-6 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 rounded-lg text-sm"
                  >
                    {t.reset}
                  </button>
                </div>
              ) : (
                <div className="text-center text-dark-400">
                  <div className="text-6xl mb-4">🎰</div>
                  <p>{t.pick}</p>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mt-8 mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsRandom}</h3>
            <p className="text-dark-300 leading-relaxed">{t.randomExplanation}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/password`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔐 Password</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/qr`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📱 QR Code</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href={mainPath} className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}

