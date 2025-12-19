"use client";

import { useState } from "react";
import Link from "next/link";
import { Locale, navTranslations } from "@/locales";

// 도구 타입 정의
interface Tool {
  path: string;
  emoji: string;
  labels: Record<Locale, string>;
  best?: boolean;
  isNew?: boolean;
  event?: boolean;
}

interface ToolCategory {
  names: Record<Locale, string>;
  color: string;
  tools: Tool[];
}

// 카테고리별 도구 분류 (다국어)
const toolCategories: ToolCategory[] = [
  {
    names: { ko: "🎮 게임 & 테스트", en: "🎮 Games & Tests", ja: "🎮 ゲーム & テスト", zh: "🎮 游戏 & 测试", de: "🎮 Spiele & Tests", fr: "🎮 Jeux & Tests", es: "🎮 Juegos & Tests", pt: "🎮 Jogos & Testes" },
    color: "purple",
    tools: [
      { path: "/reaction", emoji: "⚡", labels: { ko: "반응속도 테스트", en: "Reaction Test", ja: "反応速度テスト", zh: "反应速度测试", de: "Reaktionstest", fr: "Test de réaction", es: "Test de reacción", pt: "Teste de reação" }, best: true, event: true },
      { path: "/quiz", emoji: "📚", labels: { ko: "상식 퀴즈", en: "Trivia Quiz", ja: "一般常識クイズ", zh: "常识问答", de: "Wissensquiz", fr: "Quiz culture", es: "Quiz de cultura", pt: "Quiz de conhecimentos" }, isNew: true },
      { path: "/iq", emoji: "🧩", labels: { ko: "IQ 테스트", en: "IQ Test", ja: "IQテスト", zh: "IQ测试", de: "IQ-Test", fr: "Test de QI", es: "Test de IQ", pt: "Teste de QI" }, isNew: true },
      { path: "/sudoku", emoji: "🔢", labels: { ko: "스도쿠", en: "Sudoku", ja: "数独", zh: "数独", de: "Sudoku", fr: "Sudoku", es: "Sudoku", pt: "Sudoku" }, isNew: true },
      { path: "/color", emoji: "🎨", labels: { ko: "색상 찾기 게임", en: "Color Finder", ja: "色探しゲーム", zh: "找颜色", de: "Farbe finden", fr: "Trouver la couleur", es: "Busca el color", pt: "Encontre a cor" } },
      { path: "/card-match", emoji: "🃏", labels: { ko: "카드 짝 맞추기", en: "Card Match", ja: "カードマッチ", zh: "卡片配对", de: "Karten-Memory", fr: "Memory", es: "Memoria", pt: "Memória" } },
      { path: "/cps", emoji: "🖱️", labels: { ko: "CPS 테스트", en: "CPS Test", ja: "CPSテスト", zh: "CPS测试", de: "CPS-Test", fr: "Test CPS", es: "Test CPS", pt: "Teste CPS" } },
      { path: "/typing", emoji: "⌨️", labels: { ko: "타자 테스트", en: "Typing Test", ja: "タイピングテスト", zh: "打字测试", de: "Tipptest", fr: "Test de frappe", es: "Test de tecleo", pt: "Teste de digitação" } },
      { path: "/aim", emoji: "🎯", labels: { ko: "에임 트레이너", en: "Aim Trainer", ja: "エイムトレーナー", zh: "瞄准训练", de: "Zieltrainer", fr: "Visée", es: "Entrenador de puntería", pt: "Treinador de mira" } },
      { path: "/memory", emoji: "🧠", labels: { ko: "숫자 기억 게임", en: "Memory Game", ja: "記憶ゲーム", zh: "记忆游戏", de: "Gedächtnisspiel", fr: "Jeu de mémoire", es: "Juego de memoria", pt: "Jogo de memória" } },
    ],
  },
  {
    names: { ko: "💰 금융 계산기", en: "💰 Finance", ja: "💰 金融計算機", zh: "💰 金融计算器", de: "💰 Finanzen", fr: "💰 Finance", es: "💰 Finanzas", pt: "💰 Finanças" },
    color: "emerald",
    tools: [
      { path: "/salary", emoji: "💵", labels: { ko: "연봉 계산기", en: "Salary Calculator", ja: "年収計算機", zh: "年薪计算器", de: "Gehaltsrechner", fr: "Calcul salaire", es: "Calculadora de salario", pt: "Calculadora de salário" }, best: true },
      { path: "/severance", emoji: "💼", labels: { ko: "퇴직금 계산기", en: "Severance Calculator", ja: "退職金計算機", zh: "离职金计算器", de: "Abfindungsrechner", fr: "Calcul indemnité", es: "Calculadora de finiquito", pt: "Calculadora de rescisão" } },
      { path: "/loan", emoji: "🏦", labels: { ko: "대출이자 계산기", en: "Loan Calculator", ja: "ローン計算機", zh: "贷款计算器", de: "Kreditrechner", fr: "Calcul prêt", es: "Calculadora de préstamo", pt: "Calculadora de empréstimo" } },
      { path: "/savings", emoji: "🏧", labels: { ko: "적금이자 계산기", en: "Savings Calculator", ja: "積立計算機", zh: "储蓄计算器", de: "Sparrechner", fr: "Calcul épargne", es: "Calculadora de ahorro", pt: "Calculadora de poupança" } },
    ],
  },
  {
    names: { ko: "🧮 생활 계산기", en: "🧮 Calculators", ja: "🧮 生活計算機", zh: "🧮 生活计算器", de: "🧮 Rechner", fr: "🧮 Calculateurs", es: "🧮 Calculadoras", pt: "🧮 Calculadoras" },
    color: "blue",
    tools: [
      { path: "/bmi", emoji: "⚖️", labels: { ko: "BMI 계산기", en: "BMI Calculator", ja: "BMI計算機", zh: "BMI计算器", de: "BMI-Rechner", fr: "Calcul IMC", es: "Calculadora BMI", pt: "Calculadora IMC" } },
      { path: "/dday", emoji: "📅", labels: { ko: "D-day 계산기", en: "D-Day Calculator", ja: "D-day計算機", zh: "D-day计算器", de: "D-Day Rechner", fr: "Calcul D-Day", es: "Calculadora D-Day", pt: "Calculadora D-Day" } },
      { path: "/age", emoji: "🎂", labels: { ko: "나이 계산기", en: "Age Calculator", ja: "年齢計算機", zh: "年龄计算器", de: "Altersrechner", fr: "Calcul âge", es: "Calculadora de edad", pt: "Calculadora de idade" } },
      { path: "/percent", emoji: "🔢", labels: { ko: "퍼센트 계산기", en: "Percent Calculator", ja: "パーセント計算機", zh: "百分比计算器", de: "Prozentrechner", fr: "Calcul pourcentage", es: "Calculadora de porcentaje", pt: "Calculadora de porcentagem" } },
    ],
  },
  {
    names: { ko: "🛠️ 유틸리티", en: "🛠️ Utilities", ja: "🛠️ ユーティリティ", zh: "🛠️ 工具", de: "🛠️ Werkzeuge", fr: "🛠️ Utilitaires", es: "🛠️ Utilidades", pt: "🛠️ Utilitários" },
    color: "cyan",
    tools: [
      { path: "/character-count", emoji: "✍️", labels: { ko: "글자수 세기", en: "Character Count", ja: "文字数カウント", zh: "字符计数", de: "Zeichenzähler", fr: "Compteur de caractères", es: "Contador de caracteres", pt: "Contador de caracteres" } },
      { path: "/qr", emoji: "📱", labels: { ko: "QR코드 생성기", en: "QR Generator", ja: "QRコード生成", zh: "QR码生成器", de: "QR-Generator", fr: "Générateur QR", es: "Generador QR", pt: "Gerador QR" } },
      { path: "/password", emoji: "🔐", labels: { ko: "비밀번호 생성기", en: "Password Generator", ja: "パスワード生成", zh: "密码生成器", de: "Passwort-Generator", fr: "Générateur mot de passe", es: "Generador de contraseñas", pt: "Gerador de senhas" } },
      { path: "/random", emoji: "🎲", labels: { ko: "랜덤 뽑기", en: "Random Picker", ja: "ランダム抽選", zh: "随机抽选", de: "Zufallsauswahl", fr: "Tirage au sort", es: "Selección aleatoria", pt: "Seleção aleatória" } },
      { path: "/lotto", emoji: "🎰", labels: { ko: "로또 번호 생성기", en: "Lotto Generator", ja: "ロト番号生成", zh: "彩票号码生成", de: "Lotto-Generator", fr: "Générateur loto", es: "Generador de lotería", pt: "Gerador de loteria" } },
    ],
  },
  {
    names: { ko: "🎭 심리 테스트", en: "🎭 Psychology", ja: "🎭 心理テスト", zh: "🎭 心理测试", de: "🎭 Psychologie", fr: "🎭 Psychologie", es: "🎭 Psicología", pt: "🎭 Psicologia" },
    color: "pink",
    tools: [
      { path: "/slox-test", emoji: "🐂", labels: { ko: "나와 닮은 황소", en: "Which Bull Are You?", ja: "あなたに似た牛", zh: "你像哪头牛", de: "Welcher Stier bist du?", fr: "Quel taureau êtes-vous?", es: "¿Qué toro eres?", pt: "Qual touro você é?" } },
      { path: "/fortune", emoji: "🔮", labels: { ko: "오늘의 운세", en: "Daily Fortune", ja: "今日の運勢", zh: "今日运势", de: "Tageshoroskop", fr: "Horoscope du jour", es: "Horóscopo del día", pt: "Horóscopo do dia" }, isNew: true },
      { path: "/quote", emoji: "💬", labels: { ko: "오늘의 명언", en: "Daily Quote", ja: "今日の名言", zh: "每日名言", de: "Zitat des Tages", fr: "Citation du jour", es: "Frase del día", pt: "Frase do dia" }, isNew: true },
    ],
  },
];

interface DesktopToolsDropdownProps {
  locale?: Locale;
}

export default function DesktopToolsDropdown({ locale = "ko" }: DesktopToolsDropdownProps) {
  const t = navTranslations[locale];
  const basePath = locale === "ko" ? "" : `/${locale}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 손가락 힌트 - 항상 표시 (호버 시 숨김, 삼성 인터넷 호환) */}
      {!isHovered && (
        <div className="absolute -top-6 -left-6 pointer-events-none z-50">
          <span className="animate-poke-finger text-2xl">
            👆
          </span>
        </div>
      )}

      {/* 도구 버튼 */}
      <button 
        className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-1 text-dark-300 hover:text-white hover:bg-white/[0.05]"
      >
        {t.tools}
        <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* 도구 개수 배지 */}
        <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-purple-300 font-medium">
          24
        </span>
      </button>

      {/* 드롭다운 - 넓은 버전 */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-dark-900/95 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {/* 화살표 */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-900/95 border-l border-t border-white/[0.08] rotate-45" />
        
        <div className="p-4 relative">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.05]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              🛠️ {locale === "ko" ? "무료 도구 모음" : locale === "ja" ? "無料ツール" : locale === "zh" ? "免费工具" : "Free Tools"}
            </h3>
            <span className="text-xs text-dark-500">{locale === "ko" ? "클릭하여 이용하세요" : locale === "ja" ? "クリックして利用" : locale === "zh" ? "点击使用" : "Click to use"}</span>
          </div>

          {/* 카테고리 그리드 */}
          <div className="grid grid-cols-2 gap-5">
            {toolCategories.map((category) => (
              <div key={category.names.ko} className={`${category.color === "pink" ? "col-span-2" : ""} pb-4 border-b border-white/[0.04] last:border-0 last:pb-0`}>
                {/* 카테고리 헤더 */}
                <h4 className={`text-xs font-semibold mb-2.5 flex items-center gap-1.5 ${
                  category.color === "purple" ? "text-purple-400" :
                  category.color === "emerald" ? "text-emerald-400" :
                  category.color === "blue" ? "text-blue-400" :
                  category.color === "cyan" ? "text-cyan-400" :
                  "text-pink-400"
                }`}>
                  {category.names[locale]}
                  <span className="text-dark-600 text-[10px] font-normal">({category.tools.length})</span>
                </h4>
                
                {/* 도구 리스트 */}
                <div className={`space-y-0.5 ${category.color === "pink" ? "flex gap-2" : ""}`}>
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      href={`${basePath}${tool.path}`}
                      className={`flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-lg transition-all whitespace-nowrap ${
                        tool.best 
                          ? "text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-medium" 
                          : tool.isNew 
                            ? "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-medium"
                            : "text-dark-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="text-base">{tool.emoji}</span>
                      <span className="text-xs">{tool.labels[locale]}</span>
                      {tool.best && (
                        <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-400">BEST</span>
                      )}
                      {tool.event && (
                        <span className="text-[9px] bg-gradient-to-r from-yellow-500/30 to-red-500/30 px-1.5 py-0.5 rounded text-yellow-400 animate-pulse">🎁 EVENT</span>
                      )}
                      {tool.isNew && (
                        <span className="text-[9px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-1.5 py-0.5 rounded text-pink-400 animate-pulse border border-pink-500/30">NEW</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 푸터 */}
          <div className="mt-4 pt-3 border-t border-white/[0.05] text-center">
            <p className="text-dark-500 text-xs">
              Powered by <span className="text-purple-400 font-medium">SLOX</span> · {locale === "ko" ? "모든 도구 무료 이용" : locale === "ja" ? "すべて無料" : locale === "zh" ? "全部免费" : "All Free"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

