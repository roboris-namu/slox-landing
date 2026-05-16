"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import AdBanner from "../AdBanner";
import { supabase } from "@/lib/supabase";
import GameNavBar from "@/components/GameNavBar";
import { Locale } from "@/locales";

// ─── 유럽 룰렛 표준 ─────────────────────────────────────────
// 0(녹색) + 빨강 18개 + 검정 18개. 휠 둘레 표준 시퀀스.
const WHEEL_ORDER: number[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const RED_SET = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

type Color = "red" | "black" | "green";
const colorOf = (n: number): Color => (n === 0 ? "green" : RED_SET.has(n) ? "red" : "black");

// ─── 게임 상수 ─────────────────────────────────────────────
const START_SCORE = 1000;
const TOTAL_ROUNDS = 10;
const COMBO_MULTIPLIER = [1, 1.2, 1.5, 2, 3, 5]; // 0연속, 1연속, ... 5연속 이상
const BONUS = {
  color: 100,
  parity: 100, // 홀짝
  dozen: 250,
  number: 1500,
};
const MISS_PENALTY = 50;

const comboMult = (combo: number) => COMBO_MULTIPLIER[Math.min(combo, COMBO_MULTIPLIER.length - 1)];

// ─── 다국어 ────────────────────────────────────────────────
const T: Record<Locale, Record<string, string>> = {
  ko: {
    title: "Lucky Roulette", subtitle: "룰렛이 어디에 멈출지 예측하세요!", play: "게임", ranking: "랭킹",
    start: "시작하기", round: "라운드", score: "점수", combo: "콤보", maxCombo: "최대 콤보",
    pickPrediction: "예측을 선택하세요", spinning: "회전 중...", landed: "당첨",
    cat_color: "색깔", cat_parity: "홀짝", cat_dozen: "다스", cat_number: "단일 숫자",
    red: "빨강", black: "검정", odd: "홀수", even: "짝수",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "당신의 예측", result: "결과", hit: "적중!", miss: "미스!", bonus: "보너스",
    finalScore: "최종 점수", gameOver: "게임 종료", nextRound: "다음 라운드", spin: "스핀!",
    saveRank: "랭킹에 등록", viewRanking: "전체 랭킹", playAgain: "다시 플레이",
    nickModal: "점수 등록", nickHint: "닉네임 (최대 20자)", country: "국가", submit: "등록", cancel: "취소",
    rules: "룰", rule1: "10라운드 동안 룰렛이 어디에 멈출지 예측",
    rule2: "색/홀짝 적중 +100 · 다스 +250 · 단일 숫자 +1500",
    rule3: "연속 적중 시 콤보 배수 (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "미스하면 -50, 콤보 리셋",
    challenger: "챌린저", master: "마스터", diamond: "다이아몬드", platinum: "플래티넘",
    gold: "골드", silver: "실버", bronze: "브론즈", iron: "아이언",
    globalRank: "글로벌 랭킹", topPlayers: "TOP 플레이어",
    you: "나의 점수",
  },
  en: {
    title: "Lucky Roulette", subtitle: "Predict where the wheel will land!", play: "Play", ranking: "Ranking",
    start: "Start", round: "Round", score: "Score", combo: "Combo", maxCombo: "Max combo",
    pickPrediction: "Pick your prediction", spinning: "Spinning...", landed: "Landed",
    cat_color: "Color", cat_parity: "Odd/Even", cat_dozen: "Dozen", cat_number: "Single number",
    red: "Red", black: "Black", odd: "Odd", even: "Even",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "Your pick", result: "Result", hit: "Hit!", miss: "Miss!", bonus: "Bonus",
    finalScore: "Final score", gameOver: "Game over", nextRound: "Next round", spin: "Spin!",
    saveRank: "Save to ranking", viewRanking: "View ranking", playAgain: "Play again",
    nickModal: "Submit score", nickHint: "Nickname (max 20)", country: "Country", submit: "Submit", cancel: "Cancel",
    rules: "Rules", rule1: "Predict the wheel for 10 rounds",
    rule2: "Color/Parity +100 · Dozen +250 · Single number +1500",
    rule3: "Streak combo multiplier (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "Miss: -50, combo resets",
    challenger: "Challenger", master: "Master", diamond: "Diamond", platinum: "Platinum",
    gold: "Gold", silver: "Silver", bronze: "Bronze", iron: "Iron",
    globalRank: "Global Ranking", topPlayers: "Top Players",
    you: "Your score",
  },
  ja: {
    title: "Lucky Roulette", subtitle: "ルーレットがどこに止まるか予測！", play: "プレイ", ranking: "ランキング",
    start: "スタート", round: "ラウンド", score: "スコア", combo: "コンボ", maxCombo: "最大コンボ",
    pickPrediction: "予測を選んでください", spinning: "回転中...", landed: "結果",
    cat_color: "色", cat_parity: "奇偶", cat_dozen: "ダース", cat_number: "単一の数字",
    red: "赤", black: "黒", odd: "奇数", even: "偶数",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "あなたの予測", result: "結果", hit: "命中！", miss: "ミス！", bonus: "ボーナス",
    finalScore: "最終スコア", gameOver: "ゲーム終了", nextRound: "次のラウンド", spin: "スピン！",
    saveRank: "ランキング登録", viewRanking: "全ランキング", playAgain: "もう一度",
    nickModal: "スコア登録", nickHint: "ニックネーム (20文字以内)", country: "国", submit: "登録", cancel: "キャンセル",
    rules: "ルール", rule1: "10ラウンドでルーレットを予測",
    rule2: "色/奇偶 +100 · ダース +250 · 単一の数字 +1500",
    rule3: "連続命中でコンボ倍率 (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "ミス: -50、コンボリセット",
    challenger: "チャレンジャー", master: "マスター", diamond: "ダイヤモンド", platinum: "プラチナ",
    gold: "ゴールド", silver: "シルバー", bronze: "ブロンズ", iron: "アイアン",
    globalRank: "グローバルランキング", topPlayers: "トッププレイヤー",
    you: "あなたのスコア",
  },
  zh: {
    title: "Lucky Roulette", subtitle: "预测轮盘会停在哪里！", play: "游戏", ranking: "排行",
    start: "开始", round: "回合", score: "分数", combo: "连击", maxCombo: "最大连击",
    pickPrediction: "选择你的预测", spinning: "旋转中...", landed: "结果",
    cat_color: "颜色", cat_parity: "奇偶", cat_dozen: "一打", cat_number: "单一数字",
    red: "红", black: "黑", odd: "奇数", even: "偶数",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "你的预测", result: "结果", hit: "命中！", miss: "失误！", bonus: "奖励",
    finalScore: "最终分数", gameOver: "游戏结束", nextRound: "下一回合", spin: "旋转！",
    saveRank: "提交分数", viewRanking: "查看排行", playAgain: "再玩一次",
    nickModal: "提交分数", nickHint: "昵称(20字以内)", country: "国家/地区", submit: "提交", cancel: "取消",
    rules: "规则", rule1: "在10回合中预测轮盘",
    rule2: "颜色/奇偶 +100 · 一打 +250 · 单一数字 +1500",
    rule3: "连击倍率 (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "失误: -50,连击重置",
    challenger: "王者", master: "宗师", diamond: "钻石", platinum: "白金",
    gold: "黄金", silver: "白银", bronze: "青铜", iron: "黑铁",
    globalRank: "全球排行", topPlayers: "顶尖玩家",
    you: "你的分数",
  },
  es: {
    title: "Lucky Roulette", subtitle: "¡Predice dónde caerá la ruleta!", play: "Jugar", ranking: "Ranking",
    start: "Empezar", round: "Ronda", score: "Puntos", combo: "Combo", maxCombo: "Combo máx",
    pickPrediction: "Elige tu predicción", spinning: "Girando...", landed: "Resultado",
    cat_color: "Color", cat_parity: "Par/Impar", cat_dozen: "Docena", cat_number: "Número único",
    red: "Rojo", black: "Negro", odd: "Impar", even: "Par",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "Tu predicción", result: "Resultado", hit: "¡Acierto!", miss: "¡Fallo!", bonus: "Bonus",
    finalScore: "Puntuación final", gameOver: "Fin del juego", nextRound: "Siguiente ronda", spin: "¡Girar!",
    saveRank: "Guardar en ranking", viewRanking: "Ver ranking", playAgain: "Jugar otra vez",
    nickModal: "Enviar puntuación", nickHint: "Apodo (máx 20)", country: "País", submit: "Enviar", cancel: "Cancelar",
    rules: "Reglas", rule1: "Predice la ruleta durante 10 rondas",
    rule2: "Color/Par-Impar +100 · Docena +250 · Número único +1500",
    rule3: "Multiplicador combo (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "Fallo: -50, combo se reinicia",
    challenger: "Retador", master: "Maestro", diamond: "Diamante", platinum: "Platino",
    gold: "Oro", silver: "Plata", bronze: "Bronce", iron: "Hierro",
    globalRank: "Ranking Global", topPlayers: "Mejores Jugadores",
    you: "Tu puntuación",
  },
  pt: {
    title: "Lucky Roulette", subtitle: "Preveja onde a roleta vai parar!", play: "Jogar", ranking: "Ranking",
    start: "Começar", round: "Rodada", score: "Pontos", combo: "Combo", maxCombo: "Combo máx",
    pickPrediction: "Escolha sua previsão", spinning: "Girando...", landed: "Resultado",
    cat_color: "Cor", cat_parity: "Par/Ímpar", cat_dozen: "Dúzia", cat_number: "Número único",
    red: "Vermelho", black: "Preto", odd: "Ímpar", even: "Par",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "Sua previsão", result: "Resultado", hit: "Acertou!", miss: "Errou!", bonus: "Bônus",
    finalScore: "Pontuação final", gameOver: "Fim de jogo", nextRound: "Próxima rodada", spin: "Girar!",
    saveRank: "Enviar p/ ranking", viewRanking: "Ver ranking", playAgain: "Jogar de novo",
    nickModal: "Enviar pontuação", nickHint: "Apelido (máx 20)", country: "País", submit: "Enviar", cancel: "Cancelar",
    rules: "Regras", rule1: "Preveja a roleta por 10 rodadas",
    rule2: "Cor/Par-Ímpar +100 · Dúzia +250 · Número único +1500",
    rule3: "Multiplicador combo (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "Erro: -50, combo zera",
    challenger: "Desafiante", master: "Mestre", diamond: "Diamante", platinum: "Platina",
    gold: "Ouro", silver: "Prata", bronze: "Bronze", iron: "Ferro",
    globalRank: "Ranking Global", topPlayers: "Top Jogadores",
    you: "Sua pontuação",
  },
  de: {
    title: "Lucky Roulette", subtitle: "Sage voraus, wo das Rad landet!", play: "Spielen", ranking: "Rangliste",
    start: "Start", round: "Runde", score: "Punkte", combo: "Combo", maxCombo: "Max Combo",
    pickPrediction: "Wähle deine Vorhersage", spinning: "Dreht sich...", landed: "Ergebnis",
    cat_color: "Farbe", cat_parity: "Gerade/Ungerade", cat_dozen: "Dutzend", cat_number: "Einzelne Zahl",
    red: "Rot", black: "Schwarz", odd: "Ungerade", even: "Gerade",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "Deine Wahl", result: "Ergebnis", hit: "Treffer!", miss: "Daneben!", bonus: "Bonus",
    finalScore: "Endpunktzahl", gameOver: "Spielende", nextRound: "Nächste Runde", spin: "Drehen!",
    saveRank: "In Rangliste speichern", viewRanking: "Rangliste ansehen", playAgain: "Erneut spielen",
    nickModal: "Punkte einsenden", nickHint: "Nickname (max 20)", country: "Land", submit: "Senden", cancel: "Abbrechen",
    rules: "Regeln", rule1: "Sage 10 Runden lang das Rad voraus",
    rule2: "Farbe/Gerade-Ungerade +100 · Dutzend +250 · Zahl +1500",
    rule3: "Combo-Multiplikator (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "Daneben: -50, Combo zurück",
    challenger: "Challenger", master: "Meister", diamond: "Diamant", platinum: "Platin",
    gold: "Gold", silver: "Silber", bronze: "Bronze", iron: "Eisen",
    globalRank: "Globale Rangliste", topPlayers: "Top Spieler",
    you: "Deine Punkte",
  },
  fr: {
    title: "Lucky Roulette", subtitle: "Devine où la roulette va s'arrêter !", play: "Jouer", ranking: "Classement",
    start: "Commencer", round: "Manche", score: "Score", combo: "Combo", maxCombo: "Combo max",
    pickPrediction: "Choisis ta prédiction", spinning: "Tourne...", landed: "Résultat",
    cat_color: "Couleur", cat_parity: "Pair/Impair", cat_dozen: "Douzaine", cat_number: "Nombre unique",
    red: "Rouge", black: "Noir", odd: "Impair", even: "Pair",
    dozen1: "1-12", dozen2: "13-24", dozen3: "25-36",
    yourPick: "Ta prédiction", result: "Résultat", hit: "Touché !", miss: "Raté !", bonus: "Bonus",
    finalScore: "Score final", gameOver: "Fin de partie", nextRound: "Manche suivante", spin: "Tourner !",
    saveRank: "Enregistrer", viewRanking: "Voir le classement", playAgain: "Rejouer",
    nickModal: "Envoyer score", nickHint: "Pseudo (max 20)", country: "Pays", submit: "Envoyer", cancel: "Annuler",
    rules: "Règles", rule1: "Prédisez la roulette pendant 10 manches",
    rule2: "Couleur/Pair-Impair +100 · Douzaine +250 · Nombre +1500",
    rule3: "Multiplicateur combo (1.2× → 1.5× → 2× → 3× → 5×)",
    rule4: "Raté : -50, combo réinitialisé",
    challenger: "Challenger", master: "Maître", diamond: "Diamant", platinum: "Platine",
    gold: "Or", silver: "Argent", bronze: "Bronze", iron: "Fer",
    globalRank: "Classement Global", topPlayers: "Meilleurs Joueurs",
    you: "Ton score",
  },
};

// ─── 국가 ─────────────────────────────────────────────────
const COUNTRIES = [
  { code: "KR", flag: "🇰🇷", name: "Korea" }, { code: "US", flag: "🇺🇸", name: "USA" },
  { code: "JP", flag: "🇯🇵", name: "Japan" }, { code: "CN", flag: "🇨🇳", name: "China" },
  { code: "TW", flag: "🇹🇼", name: "Taiwan" }, { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "FR", flag: "🇫🇷", name: "France" }, { code: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "BR", flag: "🇧🇷", name: "Brazil" }, { code: "GB", flag: "🇬🇧", name: "UK" },
  { code: "CA", flag: "🇨🇦", name: "Canada" }, { code: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "IN", flag: "🇮🇳", name: "India" }, { code: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "IT", flag: "🇮🇹", name: "Italy" }, { code: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "TH", flag: "🇹🇭", name: "Thailand" }, { code: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "PH", flag: "🇵🇭", name: "Philippines" }, { code: "SG", flag: "🇸🇬", name: "Singapore" },
];

const DEFAULT_COUNTRY: Record<Locale, string> = {
  ko: "KR", en: "US", ja: "JP", zh: "CN", de: "DE", fr: "FR", es: "ES", pt: "BR",
};

const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/roulette" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/roulette" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/roulette" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/roulette" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/roulette" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/roulette" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/roulette" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/roulette" },
];

const flagOf = (code: string | null | undefined) =>
  COUNTRIES.find((c) => c.code === code)?.flag || "🌍";

// ─── 예측 ──────────────────────────────────────────────────
type PredictionKind = "color" | "parity" | "dozen" | "number";
interface Prediction {
  kind: PredictionKind;
  value: string | number; // color: "red"|"black"; parity: "odd"|"even"; dozen: 1|2|3; number: 0~36
}

function check(p: Prediction, n: number): { hit: boolean; bonus: number } {
  switch (p.kind) {
    case "color":
      return { hit: colorOf(n) === p.value, bonus: BONUS.color };
    case "parity":
      if (n === 0) return { hit: false, bonus: BONUS.parity };
      return { hit: (p.value === "odd") === (n % 2 === 1), bonus: BONUS.parity };
    case "dozen":
      if (n === 0) return { hit: false, bonus: BONUS.dozen };
      const dozen = Math.ceil(n / 12);
      return { hit: dozen === p.value, bonus: BONUS.dozen };
    case "number":
      return { hit: n === p.value, bonus: BONUS.number };
  }
}

function getGrade(t: Record<string, string>, score: number) {
  if (score >= 50000) return { code: "challenger", label: t.challenger, color: "#67E8F9", emoji: "👑" };
  if (score >= 20000) return { code: "master", label: t.master, color: "#C084FC", emoji: "💎" };
  if (score >= 10000) return { code: "diamond", label: t.diamond, color: "#60A5FA", emoji: "💠" };
  if (score >= 5000) return { code: "platinum", label: t.platinum, color: "#2DD4BF", emoji: "🏆" };
  if (score >= 3000) return { code: "gold", label: t.gold, color: "#FBBF24", emoji: "🥇" };
  if (score >= 2000) return { code: "silver", label: t.silver, color: "#D1D5DB", emoji: "🥈" };
  if (score >= 1500) return { code: "bronze", label: t.bronze, color: "#FB923C", emoji: "🥉" };
  return { code: "iron", label: t.iron, color: "#A8A29E", emoji: "🪨" };
}

function percentileOf(score: number) {
  if (score >= 50000) return 1;
  if (score >= 20000) return 5;
  if (score >= 10000) return 15;
  if (score >= 5000) return 30;
  if (score >= 3000) return 50;
  if (score >= 2000) return 70;
  if (score >= 1500) return 85;
  return 95;
}

// ─── 리더보드 타입 ─────────────────────────────────────────
interface LeaderEntry {
  id: string;
  nickname: string;
  score: number;
  best_combo: number;
  rounds: number;
  hits: number;
  device_type?: string;
  grade?: string;
  percentile?: number;
  country?: string;
  user_id?: string;
  overall_rank?: number;
  avatar_url?: string;
}

// ═══════════════════════════════════════════════════════════
interface Props {
  locale: Locale;
}

type GameState = "waiting" | "predicting" | "spinning" | "result" | "gameover";

export default function RouletteMulti({ locale }: Props) {
  const t = T[locale];

  const [state, setState] = useState<GameState>("waiting");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(START_SCORE);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [landed, setLanded] = useState<number | null>(null);
  const [lastDelta, setLastDelta] = useState(0);
  const [wheelDeg, setWheelDeg] = useState(0);

  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [showNickModal, setShowNickModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [, setCurrentUserNickname] = useState("");

  const wheelRef = useRef<HTMLDivElement>(null);

  // ─── 모바일 감지 ─────────────────────────────────────────
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  // ─── 로그인 체크 (광고 차단기 우회) ───────────────────────
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
          for (const key of Object.keys(localStorage)) {
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
        } catch { /* 차단 */ }
      }
      if (userId) {
        setCurrentUserId(userId);
        try {
          const res = await fetch(`/api/profile?userId=${userId}`);
          const { profile } = await res.json();
          if (profile?.nickname) { setCurrentUserNickname(profile.nickname); setNickname(profile.nickname); }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
  }, []);

  // ─── 리더보드 ────────────────────────────────────────────
  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard?game=roulette&limit=10");
      const result = await res.json();
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) { console.error(err); }
  }, []);
  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // 게임 종료 시 정확한 순위
  useEffect(() => {
    if (state === "gameover" && score >= 0) {
      fetch(`/api/leaderboard?game=roulette&limit=10&myScore=${score}`)
        .then(res => res.json())
        .then(r => {
          if (r.myRank) setMyRank(r.myRank);
          if (r.data) setLeaderboard(r.data);
          if (r.totalCount !== undefined) setTotalCount(r.totalCount);
        }).catch(() => {});
    }
  }, [state, score]);

  // ─── 게임 시작 ───────────────────────────────────────────
  const startGame = () => {
    setRound(1);
    setScore(START_SCORE);
    setCombo(0);
    setMaxCombo(0);
    setHits(0);
    setPrediction(null);
    setLanded(null);
    setLastDelta(0);
    setHasSubmittedScore(false);
    setState("predicting");
  };

  const playAgain = () => {
    startGame();
  };

  // ─── 스핀 ───────────────────────────────────────────────
  const spin = () => {
    if (!prediction || state !== "predicting") return;
    // 0~36 무작위 결과
    const result = Math.floor(Math.random() * 37);
    setLanded(result);
    setState("spinning");

    // 휠 회전 각도 계산 — 결과 칸의 "중심"이 12시 방향(화살표 아래)에 오도록
    // 세그먼트 i 의 중심 = (i * per + per/2) 만큼 시계 회전된 위치
    // → 휠을 -(i * per + per/2) 회전시키면 그 중심이 정확히 12시
    const resultIdx = WHEEL_ORDER.indexOf(result);
    const per = 360 / WHEEL_ORDER.length;
    const targetDeg = -resultIdx * per - per / 2;
    // 5바퀴 + 결과 중심
    const finalDeg = wheelDeg - (wheelDeg % 360) + 360 * 5 + targetDeg;
    setWheelDeg(finalDeg);

    // 3초 후 결과
    setTimeout(() => {
      const { hit, bonus } = check(prediction, result);
      let delta = 0;
      if (hit) {
        const mult = comboMult(combo);
        delta = Math.round(bonus * mult);
        setScore(s => s + delta);
        setCombo(c => {
          const nc = c + 1;
          if (nc > maxCombo) setMaxCombo(nc);
          return nc;
        });
        setHits(h => h + 1);
      } else {
        delta = -MISS_PENALTY;
        setScore(s => Math.max(0, s + delta));
        setCombo(0);
      }
      setLastDelta(delta);
      setState("result");
    }, 3000);
  };

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setState("gameover");
      return;
    }
    setRound(r => r + 1);
    setPrediction(null);
    setLanded(null);
    setLastDelta(0);
    setState("predicting");
  };

  // ─── 점수 등록 ───────────────────────────────────────────
  const submitScore = async () => {
    const nick = nickname.trim();
    if (!nick || isSubmitting) return;
    setIsSubmitting(true);
    const grade = getGrade(t, score);
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "roulette",
          data: {
            nickname: nick.slice(0, 20),
            score,
            best_combo: maxCombo,
            rounds: TOTAL_ROUNDS,
            hits,
            device_type: isMobile ? "mobile" : "pc",
            grade: grade.code,
            percentile: percentileOf(score),
            country: selectedCountry,
          },
          userId: currentUserId,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setHasSubmittedScore(true);
      setShowNickModal(false);
      fetchLeaderboard();
    } catch (err) {
      console.error(err);
      alert(t.miss); // err handling
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── 휠 렌더링 ──────────────────────────────────────────
  const wheelSegments = useMemo(() => {
    const per = 360 / WHEEL_ORDER.length;
    return WHEEL_ORDER.map((n, i) => {
      const a1 = i * per - 90;
      const a2 = (i + 1) * per - 90;
      const r = 140;
      const x1 = r + r * Math.cos((a1 * Math.PI) / 180);
      const y1 = r + r * Math.sin((a1 * Math.PI) / 180);
      const x2 = r + r * Math.cos((a2 * Math.PI) / 180);
      const y2 = r + r * Math.sin((a2 * Math.PI) / 180);
      const fill = n === 0 ? "#16a34a" : RED_SET.has(n) ? "#dc2626" : "#0a0a0a";
      // 텍스트 위치
      const ta = (a1 + a2) / 2;
      const tx = r + (r - 22) * Math.cos((ta * Math.PI) / 180);
      const ty = r + (r - 22) * Math.sin((ta * Math.PI) / 180);
      return { n, i, fill, path: `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`, tx, ty, ta };
    });
  }, []);

  // ───── 화면 렌더링 ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white">
      <GameNavBar locale={locale} backText={locale === "ko" ? "← 메인" : "← Main"} languageOptions={languageOptions} />
      <AdBanner />

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 상단 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-red-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
            🎡 {t.title}
          </h1>
          <p className="text-sm text-dark-400 mt-1">{t.subtitle}</p>
        </div>

        {/* 룰 카드 (대기 상태에서만) */}
        {state === "waiting" && (
          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-5 mb-6 text-sm space-y-2">
            <div className="font-bold text-yellow-400 mb-2">📜 {t.rules}</div>
            <div>• {t.rule1}</div>
            <div>• {t.rule2}</div>
            <div>• {t.rule3}</div>
            <div>• {t.rule4}</div>
          </div>
        )}

        {/* 통계 바 (게임 중) */}
        {state !== "waiting" && state !== "gameover" && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Stat label={t.round} value={`${round}/${TOTAL_ROUNDS}`} color="text-blue-400" />
            <Stat label={t.score} value={`${score}`} color="text-yellow-400" />
            <Stat label={t.combo} value={`×${combo}`} color={combo >= 3 ? "text-pink-400" : "text-purple-400"} />
          </div>
        )}

        {/* 룰렛 휠 (waiting/predicting/spinning/result) */}
        {state !== "gameover" && (
          <div className="relative flex items-center justify-center my-6 pt-4">
            {/* 포인터 (12시 방향) — 휠 위쪽 바깥에 배치, 황금색 + 그림자 */}
            <svg
              className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
              width="28" height="24" viewBox="0 0 28 24"
              style={{ pointerEvents: "none" }}
            >
              <polygon
                points="2,2 26,2 14,22"
                fill="#FBBF24"
                stroke="#000"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <polygon points="6,4 22,4 14,18" fill="#FFE066" />
            </svg>
            {/* 휠 */}
            <div
              ref={wheelRef}
              className="relative"
              style={{
                width: 280,
                height: 280,
                transform: `rotate(${wheelDeg}deg)`,
                transition: state === "spinning" ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
              }}
            >
              <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <g>
                  {wheelSegments.map((seg) => (
                    <g key={seg.i}>
                      <path d={seg.path} fill={seg.fill} stroke="#1a1a1a" strokeWidth="1" />
                      <text
                        x={seg.tx} y={seg.ty} fill="white" fontSize="9" fontWeight="900"
                        textAnchor="middle" dominantBaseline="central"
                        transform={`rotate(${seg.ta + 90} ${seg.tx} ${seg.ty})`}
                      >
                        {seg.n}
                      </text>
                    </g>
                  ))}
                </g>
                {/* 중심 */}
                <circle cx="140" cy="140" r="22" fill="#FFD54F" stroke="#000" strokeWidth="2" />
                <text x="140" y="140" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="900">🎯</text>
              </svg>
            </div>
          </div>
        )}

        {/* 시작 버튼 */}
        {state === "waiting" && (
          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl transition-all shadow-lg"
          >
            ▶ {t.start}
          </button>
        )}

        {/* 예측 패널 */}
        {state === "predicting" && (
          <PredictPanel
            t={t}
            prediction={prediction}
            onPick={setPrediction}
            onSpin={spin}
          />
        )}

        {/* 스핀 중 */}
        {state === "spinning" && (
          <div className="text-center py-6">
            <div className="text-lg font-bold animate-pulse text-purple-300">{t.spinning}</div>
          </div>
        )}

        {/* 결과 */}
        {state === "result" && landed !== null && (
          <ResultPanel
            t={t} landed={landed} prediction={prediction} delta={lastDelta}
            isLast={round >= TOTAL_ROUNDS} onNext={nextRound}
          />
        )}

        {/* 게임 종료 */}
        {state === "gameover" && (
          <GameOverPanel
            t={t} score={score} maxCombo={maxCombo} hits={hits}
            hasSubmitted={hasSubmittedScore}
            onSave={() => setShowNickModal(true)}
            onPlay={playAgain}
            grade={getGrade(t, score)}
          />
        )}

        {/* 글로벌 랭킹 */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">🏆 {t.globalRank}</h2>
            {totalCount > 0 && (
              <span className="text-xs text-dark-400">{totalCount.toLocaleString()}</span>
            )}
          </div>
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-dark-400 text-sm">—</div>
          ) : (
            <div className="space-y-2">
              {leaderboard.slice(0, 10).map((e, i) => (
                <LeaderRow key={e.id} rank={i + 1} e={e} />
              ))}
              {myRank && myRank > 10 && (
                <div className="text-center text-xs text-dark-400 pt-2">
                  …  {t.you} #{myRank}  ({score})
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 닉네임 모달 */}
      {showNickModal && (
        <NickModal
          t={t} nickname={nickname} setNickname={setNickname}
          country={selectedCountry} setCountry={setSelectedCountry}
          locale={locale} isSubmitting={isSubmitting}
          onSubmit={submitScore} onCancel={() => setShowNickModal(false)}
          score={score} grade={getGrade(t, score)}
        />
      )}
    </div>
  );
}

// ─── 서브 컴포넌트 ─────────────────────────────────────────

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-dark-800/60 border border-dark-700 rounded-xl px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-dark-400">{label}</div>
      <div className={`text-lg font-bold ${color} tabular-nums`}>{value}</div>
    </div>
  );
}

function PredictPanel({
  t, prediction, onPick, onSpin,
}: {
  t: Record<string, string>;
  prediction: Prediction | null;
  onPick: (p: Prediction) => void;
  onSpin: () => void;
}) {
  const isPicked = (p: Prediction) =>
    prediction?.kind === p.kind && prediction?.value === p.value;

  const Btn = ({ p, label, color, big }: { p: Prediction; label: string; color: string; big?: boolean }) => (
    <button
      onClick={() => onPick(p)}
      className={`px-3 ${big ? "py-3 text-base" : "py-2 text-sm"} rounded-lg font-bold transition-all border ${
        isPicked(p)
          ? `${color} border-white scale-105 shadow-lg`
          : "bg-dark-800/50 border-dark-700 text-dark-300 hover:bg-dark-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="text-center text-sm font-bold text-purple-300">{t.pickPrediction}</div>

      {/* 색 */}
      <Section title={t.cat_color} bonusText="+100">
        <div className="grid grid-cols-2 gap-2">
          <Btn p={{ kind: "color", value: "red" }} label={`🔴 ${t.red}`} color="bg-red-600 text-white" big />
          <Btn p={{ kind: "color", value: "black" }} label={`⚫ ${t.black}`} color="bg-black text-white" big />
        </div>
      </Section>

      {/* 홀짝 */}
      <Section title={t.cat_parity} bonusText="+100">
        <div className="grid grid-cols-2 gap-2">
          <Btn p={{ kind: "parity", value: "odd" }} label={t.odd} color="bg-purple-600 text-white" big />
          <Btn p={{ kind: "parity", value: "even" }} label={t.even} color="bg-indigo-600 text-white" big />
        </div>
      </Section>

      {/* 다스 */}
      <Section title={t.cat_dozen} bonusText="+250">
        <div className="grid grid-cols-3 gap-2">
          <Btn p={{ kind: "dozen", value: 1 }} label={t.dozen1} color="bg-teal-600 text-white" />
          <Btn p={{ kind: "dozen", value: 2 }} label={t.dozen2} color="bg-teal-600 text-white" />
          <Btn p={{ kind: "dozen", value: 3 }} label={t.dozen3} color="bg-teal-600 text-white" />
        </div>
      </Section>

      {/* 단일 숫자 */}
      <Section title={t.cat_number} bonusText="+1500">
        <div className="grid grid-cols-9 gap-1">
          {Array.from({ length: 37 }, (_, n) => (
            <button
              key={n}
              onClick={() => onPick({ kind: "number", value: n })}
              className={`aspect-square rounded text-[11px] font-bold transition-all border ${
                isPicked({ kind: "number", value: n })
                  ? "bg-yellow-400 text-black border-white scale-110 shadow-lg"
                  : n === 0
                    ? "bg-green-600 text-white border-green-700"
                    : RED_SET.has(n)
                      ? "bg-red-600 text-white border-red-700"
                      : "bg-black text-white border-gray-800"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Section>

      <button
        onClick={onSpin}
        disabled={!prediction}
        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-dark-700 disabled:to-dark-700 disabled:cursor-not-allowed text-black disabled:text-dark-500 font-extrabold text-lg rounded-2xl transition-all shadow-lg"
      >
        🎡 {t.spin}
      </button>
    </div>
  );
}

function Section({ title, bonusText, children }: { title: string; bonusText: string; children: React.ReactNode }) {
  return (
    <div className="bg-dark-800/40 border border-dark-700 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold text-dark-300 uppercase tracking-wider">{title}</div>
        <div className="text-[10px] text-yellow-400 font-bold">{bonusText}</div>
      </div>
      {children}
    </div>
  );
}

function ResultPanel({
  t, landed, prediction, delta, isLast, onNext,
}: {
  t: Record<string, string>;
  landed: number;
  prediction: Prediction | null;
  delta: number;
  isLast: boolean;
  onNext: () => void;
}) {
  const isHit = delta > 0;
  const c = colorOf(landed);
  const colorBg = c === "red" ? "bg-red-600" : c === "green" ? "bg-green-600" : "bg-black";
  const formatPred = (p: Prediction | null) => {
    if (!p) return "-";
    if (p.kind === "color") return p.value === "red" ? `🔴 ${t.red}` : `⚫ ${t.black}`;
    if (p.kind === "parity") return p.value === "odd" ? t.odd : t.even;
    if (p.kind === "dozen") return p.value === 1 ? t.dozen1 : p.value === 2 ? t.dozen2 : t.dozen3;
    return `#${p.value}`;
  };

  return (
    <div className="space-y-4">
      <div className={`p-6 rounded-2xl border-2 text-center ${isHit ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
        <div className="text-xs uppercase tracking-wider text-dark-400 mb-2">{t.landed}</div>
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colorBg} text-4xl font-extrabold text-white shadow-2xl mb-3`}>
          {landed}
        </div>
        <div className="text-sm text-dark-300 mb-1">
          {t.yourPick}: <span className="font-bold text-white">{formatPred(prediction)}</span>
        </div>
        <div className={`text-3xl font-extrabold mt-2 ${isHit ? "text-green-400" : "text-red-400"}`}>
          {isHit ? `${t.hit} +${delta}` : `${t.miss} ${delta}`}
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all"
      >
        {isLast ? `🏁 ${t.gameOver}` : `➡️ ${t.nextRound}`}
      </button>
    </div>
  );
}

function GameOverPanel({
  t, score, maxCombo, hits, hasSubmitted, onSave, onPlay, grade,
}: {
  t: Record<string, string>;
  score: number;
  maxCombo: number;
  hits: number;
  hasSubmitted: boolean;
  onSave: () => void;
  onPlay: () => void;
  grade: ReturnType<typeof getGrade>;
}) {
  return (
    <div className="space-y-5">
      <div className="text-center p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl">
        <div className="text-5xl mb-2">{grade.emoji}</div>
        <div className="text-sm font-bold uppercase tracking-wider" style={{ color: grade.color }}>{grade.label}</div>
        <div className="text-5xl font-extrabold mt-2 tabular-nums">{score}</div>
        <div className="text-xs text-dark-400 mt-1">{t.finalScore}</div>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div><span className="text-dark-400">{t.maxCombo}:</span> <span className="font-bold text-pink-400">×{maxCombo}</span></div>
          <div><span className="text-dark-400">Hits:</span> <span className="font-bold text-green-400">{hits}/{TOTAL_ROUNDS}</span></div>
        </div>
      </div>

      {!hasSubmitted ? (
        <button onClick={onSave} className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold rounded-xl">
          🏆 {t.saveRank}
        </button>
      ) : (
        <div className="text-center text-green-400 font-bold py-3">✓ {t.saveRank}</div>
      )}

      <button onClick={onPlay} className="w-full py-3 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-xl border border-dark-700">
        🔄 {t.playAgain}
      </button>
    </div>
  );
}

function LeaderRow({ rank, e }: { rank: number; e: LeaderEntry }) {
  const rankColor = rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : rank === 3 ? "text-orange-400" : "text-dark-400";
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-dark-800/40 border border-dark-700 rounded-lg">
      <div className={`w-8 text-center font-extrabold ${rankColor}`}>#{rank}</div>
      <div className="text-lg">{flagOf(e.country)}</div>
      <div className="flex-1 truncate text-sm font-semibold">{e.nickname || "-"}</div>
      <div className="text-xs text-dark-400 hidden sm:block">×{e.best_combo}</div>
      <div className="text-sm font-bold text-yellow-400 tabular-nums">{e.score}</div>
    </div>
  );
}

function NickModal({
  t, nickname, setNickname, country, setCountry, locale, isSubmitting, onSubmit, onCancel, score, grade,
}: {
  t: Record<string, string>;
  nickname: string;
  setNickname: (s: string) => void;
  country: string;
  setCountry: (s: string) => void;
  locale: Locale;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  score: number;
  grade: ReturnType<typeof getGrade>;
}) {
  void locale;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-dark-900 border border-dark-700 rounded-2xl p-6 space-y-4">
        <div className="text-center">
          <div className="text-3xl">{grade.emoji}</div>
          <div className="text-xl font-bold mt-1">{t.nickModal}</div>
          <div className="text-3xl font-extrabold mt-2 tabular-nums" style={{ color: grade.color }}>{score} pts</div>
        </div>
        <input
          value={nickname} onChange={e => setNickname(e.target.value)}
          maxLength={20} placeholder={t.nickHint}
          className="w-full bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
        />
        <div>
          <div className="text-xs text-dark-400 mb-1">{t.country}</div>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {COUNTRIES.map(c => (
              <button key={c.code} onClick={() => setCountry(c.code)}
                className={`px-2 py-1 text-sm rounded-md border ${country === c.code ? "border-purple-500 bg-purple-500/20" : "border-dark-700 bg-dark-800/50"}`}>
                {c.flag} {c.code}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-3 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-xl">{t.cancel}</button>
          <button onClick={onSubmit} disabled={isSubmitting || !nickname.trim()}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 disabled:from-dark-700 disabled:to-dark-700 text-black disabled:text-dark-500 font-extrabold rounded-xl">
            {isSubmitting ? "..." : t.submit}
          </button>
        </div>
      </div>
    </div>
  );
}
