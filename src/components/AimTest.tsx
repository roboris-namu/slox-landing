"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

interface AimLeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  accuracy: number;
  avg_time: number | null;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  country?: string;
}

type GameState = "waiting" | "playing" | "result";
type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
type Difficulty = "easy" | "normal" | "hard";

// 파티클 타입
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

// 히트 마커 타입 (명중 표시)
interface HitMarker {
  id: number;
  x: number;
  y: number;
  type: "hit" | "miss";
}

// 히트 링 이펙트
interface HitRing {
  id: number;
  x: number;
  y: number;
  color: string;
}

const translations = {
  ko: {
    title: "에임",
    titleHighlight: " 트레이너",
    subtitle: "나타나는 타겟을 최대한 빠르고 정확하게 클릭하세요!",
    badge: "🎯 에임 테스트",
    clickToStart: "클릭하여 시작",
    ready: "준비되셨나요?",
    timeLeft: "남은 시간",
    hits: "명중",
    misses: "미스",
    seconds: "초",
    accuracy: "정확도",
    avgTime: "평균 반응",
    totalHits: "총 명중",
    score: "점수",
    difficulty: "난이도",
    easy: "쉬움",
    normal: "보통",
    hard: "어려움",
    tryAgain: "다시 도전",
    share: "📤 공유하기",
    tierTable: "🎮 에임 등급표",
    otherTools: "🔗 다른 도구",
    reactionTest: "⚡ 반응속도 테스트",
    cpsTest: "🖱️ CPS 테스트",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    slogan: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    adArea: "광고 영역 (Google AdSense)",
    shareText: "🎯 에임 테스트 결과!",
    shareTestIt: "나도 테스트하기 👉",
    copied: "결과가 클립보드에 복사되었습니다!",
    targetSize: "타겟 크기",
    challenger: "챌린저",
    master: "마스터",
    diamond: "다이아몬드",
    platinum: "플래티넘",
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
    iron: "아이언",
    msgChallenger: "발로란트 레디언트급!",
    msgMaster: "프로게이머 수준!",
    msgDiamond: "상위권 에임!",
    msgPlatinum: "좋은 에임!",
    msgGold: "괜찮은 에임!",
    msgSilver: "평균적인 에임",
    msgBronze: "조금 더 연습해봐요",
    msgIron: "연습이 필요해요!",
  },
  en: {
    title: "Aim",
    titleHighlight: " Trainer",
    subtitle: "Click the targets as fast and accurately as possible!",
    badge: "🎯 Aim Test",
    clickToStart: "Click to Start",
    ready: "Are you ready?",
    timeLeft: "Time Left",
    hits: "Hits",
    misses: "Misses",
    seconds: "sec",
    accuracy: "Accuracy",
    avgTime: "Avg Time",
    totalHits: "Total Hits",
    score: "Score",
    difficulty: "Difficulty",
    easy: "Easy",
    normal: "Normal",
    hard: "Hard",
    tryAgain: "Try Again",
    share: "📤 Share",
    tierTable: "🎮 Aim Tier Chart",
    otherTools: "🔗 Other Tools",
    reactionTest: "⚡ Reaction Test",
    cpsTest: "🖱️ CPS Test",
    backToMain: "← Home",
    poweredBy: "Powered by",
    slogan: "Web · App · AI Chatbot Development",
    adArea: "Ad Space (Google AdSense)",
    shareText: "🎯 Aim Test Result!",
    shareTestIt: "Try it yourself 👉",
    copied: "Result copied to clipboard!",
    targetSize: "Target Size",
    challenger: "Challenger",
    master: "Master",
    diamond: "Diamond",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
    iron: "Iron",
    msgChallenger: "Valorant Radiant level!",
    msgMaster: "Pro gamer skills!",
    msgDiamond: "Top-tier aim!",
    msgPlatinum: "Good aim!",
    msgGold: "Decent aim!",
    msgSilver: "Average aim",
    msgBronze: "Keep practicing!",
    msgIron: "More practice needed!",
  },
  ja: {
    title: "エイム",
    titleHighlight: " トレーナー",
    subtitle: "ターゲットをできるだけ速く正確にクリック！",
    badge: "🎯 エイムテスト",
    clickToStart: "クリックしてスタート",
    ready: "準備はいいですか？",
    timeLeft: "残り時間",
    hits: "命中",
    misses: "ミス",
    seconds: "秒",
    accuracy: "正確度",
    avgTime: "平均時間",
    totalHits: "総命中",
    score: "スコア",
    difficulty: "難易度",
    easy: "簡単",
    normal: "普通",
    hard: "難しい",
    tryAgain: "再挑戦",
    share: "📤 共有",
    tierTable: "🎮 エイムランク表",
    otherTools: "🔗 他のツール",
    reactionTest: "⚡ 反応速度テスト",
    cpsTest: "🖱️ CPSテスト",
    backToMain: "← ホームへ",
    poweredBy: "Powered by",
    slogan: "ウェブ・アプリ・AIチャットボット開発",
    adArea: "広告エリア (Google AdSense)",
    shareText: "🎯 エイムテスト結果！",
    shareTestIt: "あなたも挑戦 👉",
    copied: "結果がクリップボードにコピーされました！",
    targetSize: "ターゲットサイズ",
    challenger: "チャレンジャー",
    master: "マスター",
    diamond: "ダイヤモンド",
    platinum: "プラチナ",
    gold: "ゴールド",
    silver: "シルバー",
    bronze: "ブロンズ",
    iron: "アイアン",
    msgChallenger: "ヴァロラント レディアント級！",
    msgMaster: "プロゲーマーレベル！",
    msgDiamond: "上位のエイム！",
    msgPlatinum: "良いエイム！",
    msgGold: "なかなかのエイム！",
    msgSilver: "平均的なエイム",
    msgBronze: "練習を続けて！",
    msgIron: "もっと練習が必要！",
  },
  zh: {
    title: "瞄准",
    titleHighlight: " 训练",
    subtitle: "尽快准确地点击目标！",
    badge: "🎯 瞄准测试",
    clickToStart: "点击开始",
    ready: "准备好了吗？",
    timeLeft: "剩余时间",
    hits: "命中",
    misses: "失误",
    seconds: "秒",
    accuracy: "准确度",
    avgTime: "平均时间",
    totalHits: "总命中",
    score: "分数",
    difficulty: "难度",
    easy: "简单",
    normal: "普通",
    hard: "困难",
    tryAgain: "再试一次",
    share: "📤 分享",
    tierTable: "🎮 瞄准等级表",
    otherTools: "🔗 其他工具",
    reactionTest: "⚡ 反应速度测试",
    cpsTest: "🖱️ CPS测试",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    slogan: "网站·应用·AI聊天机器人开发",
    adArea: "广告区域 (Google AdSense)",
    shareText: "🎯 瞄准测试结果！",
    shareTestIt: "你也来试试 👉",
    copied: "结果已复制到剪贴板！",
    targetSize: "目标大小",
    challenger: "挑战者",
    master: "大师",
    diamond: "钻石",
    platinum: "铂金",
    gold: "黄金",
    silver: "白银",
    bronze: "青铜",
    iron: "黑铁",
    msgChallenger: "无畏契约 光芒级！",
    msgMaster: "职业选手水平！",
    msgDiamond: "顶级瞄准！",
    msgPlatinum: "好瞄准！",
    msgGold: "不错的瞄准！",
    msgSilver: "平均水平",
    msgBronze: "继续练习！",
    msgIron: "需要更多练习！",
  },
  es: {
    title: "Entrenador",
    titleHighlight: " de Puntería",
    subtitle: "¡Haz clic en los objetivos lo más rápido y preciso posible!",
    badge: "🎯 Test de Puntería",
    clickToStart: "Clic para Empezar",
    ready: "¿Estás listo?",
    timeLeft: "Tiempo Restante",
    hits: "Aciertos",
    misses: "Fallos",
    seconds: "seg",
    accuracy: "Precisión",
    avgTime: "Tiempo Promedio",
    totalHits: "Total Aciertos",
    score: "Puntuación",
    difficulty: "Dificultad",
    easy: "Fácil",
    normal: "Normal",
    hard: "Difícil",
    tryAgain: "Intentar de Nuevo",
    share: "📤 Compartir",
    tierTable: "🎮 Tabla de Rangos",
    otherTools: "🔗 Otras Herramientas",
    reactionTest: "⚡ Test de Reacción",
    cpsTest: "🖱️ Test CPS",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    slogan: "Desarrollo Web · Apps · Chatbots IA",
    adArea: "Espacio Publicitario (Google AdSense)",
    shareText: "🎯 ¡Resultado del Test de Puntería!",
    shareTestIt: "¡Pruébalo tú también! 👉",
    copied: "¡Resultado copiado al portapapeles!",
    targetSize: "Tamaño del Objetivo",
    challenger: "Aspirante",
    master: "Maestro",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
    iron: "Hierro",
    msgChallenger: "¡Nivel Radiante de Valorant!",
    msgMaster: "¡Nivel de pro gamer!",
    msgDiamond: "¡Puntería de élite!",
    msgPlatinum: "¡Buena puntería!",
    msgGold: "¡Puntería decente!",
    msgSilver: "Puntería promedio",
    msgBronze: "¡Sigue practicando!",
    msgIron: "¡Necesitas más práctica!",
  },
  pt: {
    title: "Treinador",
    titleHighlight: " de Mira",
    subtitle: "Clique nos alvos o mais rápido e preciso possível!",
    badge: "🎯 Teste de Mira",
    clickToStart: "Clique para Começar",
    ready: "Você está pronto?",
    timeLeft: "Tempo Restante",
    hits: "Acertos",
    misses: "Erros",
    seconds: "seg",
    accuracy: "Precisão",
    avgTime: "Tempo Médio",
    totalHits: "Total de Acertos",
    score: "Pontuação",
    difficulty: "Dificuldade",
    easy: "Fácil",
    normal: "Normal",
    hard: "Difícil",
    tryAgain: "Tentar Novamente",
    share: "📤 Compartilhar",
    tierTable: "🎮 Tabela de Ranks",
    otherTools: "🔗 Outras Ferramentas",
    reactionTest: "⚡ Teste de Reação",
    cpsTest: "🖱️ Teste CPS",
    backToMain: "← Início",
    poweredBy: "Powered by",
    slogan: "Desenvolvimento Web · Apps · Chatbots IA",
    adArea: "Espaço Publicitário (Google AdSense)",
    shareText: "🎯 Resultado do Teste de Mira!",
    shareTestIt: "Experimente você também! 👉",
    copied: "Resultado copiado para a área de transferência!",
    targetSize: "Tamanho do Alvo",
    challenger: "Desafiante",
    master: "Mestre",
    diamond: "Diamante",
    platinum: "Platina",
    gold: "Ouro",
    silver: "Prata",
    bronze: "Bronze",
    iron: "Ferro",
    msgChallenger: "Nível Radiante do Valorant!",
    msgMaster: "Nível de pro gamer!",
    msgDiamond: "Mira de elite!",
    msgPlatinum: "Boa mira!",
    msgGold: "Mira decente!",
    msgSilver: "Mira média",
    msgBronze: "Continue praticando!",
    msgIron: "Precisa de mais prática!",
  },
  de: {
    title: "Aim",
    titleHighlight: " Trainer",
    subtitle: "Klicke die Ziele so schnell und präzise wie möglich!",
    badge: "🎯 Aim Test",
    clickToStart: "Klicken zum Starten",
    ready: "Bist du bereit?",
    timeLeft: "Verbleibende Zeit",
    hits: "Treffer",
    misses: "Fehler",
    seconds: "Sek",
    accuracy: "Genauigkeit",
    avgTime: "Durchschnittszeit",
    totalHits: "Gesamt Treffer",
    score: "Punktzahl",
    difficulty: "Schwierigkeit",
    easy: "Leicht",
    normal: "Normal",
    hard: "Schwer",
    tryAgain: "Nochmal Versuchen",
    share: "📤 Teilen",
    tierTable: "🎮 Aim Rang-Tabelle",
    otherTools: "🔗 Andere Tools",
    reactionTest: "⚡ Reaktionstest",
    cpsTest: "🖱️ CPS Test",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    slogan: "Web · App · KI-Chatbot Entwicklung",
    adArea: "Werbefläche (Google AdSense)",
    shareText: "🎯 Aim Test Ergebnis!",
    shareTestIt: "Probiere es selbst! 👉",
    copied: "Ergebnis in Zwischenablage kopiert!",
    targetSize: "Zielgröße",
    challenger: "Herausforderer",
    master: "Meister",
    diamond: "Diamant",
    platinum: "Platin",
    gold: "Gold",
    silver: "Silber",
    bronze: "Bronze",
    iron: "Eisen",
    msgChallenger: "Valorant Radiant Level!",
    msgMaster: "Pro-Gamer Niveau!",
    msgDiamond: "Elite-Aim!",
    msgPlatinum: "Guter Aim!",
    msgGold: "Ordentlicher Aim!",
    msgSilver: "Durchschnittlicher Aim",
    msgBronze: "Weiter üben!",
    msgIron: "Mehr Übung nötig!",
  },
  fr: {
    title: "Entraîneur",
    titleHighlight: " de Visée",
    subtitle: "Cliquez sur les cibles le plus vite et précisément possible !",
    badge: "🎯 Test de Visée",
    clickToStart: "Cliquez pour Commencer",
    ready: "Êtes-vous prêt ?",
    timeLeft: "Temps Restant",
    hits: "Touches",
    misses: "Ratés",
    seconds: "sec",
    accuracy: "Précision",
    avgTime: "Temps Moyen",
    totalHits: "Total Touches",
    score: "Score",
    difficulty: "Difficulté",
    easy: "Facile",
    normal: "Normal",
    hard: "Difficile",
    tryAgain: "Réessayer",
    share: "📤 Partager",
    tierTable: "🎮 Tableau des Rangs",
    otherTools: "🔗 Autres Outils",
    reactionTest: "⚡ Test de Réaction",
    cpsTest: "🖱️ Test CPS",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    slogan: "Développement Web · Apps · Chatbots IA",
    adArea: "Espace Publicitaire (Google AdSense)",
    shareText: "🎯 Résultat du Test de Visée !",
    shareTestIt: "Essayez vous aussi ! 👉",
    copied: "Résultat copié dans le presse-papiers !",
    targetSize: "Taille de la Cible",
    challenger: "Challenger",
    master: "Maître",
    diamond: "Diamant",
    platinum: "Platine",
    gold: "Or",
    silver: "Argent",
    bronze: "Bronze",
    iron: "Fer",
    msgChallenger: "Niveau Radiant Valorant !",
    msgMaster: "Niveau pro-gamer !",
    msgDiamond: "Visée d'élite !",
    msgPlatinum: "Bonne visée !",
    msgGold: "Visée correcte !",
    msgSilver: "Visée moyenne",
    msgBronze: "Continuez à pratiquer !",
    msgIron: "Plus de pratique nécessaire !",
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
  ko: "/aim", en: "/en/aim", ja: "/ja/aim", zh: "/zh/aim",
  es: "/es/aim", pt: "/pt/aim", de: "/de/aim", fr: "/fr/aim",
};

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

const getCountryFlag = (countryCode: string | null | undefined): string => {
  if (!countryCode) return "🌍";
  const country = COUNTRY_OPTIONS.find(c => c.code === countryCode);
  return country?.flag || "🌍";
};

const difficultySettings: Record<Difficulty, { size: number; duration: number }> = {
  easy: { size: 60, duration: 30 },
  normal: { size: 40, duration: 30 },
  hard: { size: 25, duration: 30 },
};

interface AimTestProps {
  initialLang: Language;
}

export default function AimTest({ initialLang }: AimTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [targetAppearTime, setTargetAppearTime] = useState(0);
  const [lang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  
  // 🔥 박진감 효과를 위한 새로운 상태들
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hitMarkers, setHitMarkers] = useState<HitMarker[]>([]);
  const [hitRings, setHitRings] = useState<HitRing[]>([]);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [targetScale, setTargetScale] = useState(1);
  const [showComboEffect, setShowComboEffect] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // 리더보드 상태
  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<AimLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[lang]);

  const t = translations[lang];
  const settings = difficultySettings[difficulty];

  useEffect(() => { setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window); }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("aim_leaderboard").select("*").order("score", { ascending: false }).limit(10);
      const { count } = await supabase.from("aim_leaderboard").select("*", { count: "exact", head: true });
      if (error) throw error;
      if (data) setLeaderboard(data);
      if (count !== null) setTotalCount(count);
    } catch (err) { console.error("리더보드 로드 실패:", err); }
  }, []);

  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const currentScore = getScore(); // getScore() 사용!
    const gradeInfo = getGrade(currentScore);
    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
    const avgTime = reactionTimes.length > 0 ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) : null;
    // 백분위 계산: 8000+ = 1%, 6000+ = 5%, 4500+ = 15%, 3000+ = 30%, 2000+ = 50%, 1000+ = 70%, 500+ = 85%, 나머지 = 95%
    const percentile = currentScore >= 8000 ? 1 : currentScore >= 6000 ? 5 : currentScore >= 4500 ? 15 : currentScore >= 3000 ? 30 : currentScore >= 2000 ? 50 : currentScore >= 1000 ? 70 : currentScore >= 500 ? 85 : 95;
    try {
      const { error } = await supabase.from("aim_leaderboard").insert({ 
        nickname: nickname.trim().slice(0, 20), 
        score: currentScore, 
        accuracy, 
        avg_time: avgTime, 
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
    } catch (err) { console.error("등록 실패:", err); alert("등록 실패!"); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 오버 0.8초 후 자동 랭킹 등록 팝업
  useEffect(() => {
    if (state === "result" && !hasSubmittedScore && hits > 0) {
      const timer = setTimeout(() => { setShowRankingPrompt(true); }, 800);
      return () => clearTimeout(timer);
    }
  }, [state, hasSubmittedScore, hits]);

  // 🔊 오디오 컨텍스트 초기화
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 🔊 사운드 효과 재생 함수
  const playSound = useCallback((type: "hit" | "miss" | "combo" | "start" | "end") => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      switch (type) {
        case "hit":
          // 타격음 - 짧고 묵직한 퍽!
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(150, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case "miss":
          // 미스음 - 날카로운 삑
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case "combo":
          // 콤보음 - 상승하는 화음
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(440, ctx.currentTime);
          oscillator.frequency.setValueAtTime(554, ctx.currentTime + 0.05);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "start":
          // 시작음 - 긴장감 있는 카운트다운
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case "end":
          // 종료음 - 결과 발표
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.5);
          break;
      }
    } catch {
      // 오디오 재생 실패 시 무시
    }
  }, [getAudioContext]);

  // 💥 파티클 생성 함수 - 더 화려하게!
  const createParticles = useCallback((x: number, y: number, isHit: boolean) => {
    const colors = isHit 
      ? ["#22c55e", "#10b981", "#fbbf24", "#f59e0b", "#fff", "#84cc16"]  // 초록+노랑+흰색
      : ["#ef4444", "#dc2626", "#7f1d1d"];
    const count = isHit ? 20 : 8;
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: isHit ? Math.random() * 12 + 6 : Math.random() * 8 + 4,
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
        velocity: isHit ? Math.random() * 150 + 100 : Math.random() * 80 + 40,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.includes(p))), 500);
  }, []);

  // ✖️ 히트 마커 생성
  const createHitMarker = useCallback((x: number, y: number, type: "hit" | "miss") => {
    const marker: HitMarker = { id: Date.now(), x, y, type };
    setHitMarkers(prev => [...prev, marker]);
    setTimeout(() => setHitMarkers(prev => prev.filter(m => m.id !== marker.id)), 350);
  }, []);

  // 🔵 히트 링 생성 (원형 파동)
  const createHitRing = useCallback((x: number, y: number, isHit: boolean) => {
    const colors = isHit 
      ? ["#22c55e", "#10b981", "#34d399"] 
      : ["#ef4444", "#f87171"];
    const ring: HitRing = { 
      id: Date.now(), 
      x, 
      y, 
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setHitRings(prev => [...prev, ring]);
    setTimeout(() => setHitRings(prev => prev.filter(r => r.id !== ring.id)), 400);
  }, []);

  // 📳 화면 흔들림 효과
  const triggerScreenShake = useCallback(() => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 100);
  }, []);

  // 점수 계산 (명중수 * 정확도 * 속도보너스)
  // 일반적인 에임 트레이너 기준:
  // - 30초에 40+ 타겟 = 상급
  // - 정확도 90%+ = 상급
  // - 평균 반응시간 400ms 이하 = 상급
  const getScore = useCallback(() => {
    if (hits === 0) return 0;
    const accuracy = hits / (hits + misses);
    const avgTime = reactionTimes.length > 0 
      ? reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length 
      : 1000;
    
    // 속도 보너스: 400ms 이하면 보너스, 800ms 이상이면 페널티
    const speedMultiplier = Math.max(0.5, Math.min(1.5, (800 - avgTime) / 400 + 1));
    
    // 기본 점수 = 명중수 * 100 * 정확도 * 속도배율
    return Math.round(hits * 100 * accuracy * speedMultiplier);
  }, [hits, misses, reactionTimes]);

  // 정확도 계산
  const getAccuracy = useCallback(() => {
    if (hits + misses === 0) return 0;
    return Math.round((hits / (hits + misses)) * 100);
  }, [hits, misses]);

  // 평균 반응 시간
  const getAvgTime = useCallback(() => {
    if (reactionTimes.length === 0) return 0;
    return Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
  }, [reactionTimes]);

  // 등급 계산 (일반적인 에임 트레이너 기준)
  // 전설: 30초에 50+ 타겟, 95%+ 정확도, 350ms 이하 = ~7500점
  // 프로: 30초에 45+ 타겟, 90%+ 정확도, 400ms = ~5500점
  // 다이아: 30초에 40+ 타겟, 85%+ 정확도 = ~4000점
  // 골드: 30초에 30+ 타겟, 80%+ 정확도 = ~2500점
  // 실버: 30초에 20+ 타겟, 70%+ 정확도 = ~1500점
  const getGrade = useCallback((score: number): { grade: string; color: string; emoji: string; message: string } => {
    if (score >= 8000) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (score >= 6000) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (score >= 4500) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (score >= 3000) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (score >= 2000) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (score >= 1000) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (score >= 500) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  }, [t]);

  // 새 타겟 위치 생성
  const generateNewTarget = useCallback(() => {
    const padding = settings.size / 2 + 10;
    const x = padding + Math.random() * (100 - padding * 2);
    const y = padding + Math.random() * (100 - padding * 2);
    setTargetPos({ x, y });
    setTargetAppearTime(Date.now());
    // 타겟 등장 애니메이션
    setTargetScale(0);
    setTimeout(() => setTargetScale(1), 50);
  }, [settings.size]);

  // 게임 시작
  const startGame = useCallback(() => {
    setState("playing");
    setHits(0);
    setMisses(0);
    setCombo(0);
    setMaxCombo(0);
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    setTimeLeft(settings.duration);
    setReactionTimes([]);
    setParticles([]);
    setHitMarkers([]);
    generateNewTarget();
    playSound("start");

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setState("result");
          playSound("end");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [settings.duration, generateNewTarget, playSound]);

  // 🎯 타겟 클릭 - 박진감 넘치는 효과!
  const handleTargetClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (state !== "playing") return;
    
    const reactionTime = Date.now() - targetAppearTime;
    setReactionTimes(prev => [...prev, reactionTime]);
    setHits(prev => prev + 1);
    
    // 콤보 증가
    const newCombo = combo + 1;
    setCombo(newCombo);
    if (newCombo > maxCombo) setMaxCombo(newCombo);
    
    // 💥 효과들! - 타겟 중심 위치 계산
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      // 타겟 중심 좌표 (%, 픽셀로 변환)
      const targetCenterX = (targetPos.x / 100) * rect.width;
      const targetCenterY = (targetPos.y / 100) * rect.height;
      
      // 타겟 중심에 효과!
      createParticles(targetCenterX, targetCenterY, true);
      createHitMarker(targetCenterX, targetCenterY, "hit");
      createHitRing(targetCenterX, targetCenterY, true);
    }
    
    playSound("hit");
    triggerScreenShake();
    
    // 🔥 콤보 효과 (5콤보마다)
    if (newCombo > 0 && newCombo % 5 === 0) {
      playSound("combo");
      setShowComboEffect(true);
      setTimeout(() => setShowComboEffect(false), 500);
    }
    
    generateNewTarget();
  }, [state, targetAppearTime, targetPos, generateNewTarget, combo, maxCombo, playSound, triggerScreenShake, createParticles, createHitMarker, createHitRing]);

  // ❌ 미스 클릭
  const handleMissClick = useCallback((e: React.MouseEvent) => {
    if (state !== "playing") return;
    setMisses(prev => prev + 1);
    setCombo(0); // 콤보 리셋
    
    // 미스 효과 - 클릭 위치에
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticles(x, y, false);
      createHitMarker(x, y, "miss");
      createHitRing(x, y, false);
    }
    
    playSound("miss");
  }, [state, playSound, createParticles, createHitMarker, createHitRing]);

  // 게임 영역 클릭
  const handleGameAreaClick = useCallback((e: React.MouseEvent) => {
    if (state === "waiting") {
      startGame();
    } else if (state === "playing") {
      handleMissClick(e);
    }
  }, [state, startGame, handleMissClick]);

  // 결과 저장
  useEffect(() => {
    if (state === "result") {
      const score = getScore();
      if (score > bestScore) {
        setBestScore(score);
      }
    }
  }, [state, getScore, bestScore]);

  // 리셋
  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState("waiting");
    setHits(0);
    setMisses(0);
    setTimeLeft(settings.duration);
    setReactionTimes([]);
    setParticles([]);
    setHitMarkers([]);
    setHitRings([]);
    setCombo(0);
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
    const gradeInfo = getGrade(getScore());
    const shareUrl = "https://www.slox.co.kr/aim";
    const myScore = getScore();
    
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const isNewFirst = !firstPlace || myScore > firstPlace.score;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => myScore > e.score) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => myScore > e.score) + 1);
    
    const text = `🎯 조준 테스트 결과!\n\n${gradeInfo.emoji} ${gradeInfo.grade}\n📊 ${myScore}점 ${isNewFirst ? "🔥 새로운 1등!" : `(현재 ${myRank}위)`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlace.score}점)\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`;
    
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

    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `aim-${getScore()}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🎯 조준 테스트! ${shareUrl}` };
      const canShare = typeof navigator.canShare === "function" ? navigator.canShare(shareData) : false;
      if (canShare) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `aim-test-${getScore()}.png`;
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
                  <span>{langFlags[lang]}</span>
                  <span className="text-dark-300 hidden sm:inline">{langNames[lang]}</span>
                  <svg className="w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
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

          {/* 난이도 선택 */}
          {state === "waiting" && (
            <div className="flex justify-center gap-3 mb-8">
              {(["easy", "normal", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    difficulty === d
                      ? "bg-accent-purple text-white"
                      : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                  }`}
                >
                  {t[d]}
                  <span className="text-xs ml-1 opacity-60">({difficultySettings[d].size}px)</span>
                </button>
              ))}
            </div>
          )}

          {/* 게임 상태 표시 */}
          {state === "playing" && (
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <p className="text-dark-400 text-sm">{t.timeLeft}</p>
                <p className="text-2xl font-bold text-white">{timeLeft}{t.seconds}</p>
              </div>
              <div className="text-center">
                <p className="text-dark-400 text-sm">{t.hits}</p>
                <p className="text-2xl font-bold text-green-400">{hits}</p>
              </div>
              <div className="text-center">
                <p className="text-dark-400 text-sm">{t.misses}</p>
                <p className="text-2xl font-bold text-red-400">{misses}</p>
              </div>
            </div>
          )}

          {/* 💡 에임 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-white font-medium mb-1">에임 향상 팁</p>
                <p className="text-dark-400 text-sm">
                  타겟을 예측하지 말고 눈으로 확인 후 클릭하세요. 
                  팔꿈치를 고정하고 손목만 움직이면 정확도가 올라갑니다!
                </p>
              </div>
            </div>
          </div>

          {/* 게임 영역 */}
          <div
            ref={gameAreaRef}
            onClick={handleGameAreaClick}
            className={`relative bg-dark-900 rounded-2xl cursor-crosshair select-none mb-8 overflow-hidden transition-transform ${
              screenShake ? "animate-screen-shake" : ""
            }`}
            style={{ height: "400px" }}
          >
            {/* 💥 파티클 효과 - 폭발! */}
            {particles.map((particle) => {
              const tx = Math.cos(particle.angle) * particle.velocity;
              const ty = Math.sin(particle.angle) * particle.velocity;
              return (
              <div
                key={particle.id}
                  className="absolute pointer-events-none animate-aim-particle"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: "50%",
                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    "--tx": `${tx}px`,
                    "--ty": `${ty}px`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* 🔵 히트 링 (원형 파동) */}
            {hitRings.map((ring) => (
              <div
                key={ring.id}
                className="absolute pointer-events-none rounded-full border-4 animate-hit-ring"
                style={{
                  left: ring.x,
                  top: ring.y,
                  width: 60,
                  height: 60,
                  borderColor: ring.color,
                  boxShadow: `0 0 20px ${ring.color}`,
                }}
              />
            ))}

            {/* ✖️ 히트 마커 */}
            {hitMarkers.map((marker) => (
              <div
                key={marker.id}
                className={`absolute pointer-events-none text-5xl font-black animate-hit-marker ${
                  marker.type === "hit" ? "text-green-400" : "text-red-400"
                }`}
                style={{
                  left: marker.x,
                  top: marker.y,
                }}
              >
                {marker.type === "hit" ? "✓" : "✗"}
              </div>
            ))}

            {/* 🔥 콤보 효과 */}
            {showComboEffect && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 animate-combo-burst">
                  🔥 {combo} COMBO!
                </div>
              </div>
            )}

            {/* 콤보 카운터 (플레이 중) */}
            {state === "playing" && combo > 0 && (
              <div className="absolute top-4 right-4 z-10">
                <div className={`px-4 py-2 rounded-xl font-bold text-xl ${
                  combo >= 10 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse" :
                  combo >= 5 ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-dark-800/80 text-dark-300"
                }`}>
                  {combo >= 10 ? "🔥" : combo >= 5 ? "⚡" : ""} {combo}x
                </div>
              </div>
            )}

            {state === "waiting" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-7xl mb-4 animate-float">🎯</div>
                <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                <p className="text-dark-400">{t.clickToStart}</p>
                <p className="text-dark-500 text-xs mt-4 animate-pulse">👆 클릭하여 시작!</p>
              </div>
            )}

            {state === "playing" && (
              <div
                onClick={handleTargetClick}
                className="absolute bg-gradient-to-br from-red-500 to-orange-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-red-500/50 hover:shadow-red-500/80 transition-all animate-target-appear"
                style={{
                  width: settings.size,
                  height: settings.size,
                  left: `${targetPos.x}%`,
                  top: `${targetPos.y}%`,
                  transform: `translate(-50%, -50%) scale(${targetScale})`,
                }}
              >
                {/* 타겟 외곽 글로우 */}
                <div className="absolute -inset-1 bg-red-500/30 rounded-full animate-ping" />
                {/* 타겟 내부 링 */}
                <div className="absolute inset-1 border-2 border-white/40 rounded-full" />
                <div className="absolute inset-2 bg-white rounded-full opacity-30" />
                {/* 중앙 점 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                </div>
              </div>
            )}

            {state === "result" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl mb-2 animate-bounce-in">{getGrade(getScore()).emoji}</div>
                <p className={`text-xl font-bold ${getGrade(getScore()).color} mb-2 animate-fade-in`}>
                  {getGrade(getScore()).grade}
                </p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2 animate-scale-in">
                  {getScore()}
                </p>
                <p className="text-dark-400 mb-2">{getGrade(getScore()).message}</p>
                {maxCombo > 0 && (
                  <p className="text-orange-400 text-sm">🔥 최대 콤보: {maxCombo}x</p>
                )}
              </div>
            )}
          </div>

          {/* 결과 */}
          {state === "result" && (
            <div className="glass-card p-6 rounded-2xl mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.score}</p>
                  <p className="text-2xl font-bold text-accent-purple">{getScore()}</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.accuracy}</p>
                  <p className="text-2xl font-bold text-green-400">{getAccuracy()}%</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.totalHits}</p>
                  <p className="text-2xl font-bold text-accent-cyan">{hits}</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.avgTime}</p>
                  <p className="text-2xl font-bold text-yellow-400">{getAvgTime()}ms</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={shareResult} className="flex-1 px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{showCopied ? "✅ 복사됨!" : t.share}</button>
                <button onClick={shareAsImage} className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">🖼️ 이미지 공유</button>
                <button onClick={resetGame} className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.tryAgain}</button>
              </div>
              {!hasSubmittedScore && getScore() > 0 && (
                <button onClick={() => setShowNicknameModal(true)} className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">🏆 랭킹 등록!</button>
              )}
            </div>
          )}

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> {lang === "ko" ? "명예의전당" : "Hall of Fame"}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">🔄 {lang === "ko" ? "새로고침" : "Refresh"}</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">🎯</div><p className="text-dark-400">{lang === "ko" ? "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!" : "No records yet. Be the first challenger!"}</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCountryFlag(entry.country)}</span>
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          entry.grade === t.challenger ? "text-cyan-300" :
                          entry.grade === t.master ? "text-purple-400" :
                          entry.grade === t.diamond ? "text-blue-400" :
                          entry.grade === t.platinum ? "text-teal-400" :
                          entry.grade === t.gold ? "text-yellow-400" :
                          entry.grade === t.silver ? "text-gray-300" :
                          entry.grade === t.bronze ? "text-orange-400" :
                          "text-stone-400"
                        }>{entry.grade || getGrade(entry.score).grade}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score}점</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>🎯 에임 테스트</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{getGrade(getScore()).emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: getScore() >= 7000 ? "#67e8f9" : getScore() >= 5000 ? "#c084fc" : "#60a5fa" }}>{getGrade(getScore()).grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{getScore()}<span style={{ fontSize: "18px", color: "#7c3aed" }}> 점</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>정확도 {getAccuracy()}% / 평균 {getAvgTime()}ms</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}><div style={{ color: "#67e8f9", fontSize: "10px" }}>🔥 최대 콤보</div><div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{maxCombo}x</div></div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/aim")}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 나도 도전!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}><span>{new Date().toLocaleDateString("ko-KR")}</span><span style={{ color: "#8b5cf6" }}>slox.co.kr/aim</span></div>
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
                      const currentScore = getScore();
                      const myRank = leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => currentScore > e.score) === -1 ? leaderboard.length + 1 : leaderboard.findIndex(e => currentScore > e.score) + 1;
                      const isFirstPlace = leaderboard.length === 0 || currentScore > leaderboard[0].score;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : myRank <= 3 ? "🏆" : myRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : myRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? "🔥 새로운 1등!" : `현재 ${myRank}위!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{currentScore}점</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && getScore() <= leaderboard[0].score && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score}점</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-purple-400 font-bold">{getScore()}점</p>
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
                <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade(getScore()).emoji}</div><h3 className="text-white text-xl font-bold">🏆 {lang === "ko" ? "랭킹 등록" : lang === "ja" ? "ランキング登録" : "Hall of Fame"}</h3><p className="text-dark-400 text-sm">{getScore()}{lang === "ko" ? "점" : "pts"}</p></div>
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder={lang === "ko" ? "닉네임..." : "Nickname..."} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-4" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
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

          {/* 🎮 에임 트레이닝이란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🖱️</span> 에임 트레이닝이란?
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              에임 트레이닝은 FPS 게임에서 중요한 마우스 정확도와 반응속도를 향상시키는 연습입니다.
              꾸준한 트레이닝으로 발로란트, 오버워치, 배그 등에서 실력을 올릴 수 있습니다.
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-dark-800/50 p-2 rounded-lg text-center">
                <p className="text-red-400 font-medium">🎯 정확도</p>
                <p className="text-dark-400 mt-1">타겟 명중률</p>
              </div>
              <div className="bg-dark-800/50 p-2 rounded-lg text-center">
                <p className="text-orange-400 font-medium">⚡ 속도</p>
                <p className="text-dark-400 mt-1">반응 시간</p>
              </div>
              <div className="bg-dark-800/50 p-2 rounded-lg text-center">
                <p className="text-yellow-400 font-medium">🔥 일관성</p>
                <p className="text-dark-400 mt-1">꾸준한 성능</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">💡 점수 = 명중수 × 정확도 × 속도보너스</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">8000+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">6000+</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">4500+</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">3000+</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">2000+</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">1000+</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">500+</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">0+</span>
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
                href={lang === "ko" ? "/cps" : `/${lang}/cps`}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.cpsTest}
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

