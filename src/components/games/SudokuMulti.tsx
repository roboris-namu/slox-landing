"use client";

import { useState, useEffect, useCallback } from "react";
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

// locale별 기본 국가 코드
const DEFAULT_COUNTRY: Record<Locale, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR"
};

// 패널티 시스템 상수
const MAX_MISTAKES = 10;
const PENALTY_SECONDS = 3;

// 언어별 번역
const translations: Record<Locale, {
  title: string;
  subtitle: string;
  easy: string;
  medium: string;
  hard: string;
  mistakeLimit: string;
  timePenalty: string;
  times: string;
  startGame: string;
  hallOfFame: string;
  noChallengers: string;
  firstChallenger: string;
  time: string;
  mistakes: string;
  left: string;
  back: string;
  playAgain: string;
  share: string;
  copied: string;
  gameOver: string;
  madeMistakes: string;
  tryAgain: string;
  registerRanking: string;
  maybeLater: string;
  enterNickname: string;
  nickname: string;
  country: string;
  cancel: string;
  submit: string;
  complete: string;
  includesPenalty: string;
  gradeTable: string;
  gradeTableDesc: string;
  refresh: string;
  rank: string;
  grades: { legend: string; master: string; expert: string; advanced: string; intermediate: string; beginner: string };
  // 랭킹 모드 UI
  ranking: string;
  rankingAvailable: string;
  practiceMode: string;
  rankingOnlyHard: string;
  rankingChallenge: string;
  practiceStart: string;
  practiceComplete: string;
  challengeHardMode: string;
}> = {
  ko: {
    title: "스도쿠",
    subtitle: "두뇌 훈련 퍼즐",
    easy: "초급",
    medium: "중급",
    hard: "고수",
    mistakeLimit: "실수 제한",
    timePenalty: "시간 패널티",
    times: "회",
    startGame: "게임 시작 →",
    hallOfFame: "명예의전당",
    noChallengers: "아직 기록이 없습니다.",
    firstChallenger: "첫 번째 도전자가 되어보세요!",
    time: "시간",
    mistakes: "실수",
    left: "남음",
    back: "← 뒤로",
    playAgain: "다시 도전",
    share: "📤 공유하기",
    copied: "✅ 복사됨!",
    gameOver: "게임 오버!",
    madeMistakes: "실수를 너무 많이 했어요",
    tryAgain: "🔄 다시 도전",
    registerRanking: "🏆 랭킹 등록!",
    maybeLater: "다음에 할게요",
    enterNickname: "닉네임을 입력하세요",
    nickname: "닉네임",
    country: "국가",
    cancel: "취소",
    submit: "등록",
    complete: "완료!",
    includesPenalty: "패널티 포함",
    gradeTable: "등급표 (고수 모드)",
    gradeTableDesc: "빠르게 완료할수록 높은 등급! (패널티 시간 포함)",
    refresh: "새로고침",
    rank: "위",
    grades: { legend: "전설", master: "마스터", expert: "전문가", advanced: "숙련자", intermediate: "중급자", beginner: "초보자" },
    ranking: "랭킹",
    rankingAvailable: "🏆 가능",
    practiceMode: "연습용",
    rankingOnlyHard: "💡 랭킹 등록은 고수 모드에서만 가능해요!",
    rankingChallenge: "🎮 랭킹 도전!",
    practiceStart: "🎮 연습 시작",
    practiceComplete: "💡 연습 모드 완료!",
    challengeHardMode: "랭킹 도전은 🔴 고수 모드에서 가능해요"
  },
  en: {
    title: "Sudoku",
    subtitle: "Brain Training Puzzle",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    mistakeLimit: "Mistake Limit",
    timePenalty: "Time Penalty",
    times: "times",
    startGame: "Start Game →",
    hallOfFame: "Hall of Fame",
    noChallengers: "No records yet.",
    firstChallenger: "Be the first challenger!",
    time: "Time",
    mistakes: "Mistakes",
    left: "left",
    back: "← Back",
    playAgain: "Play Again",
    share: "📤 Share",
    copied: "✅ Copied!",
    gameOver: "Game Over!",
    madeMistakes: "Too many mistakes",
    tryAgain: "🔄 Try Again",
    registerRanking: "🏆 Register Ranking!",
    maybeLater: "Maybe Later",
    enterNickname: "Enter Your Nickname",
    nickname: "Nickname",
    country: "Country",
    cancel: "Cancel",
    submit: "Submit",
    complete: "Complete!",
    includesPenalty: "includes penalty",
    gradeTable: "Grade Table (Hard Mode)",
    gradeTableDesc: "Faster completion = Higher grade! (Penalty time included)",
    refresh: "Refresh",
    rank: "",
    grades: { legend: "Legend", master: "Master", expert: "Expert", advanced: "Advanced", intermediate: "Intermediate", beginner: "Beginner" },
    ranking: "Ranking",
    rankingAvailable: "🏆 Available",
    practiceMode: "Practice",
    rankingOnlyHard: "💡 Ranking is only available in Hard mode!",
    rankingChallenge: "🎮 Challenge Ranking!",
    practiceStart: "🎮 Start Practice",
    practiceComplete: "💡 Practice mode complete!",
    challengeHardMode: "Ranking challenge is available in 🔴 Hard mode"
  },
  ja: {
    title: "数独",
    subtitle: "脳トレパズル",
    easy: "初級",
    medium: "中級",
    hard: "上級",
    mistakeLimit: "ミス制限",
    timePenalty: "時間ペナルティ",
    times: "回",
    startGame: "ゲーム開始 →",
    hallOfFame: "ランキング",
    noChallengers: "まだ記録がありません。",
    firstChallenger: "最初の挑戦者になろう！",
    time: "時間",
    mistakes: "ミス",
    left: "残り",
    back: "← 戻る",
    playAgain: "もう一度",
    share: "📤 シェア",
    copied: "✅ コピー済み！",
    gameOver: "ゲームオーバー！",
    madeMistakes: "ミスが多すぎました",
    tryAgain: "🔄 もう一度",
    registerRanking: "🏆 ランキング登録！",
    maybeLater: "後で",
    enterNickname: "ニックネームを入力",
    nickname: "ニックネーム",
    country: "国",
    cancel: "キャンセル",
    submit: "登録",
    complete: "完成！",
    includesPenalty: "ペナルティ含む",
    gradeTable: "等級表 (上級モード)",
    gradeTableDesc: "早く完了するほど高い等級！(ペナルティ時間込み)",
    refresh: "更新",
    rank: "位",
    grades: { legend: "伝説", master: "マスター", expert: "エキスパート", advanced: "上級者", intermediate: "中級者", beginner: "初心者" },
    ranking: "ランキング",
    rankingAvailable: "🏆 可能",
    practiceMode: "練習用",
    rankingOnlyHard: "💡 ランキング登録は上級モードのみ！",
    rankingChallenge: "🎮 ランキング挑戦!",
    practiceStart: "🎮 練習開始",
    practiceComplete: "💡 練習モード完了！",
    challengeHardMode: "ランキング挑戦は 🔴 上級モードで可能です"
  },
  zh: {
    title: "数独",
    subtitle: "脑力训练谜题",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    mistakeLimit: "错误限制",
    timePenalty: "时间惩罚",
    times: "次",
    startGame: "开始游戏 →",
    hallOfFame: "排行榜",
    noChallengers: "暂无记录。",
    firstChallenger: "成为第一个挑战者！",
    time: "时间",
    mistakes: "错误",
    left: "剩余",
    back: "← 返回",
    playAgain: "再玩一次",
    share: "📤 分享",
    copied: "✅ 已复制！",
    gameOver: "游戏结束！",
    madeMistakes: "错误太多了",
    tryAgain: "🔄 再试一次",
    registerRanking: "🏆 登记排名！",
    maybeLater: "以后再说",
    enterNickname: "输入昵称",
    nickname: "昵称",
    country: "国家",
    cancel: "取消",
    submit: "提交",
    complete: "完成！",
    includesPenalty: "含惩罚时间",
    gradeTable: "等级表 (困难模式)",
    gradeTableDesc: "越快完成等级越高！(含惩罚时间)",
    refresh: "刷新",
    rank: "名",
    grades: { legend: "传奇", master: "大师", expert: "专家", advanced: "高级", intermediate: "中级", beginner: "初级" },
    ranking: "排名",
    rankingAvailable: "🏆 可用",
    practiceMode: "练习",
    rankingOnlyHard: "💡 排名仅在困难模式可用！",
    rankingChallenge: "🎮 挑战排名!",
    practiceStart: "🎮 开始练习",
    practiceComplete: "💡 练习模式完成！",
    challengeHardMode: "排名挑战在 🔴 困难模式可用"
  },
  de: {
    title: "Sudoku",
    subtitle: "Gehirntraining-Puzzle",
    easy: "Leicht",
    medium: "Mittel",
    hard: "Schwer",
    mistakeLimit: "Fehlerlimit",
    timePenalty: "Zeitstrafe",
    times: "mal",
    startGame: "Spiel starten →",
    hallOfFame: "Rangliste",
    noChallengers: "Noch keine Einträge.",
    firstChallenger: "Sei der Erste!",
    time: "Zeit",
    mistakes: "Fehler",
    left: "übrig",
    back: "← Zurück",
    playAgain: "Nochmal",
    share: "📤 Teilen",
    copied: "✅ Kopiert!",
    gameOver: "Spiel vorbei!",
    madeMistakes: "Zu viele Fehler",
    tryAgain: "🔄 Nochmal",
    registerRanking: "🏆 Ranking eintragen!",
    maybeLater: "Später",
    enterNickname: "Spitznamen eingeben",
    nickname: "Spitzname",
    country: "Land",
    cancel: "Abbrechen",
    submit: "Absenden",
    complete: "Geschafft!",
    includesPenalty: "inkl. Strafe",
    gradeTable: "Rangstufen (Schwer-Modus)",
    gradeTableDesc: "Schneller = Höherer Rang! (inkl. Strafzeit)",
    refresh: "Aktualisieren",
    rank: ".",
    grades: { legend: "Legende", master: "Meister", expert: "Experte", advanced: "Fortgeschritten", intermediate: "Mittel", beginner: "Anfänger" },
    ranking: "Rangliste",
    rankingAvailable: "🏆 Verfügbar",
    practiceMode: "Übung",
    rankingOnlyHard: "💡 Rangliste nur im Schwer-Modus!",
    rankingChallenge: "🎮 Ranking herausfordern!",
    practiceStart: "🎮 Übung starten",
    practiceComplete: "💡 Übungsmodus abgeschlossen!",
    challengeHardMode: "Ranking-Herausforderung im 🔴 Schwer-Modus"
  },
  fr: {
    title: "Sudoku",
    subtitle: "Puzzle d'entraînement cérébral",
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    mistakeLimit: "Limite d'erreurs",
    timePenalty: "Pénalité temps",
    times: "fois",
    startGame: "Commencer →",
    hallOfFame: "Classement",
    noChallengers: "Aucun record encore.",
    firstChallenger: "Soyez le premier !",
    time: "Temps",
    mistakes: "Erreurs",
    left: "restant",
    back: "← Retour",
    playAgain: "Rejouer",
    share: "📤 Partager",
    copied: "✅ Copié !",
    gameOver: "Partie terminée !",
    madeMistakes: "Trop d'erreurs",
    tryAgain: "🔄 Réessayer",
    registerRanking: "🏆 S'inscrire !",
    maybeLater: "Plus tard",
    enterNickname: "Entrez votre pseudo",
    nickname: "Pseudo",
    country: "Pays",
    cancel: "Annuler",
    submit: "Soumettre",
    complete: "Terminé !",
    includesPenalty: "incl. pénalité",
    gradeTable: "Niveaux (Mode Difficile)",
    gradeTableDesc: "Plus vite = Meilleur niveau ! (pénalité incluse)",
    refresh: "Actualiser",
    rank: "e",
    grades: { legend: "Légende", master: "Maître", expert: "Expert", advanced: "Avancé", intermediate: "Intermédiaire", beginner: "Débutant" },
    ranking: "Classement",
    rankingAvailable: "🏆 Disponible",
    practiceMode: "Entraînement",
    rankingOnlyHard: "💡 Classement uniquement en mode Difficile !",
    rankingChallenge: "🎮 Défier le classement !",
    practiceStart: "🎮 Commencer l'entraînement",
    practiceComplete: "💡 Mode entraînement terminé !",
    challengeHardMode: "Défi classement en mode 🔴 Difficile"
  },
  es: {
    title: "Sudoku",
    subtitle: "Puzzle de entrenamiento cerebral",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    mistakeLimit: "Límite de errores",
    timePenalty: "Penalización",
    times: "veces",
    startGame: "Iniciar →",
    hallOfFame: "Clasificación",
    noChallengers: "Sin registros aún.",
    firstChallenger: "¡Sé el primero!",
    time: "Tiempo",
    mistakes: "Errores",
    left: "restantes",
    back: "← Volver",
    playAgain: "Jugar de nuevo",
    share: "📤 Compartir",
    copied: "✅ ¡Copiado!",
    gameOver: "¡Juego terminado!",
    madeMistakes: "Demasiados errores",
    tryAgain: "🔄 Reintentar",
    registerRanking: "🏆 ¡Registrar!",
    maybeLater: "Quizás después",
    enterNickname: "Ingresa tu apodo",
    nickname: "Apodo",
    country: "País",
    cancel: "Cancelar",
    submit: "Enviar",
    complete: "¡Completado!",
    includesPenalty: "incl. penalización",
    gradeTable: "Niveles (Modo Difícil)",
    gradeTableDesc: "¡Más rápido = Mejor nivel! (penalización incluida)",
    refresh: "Actualizar",
    rank: "º",
    grades: { legend: "Leyenda", master: "Maestro", expert: "Experto", advanced: "Avanzado", intermediate: "Intermedio", beginner: "Principiante" },
    ranking: "Clasificación",
    rankingAvailable: "🏆 Disponible",
    practiceMode: "Práctica",
    rankingOnlyHard: "💡 ¡Clasificación solo en modo Difícil!",
    rankingChallenge: "🎮 ¡Desafiar clasificación!",
    practiceStart: "🎮 Iniciar práctica",
    practiceComplete: "💡 ¡Modo práctica completado!",
    challengeHardMode: "Desafío de clasificación en modo 🔴 Difícil"
  },
  pt: {
    title: "Sudoku",
    subtitle: "Puzzle de treinamento cerebral",
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil",
    mistakeLimit: "Limite de erros",
    timePenalty: "Penalidade",
    times: "vezes",
    startGame: "Iniciar →",
    hallOfFame: "Classificação",
    noChallengers: "Sem registros ainda.",
    firstChallenger: "Seja o primeiro!",
    time: "Tempo",
    mistakes: "Erros",
    left: "restantes",
    back: "← Voltar",
    playAgain: "Jogar novamente",
    share: "📤 Compartilhar",
    copied: "✅ Copiado!",
    gameOver: "Fim de jogo!",
    madeMistakes: "Muitos erros",
    tryAgain: "🔄 Tentar de novo",
    registerRanking: "🏆 Registrar!",
    maybeLater: "Talvez depois",
    enterNickname: "Digite seu apelido",
    nickname: "Apelido",
    country: "País",
    cancel: "Cancelar",
    submit: "Enviar",
    complete: "Completo!",
    includesPenalty: "incl. penalidade",
    gradeTable: "Níveis (Modo Difícil)",
    gradeTableDesc: "Mais rápido = Melhor nível! (penalidade incluída)",
    refresh: "Atualizar",
    rank: "º",
    grades: { legend: "Lenda", master: "Mestre", expert: "Especialista", advanced: "Avançado", intermediate: "Intermediário", beginner: "Iniciante" },
    ranking: "Classificação",
    rankingAvailable: "🏆 Disponível",
    practiceMode: "Prática",
    rankingOnlyHard: "💡 Classificação apenas no modo Difícil!",
    rankingChallenge: "🎮 Desafiar classificação!",
    practiceStart: "🎮 Iniciar prática",
    practiceComplete: "💡 Modo prática concluído!",
    challengeHardMode: "Desafio de classificação no modo 🔴 Difícil"
  }
};

// 언어 선택기 옵션은 GameNavBar에서 처리

// 스도쿠 생성
function generateSudoku(difficulty: "easy" | "medium" | "hard") {
  const base = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  
  const puzzle = base.map(row => [...row]);
  const solution = base.map(row => [...row]);
  
  const removeCount = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;
  let removed = 0;
  while (removed < removeCount) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  
  return { puzzle, solution };
}

interface LeaderboardEntry {
  id: string;
  nickname: string;
  time_seconds: number;
  difficulty: string;
  mistakes: number;
  country?: string;
  user_id?: string;
  avatar_url?: string;
}

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/sudoku" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/sudoku" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/sudoku" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/sudoku" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/sudoku" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/sudoku" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/sudoku" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/sudoku" },
];

interface Props {
  locale: Locale;
}

export default function SudokuMulti({ locale }: Props) {
  const t = translations[locale];
  
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("hard");
  const [gameState, setGameState] = useState<"ready" | "playing" | "complete" | "gameover">("ready");
  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [userInput, setUserInput] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [time, setTime] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  
  // 👤 사용자 인증 상태
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserNickname, setCurrentUserNickname] = useState<string>("");

  // 👤 사용자 인증 체크
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        const { data: profile } = await supabase.from("profiles").select("nickname").eq("id", user.id).single();
        if (profile) {
          setCurrentUserNickname(profile.nickname);
          setNickname(profile.nickname);
        }
      }
    };
    checkUser();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // 시간 기준으로 등급 반환 (한국어 버전과 동일)
  const getGradeByTime = useCallback((seconds: number) => {
    if (seconds <= 120) return { grade: t.grades.legend, emoji: "🏆", color: "text-yellow-400" };   // ~2분
    if (seconds <= 240) return { grade: t.grades.master, emoji: "💎", color: "text-purple-400" };   // ~4분
    if (seconds <= 360) return { grade: t.grades.expert, emoji: "⭐", color: "text-blue-400" };     // ~6분
    if (seconds <= 480) return { grade: t.grades.advanced, emoji: "👍", color: "text-green-400" };  // ~8분
    if (seconds <= 720) return { grade: t.grades.intermediate, emoji: "😊", color: "text-cyan-400" }; // ~12분
    return { grade: t.grades.beginner, emoji: "📚", color: "text-orange-400" };
  }, [t.grades]);

  const getGrade = useCallback(() => {
    return getGradeByTime(time);
  }, [time, getGradeByTime]);

  const gradeInfo = getGrade();

  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("sudoku_leaderboard")
      .select("*")
      .order("time_seconds", { ascending: true })
      .limit(10);
    // 👤 회원 닉네임 + 프로필사진 동기화
    if (data && data.length > 0) {
      const userIds = data.filter(d => d.user_id).map(d => d.user_id);
      if (userIds.length > 0) {
        const { data: profiles } = await supabase.from("profiles").select("id, nickname, avatar_url").in("id", userIds);
        if (profiles) {
          const profileMap = new Map(profiles.map(p => [p.id, { nickname: p.nickname, avatar_url: p.avatar_url }]));
          data.forEach(entry => {
            if (entry.user_id && profileMap.has(entry.user_id)) {
              const profile = profileMap.get(entry.user_id);
              entry.nickname = profile?.nickname || entry.nickname;
              entry.avatar_url = profile?.avatar_url;
            }
          });
        }
      }
      setLeaderboard(data);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const startGame = () => {
    const { puzzle: p, solution: s } = generateSudoku(difficulty);
    setPuzzle(p);
    setSolution(s);
    setUserInput(p.map(row => [...row]));
    setSelectedCell(null);
    setTime(0);
    setMistakes(0);
    setGameState("playing");
    setHasSubmitted(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (puzzle[row][col] === 0) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || gameState !== "playing") return;
    const [row, col] = selectedCell;
    if (puzzle[row][col] !== 0) return;

    const newInput = userInput.map(r => [...r]);
    newInput[row][col] = num;
    setUserInput(newInput);

    if (num !== solution[row][col]) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setTime((prev) => prev + PENALTY_SECONDS);
      if (newMistakes >= MAX_MISTAKES) {
        setGameState("gameover");
        return;
      }
    }

    let complete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newInput[r][c] !== solution[r][c]) complete = false;
      }
    }
    if (complete) {
      setGameState("complete");
      if (difficulty === "hard") {
        setShowRankingPrompt(true);
      }
    }
  };

  // 👤 순위에 따른 점수 계산
  const getRankPoints = (rank: number): number => { if (rank === 1) return 200; if (rank <= 3) return 100; if (rank <= 10) return 50; return 0; };
  
  const updateMemberScore = async (userId: string, gameType: string, newRank: number) => {
    const points = getRankPoints(newRank); if (points === 0) return;
    try {
      const { data: profile } = await supabase.from("profiles").select("total_score, game_scores").eq("id", userId).single();
      if (!profile) return;
      const gameScores = profile.game_scores || {};
      const prevRank = gameScores[gameType]?.rank || Infinity;
      if (newRank >= prevRank) return;
      const previousPoints = gameScores[gameType]?.points || 0;
      const pointsDiff = points - previousPoints;
      if (pointsDiff <= 0) return;
      await supabase.from("profiles").update({ total_score: profile.total_score + pointsDiff, game_scores: { ...gameScores, [gameType]: { rank: newRank, points } }, updated_at: new Date().toISOString() }).eq("id", userId);
    } catch (err) { console.error("점수 업데이트 실패:", err); }
  };

  const submitScore = async () => {
    if (!nickname.trim() || hasSubmitted) return;
    const finalNickname = currentUserId && currentUserNickname ? currentUserNickname : nickname.trim();
    
    await supabase.from("sudoku_leaderboard").insert({
      nickname: finalNickname,
      difficulty,
      time_seconds: time,
      mistakes,
      country: selectedCountry,
      user_id: currentUserId || null,
    });
    
    // 👤 회원이면 순위 업데이트 (sudoku hard는 시간이 낮을수록 좋음)
    if (currentUserId && difficulty === "hard") {
      const { count } = await supabase.from("sudoku_leaderboard").select("*", { count: "exact", head: true }).eq("difficulty", "hard").lt("time_seconds", time);
      await updateMemberScore(currentUserId, "sudoku", (count || 0) + 1);
    }
    
    setHasSubmitted(true);
    setShowNicknameModal(false);
    fetchLeaderboard();
  };

  const shareResult = async () => {
    const baseUrl = locale === "ko" ? "https://slox.co.kr/sudoku" : `https://slox.co.kr/${locale}/sudoku`;
    const difficultyName = difficulty === "easy" ? t.easy : difficulty === "medium" ? t.medium : t.hard;
    const text = `🧩 SLOX ${t.title} ${t.complete}\n\n${difficultyName}\n${t.time}: ${formatTime(time)}\n${t.mistakes}: ${mistakes}\n${gradeInfo.grade} ${gradeInfo.emoji}\n\n${baseUrl}`;
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch { /* fallback */ }
    }
    await navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - GameNavBar 사용 */}
      <GameNavBar locale={locale} backText={locale === "ko" ? "← 메인" : "← Main"} languageOptions={languageOptions} />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {gameState === "ready" && (
            <div className="text-center">
              <div className="text-6xl mb-6">🧩</div>
              <h1 className="text-4xl font-black text-white mb-4">{t.title}</h1>
              <p className="text-dark-400 mb-8">{t.subtitle}</p>

              <div className="flex justify-center gap-2 mb-8">
                {(["easy", "medium", "hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      difficulty === d
                        ? "bg-emerald-500 text-black"
                        : "bg-dark-800 text-dark-400 hover:text-white"
                    }`}
                  >
                    {d === "easy" ? t.easy : d === "medium" ? t.medium : t.hard}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-3 mb-6">
                <div className="px-3 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.mistakeLimit}</span>
                  <span className="text-red-400 font-bold">{MAX_MISTAKES} {t.times}</span>
                </div>
                <div className="px-3 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.timePenalty}</span>
                  <span className="text-orange-400 font-bold">+{PENALTY_SECONDS}s</span>
                </div>
                <div className="px-3 py-2 bg-dark-800 rounded-xl text-center">
                  <span className="text-dark-400 text-xs block">{t.ranking}</span>
                  <span className={difficulty === "hard" ? "text-yellow-400 font-bold" : "text-dark-500 font-bold"}>
                    {difficulty === "hard" ? t.rankingAvailable : t.practiceMode}
                  </span>
                </div>
              </div>

              {difficulty !== "hard" && (
                <p className="text-dark-500 text-sm mb-4">{t.rankingOnlyHard}</p>
              )}

              <button 
                onClick={startGame} 
                className={`px-8 py-4 text-white font-bold text-lg rounded-xl ${
                  difficulty === "hard" 
                    ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                }`}
              >
                {difficulty === "hard" ? t.rankingChallenge : t.practiceStart}
              </button>

              {/* 명예의전당 */}
              <div className="mt-12 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🏆</span> {t.hallOfFame}
                  </h3>
                  <button onClick={fetchLeaderboard} className="text-dark-500 hover:text-white text-xs">🔄 {t.refresh}</button>
                </div>
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8 text-dark-500">
                    <span className="text-4xl mb-2 block">🔢</span>
                    {t.noChallengers} {t.firstChallenger}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(() => {
                      const memberRankMap = new Map<string, number>();
                      let memberRank = 0;
                      leaderboard.forEach(e => { if (e.user_id) { memberRank++; memberRankMap.set(e.user_id, memberRank); } });
                      return leaderboard.map((entry, idx) => {
                        const memberRankNum = entry.user_id ? memberRankMap.get(entry.user_id) || 0 : 0;
                        const entryGrade = getGradeByTime(entry.time_seconds);
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
                              {entry.user_id && memberRankNum <= 10 && (
                                memberRankNum === 1 ? (
                                  <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-300 border border-yellow-500/50 font-bold shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse">👑 {locale === "ko" ? "1위" : "#1"}</span>
                                ) : memberRankNum === 2 ? (
                                  <span className="text-xs px-1.5 py-0.5 rounded-lg bg-gray-400/20 text-gray-300 border border-gray-400/40 font-bold">🥈 {locale === "ko" ? "2위" : "#2"}</span>
                                ) : memberRankNum === 3 ? (
                                  <span className="text-xs px-1.5 py-0.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold">🥉 {locale === "ko" ? "3위" : "#3"}</span>
                                ) : (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">🏆 {memberRankNum}{locale === "ko" ? "위" : "th"}</span>
                                )
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-dark-400">
                              <span className={entryGrade.color}>{entryGrade.grade}</span>
                              <span>•</span>
                              <span>{t.mistakes} {entry.mistakes}{t.times}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold">{formatTime(entry.time_seconds)}</div>
                            <div className="text-xs text-dark-500">{idx + 1}{t.rank} / {leaderboard.length}</div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                  </div>
                )}
              </div>

              {/* 등급표 */}
              <div className="mt-8 bg-dark-900/50 rounded-2xl p-6 border border-dark-800">
                <h3 className="text-white font-medium mb-2 text-center">🏆 {t.gradeTable}</h3>
                <p className="text-dark-400 text-xs text-center mb-4">💡 {t.gradeTableDesc}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-sm">
                  <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg border border-yellow-400/50">
                    <span className="text-yellow-400 font-bold">🏆 {t.grades.legend}</span>
                    <p className="text-dark-400 text-xs">~2min</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg border border-purple-400/50">
                    <span className="text-purple-400 font-bold">💎 {t.grades.master}</span>
                    <p className="text-dark-400 text-xs">~4min</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg border border-blue-400/50">
                    <span className="text-blue-400 font-bold">⭐ {t.grades.expert}</span>
                    <p className="text-dark-400 text-xs">~6min</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-400/20 rounded-lg border border-green-400/50">
                    <span className="text-green-400 font-bold">👍 {t.grades.advanced}</span>
                    <p className="text-dark-400 text-xs">~8min</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg border border-cyan-400/50">
                    <span className="text-cyan-400 font-bold">😊 {t.grades.intermediate}</span>
                    <p className="text-dark-400 text-xs">~12min</p>
                  </div>
                  <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg border border-orange-400/50">
                    <span className="text-orange-400 font-bold">📚 {t.grades.beginner}</span>
                    <p className="text-dark-400 text-xs">12min~</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6 text-sm">
                <div className="px-3 py-1.5 bg-dark-800 rounded-lg">
                  <span className="text-dark-400">⏱ </span>
                  <span className="text-cyan-400 font-bold">{formatTime(time)}</span>
                </div>
                <div className={`px-3 py-1.5 rounded-lg ${mistakes >= MAX_MISTAKES - 3 ? 'bg-red-500/20' : 'bg-dark-800'}`}>
                  <span className="text-dark-400">❌ </span>
                  <span className={`font-bold ${mistakes >= MAX_MISTAKES - 3 ? 'text-red-400' : 'text-orange-400'}`}>
                    {mistakes}/{MAX_MISTAKES}
                  </span>
                  <span className="text-dark-500 text-xs ml-1">({MAX_MISTAKES - mistakes} {t.left})</span>
                </div>
              </div>

              <div className="inline-block bg-dark-800 p-2 rounded-xl">
                <div className="grid grid-cols-9 gap-0.5">
                  {userInput.map((row, r) =>
                    row.map((cell, c) => (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg font-bold transition-all
                          ${puzzle[r][c] !== 0 ? "bg-dark-700 text-white" : "bg-dark-900 hover:bg-dark-800"}
                          ${selectedCell?.[0] === r && selectedCell?.[1] === c ? "ring-2 ring-emerald-500" : ""}
                          ${cell !== 0 && cell !== solution[r][c] ? "text-red-400" : cell !== 0 ? "text-emerald-400" : "text-transparent"}
                          ${c === 2 || c === 5 ? "mr-1" : ""}
                          ${r === 2 || r === 5 ? "mb-1" : ""}
                        `}
                      >
                        {cell || ""}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    className="w-10 h-10 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-lg transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button onClick={() => setGameState("ready")} className="mt-6 px-4 py-2 text-dark-500 hover:text-white text-sm">
                {t.back}
              </button>
            </div>
          )}

          {gameState === "complete" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
                <div className="text-5xl mb-4">{gradeInfo.emoji}</div>
                <h2 className={`text-4xl font-black mb-2 ${gradeInfo.color}`}>{gradeInfo.grade}</h2>
                <p className="text-dark-400">{t.time}: {formatTime(time)} • {t.mistakes}: {mistakes}</p>
                <p className="text-dark-500 text-sm">({t.includesPenalty}: +{mistakes * PENALTY_SECONDS}s)</p>
                <div className="mt-8 flex flex-col gap-3">
                  <button onClick={() => setGameState("ready")} className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl">{t.playAgain}</button>
                  <button onClick={shareResult} className="py-3 px-6 bg-dark-800 text-white font-medium rounded-xl border border-dark-700">{showCopied ? t.copied : t.share}</button>
                </div>

                {difficulty === "hard" && !hasSubmitted && (
                  <button onClick={() => setShowNicknameModal(true)} className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">
                    {t.registerRanking}
                  </button>
                )}
                {difficulty !== "hard" && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
                    <p className="text-yellow-400 font-medium mb-1">{t.practiceComplete}</p>
                    <p className="text-dark-400 text-sm mb-3">{t.challengeHardMode}</p>
                    <button 
                      onClick={() => { setDifficulty("hard"); startGame(); }}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-lg"
                    >
                      {t.rankingChallenge}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {gameState === "gameover" && (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-red-500/30">
                <div className="text-6xl mb-4">😵</div>
                <h2 className="text-4xl font-black mb-2 text-red-400">{t.gameOver}</h2>
                <p className="text-dark-400 mb-2">{t.madeMistakes}</p>
                <p className="text-dark-500 text-sm">{t.time}: {formatTime(time)}</p>
                <div className="mt-8">
                  <button 
                    onClick={startGame} 
                    className="py-3 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
                  >
                    {t.tryAgain}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 랭킹 팝업 */}
      {showRankingPrompt && !showNicknameModal && !hasSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{gradeInfo.emoji}</div>
              <h3 className={`text-3xl font-black ${gradeInfo.color}`}>{formatTime(time)}</h3>
              <p className="text-dark-400">{gradeInfo.grade}</p>
            </div>
            <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl mb-2">{t.registerRanking}</button>
            <button onClick={shareResult} className="w-full py-3 bg-dark-800 text-white font-medium rounded-xl border border-dark-700 mb-2">{t.share}</button>
            <button onClick={() => setShowRankingPrompt(false)} className="w-full py-2 text-dark-500 text-sm">{t.maybeLater}</button>
          </div>
        </div>
      )}

      {/* 닉네임 모달 */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{t.enterNickname}</h3>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={t.nickname} maxLength={10} className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-3 focus:outline-none focus:border-emerald-500" />
            {/* 🔐 로그인 유도 */}
            <div className="mb-3 p-3 bg-accent-purple/10 rounded-lg border border-accent-purple/20">
              <p className="text-xs text-dark-300 mb-1">{locale === "ko" ? "💡 로그인하면 회원 점수에 반영됩니다" : "💡 Login to save your score to your profile"}</p>
              <a href={locale === "ko" ? "/login" : `/${locale}/login`} className="text-accent-purple text-xs hover:underline">{locale === "ko" ? "로그인하러 가기 →" : "Go to login →"}</a>
            </div>
            <div className="mb-4">
              <label className="text-dark-400 text-sm mb-1 block">{t.country}</label>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name[locale]}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNicknameModal(false)} className="flex-1 py-3 bg-dark-800 text-dark-400 rounded-xl">{t.cancel}</button>
              <button onClick={submitScore} disabled={!nickname.trim()} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl disabled:opacity-50">{t.submit}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

