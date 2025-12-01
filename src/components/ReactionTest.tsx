"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

type GameState = "waiting" | "ready" | "click" | "result" | "tooEarly";
type Language = "ko" | "en" | "ja" | "zh";

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
};

// 언어별 국기 이모지
const langFlags: Record<Language, string> = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

const langNames: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

const langUrls: Record<Language, string> = {
  ko: "/reaction",
  en: "/en/reaction",
  ja: "/ja/reaction",
  zh: "/zh/reaction",
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
  const [lang, setLang] = useState<Language>(initialLang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const t = translations[lang];

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
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setState("click");
      setStartTime(Date.now());
    }, delay);
  }, []);

  // 클릭 처리
  const handleClick = useCallback(() => {
    if (state === "waiting") {
      startGame();
    } else if (state === "ready") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setState("tooEarly");
    } else if (state === "click") {
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setAttempts(prev => [...prev, reaction]);
      setState("result");
    } else if (state === "result" || state === "tooEarly") {
      startGame();
    }
  }, [state, startTime, startGame]);

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

          {/* 광고 영역 (상단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-6">
              {t.adArea}
            </div>
          </div>

          {/* 게임 영역 */}
          <div 
            onClick={handleClick}
            className={`${getBgColor()} rounded-2xl cursor-pointer transition-colors duration-100 select-none mb-8`}
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8">
              {state === "waiting" && (
                <>
                  <p className="text-6xl mb-4">🎯</p>
                  <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                  <p className="text-dark-400">{t.clickToStart}</p>
                </>
              )}
              
              {state === "ready" && (
                <>
                  <p className="text-6xl mb-4">🔴</p>
                  <p className="text-2xl font-bold text-white mb-2">{t.wait}</p>
                  <p className="text-red-200">{t.waitUntilGreen}</p>
                </>
              )}
              
              {state === "click" && (
                <>
                  <p className="text-6xl mb-4">🟢</p>
                  <p className="text-3xl font-bold text-white mb-2">{t.clickNow}</p>
                  <p className="text-green-100">{t.asFastAsPossible}</p>
                </>
              )}
              
              {state === "tooEarly" && (
                <>
                  <p className="text-6xl mb-4">😅</p>
                  <p className="text-2xl font-bold text-white mb-2">{t.tooEarly}</p>
                  <p className="text-yellow-100">{t.waitForGreen}</p>
                  <p className="text-yellow-200 text-sm mt-4">{t.clickToRetry}</p>
                </>
              )}
              
              {state === "result" && (
                <>
                  <p className="text-5xl mb-4">{getGrade(reactionTime).emoji}</p>
                  <p className={`text-xl font-bold ${getGrade(reactionTime).color} mb-2`}>
                    {getGrade(reactionTime).grade}
                  </p>
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                    {reactionTime}ms
                  </p>
                  <p className="text-dark-400 mb-4">{getGrade(reactionTime).message}</p>
                  <p className="text-dark-500 text-sm">{t.clickToRetry}</p>
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

          {/* 광고 영역 (하단) */}
          <div className="mb-8 p-4 bg-dark-900/50 border border-dark-800 rounded-xl text-center">
            <div className="text-dark-500 text-sm py-6">
              {t.adArea}
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

