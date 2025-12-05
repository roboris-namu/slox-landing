"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

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
    legendary: "전설",
    proGamer: "프로게이머",
    veryFast: "매우 빠름",
    fast: "빠름",
    average: "평균",
    slow: "느림",
    msgLegendary: "드래그 클릭 마스터!",
    msgProGamer: "버터플라이 클릭 수준!",
    msgVeryFast: "지터 클릭 실력이네요!",
    msgFast: "꽤 빠른 편이에요!",
    msgAverage: "평균적인 속도예요",
    msgSlow: "연습이 필요해요!",
    clickMethods: "💡 클릭 방법",
    normalClick: "일반 클릭: 4-6 CPS",
    jitterClick: "지터 클릭: 8-12 CPS",
    butterflyClick: "버터플라이: 12-16 CPS",
    dragClick: "드래그 클릭: 20+ CPS",
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
    legendary: "Legendary",
    proGamer: "Pro Gamer",
    veryFast: "Very Fast",
    fast: "Fast",
    average: "Average",
    slow: "Slow",
    msgLegendary: "Drag click master!",
    msgProGamer: "Butterfly click level!",
    msgVeryFast: "Jitter click skills!",
    msgFast: "Pretty fast!",
    msgAverage: "Average speed",
    msgSlow: "Keep practicing!",
    clickMethods: "💡 Click Methods",
    normalClick: "Normal Click: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
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
    legendary: "レジェンド",
    proGamer: "プロゲーマー",
    veryFast: "超速い",
    fast: "速い",
    average: "平均",
    slow: "遅い",
    msgLegendary: "ドラッグクリックマスター！",
    msgProGamer: "バタフライクリックレベル！",
    msgVeryFast: "ジッタークリックスキル！",
    msgFast: "なかなか速い！",
    msgAverage: "平均的な速度",
    msgSlow: "練習が必要！",
    clickMethods: "💡 クリック方法",
    normalClick: "通常クリック: 4-6 CPS",
    jitterClick: "ジッター: 8-12 CPS",
    butterflyClick: "バタフライ: 12-16 CPS",
    dragClick: "ドラッグ: 20+ CPS",
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
    legendary: "传说",
    proGamer: "职业选手",
    veryFast: "非常快",
    fast: "快",
    average: "平均",
    slow: "慢",
    msgLegendary: "拖拽点击大师！",
    msgProGamer: "蝴蝶点击水平！",
    msgVeryFast: "抖动点击技巧！",
    msgFast: "相当快！",
    msgAverage: "平均速度",
    msgSlow: "需要练习！",
    clickMethods: "💡 点击方法",
    normalClick: "普通点击: 4-6 CPS",
    jitterClick: "抖动点击: 8-12 CPS",
    butterflyClick: "蝴蝶点击: 12-16 CPS",
    dragClick: "拖拽点击: 20+ CPS",
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
    legendary: "Legendario",
    proGamer: "Pro Gamer",
    veryFast: "Muy Rápido",
    fast: "Rápido",
    average: "Promedio",
    slow: "Lento",
    msgLegendary: "¡Maestro del drag click!",
    msgProGamer: "¡Nivel butterfly click!",
    msgVeryFast: "¡Habilidades de jitter click!",
    msgFast: "¡Bastante rápido!",
    msgAverage: "Velocidad promedio",
    msgSlow: "¡Sigue practicando!",
    clickMethods: "💡 Métodos de Clic",
    normalClick: "Clic Normal: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
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
    legendary: "Lendário",
    proGamer: "Pro Gamer",
    veryFast: "Muito Rápido",
    fast: "Rápido",
    average: "Médio",
    slow: "Lento",
    msgLegendary: "Mestre do drag click!",
    msgProGamer: "Nível butterfly click!",
    msgVeryFast: "Habilidades de jitter click!",
    msgFast: "Bem rápido!",
    msgAverage: "Velocidade média",
    msgSlow: "Continue praticando!",
    clickMethods: "💡 Métodos de Clique",
    normalClick: "Clique Normal: 4-6 CPS",
    jitterClick: "Jitter Click: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Click: 20+ CPS",
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
    legendary: "Legendär",
    proGamer: "Pro Gamer",
    veryFast: "Sehr Schnell",
    fast: "Schnell",
    average: "Durchschnitt",
    slow: "Langsam",
    msgLegendary: "Drag-Click-Meister!",
    msgProGamer: "Butterfly-Click-Level!",
    msgVeryFast: "Jitter-Click-Fähigkeiten!",
    msgFast: "Ziemlich schnell!",
    msgAverage: "Durchschnittliche Geschwindigkeit",
    msgSlow: "Weiter üben!",
    clickMethods: "💡 Klickmethoden",
    normalClick: "Normal Klick: 4-6 CPS",
    jitterClick: "Jitter Klick: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Klick: 20+ CPS",
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
    legendary: "Légendaire",
    proGamer: "Pro Gamer",
    veryFast: "Très Rapide",
    fast: "Rapide",
    average: "Moyen",
    slow: "Lent",
    msgLegendary: "Maître du drag click !",
    msgProGamer: "Niveau butterfly click !",
    msgVeryFast: "Compétences jitter click !",
    msgFast: "Assez rapide !",
    msgAverage: "Vitesse moyenne",
    msgSlow: "Continuez à pratiquer !",
    clickMethods: "💡 Méthodes de Clic",
    normalClick: "Clic Normal: 4-6 CPS",
    jitterClick: "Jitter Clic: 8-12 CPS",
    butterflyClick: "Butterfly: 12-16 CPS",
    dragClick: "Drag Clic: 20+ CPS",
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
  ko: "/cps", en: "/en/cps", ja: "/ja/cps", zh: "/zh/cps",
  es: "/es/cps", pt: "/pt/cps", de: "/de/cps", fr: "/fr/cps",
};

interface CpsTestProps {
  initialLang: Language;
}

export default function CpsTest({ initialLang }: CpsTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState<Duration>(5);
  const [cps, setCps] = useState(0);
  const [bestCps, setBestCps] = useState(0);
  const [lang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const t = translations[lang];

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
    if (cpsValue >= 16) return { grade: t.legendary, color: "text-cyan-300", emoji: "🐉", message: t.msgLegendary };
    if (cpsValue >= 12) return { grade: t.proGamer, color: "text-purple-400", emoji: "👑", message: t.msgProGamer };
    if (cpsValue >= 9) return { grade: t.veryFast, color: "text-blue-400", emoji: "⚡", message: t.msgVeryFast };
    if (cpsValue >= 7) return { grade: t.fast, color: "text-green-400", emoji: "🚀", message: t.msgFast };
    if (cpsValue >= 4) return { grade: t.average, color: "text-yellow-400", emoji: "👍", message: t.msgAverage };
    return { grade: t.slow, color: "text-orange-400", emoji: "🐢", message: t.msgSlow };
  };

  // 게임 시작
  const startGame = useCallback(() => {
    setState("playing");
    setClicks(0);
    setTimeLeft(duration);
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

  // 공유
  const shareResult = async () => {
    const grade = getGrade(cps);
    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const shareText = `${t.shareText}

${grade.emoji} ${cps.toFixed(1)} CPS (${grade.grade})
🖱️ ${t.totalClicks}: ${clicks}
⏱️ ${t.duration}: ${duration}${t.seconds}

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
                  {t.tryAgain}
                </button>
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
            <h3 className="text-white font-medium mb-6 text-center">{t.tierTable}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-center">
                <span className="text-cyan-300 font-bold">🐉 16+ CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.legendary}</p>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg text-center">
                <span className="text-purple-400 font-bold">👑 12-15 CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.proGamer}</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg text-center">
                <span className="text-blue-400 font-bold">⚡ 9-11 CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.veryFast}</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg text-center">
                <span className="text-green-400 font-bold">🚀 7-8 CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.fast}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-center">
                <span className="text-yellow-400 font-bold">👍 4-6 CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.average}</p>
              </div>
              <div className="p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg text-center">
                <span className="text-orange-400 font-bold">🐢 1-3 CPS</span>
                <p className="text-dark-400 text-xs mt-1">{t.slow}</p>
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
