"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";
import AdBanner from "@/components/AdBanner";

interface MemoryLeaderboardEntry {
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
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
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
    noRecords: "No records yet. Be the first challenger!",
    currentFirst: "Current #1",
    myRecord: "My Record",
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
    noRecords: "まだ記録がありません。最初の挑戦者になりましょう！",
    currentFirst: "現在1位",
    myRecord: "私の記録",
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
    noRecords: "还没有记录。成为第一个挑战者吧！",
    currentFirst: "当前第1名",
    myRecord: "我的记录",
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
    noRecords: "Aún no hay registros. ¡Sé el primer retador!",
    currentFirst: "Actual #1",
    myRecord: "Mi Registro",
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
    noRecords: "Ainda sem registros. Seja o primeiro desafiante!",
    currentFirst: "Atual #1",
    myRecord: "Meu Registro",
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
    noRecords: "Noch keine Rekorde. Sei der erste Herausforderer!",
    currentFirst: "Aktueller #1",
    myRecord: "Mein Rekord",
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
    noRecords: "Aucun record. Soyez le premier challenger !",
    currentFirst: "Actuel #1",
    myRecord: "Mon Record",
  },
};

type Locale = Language;
const languageOptions: { locale: Locale; flag: string; name: string; path: string }[] = [
  { locale: "ko", flag: "🇰🇷", name: "한국어", path: "/memory" },
  { locale: "en", flag: "🇺🇸", name: "English", path: "/en/memory" },
  { locale: "ja", flag: "🇯🇵", name: "日本語", path: "/ja/memory" },
  { locale: "zh", flag: "🇨🇳", name: "中文", path: "/zh/memory" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch", path: "/de/memory" },
  { locale: "fr", flag: "🇫🇷", name: "Français", path: "/fr/memory" },
  { locale: "es", flag: "🇪🇸", name: "Español", path: "/es/memory" },
  { locale: "pt", flag: "🇧🇷", name: "Português", path: "/pt/memory" },
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

interface MemoryTestProps {
  locale: Locale;
  battleMode?: boolean; // 🥊 배틀 모드
  onBattleComplete?: (score: number) => void; // 🥊 배틀 완료 콜백
}

export default function MemoryTest({ locale, battleMode = false, onBattleComplete }: MemoryTestProps) {
  const lang = locale;
  const [state, setState] = useState<GameState>("waiting");
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState("");
  const [userInput, setUserInput] = useState("");
  const [bestLevel, setBestLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<MemoryLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[lang]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  
  // 👤 로그인 유저 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);
  
  // 🥊 배틀 관련 상태
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [battleUrl, setBattleUrl] = useState<string | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);
  
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
        
        // 🎮 pending_game_score 확인 (비회원 → 로그인 후 점수 자동 등록)
        try {
          const pendingScore = localStorage.getItem("pending_game_score");
          if (pendingScore) {
            const data = JSON.parse(pendingScore);
            if (data.game === "memory" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              console.log("🎮 [MemoryTest] 저장된 점수 발견:", data.score);
              setBestLevel(data.score);
              setState("wrong");
              setTimeout(() => { setShowNicknameModal(true); }, 500);
            }
            localStorage.removeItem("pending_game_score");
          }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
  }, []);

  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=memory&limit=10");
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
    const gradeInfo = getGrade(bestLevel);
    const percentile = bestLevel >= 13 ? 1 : bestLevel >= 11 ? 5 : bestLevel >= 9 ? 15 : bestLevel >= 7 ? 30 : bestLevel >= 6 ? 50 : bestLevel >= 5 ? 70 : bestLevel >= 4 ? 85 : 95;
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "memory",
          data: {
        nickname: finalNickname.slice(0, 20),
        score: bestLevel,
        level: bestLevel,
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
    } catch (err) {
      console.error("점수 등록 실패:", err);
      alert(lang === "ko" ? "등록 실패!" : "Failed!");
    } finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 오버 시 정확한 순위 계산 + 0.8초 후 팝업
  useEffect(() => {
    if (state === "wrong" && bestLevel >= 1) {
      fetch(`/api/leaderboard?game=memory&limit=10&myScore=${bestLevel}`)
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
  }, [state, hasSubmittedScore, bestLevel]);

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
    setShowRankingPrompt(false);
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
      
      // 🥊 배틀 모드: 틀리면 게임 종료 → 현재 게임 레벨 전달
      if (battleMode && onBattleComplete && !battleCompleted) {
        setBattleCompleted(true);
        onBattleComplete(level); // 현재 게임 레벨 (bestLevel 아님)
      }
    }
  }, [userInput, numbers, level, bestLevel, battleMode, onBattleComplete, battleCompleted]);

  // 키보드 엔터
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && state === "input" && userInput.length > 0) {
      submitAnswer();
    }
  };

  // 🥊 도전장 만들기 함수
  const createBattle = async () => {
    if (!currentUserId || !nickname) {
      alert(lang === "ko" ? "로그인이 필요합니다." : "Login required.");
      return;
    }

    setIsCreatingBattle(true);
    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          challengerId: currentUserId,
          challengerNickname: nickname,
          challengerScore: bestLevel,
          game: "memory",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "도전장 생성 실패");
      }

      const fullUrl = `https://www.slox.co.kr${data.battleUrl}`;
      setBattleUrl(fullUrl);
      setShowBattleModal(true);
    } catch (error) {
      console.error("도전장 생성 에러:", error);
      alert(lang === "ko" ? "도전장 생성에 실패했습니다." : "Failed to create challenge.");
    } finally {
      setIsCreatingBattle(false);
    }
  };

  // 🥊 도전장 링크 복사
  const copyBattleUrl = async () => {
    if (!battleUrl) return;
    
    const text = lang === "ko"
      ? `🥊 ${nickname}의 도전장!\n\n🧠 순간기억력: ${bestLevel}자리\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`
      : `🥊 ${nickname}'s Challenge!\n\n🧠 Memory: Level ${bestLevel}\n\nCan you beat this? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert(lang === "ko" ? "복사되었습니다! 친구에게 공유하세요 🎮" : "Copied! Share with friends 🎮");
    } catch {
      prompt(lang === "ko" ? "텍스트를 복사하세요:" : "Copy this text:", text);
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

  // 공유하기 상태
  const [showCopied, setShowCopied] = useState(false);

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInApp = () => navigator.userAgent.toLowerCase().includes("kakaotalk");

  // 공유하기 (텍스트)
  const shareResult = async () => {
    const gradeInfo = getGrade(bestLevel);
    const shareUrl = "https://www.slox.co.kr/memory";
    
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const isNewFirst = !firstPlace || bestLevel > firstPlace.score;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => bestLevel > e.score) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => bestLevel > e.score) + 1);
    
    const text = `🧠 기억력 테스트 결과!\n\n${gradeInfo.emoji} ${gradeInfo.grade}\n📊 레벨 ${bestLevel} ${isNewFirst ? "🔥 새로운 1등!" : `(현재 ${myRank}위)`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (Lv.${firstPlace.score})\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`;
    
    const isKakao = isKakaoInApp();
    
    if (!isKakao && typeof navigator.share === "function") {
      try { await navigator.share({ text }); return; } 
      catch (error) { if (error instanceof Error && error.name === "AbortError") return; }
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch { prompt("텍스트를 복사하세요:", text); }
  };

  // 이미지 공유
  const shareAsImage = async () => {
    if (isKakaoInApp()) {
      alert("📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!");
      return;
    }

    const shareUrl = `https://www.slox.co.kr${languageOptions.find(l => l.locale === lang)?.path || "/memory"}`;
    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `memory-${bestLevel}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🧠 기억력 테스트! ${shareUrl}` };
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(shareData) : false;
      if (canShare) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `memory-test-${bestLevel}.png`;
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
                    <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{showCopied ? "✅ 복사됨!" : t.share}</button>
                    <button onClick={shareAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 이미지 공유</button>
                    <button onClick={resetGame} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.tryAgain}</button>
                  </div>
                  {!hasSubmittedScore && level > 1 && (
                    <button onClick={() => setShowNicknameModal(true)} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                      🏆 {lang === "ko" ? "랭킹 등록!" : "Register!"}
                    </button>
                  )}
                  
                  {/* 🥊 도전장 만들기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && bestLevel > 1 && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (lang === "ko" ? "생성 중..." : "Creating...")
                          : (lang === "ko" ? "친구에게 도전장 보내기!" : "Send Challenge!")}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 📊 광고 배너 */}
          <AdBanner className="mb-8" />

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> {lang === "ko" ? "명예의전당" : "Hall of Fame"}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄 {lang === "ko" ? "새로고침" : "Refresh"}</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">🧠</div><p className="text-dark-400">{t.noRecords}</p></div>
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
                        }>{translateGrade(entry.grade || getGrade(entry.score).grade, lang)}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score} {t.digits}</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
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
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => bestLevel > e.score) === -1 ? totalCount + 1 : leaderboard.findIndex(e => bestLevel > e.score) + 1);
                      const isFirstPlace = leaderboard.length === 0 || bestLevel > leaderboard[0].score;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : calculatedRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${calculatedRank}위!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{bestLevel} {t.digits}</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && bestLevel <= leaderboard[0].score && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.currentFirst}</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score} {t.digits}</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.myRecord}</p>
                          <p className="text-purple-400 font-bold">{bestLevel} {t.digits}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 🔐 비회원 로그인 유도 */}
                  {!currentUserId && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">🎮 회원으로 등록하면 점수가 누적돼요!</p>
                      <button 
                        onClick={() => {
                          localStorage.setItem("pending_game_score", JSON.stringify({ game: "memory", score: bestLevel, timestamp: Date.now() }));
                          window.location.href = "/login?redirect=/memory";
                        }}
                        className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all"
                      >
                        로그인하고 이 점수로 등록! →
                      </button>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      랭킹 등록하기!
                    </span>
                  </button>
                  {/* 🥊 도전장 보내기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && bestLevel > 0 && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (lang === "ko" ? "생성 중..." : "Creating...")
                          : (lang === "ko" ? "친구에게 도전장 보내기!" : "Send Challenge!")}
                      </span>
                    </button>
                  )}
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
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(level).emoji}</div><h3 className="text-white text-xl font-bold">🏆 {lang === "ko" ? "랭킹 등록" : lang === "ja" ? "ランキング登録" : "Hall of Fame"}</h3><p className="text-dark-400 text-sm">{bestLevel} {t.digits}</p></div>
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

          {/* 🥊 도전장 링크 모달 */}
          {showBattleModal && battleUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🥊</div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {lang === "ko" ? "도전장 생성 완료!" : "Challenge Created!"}
                  </h3>
                  <p className="text-dark-400 text-sm">
                    {lang === "ko" ? "링크를 친구에게 공유하세요!" : "Share this link with your friend!"}
                  </p>
                </div>

                <div className="bg-dark-800 rounded-xl p-4 mb-4">
                  <p className="text-white text-center font-bold mb-2">🧠 {bestLevel}{t.digits}</p>
                  <p className="text-dark-400 text-xs text-center break-all">{battleUrl}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={copyBattleUrl}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all"
                  >
                    📋 {lang === "ko" ? "링크 복사하기" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => setShowBattleModal(false)}
                    className="w-full py-2 text-dark-400 hover:text-white transition-colors"
                  >
                    {lang === "ko" ? "닫기" : "Close"}
                  </button>
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


