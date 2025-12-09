"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

interface ColorLeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  level: number;
  device_type: string;
  created_at: string;
}

type GameState = "waiting" | "playing" | "wrong" | "result";
type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations = {
  ko: {
    title: "색상 찾기",
    titleHighlight: " 게임",
    subtitle: "다른 색상 하나를 찾아보세요!",
    badge: "👁️ 색각 테스트",
    clickToStart: "클릭하여 시작",
    ready: "준비되셨나요?",
    level: "레벨",
    score: "점수",
    findDifferent: "다른 색을 찾으세요!",
    correct: "정답!",
    wrong: "틀렸습니다!",
    gameOver: "게임 오버",
    finalScore: "최종 점수",
    bestScore: "최고 점수",
    tryAgain: "다시 도전",
    share: "📤 공유하기",
    tierTable: "👁️ 색각 등급표",
    otherTools: "🔗 다른 도구",
    reactionTest: "⚡ 반응속도 테스트",
    memoryTest: "🧠 숫자 기억 게임",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    slogan: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    adArea: "광고 영역 (Google AdSense)",
    shareText: "👁️ 색상 찾기 게임 결과!",
    shareTestIt: "나도 테스트하기 👉",
    copied: "결과가 클립보드에 복사되었습니다!",
    challenger: "챌린저",
    master: "마스터",
    diamond: "다이아몬드",
    platinum: "플래티넘",
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
    iron: "아이언",
    msgChallenger: "완벽한 색각! 디자이너급!",
    msgMaster: "뛰어난 색 구별 능력!",
    msgDiamond: "최상위권 색각!",
    msgPlatinum: "평균 이상의 색각!",
    msgGold: "좋은 색각이에요!",
    msgSilver: "일반적인 색각",
    msgBronze: "조금 더 연습해봐요",
    msgIron: "연습이 필요해요!",
    tipTitle: "색상 구별 팁",
    tipContent: "화면 중앙에 시선을 고정하고, 주변시를 활용해보세요. 밝기 차이에 주목하면 더 쉽게 찾을 수 있습니다!",
    whatIsColor: "색각 테스트란?",
    colorDescription: "색각 테스트는 미세한 색상 차이를 구별하는 능력을 측정합니다. 디자이너, 화가, 조종사 등 정확한 색 구별이 필요한 직업에서 중요합니다!",
  },
  en: {
    title: "Find the",
    titleHighlight: " Different Color",
    subtitle: "Find the one tile that's a different color!",
    badge: "👁️ Color Vision Test",
    clickToStart: "Click to Start",
    ready: "Are you ready?",
    level: "Level",
    score: "Score",
    findDifferent: "Find the different color!",
    correct: "Correct!",
    wrong: "Wrong!",
    gameOver: "Game Over",
    finalScore: "Final Score",
    bestScore: "Best Score",
    tryAgain: "Try Again",
    share: "📤 Share",
    tierTable: "👁️ Color Vision Tiers",
    otherTools: "🔗 Other Tools",
    reactionTest: "⚡ Reaction Test",
    memoryTest: "🧠 Memory Game",
    backToMain: "← Home",
    poweredBy: "Powered by",
    slogan: "Web · App · AI Chatbot Development",
    adArea: "Ad Space (Google AdSense)",
    shareText: "👁️ Color Vision Test Result!",
    shareTestIt: "Try it yourself 👉",
    copied: "Result copied to clipboard!",
    challenger: "Challenger",
    master: "Master",
    diamond: "Diamond",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
    iron: "Iron",
    msgChallenger: "Perfect color vision! Designer level!",
    msgMaster: "Excellent color discrimination!",
    msgDiamond: "Elite color vision!",
    msgPlatinum: "Above average color vision!",
    msgGold: "Good color vision!",
    msgSilver: "Normal color vision",
    msgBronze: "Keep practicing!",
    msgIron: "More practice needed!",
    tipTitle: "Color Differentiation Tips",
    tipContent: "Focus your gaze on the center of the screen and use peripheral vision. Paying attention to brightness differences makes it easier to find!",
    whatIsColor: "What is Color Vision Test?",
    colorDescription: "The color vision test measures your ability to distinguish subtle color differences. It's important for professions like designers, painters, and pilots that require accurate color discrimination!",
  },
  ja: {
    title: "色探し",
    titleHighlight: " ゲーム",
    subtitle: "違う色を一つ見つけてください！",
    badge: "👁️ 色覚テスト",
    clickToStart: "クリックしてスタート",
    ready: "準備はいいですか？",
    level: "レベル",
    score: "スコア",
    findDifferent: "違う色を見つけて！",
    correct: "正解！",
    wrong: "不正解！",
    gameOver: "ゲームオーバー",
    finalScore: "最終スコア",
    bestScore: "ベストスコア",
    tryAgain: "再挑戦",
    share: "📤 共有",
    tierTable: "👁️ 色覚ランク表",
    otherTools: "🔗 他のツール",
    reactionTest: "⚡ 反応速度テスト",
    memoryTest: "🧠 数字記憶ゲーム",
    backToMain: "← ホームへ",
    poweredBy: "Powered by",
    slogan: "ウェブ・アプリ・AIチャットボット開発",
    adArea: "広告エリア",
    shareText: "👁️ 色探しゲーム結果！",
    shareTestIt: "あなたも挑戦 👉",
    copied: "結果がコピーされました！",
    challenger: "チャレンジャー",
    master: "マスター",
    diamond: "ダイヤモンド",
    platinum: "プラチナ",
    gold: "ゴールド",
    silver: "シルバー",
    bronze: "ブロンズ",
    iron: "アイアン",
    msgChallenger: "完璧な色覚！デザイナー級！",
    msgMaster: "優れた色識別能力！",
    msgDiamond: "エリート色覚！",
    msgPlatinum: "平均以上の色覚！",
    msgGold: "良い色覚！",
    msgSilver: "一般的な色覚",
    msgBronze: "練習を続けて！",
    msgIron: "もっと練習が必要！",
    tipTitle: "色の区別のコツ",
    tipContent: "画面の中心に視線を固定し、周辺視野を活用してください。明るさの違いに注目すると見つけやすくなります！",
    whatIsColor: "色覚テストとは？",
    colorDescription: "色覚テストは微細な色の違いを区別する能力を測定します。デザイナー、画家、パイロットなど正確な色の区別が必要な職業で重要です！",
  },
  zh: {
    title: "找不同",
    titleHighlight: " 颜色",
    subtitle: "找出不同颜色的方块！",
    badge: "👁️ 色觉测试",
    clickToStart: "点击开始",
    ready: "准备好了吗？",
    level: "等级",
    score: "分数",
    findDifferent: "找出不同的颜色！",
    correct: "正确！",
    wrong: "错误！",
    gameOver: "游戏结束",
    finalScore: "最终分数",
    bestScore: "最高分",
    tryAgain: "再试一次",
    share: "📤 分享",
    tierTable: "👁️ 色觉等级表",
    otherTools: "🔗 其他工具",
    reactionTest: "⚡ 反应速度测试",
    memoryTest: "🧠 数字记忆游戏",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    slogan: "网站·应用·AI聊天机器人开发",
    adArea: "广告区域",
    shareText: "👁️ 找不同颜色结果！",
    shareTestIt: "你也来试试 👉",
    copied: "结果已复制！",
    challenger: "挑战者",
    master: "大师",
    diamond: "钻石",
    platinum: "铂金",
    gold: "黄金",
    silver: "白银",
    bronze: "青铜",
    iron: "黑铁",
    msgChallenger: "完美色觉！设计师级别！",
    msgMaster: "出色的颜色辨别能力！",
    msgDiamond: "精英色觉！",
    msgPlatinum: "高于平均的色觉！",
    msgGold: "良好色觉！",
    msgSilver: "正常色觉",
    msgBronze: "继续练习！",
    msgIron: "需要更多练习！",
    tipTitle: "颜色区分技巧",
    tipContent: "将视线固定在屏幕中央，利用周边视野。注意亮度差异可以更容易找到！",
    whatIsColor: "什么是色觉测试？",
    colorDescription: "色觉测试测量你区分细微颜色差异的能力。对于设计师、画家、飞行员等需要准确色彩辨别的职业很重要！",
  },
  es: {
    title: "Encuentra el",
    titleHighlight: " Color Diferente",
    subtitle: "¡Encuentra el cuadro de color diferente!",
    badge: "👁️ Test de Visión de Color",
    clickToStart: "Clic para Empezar",
    ready: "¿Estás listo?",
    level: "Nivel",
    score: "Puntos",
    findDifferent: "¡Encuentra el color diferente!",
    correct: "¡Correcto!",
    wrong: "¡Incorrecto!",
    gameOver: "Fin del Juego",
    finalScore: "Puntuación Final",
    bestScore: "Mejor Puntuación",
    tryAgain: "Intentar de Nuevo",
    share: "📤 Compartir",
    tierTable: "👁️ Tabla de Rangos",
    otherTools: "🔗 Otras Herramientas",
    reactionTest: "⚡ Test de Reacción",
    memoryTest: "🧠 Juego de Memoria",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    slogan: "Desarrollo Web · Apps · Chatbots IA",
    adArea: "Espacio Publicitario",
    shareText: "👁️ ¡Resultado del Test de Color!",
    shareTestIt: "¡Pruébalo tú también! 👉",
    copied: "¡Resultado copiado!",
    challenger: "Aspirante",
    master: "Maestro",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
    iron: "Hierro",
    msgChallenger: "¡Visión de color perfecta!",
    msgMaster: "¡Excelente discriminación de color!",
    msgDiamond: "¡Visión de élite!",
    msgPlatinum: "¡Visión superior al promedio!",
    msgGold: "¡Buena visión de color!",
    msgSilver: "Visión de color normal",
    msgBronze: "¡Sigue practicando!",
    msgIron: "¡Necesitas más práctica!",
    tipTitle: "Consejos para distinguir colores",
    tipContent: "Fija la mirada en el centro de la pantalla y usa la visión periférica. ¡Prestar atención a las diferencias de brillo facilita encontrarlo!",
    whatIsColor: "¿Qué es el test de visión de colores?",
    colorDescription: "El test de visión de colores mide tu capacidad para distinguir diferencias sutiles de color. ¡Es importante para profesiones como diseñadores, pintores y pilotos que requieren discriminación precisa del color!",
  },
  pt: {
    title: "Encontre a",
    titleHighlight: " Cor Diferente",
    subtitle: "Encontre o quadrado de cor diferente!",
    badge: "👁️ Teste de Visão de Cores",
    clickToStart: "Clique para Começar",
    ready: "Você está pronto?",
    level: "Nível",
    score: "Pontos",
    findDifferent: "Encontre a cor diferente!",
    correct: "Correto!",
    wrong: "Errado!",
    gameOver: "Fim de Jogo",
    finalScore: "Pontuação Final",
    bestScore: "Melhor Pontuação",
    tryAgain: "Tentar Novamente",
    share: "📤 Compartilhar",
    tierTable: "👁️ Tabela de Ranks",
    otherTools: "🔗 Outras Ferramentas",
    reactionTest: "⚡ Teste de Reação",
    memoryTest: "🧠 Jogo de Memória",
    backToMain: "← Início",
    poweredBy: "Powered by",
    slogan: "Desenvolvimento Web · Apps · Chatbots IA",
    adArea: "Espaço Publicitário",
    shareText: "👁️ Resultado do Teste de Cores!",
    shareTestIt: "Experimente você também! 👉",
    copied: "Resultado copiado!",
    challenger: "Desafiante",
    master: "Mestre",
    diamond: "Diamante",
    platinum: "Platina",
    gold: "Ouro",
    silver: "Prata",
    bronze: "Bronze",
    iron: "Ferro",
    msgChallenger: "Visão de cores perfeita!",
    msgMaster: "Excelente discriminação de cores!",
    msgDiamond: "Visão de elite!",
    msgPlatinum: "Visão acima da média!",
    msgGold: "Boa visão de cores!",
    msgSilver: "Visão de cores normal",
    msgBronze: "Continue praticando!",
    msgIron: "Precisa de mais prática!",
    tipTitle: "Dicas para distinguir cores",
    tipContent: "Fixe o olhar no centro da tela e use a visão periférica. Prestar atenção às diferenças de brilho facilita encontrar!",
    whatIsColor: "O que é o teste de visão de cores?",
    colorDescription: "O teste de visão de cores mede sua capacidade de distinguir diferenças sutis de cor. É importante para profissões como designers, pintores e pilotos que requerem discriminação precisa de cores!",
  },
  de: {
    title: "Finde die",
    titleHighlight: " andere Farbe",
    subtitle: "Finde das Kästchen mit der anderen Farbe!",
    badge: "👁️ Farbsehtest",
    clickToStart: "Klicken zum Starten",
    ready: "Bist du bereit?",
    level: "Level",
    score: "Punkte",
    findDifferent: "Finde die andere Farbe!",
    correct: "Richtig!",
    wrong: "Falsch!",
    gameOver: "Spiel vorbei",
    finalScore: "Endpunktzahl",
    bestScore: "Bestpunktzahl",
    tryAgain: "Nochmal Versuchen",
    share: "📤 Teilen",
    tierTable: "👁️ Farbsehen Rang-Tabelle",
    otherTools: "🔗 Andere Tools",
    reactionTest: "⚡ Reaktionstest",
    memoryTest: "🧠 Gedächtnisspiel",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    slogan: "Web · App · KI-Chatbot Entwicklung",
    adArea: "Werbefläche",
    shareText: "👁️ Farbsehtest Ergebnis!",
    shareTestIt: "Probiere es selbst! 👉",
    copied: "Ergebnis kopiert!",
    challenger: "Herausforderer",
    master: "Meister",
    diamond: "Diamant",
    platinum: "Platin",
    gold: "Gold",
    silver: "Silber",
    bronze: "Bronze",
    iron: "Eisen",
    msgChallenger: "Perfektes Farbsehen!",
    msgMaster: "Ausgezeichnete Farbunterscheidung!",
    msgDiamond: "Elite Farbsehen!",
    msgPlatinum: "Überdurchschnittliches Farbsehen!",
    msgGold: "Gutes Farbsehen!",
    msgSilver: "Normales Farbsehen",
    msgBronze: "Weiter üben!",
    msgIron: "Mehr Übung nötig!",
    tipTitle: "Tipps zur Farbunterscheidung",
    tipContent: "Fixiere den Blick auf die Bildschirmmitte und nutze das periphere Sehen. Auf Helligkeitsunterschiede zu achten macht es einfacher zu finden!",
    whatIsColor: "Was ist ein Farbsehentest?",
    colorDescription: "Der Farbsehentest misst deine Fähigkeit, subtile Farbunterschiede zu unterscheiden. Wichtig für Berufe wie Designer, Maler und Piloten, die genaue Farbunterscheidung erfordern!",
  },
  fr: {
    title: "Trouvez la",
    titleHighlight: " Couleur Différente",
    subtitle: "Trouvez le carré de couleur différente !",
    badge: "👁️ Test de Vision des Couleurs",
    clickToStart: "Cliquez pour Commencer",
    ready: "Êtes-vous prêt ?",
    level: "Niveau",
    score: "Score",
    findDifferent: "Trouvez la couleur différente !",
    correct: "Correct !",
    wrong: "Faux !",
    gameOver: "Fin du Jeu",
    finalScore: "Score Final",
    bestScore: "Meilleur Score",
    tryAgain: "Réessayer",
    share: "📤 Partager",
    tierTable: "👁️ Tableau des Rangs",
    otherTools: "🔗 Autres Outils",
    reactionTest: "⚡ Test de Réaction",
    memoryTest: "🧠 Jeu de Mémoire",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    slogan: "Développement Web · Apps · Chatbots IA",
    adArea: "Espace Publicitaire",
    shareText: "👁️ Résultat du Test de Couleurs !",
    shareTestIt: "Essayez vous aussi ! 👉",
    copied: "Résultat copié !",
    challenger: "Challenger",
    master: "Maître",
    diamond: "Diamant",
    platinum: "Platine",
    gold: "Or",
    silver: "Argent",
    bronze: "Bronze",
    iron: "Fer",
    msgChallenger: "Vision des couleurs parfaite !",
    msgMaster: "Excellente discrimination des couleurs !",
    msgDiamond: "Vision d'élite !",
    msgPlatinum: "Vision supérieure à la moyenne !",
    msgGold: "Bonne vision des couleurs !",
    msgSilver: "Vision des couleurs normale",
    msgBronze: "Continuez à pratiquer !",
    msgIron: "Plus de pratique nécessaire !",
    tipTitle: "Conseils pour distinguer les couleurs",
    tipContent: "Fixez le regard au centre de l'écran et utilisez la vision périphérique. Faire attention aux différences de luminosité facilite la recherche !",
    whatIsColor: "Qu'est-ce que le test de vision des couleurs ?",
    colorDescription: "Le test de vision des couleurs mesure votre capacité à distinguer les différences subtiles de couleur. Important pour les métiers comme designers, peintres et pilotes qui nécessitent une discrimination précise des couleurs !",
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
  ko: "/color", en: "/en/color", ja: "/ja/color", zh: "/zh/color",
  es: "/es/color", pt: "/pt/color", de: "/de/color", fr: "/fr/color",
};

interface ColorTestProps {
  initialLang: Language;
}

export default function ColorTest({ initialLang }: ColorTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridSize, setGridSize] = useState(2);
  const [baseColor, setBaseColor] = useState({ h: 0, s: 70, l: 50 });
  const [differentIndex, setDifferentIndex] = useState(0);
  const [colorDiff, setColorDiff] = useState(30);
  const [lang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ColorLeaderboardEntry[]>([]);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => { setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window); }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("color_leaderboard").select("*").order("score", { ascending: false }).limit(10);
      if (error) throw error;
      if (data) setLeaderboard(data);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("color_leaderboard").insert({ nickname: nickname.trim().slice(0, 20), score, level, device_type: isMobile ? "mobile" : "pc" });
      if (error) throw error;
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) { console.error("등록 실패:", err); alert("등록 실패!"); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 등급 계산
  const getGrade = useCallback((lvl: number): { grade: string; color: string; emoji: string; message: string } => {
    if (lvl >= 35) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (lvl >= 28) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (lvl >= 20) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (lvl >= 14) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (lvl >= 9) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (lvl >= 5) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (lvl >= 3) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  }, [t]);

  // 새 라운드 생성
  const generateRound = useCallback((lvl: number) => {
    // 그리드 크기: 레벨에 따라 증가 (2x2 → 3x3 → 4x4 → 5x5 → 6x6)
    const size = Math.min(2 + Math.floor(lvl / 5), 6);
    setGridSize(size);

    // 색상 차이: 레벨 올라갈수록 감소
    const diff = Math.max(3, 30 - lvl * 1.5);
    setColorDiff(diff);

    // 랜덤 기본 색상
    const h = Math.floor(Math.random() * 360);
    const s = 50 + Math.floor(Math.random() * 30);
    const l = 40 + Math.floor(Math.random() * 20);
    setBaseColor({ h, s, l });

    // 다른 색상 위치
    const totalTiles = size * size;
    setDifferentIndex(Math.floor(Math.random() * totalTiles));
  }, []);

  // 게임 시작
  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setHasSubmittedScore(false);
    generateRound(1);
    setState("playing");
    setShowCorrect(false);
  }, [generateRound]);

  // 타일 클릭
  const handleTileClick = useCallback((index: number) => {
    if (state !== "playing") return;

    if (index === differentIndex) {
      // 정답
      const newScore = score + level * 10;
      setScore(newScore);
      setShowCorrect(true);
      
      setTimeout(() => {
        const newLevel = level + 1;
        setLevel(newLevel);
        generateRound(newLevel);
        setShowCorrect(false);
      }, 300);
    } else {
      // 오답 - 게임 오버
      if (score > bestScore) {
        setBestScore(score);
      }
      setState("result");
    }
  }, [state, differentIndex, score, level, bestScore, generateRound]);

  // HSL to CSS
  const hslToString = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`;

  // 타일 색상 가져오기
  const getTileColor = (index: number) => {
    if (index === differentIndex) {
      // 다른 색상 (밝기 차이)
      const newL = baseColor.l + colorDiff > 100 ? baseColor.l - colorDiff : baseColor.l + colorDiff;
      return hslToString(baseColor.h, baseColor.s, newL);
    }
    return hslToString(baseColor.h, baseColor.s, baseColor.l);
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

  const shareResult = async () => {
    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const blob = await generateImage();
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `color-${score}.png`, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: t.shareText, text: `${t.shareTestIt} ${shareUrl}` }); return; } catch { /* 취소 */ } }
    }
    if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.download = `color-test-${score}.png`; link.href = url; link.click(); URL.revokeObjectURL(url); }
  };

  const saveAsImage = async () => {
    const blob = await generateImage();
    if (blob) { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.download = `color-test-${score}.png`; link.href = url; link.click(); URL.revokeObjectURL(url); }
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

          {/* 점수 표시 */}
          {state !== "waiting" && (
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <span className="text-dark-400 text-sm">{t.level}</span>
                <p className="text-2xl font-bold text-white">{level}</p>
              </div>
              <div className="text-center">
                <span className="text-dark-400 text-sm">{t.score}</span>
                <p className="text-2xl font-bold text-accent-purple">{score}</p>
              </div>
            </div>
          )}

          {/* 💡 색상 인지 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👁️</span>
              <div>
                <p className="text-white font-medium mb-1">{t.tipTitle}</p>
                <p className="text-dark-400 text-sm">{t.tipContent}</p>
              </div>
            </div>
          </div>

          {/* 게임 영역 */}
          <div className="bg-dark-900 rounded-2xl p-6 mb-8" style={{ minHeight: "400px" }}>
            {state === "waiting" && (
              <div 
                className="flex flex-col items-center justify-center h-full min-h-[350px] cursor-pointer"
                onClick={startGame}
              >
                <p className="text-6xl mb-4">👁️</p>
                <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                <p className="text-dark-400">{t.clickToStart}</p>
              </div>
            )}

            {state === "playing" && (
              <div className="flex flex-col items-center">
                <p className="text-dark-400 mb-4">{t.findDifferent}</p>
                {showCorrect && (
                  <p className="text-green-400 font-bold mb-2 animate-pulse">{t.correct} +{level * 10}</p>
                )}
                <div 
                  className="grid gap-2 mx-auto"
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    width: `min(100%, ${gridSize * 70}px)`
                  }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleTileClick(index)}
                      className="aspect-square rounded-lg transition-transform hover:scale-105 active:scale-95"
                      style={{ 
                        backgroundColor: getTileColor(index),
                        minWidth: "40px",
                        minHeight: "40px"
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {state === "result" && (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px]">
                <p className="text-5xl mb-4">{getGrade(level).emoji}</p>
                <p className="text-2xl font-bold text-white mb-2">{t.gameOver}</p>
                <p className={`text-xl font-bold ${getGrade(level).color} mb-2`}>{getGrade(level).grade}</p>
                <p className="text-dark-400 mb-1">{t.finalScore}: <span className="text-white font-bold">{score}</span></p>
                <p className="text-dark-400 mb-1">{t.level}: <span className="text-white">{level}</span></p>
                <p className="text-dark-500 text-sm mb-6">{getGrade(level).message}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{t.share}</button>
                  <button onClick={saveAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 이미지</button>
                  <button onClick={startGame} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.tryAgain}</button>
                </div>
                {!hasSubmittedScore && score > 0 && (
                  <button onClick={() => setShowNicknameModal(true)} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">🏆 랭킹 등록!</button>
                )}
              </div>
            )}
          </div>

          {/* 🏆 리더보드 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> 색상 찾기 랭킹</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">👁️</div><p className="text-dark-400">아직 기록이 없습니다!</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    <div className="flex-1"><span className="text-white font-medium">{entry.nickname}</span><span className="text-xs ml-2 text-dark-400">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span></div>
                    <div className="text-right"><div className="text-white font-bold">{entry.score}점</div><div className="text-xs text-dark-400">Lv.{entry.level}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>👁️ 색상 찾기 게임</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{getGrade(level).emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: level >= 30 ? "#67e8f9" : level >= 20 ? "#c084fc" : "#60a5fa" }}>{getGrade(level).grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{score}<span style={{ fontSize: "18px", color: "#7c3aed" }}> 점</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>레벨 {level}</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}><div style={{ color: "#67e8f9", fontSize: "10px" }}>🏆 최고 점수</div><div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{bestScore}</div></div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/color")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}><span>{new Date().toLocaleDateString("ko-KR")}</span><span style={{ color: "#8b5cf6" }}>slox.co.kr/color</span></div>
          </div>

          {/* 닉네임 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(level).emoji}</div><h3 className="text-white text-xl font-bold">🏆 랭킹 등록</h3><p className="text-dark-400 text-sm">{score}점 (Lv.{level})</p></div>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder="닉네임..." className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">취소</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : "등록!"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 🎨 색각 테스트 정보 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🌈</span> {t.whatIsColor}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              {t.colorDescription}
            </p>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">💡 레벨이 높을수록 색상 차이가 미세해집니다</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">Lv.35+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">Lv.28+</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">Lv.20+</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">Lv.14+</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">Lv.9+</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">Lv.5+</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">Lv.3+</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">Lv.1+</span>
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
                href={lang === "ko" ? "/memory" : `/${lang}/memory`}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.memoryTest}
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

