"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import AdBanner from "../AdBanner";
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

// locale별 기본 국가 코드
const DEFAULT_COUNTRY: Record<Locale, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR"
};

// 언어별 번역
const translations: Record<Locale, {
  title: string;
  subtitle: string;
  startButton: string;
  hallOfFame: string;
  noChallengers: string;
  firstChallenger: string;
  refresh: string;
  question: string;
  correct: string;
  tryAgain: string;
  share: string;
  copied: string;
  registerRanking: string;
  maybeLater: string;
  enterNickname: string;
  nickname: string;
  country: string;
  cancel: string;
  submit: string;
  pts: string;
  seconds: string;
  gradeTable: string;
  gradeTableDesc: string;
  rank: string;
  grades: { perfect: string; excellent: string; good: string; average: string; keepTrying: string };
}> = {
  ko: {
    title: "상식 퀴즈",
    subtitle: "10문제 • 문제당 15초",
    startButton: "퀴즈 시작 →",
    hallOfFame: "명예의전당",
    noChallengers: "아직 기록이 없습니다.",
    firstChallenger: "첫 번째 도전자가 되어보세요!",
    refresh: "새로고침",
    question: "문제",
    correct: "정답",
    tryAgain: "다시 도전",
    share: "📤 공유하기",
    copied: "✅ 복사됨!",
    registerRanking: "🏆 랭킹 등록!",
    maybeLater: "다음에 할게요",
    enterNickname: "닉네임을 입력하세요",
    nickname: "닉네임",
    country: "국가",
    cancel: "취소",
    submit: "등록",
    pts: "점",
    seconds: "초",
    gradeTable: "등급표",
    gradeTableDesc: "높은 점수 = 높은 등급!",
    rank: "위",
    grades: { perfect: "완벽", excellent: "우수", good: "좋음", average: "보통", keepTrying: "분발" }
  },
  en: {
    title: "Trivia Quiz",
    subtitle: "10 questions • 15 seconds each",
    startButton: "Start Quiz →",
    hallOfFame: "Hall of Fame",
    noChallengers: "No records yet.",
    firstChallenger: "Be the first challenger!",
    refresh: "Refresh",
    question: "Q",
    correct: "Correct",
    tryAgain: "Try Again",
    share: "📤 Share",
    copied: "✅ Copied!",
    registerRanking: "🏆 Register Ranking!",
    maybeLater: "Maybe Later",
    enterNickname: "Enter Your Nickname",
    nickname: "Nickname",
    country: "Country",
    cancel: "Cancel",
    submit: "Submit",
    pts: "pts",
    seconds: "s",
    gradeTable: "Grade Table",
    gradeTableDesc: "Higher score = Higher grade!",
    rank: "",
    grades: { perfect: "Perfect", excellent: "Excellent", good: "Good", average: "Average", keepTrying: "Keep Trying" }
  },
  ja: {
    title: "クイズゲーム",
    subtitle: "10問 • 各15秒",
    startButton: "クイズ開始 →",
    hallOfFame: "ランキング",
    noChallengers: "まだ記録がありません。",
    firstChallenger: "最初の挑戦者になろう！",
    refresh: "更新",
    question: "問",
    correct: "正解",
    tryAgain: "もう一度",
    share: "📤 シェア",
    copied: "✅ コピー済み！",
    registerRanking: "🏆 ランキング登録！",
    maybeLater: "後で",
    enterNickname: "ニックネームを入力",
    nickname: "ニックネーム",
    country: "国",
    cancel: "キャンセル",
    submit: "登録",
    pts: "点",
    seconds: "秒",
    gradeTable: "等級表",
    gradeTableDesc: "高得点 = 高等級！",
    rank: "位",
    grades: { perfect: "完璧", excellent: "優秀", good: "良い", average: "普通", keepTrying: "頑張れ" }
  },
  zh: {
    title: "知识问答",
    subtitle: "10题 • 每题15秒",
    startButton: "开始测验 →",
    hallOfFame: "排行榜",
    noChallengers: "暂无记录。",
    firstChallenger: "成为第一个挑战者！",
    refresh: "刷新",
    question: "题",
    correct: "正确",
    tryAgain: "再试一次",
    share: "📤 分享",
    copied: "✅ 已复制！",
    registerRanking: "🏆 登记排名！",
    maybeLater: "下次再说",
    enterNickname: "输入昵称",
    nickname: "昵称",
    country: "国家",
    cancel: "取消",
    submit: "提交",
    pts: "分",
    seconds: "秒",
    gradeTable: "等级表",
    gradeTableDesc: "高分 = 高等级！",
    rank: "名",
    grades: { perfect: "完美", excellent: "优秀", good: "良好", average: "一般", keepTrying: "继续努力" }
  },
  de: {
    title: "Wissensquiz",
    subtitle: "10 Fragen • je 15 Sekunden",
    startButton: "Quiz starten →",
    hallOfFame: "Rangliste",
    noChallengers: "Noch keine Einträge.",
    firstChallenger: "Sei der Erste!",
    refresh: "Aktualisieren",
    question: "F",
    correct: "Richtig",
    tryAgain: "Nochmal",
    share: "📤 Teilen",
    copied: "✅ Kopiert!",
    registerRanking: "🏆 Ranking registrieren!",
    maybeLater: "Später",
    enterNickname: "Spitznamen eingeben",
    nickname: "Spitzname",
    country: "Land",
    cancel: "Abbrechen",
    submit: "Absenden",
    pts: "Pkt",
    seconds: "s",
    gradeTable: "Rangstufen",
    gradeTableDesc: "Höhere Punktzahl = Höherer Rang!",
    rank: ".",
    grades: { perfect: "Perfekt", excellent: "Ausgezeichnet", good: "Gut", average: "Durchschnitt", keepTrying: "Weiter so" }
  },
  fr: {
    title: "Quiz Culture",
    subtitle: "10 questions • 15 secondes chacune",
    startButton: "Commencer →",
    hallOfFame: "Classement",
    noChallengers: "Aucun record encore.",
    firstChallenger: "Soyez le premier !",
    refresh: "Actualiser",
    question: "Q",
    correct: "Correct",
    tryAgain: "Réessayer",
    share: "📤 Partager",
    copied: "✅ Copié !",
    registerRanking: "🏆 Enregistrer le rang !",
    maybeLater: "Plus tard",
    enterNickname: "Entrez votre pseudo",
    nickname: "Pseudo",
    country: "Pays",
    cancel: "Annuler",
    submit: "Soumettre",
    pts: "pts",
    seconds: "s",
    gradeTable: "Niveaux",
    gradeTableDesc: "Plus de points = Meilleur niveau !",
    rank: "e",
    grades: { perfect: "Parfait", excellent: "Excellent", good: "Bon", average: "Moyen", keepTrying: "Continue" }
  },
  es: {
    title: "Quiz de Cultura",
    subtitle: "10 preguntas • 15 segundos cada una",
    startButton: "Iniciar Quiz →",
    hallOfFame: "Clasificación",
    noChallengers: "Sin registros aún.",
    firstChallenger: "¡Sé el primero!",
    refresh: "Actualizar",
    question: "P",
    correct: "Correcto",
    tryAgain: "Reintentar",
    share: "📤 Compartir",
    copied: "✅ ¡Copiado!",
    registerRanking: "🏆 ¡Registrar ranking!",
    maybeLater: "Quizás después",
    enterNickname: "Ingresa tu apodo",
    nickname: "Apodo",
    country: "País",
    cancel: "Cancelar",
    submit: "Enviar",
    pts: "pts",
    seconds: "s",
    gradeTable: "Niveles",
    gradeTableDesc: "¡Más puntos = Mejor nivel!",
    rank: "º",
    grades: { perfect: "Perfecto", excellent: "Excelente", good: "Bien", average: "Normal", keepTrying: "¡Sigue!" }
  },
  pt: {
    title: "Quiz de Cultura",
    subtitle: "10 perguntas • 15 segundos cada",
    startButton: "Iniciar Quiz →",
    hallOfFame: "Classificação",
    noChallengers: "Sem registros ainda.",
    firstChallenger: "Seja o primeiro!",
    refresh: "Atualizar",
    question: "P",
    correct: "Correto",
    tryAgain: "Tentar de novo",
    share: "📤 Compartilhar",
    copied: "✅ Copiado!",
    registerRanking: "🏆 Registrar ranking!",
    maybeLater: "Talvez depois",
    enterNickname: "Digite seu apelido",
    nickname: "Apelido",
    country: "País",
    cancel: "Cancelar",
    submit: "Enviar",
    pts: "pts",
    seconds: "s",
    gradeTable: "Níveis",
    gradeTableDesc: "Mais pontos = Melhor nível!",
    rank: "º",
    grades: { perfect: "Perfeito", excellent: "Excelente", good: "Bom", average: "Normal", keepTrying: "Continue!" }
  }
};

// 언어별 질문 (각 언어에 맞는 상식 문제)
const questionsByLocale: Record<Locale, { q: string; options: string[]; answer: number }[]> = {
  ko: [
    { q: "대한민국의 수도는?", options: ["부산", "서울", "인천", "대구"], answer: 1 },
    { q: "태양계에서 가장 큰 행성은?", options: ["화성", "목성", "토성", "해왕성"], answer: 1 },
    { q: "한글을 창제한 왕은?", options: ["태종", "세종", "성종", "정조"], answer: 1 },
    { q: "물의 화학식은?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
    { q: "대한민국의 국화는?", options: ["장미", "무궁화", "벚꽃", "튤립"], answer: 1 },
    { q: "1+1은?", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "지구에서 가장 넓은 바다는?", options: ["대서양", "인도양", "태평양", "북극해"], answer: 2 },
    { q: "성인 인체의 뼈 개수는?", options: ["106개", "206개", "306개", "406개"], answer: 1 },
    { q: "금의 원소 기호는?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "2024년 올림픽 개최 도시는?", options: ["도쿄", "파리", "LA", "로마"], answer: 1 },
  ],
  en: [
    { q: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Rome"], answer: 1 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
    { q: "What is the largest planet in our solar system?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: 1 },
    { q: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
    { q: "What is H2O commonly known as?", options: ["Salt", "Water", "Sugar", "Oxygen"], answer: 1 },
    { q: "Who wrote Romeo and Juliet?", options: ["Dickens", "Shakespeare", "Austen", "Hemingway"], answer: 1 },
    { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
    { q: "How many bones are in the adult human body?", options: ["106", "206", "306", "406"], answer: 1 },
    { q: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
  ],
  ja: [
    { q: "日本の首都は？", options: ["大阪", "東京", "京都", "名古屋"], answer: 1 },
    { q: "富士山の高さは約何メートル？", options: ["2776m", "3776m", "4776m", "5776m"], answer: 1 },
    { q: "太陽系で最大の惑星は？", options: ["火星", "木星", "土星", "海王星"], answer: 1 },
    { q: "日本の国花は？", options: ["バラ", "桜", "菊", "チューリップ"], answer: 1 },
    { q: "1+1は？", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "水の化学式は？", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
    { q: "地球で最も広い海は？", options: ["大西洋", "インド洋", "太平洋", "北極海"], answer: 2 },
    { q: "成人の骨の数は？", options: ["106個", "206個", "306個", "406個"], answer: 1 },
    { q: "金の元素記号は？", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "2024年オリンピック開催都市は？", options: ["東京", "パリ", "ロサンゼルス", "ローマ"], answer: 1 },
  ],
  zh: [
    { q: "中国的首都是？", options: ["上海", "北京", "广州", "深圳"], answer: 1 },
    { q: "太阳系最大的行星是？", options: ["火星", "木星", "土星", "海王星"], answer: 1 },
    { q: "长城建造于哪个朝代开始？", options: ["唐朝", "秦朝", "汉朝", "明朝"], answer: 1 },
    { q: "水的化学式是？", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
    { q: "地球上最大的海洋是？", options: ["大西洋", "印度洋", "太平洋", "北冰洋"], answer: 2 },
    { q: "1+1等于？", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "成年人有多少块骨头？", options: ["106块", "206块", "306块", "406块"], answer: 1 },
    { q: "金的化学符号是？", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "2024年奥运会在哪个城市举办？", options: ["东京", "巴黎", "洛杉矶", "罗马"], answer: 1 },
    { q: "中国有多少个省级行政区？", options: ["23个", "34个", "45个", "56个"], answer: 1 },
  ],
  de: [
    { q: "Was ist die Hauptstadt von Deutschland?", options: ["München", "Berlin", "Hamburg", "Frankfurt"], answer: 1 },
    { q: "Welcher Planet ist der größte im Sonnensystem?", options: ["Mars", "Jupiter", "Saturn", "Neptun"], answer: 1 },
    { q: "Wer schrieb Faust?", options: ["Schiller", "Goethe", "Kafka", "Hesse"], answer: 1 },
    { q: "Was ist H2O?", options: ["Salz", "Wasser", "Zucker", "Sauerstoff"], answer: 1 },
    { q: "Wie viele Kontinente gibt es?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Was ist 1+1?", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "Welcher Ozean ist der größte?", options: ["Atlantik", "Indischer", "Pazifik", "Arktis"], answer: 2 },
    { q: "Wie viele Knochen hat ein Erwachsener?", options: ["106", "206", "306", "406"], answer: 1 },
    { q: "Was ist das chemische Symbol für Gold?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "Welche Stadt war 2024 Olympiastadt?", options: ["Tokyo", "Paris", "LA", "Rom"], answer: 1 },
  ],
  fr: [
    { q: "Quelle est la capitale de la France?", options: ["Lyon", "Paris", "Marseille", "Nice"], answer: 1 },
    { q: "Quelle est la plus grande planète?", options: ["Mars", "Jupiter", "Saturne", "Neptune"], answer: 1 },
    { q: "Qui a peint la Joconde?", options: ["Van Gogh", "Picasso", "De Vinci", "Monet"], answer: 2 },
    { q: "Qu'est-ce que H2O?", options: ["Sel", "Eau", "Sucre", "Oxygène"], answer: 1 },
    { q: "Combien de continents y a-t-il?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Combien font 1+1?", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "Quel est le plus grand océan?", options: ["Atlantique", "Indien", "Pacifique", "Arctique"], answer: 2 },
    { q: "Combien d'os a un adulte?", options: ["106", "206", "306", "406"], answer: 1 },
    { q: "Quel est le symbole de l'or?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "Ville olympique 2024?", options: ["Tokyo", "Paris", "LA", "Rome"], answer: 1 },
  ],
  es: [
    { q: "¿Cuál es la capital de España?", options: ["Barcelona", "Madrid", "Sevilla", "Valencia"], answer: 1 },
    { q: "¿Cuál es el planeta más grande?", options: ["Marte", "Júpiter", "Saturno", "Neptuno"], answer: 1 },
    { q: "¿Quién pintó la Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
    { q: "¿Qué es H2O?", options: ["Sal", "Agua", "Azúcar", "Oxígeno"], answer: 1 },
    { q: "¿Cuántos continentes hay?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "¿Cuánto es 1+1?", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "¿Cuál es el océano más grande?", options: ["Atlántico", "Índico", "Pacífico", "Ártico"], answer: 2 },
    { q: "¿Cuántos huesos tiene un adulto?", options: ["106", "206", "306", "406"], answer: 1 },
    { q: "¿Cuál es el símbolo del oro?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "¿Ciudad olímpica 2024?", options: ["Tokyo", "París", "LA", "Roma"], answer: 1 },
  ],
  pt: [
    { q: "Qual é a capital do Brasil?", options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], answer: 1 },
    { q: "Qual é o maior planeta?", options: ["Marte", "Júpiter", "Saturno", "Netuno"], answer: 1 },
    { q: "Quem pintou a Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
    { q: "O que é H2O?", options: ["Sal", "Água", "Açúcar", "Oxigênio"], answer: 1 },
    { q: "Quantos continentes existem?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "Quanto é 1+1?", options: ["1", "2", "3", "4"], answer: 1 },
    { q: "Qual é o maior oceano?", options: ["Atlântico", "Índico", "Pacífico", "Ártico"], answer: 2 },
    { q: "Quantos ossos tem um adulto?", options: ["106", "206", "306", "406"], answer: 1 },
    { q: "Qual é o símbolo do ouro?", options: ["Ag", "Au", "Fe", "Cu"], answer: 1 },
    { q: "Cidade olímpica de 2024?", options: ["Tóquio", "Paris", "LA", "Roma"], answer: 1 },
  ],
};

// 언어 선택기 옵션은 GameNavBar에서 처리

interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  correct_count: number;
  created_at: string;
  country?: string;
  user_id?: string;
  avatar_url?: string;
  overall_rank?: number;
}

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/quiz" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/quiz" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/quiz" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/quiz" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/quiz" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/quiz" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/quiz" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/quiz" },
];

interface Props {
  locale: Locale;
}

export default function QuizGameMulti({ locale }: Props) {
  const t = translations[locale];
  const questions = questionsByLocale[locale];
  
  const [gameState, setGameState] = useState<"ready" | "playing" | "result">("ready");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
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

  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;
  const score = correctCount * 100 + answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 10 : 0), 0);

  // 점수 기준으로 등급 반환 (리더보드용)
  const getGradeByScore = useCallback((s: number) => {
    if (s >= 1000) return { grade: t.grades.perfect, emoji: "👑", color: "text-yellow-400" };
    if (s >= 800) return { grade: t.grades.excellent, emoji: "🌟", color: "text-purple-400" };
    if (s >= 600) return { grade: t.grades.good, emoji: "✨", color: "text-blue-400" };
    if (s >= 400) return { grade: t.grades.average, emoji: "📊", color: "text-green-400" };
    return { grade: t.grades.keepTrying, emoji: "💪", color: "text-orange-400" };
  }, [t.grades]);

  const getGrade = useCallback(() => {
    if (correctCount >= 10) return { grade: t.grades.perfect, emoji: "👑", color: "text-yellow-400" };
    if (correctCount >= 8) return { grade: t.grades.excellent, emoji: "🌟", color: "text-purple-400" };
    if (correctCount >= 6) return { grade: t.grades.good, emoji: "✨", color: "text-blue-400" };
    if (correctCount >= 4) return { grade: t.grades.average, emoji: "📊", color: "text-green-400" };
    return { grade: t.grades.keepTrying, emoji: "💪", color: "text-orange-400" };
  }, [correctCount, t.grades]);

  const gradeInfo = getGrade();

  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=quiz&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) { console.error("Failed to load leaderboard:", err); }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 🚀 게임 결과 시 정확한 순위 계산
  useEffect(() => {
    if (gameState === "result" && correctCount > 0) {
      // score = correctCount * 1000 + timeBonus와 일치 (API scoreField: score)
      fetch(`/api/leaderboard?game=quiz&limit=10&myScore=${score}`)
        .then(res => res.json())
        .then(result => {
          if (result.myRank) setMyRank(result.myRank);
          if (result.data) setLeaderboard(result.data);
          if (result.totalCount !== undefined) setTotalCount(result.totalCount);
        })
        .catch(err => console.error("순위 계산 실패:", err));
    }
  }, [gameState, correctCount, score]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setAnswers([...answers, -1]);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
      } else {
        setGameState("result");
        setShowRankingPrompt(true);
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, currentQuestion, answers, questions.length]);

  const startGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(15);
    setHasSubmitted(false);
  };

  const selectAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      setGameState("result");
      setShowRankingPrompt(true);
    }
  };

  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  const submitScore = async () => {
    if (!nickname.trim() || hasSubmitted) return;
    
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
    
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "quiz",
          data: {
      nickname: finalNickname,
      score,
      correct_count: correctCount,
      time_seconds: 150 - timeLeft,
      country: selectedCountry,
          },
          userId: finalUserId,
        }),
    });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      // 👤 회원 점수 업데이트는 API에서 자동 처리됨
    
    setHasSubmitted(true);
    setShowNicknameModal(false);
    fetchLeaderboard();
    } catch (err) { console.error("Submit failed:", err); }
  };

  const shareResult = async () => {
    const baseUrl = locale === "ko" ? "https://slox.co.kr/quiz" : `https://slox.co.kr/${locale}/quiz`;
    const text = `📚 SLOX ${t.title}!\n\n${score}${t.pts}\n${t.correct}: ${correctCount}/10\n${gradeInfo.grade} ${gradeInfo.emoji}\n\n${baseUrl}`;
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 바 - GameNavBar 사용 */}
      <GameNavBar locale={locale} backText={locale === "ko" ? "← 메인" : "← Main"} languageOptions={languageOptions} />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {gameState === "ready" && (
            <div className="text-center">
              <div className="text-6xl mb-6">📚</div>
              <h1 className="text-4xl font-black text-white mb-4">{t.title}</h1>
              <p className="text-dark-400 mb-8">{t.subtitle}</p>
              <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl">
                {t.startButton}
              </button>

              {/* 명예의전당 */}
              <div className="mt-8 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🏆</span> {t.hallOfFame}
                  </h3>
                  <button onClick={fetchLeaderboard} className="text-dark-500 hover:text-white text-xs">🔄 {t.refresh}</button>
                </div>
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8 text-dark-500">
                    <span className="text-4xl mb-2 block">📚</span>
                    {t.noChallengers} {t.firstChallenger}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, idx) => {
                        const entryGrade = getGradeByScore(entry.score);
                        return (
                        <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${idx === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : idx === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : idx === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                          {/* 순위 */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${idx === 0 ? "bg-yellow-500 text-black" : idx === 1 ? "bg-gray-300 text-black" : idx === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{idx + 1}</div>
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
                              <span>{t.correct}: {entry.correct_count}/10</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-400 font-bold">{entry.score}{t.pts}</div>
                            <div className="text-xs text-dark-500">{idx + 1}{t.rank} / {leaderboard.length}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 등급표 */}
              <div className="mt-8 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <h3 className="text-white font-medium mb-2 text-center">🏆 {t.gradeTable}</h3>
                <p className="text-dark-400 text-xs text-center mb-4">💡 {t.gradeTableDesc}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg border border-yellow-400/50">
                    <span className="text-yellow-400 font-bold">🏆 {t.grades.perfect}</span>
                    <p className="text-dark-400 text-xs">1000{t.pts}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg border border-purple-400/50">
                    <span className="text-purple-400 font-bold">💎 {t.grades.excellent}</span>
                    <p className="text-dark-400 text-xs">800~999{t.pts}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg border border-blue-400/50">
                    <span className="text-blue-400 font-bold">⭐ {t.grades.good}</span>
                    <p className="text-dark-400 text-xs">600~799{t.pts}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg border border-green-400/50">
                    <span className="text-green-400 font-bold">👍 {t.grades.average}</span>
                    <p className="text-dark-400 text-xs">400~599{t.pts}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg border border-orange-400/50">
                    <span className="text-orange-400 font-bold">📚 {t.grades.keepTrying}</span>
                    <p className="text-dark-400 text-xs">~399{t.pts}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="max-w-xl mx-auto">
              <div className="mb-8">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>{t.question}{currentQuestion + 1}/10</span>
                  <span className={timeLeft <= 5 ? "text-red-400" : ""}>{timeLeft}{t.seconds}</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all" style={{ width: `${(timeLeft / 15) * 100}%` }} />
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <h2 className="text-xl font-bold text-white mb-6 text-center">{questions[currentQuestion].q}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button key={idx} onClick={() => selectAnswer(idx)} className="w-full py-4 px-6 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-blue-500 rounded-xl text-white font-medium transition-all text-left">
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {gameState === "result" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <div className="text-5xl mb-4">{gradeInfo.emoji}</div>
                <h2 className={`text-4xl font-black mb-2 ${gradeInfo.color}`}>{score} {t.pts}</h2>
                <p className="text-xl text-white mb-2">{gradeInfo.grade}</p>
                <p className="text-dark-400">{t.correct}: {correctCount}/10</p>
                <div className="mt-8 flex flex-col gap-3">
                  <button onClick={() => setGameState("ready")} className="py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl">{t.tryAgain}</button>
                  <button onClick={shareResult} className="py-3 px-6 bg-dark-800 text-white font-medium rounded-xl border border-dark-700">{showCopied ? t.copied : t.share}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner className="my-8" />

      {/* 랭킹 등록 팝업 */}
      {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{gradeInfo.emoji}</div>
              <h3 className={`text-3xl font-black ${gradeInfo.color}`}>{score} {t.pts}</h3>
              <p className="text-dark-400">{gradeInfo.grade}</p>
            </div>
            <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl mb-2">{t.registerRanking}</button>
            <button onClick={shareResult} className="w-full py-3 bg-dark-800 text-white font-medium rounded-xl border border-dark-700 mb-2">{t.share}</button>
            <button onClick={() => setShowRankingPrompt(false)} className="w-full py-2 text-dark-500 text-sm">{t.maybeLater}</button>
          </div>
        </div>
      )}

      {/* 닉네임 입력 모달 */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{t.enterNickname}</h3>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={t.nickname} maxLength={10} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-3 focus:outline-none focus:border-blue-500" />
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
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name[locale]}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNicknameModal(false)} className="flex-1 py-3 bg-dark-800 text-dark-400 rounded-xl">{t.cancel}</button>
              <button onClick={submitScore} disabled={!nickname.trim()} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl disabled:opacity-50">{t.submit}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

