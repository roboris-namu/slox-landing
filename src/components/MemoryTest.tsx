"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";

type GameState = "waiting" | "showing" | "input" | "correct" | "wrong" | "result";
type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations = {
  ko: {
    title: "숫자 기억",
    titleHighlight: " 게임",
    subtitle: "화면에 나타나는 숫자를 기억하고 입력하세요!",
    badge: "🧠 기억력 테스트",
    clickToStart: "클릭하여 시작",
    ready: "준비되셨나요?",
    remember: "숫자를 기억하세요!",
    enterNumber: "숫자를 입력하세요",
    correct: "정답! 🎉",
    wrong: "틀렸습니다! 😢",
    level: "레벨",
    yourAnswer: "당신의 답",
    correctAnswer: "정답",
    bestLevel: "최고 레벨",
    tryAgain: "다시 도전",
    share: "📤 공유하기",
    tierTable: "🧠 기억력 등급표",
    otherTools: "🔗 다른 도구",
    reactionTest: "⚡ 반응속도 테스트",
    aimTest: "🎯 에임 트레이너",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    slogan: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    adArea: "광고 영역 (Google AdSense)",
    shareText: "🧠 숫자 기억 게임 결과!",
    shareTestIt: "나도 테스트하기 👉",
    copied: "결과가 클립보드에 복사되었습니다!",
    nextLevel: "다음 레벨로!",
    genius: "천재",
    excellent: "뛰어남",
    good: "우수",
    average: "평균",
    beginner: "초보",
    msgGenius: "멘사 회원급 기억력!",
    msgExcellent: "상위 1% 기억력!",
    msgGood: "평균 이상의 기억력!",
    msgAverage: "일반적인 기억력",
    msgBeginner: "연습이 필요해요!",
    digits: "자리",
    tipTitle: "기억력 향상 팁",
    tipContent: "숫자를 묶어서 기억해보세요. 예: 1234567890을 123-456-7890으로 나누면 더 쉽게 기억할 수 있어요!",
    whatIsMemory: "숫자 기억력이란?",
    memoryDescription: "평균적인 사람은 7±2개의 항목을 기억할 수 있습니다(밀러의 법칙). 훈련을 통해 12자리 이상까지 향상시킬 수 있습니다!",
    averageNote: "💡 일반인 평균: 7±2자리 (밀러의 법칙)",
  },
  en: {
    title: "Number",
    titleHighlight: " Memory",
    subtitle: "Remember the numbers shown and type them!",
    badge: "🧠 Memory Test",
    clickToStart: "Click to Start",
    ready: "Are you ready?",
    remember: "Remember the numbers!",
    enterNumber: "Enter the numbers",
    correct: "Correct! 🎉",
    wrong: "Wrong! 😢",
    level: "Level",
    yourAnswer: "Your Answer",
    correctAnswer: "Correct Answer",
    bestLevel: "Best Level",
    tryAgain: "Try Again",
    share: "📤 Share",
    tierTable: "🧠 Memory Tier Chart",
    otherTools: "🔗 Other Tools",
    reactionTest: "⚡ Reaction Test",
    aimTest: "🎯 Aim Trainer",
    backToMain: "← Home",
    poweredBy: "Powered by",
    slogan: "Web · App · AI Chatbot Development",
    adArea: "Ad Space (Google AdSense)",
    shareText: "🧠 Number Memory Result!",
    shareTestIt: "Try it yourself 👉",
    copied: "Result copied to clipboard!",
    nextLevel: "Next Level!",
    genius: "Genius",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    beginner: "Beginner",
    msgGenius: "Mensa-level memory!",
    msgExcellent: "Top 1% memory!",
    msgGood: "Above average memory!",
    msgAverage: "Average memory",
    msgBeginner: "Keep practicing!",
    digits: "digits",
    tipTitle: "Memory Improvement Tips",
    tipContent: "Try chunking numbers. For example: remembering 1234567890 as 123-456-7890 makes it easier!",
    whatIsMemory: "What is Number Memory?",
    memoryDescription: "The average person can remember 7±2 items (Miller's Law). Through training, you can improve to 12+ digits!",
    averageNote: "💡 Average: 7±2 digits (Miller's Law)",
  },
  ja: {
    title: "数字記憶",
    titleHighlight: " ゲーム",
    subtitle: "画面に表示される数字を覚えて入力してください！",
    badge: "🧠 記憶力テスト",
    clickToStart: "クリックしてスタート",
    ready: "準備はいいですか？",
    remember: "数字を覚えてください！",
    enterNumber: "数字を入力してください",
    correct: "正解！🎉",
    wrong: "不正解！😢",
    level: "レベル",
    yourAnswer: "あなたの答え",
    correctAnswer: "正解",
    bestLevel: "最高レベル",
    tryAgain: "再挑戦",
    share: "📤 共有",
    tierTable: "🧠 記憶力ランク表",
    otherTools: "🔗 他のツール",
    reactionTest: "⚡ 反応速度テスト",
    aimTest: "🎯 エイムトレーナー",
    backToMain: "← ホームへ",
    poweredBy: "Powered by",
    slogan: "ウェブ・アプリ・AIチャットボット開発",
    adArea: "広告エリア (Google AdSense)",
    shareText: "🧠 数字記憶ゲーム結果！",
    shareTestIt: "あなたも挑戦 👉",
    copied: "結果がクリップボードにコピーされました！",
    nextLevel: "次のレベルへ！",
    genius: "天才",
    excellent: "優秀",
    good: "良い",
    average: "平均",
    beginner: "初心者",
    msgGenius: "メンサ級の記憶力！",
    msgExcellent: "上位1%の記憶力！",
    msgGood: "平均以上の記憶力！",
    msgAverage: "平均的な記憶力",
    msgBeginner: "練習が必要！",
    digits: "桁",
    tipTitle: "記憶力向上のコツ",
    tipContent: "数字をまとめて覚えてみてください。例：1234567890を123-456-7890として覚えると簡単です！",
    whatIsMemory: "数字記憶力とは？",
    memoryDescription: "平均的な人は7±2個の項目を記憶できます（ミラーの法則）。トレーニングで12桁以上に向上させることができます！",
    averageNote: "💡 平均：7±2桁（ミラーの法則）",
  },
  zh: {
    title: "数字记忆",
    titleHighlight: " 游戏",
    subtitle: "记住屏幕上显示的数字并输入！",
    badge: "🧠 记忆力测试",
    clickToStart: "点击开始",
    ready: "准备好了吗？",
    remember: "记住这些数字！",
    enterNumber: "输入数字",
    correct: "正确！🎉",
    wrong: "错误！😢",
    level: "等级",
    yourAnswer: "你的答案",
    correctAnswer: "正确答案",
    bestLevel: "最高等级",
    tryAgain: "再试一次",
    share: "📤 分享",
    tierTable: "🧠 记忆力等级表",
    otherTools: "🔗 其他工具",
    reactionTest: "⚡ 反应速度测试",
    aimTest: "🎯 瞄准训练",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    slogan: "网站·应用·AI聊天机器人开发",
    adArea: "广告区域 (Google AdSense)",
    shareText: "🧠 数字记忆游戏结果！",
    shareTestIt: "你也来试试 👉",
    copied: "结果已复制到剪贴板！",
    nextLevel: "下一关！",
    genius: "天才",
    excellent: "优秀",
    good: "良好",
    average: "平均",
    beginner: "初学者",
    msgGenius: "门萨级记忆力！",
    msgExcellent: "前1%记忆力！",
    msgGood: "高于平均记忆力！",
    msgAverage: "平均记忆力",
    msgBeginner: "需要练习！",
    digits: "位",
    tipTitle: "记忆力提升技巧",
    tipContent: "尝试分组记忆数字。例如：把1234567890记成123-456-7890会更容易！",
    whatIsMemory: "什么是数字记忆力？",
    memoryDescription: "普通人可以记住7±2个项目（米勒法则）。通过训练，可以提高到12位以上！",
    averageNote: "💡 平均：7±2位（米勒法则）",
  },
  es: {
    title: "Memoria de",
    titleHighlight: " Números",
    subtitle: "¡Recuerda los números mostrados y escríbelos!",
    badge: "🧠 Test de Memoria",
    clickToStart: "Clic para Empezar",
    ready: "¿Estás listo?",
    remember: "¡Recuerda los números!",
    enterNumber: "Ingresa los números",
    correct: "¡Correcto! 🎉",
    wrong: "¡Incorrecto! 😢",
    level: "Nivel",
    yourAnswer: "Tu Respuesta",
    correctAnswer: "Respuesta Correcta",
    bestLevel: "Mejor Nivel",
    tryAgain: "Intentar de Nuevo",
    share: "📤 Compartir",
    tierTable: "🧠 Tabla de Rangos",
    otherTools: "🔗 Otras Herramientas",
    reactionTest: "⚡ Test de Reacción",
    aimTest: "🎯 Entrenador de Puntería",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    slogan: "Desarrollo Web · Apps · Chatbots IA",
    adArea: "Espacio Publicitario",
    shareText: "🧠 ¡Resultado del Juego de Memoria!",
    shareTestIt: "¡Pruébalo tú también! 👉",
    copied: "¡Resultado copiado!",
    nextLevel: "¡Siguiente Nivel!",
    genius: "Genio",
    excellent: "Excelente",
    good: "Bueno",
    average: "Promedio",
    beginner: "Principiante",
    msgGenius: "¡Memoria nivel Mensa!",
    msgExcellent: "¡Top 1% de memoria!",
    msgGood: "¡Memoria superior!",
    msgAverage: "Memoria promedio",
    msgBeginner: "¡Sigue practicando!",
    digits: "dígitos",
    tipTitle: "Consejos para mejorar la memoria",
    tipContent: "Intenta agrupar números. Por ejemplo: recordar 1234567890 como 123-456-7890 es más fácil!",
    whatIsMemory: "¿Qué es la memoria numérica?",
    memoryDescription: "La persona promedio puede recordar 7±2 elementos (Ley de Miller). ¡Con entrenamiento puedes mejorar a 12+ dígitos!",
    averageNote: "💡 Promedio: 7±2 dígitos (Ley de Miller)",
  },
  pt: {
    title: "Memória de",
    titleHighlight: " Números",
    subtitle: "Lembre os números mostrados e digite-os!",
    badge: "🧠 Teste de Memória",
    clickToStart: "Clique para Começar",
    ready: "Você está pronto?",
    remember: "Lembre os números!",
    enterNumber: "Digite os números",
    correct: "Correto! 🎉",
    wrong: "Errado! 😢",
    level: "Nível",
    yourAnswer: "Sua Resposta",
    correctAnswer: "Resposta Correta",
    bestLevel: "Melhor Nível",
    tryAgain: "Tentar Novamente",
    share: "📤 Compartilhar",
    tierTable: "🧠 Tabela de Ranks",
    otherTools: "🔗 Outras Ferramentas",
    reactionTest: "⚡ Teste de Reação",
    aimTest: "🎯 Treinador de Mira",
    backToMain: "← Início",
    poweredBy: "Powered by",
    slogan: "Desenvolvimento Web · Apps · Chatbots IA",
    adArea: "Espaço Publicitário",
    shareText: "🧠 Resultado do Jogo de Memória!",
    shareTestIt: "Experimente você também! 👉",
    copied: "Resultado copiado!",
    nextLevel: "Próximo Nível!",
    genius: "Gênio",
    excellent: "Excelente",
    good: "Bom",
    average: "Médio",
    beginner: "Iniciante",
    msgGenius: "Memória nível Mensa!",
    msgExcellent: "Top 1% de memória!",
    msgGood: "Memória acima da média!",
    msgAverage: "Memória média",
    msgBeginner: "Continue praticando!",
    digits: "dígitos",
    tipTitle: "Dicas para melhorar a memória",
    tipContent: "Tente agrupar números. Por exemplo: lembrar 1234567890 como 123-456-7890 é mais fácil!",
    whatIsMemory: "O que é memória numérica?",
    memoryDescription: "A pessoa média pode lembrar 7±2 itens (Lei de Miller). Com treinamento, você pode melhorar para 12+ dígitos!",
    averageNote: "💡 Média: 7±2 dígitos (Lei de Miller)",
  },
  de: {
    title: "Zahlen",
    titleHighlight: " Gedächtnis",
    subtitle: "Merke dir die Zahlen und gib sie ein!",
    badge: "🧠 Gedächtnistest",
    clickToStart: "Klicken zum Starten",
    ready: "Bist du bereit?",
    remember: "Merke dir die Zahlen!",
    enterNumber: "Gib die Zahlen ein",
    correct: "Richtig! 🎉",
    wrong: "Falsch! 😢",
    level: "Level",
    yourAnswer: "Deine Antwort",
    correctAnswer: "Richtige Antwort",
    bestLevel: "Bestes Level",
    tryAgain: "Nochmal Versuchen",
    share: "📤 Teilen",
    tierTable: "🧠 Gedächtnis Rang-Tabelle",
    otherTools: "🔗 Andere Tools",
    reactionTest: "⚡ Reaktionstest",
    aimTest: "🎯 Aim Trainer",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    slogan: "Web · App · KI-Chatbot Entwicklung",
    adArea: "Werbefläche",
    shareText: "🧠 Zahlen-Gedächtnis Ergebnis!",
    shareTestIt: "Probiere es selbst! 👉",
    copied: "Ergebnis kopiert!",
    nextLevel: "Nächstes Level!",
    genius: "Genie",
    excellent: "Ausgezeichnet",
    good: "Gut",
    average: "Durchschnitt",
    beginner: "Anfänger",
    msgGenius: "Mensa-Level Gedächtnis!",
    msgExcellent: "Top 1% Gedächtnis!",
    msgGood: "Überdurchschnittliches Gedächtnis!",
    msgAverage: "Durchschnittliches Gedächtnis",
    msgBeginner: "Weiter üben!",
    digits: "Ziffern",
    tipTitle: "Tipps zur Gedächtnisverbesserung",
    tipContent: "Versuche Zahlen zu gruppieren. Beispiel: 1234567890 als 123-456-7890 zu merken ist einfacher!",
    whatIsMemory: "Was ist Zahlengedächtnis?",
    memoryDescription: "Der Durchschnittsmensch kann sich 7±2 Elemente merken (Millersche Zahl). Durch Training kannst du auf 12+ Ziffern verbessern!",
    averageNote: "💡 Durchschnitt: 7±2 Ziffern (Millersche Zahl)",
  },
  fr: {
    title: "Mémoire des",
    titleHighlight: " Nombres",
    subtitle: "Mémorisez les chiffres affichés et tapez-les !",
    badge: "🧠 Test de Mémoire",
    clickToStart: "Cliquez pour Commencer",
    ready: "Êtes-vous prêt ?",
    remember: "Mémorisez les chiffres !",
    enterNumber: "Entrez les chiffres",
    correct: "Correct ! 🎉",
    wrong: "Faux ! 😢",
    level: "Niveau",
    yourAnswer: "Votre Réponse",
    correctAnswer: "Bonne Réponse",
    bestLevel: "Meilleur Niveau",
    tryAgain: "Réessayer",
    share: "📤 Partager",
    tierTable: "🧠 Tableau des Rangs",
    otherTools: "🔗 Autres Outils",
    reactionTest: "⚡ Test de Réaction",
    aimTest: "🎯 Entraîneur de Visée",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    slogan: "Développement Web · Apps · Chatbots IA",
    adArea: "Espace Publicitaire",
    shareText: "🧠 Résultat du Jeu de Mémoire !",
    shareTestIt: "Essayez vous aussi ! 👉",
    copied: "Résultat copié !",
    nextLevel: "Niveau Suivant !",
    genius: "Génie",
    excellent: "Excellent",
    good: "Bon",
    average: "Moyen",
    beginner: "Débutant",
    msgGenius: "Mémoire niveau Mensa !",
    msgExcellent: "Top 1% de mémoire !",
    msgGood: "Mémoire supérieure !",
    msgAverage: "Mémoire moyenne",
    msgBeginner: "Continuez à pratiquer !",
    digits: "chiffres",
    tipTitle: "Conseils pour améliorer la mémoire",
    tipContent: "Essayez de regrouper les nombres. Par exemple: retenir 1234567890 comme 123-456-7890 est plus facile !",
    whatIsMemory: "Qu'est-ce que la mémoire numérique ?",
    memoryDescription: "La personne moyenne peut retenir 7±2 éléments (Loi de Miller). Avec l'entraînement, vous pouvez améliorer à 12+ chiffres !",
    averageNote: "💡 Moyenne : 7±2 chiffres (Loi de Miller)",
  },
};

const langFlags: Record<Language, string> = {
  ko: "🇰🇷", en: "🇺🇸", ja: "🇯🇵", zh: "🇨🇳",
  es: "🇪🇸", pt: "🇧🇷", de: "🇩🇪", fr: "🇫🇷",
};

const langNames: Record<Language, string> = {
  ko: "한국어", en: "English", ja: "日本語", zh: "中文",
  es: "Español", pt: "Português", de: "Deutsch", fr: "Français",
};

const langUrls: Record<Language, string> = {
  ko: "/memory", en: "/en/memory", ja: "/ja/memory", zh: "/zh/memory",
  es: "/es/memory", pt: "/pt/memory", de: "/de/memory", fr: "/fr/memory",
};

interface MemoryTestProps {
  initialLang: Language;
}

export default function MemoryTest({ initialLang }: MemoryTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState("");
  const [userInput, setUserInput] = useState("");
  const [bestLevel, setBestLevel] = useState(1);
  const [lang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  // 등급 계산 (일반인 평균 7±2 자리)
  const getGrade = useCallback((lvl: number): { grade: string; color: string; emoji: string; message: string } => {
    if (lvl >= 12) return { grade: t.genius, color: "text-cyan-300", emoji: "🧠", message: t.msgGenius };
    if (lvl >= 9) return { grade: t.excellent, color: "text-purple-400", emoji: "⭐", message: t.msgExcellent };
    if (lvl >= 7) return { grade: t.good, color: "text-blue-400", emoji: "👍", message: t.msgGood };
    if (lvl >= 5) return { grade: t.average, color: "text-yellow-400", emoji: "👌", message: t.msgAverage };
    return { grade: t.beginner, color: "text-orange-400", emoji: "🌱", message: t.msgBeginner };
  }, [t]);

  // 새 숫자 생성
  const generateNumbers = useCallback((lvl: number) => {
    let nums = "";
    for (let i = 0; i < lvl; i++) {
      nums += Math.floor(Math.random() * 10).toString();
    }
    return nums;
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    setLevel(1);
    setUserInput("");
    const nums = generateNumbers(1);
    setNumbers(nums);
    setState("showing");

    // 숫자 보여주는 시간 (레벨에 따라 증가)
    setTimeout(() => {
      setState("input");
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1000 + 500); // 1.5초
  }, [generateNumbers]);

  // 다음 레벨
  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setUserInput("");
    const nums = generateNumbers(newLevel);
    setNumbers(nums);
    setState("showing");

    // 숫자 보여주는 시간 (레벨에 따라 증가, 최대 5초)
    const showTime = Math.min(1000 + newLevel * 300, 5000);
    setTimeout(() => {
      setState("input");
      setTimeout(() => inputRef.current?.focus(), 100);
    }, showTime);
  }, [level, generateNumbers]);

  // 답 제출
  const submitAnswer = useCallback(() => {
    if (userInput === numbers) {
      setState("correct");
      if (level >= bestLevel) {
        setBestLevel(level + 1);
      }
    } else {
      setState("wrong");
      if (level > bestLevel) {
        setBestLevel(level);
      }
    }
  }, [userInput, numbers, level, bestLevel]);

  // 키보드 엔터
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && state === "input" && userInput.length > 0) {
      submitAnswer();
    }
  };

  // 리셋
  const resetGame = () => {
    setState("waiting");
    setLevel(1);
    setNumbers("");
    setUserInput("");
  };

  // 공유
  const shareResult = async () => {
    const grade = getGrade(bestLevel);
    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const shareText = `${t.shareText}

${grade.emoji} ${grade.grade}
📊 ${t.bestLevel}: ${bestLevel} ${t.digits}
${grade.message}

${t.shareTestIt}`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch { /* 취소 */ }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert(t.copied);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors"
                >
                  <span>{langFlags[lang]}</span>
                  <span className="text-dark-300 hidden sm:inline">{langNames[lang]}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden">
                    {(Object.keys(langFlags) as Language[]).map((l) => (
                      <Link
                        key={l}
                        href={langUrls[l]}
                        onClick={() => setShowLangMenu(false)}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          lang === l ? "bg-dark-700 text-white" : "text-dark-300"
                        }`}
                      >
                        <span>{langFlags[l]}</span>
                        <span>{langNames[l]}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                {t.backToMain}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{t.titleHighlight}</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* 레벨 표시 */}
          {state !== "waiting" && (
            <div className="text-center mb-4">
              <span className="text-dark-400">{t.level}</span>
              <span className="text-3xl font-bold text-white ml-2">{level}</span>
              <span className="text-dark-500 ml-2">({level} {t.digits})</span>
            </div>
          )}

          {/* 💡 기억력 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🧠</span>
              <div>
                <p className="text-white font-medium mb-1">{t.tipTitle}</p>
                <p className="text-dark-400 text-sm">{t.tipContent}</p>
              </div>
            </div>
          </div>

          {/* 게임 영역 */}
          <div
            className="bg-dark-900 rounded-2xl select-none mb-8"
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8">
              {state === "waiting" && (
                <div className="text-center cursor-pointer" onClick={startGame}>
                  <p className="text-6xl mb-4">🧠</p>
                  <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                  <p className="text-dark-400">{t.clickToStart}</p>
                </div>
              )}

              {state === "showing" && (
                <div className="text-center">
                  <p className="text-dark-400 mb-4">{t.remember}</p>
                  <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-widest">
                    {numbers}
                  </p>
                </div>
              )}

              {state === "input" && (
                <div className="text-center w-full max-w-md">
                  <p className="text-dark-400 mb-4">{t.enterNumber}</p>
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={handleKeyDown}
                    className="w-full text-center text-4xl sm:text-5xl font-bold bg-dark-800 border-2 border-dark-700 focus:border-accent-purple rounded-xl py-4 px-6 text-white tracking-widest outline-none"
                    autoFocus
                  />
                  <button
                    onClick={submitAnswer}
                    disabled={userInput.length === 0}
                    className="mt-4 px-8 py-3 bg-accent-purple hover:bg-accent-purple/80 disabled:bg-dark-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
                  >
                    확인
                  </button>
                </div>
              )}

              {state === "correct" && (
                <div className="text-center">
                  <p className="text-6xl mb-4">🎉</p>
                  <p className="text-2xl font-bold text-green-400 mb-4">{t.correct}</p>
                  <button
                    onClick={nextLevel}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all"
                  >
                    {t.nextLevel}
                  </button>
                </div>
              )}

              {state === "wrong" && (
                <div className="text-center">
                  <p className="text-6xl mb-4">😢</p>
                  <p className="text-2xl font-bold text-red-400 mb-2">{t.wrong}</p>
                  <p className="text-dark-400 mb-1">{t.yourAnswer}: <span className="text-white">{userInput}</span></p>
                  <p className="text-dark-400 mb-4">{t.correctAnswer}: <span className="text-green-400">{numbers}</span></p>
                  
                  <div className="mt-6">
                    <p className="text-5xl mb-2">{getGrade(level).emoji}</p>
                    <p className={`text-xl font-bold ${getGrade(level).color}`}>{getGrade(level).grade}</p>
                    <p className="text-dark-400 text-sm">{getGrade(level).message}</p>
                    <p className="text-dark-500 mt-2">{t.bestLevel}: {bestLevel} {t.digits}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      onClick={shareResult}
                      className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all"
                    >
                      {t.share}
                    </button>
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
                    >
                      {t.tryAgain}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 🧩 작업 기억력이란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>💭</span> {t.whatIsMemory}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              {t.memoryDescription}
            </p>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-6 text-center">{t.tierTable}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-center">
                <span className="text-cyan-300 font-bold">🧠 12+ {t.digits}</span>
                <p className="text-dark-400 text-xs mt-1">{t.genius}</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg text-center">
                <span className="text-purple-400 font-bold">⭐ 9-11 {t.digits}</span>
                <p className="text-dark-400 text-xs mt-1">{t.excellent}</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg text-center">
                <span className="text-blue-400 font-bold">👍 7-8 {t.digits}</span>
                <p className="text-dark-400 text-xs mt-1">{t.good}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-center">
                <span className="text-yellow-400 font-bold">👌 5-6 {t.digits}</span>
                <p className="text-dark-400 text-xs mt-1">{t.average}</p>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg text-center">
                <span className="text-orange-400 font-bold">🌱 1-4 {t.digits}</span>
                <p className="text-dark-400 text-xs mt-1">{t.beginner}</p>
              </div>
            </div>
            <p className="text-dark-500 text-xs mt-4 text-center">
              {t.averageNote}
            </p>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">{t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href={lang === "ko" ? "/reaction" : `/${lang}/reaction`}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.reactionTest}
              </Link>
              <Link
                href={lang === "ko" ? "/aim" : `/${lang}/aim`}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.aimTest}
              </Link>
            </div>
          </div>

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">{t.poweredBy}</p>
            <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-accent-purple to-accent-cyan rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium">SLOX</span>
            </Link>
            <p className="text-dark-500 text-xs mt-2">{t.slogan}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

