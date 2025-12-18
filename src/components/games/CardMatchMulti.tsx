"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { supabase } from "@/lib/supabase";

type Locale = "ko" | "en" | "ja" | "zh" | "de" | "fr" | "es" | "pt";

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

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  cards: string;
  timeLimit: string;
  memorizeTime: string;
  tip: string;
  tipText: string;
  ready: string;
  memorize: string;
  startGame: string;
  score: string;
  combo: string;
  pairs: string;
  clicks: string;
  timeLeft: string;
  complete: string;
  timeout: string;
  perfect: string;
  matchScore: string;
  timeBonus: string;
  perfectBonus: string;
  total: string;
  maxCombo: string;
  mistakes: string;
  bestRecord: string;
  share: string;
  shareImage: string;
  again: string;
  registerRanking: string;
  hallOfFame: string;
  refresh: string;
  noRecords: string;
  howToPlay: string;
  step1: string;
  step1Text: string;
  step2: string;
  step2Text: string;
  step3: string;
  step3Text: string;
  gradeTable: string;
  gradeTableDesc: string;
  grades: { challenger: string; master: string; diamond: string; platinum: string; gold: string; silver: string; bronze: string; iron: string };
  copied: string;
  rankingRegister: string;
  nickname: string;
  country: string;
  cancel: string;
  register: string;
  newFirst: string;
  currentRank: string;
  currentFirst: string;
  myRecord: string;
  shareWithFriends: string;
  maybeLater: string;
  timePenalty: string;
  otherGames: string;
}> = {
  ko: {
    title: "카드 짝 맞추기",
    subtitle: "카드를 기억하고 짝을 맞춰보세요!",
    cards: "카드",
    timeLimit: "제한시간",
    memorizeTime: "기억시간",
    tip: "기억력 게임 팁",
    tipText: "카드 위치를 이미지나 패턴으로 기억해보세요. 비슷한 이모지끼리 묶어서 외우면 더 쉬워요!",
    ready: "준비되셨나요?",
    memorize: "👀 기억하세요!",
    startGame: "🎮 게임 시작",
    score: "누적 점수",
    combo: "콤보",
    pairs: "짝",
    clicks: "🖱️ 클릭",
    timeLeft: "⏱️ 남은 시간",
    complete: "🎉 완료!",
    timeout: "⏰ 시간 초과!",
    perfect: "✨ PERFECT CLEAR! ✨",
    matchScore: "매치 점수 (콤보 누적)",
    timeBonus: "시간 보너스",
    perfectBonus: "퍼펙트 보너스",
    total: "총점",
    maxCombo: "최대 콤보",
    mistakes: "실수",
    bestRecord: "🏆 최고 기록",
    share: "📤 공유",
    shareImage: "🖼️ 이미지 공유",
    again: "🔄 다시",
    registerRanking: "🏆 랭킹 등록!",
    hallOfFame: "🏆 명예의전당",
    refresh: "🔄 새로고침",
    noRecords: "아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!",
    howToPlay: "🎯 게임 방법",
    step1: "1️⃣ 기억하기",
    step1Text: "카드 위치를 기억하세요",
    step2: "2️⃣ 찾기",
    step2Text: "같은 그림 카드를 찾으세요",
    step3: "3️⃣ 주의!",
    step3Text: "틀리면 -3초 패널티!",
    gradeTable: "🏆 등급표",
    gradeTableDesc: "💡 점수가 높을수록 높은 등급!",
    grades: { challenger: "챌린저", master: "마스터", diamond: "다이아", platinum: "플래티넘", gold: "골드", silver: "실버", bronze: "브론즈", iron: "아이언" },
    copied: "✅ 복사됨!",
    rankingRegister: "🏆 랭킹 등록",
    nickname: "닉네임...",
    country: "국가",
    cancel: "취소",
    register: "등록!",
    newFirst: "🔥 새로운 1등!",
    currentRank: "현재",
    currentFirst: "현재 1위",
    myRecord: "내 기록",
    shareWithFriends: "친구에게 공유하기",
    maybeLater: "나중에 할게요",
    timePenalty: "-3초",
    otherGames: "🔗 다른 게임"
  },
  en: {
    title: "Card Match",
    subtitle: "Memorize cards and find the pairs!",
    cards: "Cards",
    timeLimit: "Time Limit",
    memorizeTime: "Memorize",
    tip: "Memory Game Tip",
    tipText: "Try to remember card positions as patterns. Group similar emojis together!",
    ready: "Ready?",
    memorize: "👀 Memorize!",
    startGame: "🎮 Start Game",
    score: "Score",
    combo: "Combo",
    pairs: "Pairs",
    clicks: "🖱️ Clicks",
    timeLeft: "⏱️ Time Left",
    complete: "🎉 Complete!",
    timeout: "⏰ Time's up!",
    perfect: "✨ PERFECT CLEAR! ✨",
    matchScore: "Match Score (Combo)",
    timeBonus: "Time Bonus",
    perfectBonus: "Perfect Bonus",
    total: "Total",
    maxCombo: "Max Combo",
    mistakes: "Mistakes",
    bestRecord: "🏆 Best Record",
    share: "📤 Share",
    shareImage: "🖼️ Share Image",
    again: "🔄 Again",
    registerRanking: "🏆 Register Ranking!",
    hallOfFame: "🏆 Hall of Fame",
    refresh: "🔄 Refresh",
    noRecords: "No records yet. Be the first challenger!",
    howToPlay: "🎯 How to Play",
    step1: "1️⃣ Memorize",
    step1Text: "Remember card positions",
    step2: "2️⃣ Find",
    step2Text: "Find matching cards",
    step3: "3️⃣ Careful!",
    step3Text: "-3 sec penalty on miss!",
    gradeTable: "🏆 Grade Table",
    gradeTableDesc: "💡 Higher score = Higher rank!",
    grades: { challenger: "Challenger", master: "Master", diamond: "Diamond", platinum: "Platinum", gold: "Gold", silver: "Silver", bronze: "Bronze", iron: "Iron" },
    copied: "✅ Copied!",
    rankingRegister: "🏆 Register",
    nickname: "Nickname...",
    country: "Country",
    cancel: "Cancel",
    register: "Register!",
    newFirst: "🔥 New #1!",
    currentRank: "Current",
    currentFirst: "Current #1",
    myRecord: "My Record",
    shareWithFriends: "Share with Friends",
    maybeLater: "Maybe Later",
    timePenalty: "-3s",
    otherGames: "🔗 Other Games"
  },
  ja: {
    title: "カードマッチ",
    subtitle: "カードを覚えてペアを見つけよう！",
    cards: "カード",
    timeLimit: "制限時間",
    memorizeTime: "記憶時間",
    tip: "記憶ゲームのコツ",
    tipText: "カードの位置をパターンとして覚えよう。似た絵文字をグループ化！",
    ready: "準備はいい？",
    memorize: "👀 覚えて！",
    startGame: "🎮 ゲーム開始",
    score: "スコア",
    combo: "コンボ",
    pairs: "ペア",
    clicks: "🖱️ クリック",
    timeLeft: "⏱️ 残り時間",
    complete: "🎉 完成！",
    timeout: "⏰ 時間切れ！",
    perfect: "✨ パーフェクト！ ✨",
    matchScore: "マッチスコア",
    timeBonus: "タイムボーナス",
    perfectBonus: "パーフェクトボーナス",
    total: "合計",
    maxCombo: "最大コンボ",
    mistakes: "ミス",
    bestRecord: "🏆 最高記録",
    share: "📤 シェア",
    shareImage: "🖼️ 画像シェア",
    again: "🔄 もう一度",
    registerRanking: "🏆 ランキング登録！",
    hallOfFame: "🏆 名誉の殿堂",
    refresh: "🔄 更新",
    noRecords: "まだ記録がありません。最初の挑戦者に！",
    howToPlay: "🎯 遊び方",
    step1: "1️⃣ 覚える",
    step1Text: "カードの位置を覚えよう",
    step2: "2️⃣ 探す",
    step2Text: "同じカードを探そう",
    step3: "3️⃣ 注意！",
    step3Text: "ミスで-3秒ペナルティ！",
    gradeTable: "🏆 等級表",
    gradeTableDesc: "💡 高得点 = 高ランク！",
    grades: { challenger: "チャレンジャー", master: "マスター", diamond: "ダイヤ", platinum: "プラチナ", gold: "ゴールド", silver: "シルバー", bronze: "ブロンズ", iron: "アイアン" },
    copied: "✅ コピー済み！",
    rankingRegister: "🏆 登録",
    nickname: "ニックネーム...",
    country: "国",
    cancel: "キャンセル",
    register: "登録！",
    newFirst: "🔥 新しい1位！",
    currentRank: "現在",
    currentFirst: "現在1位",
    myRecord: "私の記録",
    shareWithFriends: "友達にシェア",
    maybeLater: "後で",
    timePenalty: "-3秒",
    otherGames: "🔗 他のゲーム"
  },
  zh: {
    title: "卡片配对",
    subtitle: "记住卡片位置，找出配对！",
    cards: "卡片",
    timeLimit: "时间限制",
    memorizeTime: "记忆时间",
    tip: "记忆游戏技巧",
    tipText: "尝试将卡片位置记为图案。将相似的表情分组！",
    ready: "准备好了吗？",
    memorize: "👀 记住！",
    startGame: "🎮 开始游戏",
    score: "分数",
    combo: "连击",
    pairs: "配对",
    clicks: "🖱️ 点击",
    timeLeft: "⏱️ 剩余时间",
    complete: "🎉 完成！",
    timeout: "⏰ 时间到！",
    perfect: "✨ 完美通关！ ✨",
    matchScore: "配对分数",
    timeBonus: "时间奖励",
    perfectBonus: "完美奖励",
    total: "总分",
    maxCombo: "最大连击",
    mistakes: "失误",
    bestRecord: "🏆 最高纪录",
    share: "📤 分享",
    shareImage: "🖼️ 分享图片",
    again: "🔄 再来",
    registerRanking: "🏆 登记排名！",
    hallOfFame: "🏆 荣誉殿堂",
    refresh: "🔄 刷新",
    noRecords: "还没有记录。成为第一个挑战者！",
    howToPlay: "🎯 玩法",
    step1: "1️⃣ 记忆",
    step1Text: "记住卡片位置",
    step2: "2️⃣ 寻找",
    step2Text: "找出相同的卡片",
    step3: "3️⃣ 注意！",
    step3Text: "失误-3秒惩罚！",
    gradeTable: "🏆 等级表",
    gradeTableDesc: "💡 分数越高，等级越高！",
    grades: { challenger: "挑战者", master: "大师", diamond: "钻石", platinum: "铂金", gold: "黄金", silver: "白银", bronze: "青铜", iron: "黑铁" },
    copied: "✅ 已复制！",
    rankingRegister: "🏆 登记",
    nickname: "昵称...",
    country: "国家",
    cancel: "取消",
    register: "登记！",
    newFirst: "🔥 新的第一！",
    currentRank: "当前",
    currentFirst: "当前第一",
    myRecord: "我的记录",
    shareWithFriends: "分享给朋友",
    maybeLater: "以后再说",
    timePenalty: "-3秒",
    otherGames: "🔗 其他游戏"
  },
  de: {
    title: "Karten-Match",
    subtitle: "Karten merken und Paare finden!",
    cards: "Karten",
    timeLimit: "Zeitlimit",
    memorizeTime: "Merkzeit",
    tip: "Gedächtnisspiel-Tipp",
    tipText: "Merk dir Kartenpositionen als Muster. Gruppiere ähnliche Emojis!",
    ready: "Bereit?",
    memorize: "👀 Merken!",
    startGame: "🎮 Spiel starten",
    score: "Punkte",
    combo: "Combo",
    pairs: "Paare",
    clicks: "🖱️ Klicks",
    timeLeft: "⏱️ Restzeit",
    complete: "🎉 Geschafft!",
    timeout: "⏰ Zeit abgelaufen!",
    perfect: "✨ PERFEKT! ✨",
    matchScore: "Match-Punkte",
    timeBonus: "Zeitbonus",
    perfectBonus: "Perfektbonus",
    total: "Gesamt",
    maxCombo: "Max Combo",
    mistakes: "Fehler",
    bestRecord: "🏆 Rekord",
    share: "📤 Teilen",
    shareImage: "🖼️ Bild teilen",
    again: "🔄 Nochmal",
    registerRanking: "🏆 Ranking eintragen!",
    hallOfFame: "🏆 Ruhmeshalle",
    refresh: "🔄 Aktualisieren",
    noRecords: "Noch keine Einträge. Sei der Erste!",
    howToPlay: "🎯 Spielanleitung",
    step1: "1️⃣ Merken",
    step1Text: "Kartenpositionen merken",
    step2: "2️⃣ Finden",
    step2Text: "Gleiche Karten finden",
    step3: "3️⃣ Achtung!",
    step3Text: "-3s Strafe bei Fehler!",
    gradeTable: "🏆 Stufen",
    gradeTableDesc: "💡 Höhere Punkte = Höherer Rang!",
    grades: { challenger: "Herausforderer", master: "Meister", diamond: "Diamant", platinum: "Platin", gold: "Gold", silver: "Silber", bronze: "Bronze", iron: "Eisen" },
    copied: "✅ Kopiert!",
    rankingRegister: "🏆 Eintragen",
    nickname: "Spitzname...",
    country: "Land",
    cancel: "Abbrechen",
    register: "Eintragen!",
    newFirst: "🔥 Neuer #1!",
    currentRank: "Aktuell",
    currentFirst: "Aktuell #1",
    myRecord: "Mein Rekord",
    shareWithFriends: "Mit Freunden teilen",
    maybeLater: "Später",
    timePenalty: "-3s",
    otherGames: "🔗 Andere Spiele"
  },
  fr: {
    title: "Jeu de Mémoire",
    subtitle: "Mémorisez les cartes et trouvez les paires!",
    cards: "Cartes",
    timeLimit: "Limite",
    memorizeTime: "Mémorisation",
    tip: "Conseil Mémoire",
    tipText: "Mémorisez les positions comme des motifs. Groupez les emojis similaires!",
    ready: "Prêt?",
    memorize: "👀 Mémorisez!",
    startGame: "🎮 Commencer",
    score: "Score",
    combo: "Combo",
    pairs: "Paires",
    clicks: "🖱️ Clics",
    timeLeft: "⏱️ Temps restant",
    complete: "🎉 Terminé!",
    timeout: "⏰ Temps écoulé!",
    perfect: "✨ PARFAIT! ✨",
    matchScore: "Score match",
    timeBonus: "Bonus temps",
    perfectBonus: "Bonus parfait",
    total: "Total",
    maxCombo: "Max Combo",
    mistakes: "Erreurs",
    bestRecord: "🏆 Record",
    share: "📤 Partager",
    shareImage: "🖼️ Partager image",
    again: "🔄 Rejouer",
    registerRanking: "🏆 S'inscrire!",
    hallOfFame: "🏆 Temple de la Gloire",
    refresh: "🔄 Actualiser",
    noRecords: "Aucun record. Soyez le premier!",
    howToPlay: "🎯 Comment jouer",
    step1: "1️⃣ Mémoriser",
    step1Text: "Retenez les positions",
    step2: "2️⃣ Trouver",
    step2Text: "Trouvez les paires",
    step3: "3️⃣ Attention!",
    step3Text: "-3s de pénalité!",
    gradeTable: "🏆 Niveaux",
    gradeTableDesc: "💡 Plus de points = Meilleur rang!",
    grades: { challenger: "Challenger", master: "Maître", diamond: "Diamant", platinum: "Platine", gold: "Or", silver: "Argent", bronze: "Bronze", iron: "Fer" },
    copied: "✅ Copié!",
    rankingRegister: "🏆 Inscription",
    nickname: "Pseudo...",
    country: "Pays",
    cancel: "Annuler",
    register: "S'inscrire!",
    newFirst: "🔥 Nouveau #1!",
    currentRank: "Actuel",
    currentFirst: "#1 actuel",
    myRecord: "Mon record",
    shareWithFriends: "Partager avec amis",
    maybeLater: "Plus tard",
    timePenalty: "-3s",
    otherGames: "🔗 Autres jeux"
  },
  es: {
    title: "Juego de Memoria",
    subtitle: "¡Memoriza cartas y encuentra parejas!",
    cards: "Cartas",
    timeLimit: "Límite",
    memorizeTime: "Memorizar",
    tip: "Consejo Memoria",
    tipText: "Memoriza posiciones como patrones. ¡Agrupa emojis similares!",
    ready: "¿Listo?",
    memorize: "👀 ¡Memoriza!",
    startGame: "🎮 Iniciar",
    score: "Puntos",
    combo: "Combo",
    pairs: "Parejas",
    clicks: "🖱️ Clics",
    timeLeft: "⏱️ Tiempo",
    complete: "🎉 ¡Completado!",
    timeout: "⏰ ¡Tiempo!",
    perfect: "✨ ¡PERFECTO! ✨",
    matchScore: "Puntos match",
    timeBonus: "Bonus tiempo",
    perfectBonus: "Bonus perfecto",
    total: "Total",
    maxCombo: "Max Combo",
    mistakes: "Errores",
    bestRecord: "🏆 Récord",
    share: "📤 Compartir",
    shareImage: "🖼️ Compartir imagen",
    again: "🔄 Otra vez",
    registerRanking: "🏆 ¡Registrar!",
    hallOfFame: "🏆 Salón de la Fama",
    refresh: "🔄 Actualizar",
    noRecords: "Sin récords. ¡Sé el primero!",
    howToPlay: "🎯 Cómo jugar",
    step1: "1️⃣ Memorizar",
    step1Text: "Recuerda posiciones",
    step2: "2️⃣ Encontrar",
    step2Text: "Encuentra las parejas",
    step3: "3️⃣ ¡Cuidado!",
    step3Text: "-3s de penalización!",
    gradeTable: "🏆 Niveles",
    gradeTableDesc: "💡 ¡Mayor puntuación = Mayor rango!",
    grades: { challenger: "Retador", master: "Maestro", diamond: "Diamante", platinum: "Platino", gold: "Oro", silver: "Plata", bronze: "Bronce", iron: "Hierro" },
    copied: "✅ ¡Copiado!",
    rankingRegister: "🏆 Registrar",
    nickname: "Apodo...",
    country: "País",
    cancel: "Cancelar",
    register: "¡Registrar!",
    newFirst: "🔥 ¡Nuevo #1!",
    currentRank: "Actual",
    currentFirst: "#1 actual",
    myRecord: "Mi récord",
    shareWithFriends: "Compartir con amigos",
    maybeLater: "Quizás después",
    timePenalty: "-3s",
    otherGames: "🔗 Otros juegos"
  },
  pt: {
    title: "Jogo da Memória",
    subtitle: "Memorize cartas e encontre os pares!",
    cards: "Cartas",
    timeLimit: "Limite",
    memorizeTime: "Memorizar",
    tip: "Dica Memória",
    tipText: "Memorize posições como padrões. Agrupe emojis similares!",
    ready: "Pronto?",
    memorize: "👀 Memorize!",
    startGame: "🎮 Iniciar",
    score: "Pontos",
    combo: "Combo",
    pairs: "Pares",
    clicks: "🖱️ Cliques",
    timeLeft: "⏱️ Tempo",
    complete: "🎉 Completo!",
    timeout: "⏰ Tempo esgotado!",
    perfect: "✨ PERFEITO! ✨",
    matchScore: "Pontos match",
    timeBonus: "Bônus tempo",
    perfectBonus: "Bônus perfeito",
    total: "Total",
    maxCombo: "Max Combo",
    mistakes: "Erros",
    bestRecord: "🏆 Recorde",
    share: "📤 Compartilhar",
    shareImage: "🖼️ Compartilhar imagem",
    again: "🔄 De novo",
    registerRanking: "🏆 Registrar!",
    hallOfFame: "🏆 Hall da Fama",
    refresh: "🔄 Atualizar",
    noRecords: "Sem registros. Seja o primeiro!",
    howToPlay: "🎯 Como jogar",
    step1: "1️⃣ Memorizar",
    step1Text: "Lembre as posições",
    step2: "2️⃣ Encontrar",
    step2Text: "Encontre os pares",
    step3: "3️⃣ Cuidado!",
    step3Text: "-3s de penalidade!",
    gradeTable: "🏆 Níveis",
    gradeTableDesc: "💡 Mais pontos = Maior nível!",
    grades: { challenger: "Desafiante", master: "Mestre", diamond: "Diamante", platinum: "Platina", gold: "Ouro", silver: "Prata", bronze: "Bronze", iron: "Ferro" },
    copied: "✅ Copiado!",
    rankingRegister: "🏆 Registrar",
    nickname: "Apelido...",
    country: "País",
    cancel: "Cancelar",
    register: "Registrar!",
    newFirst: "🔥 Novo #1!",
    currentRank: "Atual",
    currentFirst: "#1 atual",
    myRecord: "Meu recorde",
    shareWithFriends: "Compartilhar com amigos",
    maybeLater: "Talvez depois",
    timePenalty: "-3s",
    otherGames: "🔗 Outros jogos"
  }
};

const languageOptions: { locale: Locale; flag: string; name: string }[] = [
  { locale: "ko", flag: "🇰🇷", name: "한국어" },
  { locale: "en", flag: "🇺🇸", name: "English" },
  { locale: "ja", flag: "🇯🇵", name: "日本語" },
  { locale: "zh", flag: "🇨🇳", name: "中文" },
  { locale: "de", flag: "🇩🇪", name: "Deutsch" },
  { locale: "fr", flag: "🇫🇷", name: "Français" },
  { locale: "es", flag: "🇪🇸", name: "Español" },
  { locale: "pt", flag: "🇧🇷", name: "Português" },
];

interface CardMatchLeaderboardEntry {
  id: string;
  nickname: string;
  time_seconds: number;
  moves: number;
  country?: string;
  pairs: number;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  score?: number;
}

type GameState = "waiting" | "memorize" | "countdown" | "playing" | "result";

const CARD_EMOJIS = ["🐶", "🐱", "🐼", "🦊", "🐨", "🐯", "🦁", "🐸", "🐵", "🐰", "🐻", "🐲"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const GAME_SETTINGS = {
  cols: 4,
  rows: 4,
  memorizeTime: 5,
  timeLimit: 60,
};

interface Props {
  locale: Locale;
}

export default function CardMatchMulti({ locale }: Props) {
  const t = translations[locale];
  const router = useRouter();
  
  const [state, setState] = useState<GameState>("waiting");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [memorizeTimer, setMemorizeTimer] = useState(0);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState<{ points: number; combo: number } | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<CardMatchLeaderboardEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const totalPairs = (GAME_SETTINGS.cols * GAME_SETTINGS.rows) / 2;

  useEffect(() => { setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window); }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("cardmatch_leaderboard").select("*").order("score", { ascending: false }).limit(10);
      const { count } = await supabase.from("cardmatch_leaderboard").select("*", { count: "exact", head: true });
      if (error) throw error;
      if (data) setLeaderboard(data);
      if (count !== null) setTotalCount(count);
    } catch (err) { console.error("Failed to load leaderboard:", err); }
  }, []);

  const getFinalScore = useCallback(() => {
    if (matchedPairs < totalPairs) return score;
    const timeBonus = timer * 10;
    const perfectBonus = mistakes === 0 ? 500 : 0;
    return score + timeBonus + perfectBonus;
  }, [score, timer, mistakes, matchedPairs, totalPairs]);

  const getGrade = useCallback(() => {
    const finalScore = getFinalScore();
    if (finalScore >= 2500) return { grade: t.grades.challenger, color: "text-cyan-300", emoji: "👑" };
    if (finalScore >= 2000) return { grade: t.grades.master, color: "text-purple-400", emoji: "💎" };
    if (finalScore >= 1600) return { grade: t.grades.diamond, color: "text-blue-400", emoji: "💠" };
    if (finalScore >= 1200) return { grade: t.grades.platinum, color: "text-teal-400", emoji: "🏆" };
    if (finalScore >= 900) return { grade: t.grades.gold, color: "text-yellow-400", emoji: "🥇" };
    if (finalScore >= 600) return { grade: t.grades.silver, color: "text-gray-300", emoji: "🥈" };
    if (finalScore >= 300) return { grade: t.grades.bronze, color: "text-orange-400", emoji: "🥉" };
    return { grade: t.grades.iron, color: "text-stone-400", emoji: "🪨" };
  }, [getFinalScore, t.grades]);

  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const currentScore = getFinalScore();
    const gradeInfo = getGrade();
    const percentile = currentScore >= 3500 ? 1 : currentScore >= 2800 ? 5 : currentScore >= 2200 ? 15 : currentScore >= 1600 ? 30 : currentScore >= 1000 ? 50 : currentScore >= 600 ? 70 : currentScore >= 300 ? 85 : 95;
    try {
      const { error } = await supabase.from("cardmatch_leaderboard").insert({
        nickname: nickname.trim().slice(0, 20),
        time_seconds: timer,
        moves,
        pairs: totalPairs,
        device_type: isMobile ? "mobile" : "pc",
        score: currentScore,
        grade: gradeInfo.grade,
        percentile: percentile,
        country: selectedCountry,
      });
      if (error) throw error;
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) { console.error("Submit failed:", err); }
    finally { setIsSubmitting(false); }
  };

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  useEffect(() => {
    if (state === "result" && !hasSubmittedScore && matchedPairs > 0) {
      const timer = setTimeout(() => { setShowRankingPrompt(true); }, 800);
      return () => clearTimeout(timer);
    }
  }, [state, hasSubmittedScore, matchedPairs]);

  useEffect(() => {
    if (state === "result" && matchedPairs === totalPairs) {
      const timeBonus = timer * 10;
      const perfectBonus = mistakes === 0 ? 500 : 0;
      const finalScore = score + timeBonus + perfectBonus;
      if (bestScore === null || finalScore > bestScore) {
        setBestScore(finalScore);
      }
    }
  }, [state, matchedPairs, totalPairs, score, timer, mistakes, bestScore]);

  const generateCards = useCallback(() => {
    const { cols, rows } = GAME_SETTINGS;
    const pairCount = (cols * rows) / 2;
    const selectedEmojis = CARD_EMOJIS.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    return cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  }, []);

  const startGame = useCallback(() => {
    const newCards = generateCards().map(card => ({ ...card, isFlipped: true }));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setMistakes(0);
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    setTimer(GAME_SETTINGS.timeLimit);
    setMemorizeTimer(GAME_SETTINGS.memorizeTime);
    setCards(newCards);
    setState("memorize");

    const memorizeInterval = setInterval(() => {
      setMemorizeTimer(prev => {
        if (prev <= 1) {
          clearInterval(memorizeInterval);
          setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })));
          setState("playing");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [generateCards]);

  useEffect(() => {
    if (state === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setState("result");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [state]);

  const handleCardClick = useCallback((cardId: number) => {
    if (state !== "playing") return;
    if (flippedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);

      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));

          const newCombo = combo + 1;
          const pointsEarned = 100 * newCombo;
          setCombo(newCombo);
          if (newCombo > maxCombo) setMaxCombo(newCombo);
          setScore(prev => prev + pointsEarned);

          setShowScorePopup({ points: pointsEarned, combo: newCombo });
          setTimeout(() => setShowScorePopup(null), 600);

          setMatchedPairs(prev => {
            const newPairs = prev + 1;
            if (newPairs === totalPairs) {
              if (timerRef.current) clearInterval(timerRef.current);
              setTimeout(() => setState("result"), 500);
            }
            return newPairs;
          });

          setFlippedCards([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCombo(0);
          setMistakes(prev => prev + 1);
          setTimer(prev => Math.max(0, prev - 3));
          setShowTimePenalty(true);
          setTimeout(() => setShowTimePenalty(false), 500);

          setCards(prev => prev.map(c =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [state, cards, flippedCards, combo, maxCombo, totalPairs]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    try {
      shareCardRef.current.style.display = "block";
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      shareCardRef.current.style.display = "none";
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } catch { if (shareCardRef.current) shareCardRef.current.style.display = "none"; return null; }
  };

  const getCardMatchPath = (targetLocale: Locale) => {
    return targetLocale === "ko" ? "/card-match" : `/${targetLocale}/card-match`;
  };

  const shareResult = async () => {
    const gradeInfo = getGrade();
    const baseUrl = locale === "ko" ? "https://www.slox.co.kr/card-match" : `https://www.slox.co.kr/${locale}/card-match`;
    const finalScore = getFinalScore();
    const text = `🃏 ${t.title}!\n\n${gradeInfo.emoji} ${gradeInfo.grade}\n📊 ${finalScore}pts\n\n${baseUrl}`;

    if (typeof navigator.share === "function") {
      try { await navigator.share({ text }); return; } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const shareAsImage = async () => {
    const blob = await generateImage();
    if (blob && typeof navigator.share === "function") {
      const file = new File([blob], `cardmatch-${getFinalScore()}.png`, { type: "image/png" });
      const shareData = { files: [file] };
      if (navigator.canShare?.(shareData)) {
        try { await navigator.share(shareData); return; } catch { /* fallback */ }
      }
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `cardmatch-${getFinalScore()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const currentLang = languageOptions.find(l => l.locale === locale);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-4xl mx-auto bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
            <div className="flex items-center justify-between h-14 px-4">
              <Link href={locale === "ko" ? "/" : `/${locale}`} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-white">SLOX</span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-dark-300 hover:text-white bg-dark-800 rounded-lg border border-dark-700"
                >
                  <span>{currentLang?.flag}</span>
                  <span className="hidden sm:inline">{currentLang?.name}</span>
                  <span>▼</span>
                </button>

                {showLanguageMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)} />
                    <div className="absolute right-0 mt-2 w-40 bg-dark-900 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.locale}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-dark-800 transition-colors w-full text-left ${lang.locale === locale ? "bg-dark-800 text-white" : "text-dark-300"
                            }`}
                          onClick={() => {
                            document.cookie = `SLOX_LOCALE=${lang.locale}; path=/; max-age=31536000`;
                            setShowLanguageMenu(false);
                            router.push(getCardMatchPath(lang.locale));
                          }}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">🃏 {t.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* 게임 모드 안내 */}
          {state === "waiting" && (
            <>
              <div className="flex justify-center gap-4 mb-8">
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.cards}</span>
                  <span className="text-white font-bold">4×4</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.timeLimit}</span>
                  <span className="text-white font-bold">60s</span>
                </div>
                <div className="px-4 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.memorizeTime}</span>
                  <span className="text-white font-bold">5s</span>
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

          {/* 게임 상태 표시 */}
          {(state === "playing" || state === "memorize") && (
            <div className="flex flex-col items-center gap-3 mb-6">
              {state === "playing" && (
                <div className="flex items-center gap-3">
                  <div className="px-5 py-2 rounded-xl border-2 border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="text-dark-400 text-xs">{t.score}</p>
                        <p className="text-2xl font-black text-white">
                          {score}
                          {combo > 0 && <span className="text-orange-400 text-lg ml-2">🔥{combo}x</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center items-center gap-4">
                {state === "memorize" && (
                  <div className={`text-center px-5 py-2 rounded-xl border-2 transition-all ${memorizeTimer <= 3 ? 'bg-red-500/20 border-red-500/50 animate-pulse' : 'bg-yellow-500/20 border-yellow-500/50'}`}>
                    <p className="text-xs font-medium text-yellow-400">{t.memorize}</p>
                    <p className={`text-2xl font-black ${memorizeTimer <= 3 ? 'text-red-400' : 'text-yellow-300'}`}>{memorizeTimer}s</p>
                  </div>
                )}

                <div className={`text-center px-4 py-2 rounded-xl transition-all ${timer <= 10 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'}`}>
                  <p className="text-dark-400 text-xs">{t.timeLeft}</p>
                  <p className={`text-xl font-bold ${timer <= 10 ? 'text-red-400' : timer <= 30 ? 'text-yellow-400' : 'text-white'}`}>{formatTime(timer)}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">{t.pairs}</p>
                  <p className="text-xl font-bold text-green-400">{matchedPairs}/{totalPairs}</p>
                </div>
                <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                  <p className="text-dark-400 text-xs">{t.clicks}</p>
                  <p className="text-xl font-bold text-yellow-400">{moves}</p>
                </div>
              </div>
            </div>
          )}

          {/* 게임 영역 */}
          <div ref={gameAreaRef} className="relative rounded-2xl p-6 mb-8 min-h-[400px] bg-dark-900">
            {showTimePenalty && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="absolute inset-0 bg-black/50 rounded-2xl" />
                <div className="relative animate-bounce">
                  <div className="text-6xl md:text-8xl font-black text-red-500">{t.timePenalty}</div>
                </div>
              </div>
            )}

            {showScorePopup && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-center">
                  <p className="text-4xl font-black text-green-400">+{showScorePopup.points}</p>
                  {showScorePopup.combo > 1 && <p className="text-lg font-bold text-orange-400">×{showScorePopup.combo} {t.combo}!</p>}
                </div>
              </div>
            )}

            {state === "waiting" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4">🃏</div>
                <p className="text-2xl font-bold text-white mb-2">{t.ready}</p>
                <p className="text-dark-400 mb-6">{t.subtitle}</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105">
                  {t.startGame}
                </button>
              </div>
            )}

            {(state === "memorize" || state === "playing") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${GAME_SETTINGS.cols}, minmax(60px, 80px))` }}>
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`relative aspect-square rounded-xl cursor-pointer transition-all duration-300 ${card.isMatched ? "scale-95" : "hover:scale-105 active:scale-95"}`}
                    >
                      {(card.isFlipped || card.isMatched) ? (
                        <div className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-200 ${card.isMatched ? "bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/30" : "bg-dark-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"}`}>
                          <span className="text-4xl">{card.emoji}</span>
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-shadow">
                          <span className="text-3xl">❓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {state === "result" && (
              <div className="flex flex-col items-center justify-center min-h-[400px] py-6">
                {matchedPairs === totalPairs ? (
                  <p className="text-green-400 text-sm font-medium mb-2">{t.complete}</p>
                ) : (
                  <p className="text-red-400 text-sm font-medium mb-2">{t.timeout} ({matchedPairs}/{totalPairs})</p>
                )}

                <div className="text-6xl mb-2">{getGrade().emoji}</div>
                <p className={`text-4xl font-black ${getGrade().color} mb-1`}>{getGrade().grade}</p>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">{getFinalScore()}pts</p>

                {mistakes === 0 && matchedPairs === totalPairs && (
                  <p className="text-green-400 text-lg font-bold mb-2 animate-pulse">{t.perfect}</p>
                )}

                <div className="bg-dark-800/50 rounded-xl p-4 mb-4 w-full max-w-sm">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-dark-400">{t.matchScore}</span>
                      <span className="text-white">+{score}</span>
                    </div>
                    {matchedPairs === totalPairs && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-dark-400">{t.timeBonus} ({timer}s × 10)</span>
                          <span className="text-green-400">+{timer * 10}</span>
                        </div>
                        {mistakes === 0 && (
                          <div className="flex justify-between">
                            <span className="text-dark-400">{t.perfectBonus}</span>
                            <span className="text-yellow-400">+500</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="border-t border-dark-700 pt-2 mt-2 flex justify-between font-bold">
                      <span className="text-white">{t.total}</span>
                      <span className={getGrade().color}>{getFinalScore()}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dark-700 text-xs text-dark-500 text-center">
                    {t.maxCombo}: {maxCombo}x · {t.mistakes}: {mistakes}
                  </div>
                </div>

                {bestScore !== null && (
                  <p className="text-dark-400 text-sm mb-4">{t.bestRecord}: {bestScore}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button onClick={shareResult} className="flex-1 px-4 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl">{showCopied ? t.copied : t.share}</button>
                  <button onClick={shareAsImage} className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl">{t.shareImage}</button>
                  <button onClick={startGame} className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl">{t.again}</button>
                </div>
                {!hasSubmittedScore && getFinalScore() > 0 && matchedPairs === totalPairs && (
                  <button onClick={() => setShowNicknameModal(true)} className="w-full max-w-sm mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">{t.registerRanking}</button>
                )}
              </div>
            )}
          </div>

          {/* 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">{t.hallOfFame}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">{t.refresh}</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">🃏</div><p className="text-dark-400">{t.noRecords}</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  // 점수 기반으로 등급 계산 (번역된 등급 사용)
                  const score = entry.score || 0;
                  const entryGrade = score >= 2500 ? { grade: t.grades.challenger, color: "text-cyan-300" }
                    : score >= 2000 ? { grade: t.grades.master, color: "text-purple-400" }
                    : score >= 1600 ? { grade: t.grades.diamond, color: "text-blue-400" }
                    : score >= 1200 ? { grade: t.grades.platinum, color: "text-teal-400" }
                    : score >= 900 ? { grade: t.grades.gold, color: "text-yellow-400" }
                    : score >= 600 ? { grade: t.grades.silver, color: "text-gray-300" }
                    : score >= 300 ? { grade: t.grades.bronze, color: "text-orange-400" }
                    : { grade: t.grades.iron, color: "text-stone-400" };
                  return (
                    <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : index === 1 ? "bg-gradient-to-r from-gray-400/20 to-gray-300/20 border border-gray-400/30" : index === 2 ? "bg-gradient-to-r from-orange-600/20 to-orange-500/20 border border-orange-500/30" : "bg-dark-800/50"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-300 text-black" : index === 2 ? "bg-orange-500 text-black" : "bg-dark-700 text-dark-300"}`}>{index + 1}</div>
                      <span className="text-base  flex-shrink-0">{COUNTRY_OPTIONS.find(c => c.code === entry.country)?.flag || "🌍"}</span>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-white font-medium truncate">{entry.nickname}</p>
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                          <span className={entryGrade.color}>{entryGrade.grade}</span>
                          <span>•</span>
                          <span>{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{entry.score || 0}</div>
                        <div className="text-xs text-dark-500">{index + 1} / {totalCount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 공유 카드 (hidden) */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}><span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span><span style={{ color: "#a78bfa", fontSize: "12px" }}>🃏 {t.title}</span></div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{getGrade().emoji}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: "#c084fc" }}>{getGrade().grade}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{getFinalScore()}<span style={{ fontSize: "18px" }}> pts</span></div>
            </div>
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

          {/* 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-2 text-center">{t.gradeTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-4">{t.gradeTableDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg border border-cyan-400/50">
                <span className="text-cyan-300 font-bold">👑 {t.grades.challenger}</span>
                <p className="text-dark-400 text-xs">2500+</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg border border-purple-400/50">
                <span className="text-purple-400 font-bold">💎 {t.grades.master}</span>
                <p className="text-dark-400 text-xs">2000~2499</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg border border-blue-400/50">
                <span className="text-blue-400 font-bold">💠 {t.grades.diamond}</span>
                <p className="text-dark-400 text-xs">1600~1999</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg border border-teal-400/50">
                <span className="text-teal-400 font-bold">🏆 {t.grades.platinum}</span>
                <p className="text-dark-400 text-xs">1200~1599</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg border border-yellow-400/50">
                <span className="text-yellow-400 font-bold">🥇 {t.grades.gold}</span>
                <p className="text-dark-400 text-xs">900~1199</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg border border-gray-400/50">
                <span className="text-gray-300 font-bold">🥈 {t.grades.silver}</span>
                <p className="text-dark-400 text-xs">600~899</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg border border-orange-400/50">
                <span className="text-orange-400 font-bold">🥉 {t.grades.bronze}</span>
                <p className="text-dark-400 text-xs">300~599</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg border border-stone-400/50">
                <span className="text-stone-400 font-bold">🪨 {t.grades.iron}</span>
                <p className="text-dark-400 text-xs">~299</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 랭킹 팝업 */}
      {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full relative overflow-hidden">
            <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">{getGrade().emoji}</div>
                <h3 className="text-2xl font-black text-white mb-1">{getFinalScore()}pts</h3>
                <p className="text-dark-400 text-sm">{getGrade().grade}</p>
              </div>
              <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-lg rounded-xl">{t.registerRanking}</button>
              <button onClick={shareResult} className="w-full mt-2 py-3 bg-dark-800 text-white font-medium rounded-xl border border-dark-600">{showCopied ? t.copied : t.shareWithFriends}</button>
              <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 text-sm">{t.maybeLater}</button>
            </div>
          </div>
        </div>
      )}

      {/* 닉네임 모달 */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
            <div className="text-center mb-6"><div className="text-5xl mb-3">{getGrade().emoji}</div><h3 className="text-white text-xl font-bold">{t.rankingRegister}</h3><p className="text-dark-400 text-sm">{getFinalScore()}pts</p></div>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} placeholder={t.nickname} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-3" autoFocus onKeyDown={(e) => e.key === "Enter" && submitScore()} />
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

