"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

interface MemoryLeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  level: number;
  device_type: string;
  created_at: string;
}

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
    challenger: "챌린저",
    master: "마스터",
    diamond: "다이아몬드",
    platinum: "플래티넘",
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
    iron: "아이언",
    msgChallenger: "멘사 회원급 기억력!",
    msgMaster: "상위 1% 기억력!",
    msgDiamond: "최상위권 기억력!",
    msgPlatinum: "평균 이상의 기억력!",
    msgGold: "좋은 기억력이에요!",
    msgSilver: "일반적인 기억력",
    msgBronze: "조금 더 연습해봐요",
    msgIron: "연습이 필요해요!",
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
    challenger: "Challenger",
    master: "Master",
    diamond: "Diamond",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
    iron: "Iron",
    msgChallenger: "Mensa-level memory!",
    msgMaster: "Top 1% memory!",
    msgDiamond: "Elite memory skills!",
    msgPlatinum: "Above average memory!",
    msgGold: "Good memory!",
    msgSilver: "Average memory",
    msgBronze: "Keep practicing!",
    msgIron: "More practice needed!",
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
    challenger: "チャレンジャー",
    master: "マスター",
    diamond: "ダイヤモンド",
    platinum: "プラチナ",
    gold: "ゴールド",
    silver: "シルバー",
    bronze: "ブロンズ",
    iron: "アイアン",
    msgChallenger: "メンサ級の記憶力！",
    msgMaster: "上位1%の記憶力！",
    msgDiamond: "エリート記憶力！",
    msgPlatinum: "平均以上の記憶力！",
    msgGold: "良い記憶力！",
    msgSilver: "平均的な記憶力",
    msgBronze: "練習を続けて！",
    msgIron: "もっと練習が必要！",
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
    challenger: "挑战者",
    master: "大师",
    diamond: "钻石",
    platinum: "铂金",
    gold: "黄金",
    silver: "白银",
    bronze: "青铜",
    iron: "黑铁",
    msgChallenger: "门萨级记忆力！",
    msgMaster: "前1%记忆力！",
    msgDiamond: "精英记忆力！",
    msgPlatinum: "高于平均记忆力！",
    msgGold: "良好记忆力！",
    msgSilver: "平均记忆力",
    msgBronze: "继续练习！",
    msgIron: "需要更多练习！",
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
    challenger: "Aspirante",
    master: "Maestro",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
    iron: "Hierro",
    msgChallenger: "¡Memoria nivel Mensa!",
    msgMaster: "¡Top 1% de memoria!",
    msgDiamond: "¡Memoria de élite!",
    msgPlatinum: "¡Memoria superior!",
    msgGold: "¡Buena memoria!",
    msgSilver: "Memoria promedio",
    msgBronze: "¡Sigue practicando!",
    msgIron: "¡Necesitas más práctica!",
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
    challenger: "Desafiante",
    master: "Mestre",
    diamond: "Diamante",
    platinum: "Platina",
    gold: "Ouro",
    silver: "Prata",
    bronze: "Bronze",
    iron: "Ferro",
    msgChallenger: "Memória nível Mensa!",
    msgMaster: "Top 1% de memória!",
    msgDiamond: "Memória de elite!",
    msgPlatinum: "Memória acima da média!",
    msgGold: "Boa memória!",
    msgSilver: "Memória média",
    msgBronze: "Continue praticando!",
    msgIron: "Precisa de mais prática!",
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
    challenger: "Herausforderer",
    master: "Meister",
    diamond: "Diamant",
    platinum: "Platin",
    gold: "Gold",
    silver: "Silber",
    bronze: "Bronze",
    iron: "Eisen",
    msgChallenger: "Mensa-Level Gedächtnis!",
    msgMaster: "Top 1% Gedächtnis!",
    msgDiamond: "Elite Gedächtnis!",
    msgPlatinum: "Überdurchschnittliches Gedächtnis!",
    msgGold: "Gutes Gedächtnis!",
    msgSilver: "Durchschnittliches Gedächtnis",
    msgBronze: "Weiter üben!",
    msgIron: "Mehr Übung nötig!",
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
    challenger: "Challenger",
    master: "Maître",
    diamond: "Diamant",
    platinum: "Platine",
    gold: "Or",
    silver: "Argent",
    bronze: "Bronze",
    iron: "Fer",
    msgChallenger: "Mémoire niveau Mensa !",
    msgMaster: "Top 1% de mémoire !",
    msgDiamond: "Mémoire d'élite !",
    msgPlatinum: "Mémoire supérieure !",
    msgGold: "Bonne mémoire !",
    msgSilver: "Mémoire moyenne",
    msgBronze: "Continuez à pratiquer !",
    msgIron: "Plus de pratique nécessaire !",
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
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<MemoryLeaderboardEntry[]>([]);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("memory_leaderboard").select("*").order("score", { ascending: false }).limit(10);
      if (error) throw error;
      if (data) setLeaderboard(data);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("memory_leaderboard").insert({
        nickname: nickname.trim().slice(0, 20),
        score: bestLevel,
        level: bestLevel,
        device_type: isMobile ? "mobile" : "pc",
      });
      if (error) throw error;
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) {
      console.error("점수 등록 실패:", err);
      alert(lang === "ko" ? "등록 실패!" : "Failed!");
    } finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 등급 계산 (일반인 평균 7±2 자리)
  const getGrade = useCallback((lvl: number): { grade: string; color: string; emoji: string; message: string } => {
    if (lvl >= 13) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (lvl >= 11) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (lvl >= 9) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (lvl >= 7) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (lvl >= 6) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (lvl >= 5) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (lvl >= 4) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
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
    setHasSubmittedScore(false);
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

  // 이미지 생성
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    try {
      shareCardRef.current.style.display = "block";
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      shareCardRef.current.style.display = "none";
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } catch { if (shareCardRef.current) shareCardRef.current.style.display = "none"; return null; }
  };

  // 공유
  const shareResult = async () => {
    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const blob = await generateImage();
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `memory-${bestLevel}.png`, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: t.shareText, text: `${t.shareTestIt} ${shareUrl}` }); return; } catch { /* 취소 */ }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `memory-test-${bestLevel}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const saveAsImage = async () => {
    const blob = await generateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `memory-test-${bestLevel}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
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
                    <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{t.share}</button>
                    <button onClick={saveAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 이미지</button>
                    <button onClick={resetGame} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.tryAgain}</button>
                  </div>
                  {!hasSubmittedScore && level > 1 && (
                    <button onClick={() => setShowNicknameModal(true)} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                      🏆 {lang === "ko" ? "랭킹 등록!" : "Register!"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 🏆 리더보드 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> {lang === "ko" ? "기억력 랭킹" : "Memory Ranking"}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">🧠</div><p className="text-dark-400">{lang === "ko" ? "아직 기록이 없습니다!" : "No records yet!"}</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    <div className="flex-1"><span className="text-white font-medium">{entry.nickname}</span><span className="text-xs ml-2 text-dark-400">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span></div>
                    <div className="text-white font-bold">{entry.score} {t.digits}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>🧠 숫자 기억 게임</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{getGrade(bestLevel).emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: bestLevel >= 12 ? "#67e8f9" : bestLevel >= 9 ? "#c084fc" : "#60a5fa" }}>{getGrade(bestLevel).grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{bestLevel}<span style={{ fontSize: "18px", color: "#7c3aed" }}> {t.digits}</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>{getGrade(bestLevel).message}</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}><div style={{ color: "#67e8f9", fontSize: "10px" }}>🏆 최고 레벨</div><div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{bestLevel}</div></div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/memory")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}><span>{new Date().toLocaleDateString("ko-KR")}</span><span style={{ color: "#8b5cf6" }}>slox.co.kr/memory</span></div>
          </div>

          {/* 닉네임 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(level).emoji}</div><h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3><p className="text-dark-400 text-sm">{bestLevel} {t.digits}</p></div>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">취소</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : "등록!"}</button>
                </div>
              </div>
            </div>
          )}

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
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">{t.averageNote}</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">13+ {t.digits}</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">11~12 {t.digits}</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">9~10 {t.digits}</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">7~8 {t.digits}</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">6 {t.digits}</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">5 {t.digits}</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">4 {t.digits}</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">1~3 {t.digits}</span>
              </div>
            </div>
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

