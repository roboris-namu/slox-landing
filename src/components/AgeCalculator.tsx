"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  birthdate: string;
  calculate: string;
  intlAge: string;
  koreanAge: string;
  nextBirthday: string;
  daysLived: string;
  hoursLived: string;
  zodiac: string;
  years: string;
  days: string;
  hours: string;
  birthdayToday: string;
  daysUntil: string;
  otherTools: string;
  backToMain: string;
  zodiacSigns: Record<string, string>;
}> = {
  ko: {
    title: "나이 계산기",
    subtitle: "생년월일을 입력하면 나이를 계산합니다",
    birthdate: "생년월일",
    calculate: "계산하기",
    intlAge: "만 나이",
    koreanAge: "한국 나이",
    nextBirthday: "다음 생일까지",
    daysLived: "살아온 일수",
    hoursLived: "살아온 시간",
    zodiac: "띠",
    years: "세",
    days: "일",
    hours: "시간",
    birthdayToday: "🎉 오늘이 생일이에요!",
    daysUntil: "일 남음",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
    zodiacSigns: {
      rat: "🐀 쥐띠", ox: "🐂 소띠", tiger: "🐅 호랑이띠", rabbit: "🐇 토끼띠",
      dragon: "🐉 용띠", snake: "🐍 뱀띠", horse: "🐴 말띠", goat: "🐐 양띠",
      monkey: "🐵 원숭이띠", rooster: "🐔 닭띠", dog: "🐕 개띠", pig: "🐷 돼지띠"
    }
  },
  en: {
    title: "Age Calculator",
    subtitle: "Enter your birthdate to calculate your age",
    birthdate: "Birthdate",
    calculate: "Calculate",
    intlAge: "Age",
    koreanAge: "Korean Age",
    nextBirthday: "Next Birthday",
    daysLived: "Days Lived",
    hoursLived: "Hours Lived",
    zodiac: "Chinese Zodiac",
    years: "years",
    days: "days",
    hours: "hours",
    birthdayToday: "🎉 Today is your birthday!",
    daysUntil: "days left",
    otherTools: "Other Tools",
    backToMain: "← Back to Main",
    zodiacSigns: {
      rat: "🐀 Rat", ox: "🐂 Ox", tiger: "🐅 Tiger", rabbit: "🐇 Rabbit",
      dragon: "🐉 Dragon", snake: "🐍 Snake", horse: "🐴 Horse", goat: "🐐 Goat",
      monkey: "🐵 Monkey", rooster: "🐔 Rooster", dog: "🐕 Dog", pig: "🐷 Pig"
    }
  },
  ja: {
    title: "年齢計算機",
    subtitle: "生年月日を入力して年齢を計算",
    birthdate: "生年月日",
    calculate: "計算する",
    intlAge: "満年齢",
    koreanAge: "数え年",
    nextBirthday: "次の誕生日まで",
    daysLived: "生きた日数",
    hoursLived: "生きた時間",
    zodiac: "干支",
    years: "歳",
    days: "日",
    hours: "時間",
    birthdayToday: "🎉 今日はお誕生日です！",
    daysUntil: "日後",
    otherTools: "他のツール",
    backToMain: "← メインへ",
    zodiacSigns: {
      rat: "🐀 子", ox: "🐂 丑", tiger: "🐅 寅", rabbit: "🐇 卯",
      dragon: "🐉 辰", snake: "🐍 巳", horse: "🐴 午", goat: "🐐 未",
      monkey: "🐵 申", rooster: "🐔 酉", dog: "🐕 戌", pig: "🐷 亥"
    }
  },
  zh: {
    title: "年龄计算器",
    subtitle: "输入出生日期计算年龄",
    birthdate: "出生日期",
    calculate: "计算",
    intlAge: "周岁",
    koreanAge: "虚岁",
    nextBirthday: "距下次生日",
    daysLived: "已活天数",
    hoursLived: "已活小时",
    zodiac: "生肖",
    years: "岁",
    days: "天",
    hours: "小时",
    birthdayToday: "🎉 今天是你的生日！",
    daysUntil: "天",
    otherTools: "其他工具",
    backToMain: "← 返回首页",
    zodiacSigns: {
      rat: "🐀 鼠", ox: "🐂 牛", tiger: "🐅 虎", rabbit: "🐇 兔",
      dragon: "🐉 龙", snake: "🐍 蛇", horse: "🐴 马", goat: "🐐 羊",
      monkey: "🐵 猴", rooster: "🐔 鸡", dog: "🐕 狗", pig: "🐷 猪"
    }
  },
  es: {
    title: "Calculadora de Edad",
    subtitle: "Ingresa tu fecha de nacimiento para calcular tu edad",
    birthdate: "Fecha de Nacimiento",
    calculate: "Calcular",
    intlAge: "Edad",
    koreanAge: "Edad Coreana",
    nextBirthday: "Próximo Cumpleaños",
    daysLived: "Días Vividos",
    hoursLived: "Horas Vividas",
    zodiac: "Zodiaco Chino",
    years: "años",
    days: "días",
    hours: "horas",
    birthdayToday: "🎉 ¡Hoy es tu cumpleaños!",
    daysUntil: "días restantes",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
    zodiacSigns: {
      rat: "🐀 Rata", ox: "🐂 Buey", tiger: "🐅 Tigre", rabbit: "🐇 Conejo",
      dragon: "🐉 Dragón", snake: "🐍 Serpiente", horse: "🐴 Caballo", goat: "🐐 Cabra",
      monkey: "🐵 Mono", rooster: "🐔 Gallo", dog: "🐕 Perro", pig: "🐷 Cerdo"
    }
  },
  pt: {
    title: "Calculadora de Idade",
    subtitle: "Digite sua data de nascimento para calcular sua idade",
    birthdate: "Data de Nascimento",
    calculate: "Calcular",
    intlAge: "Idade",
    koreanAge: "Idade Coreana",
    nextBirthday: "Próximo Aniversário",
    daysLived: "Dias Vividos",
    hoursLived: "Horas Vividas",
    zodiac: "Zodíaco Chinês",
    years: "anos",
    days: "dias",
    hours: "horas",
    birthdayToday: "🎉 Hoje é seu aniversário!",
    daysUntil: "dias restantes",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
    zodiacSigns: {
      rat: "🐀 Rato", ox: "🐂 Boi", tiger: "🐅 Tigre", rabbit: "🐇 Coelho",
      dragon: "🐉 Dragão", snake: "🐍 Serpente", horse: "🐴 Cavalo", goat: "🐐 Cabra",
      monkey: "🐵 Macaco", rooster: "🐔 Galo", dog: "🐕 Cão", pig: "🐷 Porco"
    }
  },
  de: {
    title: "Altersrechner",
    subtitle: "Geben Sie Ihr Geburtsdatum ein",
    birthdate: "Geburtsdatum",
    calculate: "Berechnen",
    intlAge: "Alter",
    koreanAge: "Koreanisches Alter",
    nextBirthday: "Nächster Geburtstag",
    daysLived: "Gelebte Tage",
    hoursLived: "Gelebte Stunden",
    zodiac: "Chinesisches Tierzeichen",
    years: "Jahre",
    days: "Tage",
    hours: "Stunden",
    birthdayToday: "🎉 Heute ist dein Geburtstag!",
    daysUntil: "Tage übrig",
    otherTools: "Andere Tools",
    backToMain: "← Zurück",
    zodiacSigns: {
      rat: "🐀 Ratte", ox: "🐂 Ochse", tiger: "🐅 Tiger", rabbit: "🐇 Hase",
      dragon: "🐉 Drache", snake: "🐍 Schlange", horse: "🐴 Pferd", goat: "🐐 Ziege",
      monkey: "🐵 Affe", rooster: "🐔 Hahn", dog: "🐕 Hund", pig: "🐷 Schwein"
    }
  },
  fr: {
    title: "Calculateur d'Âge",
    subtitle: "Entrez votre date de naissance pour calculer votre âge",
    birthdate: "Date de Naissance",
    calculate: "Calculer",
    intlAge: "Âge",
    koreanAge: "Âge Coréen",
    nextBirthday: "Prochain Anniversaire",
    daysLived: "Jours Vécus",
    hoursLived: "Heures Vécues",
    zodiac: "Zodiaque Chinois",
    years: "ans",
    days: "jours",
    hours: "heures",
    birthdayToday: "🎉 C'est votre anniversaire!",
    daysUntil: "jours restants",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
    zodiacSigns: {
      rat: "🐀 Rat", ox: "🐂 Bœuf", tiger: "🐅 Tigre", rabbit: "🐇 Lapin",
      dragon: "🐉 Dragon", snake: "🐍 Serpent", horse: "🐴 Cheval", goat: "🐐 Chèvre",
      monkey: "🐵 Singe", rooster: "🐔 Coq", dog: "🐕 Chien", pig: "🐷 Cochon"
    }
  }
};

const zodiacOrder = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

const getZodiac = (year: number): string => {
  return zodiacOrder[(year - 4) % 12];
};

interface AgeCalculatorProps {
  lang?: Lang;
}

// 년도 옵션 생성 (1900 ~ 현재년도)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

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

export default function AgeCalculator({ lang = "ko" }: AgeCalculatorProps) {
  const [currentLang, setCurrentLang] = useState<Lang>(lang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[currentLang];

  const handleLanguageChange = (newLang: Lang) => {
    setCurrentLang(newLang);
    setShowLangMenu(false);
    const basePath = newLang === "ko" ? "/age" : `/${newLang}/age`;
    window.history.pushState({}, "", basePath);
  };
  const [birthYear, setBirthYear] = useState<number | "">("");
  const [birthMonth, setBirthMonth] = useState<number | "">("");
  const [birthDay, setBirthDay] = useState<number | "">("");
  
  // 선택한 년/월에 따른 일수 계산
  const days = useMemo(() => {
    if (birthYear && birthMonth) {
      const daysInMonth = getDaysInMonth(birthYear as number, birthMonth as number);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  // 일수가 변경되면 선택된 일이 범위를 벗어나면 조정
  useEffect(() => {
    if (birthDay && days.length < (birthDay as number)) {
      setBirthDay(days.length);
    }
  }, [days, birthDay]);

  const result = useMemo(() => {
    if (!birthYear || !birthMonth || !birthDay) return null;

    const birth = new Date(birthYear as number, (birthMonth as number) - 1, birthDay as number);
    const today = new Date();
    
    // 만 나이 계산
    let intlAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      intlAge--;
    }

    // 한국 나이 (2023년부터 만 나이 통일, 하지만 전통 방식도 표시)
    const koreanAge = today.getFullYear() - birth.getFullYear() + 1;

    // 다음 생일까지
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isBirthdayToday = today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate();

    // 살아온 일수/시간
    const daysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const hoursLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60));

    // 띠
    const zodiac = getZodiac(birth.getFullYear());

    return {
      intlAge,
      koreanAge,
      daysUntilBirthday,
      isBirthdayToday,
      daysLived,
      hoursLived,
      zodiac,
      birthYear: birth.getFullYear()
    };
  }, [birthYear, birthMonth, birthDay]);

  const mainPath = currentLang === "ko" ? "/" : `/${currentLang}`;
  const currentLangOption = languageOptions.find(l => l.code === currentLang);

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={mainPath} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
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
                      <button
                        key={option.code}
                        onClick={() => handleLanguageChange(option.code)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          currentLang === option.code ? 'bg-dark-700 text-white' : 'text-dark-300'
                        }`}
                      >
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </button>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
              <span className="text-rose-400 text-sm font-medium">🎂 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          {/* 입력 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <label className="block text-dark-300 text-sm font-medium mb-4">
              {t.birthdate}
            </label>
            <div className="flex gap-3 items-center justify-center flex-wrap">
              {/* 년도 선택 */}
              <div className="relative">
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : "")}
                  className="appearance-none w-28 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all cursor-pointer hover:border-rose-500/50 pr-8"
                >
                  <option value="">{lang === "ko" ? "년도" : "Year"}</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
                  ▼
                </div>
              </div>
              <span className="text-dark-400 text-lg">{lang === "ko" || lang === "ja" || lang === "zh" ? "년" : "/"}</span>

              {/* 월 선택 */}
              <div className="relative">
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value ? Number(e.target.value) : "")}
                  className="appearance-none w-24 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all cursor-pointer hover:border-rose-500/50 pr-8"
                >
                  <option value="">{lang === "ko" ? "월" : "Month"}</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
                  ▼
                </div>
              </div>
              <span className="text-dark-400 text-lg">{lang === "ko" || lang === "ja" || lang === "zh" ? "월" : "/"}</span>

              {/* 일 선택 */}
              <div className="relative">
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value ? Number(e.target.value) : "")}
                  className="appearance-none w-24 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all cursor-pointer hover:border-rose-500/50 pr-8"
                >
                  <option value="">{lang === "ko" ? "일" : "Day"}</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
                  ▼
                </div>
              </div>
              <span className="text-dark-400 text-lg">{lang === "ko" || lang === "ja" || lang === "zh" ? "일" : ""}</span>
            </div>
          </div>

          {/* 결과 */}
          {result && (
            <div className="glass-card p-6 rounded-xl mb-8">
              {result.isBirthdayToday && (
                <div className="text-center text-2xl mb-6 animate-bounce">
                  {t.birthdayToday}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.intlAge}</p>
                  <p className="text-rose-400 text-4xl font-bold">{result.intlAge}</p>
                  <p className="text-dark-500 text-sm">{t.years}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.koreanAge}</p>
                  <p className="text-amber-400 text-4xl font-bold">{result.koreanAge}</p>
                  <p className="text-dark-500 text-sm">{t.years}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.nextBirthday}</p>
                  <p className="text-cyan-400 text-4xl font-bold">{result.daysUntilBirthday}</p>
                  <p className="text-dark-500 text-sm">{t.daysUntil}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.daysLived}</p>
                  <p className="text-white text-2xl font-bold">{result.daysLived.toLocaleString()}</p>
                  <p className="text-dark-500 text-sm">{t.days}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.hoursLived}</p>
                  <p className="text-white text-2xl font-bold">{result.hoursLived.toLocaleString()}</p>
                  <p className="text-dark-500 text-sm">{t.hours}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.zodiac}</p>
                  <p className="text-white text-2xl font-bold">{t.zodiacSigns[result.zodiac]}</p>
                  <p className="text-dark-500 text-sm">{result.birthYear}</p>
                </div>
              </div>
            </div>
          )}

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/bmi`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚖️ BMI</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/dday`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📅 D-day</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/reaction`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ Reaction</Link>
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

