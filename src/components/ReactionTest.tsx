"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

type GameState = "waiting" | "ready" | "click" | "result" | "tooEarly";
type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

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

// 번역 데이터
const translations = {
  ko: {
    title: "반응속도",
    titleHighlight: " 테스트",
    subtitle: "초록색이 되면 최대한 빠르게 클릭하세요!",
    badge: "⚡ 반응속도 측정",
    ready: "준비되셨나요?",
    clickToStart: "클릭하여 시작하세요",
    wait: "기다리세요...",
    waitUntilGreen: "초록색이 될 때까지 기다리세요!",
    clickNow: "지금 클릭!",
    asFastAsPossible: "최대한 빠르게!",
    tooEarly: "너무 빨랐어요!",
    waitForGreen: "초록색이 될 때까지 기다리세요",
    clickToRetry: "클릭하여 다시 시도",
    current: "현재",
    average: "평균",
    best: "최고",
    recentRecords: "최근 기록",
    times: "회",
    share: "📤 공유하기",
    reset: "🔄 기록 초기화",
    tierTable: "🎮 반응속도 티어표",
    mobileStandard: "📱 모바일 기준",
    desktopStandard: "🖥️ 데스크톱 기준",
    mobileNote: "💡 모바일 터치 반응 시간을 고려한 기준입니다",
    desktopNote: "💡 평균 반응속도는 약 250~300ms (골드~실버) 입니다",
    otherTools: "🔗 다른 도구",
    typingTest: "⌨️ 타자 속도 테스트",
    salaryCalc: "💰 연봉 실수령액 계산기",
    severanceCalc: "💼 퇴직금 계산기",
    backToMain: "← 메인으로",
    poweredBy: "Powered by",
    slogan: "홈페이지 · 앱 제작 · AI 챗봇 구축",
    adArea: "광고 영역 (Google AdSense)",
    shareText: "⚡ 반응속도 테스트 결과!",
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
    msgChallenger: "전설의 반응속도!",
    msgMaster: "인간의 한계를 넘었어요!",
    msgDiamond: "프로게이머 수준!",
    msgPlatinum: "상위권 반응속도!",
    msgGold: "평균보다 빠르네요!",
    msgSilver: "평균적인 속도예요",
    msgBronze: "조금 느린 편이에요",
    msgIron: "연습이 필요해요!",
  },
  en: {
    title: "Reaction",
    titleHighlight: " Speed Test",
    subtitle: "Click as fast as you can when it turns green!",
    badge: "⚡ Reaction Speed Test",
    ready: "Are you ready?",
    clickToStart: "Click to start",
    wait: "Wait...",
    waitUntilGreen: "Wait until it turns green!",
    clickNow: "Click Now!",
    asFastAsPossible: "As fast as possible!",
    tooEarly: "Too early!",
    waitForGreen: "Wait for green",
    clickToRetry: "Click to try again",
    current: "Current",
    average: "Average",
    best: "Best",
    recentRecords: "Recent Records",
    times: " tries",
    share: "📤 Share",
    reset: "🔄 Reset",
    tierTable: "🎮 Reaction Speed Tiers",
    mobileStandard: "📱 Mobile Standard",
    desktopStandard: "🖥️ Desktop Standard",
    mobileNote: "💡 Adjusted for mobile touch response time",
    desktopNote: "💡 Average reaction speed is about 250-300ms (Gold-Silver)",
    otherTools: "🔗 Other Tools",
    typingTest: "⌨️ Typing Speed Test",
    salaryCalc: "💰 Salary Calculator",
    severanceCalc: "💼 Severance Calculator",
    backToMain: "← Home",
    poweredBy: "Powered by",
    slogan: "Web · App · AI Chatbot Development",
    adArea: "Ad Space (Google AdSense)",
    shareText: "⚡ Reaction Speed Test Result!",
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
    msgChallenger: "Legendary reflexes!",
    msgMaster: "Beyond human limits!",
    msgDiamond: "Pro gamer level!",
    msgPlatinum: "Top-tier speed!",
    msgGold: "Faster than average!",
    msgSilver: "Average speed",
    msgBronze: "A bit slow",
    msgIron: "Keep practicing!",
  },
  ja: {
    title: "反応速度",
    titleHighlight: " テスト",
    subtitle: "緑色になったらできるだけ速くクリック！",
    badge: "⚡ 反応速度測定",
    ready: "準備はいいですか？",
    clickToStart: "クリックしてスタート",
    wait: "待って...",
    waitUntilGreen: "緑色になるまで待ってください！",
    clickNow: "今すぐクリック！",
    asFastAsPossible: "できるだけ速く！",
    tooEarly: "早すぎました！",
    waitForGreen: "緑色になるまで待ってください",
    clickToRetry: "クリックして再挑戦",
    current: "現在",
    average: "平均",
    best: "最高",
    recentRecords: "最近の記録",
    times: "回",
    share: "📤 共有",
    reset: "🔄 リセット",
    tierTable: "🎮 反応速度ティア表",
    mobileStandard: "📱 モバイル基準",
    desktopStandard: "🖥️ デスクトップ基準",
    mobileNote: "💡 モバイルタッチの反応時間を考慮した基準です",
    desktopNote: "💡 平均反応速度は約250-300ms（ゴールド〜シルバー）です",
    otherTools: "🔗 他のツール",
    typingTest: "⌨️ タイピングテスト",
    salaryCalc: "💰 年収計算機",
    severanceCalc: "💼 退職金計算機",
    backToMain: "← ホームへ",
    poweredBy: "Powered by",
    slogan: "ウェブ・アプリ・AIチャットボット開発",
    adArea: "広告エリア (Google AdSense)",
    shareText: "⚡ 反応速度テスト結果！",
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
    msgChallenger: "伝説の反応速度！",
    msgMaster: "人間の限界を超えた！",
    msgDiamond: "プロゲーマーレベル！",
    msgPlatinum: "上位の反応速度！",
    msgGold: "平均より速い！",
    msgSilver: "平均的な速度",
    msgBronze: "少し遅め",
    msgIron: "練習が必要！",
  },
  zh: {
    title: "反应速度",
    titleHighlight: " 测试",
    subtitle: "变绿时尽快点击！",
    badge: "⚡ 反应速度测试",
    ready: "准备好了吗？",
    clickToStart: "点击开始",
    wait: "等待...",
    waitUntilGreen: "等到变绿！",
    clickNow: "现在点击！",
    asFastAsPossible: "尽快！",
    tooEarly: "太早了！",
    waitForGreen: "等到变绿",
    clickToRetry: "点击重试",
    current: "当前",
    average: "平均",
    best: "最佳",
    recentRecords: "最近记录",
    times: "次",
    share: "📤 分享",
    reset: "🔄 重置",
    tierTable: "🎮 反应速度等级表",
    mobileStandard: "📱 移动端标准",
    desktopStandard: "🖥️ 桌面端标准",
    mobileNote: "💡 已考虑移动端触控反应时间",
    desktopNote: "💡 平均反应速度约250-300ms（黄金-白银）",
    otherTools: "🔗 其他工具",
    typingTest: "⌨️ 打字速度测试",
    salaryCalc: "💰 工资计算器",
    severanceCalc: "💼 遣散费计算器",
    backToMain: "← 首页",
    poweredBy: "Powered by",
    slogan: "网站·应用·AI聊天机器人开发",
    adArea: "广告区域 (Google AdSense)",
    shareText: "⚡ 反应速度测试结果！",
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
    msgChallenger: "传说级反应速度！",
    msgMaster: "超越人类极限！",
    msgDiamond: "职业选手水平！",
    msgPlatinum: "顶级反应速度！",
    msgGold: "比平均快！",
    msgSilver: "平均速度",
    msgBronze: "有点慢",
    msgIron: "需要练习！",
  },
  es: {
    title: "Test de",
    titleHighlight: " Velocidad de Reacción",
    subtitle: "¡Haz clic lo más rápido posible cuando se ponga verde!",
    badge: "⚡ Test de Reacción",
    ready: "¿Estás listo?",
    clickToStart: "Haz clic para comenzar",
    wait: "Espera...",
    waitUntilGreen: "¡Espera hasta que se ponga verde!",
    clickNow: "¡Haz clic ahora!",
    asFastAsPossible: "¡Lo más rápido posible!",
    tooEarly: "¡Demasiado pronto!",
    waitForGreen: "Espera el verde",
    clickToRetry: "Clic para reintentar",
    current: "Actual",
    average: "Promedio",
    best: "Mejor",
    recentRecords: "Registros recientes",
    times: " intentos",
    share: "📤 Compartir",
    reset: "🔄 Reiniciar",
    tierTable: "🎮 Tabla de Rangos",
    mobileStandard: "📱 Estándar Móvil",
    desktopStandard: "🖥️ Estándar Escritorio",
    mobileNote: "💡 Ajustado para tiempo de respuesta táctil móvil",
    desktopNote: "💡 La velocidad promedio es de 250-300ms (Oro-Plata)",
    otherTools: "🔗 Otras Herramientas",
    typingTest: "⌨️ Test de Velocidad de Escritura",
    salaryCalc: "💰 Calculadora de Salario",
    severanceCalc: "💼 Calculadora de Indemnización",
    backToMain: "← Inicio",
    poweredBy: "Powered by",
    slogan: "Desarrollo Web · Apps · Chatbots IA",
    adArea: "Espacio Publicitario (Google AdSense)",
    shareText: "⚡ ¡Resultado del Test de Reacción!",
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
    msgChallenger: "¡Reflejos legendarios!",
    msgMaster: "¡Más allá de los límites humanos!",
    msgDiamond: "¡Nivel de jugador profesional!",
    msgPlatinum: "¡Velocidad de élite!",
    msgGold: "¡Más rápido que el promedio!",
    msgSilver: "Velocidad promedio",
    msgBronze: "Un poco lento",
    msgIron: "¡Sigue practicando!",
  },
  pt: {
    title: "Teste de",
    titleHighlight: " Velocidade de Reação",
    subtitle: "Clique o mais rápido possível quando ficar verde!",
    badge: "⚡ Teste de Reação",
    ready: "Você está pronto?",
    clickToStart: "Clique para começar",
    wait: "Espere...",
    waitUntilGreen: "Espere até ficar verde!",
    clickNow: "Clique agora!",
    asFastAsPossible: "O mais rápido possível!",
    tooEarly: "Muito cedo!",
    waitForGreen: "Espere o verde",
    clickToRetry: "Clique para tentar novamente",
    current: "Atual",
    average: "Média",
    best: "Melhor",
    recentRecords: "Registros recentes",
    times: " tentativas",
    share: "📤 Compartilhar",
    reset: "🔄 Reiniciar",
    tierTable: "🎮 Tabela de Ranks",
    mobileStandard: "📱 Padrão Mobile",
    desktopStandard: "🖥️ Padrão Desktop",
    mobileNote: "💡 Ajustado para tempo de resposta tátil móvel",
    desktopNote: "💡 A velocidade média é de 250-300ms (Ouro-Prata)",
    otherTools: "🔗 Outras Ferramentas",
    typingTest: "⌨️ Teste de Digitação",
    salaryCalc: "💰 Calculadora de Salário",
    severanceCalc: "💼 Calculadora de Rescisão",
    backToMain: "← Início",
    poweredBy: "Powered by",
    slogan: "Desenvolvimento Web · Apps · Chatbots IA",
    adArea: "Espaço Publicitário (Google AdSense)",
    shareText: "⚡ Resultado do Teste de Reação!",
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
    msgChallenger: "Reflexos lendários!",
    msgMaster: "Além dos limites humanos!",
    msgDiamond: "Nível de jogador profissional!",
    msgPlatinum: "Velocidade de elite!",
    msgGold: "Mais rápido que a média!",
    msgSilver: "Velocidade média",
    msgBronze: "Um pouco lento",
    msgIron: "Continue praticando!",
  },
  de: {
    title: "Reaktionszeit",
    titleHighlight: " Test",
    subtitle: "Klicke so schnell wie möglich, wenn es grün wird!",
    badge: "⚡ Reaktionstest",
    ready: "Bist du bereit?",
    clickToStart: "Klicke zum Starten",
    wait: "Warte...",
    waitUntilGreen: "Warte bis es grün wird!",
    clickNow: "Jetzt klicken!",
    asFastAsPossible: "So schnell wie möglich!",
    tooEarly: "Zu früh!",
    waitForGreen: "Warte auf Grün",
    clickToRetry: "Klicke zum Wiederholen",
    current: "Aktuell",
    average: "Durchschnitt",
    best: "Beste",
    recentRecords: "Letzte Ergebnisse",
    times: " Versuche",
    share: "📤 Teilen",
    reset: "🔄 Zurücksetzen",
    tierTable: "🎮 Rang-Tabelle",
    mobileStandard: "📱 Mobil-Standard",
    desktopStandard: "🖥️ Desktop-Standard",
    mobileNote: "💡 Angepasst für mobile Touch-Reaktionszeit",
    desktopNote: "💡 Durchschnittliche Reaktionszeit ist 250-300ms (Gold-Silber)",
    otherTools: "🔗 Andere Tools",
    typingTest: "⌨️ Tippgeschwindigkeitstest",
    salaryCalc: "💰 Gehaltsrechner",
    severanceCalc: "💼 Abfindungsrechner",
    backToMain: "← Startseite",
    poweredBy: "Powered by",
    slogan: "Web · App · KI-Chatbot Entwicklung",
    adArea: "Werbefläche (Google AdSense)",
    shareText: "⚡ Reaktionstest Ergebnis!",
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
    msgChallenger: "Legendäre Reflexe!",
    msgMaster: "Über menschliche Grenzen hinaus!",
    msgDiamond: "Pro-Gamer Niveau!",
    msgPlatinum: "Elite-Geschwindigkeit!",
    msgGold: "Schneller als der Durchschnitt!",
    msgSilver: "Durchschnittliche Geschwindigkeit",
    msgBronze: "Etwas langsam",
    msgIron: "Weiter üben!",
  },
  fr: {
    title: "Test de",
    titleHighlight: " Temps de Réaction",
    subtitle: "Cliquez le plus vite possible quand ça devient vert !",
    badge: "⚡ Test de Réaction",
    ready: "Êtes-vous prêt ?",
    clickToStart: "Cliquez pour commencer",
    wait: "Attendez...",
    waitUntilGreen: "Attendez que ça devienne vert !",
    clickNow: "Cliquez maintenant !",
    asFastAsPossible: "Le plus vite possible !",
    tooEarly: "Trop tôt !",
    waitForGreen: "Attendez le vert",
    clickToRetry: "Cliquez pour réessayer",
    current: "Actuel",
    average: "Moyenne",
    best: "Meilleur",
    recentRecords: "Résultats récents",
    times: " essais",
    share: "📤 Partager",
    reset: "🔄 Réinitialiser",
    tierTable: "🎮 Tableau des Rangs",
    mobileStandard: "📱 Standard Mobile",
    desktopStandard: "🖥️ Standard Bureau",
    mobileNote: "💡 Ajusté pour le temps de réponse tactile mobile",
    desktopNote: "💡 La vitesse moyenne est de 250-300ms (Or-Argent)",
    otherTools: "🔗 Autres Outils",
    typingTest: "⌨️ Test de Vitesse de Frappe",
    salaryCalc: "💰 Calculateur de Salaire",
    severanceCalc: "💼 Calculateur d'Indemnité",
    backToMain: "← Accueil",
    poweredBy: "Powered by",
    slogan: "Développement Web · Apps · Chatbots IA",
    adArea: "Espace Publicitaire (Google AdSense)",
    shareText: "⚡ Résultat du Test de Réaction !",
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
    msgChallenger: "Réflexes légendaires !",
    msgMaster: "Au-delà des limites humaines !",
    msgDiamond: "Niveau pro-gamer !",
    msgPlatinum: "Vitesse d'élite !",
    msgGold: "Plus rapide que la moyenne !",
    msgSilver: "Vitesse moyenne",
    msgBronze: "Un peu lent",
    msgIron: "Continuez à pratiquer !",
  },
};

// 언어별 국기 이모지
const langFlags: Record<Language, string> = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵",
  zh: "🇨🇳",
  es: "🇪🇸",
  pt: "🇧🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
};

const langNames: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  fr: "Français",
};

const langUrls: Record<Language, string> = {
  ko: "/reaction",
  en: "/en/reaction",
  ja: "/ja/reaction",
  zh: "/zh/reaction",
  es: "/es/reaction",
  pt: "/pt/reaction",
  de: "/de/reaction",
  fr: "/fr/reaction",
};

interface ReactionTestProps {
  initialLang: Language;
}

export default function ReactionTest({ initialLang }: ReactionTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showExplosion, setShowExplosion] = useState(false);
  const [balloonScale, setBalloonScale] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const t = translations[lang];

  // 오디오 컨텍스트 초기화
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 사운드 효과 재생 함수
  const playSound = useCallback((type: "pop" | "success" | "fail" | "ready") => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      switch (type) {
        case "pop":
          // 풍선 터지는 소리 - 짧고 날카로운 팡!
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case "success":
          // 성공 사운드 - 상승하는 음
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.4);
          break;
        case "fail":
          // 실패 사운드 - 하강하는 음
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(300, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
        case "ready":
          // 준비 사운드 - 긴장감 있는 틱
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(440, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.05);
          break;
      }
    } catch {
      // 오디오 재생 실패 시 무시
    }
  }, [getAudioContext]);

  // 파티클 생성 함수
  const createParticles = useCallback((x: number, y: number, count: number = 20) => {
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6b9d", "#c44dff", "#00d4ff"];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
        velocity: Math.random() * 150 + 100,
      });
    }
    
    setParticles(newParticles);
    
    // 파티클 제거
    setTimeout(() => setParticles([]), 600);
  }, []);

  // 폭발 효과
  const triggerExplosion = useCallback((e?: React.MouseEvent) => {
    setShowExplosion(true);
    setBalloonScale(1.3);
    
    // 클릭 위치에 파티클 생성
    if (e && gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createParticles(x, y, 25);
    } else {
      // 중앙에 파티클 생성
      createParticles(200, 150, 25);
    }
    
    setTimeout(() => {
      setShowExplosion(false);
      setBalloonScale(1);
    }, 300);
  }, [createParticles]);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * 등급 계산 (롤 스타일) - 모바일/데스크톱 분리 + 다국어
   */
  const getGrade = (ms: number): { grade: string; color: string; emoji: string; message: string } => {
    if (isMobile) {
      if (ms < 200) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
      if (ms < 280) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
      if (ms < 360) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
      if (ms < 450) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
      if (ms < 550) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
      if (ms < 700) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
      if (ms < 900) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
      return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
    }
    if (ms < 120) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (ms < 150) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (ms < 180) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (ms < 220) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (ms < 270) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (ms < 330) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (ms < 400) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  };

  // 게임 시작
  const startGame = useCallback(() => {
    setState("ready");
    playSound("ready");
    setBalloonScale(1);
    
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setState("click");
      setStartTime(Date.now());
      // 풍선 커지는 애니메이션
      setBalloonScale(1.1);
    }, delay);
  }, [playSound]);

  // 클릭 처리
  const handleClick = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (state === "waiting") {
      startGame();
    } else if (state === "ready") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      playSound("fail");
      setState("tooEarly");
    } else if (state === "click") {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setAttempts(prev => [...prev, reaction]);
      
      // 🎈 풍선 터지는 효과!
      playSound("pop");
      triggerExplosion(e);
      
      setTimeout(() => {
        playSound("success");
        setState("result");
      }, 150);
    } else if (state === "result" || state === "tooEarly") {
      startGame();
    }
  }, [state, startTime, startGame, playSound, triggerExplosion]);

  // 리셋
  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState("waiting");
    setReactionTime(0);
    setAttempts([]);
  };

  // 평균 계산
  const getAverage = (): number => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  // 최고 기록
  const getBest = (): number => {
    if (attempts.length === 0) return 0;
    return Math.min(...attempts);
  };

  // 공유하기
  const shareResult = async () => {
    const avg = getAverage();
    const best = getBest();
    const lastGrade = getGrade(reactionTime);
    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const shareText = `${t.shareText}

${lastGrade.emoji} ${t.current}: ${reactionTime}ms (${lastGrade.grade})
🎯 ${t.average}: ${avg}ms
🏆 ${t.best}: ${best}ms

${t.shareTestIt}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
          url: shareUrl
        });
      } catch {
        // 공유 취소시 무시
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert(t.copied);
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 상태별 배경색
  const getBgColor = (): string => {
    switch (state) {
      case "waiting": return "bg-dark-900";
      case "ready": return "bg-red-600";
      case "click": return "bg-green-500";
      case "result": return "bg-dark-900";
      case "tooEarly": return "bg-yellow-600";
      default: return "bg-dark-900";
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
              <Link 
                href="/"
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
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
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* 💡 반응속도 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-white font-medium mb-1">반응속도 향상 팁</p>
                <p className="text-dark-400 text-sm">
                  화면 중앙에 집중하고, 손가락을 마우스/화면 위에 준비하세요. 
                  꾸준한 연습으로 반응속도가 향상됩니다!
                </p>
              </div>
            </div>
          </div>

          {/* 게임 영역 */}
          <div 
            ref={gameAreaRef}
            onClick={handleClick}
            className={`${getBgColor()} rounded-2xl cursor-pointer transition-colors duration-100 select-none mb-8 relative overflow-hidden`}
            style={{ minHeight: "300px" }}
          >
            {/* 파티클 효과 */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute pointer-events-none animate-particle-burst"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: "50%",
                  transform: `translate(-50%, -50%)`,
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  ["--angle" as string]: `${particle.angle}rad`,
                  ["--velocity" as string]: `${particle.velocity}px`,
                }}
              />
            ))}

            {/* 폭발 링 효과 */}
            {showExplosion && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="animate-explosion-ring w-32 h-32 rounded-full border-4 border-white/50" />
                <div className="animate-explosion-ring-delay w-24 h-24 rounded-full border-4 border-yellow-400/50 absolute" />
              </div>
            )}

            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8 relative z-10">
              {state === "waiting" && (
                <>
                  <div 
                    className="text-7xl mb-4 transition-transform duration-200 hover:scale-110 animate-float"
                    style={{ transform: `scale(${balloonScale})` }}
                  >
                    🎈
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                  <p className="text-dark-400">{t.clickToStart}</p>
                  <p className="text-dark-500 text-xs mt-2 animate-pulse">👆 탭하여 시작!</p>
                </>
              )}
              
              {state === "ready" && (
                <>
                  <div 
                    className="text-7xl mb-4 transition-transform duration-300 animate-balloon-grow"
                    style={{ transform: `scale(${balloonScale})` }}
                  >
                    🎈
                  </div>
                  <p className="text-2xl font-bold text-white mb-2 animate-pulse">{t.wait}</p>
                  <p className="text-red-200">{t.waitUntilGreen}</p>
                  <div className="flex gap-1 mt-4">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </>
              )}
              
              {state === "click" && (
                <>
                  <div 
                    className="text-8xl mb-4 transition-transform duration-100 animate-balloon-pulse cursor-pointer"
                    style={{ transform: `scale(${balloonScale})` }}
                  >
                    🎈
                  </div>
                  <p className="text-3xl font-bold text-white mb-2 animate-bounce">{t.clickNow}</p>
                  <p className="text-green-100">{t.asFastAsPossible}</p>
                  <p className="text-green-200 text-lg mt-2 animate-pulse">💥 팡!</p>
                </>
              )}
              
              {state === "tooEarly" && (
                <>
                  <div className="text-7xl mb-4 animate-shake">💨</div>
                  <p className="text-2xl font-bold text-white mb-2">{t.tooEarly}</p>
                  <p className="text-yellow-100">{t.waitForGreen}</p>
                  <p className="text-yellow-200 text-sm mt-4">{t.clickToRetry}</p>
                </>
              )}
              
              {state === "result" && (
                <>
                  <div className="text-6xl mb-4 animate-bounce-in">
                    {getGrade(reactionTime).emoji}
                  </div>
                  <p className={`text-xl font-bold ${getGrade(reactionTime).color} mb-2 animate-fade-in`}>
                    {getGrade(reactionTime).grade}
                  </p>
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2 animate-scale-in">
                    {reactionTime}ms
                  </p>
                  <p className="text-dark-400 mb-4">{getGrade(reactionTime).message}</p>
                  <p className="text-dark-500 text-sm animate-pulse">{t.clickToRetry}</p>
                </>
              )}
            </div>
          </div>

          {/* 기록 */}
          {attempts.length > 0 && (
            <div className="glass-card p-6 rounded-2xl mb-8">
              {/* 결과 요약 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.current}</p>
                  <p className="text-2xl font-bold text-white">{reactionTime}ms</p>
                  <p className={`text-xs ${getGrade(reactionTime).color}`}>{getGrade(reactionTime).grade}</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.average}</p>
                  <p className="text-2xl font-bold text-accent-cyan">{getAverage()}ms</p>
                </div>
                <div className="text-center p-4 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-sm mb-1">{t.best}</p>
                  <p className="text-2xl font-bold text-accent-purple">{getBest()}ms</p>
                </div>
              </div>
              
              {/* 최근 기록 */}
              <div className="mb-6">
                <p className="text-dark-400 text-sm mb-2">{t.recentRecords} ({attempts.length}{t.times})</p>
                <div className="flex flex-wrap gap-2">
                  {attempts.slice(-10).map((time, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        time === getBest() 
                          ? "bg-accent-purple/20 text-accent-purple" 
                          : "bg-dark-800 text-dark-300"
                      }`}
                    >
                      {time}ms
                    </span>
                  ))}
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={shareResult}
                  className="flex-1 px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all"
                >
                  {t.share}
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
                >
                  {t.reset}
                </button>
              </div>
            </div>
          )}

          {/* 🎮 반응속도란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🧠</span> 반응속도란?
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              반응속도는 시각적 자극을 인지하고 신체가 반응하기까지 걸리는 시간입니다. 
              평균적인 사람의 반응속도는 200~300ms이며, 프로게이머는 150ms 이하를 기록하기도 합니다.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">⚡ 게임에서</p>
                <p className="text-dark-400 mt-1">FPS, 격투 게임에서 승패를 좌우</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">🚗 일상에서</p>
                <p className="text-dark-400 mt-1">운전, 스포츠 등 순간 판단력</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 (롤 스타일 - 계층형) */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-accent-cyan text-xs text-center mb-6">
              {isMobile ? t.mobileStandard : t.desktopStandard}
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">&lt;{isMobile ? "200" : "120"}ms</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "200~279" : "120~149"}ms</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "280~359" : "150~179"}ms</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "360~449" : "180~219"}ms</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "450~549" : "220~269"}ms</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "550~699" : "270~329"}ms</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "700~899" : "330~399"}ms</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "900" : "400"}ms+</span>
              </div>
            </div>
            <p className="text-dark-500 text-xs mt-6 text-center">
              {isMobile ? t.mobileNote : t.desktopNote}
            </p>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">{t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/typing"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.typingTest}
              </Link>
              <Link 
                href="/salary"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.salaryCalc}
              </Link>
              <Link 
                href="/severance"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.severanceCalc}
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
            <p className="text-dark-500 text-xs mt-2">
              {t.slogan}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

