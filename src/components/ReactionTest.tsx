"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";
import { supabase, LeaderboardEntry } from "@/lib/supabase";

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
    saveImage: "🖼️ 이미지 공유",
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
    // 팁 & 설명
    tipTitle: "반응속도 향상 팁",
    tipContent: "화면 중앙에 집중하고, 손가락을 마우스/화면 위에 준비하세요. 꾸준한 연습으로 반응속도가 향상됩니다!",
    tapToStart: "👆 탭하여 시작!",
    whatIsReaction: "반응속도란?",
    reactionDescription: "반응속도는 시각적 자극을 인지하고 신체가 반응하기까지 걸리는 시간입니다. 평균적인 사람의 반응속도는 200~300ms이며, 프로게이머는 150ms 이하를 기록하기도 합니다.",
    inGames: "게임에서",
    inGamesDesc: "FPS, 격투 게임에서 승패를 좌우",
    inDaily: "일상에서",
    inDailyDesc: "운전, 스포츠 등 순간 판단력",
    eventOngoing: "진행중",
    eventPrize: "1등에게 문화상품권 5천원!",
    eventDeadline: "마감까지",
    days: "일",
    hours: "시간", 
    minutes: "분",
    seconds: "초",
    sameTierNote: "📱 모바일 / 🖥️ PC 동일 기준",
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
    saveImage: "🖼️ Share Image",
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
    tipTitle: "Reaction Speed Tips",
    tipContent: "Focus on the center of the screen and keep your finger ready on the mouse/screen. Consistent practice improves reaction speed!",
    tapToStart: "👆 Tap to start!",
    whatIsReaction: "What is Reaction Speed?",
    reactionDescription: "Reaction speed is the time it takes to perceive a visual stimulus and respond physically. Average human reaction time is 200-300ms, while pro gamers can achieve under 150ms.",
    inGames: "In Games",
    inGamesDesc: "Determines victory in FPS and fighting games",
    inDaily: "In Daily Life",
    inDailyDesc: "Quick judgment in driving, sports, etc.",
    eventOngoing: "LIVE",
    eventPrize: "#1 wins $5 Gift Card!",
    eventDeadline: "Ends in",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Same Standard",
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
    saveImage: "🖼️ 画像共有",
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
    tipTitle: "反応速度向上のコツ",
    tipContent: "画面の中央に集中し、指をマウス/画面の上に準備してください。継続的な練習で反応速度が向上します！",
    tapToStart: "👆 タップしてスタート！",
    whatIsReaction: "反応速度とは？",
    reactionDescription: "反応速度とは、視覚的刺激を認識してから身体が反応するまでの時間です。平均的な人の反応速度は200〜300msで、プロゲーマーは150ms以下を記録することもあります。",
    inGames: "ゲームで",
    inGamesDesc: "FPS、格闘ゲームで勝敗を左右",
    inDaily: "日常で",
    inDailyDesc: "運転、スポーツなどの瞬間判断",
    eventOngoing: "開催中",
    eventPrize: "1位に500円ギフトカード!",
    eventDeadline: "締切まで",
    days: "日",
    hours: "時",
    minutes: "分",
    seconds: "秒",
    sameTierNote: "📱 モバイル / 🖥️ PC 同一基準",
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
    saveImage: "🖼️ 分享图片",
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
    tipTitle: "反应速度提升技巧",
    tipContent: "专注于屏幕中央，手指放在鼠标/屏幕上准备好。持续练习可以提高反应速度！",
    tapToStart: "👆 点击开始！",
    whatIsReaction: "什么是反应速度？",
    reactionDescription: "反应速度是感知视觉刺激并做出身体反应所需的时间。普通人的平均反应时间是200-300毫秒，职业玩家可以达到150毫秒以下。",
    inGames: "在游戏中",
    inGamesDesc: "决定FPS和格斗游戏的胜负",
    inDaily: "在日常生活中",
    inDailyDesc: "驾驶、运动等需要快速判断",
    eventOngoing: "进行中",
    eventPrize: "第1名获$5礼品卡!",
    eventDeadline: "截止",
    days: "天",
    hours: "时",
    minutes: "分",
    seconds: "秒",
    sameTierNote: "📱 移动端 / 🖥️ PC 同一标准",
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
    saveImage: "🖼️ Compartir Imagen",
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
    tipTitle: "Consejos para mejorar la velocidad de reacción",
    tipContent: "Concéntrate en el centro de la pantalla y mantén tu dedo listo sobre el ratón/pantalla. ¡La práctica constante mejora la velocidad de reacción!",
    tapToStart: "👆 ¡Toca para empezar!",
    whatIsReaction: "¿Qué es la velocidad de reacción?",
    reactionDescription: "La velocidad de reacción es el tiempo que tarda en percibir un estímulo visual y responder físicamente. El tiempo promedio es de 200-300ms, mientras que los jugadores profesionales pueden lograr menos de 150ms.",
    inGames: "En juegos",
    inGamesDesc: "Determina la victoria en FPS y juegos de lucha",
    inDaily: "En la vida diaria",
    inDailyDesc: "Juicio rápido al conducir, deportes, etc.",
    eventOngoing: "EN VIVO",
    eventPrize: "¡#1 gana $5 Tarjeta Regalo!",
    eventDeadline: "Termina en",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Móvil / 🖥️ PC Mismo Estándar",
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
    saveImage: "🖼️ Compartilhar Imagem",
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
    tipTitle: "Dicas para melhorar a velocidade de reação",
    tipContent: "Concentre-se no centro da tela e mantenha o dedo pronto no mouse/tela. A prática constante melhora a velocidade de reação!",
    tapToStart: "👆 Toque para começar!",
    whatIsReaction: "O que é velocidade de reação?",
    reactionDescription: "A velocidade de reação é o tempo necessário para perceber um estímulo visual e responder fisicamente. O tempo médio é de 200-300ms, enquanto jogadores profissionais podem atingir menos de 150ms.",
    inGames: "Em jogos",
    inGamesDesc: "Determina a vitória em FPS e jogos de luta",
    inDaily: "No dia a dia",
    inDailyDesc: "Julgamento rápido ao dirigir, esportes, etc.",
    eventOngoing: "AO VIVO",
    eventPrize: "#1 ganha R$25 Vale-Presente!",
    eventDeadline: "Termina em",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Mesmo Padrão",
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
    saveImage: "🖼️ Bild teilen",
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
    tipTitle: "Tipps zur Verbesserung der Reaktionszeit",
    tipContent: "Konzentriere dich auf die Bildschirmmitte und halte deinen Finger bereit auf der Maus/dem Bildschirm. Kontinuierliches Üben verbessert die Reaktionszeit!",
    tapToStart: "👆 Tippen zum Starten!",
    whatIsReaction: "Was ist Reaktionszeit?",
    reactionDescription: "Die Reaktionszeit ist die Zeit, die benötigt wird, um einen visuellen Reiz wahrzunehmen und körperlich zu reagieren. Die durchschnittliche Zeit liegt bei 200-300ms, während Profispieler unter 150ms erreichen können.",
    inGames: "In Spielen",
    inGamesDesc: "Entscheidet über Sieg in FPS und Kampfspielen",
    inDaily: "Im Alltag",
    inDailyDesc: "Schnelle Entscheidungen beim Fahren, Sport usw.",
    eventOngoing: "LIVE",
    eventPrize: "#1 gewinnt 5€ Gutschein!",
    eventDeadline: "Endet in",
    days: "T",
    hours: "Std",
    minutes: "Min",
    seconds: "Sek",
    sameTierNote: "📱 Mobil / 🖥️ PC Gleicher Standard",
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
    saveImage: "🖼️ Partager l'image",
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
    tipTitle: "Conseils pour améliorer le temps de réaction",
    tipContent: "Concentrez-vous sur le centre de l'écran et gardez votre doigt prêt sur la souris/l'écran. La pratique régulière améliore le temps de réaction !",
    tapToStart: "👆 Appuyez pour commencer !",
    whatIsReaction: "Qu'est-ce que le temps de réaction ?",
    reactionDescription: "Le temps de réaction est le temps nécessaire pour percevoir un stimulus visuel et réagir physiquement. Le temps moyen est de 200-300ms, tandis que les joueurs professionnels peuvent atteindre moins de 150ms.",
    inGames: "Dans les jeux",
    inGamesDesc: "Détermine la victoire dans les FPS et jeux de combat",
    inDaily: "Au quotidien",
    inDailyDesc: "Jugement rapide en conduite, sports, etc.",
    eventOngoing: "EN DIRECT",
    eventPrize: "#1 gagne 5€ Carte Cadeau!",
    eventDeadline: "Fin dans",
    days: "J",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Même Standard",
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

// 🎁 이벤트 배너 컴포넌트 (실시간 카운트다운 + 현재 1등)
function EventBanner({ lang, leader }: { lang: Language; leader?: { nickname: string; score: number } | null }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const t = translations[lang];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let nextDraw = new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
      if (now.getDate() === 1 && now.getHours() < 10) {
        nextDraw = new Date(now.getFullYear(), now.getMonth(), 1, 10, 0, 0);
      }
      const diff = nextDraw.getTime() - now.getTime();
      if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link 
      href="/event"
      className="block mb-6 p-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/40 rounded-2xl hover:border-yellow-400/60 transition-all group relative overflow-hidden"
    >
      {/* 반짝이 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="relative">
        {/* 상단: EVENT + 마감까지 */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-3xl animate-bounce">🎁</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-black text-lg">EVENT</span>
                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded animate-pulse">{t.eventOngoing}</span>
              </div>
              <p className="text-dark-300 text-sm">
                <span className="text-yellow-400 font-bold">{t.eventPrize}</span>
              </p>
            </div>
          </div>
          
          {/* 자세히 보기 - PC만 */}
          <div className="hidden sm:flex items-center gap-2 text-yellow-400/80 group-hover:text-yellow-300 transition-colors">
            <span className="text-sm font-medium">{lang === "ko" ? "자세히 보기" : "Learn more"}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* 실시간 카운트다운 */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 bg-black/30 rounded-xl p-2 sm:p-3">
          <span className="text-dark-400 text-xs sm:text-sm">⏰ {t.eventDeadline}</span>
          <div className="flex items-center gap-1">
            <div className="bg-dark-800 px-2 py-1 rounded-lg min-w-[40px] text-center">
              <span className="text-yellow-400 font-black text-lg sm:text-xl">{timeLeft.days}</span>
              <span className="text-dark-500 text-[10px] block -mt-1">{t.days}</span>
            </div>
            <span className="text-dark-500 font-bold">:</span>
            <div className="bg-dark-800 px-2 py-1 rounded-lg min-w-[40px] text-center">
              <span className="text-yellow-400 font-black text-lg sm:text-xl">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-dark-500 text-[10px] block -mt-1">{t.hours}</span>
            </div>
            <span className="text-dark-500 font-bold">:</span>
            <div className="bg-dark-800 px-2 py-1 rounded-lg min-w-[40px] text-center">
              <span className="text-yellow-400 font-black text-lg sm:text-xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-dark-500 text-[10px] block -mt-1">{t.minutes}</span>
            </div>
            <span className="text-dark-500 font-bold">:</span>
            <div className="bg-dark-800 px-2 py-1 rounded-lg min-w-[40px] text-center">
              <span className="text-cyan-400 font-black text-lg sm:text-xl animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-dark-500 text-[10px] block -mt-1">{t.seconds}</span>
            </div>
          </div>
        </div>
        
        {/* 현재 1등 정보 + 도전 문구 */}
        <div className="flex items-center justify-center gap-3 mt-3">
          {leader ? (
            <div className="flex items-center gap-2 bg-black/40 rounded-full px-4 py-1.5 border border-yellow-500/20">
              <span className="text-yellow-400">👑</span>
              <span className="text-dark-300 text-sm">
                {lang === "ko" ? "현재 1등" : "Current #1"}:
              </span>
              <span className="text-white font-bold text-sm">{leader.nickname}</span>
              <span className="text-cyan-400 font-black text-sm">{leader.score}ms</span>
            </div>
          ) : (
            <div className="text-dark-400 text-sm">
              🏆 {lang === "ko" ? "아직 1등이 없어요! 첫 1등에 도전하세요!" : "No #1 yet! Be the first!"}
            </div>
          )}
        </div>
        <p className="text-center text-yellow-400/80 text-xs mt-2 font-medium animate-pulse">
          🔥 {lang === "ko" ? "지금 도전해서 1등을 뺏어보세요!" : "Challenge now and take the crown!"}
        </p>
      </div>
    </Link>
  );
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
  // 명예의전당 관련 상태
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 전체 참가자 수
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  
  // 🎉 1등 이벤트 관련 상태
  const [showFirstPlaceModal, setShowFirstPlaceModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [myEntryId, setMyEntryId] = useState<string | null>(null);
  
  // 🚀 자동 랭킹 등록 팝업 상태
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
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
   * 등급 계산 (롤 스타일) - PC/모바일 통일 기준
   * 중간값 적용으로 단순화
   */
  const getGrade = (ms: number): { grade: string; color: string; emoji: string; message: string } => {
    // 통일 기준 (PC/모바일 중간값)
    if (ms < 120) return { grade: t.challenger, color: "text-cyan-300", emoji: "👑", message: t.msgChallenger };
    if (ms < 150) return { grade: t.master, color: "text-purple-400", emoji: "💎", message: t.msgMaster };
    if (ms < 190) return { grade: t.diamond, color: "text-blue-400", emoji: "💠", message: t.msgDiamond };
    if (ms < 240) return { grade: t.platinum, color: "text-teal-400", emoji: "🏆", message: t.msgPlatinum };
    if (ms < 300) return { grade: t.gold, color: "text-yellow-400", emoji: "🥇", message: t.msgGold };
    if (ms < 380) return { grade: t.silver, color: "text-gray-300", emoji: "🥈", message: t.msgSilver };
    if (ms < 480) return { grade: t.bronze, color: "text-orange-400", emoji: "🥉", message: t.msgBronze };
    return { grade: t.iron, color: "text-stone-400", emoji: "🪨", message: t.msgIron };
  };
  
  /**
   * 상위 퍼센트 계산 - PC/모바일 통일 기준
   */
  const getPercentile = (ms: number): number => {
    // 통일 기준
    if (ms < 120) return 0.1;
    if (ms < 150) return 1;
    if (ms < 190) return 5;
    if (ms < 240) return 15;
    if (ms < 300) return 35;
    if (ms < 380) return 60;
    if (ms < 480) return 80;
    return 95;
  };

  // 리더보드 가져오기
  const fetchLeaderboard = useCallback(async () => {
    try {
      // Top 10 가져오기
      const { data, error } = await supabase
        .from("reaction_leaderboard")
        .select("*")
        .order("score", { ascending: true })
        .limit(10);
      
      // 전체 참가자 수 가져오기
      const { count } = await supabase
        .from("reaction_leaderboard")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      if (data) setLeaderboard(data);
      if (count !== null) setTotalCount(count);
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
    }
  }, []);

  // 🎆 폭죽 효과 발사
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    // 중앙 폭죽도 추가
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#FFD700", "#FFA500", "#FF6347", "#FFE4B5", "#00CED1"],
      });
    }, 500);
  }, []);

  // 점수 등록
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    
    // 등록 전에 1등 될지 미리 체크 (현재 리더보드 기준)
    const willBeFirstPlace = leaderboard.length === 0 || reactionTime < leaderboard[0].score;
    
    setIsSubmitting(true);
    try {
      const gradeInfo = getGrade(reactionTime);
      const percentile = getPercentile(reactionTime);
      
      const { data, error } = await supabase
        .from("reaction_leaderboard")
        .insert({
          nickname: nickname.trim().slice(0, 20),
          score: reactionTime,
          grade: gradeInfo.grade,
          percentile: percentile,
          device_type: isMobile ? "mobile" : "pc",
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      
      // 등록된 엔트리 ID 저장
      if (data) {
        setMyEntryId(data.id);
      }
      
      // 1등이면 축하 팝업!
      if (willBeFirstPlace) {
        setShowFirstPlaceModal(true);
        fireConfetti();
      }
      
      fetchLeaderboard();
    } catch (err) {
      console.error("점수 등록 실패:", err);
      alert(lang === "ko" ? "등록 실패! 다시 시도해주세요." : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 📧 이메일 등록 (1등 전용)
  const submitEmail = async () => {
    if (!email.trim() || !myEntryId || isEmailSubmitting) return;
    
    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert(lang === "ko" ? "올바른 이메일 형식을 입력해주세요." : "Please enter a valid email.");
      return;
    }
    
    setIsEmailSubmitting(true);
    try {
      const { error } = await supabase
        .from("reaction_leaderboard")
        .update({ email: email.trim() })
        .eq("id", myEntryId);
      
      if (error) throw error;
      
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowFirstPlaceModal(false);
      }, 2000);
    } catch (err) {
      console.error("이메일 등록 실패:", err);
      alert(lang === "ko" ? "이메일 등록 실패! 다시 시도해주세요." : "Failed to submit email.");
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  // 페이지 로드시 리더보드 가져오기
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);
  
  // 🚀 결과 나오면 0.8초 후 자동 랭킹 등록 팝업 표시
  useEffect(() => {
    if (state === "result" && !hasSubmittedScore && reactionTime > 0) {
      const timer = setTimeout(() => {
        setShowRankingPrompt(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [state, hasSubmittedScore, reactionTime]);

  // 게임 시작
  const startGame = useCallback(() => {
    setState("ready");
    playSound("ready");
    setBalloonScale(1);
    setHasSubmittedScore(false); // 새 게임시 등록 상태 리셋
    setShowRankingPrompt(false); // 랭킹 팝업도 닫기
    
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

  // 이미지 생성 함수
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    
    try {
      shareCardRef.current.style.display = "block";
      
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#0f0d1a",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
      });
      
      shareCardRef.current.style.display = "none";
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      shareCardRef.current.style.display = "none";
      return null;
    }
  };

  // 공유하기 (텍스트 - 풍부한 정보 포함)
  const [showCopied, setShowCopied] = useState(false);
  
  const shareResult = async () => {
    const grade = getGrade(reactionTime);
    const shareUrl = "https://www.slox.co.kr/reaction";
    
    // 1등 정보
    const firstPlace = leaderboard.length > 0 ? leaderboard[0] : null;
    const isNewFirst = !firstPlace || reactionTime < firstPlace.score;
    const myRank = isNewFirst ? 1 : (leaderboard.findIndex(e => reactionTime < e.score) === -1 
      ? leaderboard.length + 1 
      : leaderboard.findIndex(e => reactionTime < e.score) + 1);
    
    // 이벤트 마감일 계산 (2025년 12월 31일)
    const eventEnd = new Date("2025-12-31T23:59:59");
    const now = new Date();
    const msLeft = eventEnd.getTime() - now.getTime();
    const daysLeft = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // 남은 시간 표시 (7일 이하면 시간도 표시)
    const timeLeftText = daysLeft <= 0 
      ? `${hoursLeft}시간` 
      : daysLeft <= 7 
        ? `${daysLeft}일 ${hoursLeft}시간` 
        : `${daysLeft}일`;
    
    // 공유 텍스트 (풍부한 정보)
    const text = lang === "ko"
      ? `⚡ 반응속도 테스트 결과!\n\n${grade.emoji} ${grade.grade} - ${reactionTime}ms\n${isNewFirst ? "🔥 새로운 1등 달성!" : `📊 현재 ${myRank}위`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlace.score}ms)\n\n` : ""}🎁 EVENT! 1등에게 문화상품권 5천원!\n⏰ 마감까지 ${timeLeftText} 남음!\n\n🎮 나도 도전하기 👉 ${shareUrl}`
      : `⚡ Reaction Speed Test!\n\n${grade.emoji} ${grade.grade} - ${reactionTime}ms\n${isNewFirst ? "🔥 New #1!" : `📊 Rank #${myRank}`}\n\n🎁 EVENT! Win a $5 gift card!\n⏰ ${timeLeftText} left!\n\n🎮 Try it 👉 ${shareUrl}`;
    
    // 카카오톡 인앱 브라우저면 바로 클립보드 복사 (Web Share API 미지원)
    const isKakao = navigator.userAgent.toLowerCase().includes("kakaotalk");
    
    // Web Share API 지원시 (모바일, 카톡 제외)
    if (!isKakao && typeof navigator.share === "function") {
      const shareData = {
        text: text,
      };
      
      // canShare 체크 (지원하는 브라우저만)
      const canShare = typeof navigator.canShare === "function" 
        ? navigator.canShare(shareData) 
        : true;
      
      if (canShare) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
        }
      }
    }
    
    // Web Share API 미지원시 클립보드 복사
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // 클립보드도 안 되면 프롬프트
      prompt(lang === "ko" ? "텍스트를 복사하세요:" : "Copy this text:", text);
    }
  };

  // 카카오톡 인앱 브라우저 감지
  const isKakaoInApp = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("kakaotalk");
  };

  // 공유하기 (이미지로)
  const shareAsImage = async () => {
    // 카카오톡 인앱 브라우저면 안내
    if (isKakaoInApp()) {
      alert(lang === "ko" 
        ? "📱 카카오톡 앱에서는 이미지 공유가 제한됩니다.\n\n우측 상단 ⋮ → '다른 브라우저로 열기'를 눌러주세요!" 
        : "📱 Image sharing is limited in KakaoTalk.\n\nTap ⋮ → 'Open in browser'");
      return;
    }

    const shareUrl = `https://www.slox.co.kr${langUrls[lang]}`;
    const blob = await generateImage();
    
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `reaction-${reactionTime}ms.png`, { type: "image/png" });
      const shareData = {
        files: [file],
        title: t.shareText,
        text: `${t.shareTestIt} ${shareUrl}`,
      };
    
      const canShare = typeof navigator.canShare === "function" 
        ? navigator.canShare(shareData) 
        : false;
      
      if (canShare) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
        }
      }
    }
    
    // 이미지 공유 불가능시 다운로드 + 안내
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `reaction-test-${reactionTime}ms.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      // 다운로드 안내
      setTimeout(() => {
        alert(lang === "ko" 
          ? "📥 이미지가 다운로드되었습니다!\n\n갤러리에서 이미지를 직접 공유해주세요." 
          : "📥 Image downloaded!\n\nShare it from your gallery.");
      }, 500);
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

          {/* 🎁 이벤트 배너 - 실시간 카운트다운 + 현재 1등 */}
          <EventBanner lang={lang} leader={leaderboard.length > 0 ? { nickname: leaderboard[0].nickname, score: leaderboard[0].score } : null} />

          {/* 💡 반응속도 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-white font-medium mb-1">{t.tipTitle}</p>
                <p className="text-dark-400 text-sm">{t.tipContent}</p>
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
                  <p className="text-dark-500 text-xs mt-2 animate-pulse">{t.tapToStart}</p>
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
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3 animate-scale-in">
                    {reactionTime}ms
                  </p>
                  
                  {/* 🏆 현재 랭킹 표시 - 세련된 버전 */}
                  {leaderboard.length === 0 ? (
                    <div className="mb-3 px-6 py-4 bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-2xl">
                      <p className="text-yellow-400 font-black text-lg">👑 첫 번째 도전자!</p>
                      <p className="text-dark-400 text-sm mt-1">등록하면 바로 1등이에요</p>
                    </div>
                  ) : reactionTime < leaderboard[0].score ? (
                    <div className="mb-3 px-6 py-4 bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-2xl">
                      <p className="text-yellow-400 font-black text-lg">👑 신기록 달성!</p>
                      <p className="text-dark-400 text-sm mt-1">
                        기존 1위 <span className="text-white">{leaderboard[0].nickname}</span> ({leaderboard[0].score}ms) 돌파!
                      </p>
                    </div>
                  ) : reactionTime === leaderboard[0].score ? (
                    <div className="mb-3 px-5 py-3 bg-dark-800/50 border border-yellow-500/30 rounded-xl">
                      <p className="text-yellow-400 font-bold">👑 현재 1위와 동점!</p>
                      <p className="text-dark-400 text-xs mt-1">{leaderboard[0].nickname} ({leaderboard[0].score}ms)</p>
                    </div>
                  ) : (
                    <div className="mb-3 px-5 py-3 bg-dark-800/50 border border-dark-700 rounded-xl">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">현재 1위</p>
                          <p className="text-yellow-400 font-bold text-lg">{leaderboard[0].score}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-400 text-xs">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="w-px h-10 bg-dark-700" />
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">내 순위</p>
                          <p className="text-purple-400 font-bold text-lg">
                            {(() => {
                              const rank = leaderboard.findIndex(e => reactionTime < e.score);
                              return rank === -1 ? leaderboard.length + 1 : rank + 1;
                            })()}위
                          </p>
                          <p className="text-dark-500 text-xs">+{reactionTime - leaderboard[0].score}ms</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
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

              {/* 도전 메시지 */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl">
                <p className="text-center text-sm">
                  {getBest() >= 200 ? (
                    <span className="text-purple-300">
                      💪 {lang === "ko" ? "200ms 이하로 도전해보세요! 다이아몬드 등급이 기다립니다!" : 
                          lang === "ja" ? "200ms以下に挑戦！ダイヤモンドランクが待っています！" :
                          lang === "zh" ? "挑战200ms以下！钻石等级在等着你！" :
                          "Try to beat 200ms! Diamond rank awaits!"}
                    </span>
                  ) : getBest() >= 130 ? (
                    <span className="text-cyan-300">
                      🔥 {lang === "ko" ? "대단해요! 130ms 이하면 마스터! 도전하세요!" : 
                          lang === "ja" ? "すごい！130ms以下でマスター！挑戦しよう！" :
                          lang === "zh" ? "太棒了！130ms以下就是大师！挑战吧！" :
                          "Amazing! Under 130ms for Master! Keep trying!"}
                    </span>
                  ) : (
                    <span className="text-yellow-300">
                      👑 {lang === "ko" ? "전설이 되었습니다! 친구에게 자랑하세요!" : 
                          lang === "ja" ? "伝説になった！友達に自慢しよう！" :
                          lang === "zh" ? "你成为了传奇！向朋友炫耀吧！" :
                          "You're a legend! Show off to your friends!"}
                    </span>
                  )}
                </p>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={shareResult}
                  className="flex-1 px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all"
                >
                  {showCopied ? t.copied : t.share}
                </button>
                <button
                  onClick={shareAsImage}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all"
                >
                  {t.saveImage}
                </button>
                <button
                  onClick={resetGame}
                  className="flex-1 px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
                >
                  {t.reset}
                </button>
              </div>
              
              {/* 🏆 명예의전당 등록 버튼 */}
              {!hasSubmittedScore && reactionTime > 0 && (
                <button
                  onClick={() => setShowNicknameModal(true)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all"
                >
                  🏆 {lang === "ko" ? "랭킹 등록하기!" : lang === "ja" ? "ランキング登録！" : lang === "zh" ? "排名登记！" : "Register Ranking!"}
                </button>
              )}
            </div>
          )}

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                {lang === "ko" ? "명예의전당" : lang === "ja" ? "殿堂入り" : lang === "zh" ? "名人堂" : "Hall of Fame"}
              </h3>
              <button
                onClick={fetchLeaderboard}
                className="text-dark-400 hover:text-white text-sm transition-colors"
              >
                🔄 {lang === "ko" ? "새로고침" : "Refresh"}
              </button>
            </div>
            
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎮</div>
                <p className="text-dark-400">
                  {lang === "ko" ? "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!" : 
                   lang === "ja" ? "まだ記録がありません。最初の挑戦者になりましょう！" :
                   lang === "zh" ? "还没有记录。成为第一个挑战者吧！" :
                   "No records yet. Be the first challenger!"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" :
                      index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" :
                      index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" :
                      "bg-dark-800/50"
                    }`}
                  >
                    {/* 순위 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-500 text-black" :
                      index === 1 ? "bg-gray-300 text-black" :
                      index === 2 ? "bg-orange-500 text-black" :
                      "bg-dark-700 text-dark-300"
                    }`}>
                      {index + 1}
                    </div>
                    
                    {/* 정보 */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300">
                          {entry.device_type === "mobile" ? "📱" : "🖥️"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          entry.grade === t.challenger ? "text-cyan-300" :
                          entry.grade === t.master ? "text-purple-400" :
                          entry.grade === t.diamond ? "text-blue-400" :
                          entry.grade === t.platinum ? "text-teal-400" :
                          "text-yellow-400"
                        }>{entry.grade}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* 점수 */}
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.score}ms</div>
                      <div className="text-xs text-dark-500">{index + 1}위 / {totalCount}명</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🚀 자동 랭킹 등록 팝업 (게임 끝나면 자동 표시) */}
          {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                {/* 배경 그라데이션 */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setShowRankingPrompt(false)}
                  className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="relative z-10">
                  {/* 내 순위 표시 */}
                  <div className="text-center mb-4">
                    {(() => {
                      const myRank = leaderboard.length === 0 
                        ? 1 
                        : leaderboard.findIndex(e => reactionTime < e.score) === -1 
                          ? leaderboard.length + 1 
                          : leaderboard.findIndex(e => reactionTime < e.score) + 1;
                      const isFirstPlace = leaderboard.length === 0 || reactionTime < leaderboard[0].score;
                      
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : myRank <= 3 ? "🏆" : myRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${
                            isFirstPlace 
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" 
                              : myRank <= 3 
                                ? "text-yellow-400"
                                : "text-white"
                          }`}>
                            {isFirstPlace 
                              ? (lang === "ko" ? "🔥 새로운 1등!" : "🔥 New #1!") 
                              : (lang === "ko" ? `현재 ${myRank}위!` : `Rank #${myRank}!`)}
                          </h3>
                          <p className="text-dark-400 text-sm">
                            {isFirstPlace 
                              ? (lang === "ko" ? "역대 최고 기록을 달성했어요!" : "You beat the record!") 
                              : myRank <= 3
                                ? (lang === "ko" ? "TOP 3 진입! 대단해요!" : "TOP 3! Amazing!")
                                : myRank <= 10
                                  ? (lang === "ko" ? "TOP 10 진입 가능!" : "TOP 10 potential!")
                                  : (lang === "ko" ? "기록을 남겨보세요!" : "Save your record!")}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* 1등과 비교 */}
                  {leaderboard.length > 0 && reactionTime >= leaderboard[0].score && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">현재 1위</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].score}ms</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">내 기록</p>
                          <p className="text-purple-400 font-bold">{reactionTime}ms</p>
                          <p className="text-xs text-red-400">+{reactionTime - leaderboard[0].score}ms</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 랭킹 등록 버튼 - 깜빡이는 효과 */}
                  <button
                    onClick={() => {
                      setShowRankingPrompt(false);
                      setShowNicknameModal(true);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      {lang === "ko" ? "랭킹 등록하기!" : "Register Ranking!"}
                    </span>
                  </button>
                  
                  {/* 공유하기 버튼 */}
                  <button
                    onClick={shareResult}
                    className="w-full mt-2 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all border border-dark-600"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>📤</span>
                      {showCopied ? t.copied : (lang === "ko" ? "친구에게 공유하기" : "Share with friends")}
                    </span>
                  </button>
                  
                  {/* 이벤트 안내 */}
                  <div className="mt-3 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-yellow-400 text-xs text-center flex items-center justify-center gap-1">
                      <span>🎁</span>
                      <span>{lang === "ko" ? "1등은 매달 문화상품권 5천원 이벤트!" : "Monthly prize for #1!"}</span>
                    </p>
                  </div>
                  
                  {/* 나중에 버튼 */}
                  <button
                    onClick={() => setShowRankingPrompt(false)}
                    className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors"
                  >
                    {lang === "ko" ? "나중에 할게요" : "Maybe later"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 입력 모달 */}
          {showNicknameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{getGrade(reactionTime).emoji}</div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {lang === "ko" ? "🏆 명예의전당 등록" : lang === "ja" ? "🏆 殿堂入り登録" : lang === "zh" ? "🏆 名人堂登记" : "🏆 Hall of Fame"}
                  </h3>
                  <p className="text-dark-400 text-sm">
                    {lang === "ko" 
                      ? `${reactionTime}ms로 ${leaderboard.length > 0 
                          ? `${leaderboard.findIndex(e => reactionTime < e.score) === -1 
                              ? leaderboard.length + 1 
                              : leaderboard.findIndex(e => reactionTime < e.score) + 1}위 예상!` 
                          : "1위 도전!"}` 
                      : `${reactionTime}ms`}
                  </p>
                </div>
                
                {/* 🔥 현재 1등 vs 내 점수 비교 - 세련된 버전 */}
                {leaderboard.length > 0 ? (
                  <div className={`mb-4 p-4 rounded-xl ${
                    reactionTime < leaderboard[0].score 
                      ? "bg-gradient-to-b from-yellow-500/15 to-transparent border border-yellow-500/30" 
                      : "bg-dark-800/50 border border-dark-700"
                  }`}>
                    {reactionTime < leaderboard[0].score ? (
                      <div className="text-center">
                        <p className="text-yellow-400 font-bold text-lg">👑 새로운 1등!</p>
                        <p className="text-dark-400 text-sm mt-1">
                          기존 1위 <span className="text-white">{leaderboard[0].nickname}</span>님을 {leaderboard[0].score - reactionTime}ms 앞섰어요
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">현재 1위</p>
                          <p className="text-yellow-400 font-bold text-lg">{leaderboard[0].score}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-400 text-xs">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="w-px h-10 bg-dark-700" />
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">내 기록</p>
                          <p className="text-purple-400 font-bold text-lg">{reactionTime}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-500 text-xs">+{reactionTime - leaderboard[0].score}ms</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-4 p-4 rounded-xl text-center bg-gradient-to-b from-yellow-500/15 to-transparent border border-yellow-500/30">
                    <p className="text-yellow-400 font-bold text-lg">👑 첫 번째 도전자!</p>
                    <p className="text-dark-400 text-sm mt-1">등록하면 바로 1등이에요</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-dark-300 text-sm mb-2">
                    {lang === "ko" ? "닉네임 (최대 20자)" : lang === "ja" ? "ニックネーム (最大20文字)" : lang === "zh" ? "昵称 (最多20字)" : "Nickname (max 20 chars)"}
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                    placeholder={lang === "ko" ? "닉네임 입력..." : "Enter nickname..."}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-accent-purple transition-colors"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && submitScore()}
                  />
                </div>
                
                {/* 이벤트 안내 */}
                {(leaderboard.length === 0 || reactionTime < leaderboard[0].score) && (
                  <div className="mb-4 p-2 bg-yellow-500/10 rounded-lg">
                    <p className="text-yellow-400 text-xs text-center">
                      🎁 1등은 매달 문화상품권 이벤트 참여 가능!
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNicknameModal(false)}
                    className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl transition-all"
                  >
                    {lang === "ko" ? "취소" : "Cancel"}
                  </button>
                  <button
                    onClick={submitScore}
                    disabled={!nickname.trim() || isSubmitting}
                    className={`flex-1 px-4 py-3 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      leaderboard.length === 0 || reactionTime < leaderboard[0].score
                        ? "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white animate-pulse"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
                    }`}
                  >
                    {isSubmitting ? "..." : leaderboard.length === 0 || reactionTime < leaderboard[0].score 
                      ? "🔥 1등 등록!" 
                      : lang === "ko" ? "등록하기!" : "Submit!"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 🎉 1등 축하 모달 */}
          {showFirstPlaceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-gradient-to-b from-yellow-900/40 via-dark-900 to-dark-900 border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full relative overflow-hidden animate-scale-in">
                {/* 상단 글로우 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-yellow-500/30 to-transparent blur-2xl" />
                
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setShowFirstPlaceModal(false)}
                  className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="relative z-10 text-center">
                  {/* 왕관 */}
                  <div className="relative inline-block mb-4">
                    <div className="text-7xl animate-bounce">👑</div>
                    <div className="absolute inset-0 text-7xl blur-md opacity-50">👑</div>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400">
                      {lang === "ko" ? "축하합니다!" : "Congratulations!"}
                    </span>
                  </h3>
                  <p className="text-xl text-yellow-400 font-bold mb-4">
                    🏆 {lang === "ko" ? "1등입니다!" : "You are #1!"}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500">
                      {reactionTime}
                    </span>
                    <span className="text-dark-400 text-xl ml-1">ms</span>
                  </div>
                  
                  {!emailSubmitted ? (
                    <div className="bg-dark-900/60 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                      <p className="text-dark-300 mb-4 flex items-center justify-center gap-2">
                        <span className="text-xl">🎁</span>
                        <span>{lang === "ko" ? "상품 수령을 위해 이메일을 등록하세요!" : "Enter your email to receive the prize!"}</span>
                      </p>
                      
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-yellow-500 transition-colors"
                          onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                        />
                        <button
                          onClick={submitEmail}
                          disabled={!email.trim() || isEmailSubmitting}
                          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-yellow-500/20"
                        >
                          {isEmailSubmitting ? "..." : lang === "ko" ? "등록" : "Submit"}
                        </button>
                      </div>
                      
                      <p className="text-xs text-dark-500 mt-3">
                        💡 {lang === "ko" ? "매달 1일 오전 10시 기준 1등에게 문화상품권 발송!" : "Prize sent to #1 on the 1st of each month!"}
                      </p>
                      <p className="text-xs text-red-400/70 mt-1">
                        📬 {lang === "ko" ? "메일이 안 보이면 스팸함을 확인하세요!" : "Check spam folder if you don't see the email!"}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-5">
                      <div className="text-4xl mb-3">✅</div>
                      <p className="text-green-400 font-bold">
                        {lang === "ko" ? "이메일 등록 완료!" : "Email registered!"}
                      </p>
                      <p className="text-dark-400 text-sm mt-2">
                        {lang === "ko" ? "1등 유지 시 매달 1일 상품 발송!" : "Prize sent on the 1st if you stay #1!"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 🖼️ 공유용 카드 (숨김 - 이미지 생성용) */}
          <div
            ref={shareCardRef}
            style={{ 
              display: "none", 
              position: "absolute", 
              left: "-9999px",
              width: "360px",
              padding: "20px",
              backgroundColor: "#0f0d1a",
            }}
          >
            {/* 헤더 - 심플하게 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: "600" }}>⚡ 반응속도 테스트</span>
            </div>

            {/* 메인 결과 */}
            <div style={{ 
              textAlign: "center", 
              padding: "20px 16px", 
              backgroundColor: "#1a1625",
              borderRadius: "12px", 
              marginBottom: "10px"
            }}>
              <div style={{ fontSize: "44px", lineHeight: "1" }}>{getGrade(reactionTime).emoji}</div>
              <div style={{ 
                fontSize: "26px", 
                fontWeight: "bold", 
                marginTop: "8px",
                marginBottom: "14px",
                color: reactionTime < 130 ? "#67e8f9" : reactionTime < 160 ? "#c084fc" : reactionTime < 200 ? "#60a5fa" : reactionTime < 250 ? "#2dd4bf" : reactionTime < 310 ? "#fbbf24" : "#9ca3af"
              }}>
                {getGrade(reactionTime).grade}
              </div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa" }}>
                {reactionTime}<span style={{ fontSize: "18px", color: "#7c3aed" }}>ms</span>
              </div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>{getGrade(reactionTime).message}</div>
            </div>

            {/* 통계 + QR */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              {/* 통계 */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  backgroundColor: "#0c1a1a",
                  borderRadius: "10px", 
                  padding: "10px", 
                  textAlign: "center",
                  marginBottom: "6px"
                }}>
                  <div style={{ color: "#67e8f9", fontSize: "10px", fontWeight: "bold" }}>🎯 평균</div>
                  <div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold", marginTop: "2px" }}>{getAverage()}ms</div>
                </div>
                <div style={{ 
                  backgroundColor: "#1a0c1a",
                  borderRadius: "10px", 
                  padding: "10px", 
                  textAlign: "center"
                }}>
                  <div style={{ color: "#c4b5fd", fontSize: "10px", fontWeight: "bold" }}>🏆 최고기록</div>
                  <div style={{ color: "#a855f7", fontSize: "18px", fontWeight: "bold", marginTop: "2px" }}>{getBest()}ms</div>
                </div>
              </div>
              {/* QR코드 */}
              <div style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                borderRadius: "10px", 
                padding: "8px",
                width: "100px"
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent("https://www.slox.co.kr/reaction")}&bgcolor=ffffff&color=1a1a2e&margin=0`}
                  alt="QR"
                  width={70}
                  height={70}
                  crossOrigin="anonymous"
                  style={{ display: "block" }}
                />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px", fontWeight: "600" }}>📱 나도 도전!</div>
              </div>
            </div>

            {/* 🏆 현재 1위 vs 내 순위 */}
            <div style={{ 
              display: "flex",
              gap: "6px",
              marginBottom: "8px"
            }}>
              {/* 현재 1위 */}
              <div style={{ 
                flex: 1,
                backgroundColor: "rgba(234, 179, 8, 0.15)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
              }}>
                <div style={{ color: "#fbbf24", fontSize: "9px", fontWeight: "bold" }}>👑 현재 1위</div>
                {leaderboard.length > 0 ? (
                  <>
                    <div style={{ color: "white", fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>{leaderboard[0].nickname}</div>
                    <div style={{ color: "#fbbf24", fontSize: "14px", fontWeight: "bold" }}>{leaderboard[0].score}ms</div>
                  </>
                ) : (
                  <>
                    <div style={{ color: "white", fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>도전자 없음</div>
                    <div style={{ color: "#9ca3af", fontSize: "10px" }}>첫 1등 되기!</div>
                  </>
                )}
              </div>
              
              {/* 내 순위 */}
              <div style={{ 
                flex: 1,
                backgroundColor: reactionTime <= (leaderboard[0]?.score || 9999) ? "rgba(34, 197, 94, 0.15)" : "rgba(139, 92, 246, 0.15)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center"
              }}>
                <div style={{ color: reactionTime <= (leaderboard[0]?.score || 9999) ? "#22c55e" : "#a78bfa", fontSize: "9px", fontWeight: "bold" }}>
                  {reactionTime <= (leaderboard[0]?.score || 9999) ? "🔥 내 순위" : "📊 내 순위"}
                </div>
                <div style={{ 
                  color: reactionTime <= (leaderboard[0]?.score || 9999) ? "#22c55e" : "white", 
                  fontSize: "14px", 
                  fontWeight: "bold", 
                  marginTop: "2px" 
                }}>
                  {leaderboard.length === 0 ? "1위!" : reactionTime <= leaderboard[0].score ? "1위!" : `${Math.min(leaderboard.findIndex(e => reactionTime < e.score) + 1 || leaderboard.length + 1, 10)}위`}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "10px" }}>{reactionTime}ms</div>
              </div>
            </div>

            {/* 🎁 이벤트 안내 + 카운트다운 */}
            <div style={{ 
              background: "linear-gradient(180deg, rgba(234, 179, 8, 0.15), rgba(239, 68, 68, 0.1))",
              borderRadius: "10px",
              padding: "10px 12px",
              marginBottom: "8px",
              textAlign: "center",
              border: "1px solid rgba(234, 179, 8, 0.3)"
            }}>
              <div style={{ color: "#fbbf24", fontSize: "11px", fontWeight: "bold", marginBottom: "6px" }}>🎁 EVENT! 1등에게 문화상품권 5천원!</div>
              
              {/* 남은 시간 카운트다운 */}
              {(() => {
                const now = new Date();
                const nextDraw = new Date(now.getFullYear(), now.getMonth() + 1, 1, 10, 0, 0);
                const diff = nextDraw.getTime() - now.getTime();
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                
                return (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: "4px",
                    marginBottom: "6px"
                  }}>
                    <span style={{ color: "#9ca3af", fontSize: "9px" }}>⏰ 마감까지</span>
                    <span style={{ 
                      color: "#22d3ee", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      fontFamily: "monospace"
                    }}>
                      {days}일 {hours}시간
                    </span>
                    <span style={{ color: "#9ca3af", fontSize: "9px" }}>남음!</span>
                  </div>
                );
              })()}
              
              <div style={{ color: "#d1d5db", fontSize: "9px" }}>너도 도전해서 1등 뺏어봐! 👊</div>
            </div>

            {/* 하단 */}
            <div style={{ 
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderTop: "1px solid #1e1b4b",
              fontSize: "10px",
              color: "#6b7280"
            }}>
              <span>{new Date().toLocaleDateString("ko-KR")}</span>
              <span style={{ color: "#8b5cf6", fontWeight: "600" }}>slox.co.kr/reaction</span>
            </div>
          </div>

          {/* 🎮 반응속도란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🧠</span> {t.whatIsReaction}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              {t.reactionDescription}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">⚡ {t.inGames}</p>
                <p className="text-dark-400 mt-1">{t.inGamesDesc}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">🚗 {t.inDaily}</p>
                <p className="text-dark-400 mt-1">{t.inDailyDesc}</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 (롤 스타일 - 계층형) - PC/모바일 통일 기준 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">{t.tierTable}</h3>
            <p className="text-accent-cyan text-xs text-center mb-6">
              📱 모바일 / 🖥️ PC 동일 기준
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">&lt;120ms</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">120~149ms</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">150~189ms</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">190~239ms</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">240~299ms</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">300~379ms</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">380~479ms</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">480ms+</span>
              </div>
            </div>
            <p className="text-dark-500 text-xs mt-6 text-center">
              💡 평균 반응속도는 약 250~300ms (골드~실버) 입니다
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

