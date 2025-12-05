"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  height: string;
  weight: string;
  result: string;
  normalRange: string;
  idealWeight: string;
  difference: string;
  underweight: string;
  normal: string;
  overweight: string;
  obese: string;
  severelyObese: string;
  categories: string;
  bmiRange: string;
  description: string;
  whatIsBmi: string;
  bmiExplanation: string;
  formula: string;
  note: string;
  otherTools: string;
  backToMain: string;
  cm: string;
  kg: string;
  years: string;
}> = {
  ko: {
    title: "BMI 계산기",
    subtitle: "키와 체중으로 체질량지수를 계산하세요",
    height: "키",
    weight: "체중",
    result: "측정 결과",
    normalRange: "적정 체중 범위",
    idealWeight: "이상적 체중 (BMI 22)",
    difference: "현재 vs 이상 체중",
    underweight: "저체중",
    normal: "정상",
    overweight: "과체중",
    obese: "비만",
    severelyObese: "고도비만",
    categories: "BMI 분류 기준",
    bmiRange: "BMI 범위",
    description: "설명",
    whatIsBmi: "BMI란?",
    bmiExplanation: "BMI(Body Mass Index, 체질량지수)는 체중(kg)을 키(m)의 제곱으로 나눈 값으로, 비만도를 간단하게 측정하는 지표입니다.",
    formula: "BMI = 체중(kg) ÷ 키(m)²",
    note: "※ BMI는 간편한 지표이지만, 근육량이 많은 운동선수나 노인, 임산부 등에게는 정확하지 않을 수 있습니다.",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
    cm: "cm",
    kg: "kg",
    years: "세",
  },
  en: {
    title: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index with height and weight",
    height: "Height",
    weight: "Weight",
    result: "Result",
    normalRange: "Normal Weight Range",
    idealWeight: "Ideal Weight (BMI 22)",
    difference: "Current vs Ideal",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
    severelyObese: "Severely Obese",
    categories: "BMI Categories",
    bmiRange: "BMI Range",
    description: "Description",
    whatIsBmi: "What is BMI?",
    bmiExplanation: "BMI (Body Mass Index) is a value derived from weight(kg) divided by height(m) squared, used as a simple indicator of body fat.",
    formula: "BMI = Weight(kg) ÷ Height(m)²",
    note: "※ BMI may not be accurate for athletes, elderly, or pregnant women.",
    otherTools: "Other Tools",
    backToMain: "← Back",
    cm: "cm",
    kg: "kg",
    years: "years",
  },
  ja: {
    title: "BMI計算機",
    subtitle: "身長と体重からBMIを計算",
    height: "身長",
    weight: "体重",
    result: "結果",
    normalRange: "適正体重範囲",
    idealWeight: "理想体重 (BMI 22)",
    difference: "現在 vs 理想",
    underweight: "低体重",
    normal: "普通",
    overweight: "過体重",
    obese: "肥満",
    severelyObese: "高度肥満",
    categories: "BMI分類基準",
    bmiRange: "BMI範囲",
    description: "説明",
    whatIsBmi: "BMIとは？",
    bmiExplanation: "BMI（ボディマス指数）は、体重(kg)を身長(m)の2乗で割った値で、肥満度を簡単に測定する指標です。",
    formula: "BMI = 体重(kg) ÷ 身長(m)²",
    note: "※ BMIはスポーツ選手、高齢者、妊婦には正確でない場合があります。",
    otherTools: "他のツール",
    backToMain: "← 戻る",
    cm: "cm",
    kg: "kg",
    years: "歳",
  },
  zh: {
    title: "BMI计算器",
    subtitle: "通过身高体重计算身体质量指数",
    height: "身高",
    weight: "体重",
    result: "结果",
    normalRange: "正常体重范围",
    idealWeight: "理想体重 (BMI 22)",
    difference: "当前 vs 理想",
    underweight: "体重过轻",
    normal: "正常",
    overweight: "超重",
    obese: "肥胖",
    severelyObese: "重度肥胖",
    categories: "BMI分类标准",
    bmiRange: "BMI范围",
    description: "说明",
    whatIsBmi: "什么是BMI？",
    bmiExplanation: "BMI（身体质量指数）是体重(kg)除以身高(m)的平方，是衡量肥胖程度的简单指标。",
    formula: "BMI = 体重(kg) ÷ 身高(m)²",
    note: "※ BMI对运动员、老人、孕妇可能不准确。",
    otherTools: "其他工具",
    backToMain: "← 返回",
    cm: "cm",
    kg: "kg",
    years: "岁",
  },
  es: {
    title: "Calculadora de IMC",
    subtitle: "Calcula tu Índice de Masa Corporal",
    height: "Altura",
    weight: "Peso",
    result: "Resultado",
    normalRange: "Rango de Peso Normal",
    idealWeight: "Peso Ideal (IMC 22)",
    difference: "Actual vs Ideal",
    underweight: "Bajo peso",
    normal: "Normal",
    overweight: "Sobrepeso",
    obese: "Obesidad",
    severelyObese: "Obesidad severa",
    categories: "Categorías de IMC",
    bmiRange: "Rango IMC",
    description: "Descripción",
    whatIsBmi: "¿Qué es el IMC?",
    bmiExplanation: "El IMC (Índice de Masa Corporal) es el peso(kg) dividido por la altura(m) al cuadrado, un indicador simple de grasa corporal.",
    formula: "IMC = Peso(kg) ÷ Altura(m)²",
    note: "※ El IMC puede no ser preciso para atletas, ancianos o embarazadas.",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
    cm: "cm",
    kg: "kg",
    years: "años",
  },
  pt: {
    title: "Calculadora de IMC",
    subtitle: "Calcule seu Índice de Massa Corporal",
    height: "Altura",
    weight: "Peso",
    result: "Resultado",
    normalRange: "Faixa de Peso Normal",
    idealWeight: "Peso Ideal (IMC 22)",
    difference: "Atual vs Ideal",
    underweight: "Abaixo do peso",
    normal: "Normal",
    overweight: "Sobrepeso",
    obese: "Obesidade",
    severelyObese: "Obesidade severa",
    categories: "Categorias de IMC",
    bmiRange: "Faixa IMC",
    description: "Descrição",
    whatIsBmi: "O que é IMC?",
    bmiExplanation: "O IMC (Índice de Massa Corporal) é o peso(kg) dividido pela altura(m) ao quadrado, um indicador simples de gordura corporal.",
    formula: "IMC = Peso(kg) ÷ Altura(m)²",
    note: "※ O IMC pode não ser preciso para atletas, idosos ou grávidas.",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
    cm: "cm",
    kg: "kg",
    years: "anos",
  },
  de: {
    title: "BMI-Rechner",
    subtitle: "Berechnen Sie Ihren Body-Mass-Index",
    height: "Größe",
    weight: "Gewicht",
    result: "Ergebnis",
    normalRange: "Normalgewicht-Bereich",
    idealWeight: "Idealgewicht (BMI 22)",
    difference: "Aktuell vs Ideal",
    underweight: "Untergewicht",
    normal: "Normalgewicht",
    overweight: "Übergewicht",
    obese: "Adipositas",
    severelyObese: "Schwere Adipositas",
    categories: "BMI-Kategorien",
    bmiRange: "BMI-Bereich",
    description: "Beschreibung",
    whatIsBmi: "Was ist BMI?",
    bmiExplanation: "Der BMI (Body-Mass-Index) ist das Gewicht(kg) geteilt durch die Größe(m) zum Quadrat, ein einfacher Indikator für Körperfett.",
    formula: "BMI = Gewicht(kg) ÷ Größe(m)²",
    note: "※ Der BMI ist möglicherweise nicht genau für Sportler, ältere Menschen oder Schwangere.",
    otherTools: "Andere Tools",
    backToMain: "← Zurück",
    cm: "cm",
    kg: "kg",
    years: "Jahre",
  },
  fr: {
    title: "Calculateur d'IMC",
    subtitle: "Calculez votre Indice de Masse Corporelle",
    height: "Taille",
    weight: "Poids",
    result: "Résultat",
    normalRange: "Poids Normal",
    idealWeight: "Poids Idéal (IMC 22)",
    difference: "Actuel vs Idéal",
    underweight: "Insuffisance pondérale",
    normal: "Normal",
    overweight: "Surpoids",
    obese: "Obésité",
    severelyObese: "Obésité sévère",
    categories: "Catégories d'IMC",
    bmiRange: "Plage IMC",
    description: "Description",
    whatIsBmi: "Qu'est-ce que l'IMC?",
    bmiExplanation: "L'IMC (Indice de Masse Corporelle) est le poids(kg) divisé par la taille(m) au carré, un indicateur simple de graisse corporelle.",
    formula: "IMC = Poids(kg) ÷ Taille(m)²",
    note: "※ L'IMC peut ne pas être précis pour les athlètes, les personnes âgées ou les femmes enceintes.",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
    cm: "cm",
    kg: "kg",
    years: "ans",
  },
};

interface BMICalculatorProps {
  lang?: Lang;
}

// 언어 선택 옵션
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

export default function BMICalculator({ lang = "ko" }: BMICalculatorProps) {
  const [currentLang, setCurrentLang] = useState<Lang>(lang);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[currentLang];
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("70");

  const handleLanguageChange = (newLang: Lang) => {
    setCurrentLang(newLang);
    setShowLangMenu(false);
    // URL 변경
    const basePath = newLang === "ko" ? "/bmi" : `/${newLang}/bmi`;
    window.history.pushState({}, "", basePath);
  };

  const result = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;

    const bmi = w / (h * h);
    const minWeight = 18.5 * h * h;
    const maxWeight = 23 * h * h;
    const idealWeight = 22 * h * h;

    let category: string;
    let color: string;
    let emoji: string;

    if (bmi < 18.5) {
      category = t.underweight;
      color = "text-blue-400";
      emoji = "🥶";
    } else if (bmi < 23) {
      category = t.normal;
      color = "text-green-400";
      emoji = "😊";
    } else if (bmi < 25) {
      category = t.overweight;
      color = "text-yellow-400";
      emoji = "😐";
    } else if (bmi < 30) {
      category = t.obese;
      color = "text-orange-400";
      emoji = "😟";
    } else {
      category = t.severelyObese;
      color = "text-red-400";
      emoji = "😰";
    }

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
      emoji,
      minWeight: parseFloat(minWeight.toFixed(1)),
      maxWeight: parseFloat(maxWeight.toFixed(1)),
      idealWeight: parseFloat(idealWeight.toFixed(1)),
    };
  }, [height, weight, t]);

  const weightDiff = result ? parseFloat(weight) - result.idealWeight : 0;
  const gaugePosition = useMemo(() => {
    if (!result) return 50;
    const pos = ((result.bmi - 15) / 20) * 100;
    return Math.max(0, Math.min(100, pos));
  }, [result]);

  const quickHeights = [150, 160, 165, 170, 175, 180, 185];
  const quickWeights = [50, 60, 70, 80, 90, 100];
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
              {/* 언어 선택 드롭다운 */}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <span className="text-pink-400 text-sm font-medium">⚖️ {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">{t.height} ({t.cm})</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickHeights.map((h) => (
                    <button
                      key={h}
                      onClick={() => setHeight(h.toString())}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        height === h.toString() ? "bg-pink-600 text-white" : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">{t.weight} ({t.kg})</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white text-lg focus:ring-2 focus:ring-pink-500 outline-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickWeights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w.toString())}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        weight === w.toString() ? "bg-pink-600 text-white" : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {result && (
            <div className="glass-card p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">{t.result}</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-white mb-2">{result.bmi}</div>
                <div className={`text-2xl font-semibold ${result.color} flex items-center justify-center gap-2`}>
                  <span className="text-3xl">{result.emoji}</span>
                  {result.category}
                </div>
              </div>

              <div className="mb-8">
                <div className="relative h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500">
                  <div
                    className="absolute top-0 w-1 h-full bg-white shadow-lg transition-all duration-300"
                    style={{ left: `${gaugePosition}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-dark-900 text-xs font-bold px-2 py-1 rounded">
                      {result.bmi}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.normalRange}</p>
                  <p className="text-white text-xl font-bold">{result.minWeight} ~ {result.maxWeight}{t.kg}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.idealWeight}</p>
                  <p className="text-green-400 text-xl font-bold">{result.idealWeight}{t.kg}</p>
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 text-center">
                  <p className="text-dark-400 text-sm mb-1">{t.difference}</p>
                  <p className={`text-xl font-bold ${weightDiff > 0 ? "text-red-400" : weightDiff < 0 ? "text-blue-400" : "text-green-400"}`}>
                    {weightDiff > 0 ? "+" : ""}{weightDiff.toFixed(1)}{t.kg}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsBmi}</h3>
            <p className="text-dark-300 leading-relaxed mb-4">{t.bmiExplanation}</p>
            <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
              <p className="text-white font-mono text-center text-lg">{t.formula}</p>
            </div>
            <p className="text-dark-400 text-sm mt-4">{t.note}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/age`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎂 Age</Link>
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

