"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import AdBanner from "../AdBanner";
import html2canvas from "html2canvas";
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

interface TypingLeaderboardEntry {
  id: string;
  nickname: string;
  wpm: number;
  accuracy: number;
  country?: string;
  device_type: string;
  created_at: string;
  grade?: string;
  percentile?: number;
  user_id?: string;
  avatar_url?: string;
  overall_rank?: number;
}

// 언어 선택기 옵션
const languageOptions = [
  { locale: "ko" as const, flag: "🇰🇷", name: "한국어", path: "/typing" },
  { locale: "en" as const, flag: "🇺🇸", name: "English", path: "/en/typing" },
  { locale: "ja" as const, flag: "🇯🇵", name: "日本語", path: "/ja/typing" },
  { locale: "zh" as const, flag: "🇨🇳", name: "中文", path: "/zh/typing" },
  { locale: "de" as const, flag: "🇩🇪", name: "Deutsch", path: "/de/typing" },
  { locale: "fr" as const, flag: "🇫🇷", name: "Français", path: "/fr/typing" },
  { locale: "es" as const, flag: "🇪🇸", name: "Español", path: "/es/typing" },
  { locale: "pt" as const, flag: "🇧🇷", name: "Português", path: "/pt/typing" },
];

interface TypingResult {
  wpm: number;
  cpm: number;
  accuracy: number;
  time: number;
  totalChars: number;
  correctChars: number;
}

// 다국어 문장들
const SENTENCES: Record<Locale, string[]> = {
  ko: [
    "빠른 갈색 여우가 게으른 개를 뛰어넘습니다.",
    "오늘 하루도 열심히 일하고 행복한 저녁 보내세요.",
    "프로그래밍은 창의력과 논리력을 동시에 요구합니다.",
    "커피 한 잔의 여유가 하루를 바꿀 수 있습니다.",
    "성공은 작은 노력들이 모여 만들어지는 결과입니다.",
  ],
  en: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing every day.",
    "Programming requires both creativity and logic.",
    "A cup of coffee can change your entire day.",
    "Success is the result of small efforts repeated daily.",
    "Technology is transforming how we live and work.",
    "Good code is readable and easy to maintain.",
    "Never stop learning because life never stops teaching.",
    "The journey of a thousand miles begins with a single step.",
    "Innovation distinguishes between a leader and a follower.",
  ],
  ja: [
    "速く正確にタイピングすることは仕事の効率を上げます。",
    "毎日の練習が上達への近道です。",
    "プログラミングは創造性と論理性を必要とします。",
    "コーヒー一杯の余裕が一日を変えることができます。",
    "成功は小さな努力の積み重ねです。",
    "技術は私たちの生活を変えています。",
    "良いコードは読みやすく保守しやすいコードです。",
    "学ぶことをやめないでください。",
    "千里の道も一歩から始まります。",
    "今日できることを明日に延ばさないでください。",
  ],
  zh: [
    "快速准确地打字可以提高工作效率。",
    "每天练习是进步的捷径。",
    "编程需要创造力和逻辑思维。",
    "一杯咖啡的休息可以改变你的一天。",
    "成功是小努力积累的结果。",
    "技术正在改变我们的生活方式。",
    "好的代码是易读且易于维护的代码。",
    "永远不要停止学习。",
    "千里之行始于足下。",
    "今日事今日毕。",
  ],
  de: [
    "Schnelles und genaues Tippen erhöht die Arbeitseffizienz.",
    "Tägliches Üben ist der schnellste Weg zur Verbesserung.",
    "Programmieren erfordert Kreativität und Logik.",
    "Eine Tasse Kaffee kann Ihren ganzen Tag verändern.",
    "Erfolg ist das Ergebnis kleiner täglicher Anstrengungen.",
    "Technologie verändert unser Leben und Arbeiten.",
    "Guter Code ist lesbar und leicht zu warten.",
    "Hören Sie niemals auf zu lernen.",
    "Eine Reise von tausend Meilen beginnt mit einem Schritt.",
    "Innovation unterscheidet Führende von Folgenden.",
  ],
  fr: [
    "Taper vite et avec précision améliore l'efficacité au travail.",
    "La pratique quotidienne est le chemin le plus rapide.",
    "La programmation nécessite créativité et logique.",
    "Une tasse de café peut changer votre journée entière.",
    "Le succès est le résultat de petits efforts quotidiens.",
    "La technologie transforme notre façon de vivre.",
    "Un bon code est lisible et facile à maintenir.",
    "N'arrêtez jamais d'apprendre.",
    "Un voyage de mille lieues commence par un pas.",
    "L'innovation distingue un leader d'un suiveur.",
  ],
  es: [
    "Escribir rápido y con precisión aumenta la eficiencia.",
    "La práctica diaria es el camino más rápido para mejorar.",
    "La programación requiere creatividad y lógica.",
    "Una taza de café puede cambiar todo tu día.",
    "El éxito es el resultado de pequeños esfuerzos diarios.",
    "La tecnología está transformando nuestra forma de vivir.",
    "El buen código es legible y fácil de mantener.",
    "Nunca dejes de aprender.",
    "Un viaje de mil millas comienza con un solo paso.",
    "La innovación distingue a un líder de un seguidor.",
  ],
  pt: [
    "Digitar rápido e com precisão aumenta a eficiência.",
    "A prática diária é o caminho mais rápido para melhorar.",
    "A programação requer criatividade e lógica.",
    "Uma xícara de café pode mudar todo o seu dia.",
    "O sucesso é o resultado de pequenos esforços diários.",
    "A tecnologia está transformando como vivemos.",
    "Um bom código é legível e fácil de manter.",
    "Nunca pare de aprender.",
    "Uma jornada de mil milhas começa com um passo.",
    "A inovação distingue um líder de um seguidor.",
  ],
};

// 다국어 텍스트
const translations: Record<Locale, {
  title: string;
  subtitle: string;
  tagline: string;
  tip: string;
  tipTitle: string;
  elapsedTime: string;
  currentSpeed: string;
  progress: string;
  placeholder: string;
  hint: string;
  share: string;
  save: string;
  retry: string;
  rankRegister: string;
  hallOfFame: string;
  refresh: string;
  noRecords: string;
  firstChallenger: string;
  speed: string;
  accuracy: string;
  time: string;
  cancel: string;
  register: string;
  nickname: string;
  country: string;
  newFirst: string;
  currentRank: string;
  myRecord: string;
  registerRanking: string;
  later: string;
  backToMain: string;
  otherTools: string;
  reactionTest: string;
  typingExplanation: string;
  typingExplanationTitle: string;
  gradeTable: string;
  mobile: string;
  desktop: string;
  // 등급
  challenger: string;
  master: string;
  diamond: string;
  platinum: string;
  gold: string;
  silver: string;
  bronze: string;
  iron: string;
}> = {
  ko: {
    title: "타자 속도",
    subtitle: "테스트",
    tagline: "한글 타자 연습",
    tip: "올바른 손가락 배치(홈 포지션)를 유지하고 키보드를 보지 않고 치는 연습을 해보세요. 정확도가 먼저, 속도는 자연스럽게 따라옵니다!",
    tipTitle: "타자 속도 향상 팁",
    elapsedTime: "경과 시간",
    currentSpeed: "🔥 현재 속도",
    progress: "진행률",
    placeholder: "클릭하고 타이핑을 시작하세요!",
    hint: "💡 문장을 정확하게 입력하면 자동으로 완료됩니다",
    share: "📤 공유",
    save: "🖼️ 저장",
    retry: "🔄 다시",
    rankRegister: "🏆 랭킹 등록!",
    hallOfFame: "명예의전당",
    refresh: "🔄 새로고침",
    noRecords: "아직 기록이 없습니다.",
    firstChallenger: "첫 번째 도전자가 되어보세요!",
    speed: "타/분",
    accuracy: "정확도",
    time: "소요 시간",
    cancel: "취소",
    register: "등록!",
    nickname: "닉네임...",
    country: "국가",
    newFirst: "🔥 새로운 1등!",
    currentRank: "현재",
    myRecord: "내 기록",
    registerRanking: "랭킹 등록하기!",
    later: "나중에 할게요",
    backToMain: "← 메인으로",
    otherTools: "🔗 다른 도구",
    reactionTest: "⚡ 반응속도 테스트",
    typingExplanation: "타자 속도는 WPM(Words Per Minute) 또는 타/분으로 측정합니다. 평균 타자 속도는 200~300타/분이며, 전문 타이피스트는 500타/분 이상을 기록합니다.",
    typingExplanationTitle: "타자 속도 측정이란?",
    gradeTable: "타자 속도 등급표",
    mobile: "📱 모바일",
    desktop: "💻 데스크톱",
    challenger: "챌린저",
    master: "마스터",
    diamond: "다이아몬드",
    platinum: "플래티넘",
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
    iron: "아이언",
  },
  en: {
    title: "Typing Speed",
    subtitle: "Test",
    tagline: "English Typing Practice",
    tip: "Keep proper finger placement (home position) and practice typing without looking at the keyboard. Accuracy first, speed follows naturally!",
    tipTitle: "Typing Speed Tips",
    elapsedTime: "Time",
    currentSpeed: "🔥 Current",
    progress: "Progress",
    placeholder: "Click and start typing!",
    hint: "💡 Complete the sentence to see your result",
    share: "📤 Share",
    save: "🖼️ Save",
    retry: "🔄 Retry",
    rankRegister: "🏆 Submit Score!",
    hallOfFame: "Leaderboard",
    refresh: "🔄 Refresh",
    noRecords: "No records yet.",
    firstChallenger: "Be the first challenger!",
    speed: "WPM",
    accuracy: "Accuracy",
    time: "Time",
    cancel: "Cancel",
    register: "Submit!",
    nickname: "Nickname...",
    country: "Country",
    newFirst: "🔥 New #1!",
    currentRank: "Rank",
    myRecord: "My Score",
    registerRanking: "Submit to Leaderboard!",
    later: "Maybe later",
    backToMain: "← Home",
    otherTools: "🔗 Other Tools",
    reactionTest: "⚡ Reaction Test",
    typingExplanation: "Typing speed is measured in WPM (Words Per Minute). Average typing speed is 40-60 WPM, while professional typists can reach 100+ WPM.",
    typingExplanationTitle: "What is Typing Speed?",
    gradeTable: "Typing Speed Grades",
    mobile: "📱 Mobile",
    desktop: "💻 Desktop",
    challenger: "Challenger",
    master: "Master",
    diamond: "Diamond",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
    iron: "Iron",
  },
  ja: {
    title: "タイピング速度",
    subtitle: "テスト",
    tagline: "日本語タイピング練習",
    tip: "正しい指の位置（ホームポジション）を維持し、キーボードを見ずにタイピングする練習をしましょう。正確さが先、スピードは自然についてきます！",
    tipTitle: "タイピング速度向上のコツ",
    elapsedTime: "経過時間",
    currentSpeed: "🔥 現在速度",
    progress: "進捗",
    placeholder: "クリックしてタイピングを開始!",
    hint: "💡 文章を正確に入力すると自動的に完了します",
    share: "📤 共有",
    save: "🖼️ 保存",
    retry: "🔄 再挑戦",
    rankRegister: "🏆 ランキング登録!",
    hallOfFame: "ランキング",
    refresh: "🔄 更新",
    noRecords: "まだ記録がありません。",
    firstChallenger: "最初の挑戦者になろう！",
    speed: "打/分",
    accuracy: "正確度",
    time: "所要時間",
    cancel: "キャンセル",
    register: "登録!",
    nickname: "ニックネーム...",
    country: "国",
    newFirst: "🔥 新記録1位！",
    currentRank: "現在",
    myRecord: "私の記録",
    registerRanking: "ランキングに登録!",
    later: "後で",
    backToMain: "← メインへ",
    otherTools: "🔗 他のツール",
    reactionTest: "⚡ 反応速度テスト",
    typingExplanation: "タイピング速度はWPM（1分間あたりの単語数）で測定します。平均的なタイピング速度は40〜60WPMで、プロのタイピストは100WPM以上を記録します。",
    typingExplanationTitle: "タイピング速度とは？",
    gradeTable: "タイピング速度等級表",
    mobile: "📱 モバイル",
    desktop: "💻 デスクトップ",
    challenger: "チャレンジャー",
    master: "マスター",
    diamond: "ダイヤモンド",
    platinum: "プラチナ",
    gold: "ゴールド",
    silver: "シルバー",
    bronze: "ブロンズ",
    iron: "アイアン",
  },
  zh: {
    title: "打字速度",
    subtitle: "测试",
    tagline: "中文打字练习",
    tip: "保持正确的手指位置（主键位），练习盲打。准确度第一，速度自然会跟上！",
    tipTitle: "提高打字速度的技巧",
    elapsedTime: "用时",
    currentSpeed: "🔥 当前速度",
    progress: "进度",
    placeholder: "点击开始打字!",
    hint: "💡 准确输入句子后自动完成",
    share: "📤 分享",
    save: "🖼️ 保存",
    retry: "🔄 重试",
    rankRegister: "🏆 提交成绩!",
    hallOfFame: "排行榜",
    refresh: "🔄 刷新",
    noRecords: "暂无记录。",
    firstChallenger: "成为第一个挑战者!",
    speed: "字/分",
    accuracy: "准确率",
    time: "用时",
    cancel: "取消",
    register: "提交!",
    nickname: "昵称...",
    country: "国家",
    newFirst: "🔥 新的第一名!",
    currentRank: "当前",
    myRecord: "我的成绩",
    registerRanking: "提交到排行榜!",
    later: "稍后再说",
    backToMain: "← 返回首页",
    otherTools: "🔗 其他工具",
    reactionTest: "⚡ 反应速度测试",
    typingExplanation: "打字速度以WPM（每分钟字数）来衡量。平均打字速度为40-60WPM，专业打字员可达100+WPM。",
    typingExplanationTitle: "什么是打字速度?",
    gradeTable: "打字速度等级表",
    mobile: "📱 手机",
    desktop: "💻 电脑",
    challenger: "挑战者",
    master: "大师",
    diamond: "钻石",
    platinum: "铂金",
    gold: "黄金",
    silver: "白银",
    bronze: "青铜",
    iron: "黑铁",
  },
  de: {
    title: "Tippgeschwindigkeit",
    subtitle: "Test",
    tagline: "Deutsch Schreibübung",
    tip: "Behalten Sie die richtige Fingerposition bei und üben Sie blindes Tippen. Genauigkeit zuerst, Geschwindigkeit folgt natürlich!",
    tipTitle: "Tipps zur Verbesserung",
    elapsedTime: "Zeit",
    currentSpeed: "🔥 Aktuell",
    progress: "Fortschritt",
    placeholder: "Klicken und tippen!",
    hint: "💡 Vervollständigen Sie den Satz für Ihr Ergebnis",
    share: "📤 Teilen",
    save: "🖼️ Speichern",
    retry: "🔄 Nochmal",
    rankRegister: "🏆 Punktzahl einreichen!",
    hallOfFame: "Rangliste",
    refresh: "🔄 Aktualisieren",
    noRecords: "Noch keine Einträge.",
    firstChallenger: "Sei der Erste!",
    speed: "WPM",
    accuracy: "Genauigkeit",
    time: "Zeit",
    cancel: "Abbrechen",
    register: "Einreichen!",
    nickname: "Spitzname...",
    country: "Land",
    newFirst: "🔥 Neuer #1!",
    currentRank: "Rang",
    myRecord: "Mein Score",
    registerRanking: "Zur Rangliste hinzufügen!",
    later: "Später vielleicht",
    backToMain: "← Startseite",
    otherTools: "🔗 Andere Tools",
    reactionTest: "⚡ Reaktionstest",
    typingExplanation: "Die Tippgeschwindigkeit wird in WPM (Wörter pro Minute) gemessen. Die durchschnittliche Geschwindigkeit beträgt 40-60 WPM.",
    typingExplanationTitle: "Was ist Tippgeschwindigkeit?",
    gradeTable: "Tippgeschwindigkeit Stufen",
    mobile: "📱 Mobil",
    desktop: "💻 Desktop",
    challenger: "Herausforderer",
    master: "Meister",
    diamond: "Diamant",
    platinum: "Platin",
    gold: "Gold",
    silver: "Silber",
    bronze: "Bronze",
    iron: "Eisen",
  },
  fr: {
    title: "Vitesse de Frappe",
    subtitle: "Test",
    tagline: "Pratique de Frappe Français",
    tip: "Maintenez la bonne position des doigts et pratiquez la frappe à l'aveugle. La précision d'abord, la vitesse suit naturellement!",
    tipTitle: "Conseils pour améliorer",
    elapsedTime: "Temps",
    currentSpeed: "🔥 Actuel",
    progress: "Progrès",
    placeholder: "Cliquez et commencez à taper!",
    hint: "💡 Complétez la phrase pour voir votre résultat",
    share: "📤 Partager",
    save: "🖼️ Sauvegarder",
    retry: "🔄 Réessayer",
    rankRegister: "🏆 Soumettre le Score!",
    hallOfFame: "Classement",
    refresh: "🔄 Actualiser",
    noRecords: "Aucun record encore.",
    firstChallenger: "Soyez le premier!",
    speed: "MPM",
    accuracy: "Précision",
    time: "Temps",
    cancel: "Annuler",
    register: "Soumettre!",
    nickname: "Pseudo...",
    country: "Pays",
    newFirst: "🔥 Nouveau #1!",
    currentRank: "Rang",
    myRecord: "Mon Score",
    registerRanking: "Ajouter au Classement!",
    later: "Plus tard",
    backToMain: "← Accueil",
    otherTools: "🔗 Autres Outils",
    reactionTest: "⚡ Test de Réaction",
    typingExplanation: "La vitesse de frappe est mesurée en MPM (Mots Par Minute). La vitesse moyenne est de 40-60 MPM.",
    typingExplanationTitle: "Qu'est-ce que la vitesse de frappe?",
    gradeTable: "Niveaux de Vitesse de Frappe",
    mobile: "📱 Mobile",
    desktop: "💻 Bureau",
    challenger: "Challenger",
    master: "Maître",
    diamond: "Diamant",
    platinum: "Platine",
    gold: "Or",
    silver: "Argent",
    bronze: "Bronze",
    iron: "Fer",
  },
  es: {
    title: "Velocidad de Escritura",
    subtitle: "Prueba",
    tagline: "Práctica de Escritura Español",
    tip: "Mantén la posición correcta de los dedos y practica escribir sin mirar el teclado. ¡Primero la precisión, la velocidad viene naturalmente!",
    tipTitle: "Consejos para mejorar",
    elapsedTime: "Tiempo",
    currentSpeed: "🔥 Actual",
    progress: "Progreso",
    placeholder: "¡Haz clic y empieza a escribir!",
    hint: "💡 Completa la oración para ver tu resultado",
    share: "📤 Compartir",
    save: "🖼️ Guardar",
    retry: "🔄 Reintentar",
    rankRegister: "🏆 ¡Enviar Puntuación!",
    hallOfFame: "Clasificación",
    refresh: "🔄 Actualizar",
    noRecords: "Sin registros aún.",
    firstChallenger: "¡Sé el primero!",
    speed: "PPM",
    accuracy: "Precisión",
    time: "Tiempo",
    cancel: "Cancelar",
    register: "¡Enviar!",
    nickname: "Apodo...",
    country: "País",
    newFirst: "🔥 ¡Nuevo #1!",
    currentRank: "Rango",
    myRecord: "Mi Puntuación",
    registerRanking: "¡Añadir a Clasificación!",
    later: "Quizás después",
    backToMain: "← Inicio",
    otherTools: "🔗 Otras Herramientas",
    reactionTest: "⚡ Test de Reacción",
    typingExplanation: "La velocidad de escritura se mide en PPM (Palabras Por Minuto). La velocidad promedio es de 40-60 PPM.",
    typingExplanationTitle: "¿Qué es la velocidad de escritura?",
    gradeTable: "Niveles de Velocidad de Escritura",
    mobile: "📱 Móvil",
    desktop: "💻 Escritorio",
    challenger: "Desafiante",
    master: "Maestro",
    diamond: "Diamante",
    platinum: "Platino",
    gold: "Oro",
    silver: "Plata",
    bronze: "Bronce",
    iron: "Hierro",
  },
  pt: {
    title: "Velocidade de Digitação",
    subtitle: "Teste",
    tagline: "Prática de Digitação Português",
    tip: "Mantenha a posição correta dos dedos e pratique digitar sem olhar o teclado. Precisão primeiro, velocidade vem naturalmente!",
    tipTitle: "Dicas para melhorar",
    elapsedTime: "Tempo",
    currentSpeed: "🔥 Atual",
    progress: "Progresso",
    placeholder: "Clique e comece a digitar!",
    hint: "💡 Complete a frase para ver seu resultado",
    share: "📤 Compartilhar",
    save: "🖼️ Salvar",
    retry: "🔄 Tentar Novamente",
    rankRegister: "🏆 Enviar Pontuação!",
    hallOfFame: "Classificação",
    refresh: "🔄 Atualizar",
    noRecords: "Sem registros ainda.",
    firstChallenger: "Seja o primeiro!",
    speed: "PPM",
    accuracy: "Precisão",
    time: "Tempo",
    cancel: "Cancelar",
    register: "Enviar!",
    nickname: "Apelido...",
    country: "País",
    newFirst: "🔥 Novo #1!",
    currentRank: "Posição",
    myRecord: "Minha Pontuação",
    registerRanking: "Adicionar à Classificação!",
    later: "Talvez depois",
    backToMain: "← Início",
    otherTools: "🔗 Outras Ferramentas",
    reactionTest: "⚡ Teste de Reação",
    typingExplanation: "A velocidade de digitação é medida em PPM (Palavras Por Minuto). A velocidade média é de 40-60 PPM.",
    typingExplanationTitle: "O que é velocidade de digitação?",
    gradeTable: "Níveis de Velocidade de Digitação",
    mobile: "📱 Celular",
    desktop: "💻 Desktop",
    challenger: "Desafiante",
    master: "Mestre",
    diamond: "Diamante",
    platinum: "Platina",
    gold: "Ouro",
    silver: "Prata",
    bronze: "Bronze",
    iron: "Ferro",
  },
};

// 한글 키 스트로크 계산 (한국어 전용)
const getKoreanKeyStrokes = (text: string): number => {
  let strokes = 0;
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const syllableIndex = code - 0xAC00;
      const cho = Math.floor(syllableIndex / (21 * 28));
      const jung = Math.floor((syllableIndex % (21 * 28)) / 28);
      const jong = syllableIndex % 28;
      const doubleChosung = [1, 4, 8, 10, 13];
      strokes += doubleChosung.includes(cho) ? 2 : 1;
      const doubleJungsung = [9, 10, 11, 14, 15, 16, 19];
      strokes += doubleJungsung.includes(jung) ? 2 : 1;
      if (jong > 0) {
        const doubleJongsung = [3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18];
        strokes += doubleJongsung.includes(jong) ? 2 : 1;
      }
    } else {
      strokes += 1;
    }
  }
  return strokes;
};

// 일반 키 스트로크 (영어 등 - 한 글자 = 한 스트로크)
const getKeyStrokes = (text: string, locale: Locale): number => {
  if (locale === "ko") {
    return getKoreanKeyStrokes(text);
  }
  return text.length; // 다른 언어는 글자 수 = 스트로크
};

const getRandomSentence = (locale: Locale): string => {
  const sentences = SENTENCES[locale];
  return sentences[Math.floor(Math.random() * sentences.length)];
};

interface Props {
  locale: Locale;
  battleMode?: boolean; // 🥊 배틀 모드
  onBattleComplete?: (score: number) => void; // 🥊 배틀 완료 콜백
}

export default function TypingMulti({ locale, battleMode = false, onBattleComplete }: Props) {
  const t = translations[locale];
  
  const [sentence, setSentence] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [result, setResult] = useState<TypingResult | null>(null);
  const [currentCpm, setCurrentCpm] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  
  const [leaderboard, setLeaderboard] = useState<TypingLeaderboardEntry[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myRank, setMyRank] = useState<number | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY[locale]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showRankingPrompt, setShowRankingPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // 👤 사용자 인증 상태 (초기 로드용, submitScore에서는 실시간 확인)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_currentUserNickname, setCurrentUserNickname] = useState<string>("");
  
  // 🥊 배틀 관련 상태
  const [isCreatingBattle, setIsCreatingBattle] = useState(false);
  const [battleUrl, setBattleUrl] = useState<string | null>(null);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [battleCompleted, setBattleCompleted] = useState(false);

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
        
        // 🎮 pending_game_score 확인
        try {
          const pendingScore = localStorage.getItem("pending_game_score");
          if (pendingScore) {
            const data = JSON.parse(pendingScore);
            if (data.game === "typing" && Date.now() - data.timestamp < 30 * 60 * 1000) {
              setResult(data.result);
              setIsFinished(true);
              setTimeout(() => { setShowNicknameModal(true); }, 500);
            }
            localStorage.removeItem("pending_game_score");
          }
        } catch { /* 무시 */ }
      }
    };
    checkUser();
  }, []);

  // 초기 문장 설정
  useEffect(() => {
    setSentence(getRandomSentence(locale));
  }, [locale]);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 타이머
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
        
        if (input.length > 0 && elapsed > 0) {
          const timeInMinutes = (now - startTime) / 1000 / 60;
          const keyStrokes = getKeyStrokes(input, locale);
          const cpm = Math.round(keyStrokes / timeInMinutes);
          setCurrentCpm(cpm);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished, startTime, input, locale]);

  // 리더보드
  // 리더보드 가져오기 (API 프록시 - 광고 차단기 우회)
  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch("/api/leaderboard?game=typing&limit=10");
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      if (result.data) setLeaderboard(result.data);
      if (result.totalCount !== undefined) setTotalCount(result.totalCount);
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // 등급 계산
  const getGrade = (cpm: number): { grade: string; color: string; emoji: string } => {
    const gradeKey = isMobile
      ? cpm >= 480 ? "challenger" : cpm >= 400 ? "master" : cpm >= 330 ? "diamond" : cpm >= 270 ? "platinum" : cpm >= 210 ? "gold" : cpm >= 150 ? "silver" : cpm >= 90 ? "bronze" : "iron"
      : cpm >= 650 ? "challenger" : cpm >= 550 ? "master" : cpm >= 450 ? "diamond" : cpm >= 370 ? "platinum" : cpm >= 300 ? "gold" : cpm >= 230 ? "silver" : cpm >= 150 ? "bronze" : "iron";
    
    const colors: Record<string, string> = {
      challenger: "text-cyan-300",
      master: "text-purple-400",
      diamond: "text-blue-400",
      platinum: "text-teal-400",
      gold: "text-yellow-400",
      silver: "text-gray-300",
      bronze: "text-orange-400",
      iron: "text-stone-400",
    };
    
    const emojis: Record<string, string> = {
      challenger: "👑",
      master: "💎",
      diamond: "💠",
      platinum: "🏆",
      gold: "🥇",
      silver: "🥈",
      bronze: "🥉",
      iron: "🪨",
    };
    
    return {
      grade: t[gradeKey as keyof typeof t] as string,
      color: colors[gradeKey],
      emoji: emojis[gradeKey],
    };
  };

  // 👤 회원 점수 업데이트는 API에서 자동 처리됨

  // 점수 등록 (API 프록시 사용)
  const submitScore = async () => {
    if (!nickname.trim() || isSubmitting || !result) return;
    
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
    
    setIsSubmitting(true);
    const gradeInfo = getGrade(result.cpm);
    const percentile = isMobile 
      ? (result.cpm >= 480 ? 1 : result.cpm >= 400 ? 5 : result.cpm >= 330 ? 15 : result.cpm >= 270 ? 30 : result.cpm >= 210 ? 50 : result.cpm >= 150 ? 70 : result.cpm >= 90 ? 85 : 95)
      : (result.cpm >= 650 ? 1 : result.cpm >= 550 ? 5 : result.cpm >= 450 ? 15 : result.cpm >= 370 ? 30 : result.cpm >= 300 ? 50 : result.cpm >= 230 ? 70 : result.cpm >= 150 ? 85 : 95);
    
    const finalNickname = realUserId && realUserNickname ? realUserNickname : nickname.trim().slice(0, 20);
    const finalUserId = realUserId;
    
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "typing",
          data: {
        nickname: finalNickname, 
        wpm: result.cpm,
        accuracy: result.accuracy, 
        device_type: isMobile ? "mobile" : "pc",
        grade: gradeInfo.grade,
        percentile: percentile,
        country: selectedCountry,
          },
          userId: finalUserId,
        }),
      });
      const apiResult = await response.json();
      if (!response.ok) throw new Error(apiResult.error);
      
      // 👤 회원 점수 업데이트는 API에서 자동 처리됨
      
      setHasSubmittedScore(true);
      setShowNicknameModal(false);
      setNickname("");
      fetchLeaderboard();
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Submit failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 게임 끝나면 자동 랭킹 등록 팝업 + 배틀 처리
  useEffect(() => {
    if (isFinished && !hasSubmittedScore && result && result.cpm > 0) {
      // 🏆 정확한 순위 계산을 위해 API에서 myRank 가져오기
      fetch(`/api/leaderboard?game=typing&limit=10&myScore=${result.cpm}`)
        .then(res => res.json())
        .then(apiResult => {
          if (apiResult.myRank) setMyRank(apiResult.myRank);
          if (apiResult.data) setLeaderboard(apiResult.data);
          if (apiResult.totalCount !== undefined) setTotalCount(apiResult.totalCount);
        })
        .catch(err => console.error("Failed to calculate rank:", err));

      const timer = setTimeout(() => setShowRankingPrompt(true), 800);
      
      // 🥊 배틀 모드: 게임 완료 시 점수 전달 (WPM)
      if (battleMode && onBattleComplete && !battleCompleted) {
        setBattleCompleted(true);
        onBattleComplete(result.wpm);
      }
      
      return () => clearTimeout(timer);
    }
  }, [isFinished, hasSubmittedScore, result, battleMode, onBattleComplete, battleCompleted]);

  // 이미지 생성
  const generateImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    try {
      shareCardRef.current.style.display = "block";
      const canvas = await html2canvas(shareCardRef.current, { backgroundColor: "#0f0d1a", scale: 2, useCORS: true });
      shareCardRef.current.style.display = "none";
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
    } catch {
      if (shareCardRef.current) shareCardRef.current.style.display = "none";
      return null;
    }
  };

  const saveAsImage = async () => {
    const blob = await generateImage();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `typing-${result?.cpm || 0}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // 결과 계산
  const calculateResult = useCallback((): TypingResult => {
    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === sentence[i]) {
        correctChars++;
      }
    }
    
    const accuracy = Math.round((correctChars / sentence.length) * 100);
    const keyStrokes = getKeyStrokes(input, locale);
    const cpm = Math.round(keyStrokes / timeInMinutes);
    const wpm = Math.round(cpm / 5);
    
    return {
      wpm,
      cpm,
      accuracy,
      time: Math.round(timeInSeconds),
      totalChars: sentence.length,
      correctChars,
    };
  }, [input, sentence, startTime, locale]);

  // 입력 처리
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isStarted && value.length === 1) {
      setIsStarted(true);
      setStartTime(Date.now());
    }
    
    setInput(value);
    
    if (value.length >= sentence.length) {
      setIsFinished(true);
      setResult(calculateResult());
    }
  };

  // 🥊 도전장 만들기 함수
  const createBattle = async () => {
    if (!currentUserId || !nickname) {
      alert(locale === "ko" ? "로그인이 필요합니다." : "Login required.");
      return;
    }

    if (!result) return;

    setIsCreatingBattle(true);
    try {
      const response = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          challengerId: currentUserId,
          challengerNickname: nickname,
          challengerScore: result.wpm,
          game: "typing",
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
      alert(locale === "ko" ? "도전장 생성에 실패했습니다." : "Failed to create challenge.");
    } finally {
      setIsCreatingBattle(false);
    }
  };

  // 🥊 도전장 링크 복사
  const copyBattleUrl = async () => {
    if (!battleUrl || !result) return;
    
    const text = locale === "ko"
      ? `🥊 ${nickname}의 도전장!\n\n⌨️ 타자연습: ${result.wpm} WPM\n\n이 기록 이길 수 있어? 👉\n${battleUrl}`
      : `🥊 ${nickname}'s Challenge!\n\n⌨️ Typing: ${result.wpm} WPM\n\nCan you beat this? 👉\n${battleUrl}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert(locale === "ko" ? "복사되었습니다! 친구에게 공유하세요 🎮" : "Copied! Share with friends 🎮");
    } catch {
      prompt(locale === "ko" ? "텍스트를 복사하세요:" : "Copy this text:", text);
    }
  };

  // 다시 시작
  const restart = () => {
    setSentence(getRandomSentence(locale));
    setInput("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(0);
    setElapsedTime(0);
    setResult(null);
    setCurrentCpm(0);
    setHasSubmittedScore(false);
    setShowRankingPrompt(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 결과 공유
  const shareResult = async () => {
    if (!result) return;
    const blob = await generateImage();
    if (blob && navigator.share && navigator.canShare) {
      const file = new File([blob], `typing-${result.cpm}.png`, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) { 
        try { 
          await navigator.share({ files: [file], title: "Typing Speed Test Result!", text: `Test your speed 👉 https://www.slox.co.kr/${locale}/typing` }); 
          return; 
        } catch { /* 취소 */ } 
      }
    }
    if (blob) { 
      const url = URL.createObjectURL(blob); 
      const link = document.createElement("a"); 
      link.download = `typing-test-${result.cpm}.png`; 
      link.href = url; 
      link.click(); 
      URL.revokeObjectURL(url); 
    }
  };

  // 글자별 색상 렌더링
  const renderSentence = () => {
    return sentence.split("").map((char, index) => {
      let colorClass = "text-dark-400";
      
      if (index < input.length) {
        if (input[index] === char) {
          colorClass = "text-green-400";
        } else {
          colorClass = "text-red-400 bg-red-400/20";
        }
      } else if (index === input.length) {
        colorClass = "text-white bg-accent-purple/30";
      }
      
      return (
        <span key={index} className={`${colorClass} transition-colors`}>
          {char}
        </span>
      );
    });
  };

  // 메인 경로
  const reactionPath = locale === "ko" ? "/reaction" : `/${locale}/reaction`;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 - GameNavBar 사용 */}
      <GameNavBar locale={locale} backText={locale === "ko" ? "← 메인" : "← Main"} languageOptions={languageOptions} />

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">⌨️ {t.tagline}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> {t.subtitle}</span>
            </h1>
          </div>

          {/* 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <p className="text-white font-medium mb-1">{t.tipTitle}</p>
                <p className="text-dark-400 text-sm">{t.tip}</p>
              </div>
            </div>
          </div>

          {/* 타이머 & 상태 */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-8">
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">{t.elapsedTime}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{elapsedTime}<span className="text-lg text-dark-400">s</span></p>
            </div>
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">{t.currentSpeed}</p>
              <p className={`text-2xl sm:text-3xl font-bold transition-all ${currentCpm >= 500 ? "text-purple-400 animate-pulse" : currentCpm >= 400 ? "text-cyan-400" : currentCpm >= 300 ? "text-green-400" : "text-yellow-400"}`}>
                {currentCpm}<span className="text-lg text-dark-400">{locale === "ko" ? "타" : ""}</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">{t.progress}</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-cyan">
                {Math.round((input.length / sentence.length) * 100)}<span className="text-lg text-dark-400">%</span>
              </p>
            </div>
          </div>

          {/* 타자 영역 */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            {!isFinished ? (
              <>
                <div className="p-6 bg-dark-800/50 rounded-xl mb-6">
                  <p className="text-xl sm:text-2xl leading-relaxed font-mono tracking-wide">
                    {renderSentence()}
                  </p>
                </div>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    placeholder={isStarted ? "" : t.placeholder}
                    className="w-full px-6 py-4 bg-dark-800 border-2 border-dark-700 rounded-xl text-white text-xl font-mono focus:outline-none focus:border-accent-purple transition-colors placeholder:text-dark-500"
                    autoFocus
                    disabled={isFinished}
                  />
                </div>
                <p className="text-center text-dark-500 text-sm mt-4">{t.hint}</p>
              </>
            ) : (
              result && (
                <div className="text-center">
                  <div className="mb-8">
                    <p className="text-6xl mb-4">{getGrade(result.cpm).emoji}</p>
                    <p className={`text-2xl font-bold ${getGrade(result.cpm).color}`}>
                      {getGrade(result.cpm).grade}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-xl border border-accent-purple/30 mb-6">
                    <p className="text-dark-300 text-sm mb-2">{t.speed}</p>
                    <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {result.cpm}<span className="text-2xl">{locale === "ko" ? "타/분" : " CPM"}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">{t.accuracy}</p>
                      <p className="text-2xl font-bold text-white">{result.accuracy}%</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">{t.time}</p>
                      <p className="text-2xl font-bold text-white">{result.time}s</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">WPM</p>
                      <p className="text-2xl font-bold text-white">{result.wpm}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={shareResult} className="px-6 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all">{t.share}</button>
                    <button onClick={saveAsImage} className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl transition-all">{t.save}</button>
                    <button onClick={restart} className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all">{t.retry}</button>
                  </div>
                  {!hasSubmittedScore && result && (
                    <button onClick={() => setShowNicknameModal(true)} className="w-full max-w-sm mx-auto mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl">{t.rankRegister}</button>
                  )}
                  
                  {/* 🥊 도전장 만들기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && result && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full max-w-sm mx-auto mt-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (locale === "ko" ? "생성 중..." : "Creating...")
                          : (locale === "ko" ? "친구에게 도전장 보내기!" : "Send Challenge!")}
                      </span>
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          {/* 🏆 명예의전당 */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><span className="text-2xl">🏆</span> {t.hallOfFame}</h3>
              <button onClick={fetchLeaderboard} className="text-dark-400 hover:text-white text-sm">{t.refresh}</button>
            </div>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8"><div className="text-4xl mb-3">⌨️</div><p className="text-dark-400">{t.noRecords} {t.firstChallenger}</p></div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
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
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-dark-700 text-dark-400">{entry.device_type === "mobile" ? "📱" : "🖥️"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        <span className={getGrade(entry.wpm).color}>{getGrade(entry.wpm).grade}</span>
                        <span>•</span>
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{entry.wpm} {t.speed}</div>
                      <div className="text-xs text-dark-500">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 공유 카드 (숨김) */}
          <div ref={shareCardRef} style={{ display: "none", position: "absolute", left: "-9999px", width: "360px", padding: "20px", backgroundColor: "#0f0d1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>SLOX</span>
              <span style={{ color: "#a78bfa", fontSize: "12px" }}>⌨️ {t.tagline}</span>
            </div>
            <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1a1625", borderRadius: "12px", marginBottom: "10px" }}>
              <div style={{ fontSize: "44px" }}>{result ? getGrade(result.cpm).emoji : "⌨️"}</div>
              <div style={{ fontSize: "26px", fontWeight: "bold", marginTop: "8px", color: result && result.cpm >= 600 ? "#c084fc" : result && result.cpm >= 500 ? "#22d3ee" : "#4ade80" }}>{result ? getGrade(result.cpm).grade : ""}</div>
              <div style={{ fontSize: "44px", fontWeight: "bold", color: "#a78bfa", marginTop: "8px" }}>{result?.cpm || 0}<span style={{ fontSize: "18px", color: "#7c3aed" }}> {t.speed}</span></div>
              <div style={{ color: "#9ca3af", fontSize: "11px", marginTop: "6px" }}>{t.accuracy} {result?.accuracy || 0}% / {result?.time || 0}s</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1, backgroundColor: "#0c1a1a", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
                <div style={{ color: "#67e8f9", fontSize: "10px" }}>🎯 {t.accuracy}</div>
                <div style={{ color: "#22d3ee", fontSize: "18px", fontWeight: "bold" }}>{result?.accuracy || 0}%</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "8px", width: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(`https://www.slox.co.kr/${locale}/typing`)}`} alt="QR" width={70} height={70} crossOrigin="anonymous" />
                <div style={{ fontSize: "8px", color: "#6366f1", marginTop: "4px" }}>📱 Try it!</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid #1e1b4b", fontSize: "10px", color: "#6b7280" }}>
              <span>{new Date().toLocaleDateString()}</span>
              <span style={{ color: "#8b5cf6" }}>slox.co.kr/{locale}/typing</span>
            </div>
          </div>

          {/* 자동 랭킹 등록 팝업 */}
          {showRankingPrompt && !showNicknameModal && !hasSubmittedScore && result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-sm w-full animate-scale-in relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                <button onClick={() => setShowRankingPrompt(false)} className="absolute top-3 right-3 text-dark-500 hover:text-white transition-colors z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    {(() => {
                      const calculatedRank = myRank || (leaderboard.length === 0 ? 1 : leaderboard.findIndex(e => result.cpm > e.wpm) === -1 ? totalCount + 1 : leaderboard.findIndex(e => result.cpm > e.wpm) + 1);
                      const isFirstPlace = leaderboard.length === 0 || result.cpm > leaderboard[0].wpm;
                      return (
                        <>
                          <div className={`text-5xl mb-3 ${isFirstPlace ? "animate-bounce" : ""}`}>
                            {isFirstPlace ? "👑" : calculatedRank <= 3 ? "🏆" : calculatedRank <= 10 ? "🔥" : "📊"}
                          </div>
                          <h3 className={`text-2xl font-black mb-1 ${isFirstPlace ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400" : calculatedRank <= 3 ? "text-yellow-400" : "text-white"}`}>
                            {isFirstPlace ? t.newFirst : `${t.currentRank} #${calculatedRank}!`}
                          </h3>
                          <p className="text-dark-400 text-sm">{result.cpm} {t.speed}</p>
                        </>
                      );
                    })()}
                  </div>
                  {leaderboard.length > 0 && result.cpm <= leaderboard[0].wpm && (
                    <div className="bg-dark-800/70 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">#1</p>
                          <p className="text-yellow-400 font-bold">{leaderboard[0].wpm} {t.speed}</p>
                          <p className="text-xs text-dark-400">{leaderboard[0].nickname}</p>
                        </div>
                        <div className="text-dark-600 px-2">vs</div>
                        <div className="text-center flex-1">
                          <p className="text-[10px] text-dark-500 uppercase">{t.myRecord}</p>
                          <p className="text-purple-400 font-bold">{result.cpm} {t.speed}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 🔐 비회원 로그인 유도 */}
                  {!currentUserId && result && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm text-white font-medium mb-1 text-center">🎮 회원으로 등록하면 점수가 누적돼요!</p>
                      <button onClick={() => { localStorage.setItem("pending_game_score", JSON.stringify({ game: "typing", result, timestamp: Date.now() })); window.location.href = locale === "ko" ? "/login?redirect=/typing" : `/${locale}/login?redirect=/${locale}/typing`; }} className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-sm rounded-lg text-center transition-all">로그인하고 이 점수로 등록! →</button>
                    </div>
                  )}
                  <button onClick={() => { setShowRankingPrompt(false); setShowNicknameModal(true); }} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black text-lg rounded-xl transition-all shadow-lg shadow-yellow-500/30 animate-pulse hover:animate-none hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-xl">🏆</span>
                      {t.registerRanking}
                    </span>
                  </button>
                  {/* 🥊 도전장 보내기 버튼 (회원만, 배틀모드 아닐 때) */}
                  {currentUserId && !battleMode && result && result.wpm > 0 && (
                    <button
                      onClick={createBattle}
                      disabled={isCreatingBattle}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥊</span>
                        {isCreatingBattle 
                          ? (locale === "ko" ? "생성 중..." : "Creating...")
                          : (locale === "ko" ? "친구에게 도전장 보내기!" : "Send Challenge!")}
                      </span>
                    </button>
                  )}
                  <button onClick={() => setShowRankingPrompt(false)} className="w-full mt-3 py-2 text-dark-500 hover:text-dark-300 text-sm transition-colors">{t.later}</button>
                </div>
              </div>
            </div>
          )}

          {/* 닉네임 모달 */}
          {showNicknameModal && result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{getGrade(result.cpm).emoji}</div>
                  <h3 className="text-white text-xl font-bold">🏆 {t.hallOfFame}</h3>
                  <p className="text-dark-400 text-sm">{result.cpm} {t.speed}</p>
                </div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 20))}
                  placeholder={t.nickname}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white mb-3"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && submitScore()}
                />
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

          {/* 🥊 도전장 링크 모달 */}
          {showBattleModal && battleUrl && result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 mx-4 max-w-md w-full animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🥊</div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {locale === "ko" ? "도전장 생성 완료!" : "Challenge Created!"}
                  </h3>
                  <p className="text-dark-400 text-sm">
                    {locale === "ko" ? "링크를 친구에게 공유하세요!" : "Share this link with your friend!"}
                  </p>
                </div>

                <div className="bg-dark-800 rounded-xl p-4 mb-4">
                  <p className="text-white text-center font-bold mb-2">⌨️ {result.wpm} WPM</p>
                  <p className="text-dark-400 text-xs text-center break-all">{battleUrl}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={copyBattleUrl}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all"
                  >
                    📋 {locale === "ko" ? "링크 복사하기" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => setShowBattleModal(false)}
                    className="w-full py-2 text-dark-400 hover:text-white transition-colors"
                  >
                    {locale === "ko" ? "닫기" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 설명 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>📊</span> {t.typingExplanationTitle}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">{t.typingExplanation}</p>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-2 text-center">📊 {t.gradeTable}</h3>
            <p className="text-dark-400 text-xs text-center mb-6">
              {isMobile ? t.mobile : t.desktop} (CPM)
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-lg text-center border border-cyan-400/50">
                <span className="text-cyan-300 text-sm font-bold">👑 {t.challenger}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "480" : "650"}+</span>
              </div>
              <div className="w-40 p-2 bg-gradient-to-r from-purple-500/20 to-purple-400/20 rounded-lg text-center border border-purple-400/50">
                <span className="text-purple-400 text-sm font-bold">💎 {t.master}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "400~479" : "550~649"}</span>
              </div>
              <div className="w-48 p-2 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg text-center border border-blue-400/50">
                <span className="text-blue-400 text-sm font-bold">💠 {t.diamond}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "330~399" : "450~549"}</span>
              </div>
              <div className="w-56 p-2 bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-lg text-center border border-teal-400/50">
                <span className="text-teal-400 text-sm font-bold">🏆 {t.platinum}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "270~329" : "370~449"}</span>
              </div>
              <div className="w-64 p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-lg text-center border border-yellow-400/50">
                <span className="text-yellow-400 text-sm font-bold">🥇 {t.gold}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "210~269" : "300~369"}</span>
              </div>
              <div className="w-72 p-2 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-lg text-center border border-gray-400/50">
                <span className="text-gray-300 text-sm font-bold">🥈 {t.silver}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "150~209" : "230~299"}</span>
              </div>
              <div className="w-80 p-2 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-lg text-center border border-orange-400/50">
                <span className="text-orange-400 text-sm font-bold">🥉 {t.bronze}</span>
                <span className="text-white text-xs ml-2">{isMobile ? "90~149" : "150~229"}</span>
              </div>
              <div className="w-[22rem] p-2 bg-gradient-to-r from-stone-500/20 to-stone-400/20 rounded-lg text-center border border-stone-400/50">
                <span className="text-stone-400 text-sm font-bold">🪨 {t.iron}</span>
                <span className="text-white text-xs ml-2">~{isMobile ? "89" : "149"}</span>
              </div>
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">{t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href={reactionPath}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                {t.reactionTest}
              </Link>
            </div>
          </div>

          <AdBanner className="my-8" />

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href={locale === "ko" ? "/" : `/${locale}`} className="font-black text-sm text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
