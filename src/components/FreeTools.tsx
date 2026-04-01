"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const gameBase = [
  { href: "/reaction", emoji: "⚡", accent: "amber" },
  { href: "/cps", emoji: "🖱️", accent: "blue" },
  { href: "/typing", emoji: "⌨️", accent: "purple" },
  { href: "/quiz", emoji: "📚", accent: "green" },
  { href: "/iq", emoji: "🧩", accent: "pink" },
  { href: "/sudoku", emoji: "🔢", accent: "cyan" },
  { href: "/color", emoji: "🎨", accent: "violet" },
  { href: "/card-match", emoji: "🃏", accent: "rose" },
  { href: "/aim", emoji: "🎯", accent: "red" },
  { href: "/memory", emoji: "🧠", accent: "indigo" },
  { href: "/mbti-test", emoji: "🧬", accent: "orange" },
  { href: "/mbti-match", emoji: "💕", accent: "fuchsia" },
  { href: "/animal-scan", emoji: "🐾", accent: "emerald" },
  { href: "/dream", emoji: "🌙", accent: "yellow" },
];

const toolBase = [
  { href: "/salary", emoji: "💰", koOnly: true },
  { href: "/bmi", emoji: "⚖️" },
  { href: "/qr", emoji: "📱" },
  { href: "/password", emoji: "🔐" },
  { href: "/random", emoji: "🎲" },
  { href: "/fortune", emoji: "🔮", koOnly: true },
  { href: "/dday", emoji: "📅" },
  { href: "/character-count", emoji: "✍️" },
  { href: "/age", emoji: "🎂" },
  { href: "/percent", emoji: "📊" },
  { href: "/lotto", emoji: "🎰", koOnly: true },
  { href: "/quote", emoji: "💬", koOnly: true },
  { href: "/severance", emoji: "💼", koOnly: true },
  { href: "/savings", emoji: "🏧", koOnly: true },
];

type GameText = { title: string; desc: string };
type ToolText = { title: string };

const gameTexts: Record<string, GameText[]> = {
  ko: [
    { title: "반응속도 테스트", desc: "당신의 반응속도는?" },
    { title: "CPS 테스트", desc: "초당 클릭 수" },
    { title: "타이핑 테스트", desc: "분당 타자 수" },
    { title: "상식 퀴즈", desc: "당신의 상식은?" },
    { title: "IQ 테스트", desc: "패턴 분석 능력" },
    { title: "스도쿠", desc: "숫자 퍼즐" },
    { title: "색깔 찾기", desc: "다른 색을 찾아라" },
    { title: "카드 맞추기", desc: "카드 기억력 게임" },
    { title: "에임 트레이너", desc: "정확도 훈련" },
    { title: "기억력 테스트", desc: "숫자 기억력" },
    { title: "MBTI 테스트", desc: "나의 성격 유형은?" },
    { title: "MBTI 궁합", desc: "우리의 궁합 점수" },
    { title: "동물 분석", desc: "나와 닮은 동물은?" },
    { title: "꿈해몽", desc: "꿈의 의미 해석" },
  ],
  en: [
    { title: "Reaction Test", desc: "How fast are you?" },
    { title: "CPS Test", desc: "Clicks per second" },
    { title: "Typing Test", desc: "Words per minute" },
    { title: "Trivia Quiz", desc: "Test your knowledge" },
    { title: "IQ Test", desc: "Pattern analysis" },
    { title: "Sudoku", desc: "Number puzzle" },
    { title: "Color Finder", desc: "Find the odd one" },
    { title: "Card Match", desc: "Memory game" },
    { title: "Aim Trainer", desc: "Precision training" },
    { title: "Memory Test", desc: "Number memory" },
    { title: "MBTI Test", desc: "What's your type?" },
    { title: "MBTI Match", desc: "Compatibility score" },
    { title: "Animal Scan", desc: "Which animal are you?" },
    { title: "Dream Reading", desc: "Interpret your dreams" },
  ],
  ja: [
    { title: "反応速度テスト", desc: "あなたの反応速度は?" },
    { title: "CPSテスト", desc: "1秒のクリック数" },
    { title: "タイピングテスト", desc: "1分の入力速度" },
    { title: "雑学クイズ", desc: "知識を試そう" },
    { title: "IQテスト", desc: "パターン分析" },
    { title: "数独", desc: "数字パズル" },
    { title: "カラーファインダー", desc: "違う色を探せ" },
    { title: "カードマッチ", desc: "記憶力ゲーム" },
    { title: "エイムトレーナー", desc: "精度トレーニング" },
    { title: "記憶力テスト", desc: "数字記憶" },
    { title: "MBTI診断", desc: "あなたの性格タイプは?" },
    { title: "MBTI相性", desc: "相性スコア" },
    { title: "動物診断", desc: "似ている動物は?" },
    { title: "夢占い", desc: "夢の意味を解読" },
  ],
  zh: [
    { title: "反应速度测试", desc: "你的反应有多快?" },
    { title: "CPS测试", desc: "每秒点击次数" },
    { title: "打字测试", desc: "每分钟打字速度" },
    { title: "知识问答", desc: "测试你的知识" },
    { title: "IQ测试", desc: "图形分析" },
    { title: "数独", desc: "数字谜题" },
    { title: "找颜色", desc: "找出不同的颜色" },
    { title: "卡片配对", desc: "记忆力游戏" },
    { title: "瞄准训练", desc: "精准度训练" },
    { title: "记忆力测试", desc: "数字记忆" },
    { title: "MBTI测试", desc: "你的性格类型?" },
    { title: "MBTI配对", desc: "兼容度评分" },
    { title: "动物分析", desc: "你像哪种动物?" },
    { title: "解梦", desc: "解读梦的含义" },
  ],
  de: [
    { title: "Reaktionstest", desc: "Wie schnell bist du?" },
    { title: "CPS-Test", desc: "Klicks pro Sekunde" },
    { title: "Tipptest", desc: "Wörter pro Minute" },
    { title: "Quiz", desc: "Teste dein Wissen" },
    { title: "IQ-Test", desc: "Musteranalyse" },
    { title: "Sudoku", desc: "Zahlenrätsel" },
    { title: "Farbfinder", desc: "Finde die Abweichung" },
    { title: "Kartenspiel", desc: "Gedächtnisspiel" },
    { title: "Zieltrainer", desc: "Präzisionstraining" },
    { title: "Gedächtnistest", desc: "Zahlengedächtnis" },
    { title: "MBTI-Test", desc: "Welcher Typ bist du?" },
    { title: "MBTI-Match", desc: "Kompatibilitätswert" },
    { title: "Tier-Analyse", desc: "Welches Tier bist du?" },
    { title: "Traumdeutung", desc: "Deine Träume deuten" },
  ],
  fr: [
    { title: "Test de Réaction", desc: "Quelle est votre vitesse ?" },
    { title: "Test CPS", desc: "Clics par seconde" },
    { title: "Test de Frappe", desc: "Mots par minute" },
    { title: "Quiz", desc: "Testez vos connaissances" },
    { title: "Test de QI", desc: "Analyse de motifs" },
    { title: "Sudoku", desc: "Puzzle de chiffres" },
    { title: "Cherche-Couleur", desc: "Trouvez l'intrus" },
    { title: "Memory", desc: "Jeu de mémoire" },
    { title: "Entraînement Visée", desc: "Entraînement de précision" },
    { title: "Test de Mémoire", desc: "Mémoire des chiffres" },
    { title: "Test MBTI", desc: "Quel est votre type ?" },
    { title: "Match MBTI", desc: "Score de compatibilité" },
    { title: "Animal Spirit", desc: "Quel animal êtes-vous ?" },
    { title: "Interprétation", desc: "Interpréter vos rêves" },
  ],
  es: [
    { title: "Test de Reacción", desc: "¿Qué tan rápido eres?" },
    { title: "Test CPS", desc: "Clics por segundo" },
    { title: "Test de Escritura", desc: "Palabras por minuto" },
    { title: "Quiz", desc: "Pon a prueba tu conocimiento" },
    { title: "Test de IQ", desc: "Análisis de patrones" },
    { title: "Sudoku", desc: "Rompecabezas numérico" },
    { title: "Buscacolor", desc: "Encuentra el diferente" },
    { title: "Memoria", desc: "Juego de memoria" },
    { title: "Puntería", desc: "Entrenamiento de precisión" },
    { title: "Test de Memoria", desc: "Memoria numérica" },
    { title: "Test MBTI", desc: "¿Cuál es tu tipo?" },
    { title: "Match MBTI", desc: "Puntuación de compatibilidad" },
    { title: "Animal Spirit", desc: "¿Qué animal eres?" },
    { title: "Sueños", desc: "Interpreta tus sueños" },
  ],
  pt: [
    { title: "Teste de Reação", desc: "Quão rápido você é?" },
    { title: "Teste CPS", desc: "Cliques por segundo" },
    { title: "Teste de Digitação", desc: "Palavras por minuto" },
    { title: "Quiz", desc: "Teste seus conhecimentos" },
    { title: "Teste de QI", desc: "Análise de padrões" },
    { title: "Sudoku", desc: "Quebra-cabeça numérico" },
    { title: "Caça-Cores", desc: "Encontre a diferente" },
    { title: "Memória", desc: "Jogo de memória" },
    { title: "Mira", desc: "Treinamento de precisão" },
    { title: "Teste de Memória", desc: "Memória numérica" },
    { title: "Teste MBTI", desc: "Qual é o seu tipo?" },
    { title: "Match MBTI", desc: "Pontuação de compatibilidade" },
    { title: "Animal Spirit", desc: "Qual animal você é?" },
    { title: "Sonhos", desc: "Interprete seus sonhos" },
  ],
};

const toolTexts: Record<string, ToolText[]> = {
  ko: [
    { title: "연봉 계산기" }, { title: "BMI 계산기" }, { title: "QR 생성기" },
    { title: "비밀번호 생성" }, { title: "랜덤 뽑기" }, { title: "오늘의 운세" },
    { title: "디데이 계산기" }, { title: "글자수 세기" }, { title: "나이 계산기" },
    { title: "퍼센트 계산" }, { title: "로또 번호 생성" }, { title: "오늘의 명언" },
    { title: "퇴직금 계산" }, { title: "적금 계산기" },
  ],
  en: [
    { title: "Salary Calculator" }, { title: "BMI Calculator" }, { title: "QR Generator" },
    { title: "Password Gen" }, { title: "Random Picker" }, { title: "Daily Fortune" },
    { title: "D-Day Calculator" }, { title: "Char Counter" }, { title: "Age Calculator" },
    { title: "Percent Calc" }, { title: "Lotto Generator" }, { title: "Daily Quote" },
    { title: "Severance Calc" }, { title: "Savings Calc" },
  ],
  ja: [
    { title: "年収計算機" }, { title: "BMI計算機" }, { title: "QR生成" },
    { title: "パスワード生成" }, { title: "ランダム抽選" }, { title: "今日の運勢" },
    { title: "D-Day計算" }, { title: "文字数カウント" }, { title: "年齢計算" },
    { title: "パーセント計算" }, { title: "ロト番号生成" }, { title: "今日の名言" },
    { title: "退職金計算" }, { title: "積立計算機" },
  ],
  zh: [
    { title: "薪资计算器" }, { title: "BMI计算器" }, { title: "QR生成器" },
    { title: "密码生成" }, { title: "随机抽选" }, { title: "今日运势" },
    { title: "D-Day计算" }, { title: "字数统计" }, { title: "年龄计算" },
    { title: "百分比计算" }, { title: "彩票号码" }, { title: "每日名言" },
    { title: "遣散费计算" }, { title: "储蓄计算器" },
  ],
  de: [
    { title: "Gehaltsrechner" }, { title: "BMI-Rechner" }, { title: "QR-Generator" },
    { title: "Passwort-Gen." }, { title: "Zufallsauswahl" }, { title: "Tageshoroskop" },
    { title: "D-Day-Rechner" }, { title: "Zeichenzähler" }, { title: "Altersrechner" },
    { title: "Prozentrechner" }, { title: "Lotto-Generator" }, { title: "Tageszitat" },
    { title: "Abfindungsrechner" }, { title: "Sparrechner" },
  ],
  fr: [
    { title: "Calcul Salaire" }, { title: "Calcul IMC" }, { title: "Générateur QR" },
    { title: "Générateur MDP" }, { title: "Tirage Aléatoire" }, { title: "Horoscope" },
    { title: "Calcul D-Day" }, { title: "Compteur Caract." }, { title: "Calcul Âge" },
    { title: "Calcul Pourcent" }, { title: "Générateur Loto" }, { title: "Citation du Jour" },
    { title: "Calcul Indemnité" }, { title: "Calcul Épargne" },
  ],
  es: [
    { title: "Calc. Salario" }, { title: "Calc. IMC" }, { title: "Generador QR" },
    { title: "Generador Clave" }, { title: "Sorteo Aleatorio" }, { title: "Horóscopo" },
    { title: "Calc. D-Day" }, { title: "Contador Caract." }, { title: "Calc. Edad" },
    { title: "Calc. Porcentaje" }, { title: "Generador Loto" }, { title: "Cita del Día" },
    { title: "Calc. Indemniz." }, { title: "Calc. Ahorro" },
  ],
  pt: [
    { title: "Calc. Salário" }, { title: "Calc. IMC" }, { title: "Gerador QR" },
    { title: "Gerador Senha" }, { title: "Sorteio Aleatório" }, { title: "Horóscopo" },
    { title: "Calc. D-Day" }, { title: "Contador Caract." }, { title: "Calc. Idade" },
    { title: "Calc. Percentual" }, { title: "Gerador Loto" }, { title: "Citação do Dia" },
    { title: "Calc. Rescisão" }, { title: "Calc. Poupança" },
  ],
};

const sectionTexts: Record<string, { gamesTitle: string; gamesDesc: string; toolsTitle: string; toolsDesc: string }> = {
  ko: { gamesTitle: "게임", gamesDesc: "전 세계 유저와 경쟁하고 랭킹에 도전하세요.", toolsTitle: "도구", toolsDesc: "계산기, 생성기 등 — 모두 무료" },
  en: { gamesTitle: "Games", gamesDesc: "Compete with players worldwide. Climb the leaderboard.", toolsTitle: "Tools", toolsDesc: "Calculators, generators & more — all free." },
  ja: { gamesTitle: "ゲーム", gamesDesc: "世界中のプレイヤーと競い、ランキングに挑戦しよう。", toolsTitle: "ツール", toolsDesc: "計算機、生成ツールなど — すべて無料" },
  zh: { gamesTitle: "游戏", gamesDesc: "与全球玩家竞争，挑战排行榜。", toolsTitle: "工具", toolsDesc: "计算器、生成器等 — 全部免费" },
  de: { gamesTitle: "Spiele", gamesDesc: "Tritt gegen Spieler weltweit an. Erklimme die Rangliste.", toolsTitle: "Tools", toolsDesc: "Rechner, Generatoren & mehr — alles kostenlos." },
  fr: { gamesTitle: "Jeux", gamesDesc: "Affrontez des joueurs du monde entier. Grimpez au classement.", toolsTitle: "Outils", toolsDesc: "Calculateurs, générateurs et plus — tout est gratuit." },
  es: { gamesTitle: "Juegos", gamesDesc: "Compite con jugadores de todo el mundo. Sube en el ranking.", toolsTitle: "Herramientas", toolsDesc: "Calculadoras, generadores y más — todo gratis." },
  pt: { gamesTitle: "Jogos", gamesDesc: "Compita com jogadores do mundo todo. Suba no ranking.", toolsTitle: "Ferramentas", toolsDesc: "Calculadoras, geradores e mais — tudo grátis." },
};

const accentStyles: Record<string, string> = {
  amber: "hover:border-amber-500/30 hover:bg-amber-500/5",
  blue: "hover:border-blue-500/30 hover:bg-blue-500/5",
  purple: "hover:border-purple-500/30 hover:bg-purple-500/5",
  green: "hover:border-green-500/30 hover:bg-green-500/5",
  pink: "hover:border-pink-500/30 hover:bg-pink-500/5",
  cyan: "hover:border-cyan-500/30 hover:bg-cyan-500/5",
  violet: "hover:border-violet-500/30 hover:bg-violet-500/5",
  rose: "hover:border-rose-500/30 hover:bg-rose-500/5",
  red: "hover:border-red-500/30 hover:bg-red-500/5",
  indigo: "hover:border-indigo-500/30 hover:bg-indigo-500/5",
  orange: "hover:border-orange-500/30 hover:bg-orange-500/5",
  fuchsia: "hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5",
  emerald: "hover:border-emerald-500/30 hover:bg-emerald-500/5",
  yellow: "hover:border-yellow-500/30 hover:bg-yellow-500/5",
};

export default function FreeTools({ locale = "ko" }: { locale?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sec = sectionTexts[locale] || sectionTexts.en;
  const gTexts = gameTexts[locale] || gameTexts.en;
  const tTexts = toolTexts[locale] || toolTexts.en;
  const prefix = locale === "ko" ? "" : `/${locale}`;

  const filteredTools = toolBase
    .map((tool, i) => ({ ...tool, text: tTexts[i] }))
    .filter((tool) => locale === "ko" || !tool.koOnly);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-6">

        {/* Games */}
        <div id="games" className="mb-20 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-2">
              {sec.gamesTitle}
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              {sec.gamesDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {gameBase.map((game, i) => (
              <Link
                key={game.href}
                href={`${prefix}${game.href}`}
                className={`animate-on-scroll group relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 ${accentStyles[game.accent]}`}
                style={{ animationDelay: `${0.04 * i}s` }}
              >
                <span className="text-3xl block mb-3">{game.emoji}</span>
                <h3 className="font-semibold text-white text-sm mb-0.5">{gTexts[i].title}</h3>
                <p className="text-[11px] text-white/30">{gTexts[i].desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div id="tools" className="scroll-mt-24">
          <div className="text-center mb-8">
            <h2 className="animate-on-scroll text-2xl md:text-3xl font-bold text-white mb-2">
              {sec.toolsTitle}
            </h2>
            <p className="animate-on-scroll text-sm text-white/30" style={{ animationDelay: "0.05s" }}>
              {sec.toolsDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {filteredTools.map((tool, i) => (
              <Link
                key={tool.href}
                href={`${prefix}${tool.href}`}
                className="animate-on-scroll group flex items-center gap-2.5 px-3 py-3 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
                style={{ animationDelay: `${0.02 * i}s` }}
              >
                <span className="text-base flex-shrink-0">{tool.emoji}</span>
                <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors truncate">
                  {tool.text.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
