"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";

interface ColorLeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  level: number;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  country?: string;
  user_id?: string;
  avatar_url?: string;
  overall_rank?: number;
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
    tierNote: "💡 레벨이 높을수록 색상 차이가 미세해집니다",
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
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
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
    tierNote: "💡 Higher levels = more subtle color differences",
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
    noRecords: "No records yet. Be the first challenger!",
    currentFirst: "Current #1",
    myRecord: "My Record",
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
    tierNote: "💡 レベルが高いほど色の差が微細になります",
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
    noRecords: "まだ記録がありません。最初の挑戦者になりましょう！",
    currentFirst: "現在1位",
    myRecord: "私の記録",
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
    tierNote: "💡 等级越高，颜色差异越细微",
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
    noRecords: "还没有记录。成为第一个挑战者吧！",
    currentFirst: "当前第1名",
    myRecord: "我的记录",
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
    tierNote: "💡 Niveles más altos = diferencias de color más sutiles",
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
    noRecords: "Aún no hay registros. ¡Sé el primer retador!",
    currentFirst: "Actual #1",
    myRecord: "Mi Registro",
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
    tierNote: "💡 Níveis mais altos = diferenças de cor mais sutis",
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
    noRecords: "Ainda sem registros. Seja o primeiro desafiante!",
    currentFirst: "Atual #1",
    myRecord: "Meu Registro",
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
    tierNote: "💡 Höhere Level = subtilere Farbunterschiede",
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
    noRecords: "Noch keine Rekorde. Sei der erste Herausforderer!",
    currentFirst: "Aktueller #1",
    myRecord: "Mein Rekord",
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
    tierNote: "💡 Niveaux plus élevés = différences de couleur plus subtiles",
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
    noRecords: "Aucun record. Soyez le premier challenger !",
    currentFirst: "Actuel #1",
    myRecord: "Mon Record",
  },
};

type Locale = Language;
const languageOptions: { locale: Locale; flag: string; name: string; path: string }[] = [
  { locale: "ko", flag: "🇰🇷", name: "한국어", path: "/color" },
  { locale: "en", flag: "🇺🇸", name: "English", path: "/en/color" },
  { locale: "ja", flag: "🇯🇵", name: "日本語", path: "/ja/color" },
  { locale: "zh", flag: "🇨🇳", name: "中文", path: "/zh/color" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch", path: "/de/color" },
  { locale: "fr", flag: "🇫🇷", name: "Français", path: "/fr/color" },
  { locale: "es", flag: "🇪🇸", name: "Español", path: "/es/color" },
  { locale: "pt", flag: "🇧🇷", name: "Português", path: "/pt/color" },
];

// 국가 옵션
const COUNTRY_OPTIONS = [
  { code: "KR", flag: "🇰🇷", name: { ko: "한국", en: "Korea", ja: "韓国", zh: "韩国", de: "Korea", fr: "Corée", es: "Corea", pt: "Coreia" } },
  { code: "US", flag: "🇺🇸", name: { ko: "미국", en: "USA", ja: "アメリカ", zh: "美国", de: "USA", fr: "États-Unis", es: "EE.UU.", pt: "EUA" } },
  { code: "JP", flag: "🇯🇵", name: { ko: "일본", en: "Japan", ja: "日本", zh: "日本", de: "Japan", fr: "Japon", es: "Japón", pt: "Japão" } },
  { code: "CN", flag: "🇨🇳", name: { ko: "중국", en: "China", ja: "中国", zh: "中国", de: "China", fr: "Chine", es: "China", pt: "China" } },
  { code: "DE", flag: "🇩🇪", name: { ko: "독일", en: "Germany", ja: "ドイツ", zh: "德国", de: "Deutschland", fr: "Allemagne", es: "Alemania", pt: "Alemanha" } },
  { code: "FR", flag: "🇫🇷", name: { ko: "프랑스", en: "France", ja: "フランス", zh: "法国", de: "Frankreich", fr: "France", es: "Francia", pt: "França" } },
  { code: "ES", flag: "🇪🇸", name: { ko: "스페인", en: "Spain", ja: "スペイン", zh: "西班牙", de: "Spanien", fr: "Espagne", es: "España", pt: "Espanha" } },
  { code: "BR", flag: "🇧🇷", name: { ko: "브라질", en: "Brazil", ja: "ブラジル", zh: "巴西", de: "Brasilien", fr: "Brésil", es: "Brasil", pt: "Brasil" } },
  { code: "GB", flag: "🇬🇧", name: { ko: "영국", en: "UK", ja: "イギリス", zh: "英国", de: "Großbritannien", fr: "Royaume-Uni", es: "Reino Unido", pt: "Reino Unido" } },
  { code: "CA", flag: "🇨🇦", name: { ko: "캐나다", en: "Canada", ja: "カナダ", zh: "加拿大", de: "Kanada", fr: "Canada", es: "Canadá", pt: "Canadá" } },
  { code: "AU", flag: "🇦🇺", name: { ko: "호주", en: "Australia", ja: "オーストラリア", zh: "澳大利亚", de: "Australien", fr: "Australie", es: "Australia", pt: "Austrália" } },
  { code: "IN", flag: "🇮🇳", name: { ko: "인도", en: "India", ja: "インド", zh: "印度", de: "Indien", fr: "Inde", es: "India", pt: "Índia" } },
  { code: "RU", flag: "🇷🇺", name: { ko: "러시아", en: "Russia", ja: "ロシア", zh: "俄罗斯", de: "Russland", fr: "Russie", es: "Rusia", pt: "Rússia" } },
  { code: "IT", flag: "🇮🇹", name: { ko: "이탈리아", en: "Italy", ja: "イタリア", zh: "意大利", de: "Italien", fr: "Italie", es: "Italia", pt: "Itália" } },
  { code: "MX", flag: "🇲🇽", name: { ko: "멕시코", en: "Mexico", ja: "メキシコ", zh: "墨西哥", de: "Mexiko", fr: "Mexique", es: "México", pt: "México" } },
  { code: "TH", flag: "🇹🇭", name: { ko: "태국", en: "Thailand", ja: "タイ", zh: "泰国", de: "Thailand", fr: "Thaïlande", es: "Tailandia", pt: "Tailândia" } },
  { code: "VN", flag: "🇻🇳", name: { ko: "베트남", en: "Vietnam", ja: "ベトナム", zh: "越南", de: "Vietnam", fr: "Vietnam", es: "Vietnam", pt: "Vietnã" } },
  { code: "PH", flag: "🇵🇭", name: { ko: "필리핀", en: "Philippines", ja: "フィリピン", zh: "菲律宾", de: "Philippinen", fr: "Philippines", es: "Filipinas", pt: "Filipinas" } },
  { code: "SG", flag: "🇸🇬", name: { ko: "싱가포르", en: "Singapore", ja: "シンガポール", zh: "新加坡", de: "Singapur", fr: "Singapour", es: "Singapur", pt: "Singapura" } },
  { code: "NZ", flag: "🇳🇿", name: { ko: "뉴질랜드", en: "New Zealand", ja: "ニュージーランド", zh: "新西兰", de: "Neuseeland", fr: "Nouvelle-Zélande", es: "Nueva Zelanda", pt: "Nova Zelândia" } },
];

const DEFAULT_COUNTRY: Record<Language, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR"
};

// 등급 번역 (양방향)
const gradeTranslations: Record<Language, Record<string, string>> = {
  ko: { "Challenger": "챌린저", "Master": "마스터", "Diamond": "다이아몬드", "Platinum": "플래티넘", "Gold": "골드", "Silver": "실버", "Bronze": "브론즈", "Iron": "아이언" },
  en: { "챌린저": "Challenger", "마스터": "Master", "다이아몬드": "Diamond", "플래티넘": "Platinum", "골드": "Gold", "실버": "Silver", "브론즈": "Bronze", "아이언": "Iron" },
  ja: { "Challenger": "チャレンジャー", "Master": "マスター", "Diamond": "ダイヤモンド", "Platinum": "プラチナ", "Gold": "ゴールド", "Silver": "シルバー", "Bronze": "ブロンズ", "Iron": "アイアン", "챌린저": "チャレンジャー", "마스터": "マスター", "다이아몬드": "ダイヤモンド", "플래티넘": "プラチナ", "골드": "ゴールド", "실버": "シルバー", "브론즈": "ブロンズ", "아이언": "アイアン" },
  zh: { "Challenger": "挑战者", "Master": "大师", "Diamond": "钻石", "Platinum": "铂金", "Gold": "黄金", "Silver": "白银", "Bronze": "青铜", "Iron": "黑铁", "챌린저": "挑战者", "마스터": "大师", "다이아몬드": "钻石", "플래티넘": "铂金", "골드": "黄金", "실버": "白银", "브론즈": "青铜", "아이언": "黑铁" },
  de: { "Challenger": "Challenger", "Master": "Meister", "Diamond": "Diamant", "Platinum": "Platin", "Gold": "Gold", "Silver": "Silber", "Bronze": "Bronze", "Iron": "Eisen", "챌린저": "Challenger", "마스터": "Meister", "다이아몬드": "Diamant", "플래티넘": "Platin", "골드": "Gold", "실버": "Silber", "브론즈": "Bronze", "아이언": "Eisen" },
  fr: { "Challenger": "Challenger", "Master": "Maître", "Diamond": "Diamant", "Platinum": "Platine", "Gold": "Or", "Silver": "Argent", "Bronze": "Bronze", "Iron": "Fer", "챌린저": "Challenger", "마스터": "Maître", "다이아몬드": "Diamant", "플래티넘": "Platine", "골드": "Or", "실버": "Argent", "브론즈": "Bronze", "아이언": "Fer" },
  es: { "Challenger": "Challenger", "Master": "Maestro", "Diamond": "Diamante", "Platinum": "Platino", "Gold": "Oro", "Silver": "Plata", "Bronze": "Bronce", "Iron": "Hierro", "챌린저": "Challenger", "마스터": "Maestro", "다이아몬드": "Diamante", "플래티넘": "Platino", "골드": "Oro", "실버": "Plata", "브론즈": "Bronce", "아이언": "Hierro" },
  pt: { "Challenger": "Challenger", "Master": "Mestre", "Diamond": "Diamante", "Platinum": "Platina", "Gold": "Ouro", "Silver": "Prata", "Bronze": "Bronze", "Iron": "Ferro", "챌린저": "Challenger", "마스터": "Mestre", "다이아몬드": "Diamante", "플래티넘": "Platina", "골드": "Ouro", "실버": "Prata", "브론즈": "Bronze", "아이언": "Ferro" },
};
const translateGrade = (grade: string, lang: Language): string => gradeTranslations[lang]?.[grade] || grade;

const getCountryFlag = (countryCode: string | null | undefined): string => {
  if (!countryCode) return "🌍";
  const country = COUNTRY_OPTIONS.find(c => c.code === countryCode);
  return country?.flag || "🌍";
};

interface ColorTestProps {
  locale: Locale;
}

export default function ColorTest({ locale }: ColorTestProps) {
  const lang = locale;
  const [state, setState] = useState<GameState>("waiting");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gridSize, setGridSize] = useState(2);
  const [baseColor, setBaseColor] = useState({ h: 0, s: 70, l: 50 });
  const [differentIndex, setDifferentIndex] = useState(0);
  const [colorDiff, setColorDiff] = useState(30);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ColorLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[lang]);
  
  // 👤 로그인 유저 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);
  
  const shareCardRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => { setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window); }, []);
  
  // 👤 로그인 상태 확인 (광고 차단기 우회)
  useEffect(() => {
    const checkUser = async () => {
      let userId: string | null = null;
      try {
        const sloxSession = localStorage.getItem("slox-session");
        if (sloxSession) {
          const parsed = JSON.parse(sloxSession);
          if (parsed?.user?.id) userId = parsed.user.id;
        }
        if (!userId) {
          const keys = Object.keys(localStorage);
          for (const key of keys) {
            if (key.includes("sb-") && key.includes("-auth-token")) {
              const value = localStorage.getItem(key);
              if (value) {
                const parsed = JSON.parse(value);
                if (parsed?.user?.id) { userId = parsed.user.id; break; }
              }
            }
          }
        }
      } catch { /* 무시 */ }
      if (!userId) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) userId = session.user.id;
        } catch { /* 차단됨 */ }
      }
      if (userId) {
        setCurrentUserId(userId);
        try {
          const response = await fetch(`/api/profile?userId=${userId}`);
          const { profile } = await response.json();
          if (profile?.nickname) { setCurrentUserNickname(profile.nickname); setNickname(profile.nickname); }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
  }, []);

  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=color&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  const submitScore = async () => {
    // 🔄 실시간 세션 재확인 (로그아웃 후 등록 방지)
    let realUserId: string | null = null;
    let realUserNickname: string | null = null;
    try {
      const sloxSession = localStorage.getItem("slox-session");
      if (sloxSession) {
        const parsed = JSON.parse(sloxSession);
        if (parsed?.user?.id) {
          realUserId = parsed.user.id;
          const res = await fetch(`/api/profile?userId=${parsed.user.id}`);
          const { profile } = await res.json();
          if (profile?.nickname) realUserNickname = profile.nickname;
        }
      }
      if (!realUserId) {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.includes("sb-") && key.includes("-auth-token")) {
            const value = localStorage.getItem(key);
            if (value) {
              const parsed = JSON.parse(value);
              if (parsed?.user?.id) { 
                realUserId = parsed.user.id;
                const res = await fetch(`/api/profile?userId=${parsed.user.id}`);
                const { profile } = await res.json();
                if (profile?.nickname) realUserNickname = profile.nickname;
                break; 
              }
            }
          }
        }
      }
    } catch { /* 무시 */ }
    
    const finalNickname = realUserId && realUserNickname ? realUserNickname : nickname.trim();
    const finalUserId = realUserId;
    if (!finalNickname || isSubmitting) return;
    setIsSubmitting(true);
    const gradeInfo = getGrade(level);
    const percentile = level >= 25 ? 1 : level >= 20 ? 5 : level >= 15 ? 15 : level >= 11 ? 30 : level >= 7 ? 50 : level >= 4 ? 70 : level >= 2 ? 85 : 95;
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "color",
          data: {
            nickname: finalNickname.slice(0, 20), 
            score, 
            level, 
            device_type: isMobile ? "mobile" : "pc",
            grade: gradeInfo.grade,
            percentile: percentile,
            country: selectedCountry,
          },
          userId: finalUserId,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      // 👤 회원 점수 업데이트는 API에서 자동 처리됨
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) { console.error("등록 실패:", err); alert("등록 실패!"); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 오버 시 정확한 순위 계산 + 0.8초 후 팝업
  useEffect(() => {
    if (state === "result" && score > 0) {
      fetch(`/api/leaderboard?game=color&limit=10&myScore=${score}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
      if (!hasSubmittedScore) {
        const timer = setTimeout(() => { setShowRankingPrompt(true); }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [state, hasSubmittedScore, score]);

  // 등급 계산 (난이도 상향으로 기준 조정)
  const getGrade = useCallback((lvl: number): { grade: string; color: string; emoji: string; message: string } => {
    if (lvl >= 25) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (lvl >= 20) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (lvl >= 15) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (lvl >= 11) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (lvl >= 7) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (lvl >= 4) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (lvl >= 2) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  }, [t]);

  // 새 라운드 생성
  const generateRound = useCallback((lvl: number) => {
    // 그리드 크기: 레벨에 따라 증가 (2x2 → 3x3 → 4x4 → 5x5 → 6x6) - 4레벨마다 증가
    const size = Math.min(2 + Math.floor(lvl / 4), 6);
    setGridSize(size);

    // 색상 차이: 레벨 올라갈수록 감소 (난이도 상향: 25에서 시작, 레벨당 2씩 감소, 최소 2)
    const diff = Math.max(2, 25 - lvl * 2);
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
    setShowRankingPrompt(false);
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

  // 공유하기 상태
  const [showCopied, setShowCopied] = useState(false);

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInApp = () => navigator.userAgent.toLowerCase().includes("kakaotalk");

  // 공유하기 (텍스트)
  const shareResult = async () => {
    const gradeInfo = getGrade(level);
    const shareUrl = "https://www.slox.co.kr/color";
    
    // 1등 정보
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const isNewFirst = !firstPlace || score > firstPlace.score;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => score > e.score) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => score > e.score) + 1);
    
    const text = `🎨 색상 찾기 테스트 결과!\n\n${gradeInfo.emoji} ${gradeInfo.grade} - Lv.${level}\n📊 ${score}점 ${isNewFirst ? "🔥 새로운 1등!" : `(현재 ${myRank}위)`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlace.score}점)\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`;
    
    const isKakao = isKakaoInApp();
    
    if (!isKakao && typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      prompt("텍스트를 복사하세요:", text);
    }
  };

  // 이미지 공유
  const shareAsImage = async () => {
    if (isKakaoInApp()) {
      alert("📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!");
      return;
    }

    const shareUrl = `https://www.slox.co.kr${languageOptions.find(l => l.locale === lang)?.path || "/color"}`;
    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `color-${score}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🎨 색상 찾기 테스트! ${shareUrl}` };
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(shareData) : false;
      if (canShare) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `color-test-${score}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!\n갤러리에서 이미지를 직접 공유해주세요."), 500);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - 로그인 상태 표시 포함 */}
      <GameNavBar
        locale={lang}
        backText={t.backToMain}
        languageOptions={languageOptions}
      />

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
                  <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{showCopied ? "✅ 복사됨!" : t.share}</button>
                  <button onClick={shareAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 이미지 공유</button>
                  <button onClick={startGame} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.tryAgain}</button>
                </div>
                {!hasSubmittedScore && score > 0 && (
                  <button onClick={() => setShowNicknameModal(true)} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">🏆 랭킹 등록!</button>
                )}
              </div>
            )}
          </div>

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> {lang === "ko" ? "명예의전당" : "Hall of Fame"}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄 {lang === "ko" ? "새로고침" : "Refresh"}</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">👁️</div><p className="text-dark-400">{t.noRecords}</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    {/* 순위 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    {/* 아바타 */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden ${entry.user_id ? "ring-2 ring-accent-500/50" : "bg-dark-600 text-dark-400"}`}>
                      {entry.user_id && entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : entry.user_id ? (
                        <div className="w-full h-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white">{entry.nickname?.charAt(0).toUpperCase()}</div>
                      ) : (
                        <span>{entry.nickname?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    {/* 국기 */}
                    <span className="text-base flex-shrink-0">{getCountryFlag(entry.country)}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        {/* 👤 회원 배지 + 순위 배지 (분리) */}
                        {entry.user_id && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ {lang === "ko" ? "회원" : "M"}</span>
                        )}
                        {/* 종합 순위 배지 */}
                        {entry.user_id && entry.overall_rank && entry.overall_rank <= 10 && (
                          entry.overall_rank === 1 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-300 border border-yellow-500/50 font-bold shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse">👑 {lang === "ko" ? "종합1위" : "#1"}</span>
                          ) : entry.overall_rank === 2 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gray-400/20 text-gray-300 border border-gray-400/40 font-bold">🥈 {lang === "ko" ? "종합2위" : "#2"}</span>
                          ) : entry.overall_rank === 3 ? (
                            <span className="text-xs px-1.5 py-0.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold">🥉 {lang === "ko" ? "종합3위" : "#3"}</span>
                          ) : (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">🏆 {lang === "ko" ? "종합" : ""}{entry.overall_rank}{lang === "ko" ? "위" : "th"}</span>
                          )
                        )}
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-dark-700 text-dark-400">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          ["Challenger", "챌린저", "チャレンジャー", "挑战者"].includes(entry.grade || "") ? "text-cyan-300" :
                          ["Master", "마스터", "マスター", "大师"].includes(entry.grade || "") ? "text-purple-400" :
                          ["Diamond", "다이아몬드", "ダイヤモンド", "钻石"].includes(entry.grade || "") ? "text-blue-400" :
                          ["Platinum", "플래티넘", "プラチナ", "铂金"].includes(entry.grade || "") ? "text-teal-400" :
                          ["Gold", "골드", "ゴールド", "黄金"].includes(entry.grade || "") ? "text-yellow-400" :
                          ["Silver", "실버", "シルバー", "白银"].includes(entry.grade || "") ? "text-gray-300" :
                          ["Bronze", "브론즈", "ブロンズ", "青铜"].includes(entry.grade || "") ? "text-orange-400" :
                          "text-stone-400"
                        }>{translateGrade(entry.grade || getGrade(entry.level).grade, lang)}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">Lv.{entry.level}</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
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

          {/* 🚀 자동 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    {(() => {
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => score > e.score) === -1 ? totalCount + 1 : leaderboard.findIndex(e => score > e.score) + 1);
                      const isFirstPlace = leaderboard.length === 0 || score > leaderboard[0].score;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : calculatedRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${calculatedRank}위!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{score}점 (Lv.{level})</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && score <= leaderboard[0].score && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.currentFirst}</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score}점</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.myRecord}</p>
                          <p className="text-purple-400 font-bold">{score}점</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      랭킹 등록하기!
                    </span>
                  </button>
                  <button onClick={shareResult} className="w-full mt-2 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all border border-dark-600">
                    <span className="flex items-center justify-center gap-2">
                      <span>📤</span>
                      {showCopied ? "✅ 복사됨!" : "친구에게 공유하기"}
                    </span>
                  </button>
                  <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">나중에 할게요</button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(level).emoji}</div><h3 className="text-white text-xl font-bold">🏆 {lang === "ko" ? "랭킹 등록" : lang === "ja" ? "ランキング登録" : "Hall of Fame"}</h3><p className="text-dark-400 text-sm">{score}{lang === "ko" ? "점" : "pts"} (Lv.{level})</p></div>
                {currentUserId && currentUserNickname ? (
                  <div className="relative mb-4"><input type="text" value={currentUserNickname} disabled className="w-full px-4 py-3 bg-dark-900 border border-accent-500/50 rounded-xl text-white cursor-not-allowed opacity-80" /><div className="absolute right-3 top-1/2 -translate-y-1/2"><span className="text-xs px-2 py-1 rounded bg-accent-500/20 text-accent-400 border border-accent-500/30 font-medium">✓ 회원</span></div></div>
                ) : (<input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder={lang === "ko" ? "닉네임..." : "Nickname..."} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />)}
                {currentUserId && <p className="text-xs text-dark-500 mb-4 -mt-2">💡 회원은 프로필 닉네임으로 자동 등록됩니다</p>}
                {/* 🔐 비로그인 시 로그인 유도 */}
                {!currentUserId && (
                  <div className="mb-4 p-3 bg-accent-purple/10 rounded-lg border border-accent-purple/20">
                    <p className="text-xs text-dark-300 mb-1">{lang === "ko" ? "💡 로그인하면 회원 점수에 반영됩니다" : "💡 Login to save your score to your profile"}</p>
                    <a href={lang === "ko" ? "/login" : `/${lang}/login`} target="_blank" rel="noopener noreferrer" className="text-accent-purple text-xs hover:underline">{lang === "ko" ? "로그인하러 가기 (새 탭) →" : "Go to login (new tab) →"}</a>
                  </div>
                )}
                <div className="relative mb-4">
                  <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white appearance-none focus:outline-none focus:border-emerald-500">
                    {COUNTRY_OPTIONS.map((option) => (<option key={option.code} value={option.code}>{option.flag} {option.name[lang]}</option>))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-dark-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">{lang === "ko" ? "취소" : "Cancel"}</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : lang === "ko" ? "등록!" : "Submit!"}</button>
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

          {/* 등급 안내 (난이도 상향으로 기준 조정) */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">{t.tierNote}</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">Lv.25+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">Lv.20+</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">Lv.15+</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">Lv.11+</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">Lv.7+</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">Lv.4+</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">Lv.2+</span>
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

