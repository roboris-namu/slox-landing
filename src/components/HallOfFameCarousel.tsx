"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 다국어 번역
const translations: Record<string, {
  hallOfFame: string;
  challenge: string;
  recordYourName: string;
  test: string;
  tryIt: string;
  top3: string;
  play: string;
  allGames: string;
  proveYourself: string;
  challengeFirst: string;
  recruiting: string;
  winnerLikely: string;
  loading: string;
  games: Record<string, { name: string; unit: string }>;
}> = {
  ko: {
    hallOfFame: "명예의 전당",
    challenge: "최고의 기록에 도전하세요!",
    recordYourName: "당신의 이름을 영원히 남기세요",
    test: "테스트",
    tryIt: "도전하기 →",
    top3: "TOP 3",
    play: "🎮 플레이",
    allGames: "전체 게임 도전하기",
    proveYourself: "10가지 게임에서 당신의 실력을 증명하세요!",
    challengeFirst: "1등에 도전하세요!",
    recruiting: "도전자 모집 중...",
    winnerLikely: "💎 당첨 유력!",
    loading: "랭킹 불러오는 중...",
    games: {
      reaction: { name: "반응속도", unit: "ms" },
      quiz: { name: "상식퀴즈", unit: "점" },
      iq: { name: "IQ테스트", unit: "IQ" },
      sudoku: { name: "스도쿠", unit: "초" },
      color: { name: "색상찾기", unit: "점" },
      card: { name: "카드매칭", unit: "점" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "타자속도", unit: "타/분" },
      memory: { name: "숫자기억", unit: "자리" },
      aim: { name: "에임", unit: "점" },
    },
  },
  en: {
    hallOfFame: "Hall of Fame",
    challenge: "Challenge the best records!",
    recordYourName: "Make your name immortal",
    test: "Test",
    tryIt: "Try it →",
    top3: "TOP 3",
    play: "🎮 Play",
    allGames: "Try All Games",
    proveYourself: "Prove yourself in 10 different games!",
    challengeFirst: "Be the first!",
    recruiting: "Waiting for challengers...",
    winnerLikely: "💎 Likely Winner!",
    loading: "Loading rankings...",
    games: {
      reaction: { name: "Reaction", unit: "ms" },
      quiz: { name: "Trivia", unit: "pts" },
      iq: { name: "IQ Test", unit: "IQ" },
      sudoku: { name: "Sudoku", unit: "sec" },
      color: { name: "Color Find", unit: "pts" },
      card: { name: "Card Match", unit: "pts" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "Typing", unit: "WPM" },
      memory: { name: "Memory", unit: "digits" },
      aim: { name: "Aim", unit: "pts" },
    },
  },
  ja: {
    hallOfFame: "殿堂入り",
    challenge: "最高記録に挑戦しよう！",
    recordYourName: "あなたの名前を永遠に刻もう",
    test: "テスト",
    tryIt: "挑戦 →",
    top3: "TOP 3",
    play: "🎮 プレイ",
    allGames: "全ゲームに挑戦",
    proveYourself: "10種類のゲームで実力を証明！",
    challengeFirst: "1位に挑戦！",
    recruiting: "挑戦者募集中...",
    winnerLikely: "💎 当選有力！",
    loading: "ランキング読み込み中...",
    games: {
      reaction: { name: "反応速度", unit: "ms" },
      quiz: { name: "クイズ", unit: "点" },
      iq: { name: "IQテスト", unit: "IQ" },
      sudoku: { name: "数独", unit: "秒" },
      color: { name: "色探し", unit: "点" },
      card: { name: "カード", unit: "点" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "タイピング", unit: "WPM" },
      memory: { name: "記憶力", unit: "桁" },
      aim: { name: "エイム", unit: "点" },
    },
  },
  zh: {
    hallOfFame: "名人堂",
    challenge: "挑战最高纪录！",
    recordYourName: "让你的名字永垂不朽",
    test: "测试",
    tryIt: "挑战 →",
    top3: "TOP 3",
    play: "🎮 开始",
    allGames: "挑战所有游戏",
    proveYourself: "在10个游戏中证明你的实力！",
    challengeFirst: "争当第一！",
    recruiting: "等待挑战者...",
    winnerLikely: "💎 有望获奖！",
    loading: "加载排名中...",
    games: {
      reaction: { name: "反应速度", unit: "ms" },
      quiz: { name: "问答", unit: "分" },
      iq: { name: "IQ测试", unit: "IQ" },
      sudoku: { name: "数独", unit: "秒" },
      color: { name: "找颜色", unit: "分" },
      card: { name: "卡片配对", unit: "分" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "打字", unit: "WPM" },
      memory: { name: "记忆力", unit: "位" },
      aim: { name: "瞄准", unit: "分" },
    },
  },
  de: {
    hallOfFame: "Ruhmeshalle",
    challenge: "Fordere die besten Rekorde heraus!",
    recordYourName: "Verewige deinen Namen",
    test: "Test",
    tryIt: "Probieren →",
    top3: "TOP 3",
    play: "🎮 Spielen",
    allGames: "Alle Spiele",
    proveYourself: "Beweise dich in 10 Spielen!",
    challengeFirst: "Sei der Erste!",
    recruiting: "Herausforderer gesucht...",
    winnerLikely: "💎 Favorit!",
    loading: "Lade Rangliste...",
    games: {
      reaction: { name: "Reaktion", unit: "ms" },
      quiz: { name: "Quiz", unit: "Pkt" },
      iq: { name: "IQ-Test", unit: "IQ" },
      sudoku: { name: "Sudoku", unit: "Sek" },
      color: { name: "Farbsuche", unit: "Pkt" },
      card: { name: "Karten", unit: "Pkt" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "Tippen", unit: "WPM" },
      memory: { name: "Gedächtnis", unit: "Ziff" },
      aim: { name: "Zielen", unit: "Pkt" },
    },
  },
  fr: {
    hallOfFame: "Temple de la Gloire",
    challenge: "Défiez les meilleurs records!",
    recordYourName: "Gravez votre nom pour l'éternité",
    test: "Test",
    tryIt: "Essayer →",
    top3: "TOP 3",
    play: "🎮 Jouer",
    allGames: "Tous les Jeux",
    proveYourself: "Prouvez-vous dans 10 jeux!",
    challengeFirst: "Soyez le premier!",
    recruiting: "En attente de challengers...",
    winnerLikely: "💎 Favori!",
    loading: "Chargement...",
    games: {
      reaction: { name: "Réaction", unit: "ms" },
      quiz: { name: "Quiz", unit: "pts" },
      iq: { name: "Test QI", unit: "QI" },
      sudoku: { name: "Sudoku", unit: "sec" },
      color: { name: "Couleur", unit: "pts" },
      card: { name: "Cartes", unit: "pts" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "Frappe", unit: "MPM" },
      memory: { name: "Mémoire", unit: "chif" },
      aim: { name: "Visée", unit: "pts" },
    },
  },
  es: {
    hallOfFame: "Salón de la Fama",
    challenge: "¡Desafía los mejores récords!",
    recordYourName: "Haz tu nombre inmortal",
    test: "Test",
    tryIt: "Intentar →",
    top3: "TOP 3",
    play: "🎮 Jugar",
    allGames: "Todos los Juegos",
    proveYourself: "¡Demuestra tu habilidad en 10 juegos!",
    challengeFirst: "¡Sé el primero!",
    recruiting: "Esperando retadores...",
    winnerLikely: "💎 ¡Favorito!",
    loading: "Cargando...",
    games: {
      reaction: { name: "Reacción", unit: "ms" },
      quiz: { name: "Trivia", unit: "pts" },
      iq: { name: "Test IQ", unit: "IQ" },
      sudoku: { name: "Sudoku", unit: "seg" },
      color: { name: "Color", unit: "pts" },
      card: { name: "Cartas", unit: "pts" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "Mecanografía", unit: "PPM" },
      memory: { name: "Memoria", unit: "díg" },
      aim: { name: "Puntería", unit: "pts" },
    },
  },
  pt: {
    hallOfFame: "Hall da Fama",
    challenge: "Desafie os melhores recordes!",
    recordYourName: "Torne seu nome imortal",
    test: "Teste",
    tryIt: "Tentar →",
    top3: "TOP 3",
    play: "🎮 Jogar",
    allGames: "Todos os Jogos",
    proveYourself: "Prove-se em 10 jogos!",
    challengeFirst: "Seja o primeiro!",
    recruiting: "Aguardando desafiantes...",
    winnerLikely: "💎 Favorito!",
    loading: "Carregando...",
    games: {
      reaction: { name: "Reação", unit: "ms" },
      quiz: { name: "Quiz", unit: "pts" },
      iq: { name: "Teste QI", unit: "QI" },
      sudoku: { name: "Sudoku", unit: "seg" },
      color: { name: "Cor", unit: "pts" },
      card: { name: "Cartas", unit: "pts" },
      cps: { name: "CPS", unit: "CPS" },
      typing: { name: "Digitação", unit: "PPM" },
      memory: { name: "Memória", unit: "díg" },
      aim: { name: "Mira", unit: "pts" },
    },
  },
};

interface LeaderboardEntry {
  nickname: string;
  score: number;
  grade: string;
  percentile: number;
  device_type: string;
  country?: string;
}

// 국가 코드 → 국기 이모지 변환
const getCountryFlag = (countryCode: string | null | undefined): string => {
  if (!countryCode) return "";
  const flags: Record<string, string> = {
    KR: "🇰🇷", US: "🇺🇸", JP: "🇯🇵", CN: "🇨🇳", DE: "🇩🇪", FR: "🇫🇷", ES: "🇪🇸", BR: "🇧🇷",
    GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", IN: "🇮🇳", RU: "🇷🇺", IT: "🇮🇹", MX: "🇲🇽", TH: "🇹🇭",
    VN: "🇻🇳", PH: "🇵🇭", SG: "🇸🇬", NZ: "🇳🇿",
  };
  return flags[countryCode] || "🌍";
};

interface GameLeaderboard {
  game: string;
  gameName: string;
  emoji: string;
  href: string;
  unit: string;
  entries: LeaderboardEntry[];
  color: string;
  bgColor: string;
}

const gradeColors: Record<string, string> = {
  "챌린저": "text-cyan-300",
  "마스터": "text-purple-400",
  "다이아몬드": "text-blue-400",
  "플래티넘": "text-teal-400",
  "골드": "text-yellow-400",
  "실버": "text-gray-300",
  "브론즈": "text-orange-400",
  "아이언": "text-stone-400",
  "Challenger": "text-cyan-300",
  "Master": "text-purple-400",
  "Diamond": "text-blue-400",
  "Platinum": "text-teal-400",
  "Gold": "text-yellow-400",
  "Silver": "text-gray-300",
  "Bronze": "text-orange-400",
  "Iron": "text-stone-400",
  // 퀴즈/IQ/스도쿠 등급
  "천재": "text-purple-400",
  "박학다식": "text-blue-400",
  "상식왕": "text-yellow-400",
  "평범": "text-green-400",
  "노력필요": "text-orange-400",
  "공부하자": "text-red-400",
  "수재": "text-purple-400",
  "우수": "text-blue-400",
  "평균": "text-green-400",
  // 스도쿠 등급 (마스터는 위에서 이미 정의됨)
  "전설": "text-yellow-400",
  "전문가": "text-blue-400",
  "숙련자": "text-green-400",
  "중급자": "text-cyan-400",
  "초보자": "text-orange-400",
};

// 등급 번역 (한국어 → 다국어)
const gradeTranslations: Record<string, Record<string, string>> = {
  ko: {},
  en: {
    "챌린저": "Challenger", "마스터": "Master", "다이아몬드": "Diamond", "플래티넘": "Platinum",
    "골드": "Gold", "실버": "Silver", "브론즈": "Bronze", "아이언": "Iron",
    "천재": "Genius", "박학다식": "Scholar", "상식왕": "Expert", "평범": "Average",
    "노력필요": "Needs Work", "공부하자": "Beginner", "수재": "Gifted", "우수": "Excellent",
    "평균": "Average", 
    // 스도쿠 등급 (마스터는 위에서 이미 정의됨)
    "전설": "Legend", "전문가": "Expert", "숙련자": "Skilled",
    "중급자": "Intermediate", "초보자": "Beginner",
  },
  ja: {
    "챌린저": "チャレンジャー", "마스터": "マスター", "다이아몬드": "ダイヤモンド", "플래티넘": "プラチナ",
    "골드": "ゴールド", "실버": "シルバー", "브론즈": "ブロンズ", "아이언": "アイアン",
    "천재": "天才", "박학다식": "博識", "상식왕": "達人", "평범": "普通",
    "노력필요": "努力必要", "공부하자": "初心者", "수재": "秀才", "우수": "優秀",
    "평균": "平均", "전설": "伝説", "전문가": "エキスパート", "숙련자": "熟練者",
    "중급자": "中級者", "초보자": "初心者",
  },
  zh: {
    "챌린저": "挑战者", "마스터": "大师", "다이아몬드": "钻石", "플래티넘": "铂金",
    "골드": "黄金", "실버": "白银", "브론즈": "青铜", "아이언": "黑铁",
    "천재": "天才", "박학다식": "博学", "상식왕": "专家", "평범": "普通",
    "노력필요": "需努力", "공부하자": "初学者", "수재": "英才", "우수": "优秀",
    "평균": "平均", "전설": "传说", "전문가": "专家", "숙련자": "熟练者",
    "중급자": "中级者", "초보자": "初学者",
  },
  de: {
    "챌린저": "Challenger", "마스터": "Meister", "다이아몬드": "Diamant", "플래티넘": "Platin",
    "골드": "Gold", "실버": "Silber", "브론즈": "Bronze", "아이언": "Eisen",
    "천재": "Genie", "박학다식": "Gelehrter", "상식왕": "Experte", "평범": "Normal",
    "노력필요": "Übung nötig", "공부하자": "Anfänger", "수재": "Begabt", "우수": "Exzellent",
    "평균": "Durchschnitt", "전설": "Legende", "전문가": "Experte", "숙련자": "Geübt",
    "중급자": "Mittelstufe", "초보자": "Anfänger",
  },
  fr: {
    "챌린저": "Challenger", "마스터": "Maître", "다이아몬드": "Diamant", "플래티넘": "Platine",
    "골드": "Or", "실버": "Argent", "브론즈": "Bronze", "아이언": "Fer",
    "천재": "Génie", "박학다식": "Érudit", "상식왕": "Expert", "평범": "Moyen",
    "노력필요": "À améliorer", "공부하자": "Débutant", "수재": "Doué", "우수": "Excellent",
    "평균": "Moyen", "전설": "Légende", "전문가": "Expert", "숙련자": "Expérimenté",
    "중급자": "Intermédiaire", "초보자": "Débutant",
  },
  es: {
    "챌린저": "Challenger", "마스터": "Maestro", "다이아몬드": "Diamante", "플래티넘": "Platino",
    "골드": "Oro", "실버": "Plata", "브론즈": "Bronce", "아이언": "Hierro",
    "천재": "Genio", "박학다식": "Erudito", "상식왕": "Experto", "평범": "Normal",
    "노력필요": "Mejorar", "공부하자": "Principiante", "수재": "Dotado", "우수": "Excelente",
    "평균": "Promedio", "전설": "Leyenda", "전문가": "Experto", "숙련자": "Hábil",
    "중급자": "Intermedio", "초보자": "Principiante",
  },
  pt: {
    "챌린저": "Challenger", "마스터": "Mestre", "다이아몬드": "Diamante", "플래티넘": "Platina",
    "골드": "Ouro", "실버": "Prata", "브론즈": "Bronze", "아이언": "Ferro",
    "천재": "Gênio", "박학다식": "Estudioso", "상식왕": "Especialista", "평범": "Normal",
    "노력필요": "Melhorar", "공부하자": "Iniciante", "수재": "Talentoso", "우수": "Excelente",
    "평균": "Média", "전설": "Lenda", "전문가": "Especialista", "숙련자": "Habilidoso",
    "중급자": "Intermediário", "초보자": "Iniciante",
  },
};

// 스도쿠 등급 계산 함수 (시간 기준)
const getSudokuGrade = (timeSeconds: number): string => {
  if (timeSeconds <= 120) return "전설";   // ~2분
  if (timeSeconds <= 240) return "마스터"; // ~4분
  if (timeSeconds <= 360) return "전문가"; // ~6분
  if (timeSeconds <= 480) return "숙련자"; // ~8분
  if (timeSeconds <= 720) return "중급자"; // ~12분
  return "초보자";
};

const gameConfigs = [
  { table: "reaction_leaderboard", game: "reaction", gameName: "반응속도", emoji: "⚡", href: "/reaction", unit: "ms", color: "from-yellow-500 to-orange-500", bgColor: "from-yellow-500/20 to-orange-500/20", scoreField: "score", orderAsc: true },
  { table: "quiz_leaderboard", game: "quiz", gameName: "상식퀴즈", emoji: "📚", href: "/quiz", unit: "점", color: "from-indigo-500 to-purple-500", bgColor: "from-indigo-500/20 to-purple-500/20", scoreField: "score", orderAsc: false, isNew: true },
  { table: "iq_leaderboard", game: "iq", gameName: "IQ테스트", emoji: "🧩", href: "/iq", unit: "IQ", color: "from-pink-500 to-rose-500", bgColor: "from-pink-500/20 to-rose-500/20", scoreField: "iq_score", orderAsc: false, isNew: true },
  { table: "sudoku_leaderboard", game: "sudoku", gameName: "스도쿠", emoji: "🔢", href: "/sudoku", unit: "초", color: "from-cyan-500 to-blue-500", bgColor: "from-cyan-500/20 to-blue-500/20", scoreField: "time_seconds", orderAsc: true, isNew: true },
  { table: "color_leaderboard", game: "color", gameName: "색상찾기", emoji: "👁️", href: "/color", unit: "점", color: "from-emerald-500 to-teal-500", bgColor: "from-emerald-500/20 to-teal-500/20", scoreField: "score", orderAsc: false },
  { table: "cardmatch_leaderboard", game: "card", gameName: "카드매칭", emoji: "🃏", href: "/card-match", unit: "점", color: "from-amber-500 to-orange-500", bgColor: "from-amber-500/20 to-orange-500/20", scoreField: "score", orderAsc: false },
  { table: "cps_leaderboard", game: "cps", gameName: "CPS", emoji: "🖱️", href: "/cps", unit: "CPS", color: "from-purple-500 to-pink-500", bgColor: "from-purple-500/20 to-pink-500/20", scoreField: "score", orderAsc: false },
  { table: "typing_leaderboard", game: "typing", gameName: "타자속도", emoji: "⌨️", href: "/typing", unit: "타/분", color: "from-blue-500 to-indigo-500", bgColor: "from-blue-500/20 to-indigo-500/20", scoreField: "wpm", orderAsc: false },
  { table: "memory_leaderboard", game: "memory", gameName: "숫자기억", emoji: "🧠", href: "/memory", unit: "자리", color: "from-green-500 to-emerald-500", bgColor: "from-green-500/20 to-emerald-500/20", scoreField: "score", orderAsc: false },
  { table: "aim_leaderboard", game: "aim", gameName: "에임", emoji: "🎯", href: "/aim", unit: "점", color: "from-red-500 to-orange-500", bgColor: "from-red-500/20 to-orange-500/20", scoreField: "score", orderAsc: false },
];

export default function HallOfFameCarousel({ locale = "ko" }: { locale?: string }) {
  const [leaderboards, setLeaderboards] = useState<GameLeaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[locale] || translations.ko;
  
  // 스와이프 관련 상태
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  const fetchAllLeaderboards = useCallback(async () => {

    try {
      const results = await Promise.all(
        gameConfigs.map(async (config) => {
          // 각 테이블에 존재하는 컬럼만 선택
          const { data, error } = await supabase
            .from(config.table)
            .select("*")
            .order(config.scoreField, { ascending: config.orderAsc })
            .limit(3);

          if (error) {
            console.error(`${config.game} 로드 실패:`, error);
          }

          return {
            game: config.game,
            gameName: config.gameName,
            emoji: config.emoji,
            href: config.href,
            unit: config.unit,
            color: config.color,
            bgColor: config.bgColor,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entries: (data || []).map((entry: any) => {
              const score = parseFloat(entry[config.scoreField]) || 0;
              // 스도쿠는 시간 기준으로 등급 재계산
              const grade = config.game === "sudoku" 
                ? getSudokuGrade(score) 
                : (entry.grade as string || "");
              return {
                nickname: entry.nickname as string,
                score,
                grade,
                percentile: entry.percentile as number || 0,
                device_type: entry.device_type as string || "",
                country: entry.country as string || "",
              };
            }),
          };
        })
      );

      setLeaderboards(results);
    } catch (err) {
      console.error("리더보드 로드 실패:", err);
      // 에러 시에도 기본 게임 목록 표시
      setLeaderboards(gameConfigs.map(config => ({
        game: config.game,
        gameName: config.gameName,
        emoji: config.emoji,
        href: config.href,
        unit: config.unit,
        color: config.color,
        bgColor: config.bgColor,
        entries: [],
      })));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllLeaderboards();
  }, [fetchAllLeaderboards]);

  // 자동 스크롤 애니메이션 (JavaScript 기반)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 0.5; // 픽셀/프레임

    const animate = () => {
      if (!isPaused && !isDragging && scrollContainer) {
        scrollPositionRef.current += speed;
        
        // 무한 스크롤: 절반 지점에서 처음으로 리셋
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  // 터치/마우스 이벤트 핸들러
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setIsPaused(true);
    startXRef.current = clientX;
    scrollLeftRef.current = scrollPositionRef.current;
    
    // 기존 재개 타이머 취소
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    
    const diff = startXRef.current - clientX;
    scrollPositionRef.current = scrollLeftRef.current + diff;
    
    // 범위 제한
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPositionRef.current < 0) {
        scrollPositionRef.current = halfWidth + scrollPositionRef.current;
      } else if (scrollPositionRef.current >= halfWidth) {
        scrollPositionRef.current = scrollPositionRef.current - halfWidth;
      }
      scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
    }
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    // 1초 후 자동 스크롤 재개
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  }, []);

  // 마우스 이벤트
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  // 터치 이벤트
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // 무한 스크롤을 위해 데이터 복제 (최소 14개 = 7 * 2)
  const displayLeaderboards = leaderboards.length > 0 ? leaderboards : gameConfigs.map(config => ({
    game: config.game,
    gameName: config.gameName,
    emoji: config.emoji,
    href: config.href,
    unit: config.unit,
    color: config.color,
    bgColor: config.bgColor,
    entries: [],
  }));
  const duplicatedLeaderboards = [...displayLeaderboards, ...displayLeaderboards];

  return (
    <section className="py-20 overflow-hidden relative">
      {/* 배경 효과 - 더 화려하게 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none" />
      
      {/* 상단 장식 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          {/* 트로피 아이콘 애니메이션 */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 animate-pulse">
            <span className="text-5xl">🏆</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
              {t.hallOfFame}
            </span>
          </h2>
          
          <p className="text-lg text-dark-300 mb-2">
            🔥 {t.challenge}
          </p>
          <p className="text-sm text-dark-500">
            {t.recordYourName} ✨
          </p>
        </div>
      </div>

      {/* 필름 스트립 스타일 캐러셀 - 터치 스와이프 지원 */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden py-8 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 좌우 페이드 효과 */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

        {/* 스크롤 컨테이너 - JavaScript 기반 자동 스크롤 + 스와이프 */}
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 md:gap-8 pl-[30vw] sm:pl-[25vw] md:pl-[20vw] lg:pl-[20vw] will-change-transform"
          style={{ width: "max-content" }}
        >
          {duplicatedLeaderboards.map((lb, idx) => {
            const isEventGame = lb.game === "reaction"; // 🎁 현재 이벤트 중인 게임
            const isSecondLoopStart = idx === displayLeaderboards.length; // 🔄 두 번째 루프 시작점
            
            return (
            <div key={`${lb.game}-${idx}`} className={`flex-shrink-0 flex items-center ${isSecondLoopStart ? "ml-16 sm:ml-24 md:ml-32" : ""}`}>
              <Link
                href={locale === "ko" ? lb.href : `/${locale}${lb.href}`}
                className="flex-shrink-0 w-72 sm:w-76 md:w-80 group"
              >
              <div className={`relative bg-gradient-to-br ${lb.bgColor} backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:z-30 overflow-hidden ${
                isEventGame 
                  ? "border-2 border-yellow-400/70 shadow-lg shadow-yellow-500/30 hover:border-yellow-300 hover:shadow-yellow-500/50" 
                  : "border border-white/10 hover:border-white/30 hover:shadow-purple-500/20"
              }`}>
                {/* 🎁 이벤트 리본 */}
                {isEventGame && (
                  <>
                    <div className="absolute -top-1 -right-1 z-20">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-lg animate-pulse">
                          🎁 EVENT
                        </div>
                        {/* 반짝이 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    {/* 이벤트 카드 글로우 테두리 */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/50 animate-pulse pointer-events-none" />
                  </>
                )}
                
                {/* 카드 내부 글로우 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${lb.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                
                {/* 게임 헤더 */}
                <div className="relative flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lb.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{lb.emoji}</span>
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg block">{t.games[lb.game]?.name || lb.gameName}</span>
                      <span className="text-dark-400 text-xs">{t.test}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${isEventGame ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-500/50" : "bg-white/10"}`}>
                    <span className={`text-xs font-medium transition-colors ${isEventGame ? "text-yellow-300" : "text-white/80 group-hover:text-cyan-400"}`}>
                      {t.tryIt}
                    </span>
                  </div>
                </div>

                {/* 랭킹 리스트 */}
                <div className="relative space-y-3">
                  {lb.entries.length > 0 ? (
                    lb.entries.map((entry, rank) => (
                      <div
                        key={rank}
                        className={`relative flex items-center gap-3 p-3 rounded-2xl transition-all ${
                          rank === 0 && isEventGame 
                            ? "bg-gradient-to-r from-yellow-500/40 to-orange-500/30 border-2 border-yellow-400 shadow-lg shadow-yellow-500/20" 
                            : rank === 0 
                              ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/20 border border-yellow-500/30" 
                              : rank === 1 
                                ? "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border border-gray-400/20" 
                                : "bg-gradient-to-r from-orange-600/20 to-orange-700/10 border border-orange-600/20"
                        }`}
                      >
                        {/* 💎 1등 당첨 유력 배지 (이벤트 게임만) - 시안 색상 */}
                        {rank === 0 && isEventGame && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-cyan-500/30 animate-pulse whitespace-nowrap">
                              {t.winnerLikely}
                            </div>
                          </div>
                        )}
                        {/* 순위 메달 */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-lg ${
                          rank === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black" :
                          rank === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-black" :
                          "bg-gradient-to-br from-orange-500 to-orange-700 text-white"
                        }`}>
                          {rank === 0 ? "👑" : rank + 1}
                        </div>

                        {/* 국기 */}
                        {entry.country && (
                          <span className="text-base bg-dark-700 px-1.5 py-0.5 rounded flex-shrink-0">{getCountryFlag(entry.country)}</span>
                        )}

                        {/* 닉네임 & 등급 */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold truncate">
                            {entry.nickname}
                          </p>
                          <p className={`text-xs font-medium ${gradeColors[entry.grade] || "text-dark-400"}`}>
                            {gradeTranslations[locale]?.[entry.grade] || entry.grade || "-"}
                          </p>
                        </div>

                        {/* 점수 */}
                        <div className="text-right">
                          <p className={`font-black text-lg bg-gradient-to-r ${lb.color} text-transparent bg-clip-text`}>
                            {typeof entry.score === 'number' && entry.score % 1 !== 0 
                              ? entry.score.toFixed(1) 
                              : entry.score}
                          </p>
                          <p className="text-dark-500 text-xs">{t.games[lb.game]?.unit || lb.unit}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // 빈 슬롯 - 실제 랭킹과 동일한 크기
                    Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={`empty-${i}`} 
                        className={`flex items-center gap-3 p-3 rounded-2xl border border-dashed transition-colors ${
                          i === 0 ? "bg-yellow-500/10 border-yellow-500/30" :
                          i === 1 ? "bg-gray-400/10 border-gray-400/20" :
                          "bg-orange-500/10 border-orange-500/20"
                        }`}
                      >
                        {/* 순위 메달 */}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-lg opacity-50 ${
                          i === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                          i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400" :
                          "bg-gradient-to-br from-orange-500 to-orange-700"
                        }`}>
                          {i === 0 ? "👑" : i === 1 ? "🥈" : "🥉"}
                        </div>
                        {/* 텍스트 */}
                        <div className="flex-1">
                          <p className="text-dark-400 text-sm font-medium truncate">
                            {i === 0 ? t.challengeFirst : t.recruiting}
                          </p>
                          <p className="text-dark-500 text-xs">-</p>
                        </div>
                        {/* 빈 점수 */}
                        <div className="text-right">
                          <p className="font-bold text-dark-500">-</p>
                          <p className="text-dark-600 text-xs">{t.games[lb.game]?.unit || lb.unit}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* 하단 CTA */}
                <div className="relative mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-sm">🏅</span>
                      <span className="text-dark-400 text-xs">TOP 3</span>
                    </div>
                    <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${lb.color} opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105`}>
                      <span className="text-white text-sm font-bold">
                        {t.play}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          );
          })}
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center">
          <Link 
            href="/tools"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            <span className="text-xl">🎮</span>
            <span className="text-lg">{t.allGames}</span>
            <span className="text-xl">→</span>
          </Link>
          <p className="mt-4 text-dark-500 text-sm">
            {t.proveYourself}
          </p>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-950/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-dark-300">{t.loading}</p>
          </div>
        </div>
      )}
    </section>
  );
}
