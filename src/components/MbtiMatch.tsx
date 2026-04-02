"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

type Language = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";
type Step = "selectMine" | "selectPartner" | "result";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

type MbtiType = (typeof MBTI_TYPES)[number];

const TYPE_EMOJI: Record<MbtiType, string> = {
  INTJ: "🏛️", INTP: "🔬", ENTJ: "👑", ENTP: "💡",
  INFJ: "🌙", INFP: "🦋", ENFJ: "🌟", ENFP: "🎭",
  ISTJ: "📋", ISFJ: "🛡️", ESTJ: "⚖️", ESFJ: "🤝",
  ISTP: "🔧", ISFP: "🎨", ESTP: "🏄", ESFP: "🎉",
};

const GOLDEN_PAIRS: Record<string, string> = {
  INTJ: "ENTP", ENTP: "INTJ",
  INTP: "ENTJ", ENTJ: "INTP",
  INFJ: "ENFP", ENFP: "INFJ",
  INFP: "ENFJ", ENFJ: "INFP",
  ISTJ: "ESTP", ESTP: "ISTJ",
  ISFJ: "ESFP", ESFP: "ISFJ",
  ISTP: "ESTJ", ESTJ: "ISTP",
  ISFP: "ESFJ", ESFJ: "ISFP",
};

const SHADOW_PAIRS: Record<string, string> = {
  INTJ: "ESFP", ESFP: "INTJ",
  INTP: "ESFJ", ESFJ: "INTP",
  ENTJ: "ISFP", ISFP: "ENTJ",
  ENTP: "ISFJ", ISFJ: "ENTP",
  INFJ: "ESTP", ESTP: "INFJ",
  INFP: "ESTJ", ESTJ: "INFP",
  ENFJ: "ISTP", ISTP: "ENFJ",
  ENFP: "ISTJ", ISTJ: "ENFP",
};

const NEAR_IDEAL_PAIRS = new Set([
  "INTJ-ENFP", "ENFP-INTJ",
  "INTP-INFJ", "INFJ-INTP",
  "ENTJ-INFP", "INFP-ENTJ",
  "ENTP-INFJ", "INFJ-ENTP",
  "ISTJ-ISFJ", "ISFJ-ISTJ",
  "ESTP-ESFP", "ESFP-ESTP",
  "ISTP-ISFP", "ISFP-ISTP",
  "ESTJ-ESFJ", "ESFJ-ESTJ",
]);

function calculateScore(t1: string, t2: string): number {
  if (t1 === t2) return 75;
  let score = 50;
  score += t1[0] === t2[0] ? 4 : 8;
  score += t1[1] === t2[1] ? 14 : -2;
  score += t1[2] === t2[2] ? 3 : 11;
  score += t1[3] === t2[3] ? 7 : 4;
  if (GOLDEN_PAIRS[t1] === t2) score += 16;
  if (NEAR_IDEAL_PAIRS.has(`${t1}-${t2}`)) score += 9;
  if (SHADOW_PAIRS[t1] === t2) score -= 18;
  return Math.max(22, Math.min(98, score));
}

function getStrengthKeys(t1: string, t2: string): string[] {
  const keys: string[] = [];
  if (t1[0] !== t2[0]) keys.push("strengthEI");
  else if (t1[0] === "E") keys.push("strengthBothE");
  else keys.push("strengthBothI");

  if (t1[1] === t2[1]) keys.push(t1[1] === "N" ? "strengthBothN" : "strengthBothS");
  else keys.push("strengthSN");

  if (t1[2] !== t2[2]) keys.push("strengthTF");
  else if (t1[2] === "T") keys.push("strengthBothT");
  else keys.push("strengthBothF");

  return keys;
}

function getCautionKeys(t1: string, t2: string): string[] {
  const keys: string[] = [];
  if (t1[0] === t2[0]) keys.push(t1[0] === "E" ? "cautionBothE" : "cautionBothI");
  else keys.push("cautionEI");

  if (t1[1] !== t2[1]) keys.push("cautionSN");
  if (t1[2] === t2[2]) keys.push(t1[2] === "T" ? "cautionBothT" : "cautionBothF");
  if (t1[3] !== t2[3]) keys.push("cautionJP");
  return keys;
}

function getScoreLevel(score: number): string {
  if (score >= 90) return "scoreSoulmate";
  if (score >= 78) return "scoreGreat";
  if (score >= 65) return "scoreGood";
  if (score >= 50) return "scoreFair";
  return "scoreChallenging";
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-pink-400";
  if (score >= 78) return "text-purple-400";
  if (score >= 65) return "text-yellow-400";
  if (score >= 50) return "text-blue-400";
  return "text-orange-400";
}

function getBarColor(score: number): string {
  if (score >= 90) return "from-pink-500 to-rose-400";
  if (score >= 78) return "from-purple-500 to-violet-400";
  if (score >= 65) return "from-yellow-500 to-amber-400";
  if (score >= 50) return "from-blue-500 to-cyan-400";
  return "from-orange-500 to-red-400";
}

function getBestMatches(myType: string): { type: string; score: number }[] {
  const scores = MBTI_TYPES
    .filter((t) => t !== myType)
    .map((t) => ({ type: t, score: calculateScore(myType, t) }));
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 3);
}

// ─── i18n ────────────────────────────────────────────────────────────────────

interface Translations {
  title: string;
  subtitle: string;
  myMbti: string;
  partnerMbti: string;
  selectType: string;
  result: string;
  score: string;
  bestMatches: string;
  strengths: string;
  cautions: string;
  share: string;
  tryAnother: string;
  backToMain: string;
  copied: string;
  scoreSoulmate: string;
  scoreGreat: string;
  scoreGood: string;
  scoreFair: string;
  scoreChallenging: string;
  pairSoulmate: string;
  pairGreat: string;
  pairGood: string;
  pairFair: string;
  pairChallenging: string;
  strengthEI: string;
  strengthBothE: string;
  strengthBothI: string;
  strengthBothN: string;
  strengthBothS: string;
  strengthSN: string;
  strengthTF: string;
  strengthBothT: string;
  strengthBothF: string;
  cautionEI: string;
  cautionBothE: string;
  cautionBothI: string;
  cautionSN: string;
  cautionBothT: string;
  cautionBothF: string;
  cautionJP: string;
  step1of2: string;
  step2of2: string;
  compatibilityWith: string;
  back: string;
}

const translations: Record<Language, Translations> = {
  ko: {
    title: "MBTI 궁합",
    subtitle: "나의 운명의 상대는?",
    myMbti: "내 MBTI",
    partnerMbti: "상대 MBTI",
    selectType: "MBTI 유형을 선택하세요",
    result: "결과",
    score: "점수",
    bestMatches: "💕 찰떡궁합 TOP 3",
    strengths: "✨ 이런 점이 좋아요",
    cautions: "⚠️ 이건 조심!",
    share: "📤 결과 공유하기",
    tryAnother: "🔄 다른 궁합 보기",
    backToMain: "← 메인으로",
    copied: "✅ 복사됨!",
    scoreSoulmate: "소울메이트급! 💘",
    scoreGreat: "찰떡궁합! ✨",
    scoreGood: "좋은 케미! 💛",
    scoreFair: "흥미로운 조합! 🤝",
    scoreChallenging: "반전매력? 🔥",
    pairSoulmate: "천생연분! 서로를 영혼 깊이 이해하는 사이예요.",
    pairGreat: "설레는 조합! 서로의 장점을 극대화시켜요.",
    pairGood: "함께 성장할 가능성이 넘치는 좋은 궁합이에요.",
    pairFair: "다르지만 매력적 — 서로에게 배울 점이 많아요.",
    pairChallenging: "예측불가 조합! 불꽃이 튈 거예요 — 어떤 불꽃일지는...",
    strengthEI: "외향이 활력을, 내향이 깊이를 — 완벽한 밸런스!",
    strengthBothE: "외향 둘이 만나면? 신나는 모험의 연속!",
    strengthBothI: "깊고 의미 있는 대화가 끝없이 이어져요.",
    strengthBothN: "상상력과 가능성의 세계를 함께 탐험!",
    strengthBothS: "현실적이고 실용적 — 함께하면 무적!",
    strengthSN: "한 명은 꿈꾸고, 한 명은 실현하는 드림팀!",
    strengthTF: "머리와 가슴의 만남 — 균형 잡힌 결정!",
    strengthBothT: "논리적 듀오! 문제 해결 머신!",
    strengthBothF: "감성 폭발! 서로를 깊이 공감하는 사이.",
    cautionEI: "사교 에너지 차이 — 서로의 충전 시간을 존중하세요.",
    cautionBothE: "둘 다 말하고 싶을 때? 번갈아 들어보세요!",
    cautionBothI: "가끔은 밖에 나가서 함께 놀아보세요!",
    cautionSN: "디테일 vs 큰 그림 — 중간에서 만나봐요.",
    cautionBothT: "감정도 존재해요! 고마움을 표현하세요.",
    cautionBothF: "어려운 결정엔 논리도 필요해요 — 솔직한 대화를!",
    cautionJP: "계획파 vs 즉흥파 — 유연함이 핵심!",
    step1of2: "STEP 1/2",
    step2of2: "STEP 2/2",
    compatibilityWith: "궁합 결과",
    back: "← 뒤로",
  },
  en: {
    title: "MBTI Match",
    subtitle: "Find your perfect match!",
    myMbti: "My MBTI",
    partnerMbti: "Partner's MBTI",
    selectType: "Select your MBTI type",
    result: "Result",
    score: "Score",
    bestMatches: "💕 Best Matches",
    strengths: "✨ Strengths",
    cautions: "⚠️ Heads Up",
    share: "📤 Share Result",
    tryAnother: "🔄 Try Another Match",
    backToMain: "← Back to Main",
    copied: "✅ Copied!",
    scoreSoulmate: "Soulmate Level! 💘",
    scoreGreat: "Amazing Chemistry! ✨",
    scoreGood: "Great Potential! 💛",
    scoreFair: "Interesting Combo! 🤝",
    scoreChallenging: "Opposites Attract? 🔥",
    pairSoulmate: "A match made in heaven! These two understand each other on a soul level.",
    pairGreat: "An exciting pair! They bring out the best in each other.",
    pairGood: "A solid match with plenty of room to grow together.",
    pairFair: "Different yet intriguing — they can learn a lot from each other.",
    pairChallenging: "A wild combo! Sparks will fly — the question is what kind.",
    strengthEI: "Extrovert brings energy, introvert brings depth — perfect balance!",
    strengthBothE: "Two extroverts = double the fun and social adventures!",
    strengthBothI: "Deep, meaningful conversations that last for hours.",
    strengthBothN: "Both love big ideas and endless possibilities!",
    strengthBothS: "Grounded and practical — you get things done together!",
    strengthSN: "One dreams big, the other makes it real. Dream team!",
    strengthTF: "Head meets heart — balanced decisions every time.",
    strengthBothT: "Logical duo that solves problems like a machine!",
    strengthBothF: "Emotional intelligence overload — deeply empathetic pair.",
    cautionEI: "Social energy differences — respect each other's recharge time.",
    cautionBothE: "Who listens when both want to talk? Take turns!",
    cautionBothI: "Don't forget to actually go outside together sometimes!",
    cautionSN: "Details vs big picture — meet in the middle.",
    cautionBothT: "Don't forget feelings exist! Show appreciation.",
    cautionBothF: "Tough decisions need logic too — don't avoid hard talks.",
    cautionJP: "Planner vs spontaneous — flexibility is key!",
    step1of2: "STEP 1/2",
    step2of2: "STEP 2/2",
    compatibilityWith: "Compatibility Result",
    back: "← Back",
  },
  ja: {
    title: "MBTI相性",
    subtitle: "運命の相手を見つけよう！",
    myMbti: "自分のMBTI",
    partnerMbti: "相手のMBTI",
    selectType: "MBTIタイプを選択してください",
    result: "結果",
    score: "スコア",
    bestMatches: "💕 ベストマッチ TOP3",
    strengths: "✨ 長所",
    cautions: "⚠️ 注意点",
    share: "📤 結果をシェア",
    tryAnother: "🔄 別の相性を見る",
    backToMain: "← メインへ",
    copied: "✅ コピーしました！",
    scoreSoulmate: "ソウルメイト級！💘",
    scoreGreat: "最高の相性！✨",
    scoreGood: "良いケミストリー！💛",
    scoreFair: "面白い組み合わせ！🤝",
    scoreChallenging: "正反対の魅力？🔥",
    pairSoulmate: "運命の相手！魂レベルで理解し合える関係です。",
    pairGreat: "ワクワクするペア！お互いの良さを最大限に引き出します。",
    pairGood: "一緒に成長できる素敵な相性です。",
    pairFair: "違うけど魅力的 — お互いから学ぶことがたくさん。",
    pairChallenging: "予測不能な組み合わせ！火花が散ります。",
    strengthEI: "外向が活力を、内向が深みを — 完璧なバランス！",
    strengthBothE: "外向同士！楽しい冒険が続きます！",
    strengthBothI: "深くて意味のある会話が続きます。",
    strengthBothN: "想像力と可能性の世界を一緒に探検！",
    strengthBothS: "現実的で実用的 — 一緒なら無敵！",
    strengthSN: "一人は夢を見て、一人は実現する。ドリームチーム！",
    strengthTF: "頭と心の出会い — バランスの取れた判断！",
    strengthBothT: "論理的デュオ！問題解決マシン！",
    strengthBothF: "感性爆発！深く共感し合える関係。",
    cautionEI: "社交エネルギーの違い — 充電時間を尊重して。",
    cautionBothE: "二人とも話したい時は？順番に聞いてみて！",
    cautionBothI: "たまには外に出て一緒に遊びましょう！",
    cautionSN: "ディテール vs 全体像 — 中間で会いましょう。",
    cautionBothT: "感情も大切！感謝を伝えて。",
    cautionBothF: "難しい決断には論理も必要 — 率直な対話を！",
    cautionJP: "計画派 vs 即興派 — 柔軟さがカギ！",
    step1of2: "STEP 1/2",
    step2of2: "STEP 2/2",
    compatibilityWith: "相性結果",
    back: "← 戻る",
  },
  zh: {
    title: "MBTI配对",
    subtitle: "找到你的完美匹配！",
    myMbti: "我的MBTI",
    partnerMbti: "对方的MBTI",
    selectType: "选择你的MBTI类型",
    result: "结果",
    score: "分数",
    bestMatches: "💕 最佳配对 TOP3",
    strengths: "✨ 优势",
    cautions: "⚠️ 注意",
    share: "📤 分享结果",
    tryAnother: "🔄 换一对看看",
    backToMain: "← 返回主页",
    copied: "✅ 已复制！",
    scoreSoulmate: "灵魂伴侣级！💘",
    scoreGreat: "超级合拍！✨",
    scoreGood: "化学反应不错！💛",
    scoreFair: "有趣的组合！🤝",
    scoreChallenging: "对立的吸引力？🔥",
    pairSoulmate: "天造地设！灵魂深处的理解。",
    pairGreat: "令人兴奋的组合！彼此激发出最好的一面。",
    pairGood: "有很大成长空间的好配对。",
    pairFair: "不同但迷人 — 可以互相学习很多。",
    pairChallenging: "不可预测的组合！火花四溅。",
    strengthEI: "外向带来活力，内向带来深度 — 完美平衡！",
    strengthBothE: "两个外向 = 双倍快乐和冒险！",
    strengthBothI: "深刻而有意义的对话，聊不完。",
    strengthBothN: "一起探索想象力和可能性的世界！",
    strengthBothS: "脚踏实地，务实高效 — 在一起无敌！",
    strengthSN: "一个做梦，一个实现。梦之队！",
    strengthTF: "理性与感性的碰撞 — 平衡的决策！",
    strengthBothT: "逻辑双人组！解决问题的机器！",
    strengthBothF: "感性爆棚！深度共情的组合。",
    cautionEI: "社交能量不同 — 尊重彼此的充电时间。",
    cautionBothE: "都想说话的时候怎么办？轮流来！",
    cautionBothI: "偶尔也要一起出去走走！",
    cautionSN: "细节 vs 大局 — 找到中间点。",
    cautionBothT: "别忘了感情也很重要！表达感谢。",
    cautionBothF: "困难的决定需要逻辑 — 不要回避坦诚的对话。",
    cautionJP: "计划派 vs 随性派 — 灵活是关键！",
    step1of2: "第1步/共2步",
    step2of2: "第2步/共2步",
    compatibilityWith: "配对结果",
    back: "← 返回",
  },
  de: {
    title: "MBTI Match",
    subtitle: "Finde dein perfektes Match!",
    myMbti: "Mein MBTI",
    partnerMbti: "Partner MBTI",
    selectType: "Wähle deinen MBTI-Typ",
    result: "Ergebnis",
    score: "Punktzahl",
    bestMatches: "💕 Beste Matches",
    strengths: "✨ Stärken",
    cautions: "⚠️ Achtung",
    share: "📤 Ergebnis teilen",
    tryAnother: "🔄 Anderes Match testen",
    backToMain: "← Zur Hauptseite",
    copied: "✅ Kopiert!",
    scoreSoulmate: "Seelenverwandte! 💘",
    scoreGreat: "Tolle Chemie! ✨",
    scoreGood: "Großes Potenzial! 💛",
    scoreFair: "Interessante Kombi! 🤝",
    scoreChallenging: "Gegensätze ziehen sich an? 🔥",
    pairSoulmate: "Ein himmlisches Match! Sie verstehen sich auf Seelenebene.",
    pairGreat: "Ein aufregendes Paar! Sie bringen das Beste im anderen hervor.",
    pairGood: "Ein solides Match mit viel Wachstumspotenzial.",
    pairFair: "Verschieden aber faszinierend — sie können viel voneinander lernen.",
    pairChallenging: "Eine wilde Kombi! Funken werden fliegen.",
    strengthEI: "Extrovertiert bringt Energie, introvertiert bringt Tiefe!",
    strengthBothE: "Zwei Extrovertierte = doppelter Spaß!",
    strengthBothI: "Tiefe, bedeutungsvolle Gespräche ohne Ende.",
    strengthBothN: "Beide lieben große Ideen und Möglichkeiten!",
    strengthBothS: "Praktisch und realistisch — zusammen unschlagbar!",
    strengthSN: "Einer träumt, der andere verwirklicht. Dreamteam!",
    strengthTF: "Kopf trifft Herz — ausgewogene Entscheidungen.",
    strengthBothT: "Logisches Duo! Problemlösungsmaschine!",
    strengthBothF: "Emotionale Intelligenz im Überfluss!",
    cautionEI: "Unterschiedliche soziale Energie — respektiert die Aufladezeit.",
    cautionBothE: "Wer hört zu, wenn beide reden wollen?",
    cautionBothI: "Vergesst nicht, manchmal zusammen rauszugehen!",
    cautionSN: "Details vs. Gesamtbild — findet die Mitte.",
    cautionBothT: "Gefühle zählen auch! Zeigt Wertschätzung.",
    cautionBothF: "Schwere Entscheidungen brauchen Logik.",
    cautionJP: "Planer vs. Spontan — Flexibilität ist der Schlüssel!",
    step1of2: "SCHRITT 1/2",
    step2of2: "SCHRITT 2/2",
    compatibilityWith: "Kompatibilitätsergebnis",
    back: "← Zurück",
  },
  fr: {
    title: "MBTI Match",
    subtitle: "Trouvez votre match parfait !",
    myMbti: "Mon MBTI",
    partnerMbti: "MBTI du partenaire",
    selectType: "Sélectionnez votre type MBTI",
    result: "Résultat",
    score: "Score",
    bestMatches: "💕 Meilleurs matchs",
    strengths: "✨ Points forts",
    cautions: "⚠️ Prudence",
    share: "📤 Partager le résultat",
    tryAnother: "🔄 Essayer un autre match",
    backToMain: "← Retour à l'accueil",
    copied: "✅ Copié !",
    scoreSoulmate: "Âmes sœurs ! 💘",
    scoreGreat: "Chimie incroyable ! ✨",
    scoreGood: "Super potentiel ! 💛",
    scoreFair: "Combo intéressant ! 🤝",
    scoreChallenging: "Les opposés s'attirent ? 🔥",
    pairSoulmate: "Un match fait au paradis ! Ils se comprennent au niveau de l'âme.",
    pairGreat: "Un duo excitant ! Ils tirent le meilleur l'un de l'autre.",
    pairGood: "Un bon match avec beaucoup de potentiel de croissance.",
    pairFair: "Différents mais intrigants — ils peuvent apprendre beaucoup.",
    pairChallenging: "Un combo sauvage ! Des étincelles vont voler.",
    strengthEI: "L'extraverti apporte l'énergie, l'introverti la profondeur !",
    strengthBothE: "Deux extravertis = double fun et aventures !",
    strengthBothI: "Des conversations profondes et significatives.",
    strengthBothN: "Les deux aiment les grandes idées et les possibilités !",
    strengthBothS: "Pratiques et réalistes — ensemble, vous êtes imbattables !",
    strengthSN: "L'un rêve, l'autre réalise. Dream team !",
    strengthTF: "Raison et cœur — des décisions équilibrées.",
    strengthBothT: "Duo logique qui résout tout !",
    strengthBothF: "Intelligence émotionnelle au max !",
    cautionEI: "Énergie sociale différente — respectez le temps de recharge.",
    cautionBothE: "Qui écoute quand les deux veulent parler ?",
    cautionBothI: "N'oubliez pas de sortir ensemble parfois !",
    cautionSN: "Détails vs vue d'ensemble — trouvez le milieu.",
    cautionBothT: "Les sentiments existent ! Montrez votre appréciation.",
    cautionBothF: "Les décisions difficiles demandent de la logique.",
    cautionJP: "Planificateur vs spontané — la flexibilité est clé !",
    step1of2: "ÉTAPE 1/2",
    step2of2: "ÉTAPE 2/2",
    compatibilityWith: "Résultat de compatibilité",
    back: "← Retour",
  },
  es: {
    title: "MBTI Match",
    subtitle: "¡Encuentra tu pareja perfecta!",
    myMbti: "Mi MBTI",
    partnerMbti: "MBTI de pareja",
    selectType: "Selecciona tu tipo MBTI",
    result: "Resultado",
    score: "Puntuación",
    bestMatches: "💕 Mejores parejas",
    strengths: "✨ Fortalezas",
    cautions: "⚠️ Precauciones",
    share: "📤 Compartir resultado",
    tryAnother: "🔄 Probar otra pareja",
    backToMain: "← Volver al inicio",
    copied: "✅ ¡Copiado!",
    scoreSoulmate: "¡Almas gemelas! 💘",
    scoreGreat: "¡Química increíble! ✨",
    scoreGood: "¡Gran potencial! 💛",
    scoreFair: "¡Combo interesante! 🤝",
    scoreChallenging: "¿Opuestos se atraen? 🔥",
    pairSoulmate: "¡Hechos el uno para el otro! Se entienden a nivel del alma.",
    pairGreat: "¡Una pareja emocionante! Sacan lo mejor del otro.",
    pairGood: "Una gran combinación con mucho potencial de crecimiento.",
    pairFair: "Diferentes pero intrigantes — pueden aprender mucho.",
    pairChallenging: "¡Combo salvaje! Habrá chispas — la pregunta es de qué tipo.",
    strengthEI: "¡El extrovertido trae energía, el introvertido profundidad — balance perfecto!",
    strengthBothE: "¡Dos extrovertidos = doble diversión y aventuras!",
    strengthBothI: "Conversaciones profundas y significativas sin fin.",
    strengthBothN: "¡Ambos aman las grandes ideas y posibilidades infinitas!",
    strengthBothS: "¡Prácticos y realistas — juntos son imparables!",
    strengthSN: "¡Uno sueña, el otro lo hace realidad. Equipo soñado!",
    strengthTF: "Razón y corazón — decisiones equilibradas siempre.",
    strengthBothT: "¡Dúo lógico que resuelve problemas como máquina!",
    strengthBothF: "¡Inteligencia emocional al máximo — pareja súper empática!",
    cautionEI: "Diferencia en energía social — respeten el tiempo de recarga.",
    cautionBothE: "¿Quién escucha cuando ambos quieren hablar? ¡Turnarse!",
    cautionBothI: "¡No olviden salir juntos de vez en cuando!",
    cautionSN: "Detalles vs panorama general — encuentren el medio.",
    cautionBothT: "¡Los sentimientos también importan! Muestren aprecio.",
    cautionBothF: "Las decisiones difíciles necesitan lógica — no eviten las charlas difíciles.",
    cautionJP: "Planificador vs espontáneo — ¡la flexibilidad es clave!",
    step1of2: "PASO 1/2",
    step2of2: "PASO 2/2",
    compatibilityWith: "Resultado de compatibilidad",
    back: "← Volver",
  },
  pt: {
    title: "MBTI Match",
    subtitle: "Encontre seu par perfeito!",
    myMbti: "Meu MBTI",
    partnerMbti: "MBTI do parceiro",
    selectType: "Selecione seu tipo MBTI",
    result: "Resultado",
    score: "Pontuação",
    bestMatches: "💕 Melhores pares",
    strengths: "✨ Pontos fortes",
    cautions: "⚠️ Atenção",
    share: "📤 Compartilhar resultado",
    tryAnother: "🔄 Tentar outro par",
    backToMain: "← Voltar ao início",
    copied: "✅ Copiado!",
    scoreSoulmate: "Almas gêmeas! 💘",
    scoreGreat: "Química incrível! ✨",
    scoreGood: "Grande potencial! 💛",
    scoreFair: "Combo interessante! 🤝",
    scoreChallenging: "Opostos se atraem? 🔥",
    pairSoulmate: "Feitos um para o outro! Se entendem no nível da alma.",
    pairGreat: "Um par emocionante! Trazem o melhor um do outro.",
    pairGood: "Uma boa combinação com muito potencial de crescimento.",
    pairFair: "Diferentes mas intrigantes — podem aprender muito um com o outro.",
    pairChallenging: "Um combo selvagem! Faíscas vão voar.",
    strengthEI: "Extrovertido traz energia, introvertido traz profundidade!",
    strengthBothE: "Dois extrovertidos = diversão em dobro!",
    strengthBothI: "Conversas profundas e significativas sem fim.",
    strengthBothN: "Ambos amam grandes ideias e possibilidades!",
    strengthBothS: "Práticos e realistas — juntos são imbatíveis!",
    strengthSN: "Um sonha, o outro realiza. Time dos sonhos!",
    strengthTF: "Razão e coração — decisões equilibradas sempre.",
    strengthBothT: "Duo lógico que resolve tudo!",
    strengthBothF: "Empatia profunda — par super conectado!",
    cautionEI: "Respeitem o tempo de recarga um do outro.",
    cautionBothE: "Quem ouve quando ambos querem falar? Revezem!",
    cautionBothI: "Não esqueçam de sair juntos de vez em quando!",
    cautionSN: "Detalhes vs visão geral — encontrem o meio termo.",
    cautionBothT: "Sentimentos também importam! Mostrem apreço.",
    cautionBothF: "Decisões difíceis precisam de lógica — não evitem conversas difíceis.",
    cautionJP: "Planejador vs espontâneo — flexibilidade é a chave!",
    step1of2: "PASSO 1/2",
    step2of2: "PASSO 2/2",
    compatibilityWith: "Resultado de compatibilidade",
    back: "← Voltar",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface MbtiMatchProps {
  locale?: Language;
}

export default function MbtiMatch({ locale = "ko" }: MbtiMatchProps) {
  const lang: Language = (["ko", "en", "ja", "zh", "es", "pt", "de", "fr"] as Language[]).includes(locale) ? locale : "ko";
  const t = translations[lang];

  const resultRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("selectMine");
  const [myType, setMyType] = useState<MbtiType | null>(null);
  const [partnerType, setPartnerType] = useState<MbtiType | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const score = myType && partnerType ? calculateScore(myType, partnerType) : 0;
  const strengthKeys = myType && partnerType ? getStrengthKeys(myType, partnerType) : [];
  const cautionKeys = myType && partnerType ? getCautionKeys(myType, partnerType) : [];
  const bestMatches = myType ? getBestMatches(myType) : [];

  const homePath = lang === "ko" ? "/" : `/${lang}`;

  useEffect(() => {
    if (step === "result" && score > 0) {
      setShowResult(false);
      setAnimatedScore(0);
      const timer = setTimeout(() => {
        setShowResult(true);
        setFadeIn(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step, score]);

  useEffect(() => {
    if (!showResult || score === 0) return;
    let current = 0;
    const duration = 1200;
    const steps = 40;
    const increment = score / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [showResult, score]);

  const handleSelectMine = useCallback((type: MbtiType) => {
    setMyType(type);
    setStep("selectPartner");
    setFadeIn(false);
  }, []);

  const handleSelectPartner = useCallback((type: MbtiType) => {
    setPartnerType(type);
    setStep("result");
    setFadeIn(false);
  }, []);

  const handleReset = useCallback(() => {
    setStep("selectMine");
    setMyType(null);
    setPartnerType(null);
    setAnimatedScore(0);
    setShowResult(false);
    setFadeIn(false);
  }, []);

  const handleBack = useCallback(() => {
    if (step === "selectPartner") {
      setStep("selectMine");
      setMyType(null);
    } else if (step === "result") {
      setStep("selectPartner");
      setPartnerType(null);
      setShowResult(false);
      setFadeIn(false);
    }
  }, [step]);

  const handleShare = useCallback(async () => {
    const text = myType && partnerType
      ? `🔮 ${myType} ${TYPE_EMOJI[myType]} × ${partnerType} ${TYPE_EMOJI[partnerType]} = ${score}%\n${t[getScoreLevel(score) as keyof Translations]}\n\n${locale === "ko" ? "https://www.slox.co.kr/mbti-match" : `https://www.slox.co.kr/${locale}/mbti-match`}`
      : "";
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch { /* noop */ }
    }
  }, [myType, partnerType, score, t, locale]);

  const handleImageShare = useCallback(async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#0a0a1a",
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "mbti-match-result.png", { type: "image/png" });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file] });
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mbti-match-result.png";
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch { /* noop */ }
  }, []);

  const getPairDesc = (s: number): string => {
    if (s >= 90) return t.pairSoulmate;
    if (s >= 78) return t.pairGreat;
    if (s >= 65) return t.pairGood;
    if (s >= 50) return t.pairFair;
    return t.pairChallenging;
  };

  const renderGrid = (onSelect: (type: MbtiType) => void, selectedType?: MbtiType | null) => (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {MBTI_TYPES.map((type) => {
        const isSelected = selectedType === type;
        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`
              relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl
              transition-all duration-200 active:scale-95
              ${isSelected
                ? "bg-gradient-to-br from-[#6C5CE7]/40 to-[#FD79A8]/40 border-2 border-[#FD79A8]/60 shadow-lg shadow-[#FD79A8]/20"
                : "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]"
              }
            `}
          >
            <span className="text-2xl sm:text-3xl mb-1">{TYPE_EMOJI[type]}</span>
            <span className={`text-xs sm:text-sm font-bold tracking-wide ${isSelected ? "text-white" : "text-dark-300"}`}>
              {type}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white">
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href={homePath} className="text-dark-400 hover:text-white transition-colors text-sm">
            {t.backToMain}
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6C5CE7]/20 to-[#FD79A8]/20 border border-[#6C5CE7]/30 mb-4">
            <span className="text-sm">💜 MBTI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FD79A8] bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-dark-400 text-sm sm:text-base">{t.subtitle}</p>
        </div>

        {/* Step Indicator */}
        {step !== "result" && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              step === "selectMine"
                ? "bg-[#6C5CE7]/30 text-[#A29BFE] border border-[#6C5CE7]/40"
                : "bg-white/[0.05] text-dark-400"
            }`}>
              <span className="w-5 h-5 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center text-[10px] font-bold">1</span>
              {t.myMbti}
            </div>
            <div className="w-6 h-px bg-white/10" />
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              step === "selectPartner"
                ? "bg-[#FD79A8]/30 text-[#FD79A8] border border-[#FD79A8]/40"
                : "bg-white/[0.05] text-dark-400"
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === "selectPartner" ? "bg-[#FD79A8] text-white" : "bg-white/10 text-dark-500"
              }`}>2</span>
              {t.partnerMbti}
            </div>
          </div>
        )}

        {/* Step 1: Select My MBTI */}
        {step === "selectMine" && (
          <div className="animate-fadeIn">
            <div className="glass-card p-5 sm:p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#6C5CE7] tracking-widest">{t.step1of2}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{t.myMbti}</h2>
              <p className="text-dark-400 text-sm mb-5">{t.selectType}</p>
              {renderGrid(handleSelectMine)}
            </div>
          </div>
        )}

        {/* Step 2: Select Partner MBTI */}
        {step === "selectPartner" && (
          <div className="animate-fadeIn">
            <div className="glass-card p-5 sm:p-6 rounded-2xl">
              <button onClick={handleBack} className="text-dark-400 hover:text-white text-sm mb-3 transition-colors">
                {t.back}
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#FD79A8] tracking-widest">{t.step2of2}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white">{t.partnerMbti}</h2>
                {myType && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#6C5CE7]/20 text-[#A29BFE] border border-[#6C5CE7]/30">
                    {TYPE_EMOJI[myType]} {myType}
                  </span>
                )}
              </div>
              <p className="text-dark-400 text-sm mb-5">{t.selectType}</p>
              {renderGrid(handleSelectPartner)}
            </div>
          </div>
        )}

        {/* Result */}
        {step === "result" && myType && partnerType && (
          <div className={`transition-all duration-700 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div ref={resultRef}>
            {/* Score Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl mb-4 text-center">
              <p className="text-dark-400 text-xs mb-4 tracking-wider uppercase">{t.compatibilityWith}</p>

              {/* Type Pair */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl mb-1">{TYPE_EMOJI[myType]}</span>
                  <span className="text-sm font-bold text-white">{myType}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl text-[#FD79A8] font-bold">×</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl mb-1">{TYPE_EMOJI[partnerType]}</span>
                  <span className="text-sm font-bold text-white">{partnerType}</span>
                </div>
              </div>

              {/* Score */}
              <div className="mb-3">
                <span className={`text-6xl sm:text-7xl font-black tabular-nums ${getScoreColor(score)}`}>
                  {animatedScore}
                </span>
                <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(score)}`}>%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-dark-800 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)} transition-all duration-1000 ease-out`}
                  style={{ width: `${showResult ? score : 0}%` }}
                />
              </div>

              {/* Level Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#6C5CE7]/20 to-[#FD79A8]/20 border border-white/[0.1]">
                <span className="text-base sm:text-lg font-bold">
                  {t[getScoreLevel(score) as keyof Translations]}
                </span>
              </div>

              {/* Pair Description */}
              <p className="text-dark-300 text-sm mt-4 leading-relaxed">{getPairDesc(score)}</p>
            </div>

            {/* Strengths */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl mb-4">
              <h3 className="text-base font-bold text-white mb-3">{t.strengths}</h3>
              <div className="space-y-2">
                {strengthKeys.map((key) => (
                  <div key={key} className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.15]">
                    <span className="text-emerald-400 mt-0.5 shrink-0">✦</span>
                    <span className="text-dark-200 text-sm leading-relaxed">{t[key as keyof Translations]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cautions */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl mb-4">
              <h3 className="text-base font-bold text-white mb-3">{t.cautions}</h3>
              <div className="space-y-2">
                {cautionKeys.map((key) => (
                  <div key={key} className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/[0.15]">
                    <span className="text-amber-400 mt-0.5 shrink-0">⚡</span>
                    <span className="text-dark-200 text-sm leading-relaxed">{t[key as keyof Translations]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Matches */}
            <div className="glass-card p-5 sm:p-6 rounded-2xl mb-4">
              <h3 className="text-base font-bold text-white mb-3">{t.bestMatches}</h3>
              <div className="space-y-2">
                {bestMatches.map((match, i) => (
                  <div key={match.type} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#FD79A8] w-5">#{i + 1}</span>
                      <span className="text-xl">{TYPE_EMOJI[match.type as MbtiType]}</span>
                      <span className="text-sm font-bold text-white">{match.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(match.score)}`}
                          style={{ width: `${match.score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold tabular-nums ${getScoreColor(match.score)}`}>
                        {match.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={handleShare}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#6C5CE7] to-[#FD79A8] hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {showCopied ? t.copied : t.share}
              </button>
              <button
                onClick={handleImageShare}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-white/[0.08] border border-white/[0.1] hover:bg-white/[0.15] active:scale-[0.98] transition-all"
              >
                📸 {locale === "ko" ? "이미지로 저장" : locale === "ja" ? "画像で保存" : locale === "zh" ? "保存为图片" : locale === "de" ? "Als Bild speichern" : locale === "fr" ? "Sauvegarder l'image" : locale === "es" ? "Guardar imagen" : locale === "pt" ? "Salvar imagem" : "Save as Image"}
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl font-bold text-dark-300 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] active:scale-[0.98] transition-all"
              >
                {t.tryAnother}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-10 pb-8">
          <p className="text-dark-500 text-xs">
            Powered by{" "}
            <Link href={homePath} className="text-dark-400 hover:text-white transition-colors">
              SLOX
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
