"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import AdBanner from "./AdBanner";
import html2canvas from "html2canvas";

import { supabase, LeaderboardEntry } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";


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
    days: "일",
    hours: "시간", 
    minutes: "분",
    seconds: "초",
    sameTierNote: "📱 모바일 / 🖥️ PC 동일 기준",
    newFirst: "🔥 새로운 1등!",
    beatPrevious: "기존 1위 {name}님을 {diff}ms 앞섰어요",
    firstChallenger: "👑 첫 번째 도전자!",
    registerFirstNote: "등록하면 바로 1등이에요",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
    registerFirstBtn: "🔥 1등 등록!",
    submit: "등록하기!",
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    sameScore: "👑 현재 1위와 동점!",
    cancel: "취소",
    newRecord: "👑 신기록 달성!",
    beatRecord: "기존 1위 {name} ({score}ms) 돌파!",
    myRank: "내 순위",
    rank: "위",
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
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Same Standard",
    newFirst: "🔥 New #1!",
    beatPrevious: "You beat {name} by {diff}ms!",
    firstChallenger: "👑 First Challenger!",
    registerFirstNote: "Register to claim #1!",
    currentFirst: "Current #1",
    myRecord: "My Record",
    registerFirstBtn: "🔥 Register #1!",
    submit: "Submit!",
    noRecords: "No records yet. Be the first challenger!",
    sameScore: "👑 Tied with #1!",
    cancel: "Cancel",
    newRecord: "👑 New Record!",
    beatRecord: "Beat {name} ({score}ms)!",
    myRank: "My Rank",
    rank: "",
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
    days: "日",
    hours: "時",
    minutes: "分",
    seconds: "秒",
    sameTierNote: "📱 モバイル / 🖥️ PC 同一基準",
    newFirst: "🔥 新しい1位!",
    beatPrevious: "前の1位 {name}さんを{diff}ms上回りました!",
    firstChallenger: "👑 最初の挑戦者!",
    registerFirstNote: "登録すれば1位になります!",
    currentFirst: "現在1位",
    myRecord: "私の記録",
    registerFirstBtn: "🔥 1位登録!",
    submit: "登録!",
    noRecords: "まだ記録がありません。最初の挑戦者になってください!",
    sameScore: "👑 現在1位と同点!",
    cancel: "キャンセル",
    newRecord: "👑 新記録達成!",
    beatRecord: "前1位 {name} ({score}ms) を突破!",
    myRank: "私の順位",
    rank: "位",
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
    days: "天",
    hours: "时",
    minutes: "分",
    seconds: "秒",
    sameTierNote: "📱 移动端 / 🖥️ PC 同一标准",
    newFirst: "🔥 新的第1名!",
    beatPrevious: "超越了前第1名 {name} {diff}ms!",
    firstChallenger: "👑 第一个挑战者!",
    registerFirstNote: "注册就能成为第1名!",
    currentFirst: "当前第1名",
    myRecord: "我的记录",
    registerFirstBtn: "🔥 注册第1名!",
    submit: "提交!",
    noRecords: "暂无记录。成为第一个挑战者吧!",
    sameScore: "👑 与第1名同分!",
    cancel: "取消",
    newRecord: "👑 新纪录!",
    beatRecord: "击败了前第1名 {name} ({score}ms)!",
    myRank: "我的排名",
    rank: "名",
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
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Móvil / 🖥️ PC Mismo Estándar",
    newFirst: "🔥 ¡Nuevo #1!",
    beatPrevious: "¡Superaste a {name} por {diff}ms!",
    firstChallenger: "👑 ¡Primer Retador!",
    registerFirstNote: "¡Regístrate para ser #1!",
    currentFirst: "Actual #1",
    myRecord: "Mi Registro",
    registerFirstBtn: "🔥 ¡Registrar #1!",
    submit: "¡Enviar!",
    noRecords: "Aún no hay registros. ¡Sé el primer retador!",
    sameScore: "👑 ¡Empate con #1!",
    cancel: "Cancelar",
    newRecord: "👑 ¡Nuevo Récord!",
    beatRecord: "¡Venciste a {name} ({score}ms)!",
    myRank: "Mi Rango",
    rank: "°",
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
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Mesmo Padrão",
    newFirst: "🔥 Novo #1!",
    beatPrevious: "Você superou {name} por {diff}ms!",
    firstChallenger: "👑 Primeiro Desafiante!",
    registerFirstNote: "Registre-se para ser #1!",
    currentFirst: "Atual #1",
    myRecord: "Meu Registro",
    registerFirstBtn: "🔥 Registrar #1!",
    submit: "Enviar!",
    noRecords: "Ainda sem registros. Seja o primeiro desafiante!",
    sameScore: "👑 Empatado com #1!",
    cancel: "Cancelar",
    newRecord: "👑 Novo Recorde!",
    beatRecord: "Você venceu {name} ({score}ms)!",
    myRank: "Meu Rank",
    rank: "°",
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
    days: "T",
    hours: "Std",
    minutes: "Min",
    seconds: "Sek",
    sameTierNote: "📱 Mobil / 🖥️ PC Gleicher Standard",
    newFirst: "🔥 Neuer #1!",
    beatPrevious: "Du hast {name} um {diff}ms geschlagen!",
    firstChallenger: "👑 Erster Herausforderer!",
    registerFirstNote: "Registriere dich um #1 zu werden!",
    currentFirst: "Aktueller #1",
    myRecord: "Mein Rekord",
    registerFirstBtn: "🔥 #1 Registrieren!",
    submit: "Absenden!",
    noRecords: "Noch keine Rekorde. Sei der erste Herausforderer!",
    sameScore: "👑 Gleichstand mit #1!",
    cancel: "Abbrechen",
    newRecord: "👑 Neuer Rekord!",
    beatRecord: "Du hast {name} ({score}ms) geschlagen!",
    myRank: "Mein Rang",
    rank: ".",
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
    days: "J",
    hours: "H",
    minutes: "M",
    seconds: "S",
    sameTierNote: "📱 Mobile / 🖥️ PC Même Standard",
    newFirst: "🔥 Nouveau #1!",
    beatPrevious: "Vous avez battu {name} de {diff}ms!",
    firstChallenger: "👑 Premier Challenger!",
    registerFirstNote: "Inscrivez-vous pour être #1!",
    currentFirst: "Actuel #1",
    myRecord: "Mon Record",
    registerFirstBtn: "🔥 Inscrire #1!",
    submit: "Envoyer!",
    noRecords: "Aucun record. Soyez le premier challenger!",
    sameScore: "👑 Égalité avec #1!",
    cancel: "Annuler",
    newRecord: "👑 Nouveau Record!",
    beatRecord: "Vous avez battu {name} ({score}ms)!",
    myRank: "Mon Rang",
    rank: "e",
  },
};

// 언어 옵션 (표준화된 패턴)
type Locale = Language;
const languageOptions: { locale: Locale; flag: string; name: string; path: string }[] = [
  { locale: "ko", flag: "🇰🇷", name: "한국어", path: "/reaction" },
  { locale: "en", flag: "🇺🇸", name: "English", path: "/en/reaction" },
  { locale: "ja", flag: "🇯🇵", name: "日本語", path: "/ja/reaction" },
  { locale: "zh", flag: "🇨🇳", name: "中文", path: "/zh/reaction" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch", path: "/de/reaction" },
  { locale: "fr", flag: "🇫🇷", name: "Français", path: "/fr/reaction" },
  { locale: "es", flag: "🇪🇸", name: "Español", path: "/es/reaction" },
  { locale: "pt", flag: "🇧🇷", name: "Português", path: "/pt/reaction" },
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

// 등급 번역 (양방향)
const gradeTranslations: Record<Language, Record<string, string>> = {
  ko: {
    "Challenger": "챌린저", "Master": "마스터", "Diamond": "다이아몬드", "Platinum": "플래티넘",
    "Gold": "골드", "Silver": "실버", "Bronze": "브론즈", "Iron": "아이언",
  },
  en: {
    "챌린저": "Challenger", "마스터": "Master", "다이아몬드": "Diamond", "플래티넘": "Platinum",
    "골드": "Gold", "실버": "Silver", "브론즈": "Bronze", "아이언": "Iron",
  },
  ja: {
    "Challenger": "チャレンジャー", "Master": "マスター", "Diamond": "ダイヤモンド", "Platinum": "プラチナ",
    "Gold": "ゴールド", "Silver": "シルバー", "Bronze": "ブロンズ", "Iron": "アイアン",
    "챌린저": "チャレンジャー", "마스터": "マスター", "다이아몬드": "ダイヤモンド", "플래티넘": "プラチナ",
    "골드": "ゴールド", "실버": "シルバー", "브론즈": "ブロンズ", "아이언": "アイアン",
  },
  zh: {
    "Challenger": "挑战者", "Master": "大师", "Diamond": "钻石", "Platinum": "铂金",
    "Gold": "黄金", "Silver": "白银", "Bronze": "青铜", "Iron": "黑铁",
    "챌린저": "挑战者", "마스터": "大师", "다이아몬드": "钻石", "플래티넘": "铂金",
    "골드": "黄金", "실버": "白银", "브론즈": "青铜", "아이언": "黑铁",
  },
  de: {
    "Challenger": "Challenger", "Master": "Meister", "Diamond": "Diamant", "Platinum": "Platin",
    "Gold": "Gold", "Silver": "Silber", "Bronze": "Bronze", "Iron": "Eisen",
    "챌린저": "Challenger", "마스터": "Meister", "다이아몬드": "Diamant", "플래티넘": "Platin",
    "골드": "Gold", "실버": "Silber", "브론즈": "Bronze", "아이언": "Eisen",
  },
  fr: {
    "Challenger": "Challenger", "Master": "Maître", "Diamond": "Diamant", "Platinum": "Platine",
    "Gold": "Or", "Silver": "Argent", "Bronze": "Bronze", "Iron": "Fer",
    "챌린저": "Challenger", "마스터": "Maître", "다이아몬드": "Diamant", "플래티넘": "Platine",
    "골드": "Or", "실버": "Argent", "브론즈": "Bronze", "아이언": "Fer",
  },
  es: {
    "Challenger": "Challenger", "Master": "Maestro", "Diamond": "Diamante", "Platinum": "Platino",
    "Gold": "Oro", "Silver": "Plata", "Bronze": "Bronce", "Iron": "Hierro",
    "챌린저": "Challenger", "마스터": "Maestro", "다이아몬드": "Diamante", "플래티넘": "Platino",
    "골드": "Oro", "실버": "Plata", "브론즈": "Bronce", "아이언": "Hierro",
  },
  pt: {
    "Challenger": "Challenger", "Master": "Mestre", "Diamond": "Diamante", "Platinum": "Platina",
    "Gold": "Ouro", "Silver": "Prata", "Bronze": "Bronze", "Iron": "Ferro",
    "챌린저": "Challenger", "마스터": "Mestre", "다이아몬드": "Diamante", "플래티넘": "Platina",
    "골드": "Ouro", "실버": "Prata", "브론즈": "Bronze", "아이언": "Ferro",
  },
};

// 등급 번역 함수
const translateGrade = (grade: string, lang: Language): string => {
  return gradeTranslations[lang]?.[grade] || grade;
};

// locale별 기본 국가 코드
const DEFAULT_COUNTRY: Record<Language, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR"
};

// 국가 코드로 국기 이모지 가져오기
const getCountryFlag = (countryCode: string | null | undefined): string => {
  if (!countryCode) return "🌍";
  const country = COUNTRY_OPTIONS.find(c => c.code === countryCode);
  return country?.flag || "🌍";
};

interface ReactionTestProps {
  locale: Locale;
  battleMode?: boolean; // 배틀 모드
  onBattleComplete?: (score: number) => void; // 배틀 완료 콜백
}

export default function ReactionTest({ locale, battleMode = false, onBattleComplete }: ReactionTestProps) {
  const [state, setState] = useState<GameState>("waiting");
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false); // 배틀 완료 여부
  const lang = locale;
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showExplosion, setShowExplosion] = useState(false);
  const [balloonScale, setBalloonScale] = useState(1);
  // 명예의전당 관련 상태
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 전체 참가자 수
  const [myRank, setMyRank] = useState<number | null>(null); // 정확한 순위
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[lang]);
  
  // 👤 로그인 유저 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string | null>(null);
  
  
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

  // 👤 로그인 유저 체크 (광고 차단기 우회)
  useEffect(() => {
    const checkUser = async () => {
      let userId: string | null = null;
      
      // 1. slox-session 우선 확인
      try {
        const sloxSession = localStorage.getItem("slox-session");
        if (sloxSession) {
          const parsed = JSON.parse(sloxSession);
          if (parsed?.user?.id) userId = parsed.user.id;
        }
        // Supabase 기본 세션 키도 확인 (fallback)
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
      
      // 2. Supabase SDK fallback
      if (!userId) {
        try {
      const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) userId = session.user.id;
        } catch { /* 차단됨 */ }
      }
      
      // 3. 프로필 가져오기 (API 프록시)
      if (userId) {
        setCurrentUserId(userId);
        try {
          const response = await fetch(`/api/profile?userId=${userId}`);
          const { profile } = await response.json();
          if (profile?.nickname) {
          setCurrentUserNickname(profile.nickname);
            setNickname(profile.nickname);
        }
        } catch { /* 무시 */ }
        
        // 🎮 pending_game_score 확인 (비회원 → 로그인 후 점수 자동 등록)
        try {
          const pendingScore = localStorage.getItem("pending_game_score");
          if (pendingScore) {
            const data = JSON.parse(pendingScore);
            // 30분 이내 + reaction 게임인 경우만 처리
            if (data.game === "reaction" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              console.log("🎮 [ReactionTest] 저장된 점수 발견:", data.score);
              setReactionTime(data.score);
              setState("result");
              // 약간의 딜레이 후 닉네임 모달 표시
              setTimeout(() => {
                setShowNicknameModal(true);
              }, 500);
            }
            // 처리 완료 후 삭제
            localStorage.removeItem("pending_game_score");
          }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
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
    if (ms < 120) return 1;
    if (ms < 150) return 1;
    if (ms < 190) return 5;
    if (ms < 240) return 15;
    if (ms < 300) return 35;
    if (ms < 380) return 60;
    if (ms < 480) return 80;
    return 95;
  };

  // 리더보드 가져오기 (API 프록시 사용 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=reaction&limit=10");
      const result = await response.json();
      
      if (result.error) throw new Error(result.error);
      
      if (result.data && result.data.length > 0) {
        setLeaderboard(result.data);
      }
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
    }
  }, []);


  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  // 점수 등록
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
          // 프로필에서 닉네임 가져오기
          const res = await fetch(`/api/profile?userId=${parsed.user.id}`);
          const { profile } = await res.json();
          if (profile?.nickname) realUserNickname = profile.nickname;
        }
      }
      // Supabase 기본 세션 키도 확인 (fallback)
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
    
    // 👤 실시간 확인된 회원이면 회원 닉네임 사용, 비회원이면 입력된 닉네임 사용
    const finalNickname = realUserId && realUserNickname 
      ? realUserNickname 
      : nickname.trim();
    
    // 실시간 userId로 업데이트
    const finalUserId = realUserId;
    
    if (!finalNickname || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const gradeInfo = getGrade(reactionTime);
      const percentile = getPercentile(reactionTime);
      
      // API 프록시 사용 (광고 차단기 우회)
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "reaction",
          data: {
          nickname: finalNickname.slice(0, 20),
          score: reactionTime,
          grade: gradeInfo.grade,
          percentile: percentile,
          device_type: isMobile ? "mobile" : "pc",
          country: selectedCountry,
          },
          userId: finalUserId, // 실시간 확인된 userId 사용
        }),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      // 👤 회원 점수 업데이트는 API에서 자동 처리됨
      console.log(`📊 [ReactionTest] 등록 완료, 순위: ${result.rank}등, 획득 점수: ${result.pointsEarned}점`);
      
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      
      fetchLeaderboard();
    } catch (err) {
      console.error("점수 등록 실패:", err);
      alert(lang === "ko" ? "등록 실패! 다시 시도해주세요." : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // 페이지 로드시 리더보드 가져오기
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);
  
  // 🚀 결과 나오면 정확한 순위 계산 + 0.8초 후 팝업 표시
  useEffect(() => {
    if (state === "result" && reactionTime > 0) {
      // 정확한 순위 계산 (API 호출)
      fetch(`/api/leaderboard?game=reaction&limit=10&myScore=${reactionTime}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) {
            setMyRank(result.myRank);
          }
          if (result.data) {
            setLeaderboard(result.data);
          }
          if (result.totalCount !== undefined) {
            setTotalCount(result.totalCount);
          }
        })
        .catch(err => console.error("순위 계산 실패:", err));
      
      // 팝업 표시
      if (!hasSubmittedScore) {
      const timer = setTimeout(() => {
        setShowRankingPrompt(true);
      }, 800);
      return () => clearTimeout(timer);
      }
    }
  }, [state, hasSubmittedScore, reactionTime]);

  // 초록불 타임아웃 ref (5초 안에 클릭 안하면 실패)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 게임 시작
  const startGame = useCallback(() => {
    // 이미 "click" 상태면 중복 시작 방지
    if (state === "click") {
      console.warn("⚠️ 이미 초록불 상태입니다. 중복 시작 방지.");
      return;
    }
    
    setState("ready");
    playSound("ready");
    setBalloonScale(1);
    setHasSubmittedScore(false); // 새 게임시 등록 상태 리셋
    setShowRankingPrompt(false); // 랭킹 팝업도 닫기
    
    // 기존 타이머 정리
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    
    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      setState("click");
      setStartTime(Date.now());
      // 풍선 커지는 애니메이션
      setBalloonScale(1.1);
      
      // 🛡️ 치팅 방지: 5초 안에 클릭 안하면 자동 실패
      clickTimeoutRef.current = setTimeout(() => {
        console.log("⏰ 초록불 타임아웃 - 5초 초과");
        playSound("fail");
        setState("tooEarly"); // 타임아웃 상태로 변경
      }, 5000);
    }, delay);
  }, [playSound, state]);

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
      // 🛡️ 초록불 타임아웃 정리
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      
      const reaction = Date.now() - startTime;
      
      // 🛡️ 치팅 방지: 50ms 미만은 인간이 반응할 수 없는 시간
      if (reaction < 50) {
        console.warn(`⚠️ 비정상 반응 시간 감지: ${reaction}ms (치팅 의심)`);
        playSound("fail");
        setState("tooEarly");
        return;
      }
      
      setReactionTime(reaction);
      setAttempts(prev => [...prev, reaction]);
      
      // 🎈 풍선 터지는 효과!
      playSound("pop");
      triggerExplosion(e);
      
      setTimeout(() => {
        playSound("success");
        setState("result");
        
        // 🥊 배틀 모드: 첫 번째 결과로 즉시 완료 처리
        if (battleMode && onBattleComplete && !battleCompleted) {
          setBattleCompleted(true);
          onBattleComplete(reaction);
        }
      }, 150);
    } else if (state === "result" || state === "tooEarly") {
      // 🥊 배틀 모드에서는 재시도 불가
      if (battleMode && battleCompleted) {
        return;
      }
      startGame();
    }
  }, [state, startTime, startGame, playSound, triggerExplosion, battleMode, onBattleComplete, battleCompleted]);

  // 리셋
  const resetGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
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
    // 정확한 순위 사용 (API에서 계산된 myRank 상태 우선)
    const calculatedRank = myRank || (isNewFirst ? 1 : (leaderboard.findIndex(e => reactionTime < e.score) === -1 
      ? totalCount + 1 
      : leaderboard.findIndex(e => reactionTime < e.score) + 1));
    
    // 공유 텍스트
    const text = lang === "ko"
      ? `⚡ 반응속도 테스트 결과!\n\n${grade.emoji} ${grade.grade} - ${reactionTime}ms\n${isNewFirst ? "🔥 새로운 1등 달성!" : `📊 현재 ${calculatedRank}위`}\n\n${firstPlace ? `👑 현재 1등: ${firstPlace.nickname} (${firstPlace.score}ms)\n\n` : ""}🎮 나도 도전하기 👉 ${shareUrl}`
      : `⚡ Reaction Speed Test!\n\n${grade.emoji} ${grade.grade} - ${reactionTime}ms\n${isNewFirst ? "🔥 New #1!" : `📊 Rank #${calculatedRank}`}\n\n🎮 Try it 👉 ${shareUrl}`;
    
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

  // 🥊 도전장 만들기 상태
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [battleUrl, setBattleUrl] = useState<string | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);

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
          challengerScore: reactionTime,
          game: "reaction",
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
      ? `🥊 ${nickname}의 도전장!\n\n⚡ 반응속도: ${reactionTime}ms\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`
      : `🥊 ${nickname}'s Challenge!\n\n⚡ Reaction: ${reactionTime}ms\n\nCan you beat this? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert(lang === "ko" ? "복사되었습니다! 친구에게 공유하세요 🎮" : "Copied! Share with friends 🎮");
    } catch {
      prompt(lang === "ko" ? "텍스트를 복사하세요:" : "Copy this text:", text);
    }
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

    const shareUrl = `https://www.slox.co.kr${languageOptions.find(l => l.locale === lang)?.path || "/reaction"}`;
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
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
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
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* 💡 반응속도 향상 팁 */}
          <div className="mb-5 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl">
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
            className={`${getBgColor()} rounded-2xl cursor-pointer transition-colors duration-100 select-none mb-5 relative overflow-hidden`}
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
                      <p className="text-yellow-400 font-black text-lg">{t.firstChallenger}</p>
                      <p className="text-dark-400 text-sm mt-1">{t.registerFirstNote}</p>
                    </div>
                  ) : reactionTime < leaderboard[0].score ? (
                    <div className="mb-3 px-6 py-4 bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-2xl">
                      <p className="text-yellow-400 font-black text-lg">{t.newRecord}</p>
                      <p className="text-dark-400 text-sm mt-1">
                        {t.beatRecord.replace("{name}", leaderboard[0].nickname).replace("{score}", String(leaderboard[0].score))}
                      </p>
                    </div>
                  ) : reactionTime === leaderboard[0].score ? (
                    <div className="mb-3 px-5 py-3 bg-dark-800/50 border border-yellow-500/30 rounded-xl">
                      <p className="text-yellow-400 font-bold">{t.sameScore}</p>
                      <p className="text-dark-400 text-xs mt-1">{leaderboard[0].nickname} ({leaderboard[0].score}ms)</p>
                    </div>
                  ) : (
                    <div className="mb-3 px-5 py-3 bg-dark-800/50 border border-dark-700 rounded-xl">
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">{t.currentFirst}</p>
                          <p className="text-yellow-400 font-bold text-lg">{leaderboard[0].score}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-400 text-xs">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="w-px h-10 bg-dark-700" />
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">{t.myRank}</p>
                          <p className="text-purple-400 font-bold text-lg">
                            {myRank || "?"}{t.rank}
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
            
            {/* 🛡️ 공정성 안내 */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
              <p className="text-blue-400 text-xs leading-relaxed">
                {lang === "ko" 
                  ? "⚡ 50ms 미만의 기록은 예측 샷 또는 버그로 간주되어 등록이 제한됩니다. 공정한 랭킹을 위해 순수 반응속도만 측정합니다."
                  : lang === "ja"
                  ? "⚡ 50ms未満の記録は予測ショットまたはバグとみなされ、登録が制限されます。"
                  : lang === "zh"
                  ? "⚡ 50ms以下的记录被视为预测或bug，将被限制注册。为了公平竞争，仅测量纯反应速度。"
                  : lang === "es"
                  ? "⚡ Los registros menores a 50ms se consideran predicciones o bugs. Competencia justa."
                  : lang === "pt"
                  ? "⚡ Registros abaixo de 50ms são considerados previsões ou bugs. Competição justa."
                  : lang === "de"
                  ? "⚡ Rekorde unter 50ms gelten als Vorhersagen oder Bugs. Fairer Wettbewerb."
                  : lang === "fr"
                  ? "⚡ Les records inférieurs à 50ms sont considérés comme des prédictions ou bugs. Compétition équitable."
                  : "⚡ Records under 50ms are considered prediction shots or bugs. Fair competition."
                }
              </p>
            </div>
            
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎮</div>
                <p className="text-dark-400">{t.noRecords}</p>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      index === 0 ? "bg-yellow-500 text-black" :
                      index === 1 ? "bg-gray-300 text-black" :
                      index === 2 ? "bg-orange-500 text-black" :
                      "bg-dark-700 text-dark-300"
                    }`}>
                      {index + 1}
                    </div>
                    {/* 아바타 (회원: 프로필사진, 비회원: 첫 글자) */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden ${
                      entry.user_id ? "ring-2 ring-accent-500/50" : "bg-dark-600 text-dark-400"
                    }`}>
                      {entry.user_id && entry.avatar_url ? (
                        <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : entry.user_id ? (
                        <div className="w-full h-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white">
                          {entry.nickname?.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <span>{entry.nickname?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    {/* 국기 */}
                    <span className="text-base flex-shrink-0">{getCountryFlag(entry.country)}</span>
                    {/* 정보 */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        {/* 👤 회원 배지 + 순위 배지 (분리) */}
                        {entry.user_id && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ {lang === "ko" ? "회원" : "M"}</span>
                        )}
                        {/* 종합 순위 배지 (API에서 overall_rank 제공) */}
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
                        <span className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-300">
                          {entry.device_type === "mobile" ? "📱" : "🖥️"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={
                          entry.grade === t.challenger || entry.grade === "Challenger" || entry.grade === "챌린저" ? "text-cyan-300" :
                          entry.grade === t.master || entry.grade === "Master" || entry.grade === "마스터" ? "text-purple-400" :
                          entry.grade === t.diamond || entry.grade === "Diamond" || entry.grade === "다이아몬드" ? "text-blue-400" :
                          entry.grade === t.platinum || entry.grade === "Platinum" || entry.grade === "플래티넘" ? "text-teal-400" :
                          "text-yellow-400"
                        }>{translateGrade(entry.grade, lang)}</span>
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
                      const calculatedRank = myRank || (leaderboard.length === 0 
                        ? 1 
                        : leaderboard.findIndex(e => reactionTime < e.score) === -1 
                          ? totalCount + 1 
                          : leaderboard.findIndex(e => reactionTime < e.score) + 1);
                      const isFirstPlace = leaderboard.length === 0 || reactionTime < leaderboard[0].score;
                      
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : calculatedRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${
                            isFirstPlace 
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" 
                              : calculatedRank <= 3 
                                ? "text-yellow-400"
                                : "text-white"
                          }`}>
                            {isFirstPlace 
                              ? (lang === "ko" ? "🔥 새로운 1등!" : "🔥 New #1!") 
                              : (lang === "ko" ? `현재 ${calculatedRank}위!` : `Rank #${calculatedRank}!`)}
                          </h3>
                          <p className="text-dark-400 text-sm">
                            {isFirstPlace 
                              ? (lang === "ko" ? "역대 최고 기록을 달성했어요!" : "You beat the record!") 
                              : calculatedRank <= 3
                                ? (lang === "ko" ? "TOP 3 진입! 대단해요!" : "TOP 3! Amazing!")
                                : calculatedRank <= 10
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
                  
                  {/* 🔐 비회원 로그인 유도 - 점수 저장 후 리다이렉트 */}
                  {!currentUserId && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">
                        {lang === "ko" ? "🎮 회원으로 등록하면 점수가 누적돼요!" : "🎮 Login to save scores to your profile!"}
                      </p>
                      <button 
                        onClick={() => {
                          // 점수를 localStorage에 저장
                          localStorage.setItem("pending_game_score", JSON.stringify({
                            game: "reaction",
                            score: reactionTime,
                            timestamp: Date.now()
                          }));
                          // 로그인 페이지로 이동 (리다이렉트 포함)
                          window.location.href = lang === "ko" ? "/login?redirect=/reaction" : `/${lang}/login?redirect=/${lang}/reaction`;
                        }}
                        className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all"
                      >
                        {lang === "ko" ? "로그인하고 이 점수로 등록! →" : "Login & register this score! →"}
                      </button>
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
                  
                  {/* 🥊 도전장 만들기 버튼 (회원만) */}
                  {currentUserId && !battleMode && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (lang === "ko" ? "생성 중..." : "Creating...")
                          : (lang === "ko" ? "친구에게 도전장 보내기!" : "Send challenge to friend!")}
                      </span>
                    </button>
                  )}
                  
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
                      ? `${reactionTime}ms로 ${myRank ? `${myRank}위 예상!` : "순위 계산중..."}` 
                      : `${reactionTime}ms${myRank ? ` - Rank #${myRank}` : ""}`}
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
                        <p className="text-yellow-400 font-bold text-lg">{t.newFirst}</p>
                        <p className="text-dark-400 text-sm mt-1">
                          {t.beatPrevious.replace("{name}", leaderboard[0].nickname).replace("{diff}", String(leaderboard[0].score - reactionTime))}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">{t.currentFirst}</p>
                          <p className="text-yellow-400 font-bold text-lg">{leaderboard[0].score}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-400 text-xs">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="w-px h-10 bg-dark-700" />
                        <div className="text-center">
                          <p className="text-dark-500 text-[10px] uppercase tracking-wider">{t.myRecord}</p>
                          <p className="text-purple-400 font-bold text-lg">{reactionTime}<span className="text-xs text-dark-500">ms</span></p>
                          <p className="text-dark-500 text-xs">+{reactionTime - leaderboard[0].score}ms</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-4 p-4 rounded-xl text-center bg-gradient-to-b from-yellow-500/15 to-transparent border border-yellow-500/30">
                    <p className="text-yellow-400 font-bold text-lg">{t.firstChallenger}</p>
                    <p className="text-dark-400 text-sm mt-1">{t.registerFirstNote}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-dark-300 text-sm mb-2">
                    {lang === "ko" ? "닉네임 (최대 20자)" : lang === "ja" ? "ニックネーム (最大20文字)" : lang === "zh" ? "昵称 (最多20字)" : "Nickname (max 20 chars)"}
                  </label>
                  {/* 👤 회원 로그인 시 닉네임 고정 */}
                  {currentUserId && currentUserNickname ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={currentUserNickname}
                        disabled
                        className="w-full px-4 py-3 bg-dark-900 border border-accent-500/50 rounded-xl text-white cursor-not-allowed opacity-80"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-accent-500/20 text-accent-400 border border-accent-500/30 font-medium">
                          ✓ 회원
                        </span>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                      placeholder={lang === "ko" ? "닉네임 입력..." : "Enter nickname..."}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-accent-purple transition-colors"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && submitScore()}
                    />
                  )}
                  {currentUserId && (
                    <p className="text-xs text-dark-500 mt-1.5">
                      {lang === "ko" ? "💡 회원은 프로필 닉네임으로 자동 등록됩니다" : "💡 Members use their profile nickname"}
                    </p>
                  )}
                  {/* 🔐 비로그인 시 로그인 유도 - 새 탭으로 열어서 게임 상태 유지 */}
                  {!currentUserId && (
                    <div className="mt-3 p-3 bg-accent-purple/10 rounded-lg border border-accent-purple/20">
                      <p className="text-xs text-dark-300 mb-1">
                        {lang === "ko" ? "💡 로그인하면 회원 점수에 반영됩니다" : "💡 Login to save your score to your profile"}
                      </p>
                      <a 
                        href={lang === "ko" ? "/login" : `/${lang}/login`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent-purple text-xs hover:underline"
                      >
                        {lang === "ko" ? "로그인하러 가기 (새 탭) →" : "Go to login (new tab) →"}
                      </a>
                    </div>
                  )}
                </div>
                
                {/* 국가 선택 */}
                <div className="mb-4">
                  <label className="block text-dark-300 text-sm mb-2">
                    {lang === "ko" ? "국가" : lang === "ja" ? "国" : lang === "zh" ? "国家" : lang === "de" ? "Land" : lang === "fr" ? "Pays" : lang === "es" ? "País" : lang === "pt" ? "País" : "Country"}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white appearance-none focus:outline-none focus:border-accent-purple transition-colors"
                    >
                      {COUNTRY_OPTIONS.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.flag} {option.name[lang]}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-dark-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNicknameModal(false)}
                    className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl transition-all"
                  >
                    {t.cancel}
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
                      ? t.registerFirstBtn 
                      : t.submit}
                  </button>
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
                  <p className="text-white text-center font-bold mb-2">⚡ {reactionTime}ms</p>
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
                  {leaderboard.length === 0 ? "1위!" : reactionTime <= leaderboard[0].score ? "1위!" : `${myRank || "?"}위`}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "10px" }}>{reactionTime}ms</div>
              </div>
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
              {t.sameTierNote}
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
              {t.desktopNote}
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

          <AdBanner className="my-8" />

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">{t.poweredBy}</p>
            <Link href="/" className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
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

