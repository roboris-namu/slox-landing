"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  targetDate: string;
  eventName: string;
  eventPlaceholder: string;
  result: string;
  daysLeft: string;
  daysPassed: string;
  today: string;
  details: string;
  weeks: string;
  hours: string;
  minutes: string;
  seconds: string;
  quickSelect: string;
  christmas: string;
  newYear: string;
  valentine: string;
  halloween: string;
  whatIsDday: string;
  ddayExplanation: string;
  examples: string;
  birthday: string;
  exam: string;
  wedding: string;
  travel: string;
  otherTools: string;
  backToMain: string;
  year: string;
  month: string;
  day: string;
}> = {
  ko: {
    title: "D-day 계산기",
    subtitle: "특정 날짜까지 남은 일수를 계산하세요",
    targetDate: "목표 날짜",
    eventName: "이벤트 이름",
    eventPlaceholder: "예: 생일, 시험, 여행...",
    result: "결과",
    daysLeft: "일 남음",
    daysPassed: "일 지남",
    today: "오늘입니다!",
    details: "상세 정보",
    weeks: "주",
    hours: "시간",
    minutes: "분",
    seconds: "초",
    quickSelect: "빠른 선택",
    christmas: "크리스마스",
    newYear: "새해",
    valentine: "발렌타인",
    halloween: "할로윈",
    whatIsDday: "D-day란?",
    ddayExplanation: "D-day는 특정 이벤트까지 남은 날짜를 세는 방식입니다. D-0은 당일, D-1은 하루 전, D+1은 하루 후를 의미합니다.",
    examples: "활용 예시",
    birthday: "생일",
    exam: "시험일",
    wedding: "결혼 기념일",
    travel: "여행 출발일",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
    year: "년",
    month: "월",
    day: "일",
  },
  en: {
    title: "D-day Calculator",
    subtitle: "Calculate days until a specific date",
    targetDate: "Target Date",
    eventName: "Event Name",
    eventPlaceholder: "e.g., Birthday, Exam, Travel...",
    result: "Result",
    daysLeft: "days left",
    daysPassed: "days passed",
    today: "It's today!",
    details: "Details",
    weeks: "weeks",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    quickSelect: "Quick Select",
    christmas: "Christmas",
    newYear: "New Year",
    valentine: "Valentine's",
    halloween: "Halloween",
    whatIsDday: "What is D-day?",
    ddayExplanation: "D-day counts days until a specific event. D-0 is the day itself, D-1 is one day before, D+1 is one day after.",
    examples: "Use Cases",
    birthday: "Birthday",
    exam: "Exam Day",
    wedding: "Wedding Anniversary",
    travel: "Travel Date",
    otherTools: "Other Tools",
    backToMain: "← Back",
    year: "Year",
    month: "Month",
    day: "Day",
  },
  ja: {
    title: "D-day 計算機",
    subtitle: "特定の日までの日数を計算",
    targetDate: "目標日",
    eventName: "イベント名",
    eventPlaceholder: "例: 誕生日、試験、旅行...",
    result: "結果",
    daysLeft: "日前",
    daysPassed: "日後",
    today: "今日です！",
    details: "詳細",
    weeks: "週",
    hours: "時間",
    minutes: "分",
    seconds: "秒",
    quickSelect: "クイック選択",
    christmas: "クリスマス",
    newYear: "新年",
    valentine: "バレンタイン",
    halloween: "ハロウィン",
    whatIsDday: "D-dayとは？",
    ddayExplanation: "D-dayは特定のイベントまでの日数を数える方法です。D-0は当日、D-1は1日前、D+1は1日後を意味します。",
    examples: "活用例",
    birthday: "誕生日",
    exam: "試験日",
    wedding: "結婚記念日",
    travel: "旅行出発日",
    otherTools: "他のツール",
    backToMain: "← 戻る",
    year: "年",
    month: "月",
    day: "日",
  },
  zh: {
    title: "D-day 计算器",
    subtitle: "计算到特定日期的天数",
    targetDate: "目标日期",
    eventName: "事件名称",
    eventPlaceholder: "如：生日、考试、旅行...",
    result: "结果",
    daysLeft: "天剩余",
    daysPassed: "天已过",
    today: "就是今天！",
    details: "详情",
    weeks: "周",
    hours: "小时",
    minutes: "分钟",
    seconds: "秒",
    quickSelect: "快速选择",
    christmas: "圣诞节",
    newYear: "新年",
    valentine: "情人节",
    halloween: "万圣节",
    whatIsDday: "什么是D-day？",
    ddayExplanation: "D-day是计算到特定事件的天数。D-0是当天，D-1是前一天，D+1是后一天。",
    examples: "使用场景",
    birthday: "生日",
    exam: "考试日",
    wedding: "结婚纪念日",
    travel: "旅行日",
    otherTools: "其他工具",
    backToMain: "← 返回",
    year: "年",
    month: "月",
    day: "日",
  },
  es: {
    title: "Calculadora D-day",
    subtitle: "Calcula los dias hasta una fecha especifica",
    targetDate: "Fecha Objetivo",
    eventName: "Nombre del Evento",
    eventPlaceholder: "ej: Cumpleanos, Examen, Viaje...",
    result: "Resultado",
    daysLeft: "dias restantes",
    daysPassed: "dias pasados",
    today: "Es hoy!",
    details: "Detalles",
    weeks: "semanas",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
    quickSelect: "Seleccion Rapida",
    christmas: "Navidad",
    newYear: "Ano Nuevo",
    valentine: "San Valentin",
    halloween: "Halloween",
    whatIsDday: "Que es D-day?",
    ddayExplanation: "D-day cuenta los dias hasta un evento especifico. D-0 es el dia, D-1 es un dia antes, D+1 es un dia despues.",
    examples: "Ejemplos de Uso",
    birthday: "Cumpleanos",
    exam: "Dia de Examen",
    wedding: "Aniversario",
    travel: "Fecha de Viaje",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
    year: "Ano",
    month: "Mes",
    day: "Dia",
  },
  pt: {
    title: "Calculadora D-day",
    subtitle: "Calcule os dias ate uma data especifica",
    targetDate: "Data Alvo",
    eventName: "Nome do Evento",
    eventPlaceholder: "ex: Aniversario, Prova, Viagem...",
    result: "Resultado",
    daysLeft: "dias restantes",
    daysPassed: "dias passados",
    today: "E hoje!",
    details: "Detalhes",
    weeks: "semanas",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
    quickSelect: "Selecao Rapida",
    christmas: "Natal",
    newYear: "Ano Novo",
    valentine: "Dia dos Namorados",
    halloween: "Halloween",
    whatIsDday: "O que e D-day?",
    ddayExplanation: "D-day conta os dias ate um evento especifico. D-0 e o dia, D-1 e um dia antes, D+1 e um dia depois.",
    examples: "Exemplos de Uso",
    birthday: "Aniversario",
    exam: "Dia da Prova",
    wedding: "Aniversario de Casamento",
    travel: "Data da Viagem",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
    year: "Ano",
    month: "Mes",
    day: "Dia",
  },
  de: {
    title: "D-day Rechner",
    subtitle: "Berechne Tage bis zu einem bestimmten Datum",
    targetDate: "Zieldatum",
    eventName: "Event Name",
    eventPlaceholder: "z.B.: Geburtstag, Prufung, Reise...",
    result: "Ergebnis",
    daysLeft: "Tage ubrig",
    daysPassed: "Tage vergangen",
    today: "Es ist heute!",
    details: "Details",
    weeks: "Wochen",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    quickSelect: "Schnellauswahl",
    christmas: "Weihnachten",
    newYear: "Neujahr",
    valentine: "Valentinstag",
    halloween: "Halloween",
    whatIsDday: "Was ist D-day?",
    ddayExplanation: "D-day zahlt Tage bis zu einem bestimmten Event. D-0 ist der Tag, D-1 ist ein Tag davor, D+1 ist ein Tag danach.",
    examples: "Anwendungsbeispiele",
    birthday: "Geburtstag",
    exam: "Prufungstag",
    wedding: "Hochzeitstag",
    travel: "Reisedatum",
    otherTools: "Andere Tools",
    backToMain: "← Zuruck",
    year: "Jahr",
    month: "Monat",
    day: "Tag",
  },
  fr: {
    title: "Calculateur D-day",
    subtitle: "Calculez les jours jusqu'a une date specifique",
    targetDate: "Date Cible",
    eventName: "Nom de l'evenement",
    eventPlaceholder: "ex: Anniversaire, Examen, Voyage...",
    result: "Resultat",
    daysLeft: "jours restants",
    daysPassed: "jours passes",
    today: "C'est aujourd'hui!",
    details: "Details",
    weeks: "semaines",
    hours: "heures",
    minutes: "minutes",
    seconds: "secondes",
    quickSelect: "Selection Rapide",
    christmas: "Noel",
    newYear: "Nouvel An",
    valentine: "Saint Valentin",
    halloween: "Halloween",
    whatIsDday: "Qu'est-ce que D-day?",
    ddayExplanation: "D-day compte les jours jusqu'a un evenement specifique. D-0 est le jour, D-1 est un jour avant, D+1 est un jour apres.",
    examples: "Exemples d'Utilisation",
    birthday: "Anniversaire",
    exam: "Jour d'Examen",
    wedding: "Anniversaire de Mariage",
    travel: "Date de Voyage",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
    year: "Annee",
    month: "Mois",
    day: "Jour",
  },
};

interface DdayCalculatorProps {
  lang?: Lang;
}

const languageOptions: { code: Lang; label: string; flag: string }[] = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function DdayCalculator({ lang = "ko" }: DdayCalculatorProps) {
  const [currentLang] = useState<Lang>(lang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[currentLang];
  const today = new Date();
  const currentYear = today.getFullYear();

  const [targetYear, setTargetYear] = useState(currentYear);
  const [targetMonth, setTargetMonth] = useState(today.getMonth() + 1);
  const [targetDay, setTargetDay] = useState(today.getDate());
  const [eventName, setEventName] = useState("");

  // 언어별 URL 생성
  const getLangUrl = (langCode: string) => {
    return langCode === "ko" ? "/dday" : `/${langCode}/dday`;
  };

  const result = useMemo(() => {
    const targetDate = new Date(targetYear, targetMonth - 1, targetDay);
    targetDate.setHours(0, 0, 0, 0);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const diff = targetDate.getTime() - todayStart.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    const absDays = Math.abs(days);
    const weeks = Math.floor(absDays / 7);
    const remainingDays = absDays % 7;
    const hours = absDays * 24;
    const minutes = hours * 60;

    return {
      days,
      weeks,
      remainingDays,
      hours,
      minutes,
      isToday: days === 0,
      isFuture: days > 0,
    };
  }, [targetYear, targetMonth, targetDay]);

  const setQuickDate = (month: number, day: number) => {
    const year = new Date().getMonth() + 1 > month || (new Date().getMonth() + 1 === month && new Date().getDate() > day)
      ? currentYear + 1
      : currentYear;
    setTargetYear(year);
    setTargetMonth(month);
    setTargetDay(day);
  };

  const quickDates = [
    { label: t.christmas, month: 12, day: 25, emoji: "🎄" },
    { label: t.newYear, month: 1, day: 1, emoji: "🎉" },
    { label: t.valentine, month: 2, day: 14, emoji: "💝" },
    { label: t.halloween, month: 10, day: 31, emoji: "🎃" },
  ];

  const mainPath = currentLang === "ko" ? "/" : `/${currentLang}`;
  const currentLangOption = languageOptions.find(l => l.code === currentLang);

  const years = Array.from({ length: 20 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = new Date(targetYear, targetMonth, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={mainPath} className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 hover:border-dark-600 transition-colors text-sm"
                >
                  <span>{currentLangOption?.flag}</span>
                  <span className="text-dark-300">{currentLangOption?.label}</span>
                  <svg className={`w-3 h-3 text-dark-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLangMenu && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {languageOptions.map((option) => (
                      <Link
                        key={option.code}
                        href={getLangUrl(option.code)}
                        onClick={() => setShowLangMenu(false)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          currentLang === option.code ? 'bg-dark-700 text-white' : 'text-dark-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href={mainPath} className="text-dark-300 hover:text-white transition-colors text-sm">
                {t.backToMain}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="text-blue-400 text-sm font-medium">📅 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="mb-6">
              <label className="block text-dark-300 text-sm font-medium mb-2">{t.eventName}</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder={t.eventPlaceholder}
                className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-dark-300 text-sm font-medium mb-2">{t.targetDate}</label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}{t.year}</option>
                  ))}
                </select>
                <select
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(Number(e.target.value))}
                  className="p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}{t.month}</option>
                  ))}
                </select>
                <select
                  value={targetDay}
                  onChange={(e) => setTargetDay(Number(e.target.value))}
                  className="p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}{t.day}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="text-dark-400 text-sm mb-3">{t.quickSelect}</p>
              <div className="flex flex-wrap gap-2">
                {quickDates.map((qd) => (
                  <button
                    key={qd.label}
                    onClick={() => setQuickDate(qd.month, qd.day)}
                    className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                  >
                    {qd.emoji} {qd.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">{t.result}</h2>
            <div className="text-center mb-8">
              {eventName && (
                <p className="text-dark-400 mb-2">{eventName}</p>
              )}
              {result.isToday ? (
                <div className="text-5xl font-bold text-green-400">🎉 {t.today}</div>
              ) : (
                <div className={`text-6xl font-bold ${result.isFuture ? "text-blue-400" : "text-orange-400"}`}>
                  D{result.days > 0 ? `-${result.days}` : `+${Math.abs(result.days)}`}
                </div>
              )}
              {!result.isToday && (
                <p className="text-dark-400 mt-2">
                  {Math.abs(result.days)} {result.isFuture ? t.daysLeft : t.daysPassed}
                </p>
              )}
            </div>

            {!result.isToday && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm">{t.weeks}</p>
                  <p className="text-white text-2xl font-bold">{result.weeks}</p>
                  {result.remainingDays > 0 && (
                    <p className="text-dark-400 text-xs">+{result.remainingDays}{t.day}</p>
                  )}
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm">{t.hours}</p>
                  <p className="text-white text-2xl font-bold">{result.hours.toLocaleString()}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm">{t.minutes}</p>
                  <p className="text-white text-2xl font-bold">{result.minutes.toLocaleString()}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm">{t.seconds}</p>
                  <p className="text-white text-2xl font-bold">{(result.minutes * 60).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsDday}</h3>
            <p className="text-dark-300 leading-relaxed">{t.ddayExplanation}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/age`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎂 Age</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/bmi`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚖️ BMI</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href={mainPath} className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}

