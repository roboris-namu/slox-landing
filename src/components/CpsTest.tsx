"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

interface CpsLeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  clicks: number;
  duration: number;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  country?: string;
}

type GameState = "waiting" | "playing" | "result";
type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
type Duration = 1 | 5 | 10;

// 클릭 파티클 타입
interface ClickParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji: string;
  scale: number;
  tx: number;
  ty: number;
}

// 클릭 이펙트 색상 & 이모지
const clickEffects = [
  { color: "#f472b6", emoji: "💥" },
  { color: "#a78bfa", emoji: "✨" },
  { color: "#60a5fa", emoji: "⚡" },
  { color: "#34d399", emoji: "💫" },
  { color: "#fbbf24", emoji: "🔥" },
  { color: "#f87171", emoji: "💢" },
  { color: "#22d3ee", emoji: "⭐" },
];

// CPS 등급 기준
const translations = {
  ko: {
    title: "CPS",
    titleHighlight: " 테스트",
    subtitle: "정해진 시간 동안 최대한 빠르게 클릭하세요!",
    badge: "🖱️ 클릭 속도 측정",
    clickToStart: "클릭하여 시작",
    ready: "준비되셨나요?",
    clicking: "클릭! 클릭! 클릭!",
    timeLeft: "남은 시간",
    clicks: "클릭",
    seconds: "초",
    yourCps: "당신의 CPS",
    totalClicks: "총 클릭",
    duration: "테스트 시간",
    tryAgain: "다시 도전",
    share: "📤 공유하기",
    reset: "🔄 초기화",
    tierTable: "🎮 CPS 등급표",
    tierNote: "💡 CPS = 초당 클릭 횟수",
    otherTools: "🔗 다른 도구",
    reactionTest: "⚡ 반응속도 테스트",
    typingTest: "⌨️ 타자 속도 테스트",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    slogan: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    adArea: "광고 영역 (Google AdSense)",
    shareText: "🖱️ CPS 테스트 결과!",
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
    msgChallenger: "드래그 클릭 마스터!",
    msgMaster: "버터플라이 클릭 수준!",
    msgDiamond: "지터 클릭 실력이네요!",
    msgPlatinum: "상위권 클릭 속도!",
    msgGold: "꽤 빠른 편이에요!",
    msgSilver: "평균적인 속도예요",
    msgBronze: "조금 느린 편이에요",
    msgIron: "연습이 필요해요!",
    clickMethods: "💡 클릭 방법",
    normalClick: "일반 클릭: 4-6 CPS",
    jitterClick: "지터 클릭: 8-12 CPS",
    butterflyClick: "버터플라이: 12-16 CPS",
    dragClick: "드래그 클릭: 20+ CPS",
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
  },
  en: {
    title: "CPS",
    titleHighlight: " Test",
    subtitle: "Click as fast as you can within the time limit!",
    badge: "🖱️ Click Speed Test",
    clickToStart: "Click to Start",
    ready: "Are you ready?",
    clicking: "Click! Click! Click!",
    timeLeft: "Time Left",
    clicks: "Clicks",
    seconds: "sec",
    yourCps: "Your CPS",
    totalClicks: "Total Clicks",
    duration: "Test Duration",
    tryAgain: "Try Again",
    share: "📤 Share",
    reset: "🔄 Reset",
    tierTable: "🎮 CPS Tier Chart",
    tierNote: "💡 CPS = Clicks Per Second",
    otherTools: "🔗 Other Tools",
    reactionTest: "⚡ Reaction Speed Test",
    typingTest: "⌨️ Typing Speed Test",
    backToMain: "← Home",
    poweredBy: "Powered by",
    slogan: "Web · App · AI Chatbot Development",
    adArea: "Ad Space (Google AdSense)",
    shareText: "🖱️ CPS Test Result!",
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
    msgChallenger: "Drag click master!",
    msgMaster: "Butterfly click level!",
    msgDiamond: "Jitter click skills!",
    msgPlatinum: "Top-tier click speed!",
    msgGold: "Pretty fast!",
    msgSilver: "Average speed",
    msgBronze: "A bit slow",
    msgIron: "Keep practicing!",
    clickMethods: "💡 Click Methods",
    normalClick: "Normal Click: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
    noRecords: "No records yet. Be the first challenger!",
    currentFirst: "Current #1",
    myRecord: "My Record",
  },
  ja: {
    title: "CPS",
    titleHighlight: " テスト",
    subtitle: "制限時間内にできるだけ速くクリック！",
    badge: "🖱️ クリック速度測定",
    clickToStart: "クリックしてスタート",
    ready: "準備はいいですか？",
    clicking: "クリック！クリック！クリック！",
    timeLeft: "残り時間",
    clicks: "クリック",
    seconds: "秒",
    yourCps: "あなたのCPS",
    totalClicks: "総クリック数",
    duration: "テスト時間",
    tryAgain: "再挑戦",
    share: "📤 共有",
    reset: "🔄 リセット",
    tierTable: "🎮 CPSランク表",
    tierNote: "💡 CPS = 1秒あたりのクリック数",
    otherTools: "🔗 他のツール",
    reactionTest: "⚡ 反応速度テスト",
    typingTest: "⌨️ タイピングテスト",
    backToMain: "← ホームへ",
    poweredBy: "Powered by",
    slogan: "ウェブ・アプリ・AIチャットボット開発",
    adArea: "広告エリア (Google AdSense)",
    shareText: "🖱️ CPSテスト結果！",
    shareTestIt: "あなたも挑戦 👉",
    copied: "結果がクリップボードにコピーされました！",
    challenger: "チャレンジャー",
    master: "マスター",
    diamond: "ダイヤモンド",
    platinum: "プラチナ",
    gold: "ゴールド",
    silver: "シルバー",
    bronze: "ブロンズ",
    iron: "アイアン",
    msgChallenger: "ドラッグクリックマスター！",
    msgMaster: "バタフライクリックレベル！",
    msgDiamond: "ジッタークリックスキル！",
    msgPlatinum: "上位クリック速度！",
    msgGold: "なかなか速い！",
    msgSilver: "平均的な速度",
    msgBronze: "少し遅い",
    msgIron: "練習が必要！",
    clickMethods: "💡 クリック方法",
    normalClick: "通常クリック: 4-6 CPS",
    jitterClick: "ジッター: 8-12 CPS",
    butterflyClick: "バタフライ: 12-16 CPS",
    dragClick: "ドラッグ: 20+ CPS",
    noRecords: "まだ記録がありません。最初の挑戦者になりましょう！",
    currentFirst: "現在1位",
    myRecord: "私の記録",
  },
  zh: {
    title: "CPS",
    titleHighlight: " 测试",
    subtitle: "在限定时间内尽快点击！",
    badge: "🖱️ 点击速度测试",
    clickToStart: "点击开始",
    ready: "准备好了吗？",
    clicking: "点击！点击！点击！",
    timeLeft: "剩余时间",
    clicks: "次点击",
    seconds: "秒",
    yourCps: "你的CPS",
    totalClicks: "总点击数",
    duration: "测试时间",
    tryAgain: "再试一次",
    share: "📤 分享",
    reset: "🔄 重置",
    tierTable: "🎮 CPS等级表",
    tierNote: "💡 CPS = 每秒点击次数",
    otherTools: "🔗 其他工具",
    reactionTest: "⚡ 反应速度测试",
    typingTest: "⌨️ 打字速度测试",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    slogan: "网站·应用·AI聊天机器人开发",
    adArea: "广告区域 (Google AdSense)",
    shareText: "🖱️ CPS测试结果！",
    shareTestIt: "你也来试试 👉",
    copied: "结果已复制到剪贴板！",
    challenger: "挑战者",
    master: "大师",
    diamond: "钻石",
    platinum: "铂金",
    gold: "黄金",
    silver: "白银",
    bronze: "青铜",
    iron: "黑铁",
    msgChallenger: "拖拽点击大师！",
    msgMaster: "蝴蝶点击水平！",
    msgDiamond: "抖动点击技巧！",
    msgPlatinum: "顶级点击速度！",
    msgGold: "相当快！",
    msgSilver: "平均速度",
    msgBronze: "有点慢",
    msgIron: "需要练习！",
    clickMethods: "💡 点击方法",
    normalClick: "普通点击: 4-6 CPS",
    jitterClick: "抖动点击: 8-12 CPS",
    butterflyClick: "蝴蝶点击: 12-16 CPS",
    dragClick: "拖拽点击: 20+ CPS",
    noRecords: "还没有记录。成为第一个挑战者吧！",
    currentFirst: "当前第1名",
    myRecord: "我的记录",
  },
  es: {
    title: "Test",
    titleHighlight: " CPS",
    subtitle: "¡Haz clic lo más rápido posible en el tiempo límite!",
    badge: "🖱️ Test de Velocidad de Clic",
    clickToStart: "Clic para Empezar",
    ready: "¿Estás listo?",
    clicking: "¡Clic! ¡Clic! ¡Clic!",
    timeLeft: "Tiempo Restante",
    clicks: "Clics",
    seconds: "seg",
    yourCps: "Tu CPS",
    totalClicks: "Total de Clics",
    duration: "Duración del Test",
    tryAgain: "Intentar de Nuevo",
    share: "📤 Compartir",
    reset: "🔄 Reiniciar",
    tierTable: "🎮 Tabla de Rangos CPS",
    tierNote: "💡 CPS = Clics por segundo",
    otherTools: "🔗 Otras Herramientas",
    reactionTest: "⚡ Test de Reacción",
    typingTest: "⌨️ Test de Escritura",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    slogan: "Desarrollo Web · Apps · Chatbots IA",
    adArea: "Espacio Publicitario (Google AdSense)",
    shareText: "🖱️ ¡Resultado del Test CPS!",
    shareTestIt: "¡Pruébalo tú también! 👉",
    copied: "¡Resultado copiado al portapapeles!",
    challenger: "Aspirante",
    master: "Maestro",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
    iron: "Hierro",
    msgChallenger: "¡Maestro del drag click!",
    msgMaster: "¡Nivel butterfly click!",
    msgDiamond: "¡Habilidades de jitter click!",
    msgPlatinum: "¡Velocidad de élite!",
    msgGold: "¡Bastante rápido!",
    msgSilver: "Velocidad promedio",
    msgBronze: "Un poco lento",
    msgIron: "¡Sigue practicando!",
    clickMethods: "💡 Métodos de Clic",
    normalClick: "Clic Normal: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
    noRecords: "Aún no hay registros. ¡Sé el primer retador!",
    currentFirst: "Actual #1",
    myRecord: "Mi Registro",
  },
  pt: {
    title: "Teste",
    titleHighlight: " CPS",
    subtitle: "Clique o mais rápido possível no tempo limite!",
    badge: "🖱️ Teste de Velocidade de Clique",
    clickToStart: "Clique para Começar",
    ready: "Você está pronto?",
    clicking: "Clique! Clique! Clique!",
    timeLeft: "Tempo Restante",
    clicks: "Cliques",
    seconds: "seg",
    yourCps: "Seu CPS",
    totalClicks: "Total de Cliques",
    duration: "Duração do Teste",
    tryAgain: "Tentar Novamente",
    share: "📤 Compartilhar",
    reset: "🔄 Reiniciar",
    tierTable: "🎮 Tabela de Ranks CPS",
    tierNote: "💡 CPS = Cliques por segundo",
    otherTools: "🔗 Outras Ferramentas",
    reactionTest: "⚡ Teste de Reação",
    typingTest: "⌨️ Teste de Digitação",
    backToMain: "← Início",
    poweredBy: "Powered by",
    slogan: "Desenvolvimento Web · Apps · Chatbots IA",
    adArea: "Espaço Publicitário (Google AdSense)",
    shareText: "🖱️ Resultado do Teste CPS!",
    shareTestIt: "Experimente você também! 👉",
    copied: "Resultado copiado para a área de transferência!",
    challenger: "Desafiante",
    master: "Mestre",
    diamond: "Diamante",
    platinum: "Platina",
    gold: "Ouro",
    silver: "Prata",
    bronze: "Bronze",
    iron: "Ferro",
    msgChallenger: "Mestre do drag click!",
    msgMaster: "Nível butterfly click!",
    msgDiamond: "Habilidades de jitter click!",
    msgPlatinum: "Velocidade de elite!",
    msgGold: "Bem rápido!",
    msgSilver: "Velocidade média",
    msgBronze: "Um pouco lento",
    msgIron: "Continue praticando!",
    clickMethods: "💡 Métodos de Clique",
    normalClick: "Clique Normal: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
    noRecords: "Ainda sem registros. Seja o primeiro desafiante!",
    currentFirst: "Atual #1",
    myRecord: "Meu Registro",
  },
  de: {
    title: "CPS",
    titleHighlight: " Test",
    subtitle: "Klicke so schnell wie möglich im Zeitlimit!",
    badge: "🖱️ Klickgeschwindigkeit Test",
    clickToStart: "Klicken zum Starten",
    ready: "Bist du bereit?",
    clicking: "Klick! Klick! Klick!",
    timeLeft: "Verbleibende Zeit",
    clicks: "Klicks",
    seconds: "Sek",
    yourCps: "Dein CPS",
    totalClicks: "Gesamtklicks",
    duration: "Testdauer",
    tryAgain: "Nochmal Versuchen",
    share: "📤 Teilen",
    reset: "🔄 Zurücksetzen",
    tierTable: "🎮 CPS Rang-Tabelle",
    tierNote: "💡 CPS = Klicks pro Sekunde",
    otherTools: "🔗 Andere Tools",
    reactionTest: "⚡ Reaktionstest",
    typingTest: "⌨️ Tippgeschwindigkeit",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    slogan: "Web · App · KI-Chatbot Entwicklung",
    adArea: "Werbefläche (Google AdSense)",
    shareText: "🖱️ CPS Test Ergebnis!",
    shareTestIt: "Probiere es selbst! 👉",
    copied: "Ergebnis in Zwischenablage kopiert!",
    challenger: "Herausforderer",
    master: "Meister",
    diamond: "Diamant",
    platinum: "Platin",
    gold: "Gold",
    silver: "Silber",
    bronze: "Bronze",
    iron: "Eisen",
    msgChallenger: "Drag-Click-Meister!",
    msgMaster: "Butterfly-Click-Level!",
    msgDiamond: "Jitter-Click-Fähigkeiten!",
    msgPlatinum: "Elite-Geschwindigkeit!",
    msgGold: "Ziemlich schnell!",
    msgSilver: "Durchschnittliche Geschwindigkeit",
    msgBronze: "Etwas langsam",
    msgIron: "Weiter üben!",
    clickMethods: "💡 Klickmethoden",
    normalClick: "Normal Klick: 4-6 CPS",
    jitterClick: "Jitter Klick: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Klick: 20+ CPS",
    noRecords: "Noch keine Rekorde. Sei der erste Herausforderer!",
    currentFirst: "Aktueller #1",
    myRecord: "Mein Rekord",
  },
  fr: {
    title: "Test",
    titleHighlight: " CPS",
    subtitle: "Cliquez le plus vite possible dans le temps imparti !",
    badge: "🖱️ Test de Vitesse de Clic",
    clickToStart: "Cliquez pour Commencer",
    ready: "Êtes-vous prêt ?",
    clicking: "Clic ! Clic ! Clic !",
    timeLeft: "Temps Restant",
    clicks: "Clics",
    seconds: "sec",
    yourCps: "Votre CPS",
    totalClicks: "Total des Clics",
    duration: "Durée du Test",
    tryAgain: "Réessayer",
    share: "📤 Partager",
    reset: "🔄 Réinitialiser",
    tierTable: "🎮 Tableau des Rangs CPS",
    tierNote: "💡 CPS = Clics par seconde",
    otherTools: "🔗 Autres Outils",
    reactionTest: "⚡ Test de Réaction",
    typingTest: "⌨️ Test de Frappe",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    slogan: "Développement Web · Apps · Chatbots IA",
    adArea: "Espace Publicitaire (Google AdSense)",
    shareText: "🖱️ Résultat du Test CPS !",
    shareTestIt: "Essayez vous aussi ! 👉",
    copied: "Résultat copié dans le presse-papiers !",
    challenger: "Challenger",
    master: "Maître",
    diamond: "Diamant",
    platinum: "Platine",
    gold: "Or",
    silver: "Argent",
    bronze: "Bronze",
    iron: "Fer",
    msgChallenger: "Maître du drag click !",
    msgMaster: "Niveau butterfly click !",
    msgDiamond: "Compétences jitter click !",
    msgPlatinum: "Vitesse d'élite !",
    msgGold: "Assez rapide !",
    msgSilver: "Vitesse moyenne",
    msgBronze: "Un peu lent",
    msgIron: "Continuez à pratiquer !",
    clickMethods: "💡 Méthodes de Clic",
    normalClick: "Clic Normal: 4-6 CPS",
    jitterClick: "Jitter Clic: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Clic: 20+ CPS",
    noRecords: "Aucun record. Soyez le premier challenger !",
    currentFirst: "Actuel #1",
    myRecord: "Mon Record",
  },
};

type Locale = Language;
const languageOptions: { locale: Locale; flag: string; name: string; path: string }[] = [
  { locale: "ko", flag: "🇰🇷", name: "한국어", path: "/cps" },
  { locale: "en", flag: "🇺🇸", name: "English", path: "/en/cps" },
  { locale: "ja", flag: "🇯🇵", name: "日本語", path: "/ja/cps" },
  { locale: "zh", flag: "🇨🇳", name: "中文", path: "/zh/cps" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch", path: "/de/cps" },
  { locale: "fr", flag: "🇫🇷", name: "Français", path: "/fr/cps" },
  { locale: "es", flag: "🇪🇸", name: "Español", path: "/es/cps" },
  { locale: "pt", flag: "🇧🇷", name: "Português", path: "/pt/cps" },
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

interface CpsTestProps {
  locale: Locale;
}

export default function CpsTest({ locale }: CpsTestProps) {
  const lang = locale;
  const [state, setState] = useState<GameState>("waiting");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState<Duration>(5);
  const [cps, setCps] = useState(0);
  const [bestCps, setBestCps] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // 리더보드 상태
  const [leaderboard, setLeaderboard] = useState<CpsLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[lang]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // 모바일 감지
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  // 리더보드 가져오기
  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("cps_leaderboard")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);
      const { count } = await supabase.from("cps_leaderboard").select("*", { count: "exact", head: true });
      if (error) throw error;
      if (data) setLeaderboard(data);
      if (count !== null) setTotalCount(count);
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
    }
  }, []);

  // 점수 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const gradeInfo = getGrade(cps);
      // CPS 백분위: 16+ = 상위 1%, 12-15 = 5%, 9-11 = 15%, 7-8 = 30%, 5-6 = 50%, 3-4 = 70%, 2 = 85%, 1 = 95%
      const percentile = cps >= 16 ? 1 : cps >= 12 ? 5 : cps >= 9 ? 15 : cps >= 7 ? 30 : cps >= 5 ? 50 : cps >= 3 ? 70 : cps >= 2 ? 85 : 95;
      const { error } = await supabase
        .from("cps_leaderboard")
        .insert({
          nickname: nickname.trim().slice(0, 20),
          score: parseFloat(cps.toFixed(2)),
          clicks: clicks,
          duration: duration,
          device_type: isMobile ? "mobile" : "pc",
          grade: gradeInfo.grade,
          percentile: percentile,
          country: selectedCountry,
        });
      if (error) throw error;
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) {
      console.error("점수 등록 실패:", err);
      alert(lang === "ko" ? "등록 실패! 다시 시도해주세요." : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 페이지 로드시 리더보드
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 🚀 결과 나오면 0.8초 후 자동 랭킹 등록 팝업 표시
  useEffect(() => {
    if (state === "result" && !hasSubmittedScore && clicks > 0) {
      const timer = setTimeout(() => {
        setShowRankingPrompt(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [state, hasSubmittedScore, clicks]);

  // 클릭 파티클 생성
  const createClickParticles = useCallback((clientX: number, clientY: number) => {
    if (!gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newParticles: ClickParticle[] = [];
    const numParticles = 8 + Math.floor(Math.random() * 5);

    for (let i = 0; i < numParticles; i++) {
      const effect = clickEffects[Math.floor(Math.random() * clickEffects.length)];
      const angle = (i / numParticles) * 360 + Math.random() * 30;
      const velocity = 60 + Math.random() * 50;
      const rad = (angle * Math.PI) / 180;
      
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        color: effect.color,
        emoji: effect.emoji,
        scale: 0.6 + Math.random() * 0.6,
        tx: Math.cos(rad) * velocity,
        ty: Math.sin(rad) * velocity,
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 600);

    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 60);
  }, []);

  // 등급 계산
  const getGrade = (cpsValue: number): { grade: string; color: string; emoji: string; message: string } => {
    if (cpsValue >= 16) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (cpsValue >= 12) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (cpsValue >= 9) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (cpsValue >= 7) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (cpsValue >= 5) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (cpsValue >= 3) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (cpsValue >= 2) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  };

  // 게임 시작
  const startGame = useCallback(() => {
    setState("playing");
    setClicks(0);
    setTimeLeft(duration);
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setState("result");
      }
    }, 50);
  }, [duration]);

  // 클릭 처리
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (state === "waiting") {
      startGame();
      createClickParticles(e.clientX, e.clientY);
    } else if (state === "playing") {
      setClicks(prev => prev + 1);
      createClickParticles(e.clientX, e.clientY);
    }
  }, [state, startGame, createClickParticles]);

  // 결과 계산
  useEffect(() => {
    if (state === "result") {
      const calculatedCps = clicks / duration;
      setCps(calculatedCps);
      if (calculatedCps > bestCps) {
        setBestCps(calculatedCps);
      }
    }
  }, [state, clicks, duration, bestCps]);

  // 리셋
  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState("waiting");
    setClicks(0);
    setTimeLeft(0);
    setCps(0);
  };

  // 이미지 생성
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    try {
      shareCardRef.current.style.display = "block";
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#0f0d1a",
        scale: 2,
        useCORS: true,
      });
      shareCardRef.current.style.display = "none";
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } catch {
      if (shareCardRef.current) shareCardRef.current.style.display = "none";
      return null;
    }
  };

  // 공유하기 상태
  const [showCopied, setShowCopied] = useState(false);

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInApp = () => navigator.userAgent.toLowerCase().includes("kakaotalk");

  // 공유하기 (텍스트)
  const shareResult = async () => {
    const gradeInfo = getGrade(cps);
    const shareUrl = "https://www.slox.co.kr/cps";
    
    // 1등 정보
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const isNewFirst = !firstPlace || cps > firstPlace.score;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => cps > e.score) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => cps > e.score) + 1);
    
    const text = `👆 CPS 테스트 결과!\n\n${gradeInfo.emoji} ${gradeInfo.grade}\n📊 ${cps.toFixed(1)} CPS ${isNewFirst ? "🔥 새로운 1등!" : `(현재 ${myRank}위)`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlace.score.toFixed(1)} CPS)\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`;
    
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

    const shareUrl = `https://www.slox.co.kr${languageOptions.find(l => l.locale === lang)?.path || "/cps"}`;
    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `cps-${cps.toFixed(1)}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `👆 CPS 테스트! ${shareUrl}` };
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(shareData) : false;
      if (canShare) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `cps-test-${cps.toFixed(1)}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setTimeout(() => alert("📥 이미지가 다운로드되었습니다!\n갤러리에서 이미지를 직접 공유해주세요."), 500);
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
              {/* 언어 선택 */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors"
                >
                  <span>{languageOptions.find(l => l.locale === lang)?.flag}</span>
                  <span className="text-dark-300 hidden sm:inline">{languageOptions.find(l => l.locale === lang)?.name}</span>
                  <svg className="w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden">
                    {languageOptions.map((opt) => (
                      <button
                        key={opt.locale}
                        onClick={() => {
                          document.cookie = `SLOX_LOCALE=${opt.locale}; path=/; max-age=31536000`;
                          setShowLangMenu(false);
                          window.location.href = opt.path;
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-700 transition-colors text-left ${
                          lang === opt.locale ? "bg-dark-700 text-white" : "text-dark-300"
                        }`}
                      >
                        <span>{opt.flag}</span>
                        <span>{opt.name}</span>
                      </button>
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

          {/* 시간 선택 */}
          {state === "waiting" && (
            <div className="flex justify-center gap-3 mb-8">
              {([1, 5, 10] as Duration[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    duration === d
                      ? "bg-accent-purple text-white"
                      : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                  }`}
                >
                  {d}{t.seconds}
                </button>
              ))}
            </div>
          )}

          {/* 💡 CPS 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🖱️</span>
              <div>
                <p className="text-white font-medium mb-1">CPS 향상 팁</p>
                <p className="text-dark-400 text-sm">
                  버터플라이 클릭이나 지터 클릭 기법을 연습해보세요. 
                  손가락 2개를 번갈아 사용하면 더 높은 CPS를 달성할 수 있습니다!
                </p>
              </div>
            </div>
          </div>

          {/* 게임 영역 */}
          <div
            ref={gameAreaRef}
            onClick={handleClick}
            className={`relative rounded-2xl cursor-pointer select-none mb-8 overflow-hidden ${
              state === "playing" 
                ? "bg-gradient-to-br from-purple-600 to-cyan-600" 
                : "bg-dark-900 hover:bg-dark-800"
            } ${screenShake ? "animate-shake" : ""}`}
            style={{ minHeight: "300px" }}
          >
            {/* 클릭 파티클 💥 */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute pointer-events-none animate-particle-burst"
                style={{
                  left: particle.x,
                  top: particle.y,
                  "--tx": `${particle.tx}px`,
                  "--ty": `${particle.ty}px`,
                } as React.CSSProperties}
              >
                <span 
                  className="text-2xl drop-shadow-lg"
                  style={{ 
                    transform: `scale(${particle.scale})`,
                    textShadow: `0 0 15px ${particle.color}, 0 0 30px ${particle.color}` 
                  }}
                >
                  {particle.emoji}
                </span>
              </div>
            ))}

            {/* 클릭시 원형 파동 */}
            {state === "playing" && clicks > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none"
                key={clicks}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white/50 animate-ripple" />
              </div>
            )}

            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8 relative z-10">
              {state === "waiting" && (
                <>
                  <p className="text-6xl mb-4 animate-bounce">🖱️</p>
                  <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                  <p className="text-dark-400">{t.clickToStart}</p>
                </>
              )}

              {state === "playing" && (
                <>
                  <p className={`text-6xl font-bold text-white mb-2 transition-transform ${screenShake ? "scale-110" : "scale-100"}`}>
                    {clicks}
                  </p>
                  <p className="text-xl text-white/80 mb-4">{t.clicks}</p>
                  <div className="w-full max-w-xs bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full h-4 transition-all duration-100"
                      style={{ width: `${(timeLeft / duration) * 100}%` }}
                    />
                  </div>
                  <p className="text-white/80 text-lg font-mono">{timeLeft.toFixed(1)}{t.seconds}</p>
                  <p className="text-white/60 text-sm mt-4 animate-pulse">{t.clicking}</p>
                </>
              )}

              {state === "result" && (
                <>
                  <p className="text-6xl mb-2 animate-bounce">{getGrade(cps).emoji}</p>
                  <p className={`text-2xl font-bold ${getGrade(cps).color} mb-2`}>
                    {getGrade(cps).grade}
                  </p>
                  <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                    {cps.toFixed(1)} CPS
                  </p>
                  <p className="text-dark-400 mb-4">{getGrade(cps).message}</p>
                  <p className="text-dark-500 text-sm">{clicks} {t.clicks} / {duration}{t.seconds}</p>
                </>
              )}
            </div>
          </div>

          {/* 결과/버튼 */}
          {state === "result" && (
            <div className="glass-card p-6 rounded-2xl mb-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.yourCps}</p>
                  <p className="text-2xl font-bold text-accent-cyan">{cps.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">Best CPS</p>
                  <p className="text-2xl font-bold text-accent-purple">{bestCps.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={shareResult} className="flex-1 px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">
                  {showCopied ? "✅ 복사됨!" : t.share}
                </button>
                <button onClick={shareAsImage} className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all">
                  🖼️ 이미지 공유
                </button>
                <button onClick={resetGame} className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">
                  {t.tryAgain}
                </button>
              </div>
              
              {/* 랭킹 등록 버튼 */}
              {!hasSubmittedScore && cps > 0 && (
                <button
                  onClick={() => setShowNicknameModal(true)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all"
                >
                  🏆 {lang === "ko" ? "랭킹 등록하기!" : "Register Ranking!"}
                </button>
              )}
              </div>
          )}

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                {lang === "ko" ? "명예의전당" : "Hall of Fame"}
              </h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm transition-colors">
                🔄 {lang === "ko" ? "새로고침" : "Refresh"}
              </button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🖱️</div>
                <p className="text-dark-400">{t.noRecords}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" :
                    index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" :
                    index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"
                    }`}>{index + 1}</div>
                    <span className="text-base  flex-shrink-0">{getCountryFlag(entry.country)}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
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
                      <div className="text-white font-bold">{entry.score.toFixed(1)} CPS</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유용 카드 (숨김) */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: "600" }}>🖱️ CPS 테스트</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px 16px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px", lineHeight: "1" }}>{getGrade(cps).emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", marginBottom: "8px", color: cps >= 16 ? "#67e8f9" : cps >= 12 ? "#c084fc" : cps >= 9 ? "#60a5fa" : "#fbbf24" }}>
                {getGrade(cps).grade}
              </div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa" }}>
                {cps.toFixed(1)}<span style={{ fontSize: "18px", color: "#7c3aed" }}> CPS</span>
              </div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>{clicks} 클릭 / {duration}초</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                <div style={{ color: "#67e8f9", fontSize: "10px", fontWeight: "bold" }}>🏆 Best CPS</div>
                <div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold", marginTop: "2px" }}>{bestCps.toFixed(1)}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/cps")}&bgcolor=ffffff&color=1a1a2e&margin=0`} alt="QR" width={70} height={70} crossOrigin="anonymous" style={{ display: "block" }} />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px", fontWeight: "600" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}>
              <span>{new Date().toLocaleDateString("ko-KR")}</span>
              <span style={{ color: "#8b5cf6", fontWeight: "600" }}>slox.co.kr/cps</span>
            </div>
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
                      const myRank = leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => cps > e.score) === -1 ? leaderboard.length + 1 : leaderboard.findIndex(e => cps > e.score) + 1;
                      const isFirstPlace = leaderboard.length === 0 || cps > leaderboard[0].score;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : myRank <= 3 ? "🏆" : myRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : myRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? (lang === "ko" ? "🔥 새로운 1등!" : "🔥 New #1!") : (lang === "ko" ? `현재 ${myRank}위!` : `Rank #${myRank}!`)}
                          </h3>
                          <p className="text-dark-400 text-sm">{cps.toFixed(1)} CPS</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && cps <= leaderboard[0].score && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.currentFirst}</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score} CPS</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.myRecord}</p>
                          <p className="text-purple-400 font-bold">{cps.toFixed(1)} CPS</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      {lang === "ko" ? "랭킹 등록하기!" : "Register Ranking!"}
                    </span>
                  </button>
                  <button onClick={shareResult} className="w-full mt-2 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all border border-dark-600">
                    <span className="flex items-center justify-center gap-2">
                      <span>📤</span>
                      {showCopied ? "✅ 복사됨!" : (lang === "ko" ? "친구에게 공유하기" : "Share with friends")}
                    </span>
                  </button>
                  <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">
                    {lang === "ko" ? "나중에 할게요" : "Maybe later"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{getGrade(cps).emoji}</div>
                  <h3 className="text-white text-xl font-bold mb-2">🏆 {lang === "ko" ? "랭킹 등록" : "Register Ranking"}</h3>
                  <p className="text-dark-400 text-sm">{cps.toFixed(1)} CPS ({duration}{lang === "ko" ? "초" : "s"})</p>
                </div>
                <div className="mb-4">
                  <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder={lang === "ko" ? "닉네임 입력..." : "Enter nickname..."} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-accent-purple" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
                </div>
                <div className="relative mb-4">
                  <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white appearance-none focus:outline-none focus:border-accent-purple">
                    {COUNTRY_OPTIONS.map((option) => (<option key={option.code} value={option.code}>{option.flag} {option.name[lang]}</option>))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-dark-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl">{lang === "ko" ? "취소" : "Cancel"}</button>
                  <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : lang === "ko" ? "등록!" : "Submit!"}</button>
                </div>
              </div>
            </div>
          )}

          {/* 🎮 CPS란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>⚡</span> CPS(Clicks Per Second)란?
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              CPS는 1초당 클릭 횟수를 나타내는 지표입니다. 마인크래프트 PvP, 클리커 게임 등에서 
              높은 CPS는 큰 장점이 됩니다. 평균 CPS는 6~8이며, 10+ CPS는 상위권입니다.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-blue-400 font-medium">🎮 마인크래프트</p>
                <p className="text-dark-400 mt-1">PvP 전투에서 데미지 우위</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">🏆 경쟁</p>
                <p className="text-dark-400 mt-1">클리커 게임 랭킹 도전</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">{t.tierNote}</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">16+ CPS</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">12~15 CPS</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">9~11 CPS</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">7~8 CPS</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">5~6 CPS</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">3~4 CPS</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">2 CPS</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">1 CPS</span>
              </div>
            </div>
            
            {/* 클릭 방법 안내 */}
            <div className="mt-6 p-4 bg-dark-800/50 rounded-lg">
              <p className="text-white font-medium mb-2">{t.clickMethods}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-dark-400">{t.normalClick}</p>
                <p className="text-dark-400">{t.jitterClick}</p>
                <p className="text-dark-400">{t.butterflyClick}</p>
                <p className="text-dark-400">{t.dragClick}</p>
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
                href="/typing"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.typingTest}
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

