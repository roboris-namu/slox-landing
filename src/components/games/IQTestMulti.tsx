"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import html2canvas from "html2canvas";
import AdBanner from "../AdBanner";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";

import { Locale } from "@/locales";

// 다국어 타입은 @/locales에서 import

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

const DEFAULT_COUNTRY: Record<Locale, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR"
};

// 언어별 번역
const translations: Record<Locale, {
  title: string;
  subtitle: string;
  questions: string;
  perQuestion: string;
  patternAnalysis: string;
  tip: string;
  tipText: string;
  ready: string;
  mensaStyle: string;
  startTest: string;
  currentScore: string;
  difficulty: string;
  timeLeft: string;
  question: string;
  correct: string;
  whichOne: string;
  correctAnswer: string;
  wrongAnswer: string;
  timeout: string;
  totalScore: string;
  correctCount: string;
  timeTaken: string;
  registeredRanking: string;
  share: string;
  shareImage: string;
  tryAgain: string;
  registerRanking: string;
  hallOfFame: string;
  refresh: string;
  noRecords: string;
  firstChallenger: string;
  currentFirst: string;
  myRecord: string;
  newFirst: string;
  currentRank: string;
  registerNow: string;
  shareWithFriends: string;
  maybeLater: string;
  rankingRegister: string;
  nickname: string;
  country: string;
  cancel: string;
  register: string;
  howToPlay: string;
  step1: string;
  step1Text: string;
  step2: string;
  step2Text: string;
  step3: string;
  step3Text: string;
  gradeTable: string;
  gradeDesc: string;
  otherGames: string;
  copied: string;
  seconds: string;
  grades: { genius: string; gifted: string; excellent: string; average: string; normal: string; needsWork: string };
  gradeDescs: { genius: string; gifted: string; excellent: string; average: string; normal: string; needsWork: string };
}> = {
  ko: {
    title: "IQ 테스트",
    subtitle: "패턴을 분석하고 당신의 IQ를 측정하세요!",
    questions: "문제 수",
    perQuestion: "문제당",
    patternAnalysis: "패턴분석",
    tip: "IQ 테스트 팁",
    tipText: "패턴의 규칙을 찾아보세요. 숫자, 색상, 개수 등 다양한 규칙이 있습니다!",
    ready: "준비되셨나요?",
    mensaStyle: "멘사 스타일 패턴 문제!",
    startTest: "🎮 테스트 시작",
    currentScore: "현재 점수",
    difficulty: "난이도",
    timeLeft: "⏱️ 남은 시간",
    question: "문제",
    correct: "정답",
    whichOne: "다음 패턴에서 ?에 들어갈 것은?",
    correctAnswer: "✅ 정답!",
    wrongAnswer: "❌ 오답!",
    timeout: "⏰ 시간 초과!",
    totalScore: "총점",
    correctCount: "정답",
    timeTaken: "소요시간",
    registeredRanking: "✅ 랭킹에 등록되었습니다!",
    share: "📤 공유하기",
    shareImage: "🖼️ 이미지 공유",
    tryAgain: "🔄 다시 도전",
    registerRanking: "🏆 랭킹 등록!",
    hallOfFame: "🏆 명예의전당",
    refresh: "🔄 새로고침",
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    firstChallenger: "첫 번째 도전자가 되어보세요!",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
    newFirst: "🔥 새로운 1등!",
    currentRank: "현재",
    registerNow: "랭킹 등록하기!",
    shareWithFriends: "친구에게 공유하기",
    maybeLater: "나중에 할게요",
    rankingRegister: "🏆 랭킹 등록",
    nickname: "닉네임...",
    country: "국가",
    cancel: "취소",
    register: "등록!",
    howToPlay: "🎯 게임 방법",
    step1: "1️⃣ 패턴 분석",
    step1Text: "주어진 패턴을 분석하세요",
    step2: "2️⃣ 규칙 찾기",
    step2Text: "숫자, 색상, 개수 등의 규칙!",
    step3: "3️⃣ 빠르게!",
    step3Text: "30초 안에 정답 선택!",
    gradeTable: "🏆 IQ 등급표",
    gradeDesc: "💡 정답 개수 + 속도로 IQ 계산!",
    otherGames: "🔗 다른 게임",
    copied: "✅ 복사됨!",
    seconds: "초",
    grades: { genius: "천재", gifted: "수재", excellent: "우수", average: "평균", normal: "보통", needsWork: "노력필요" },
    gradeDescs: { genius: "상위 0.1%", gifted: "상위 2%", excellent: "상위 15%", average: "평균", normal: "평균 이하", needsWork: "더 노력해요!" }
  },
  en: {
    title: "IQ Test",
    subtitle: "Analyze patterns and measure your IQ!",
    questions: "Questions",
    perQuestion: "Per Question",
    patternAnalysis: "Pattern",
    tip: "IQ Test Tip",
    tipText: "Find the pattern rules. Look for numbers, colors, quantities, and more!",
    ready: "Ready?",
    mensaStyle: "Mensa-style pattern questions!",
    startTest: "🎮 Start Test",
    currentScore: "Score",
    difficulty: "Difficulty",
    timeLeft: "⏱️ Time Left",
    question: "Question",
    correct: "Correct",
    whichOne: "What comes next in the pattern?",
    correctAnswer: "✅ Correct!",
    wrongAnswer: "❌ Wrong!",
    timeout: "⏰ Time's up!",
    totalScore: "Total",
    correctCount: "Correct",
    timeTaken: "Time",
    registeredRanking: "✅ Registered in ranking!",
    share: "📤 Share",
    shareImage: "🖼️ Share Image",
    tryAgain: "🔄 Try Again",
    registerRanking: "🏆 Register Ranking!",
    hallOfFame: "🏆 Hall of Fame",
    refresh: "🔄 Refresh",
    noRecords: "No records yet. Be the first challenger!",
    firstChallenger: "Be the first challenger!",
    currentFirst: "Current #1",
    myRecord: "My Record",
    newFirst: "🔥 New #1!",
    currentRank: "Current",
    registerNow: "Register Ranking!",
    shareWithFriends: "Share with Friends",
    maybeLater: "Maybe Later",
    rankingRegister: "🏆 Register",
    nickname: "Nickname...",
    country: "Country",
    cancel: "Cancel",
    register: "Register!",
    howToPlay: "🎯 How to Play",
    step1: "1️⃣ Analyze",
    step1Text: "Analyze the given pattern",
    step2: "2️⃣ Find Rules",
    step2Text: "Numbers, colors, quantities!",
    step3: "3️⃣ Be Quick!",
    step3Text: "Answer in 30 seconds!",
    gradeTable: "🏆 IQ Grade Table",
    gradeDesc: "💡 IQ = Correct answers + Speed!",
    otherGames: "🔗 Other Games",
    copied: "✅ Copied!",
    seconds: "s",
    grades: { genius: "Genius", gifted: "Gifted", excellent: "Excellent", average: "Average", normal: "Normal", needsWork: "Keep Trying" },
    gradeDescs: { genius: "Top 0.1%", gifted: "Top 2%", excellent: "Top 15%", average: "Average", normal: "Below Avg", needsWork: "Keep practicing!" }
  },
  ja: {
    title: "IQテスト",
    subtitle: "パターンを分析してIQを測定しよう！",
    questions: "問題数",
    perQuestion: "制限時間",
    patternAnalysis: "パターン",
    tip: "IQテストのコツ",
    tipText: "パターンの規則を見つけよう。数字、色、数などの規則があります！",
    ready: "準備はいいですか？",
    mensaStyle: "メンサスタイルのパターン問題！",
    startTest: "🎮 テスト開始",
    currentScore: "現在のスコア",
    difficulty: "難易度",
    timeLeft: "⏱️ 残り時間",
    question: "問題",
    correct: "正解",
    whichOne: "パターンの?に入るものは？",
    correctAnswer: "✅ 正解！",
    wrongAnswer: "❌ 不正解！",
    timeout: "⏰ 時間切れ！",
    totalScore: "合計",
    correctCount: "正解数",
    timeTaken: "所要時間",
    registeredRanking: "✅ ランキングに登録されました！",
    share: "📤 シェア",
    shareImage: "🖼️ 画像シェア",
    tryAgain: "🔄 もう一度",
    registerRanking: "🏆 ランキング登録！",
    hallOfFame: "🏆 名誉の殿堂",
    refresh: "🔄 更新",
    noRecords: "まだ記録がありません。最初の挑戦者になろう！",
    firstChallenger: "最初の挑戦者になろう！",
    currentFirst: "現在1位",
    myRecord: "私の記録",
    newFirst: "🔥 新しい1位！",
    currentRank: "現在",
    registerNow: "ランキング登録！",
    shareWithFriends: "友達にシェア",
    maybeLater: "後で",
    rankingRegister: "🏆 ランキング登録",
    nickname: "ニックネーム...",
    country: "国",
    cancel: "キャンセル",
    register: "登録！",
    howToPlay: "🎯 遊び方",
    step1: "1️⃣ 分析",
    step1Text: "パターンを分析しよう",
    step2: "2️⃣ 規則発見",
    step2Text: "数字、色、数など！",
    step3: "3️⃣ 速く！",
    step3Text: "30秒以内に回答！",
    gradeTable: "🏆 IQ等級表",
    gradeDesc: "💡 正解数+速度でIQ計算！",
    otherGames: "🔗 他のゲーム",
    copied: "✅ コピー済み！",
    seconds: "秒",
    grades: { genius: "天才", gifted: "秀才", excellent: "優秀", average: "平均", normal: "普通", needsWork: "頑張れ" },
    gradeDescs: { genius: "上位0.1%", gifted: "上位2%", excellent: "上位15%", average: "平均", normal: "平均以下", needsWork: "もっと頑張ろう！" }
  },
  zh: {
    title: "IQ测试",
    subtitle: "分析模式，测量你的智商！",
    questions: "题目数",
    perQuestion: "每题时间",
    patternAnalysis: "模式分析",
    tip: "IQ测试提示",
    tipText: "找出模式规律。数字、颜色、数量等都可能是规律！",
    ready: "准备好了吗？",
    mensaStyle: "门萨风格模式问题！",
    startTest: "🎮 开始测试",
    currentScore: "当前分数",
    difficulty: "难度",
    timeLeft: "⏱️ 剩余时间",
    question: "问题",
    correct: "正确",
    whichOne: "模式中?应该填什么？",
    correctAnswer: "✅ 正确！",
    wrongAnswer: "❌ 错误！",
    timeout: "⏰ 时间到！",
    totalScore: "总分",
    correctCount: "正确",
    timeTaken: "用时",
    registeredRanking: "✅ 已登记排名！",
    share: "📤 分享",
    shareImage: "🖼️ 分享图片",
    tryAgain: "🔄 再试一次",
    registerRanking: "🏆 登记排名！",
    hallOfFame: "🏆 荣誉殿堂",
    refresh: "🔄 刷新",
    noRecords: "还没有记录。成为第一个挑战者吧！",
    firstChallenger: "成为第一个挑战者！",
    currentFirst: "当前第一",
    myRecord: "我的记录",
    newFirst: "🔥 新的第一！",
    currentRank: "当前",
    registerNow: "登记排名！",
    shareWithFriends: "分享给朋友",
    maybeLater: "以后再说",
    rankingRegister: "🏆 登记排名",
    nickname: "昵称...",
    country: "国家",
    cancel: "取消",
    register: "登记！",
    howToPlay: "🎯 玩法",
    step1: "1️⃣ 分析",
    step1Text: "分析给定的模式",
    step2: "2️⃣ 找规律",
    step2Text: "数字、颜色、数量！",
    step3: "3️⃣ 快速！",
    step3Text: "30秒内作答！",
    gradeTable: "🏆 IQ等级表",
    gradeDesc: "💡 IQ = 正确数 + 速度！",
    otherGames: "🔗 其他游戏",
    copied: "✅ 已复制！",
    seconds: "秒",
    grades: { genius: "天才", gifted: "秀才", excellent: "优秀", average: "平均", normal: "普通", needsWork: "继续努力" },
    gradeDescs: { genius: "前0.1%", gifted: "前2%", excellent: "前15%", average: "平均", normal: "平均以下", needsWork: "继续加油！" }
  },
  de: {
    title: "IQ-Test",
    subtitle: "Analysiere Muster und miss deinen IQ!",
    questions: "Fragen",
    perQuestion: "Pro Frage",
    patternAnalysis: "Muster",
    tip: "IQ-Test Tipp",
    tipText: "Finde die Musterregeln. Achte auf Zahlen, Farben, Mengen!",
    ready: "Bereit?",
    mensaStyle: "Mensa-Stil Musteraufgaben!",
    startTest: "🎮 Test starten",
    currentScore: "Punktzahl",
    difficulty: "Schwierigkeit",
    timeLeft: "⏱️ Restzeit",
    question: "Frage",
    correct: "Richtig",
    whichOne: "Was kommt als nächstes im Muster?",
    correctAnswer: "✅ Richtig!",
    wrongAnswer: "❌ Falsch!",
    timeout: "⏰ Zeit abgelaufen!",
    totalScore: "Gesamt",
    correctCount: "Richtig",
    timeTaken: "Zeit",
    registeredRanking: "✅ Im Ranking eingetragen!",
    share: "📤 Teilen",
    shareImage: "🖼️ Bild teilen",
    tryAgain: "🔄 Nochmal",
    registerRanking: "🏆 Ranking eintragen!",
    hallOfFame: "🏆 Ruhmeshalle",
    refresh: "🔄 Aktualisieren",
    noRecords: "Noch keine Einträge. Sei der Erste!",
    firstChallenger: "Sei der Erste!",
    currentFirst: "Aktuell #1",
    myRecord: "Mein Rekord",
    newFirst: "🔥 Neuer #1!",
    currentRank: "Aktuell",
    registerNow: "Ranking eintragen!",
    shareWithFriends: "Mit Freunden teilen",
    maybeLater: "Später",
    rankingRegister: "🏆 Eintragen",
    nickname: "Spitzname...",
    country: "Land",
    cancel: "Abbrechen",
    register: "Eintragen!",
    howToPlay: "🎯 Spielanleitung",
    step1: "1️⃣ Analysieren",
    step1Text: "Analysiere das Muster",
    step2: "2️⃣ Regeln finden",
    step2Text: "Zahlen, Farben, Mengen!",
    step3: "3️⃣ Schnell!",
    step3Text: "Antworte in 30 Sekunden!",
    gradeTable: "🏆 IQ-Stufen",
    gradeDesc: "💡 IQ = Richtige + Geschwindigkeit!",
    otherGames: "🔗 Andere Spiele",
    copied: "✅ Kopiert!",
    seconds: "s",
    grades: { genius: "Genie", gifted: "Hochbegabt", excellent: "Ausgezeichnet", average: "Durchschnitt", normal: "Normal", needsWork: "Weiter üben" },
    gradeDescs: { genius: "Top 0.1%", gifted: "Top 2%", excellent: "Top 15%", average: "Durchschnitt", normal: "Unter Durchschnitt", needsWork: "Weiter üben!" }
  },
  fr: {
    title: "Test de QI",
    subtitle: "Analysez les motifs et mesurez votre QI !",
    questions: "Questions",
    perQuestion: "Par question",
    patternAnalysis: "Motif",
    tip: "Conseil Test QI",
    tipText: "Trouvez les règles du motif. Cherchez les nombres, couleurs, quantités !",
    ready: "Prêt ?",
    mensaStyle: "Questions style Mensa !",
    startTest: "🎮 Commencer",
    currentScore: "Score",
    difficulty: "Difficulté",
    timeLeft: "⏱️ Temps restant",
    question: "Question",
    correct: "Correct",
    whichOne: "Que vient ensuite dans le motif ?",
    correctAnswer: "✅ Correct !",
    wrongAnswer: "❌ Faux !",
    timeout: "⏰ Temps écoulé !",
    totalScore: "Total",
    correctCount: "Correct",
    timeTaken: "Temps",
    registeredRanking: "✅ Enregistré au classement !",
    share: "📤 Partager",
    shareImage: "🖼️ Partager image",
    tryAgain: "🔄 Réessayer",
    registerRanking: "🏆 S'inscrire !",
    hallOfFame: "🏆 Temple de la Gloire",
    refresh: "🔄 Actualiser",
    noRecords: "Aucun record. Soyez le premier !",
    firstChallenger: "Soyez le premier !",
    currentFirst: "#1 actuel",
    myRecord: "Mon record",
    newFirst: "🔥 Nouveau #1 !",
    currentRank: "Actuel",
    registerNow: "S'inscrire !",
    shareWithFriends: "Partager avec amis",
    maybeLater: "Plus tard",
    rankingRegister: "🏆 Inscription",
    nickname: "Pseudo...",
    country: "Pays",
    cancel: "Annuler",
    register: "S'inscrire !",
    howToPlay: "🎯 Comment jouer",
    step1: "1️⃣ Analyser",
    step1Text: "Analysez le motif",
    step2: "2️⃣ Trouver règles",
    step2Text: "Nombres, couleurs, quantités !",
    step3: "3️⃣ Vite !",
    step3Text: "Répondez en 30 secondes !",
    gradeTable: "🏆 Niveaux QI",
    gradeDesc: "💡 QI = Bonnes réponses + Vitesse !",
    otherGames: "🔗 Autres jeux",
    copied: "✅ Copié !",
    seconds: "s",
    grades: { genius: "Génie", gifted: "Surdoué", excellent: "Excellent", average: "Moyen", normal: "Normal", needsWork: "À améliorer" },
    gradeDescs: { genius: "Top 0.1%", gifted: "Top 2%", excellent: "Top 15%", average: "Moyenne", normal: "Sous moyenne", needsWork: "Continuez !" }
  },
  es: {
    title: "Test de CI",
    subtitle: "¡Analiza patrones y mide tu CI!",
    questions: "Preguntas",
    perQuestion: "Por pregunta",
    patternAnalysis: "Patrón",
    tip: "Consejo Test CI",
    tipText: "Encuentra las reglas del patrón. ¡Busca números, colores, cantidades!",
    ready: "¿Listo?",
    mensaStyle: "¡Preguntas estilo Mensa!",
    startTest: "🎮 Iniciar",
    currentScore: "Puntuación",
    difficulty: "Dificultad",
    timeLeft: "⏱️ Tiempo restante",
    question: "Pregunta",
    correct: "Correcto",
    whichOne: "¿Qué sigue en el patrón?",
    correctAnswer: "✅ ¡Correcto!",
    wrongAnswer: "❌ ¡Incorrecto!",
    timeout: "⏰ ¡Tiempo!",
    totalScore: "Total",
    correctCount: "Correcto",
    timeTaken: "Tiempo",
    registeredRanking: "✅ ¡Registrado en ranking!",
    share: "📤 Compartir",
    shareImage: "🖼️ Compartir imagen",
    tryAgain: "🔄 Reintentar",
    registerRanking: "🏆 ¡Registrar!",
    hallOfFame: "🏆 Salón de la Fama",
    refresh: "🔄 Actualizar",
    noRecords: "Sin récords. ¡Sé el primero!",
    firstChallenger: "¡Sé el primero!",
    currentFirst: "#1 actual",
    myRecord: "Mi récord",
    newFirst: "🔥 ¡Nuevo #1!",
    currentRank: "Actual",
    registerNow: "¡Registrar!",
    shareWithFriends: "Compartir con amigos",
    maybeLater: "Quizás después",
    rankingRegister: "🏆 Registrar",
    nickname: "Apodo...",
    country: "País",
    cancel: "Cancelar",
    register: "¡Registrar!",
    howToPlay: "🎯 Cómo jugar",
    step1: "1️⃣ Analizar",
    step1Text: "Analiza el patrón",
    step2: "2️⃣ Buscar reglas",
    step2Text: "¡Números, colores, cantidades!",
    step3: "3️⃣ ¡Rápido!",
    step3Text: "¡Responde en 30 segundos!",
    gradeTable: "🏆 Niveles CI",
    gradeDesc: "💡 CI = Correctas + Velocidad!",
    otherGames: "🔗 Otros juegos",
    copied: "✅ ¡Copiado!",
    seconds: "s",
    grades: { genius: "Genio", gifted: "Superdotado", excellent: "Excelente", average: "Promedio", normal: "Normal", needsWork: "Sigue intentando" },
    gradeDescs: { genius: "Top 0.1%", gifted: "Top 2%", excellent: "Top 15%", average: "Promedio", normal: "Bajo promedio", needsWork: "¡Sigue practicando!" }
  },
  pt: {
    title: "Teste de QI",
    subtitle: "Analise padrões e meça seu QI!",
    questions: "Questões",
    perQuestion: "Por questão",
    patternAnalysis: "Padrão",
    tip: "Dica Teste QI",
    tipText: "Encontre as regras do padrão. Procure números, cores, quantidades!",
    ready: "Pronto?",
    mensaStyle: "Questões estilo Mensa!",
    startTest: "🎮 Iniciar",
    currentScore: "Pontuação",
    difficulty: "Dificuldade",
    timeLeft: "⏱️ Tempo restante",
    question: "Questão",
    correct: "Correto",
    whichOne: "O que vem a seguir no padrão?",
    correctAnswer: "✅ Correto!",
    wrongAnswer: "❌ Errado!",
    timeout: "⏰ Tempo esgotado!",
    totalScore: "Total",
    correctCount: "Correto",
    timeTaken: "Tempo",
    registeredRanking: "✅ Registrado no ranking!",
    share: "📤 Compartilhar",
    shareImage: "🖼️ Compartilhar imagem",
    tryAgain: "🔄 Tentar de novo",
    registerRanking: "🏆 Registrar!",
    hallOfFame: "🏆 Hall da Fama",
    refresh: "🔄 Atualizar",
    noRecords: "Sem registros. Seja o primeiro!",
    firstChallenger: "Seja o primeiro!",
    currentFirst: "#1 atual",
    myRecord: "Meu recorde",
    newFirst: "🔥 Novo #1!",
    currentRank: "Atual",
    registerNow: "Registrar!",
    shareWithFriends: "Compartilhar com amigos",
    maybeLater: "Talvez depois",
    rankingRegister: "🏆 Registrar",
    nickname: "Apelido...",
    country: "País",
    cancel: "Cancelar",
    register: "Registrar!",
    howToPlay: "🎯 Como jogar",
    step1: "1️⃣ Analisar",
    step1Text: "Analise o padrão",
    step2: "2️⃣ Encontrar regras",
    step2Text: "Números, cores, quantidades!",
    step3: "3️⃣ Rápido!",
    step3Text: "Responda em 30 segundos!",
    gradeTable: "🏆 Níveis QI",
    gradeDesc: "💡 QI = Corretas + Velocidade!",
    otherGames: "🔗 Outros jogos",
    copied: "✅ Copiado!",
    seconds: "s",
    grades: { genius: "Gênio", gifted: "Superdotado", excellent: "Excelente", average: "Médio", normal: "Normal", needsWork: "Continue tentando" },
    gradeDescs: { genius: "Top 0.1%", gifted: "Top 2%", excellent: "Top 15%", average: "Média", normal: "Abaixo média", needsWork: "Continue praticando!" }
  }
};

// 언어 선택기 옵션은 GameNavBar에서 처리

interface IQQuestion {
  id: number;
  pattern: string[];
  options: string[];
  answer: number;
  difficulty: number;
}

// 패턴 문제는 언어 독립적
const iqQuestions: IQQuestion[] = [
  { id: 1, pattern: ["🔴", "🔵", "🔴", "🔵", "?"], options: ["🔴", "🟢", "🔵", "🟡"], answer: 0, difficulty: 1 },
  { id: 2, pattern: ["⬛", "⬛", "⬜", "⬛", "⬛", "⬜", "⬛", "⬛", "?"], options: ["⬛", "⬜", "🔲", "🔳"], answer: 1, difficulty: 1 },
  { id: 3, pattern: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "?"], options: ["6️⃣", "5️⃣", "4️⃣", "7️⃣"], answer: 1, difficulty: 1 },
  { id: 4, pattern: ["🌑", "🌒", "🌓", "🌔", "?"], options: ["🌑", "🌕", "🌖", "🌗"], answer: 1, difficulty: 2 },
  { id: 5, pattern: ["🔺", "🔺🔺", "🔺🔺🔺", "?"], options: ["🔺🔺", "🔺🔺🔺🔺", "🔺", "🔺🔺🔺🔺🔺"], answer: 1, difficulty: 2 },
  { id: 6, pattern: ["🅰️", "🅱️", "🅰️", "🅱️", "🅱️", "🅰️", "🅱️", "🅱️", "?"], options: ["🅰️", "🅱️", "🅰️🅱️", "🅱️🅱️"], answer: 1, difficulty: 2 },
  { id: 7, pattern: ["2", "4", "8", "16", "?"], options: ["20", "24", "32", "64"], answer: 2, difficulty: 3 },
  { id: 8, pattern: ["🟥", "🟧", "🟨", "🟩", "?"], options: ["🟦", "🟪", "⬜", "⬛"], answer: 0, difficulty: 3 },
  { id: 9, pattern: ["◀️", "▶️", "◀️◀️", "▶️▶️", "◀️◀️◀️", "?"], options: ["▶️▶️", "▶️▶️▶️", "◀️◀️◀️◀️", "▶️"], answer: 1, difficulty: 3 },
  { id: 10, pattern: ["1", "1", "2", "3", "5", "8", "?"], options: ["10", "11", "12", "13"], answer: 3, difficulty: 3 },
  { id: 11, pattern: ["🔲", "🔳", "🔲🔲", "🔳🔳", "🔲🔲🔲", "?"], options: ["🔳🔳", "🔳🔳🔳", "🔲🔲🔲🔲", "🔳"], answer: 1, difficulty: 4 },
  { id: 12, pattern: ["⭕", "⭕❌", "⭕❌⭕", "⭕❌⭕❌", "?"], options: ["⭕❌⭕❌⭕", "❌⭕❌⭕❌", "⭕⭕❌❌⭕", "❌❌⭕⭕❌"], answer: 0, difficulty: 4 },
  { id: 13, pattern: ["3", "6", "11", "18", "27", "?"], options: ["36", "38", "40", "42"], answer: 1, difficulty: 4 },
  { id: 14, pattern: ["🔵", "🔵🔴", "🔵🔴🔵", "🔵🔴🔵🔴", "🔵🔴🔵🔴🔵", "?"], options: ["🔵🔴🔵🔴🔵🔴", "🔴🔵🔴🔵🔴🔵", "🔵🔵🔴🔴🔵🔵", "🔴🔴🔵🔵🔴🔴"], answer: 0, difficulty: 4 },
  { id: 15, pattern: ["1", "4", "9", "16", "25", "?"], options: ["30", "35", "36", "49"], answer: 2, difficulty: 5 },
  { id: 16, pattern: ["🔴", "🔵🔵", "🔴🔴🔴", "🔵🔵🔵🔵", "?"], options: ["🔴🔴🔴🔴🔴", "🔵🔵🔵🔵🔵", "🔴🔴🔴🔴", "🔵🔵🔵"], answer: 0, difficulty: 5 },
  { id: 17, pattern: ["2", "3", "5", "7", "11", "13", "?"], options: ["15", "17", "19", "21"], answer: 1, difficulty: 5 },
  { id: 18, pattern: ["📦", "📦📦", "📦📦📦📦", "📦📦📦📦📦📦📦📦", "?"], options: ["📦 x 10", "📦 x 12", "📦 x 16", "📦 x 32"], answer: 2, difficulty: 5 },
  { id: 19, pattern: ["A1", "B2", "C3", "D4", "?"], options: ["E5", "F6", "E4", "D5"], answer: 0, difficulty: 4 },
  { id: 20, pattern: ["🟡", "🟡🟢", "🟡🟢🔵", "🟡🟢🔵🟣", "?"], options: ["🟡🟢🔵🟣🔴", "🔴🟡🟢🔵🟣", "🟡🟢🔵🟣🟤", "🟡🟢🔵🟣⚫"], answer: 0, difficulty: 5 },
];

type GameState = "ready" | "playing" | "result";

interface LeaderboardEntry {
  id: number;
  nickname: string;
  score: number;
  iq_score: number;
  country?: string;
  correct_count: number;
  time_seconds: number;
  created_at: string;
  grade?: string;
  user_id?: string;
  avatar_url?: string;
  overall_rank?: number;
}

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/iq" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/iq" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/iq" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/iq" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/iq" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/iq" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/iq" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/iq" },
];

const QUESTION_TIME = 30;
const QUESTIONS_PER_GAME = 12;

interface Props {
  locale: Locale;
}

export default function IQTestMulti({ locale }: Props) {
  const t = translations[locale];
  
  const [gameState, setGameState] = useState<GameState>("ready");
  const [questions, setQuestions] = useState<IQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [totalTime, setTotalTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // 👤 사용자 인증 상태 (초기 로드용, submitScore에서는 실시간 확인)
  const [_currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [_currentUserNickname, setCurrentUserNickname] = useState<string>("");
  void _currentUserId; void _currentUserNickname; // ESLint 경고 방지

  // 👤 사용자 인증 체크 (광고 차단기 우회)
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
      const { data: { user } } = await supabase.auth.getUser();
          if (user?.id) userId = user.id;
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
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=iq&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (error) { console.error("Failed to fetch leaderboard:", error); }
  }, []);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 🚀 게임 결과 시 정확한 순위 계산
  useEffect(() => {
    if (gameState === "result" && score > 0) {
      // calculateIQ()와 동일한 공식 사용 (API scoreField: iq_score)
      const baseIQ = 70;
      const correctBonus = Math.round(correctCount * 6.7);
      const scoreBonus = Math.min(10, Math.floor(score / 150));
      const myIQ = Math.min(160, Math.max(70, baseIQ + correctBonus + scoreBonus));
      fetch(`/api/leaderboard?game=iq&limit=10&myScore=${myIQ}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
    }
  }, [gameState, score, correctCount]);

  const startGame = () => {
    const easy = iqQuestions.filter(q => q.difficulty <= 2).sort(() => Math.random() - 0.5).slice(0, 4);
    const medium = iqQuestions.filter(q => q.difficulty === 3).sort(() => Math.random() - 0.5).slice(0, 4);
    const hard = iqQuestions.filter(q => q.difficulty >= 4).sort(() => Math.random() - 0.5).slice(0, 4);
    setQuestions([...easy, ...medium, ...hard]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setTotalTime(0);
    setShowResult(false);
    setShowRankingPrompt(false);
    setHasSubmitted(false);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing" || showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { handleTimeout(); return QUESTION_TIME; }
        return prev - 1;
      });
    }, 1000);
    totalTimerRef.current = setInterval(() => { setTotalTime((prev) => prev + 1); }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, currentIndex, showResult]);

  const handleTimeout = () => {
    setSelectedAnswer(-1);
    setIsCorrect(false);
    setShowResult(true);
    setTimeout(() => { goToNext(); }, 1500);
  };

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null || showResult) return;
    const correct = index === questions[currentIndex].answer;
    setSelectedAnswer(index);
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      const difficulty = questions[currentIndex].difficulty;
      const timeBonus = Math.floor(timeLeft * 2);
      const difficultyBonus = difficulty * 20;
      setScore((prev) => prev + 50 + timeBonus + difficultyBonus);
      setCorrectCount((prev) => prev + 1);
    }
    setTimeout(() => { goToNext(); }, 1500);
  };

  const goToNext = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    if (currentIndex + 1 >= QUESTIONS_PER_GAME) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
      setGameState("result");
      setShowRankingPrompt(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
      setTimeLeft(QUESTION_TIME);
    }
  };

  const calculateIQ = () => {
    const baseIQ = 70;
    const correctBonus = Math.round(correctCount * 6.7);
    const scoreBonus = Math.min(10, Math.floor(score / 150));
    return Math.min(160, Math.max(70, baseIQ + correctBonus + scoreBonus));
  };

  const getIQGrade = (iq: number) => {
    if (iq >= 145) return { grade: t.grades.genius, emoji: "🧠", color: "text-purple-400", desc: t.gradeDescs.genius };
    if (iq >= 130) return { grade: t.grades.gifted, emoji: "💎", color: "text-blue-400", desc: t.gradeDescs.gifted };
    if (iq >= 115) return { grade: t.grades.excellent, emoji: "⭐", color: "text-cyan-400", desc: t.gradeDescs.excellent };
    if (iq >= 100) return { grade: t.grades.average, emoji: "👍", color: "text-green-400", desc: t.gradeDescs.average };
    if (iq >= 85) return { grade: t.grades.normal, emoji: "😊", color: "text-yellow-400", desc: t.gradeDescs.normal };
    return { grade: t.grades.needsWork, emoji: "📚", color: "text-orange-400", desc: t.gradeDescs.needsWork };
  };

  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || hasSubmitted) return;
    
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
    
    const iqScore = calculateIQ();
    const gradeInfo = getIQGrade(iqScore);
    const finalNickname = realUserId && realUserNickname ? realUserNickname : nickname.trim();
    const finalUserId = realUserId;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "iq",
          data: {
        nickname: finalNickname,
        score,
        iq_score: iqScore,
        correct_count: correctCount,
        time_seconds: totalTime,
        grade: gradeInfo.grade,
        country: selectedCountry,
          },
          userId: finalUserId,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // 👤 회원 점수 업데이트는 API에서 자동 처리됨
        setHasSubmitted(true); setShowNicknameModal(false); setShowRankingPrompt(false); fetchLeaderboard();
      } else {
        throw new Error(result.error);
      }
    } catch (error) { console.error("Failed to submit score:", error); }
    finally { setIsSubmitting(false); }
  };

  const shareResult = async () => {
    const iqScore = calculateIQ();
    const gradeInfo = getIQGrade(iqScore);
    const shareUrl = locale === "ko" ? "https://www.slox.co.kr/iq" : `https://www.slox.co.kr/${locale}/iq`;
    const firstPlace = leaderboard[0];
    
    const text = `🧠 ${t.title}!\n\n` +
      `${gradeInfo.emoji} IQ ${iqScore} (${gradeInfo.grade})\n` +
      `✅ ${t.correct}: ${correctCount}/${QUESTIONS_PER_GAME}\n` +
      `⏱️ ${t.timeTaken}: ${totalTime}${t.seconds}\n\n` +
      (firstPlace ? `🏆 #1: ${firstPlace.nickname} (IQ ${firstPlace.iq_score})\n\n` : "") +
      `${shareUrl}`;

    if (typeof navigator.share === "function") {
      try { await navigator.share({ text }); return; } 
      catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
    }
    
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const shareAsImage = async () => {
    const blob = await generateImage();
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `iq-${calculateIQ()}.png`, { type: "image/png" });
      const shareData = { files: [file], text: `🧠 ${t.title}! ${locale === "ko" ? "https://www.slox.co.kr/iq" : `https://www.slox.co.kr/${locale}/iq`}` };
      if (navigator.canShare?.(shareData)) {
        try { await navigator.share(shareData); return; } 
        catch (e) { if (e instanceof Error && e.name === "AbortError") return; }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `iq-${calculateIQ()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    shareCardRef.current.style.display = "block";
    try {
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } finally { shareCardRef.current.style.display = "none"; }
  };

  const currentQuestion = questions[currentIndex];
  const iqScore = calculateIQ();
  const iqGrade = getIQGrade(iqScore);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - GameNavBar 사용 */}
      <GameNavBar locale={locale} backText={locale === "ko" ? "← 메인" : "← Main"} languageOptions={languageOptions} />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-purple-400 text-sm font-medium">🧠 {t.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title.split(" ")[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> {t.title.split(" ").slice(1).join(" ") || ""}</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {gameState === "ready" && (
            <>
              <div className="flex justify-center gap-4 mb-8">
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.questions}</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.perQuestion}</span>
                  <span className="text-white font-bold">30{t.seconds}</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.patternAnalysis}</span>
                  <span className="text-white font-bold">🧩</span>
                </div>
              </div>
              <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-white font-medium mb-1">{t.tip}</p>
                    <p className="text-dark-400 text-sm">{t.tipText}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {gameState === "playing" && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="px-5 py-2 rounded-xl border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="text-dark-400 text-xs">{t.currentScore}</p>
                      <p className="text-2xl font-black text-white">{score}</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
                  <span className="text-purple-400 text-sm font-bold">{t.difficulty} {currentQuestion?.difficulty || 1}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className={`text-center px-4 py-2 rounded-xl transition-all ${timeLeft <= 10 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'}`}>
                  <p className="text-dark-400 text-xs">{t.timeLeft}</p>
                  <p className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}{t.seconds}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">{t.question}</p>
                  <p className="text-xl font-bold text-green-400">{currentIndex + 1}/{QUESTIONS_PER_GAME}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">{t.correct}</p>
                  <p className="text-xl font-bold text-yellow-400">{correctCount}</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative rounded-2xl p-6 mb-8 min-h-[400px] bg-dark-900">
            {gameState === "ready" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-bounce">🧩</div>
                <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                <p className="text-dark-400 mb-6">{t.mensaStyle}</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                  {t.startTest}
                </button>
              </div>
            )}

            {gameState === "playing" && currentQuestion && (
              <div className="py-4">
                <div className="h-2 bg-dark-700 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_GAME) * 100}%` }} />
                </div>
                <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-6 mb-6 text-center">
                  <p className="text-dark-400 mb-4">{t.whichOne}</p>
                  <div className="text-2xl md:text-3xl font-mono tracking-wider flex flex-wrap justify-center gap-2">
                    {currentQuestion.pattern.map((item, i) => (
                      <span key={i} className={item === "?" ? "text-purple-400 animate-pulse" : "text-white"}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, index) => {
                    let buttonClass = "p-5 rounded-xl border-2 font-medium transition-all text-center text-xl outline-none ";
                    if (showResult) {
                      if (index === currentQuestion.answer) buttonClass += "bg-green-500/20 border-green-500 text-green-400";
                      else if (index === selectedAnswer && !isCorrect) buttonClass += "bg-red-500/20 border-red-500 text-red-400";
                      else buttonClass += "bg-dark-800/50 border-dark-700/50 text-dark-500";
                    } else {
                      buttonClass += "bg-dark-800/50 border-transparent hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer text-white";
                    }
                    return (
                      <button key={index} onClick={() => selectAnswer(index)} disabled={showResult} className={buttonClass}>{option}</button>
                    );
                  })}
                </div>
                {showResult && (
                  <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {selectedAnswer === -1 ? t.timeout : isCorrect ? t.correctAnswer : t.wrongAnswer}
                  </div>
                )}
              </div>
            )}

            {gameState === "result" && (
              <div className="py-4 text-center">
                <div className="text-6xl mb-4">{iqGrade.emoji}</div>
                <h2 className={`text-4xl font-bold mb-2 ${iqGrade.color}`}>IQ {iqScore}</h2>
                <p className="text-xl text-dark-400 mb-1">{iqGrade.grade}</p>
                <p className="text-dark-500 text-sm">{iqGrade.desc}</p>
                
                <div className="my-6 p-6 bg-dark-800/50 rounded-2xl border border-dark-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-400">{score}</div>
                      <div className="text-dark-400 text-sm">{t.totalScore}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">{correctCount}/{QUESTIONS_PER_GAME}</div>
                      <div className="text-dark-400 text-sm">{t.correctCount}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-400">{totalTime}{t.seconds}</div>
                      <div className="text-dark-400 text-sm">{t.timeTaken}</div>
                    </div>
                  </div>
                </div>

                {hasSubmitted && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
                    {t.registeredRanking}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                  <button onClick={shareResult} className="px-4 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl">
                    {showCopied ? t.copied : t.share}
                  </button>
                  <button onClick={shareAsImage} className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl">
                    {t.shareImage}
                  </button>
                  <button onClick={startGame} className="px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl">
                    {t.tryAgain}
                  </button>
                </div>

                {!hasSubmitted && correctCount > 0 && (
                  <button onClick={() => setShowNicknameModal(true)} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                    {t.registerRanking}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 공유 카드 (hidden) */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#a855f7", fontSize: "12px" }}>🧠 {t.title}</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{iqGrade.emoji}</div>
              <div style={{ fontSize: "36px", fontWeight: "bold", marginTop: "8px", color: "#a855f7" }}>IQ {iqScore}</div>
              <div style={{ fontSize: "18px", color: "#9ca3af", marginTop: "4px" }}>{iqGrade.grade}</div>
              <div style={{ color: "#6b7280", fontSize: "11px", marginTop: "6px" }}>{t.correct} {correctCount}/{QUESTIONS_PER_GAME} • {totalTime}{t.seconds}</div>
            </div>
          </div>

          {/* 명예의전당 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium flex items-center gap-2">{t.hallOfFame}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-500 hover:text-white text-xs">{t.refresh}</button>
            </div>
            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  // IQ 점수 기반으로 등급 계산 (번역된 등급 사용)
                  const iq = entry.iq_score || 100;
                  const entryGrade = iq >= 140 ? { grade: t.grades.genius, color: "text-yellow-400" }
                    : iq >= 130 ? { grade: t.grades.gifted, color: "text-purple-400" }
                    : iq >= 120 ? { grade: t.grades.excellent, color: "text-blue-400" }
                    : iq >= 110 ? { grade: t.grades.average, color: "text-green-400" }
                    : iq >= 100 ? { grade: t.grades.normal, color: "text-cyan-400" }
                    : { grade: t.grades.needsWork, color: "text-orange-400" };
                  return (
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
                      <span className="text-base flex-shrink-0">{COUNTRY_OPTIONS.find(c => c.code === entry.country)?.flag || "🌍"}</span>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-white font-medium truncate">{entry.nickname}</p>
                          {/* 👤 회원 배지 + 순위 배지 (분리) */}
                          {entry.user_id && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ {locale === "ko" ? "회원" : "M"}</span>
                          )}
                          {/* 종합 순위 배지 */}
                          {entry.user_id && entry.overall_rank && entry.overall_rank <= 10 && (
                            entry.overall_rank === 1 ? (
                              <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-300 border border-yellow-500/50 font-bold shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse">👑 {locale === "ko" ? "종합1위" : "#1"}</span>
                            ) : entry.overall_rank === 2 ? (
                              <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gray-400/20 text-gray-300 border border-gray-400/40 font-bold">🥈 {locale === "ko" ? "종합2위" : "#2"}</span>
                            ) : entry.overall_rank === 3 ? (
                              <span className="text-xs px-1.5 py-0.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold">🥉 {locale === "ko" ? "종합3위" : "#3"}</span>
                            ) : (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">🏆 {locale === "ko" ? "종합" : ""}{entry.overall_rank}{locale === "ko" ? "위" : "th"}</span>
                            )
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                          <span className={entryGrade.color}>{entryGrade.grade}</span>
                          <span>•</span>
                          <span>{entry.correct_count}/12</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">IQ {entry.iq_score}</div>
                        <div className="text-xs text-dark-500">{index + 1} / {totalCount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-dark-500">
                <span className="text-4xl mb-2 block">🧠</span>
                {t.noRecords}
              </div>
            )}
          </div>

          {/* 게임 방법 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">{t.howToPlay}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">{t.step1}</p>
                <p className="text-dark-400 mt-1">{t.step1Text}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-pink-400 font-medium">{t.step2}</p>
                <p className="text-dark-400 mt-1">{t.step2Text}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">{t.step3}</p>
                <p className="text-dark-400 mt-1">{t.step3Text}</p>
              </div>
            </div>
          </div>

          {/* IQ 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">{t.gradeTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-4">{t.gradeDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg border border-yellow-400/50">
                <span className="text-yellow-400 font-bold">🧠 {t.grades.genius}</span>
                <p className="text-dark-400 text-xs">IQ 140+</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.genius}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg border border-purple-400/50">
                <span className="text-purple-400 font-bold">💎 {t.grades.gifted}</span>
                <p className="text-dark-400 text-xs">IQ 130~139</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.gifted}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg border border-blue-400/50">
                <span className="text-blue-400 font-bold">⭐ {t.grades.excellent}</span>
                <p className="text-dark-400 text-xs">IQ 120~129</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.excellent}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg border border-green-400/50">
                <span className="text-green-400 font-bold">👍 {t.grades.average}</span>
                <p className="text-dark-400 text-xs">IQ 110~119</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.average}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg border border-cyan-400/50">
                <span className="text-cyan-400 font-bold">😊 {t.grades.normal}</span>
                <p className="text-dark-400 text-xs">IQ 100~109</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.normal}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg border border-orange-400/50">
                <span className="text-orange-400 font-bold">📚 {t.grades.needsWork}</span>
                <p className="text-dark-400 text-xs">IQ ~99</p>
                <p className="text-dark-500 text-xs">{t.gradeDescs.needsWork}</p>
              </div>
            </div>
          </div>
        </div>
        <AdBanner className="my-8" />
      </main>

      {/* 랭킹 등록 팝업 */}
      {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
            <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative z-10">
              <div className="text-center mb-4">
                {(() => {
                  const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => iqScore > (e.iq_score || 0)) === -1 ? totalCount + 1 : leaderboard.findIndex(e => iqScore > (e.iq_score || 0)) + 1);
                  const isFirstPlace = leaderboard.length === 0 || iqScore > (leaderboard[0]?.iq_score || 0);
                  return (
                    <>
                      <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                        {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : "🧠"}
                      </div>
                      <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                        {isFirstPlace ? t.newFirst : `${t.currentRank} ${calculatedRank}!`}
                      </h3>
                      <p className={`text-3xl font-black ${iqGrade.color}`}>IQ {iqScore}</p>
                      <p className="text-dark-400 text-sm">{iqGrade.grade}</p>
                    </>
                  );
                })()}
              </div>
              {leaderboard.length > 0 && iqScore <= (leaderboard[0]?.iq_score || 0) && (
                <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p className="text-[10px] text-dark-500 uppercase">{t.currentFirst}</p>
                      <p className="text-yellow-400 font-bold">IQ {leaderboard[0]?.iq_score || 0}</p>
                      <p className="text-xs text-dark-400">{leaderboard[0]?.nickname}</p>
                    </div>
                    <div className="text-dark-600 px-2">vs</div>
                    <div className="text-center flex-1">
                      <p className="text-[10px] text-dark-500 uppercase">{t.myRecord}</p>
                      <p className="text-purple-400 font-bold">IQ {iqScore}</p>
                    </div>
                  </div>
                </div>
              )}
              <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30">
                <span className="flex items-center justify-center gap-2"><span className="text-xl">🏆</span>{t.registerNow}</span>
              </button>
              <button onClick={shareResult} className="w-full mt-2 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all border border-dark-600">
                <span className="flex items-center justify-center gap-2">
                  <span>📤</span>
                  {showCopied ? t.copied : t.shareWithFriends}
                </span>
              </button>
              <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">{t.maybeLater}</button>
            </div>
          </div>
        </div>
      )}

      {/* 닉네임 모달 */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{iqGrade.emoji}</div>
              <h3 className="text-white text-xl font-bold">{t.rankingRegister}</h3>
              <p className="text-dark-400 text-sm">IQ {iqScore}</p>
            </div>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder={t.nickname} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-3" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
            {/* 🔐 로그인 유도 - 새 탭으로 열어서 게임 상태 유지 */}
            <div className="mb-3 p-3 bg-accent-purple/10 rounded-lg border border-accent-purple/20">
              <p className="text-xs text-dark-300 mb-1">{locale === "ko" ? "💡 로그인하면 회원 점수에 반영됩니다" : "💡 Login to save your score to your profile"}</p>
              <a href={locale === "ko" ? "/login" : `/${locale}/login`} target="_blank" rel="noopener noreferrer" className="text-accent-purple text-xs hover:underline">{locale === "ko" ? "로그인하러 가기 (새 탭) →" : "Go to login (new tab) →"}</a>
            </div>
            <div className="mb-4">
              <label className="text-dark-400 text-sm mb-1 block">{t.country}</label>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name[locale]}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowNicknameModal(false)} className="flex-1 px-4 py-3 bg-dark-800 text-white rounded-xl">{t.cancel}</button>
              <button onClick={submitScore} disabled={!nickname.trim() || isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50">{isSubmitting ? "..." : t.register}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

