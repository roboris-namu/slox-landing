"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  type1: string;
  type1Desc: string;
  type2: string;
  type2Desc: string;
  type3: string;
  type3Desc: string;
  type4: string;
  type4Desc: string;
  result: string;
  of: string;
  is: string;
  increase: string;
  decrease: string;
  from: string;
  to: string;
  whatPercent: string;
  change: string;
  formula: string;
  whatIsPercent: string;
  percentExplanation: string;
  percentFormula: string;
  example: string;
  examples: string;
  otherTools: string;
  backToMain: string;
}> = {
  ko: {
    title: "퍼센트 계산기",
    subtitle: "다양한 퍼센트 계산을 쉽게 해보세요",
    type1: "A의 B%는?",
    type1Desc: "특정 값의 퍼센트 계산",
    type2: "A에서 B% 증가/감소",
    type2Desc: "할인, 인상 계산",
    type3: "A는 B의 몇 %?",
    type3Desc: "비율 계산",
    type4: "A에서 B로 변화율",
    type4Desc: "증감률 계산",
    result: "결과",
    of: "의",
    is: "는",
    increase: "증가",
    decrease: "감소",
    from: "에서",
    to: "로",
    whatPercent: "몇 %?",
    change: "변화율",
    formula: "계산식",
    whatIsPercent: "퍼센트란?",
    percentExplanation: "퍼센트(%)는 전체를 100으로 보았을 때의 비율을 나타내는 단위입니다.",
    percentFormula: "퍼센트 = (부분 ÷ 전체) × 100",
    example: "예시",
    examples: "실생활 예시",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
  },
  en: {
    title: "Percentage Calculator",
    subtitle: "Calculate percentages easily",
    type1: "What is B% of A?",
    type1Desc: "Calculate percentage of a value",
    type2: "A +/- B%",
    type2Desc: "Increase or decrease by percentage",
    type3: "A is what % of B?",
    type3Desc: "Calculate ratio as percentage",
    type4: "Change from A to B",
    type4Desc: "Calculate percentage change",
    result: "Result",
    of: "of",
    is: "is",
    increase: "Increase",
    decrease: "Decrease",
    from: "from",
    to: "to",
    whatPercent: "what %?",
    change: "Change",
    formula: "Formula",
    whatIsPercent: "What is Percentage?",
    percentExplanation: "Percentage (%) is a ratio expressed as a fraction of 100.",
    percentFormula: "Percentage = (Part ÷ Whole) × 100",
    example: "Example",
    examples: "Real-life Examples",
    otherTools: "Other Tools",
    backToMain: "← Back",
  },
  ja: {
    title: "パーセント計算機",
    subtitle: "様々なパーセント計算を簡単に",
    type1: "AのB%は？",
    type1Desc: "特定値のパーセント計算",
    type2: "A±B%",
    type2Desc: "割引・増加計算",
    type3: "AはBの何%？",
    type3Desc: "比率計算",
    type4: "AからBへの変化率",
    type4Desc: "増減率計算",
    result: "結果",
    of: "の",
    is: "は",
    increase: "増加",
    decrease: "減少",
    from: "から",
    to: "へ",
    whatPercent: "何%？",
    change: "変化率",
    formula: "計算式",
    whatIsPercent: "パーセントとは？",
    percentExplanation: "パーセント(%)は、全体を100とした時の割合を表す単位です。",
    percentFormula: "パーセント = (部分 ÷ 全体) × 100",
    example: "例",
    examples: "日常での例",
    otherTools: "他のツール",
    backToMain: "← 戻る",
  },
  zh: {
    title: "百分比计算器",
    subtitle: "轻松计算各种百分比",
    type1: "A的B%是多少？",
    type1Desc: "计算特定值的百分比",
    type2: "A增减B%",
    type2Desc: "折扣、涨幅计算",
    type3: "A是B的百分之几？",
    type3Desc: "比率计算",
    type4: "从A到B的变化率",
    type4Desc: "增减率计算",
    result: "结果",
    of: "的",
    is: "是",
    increase: "增加",
    decrease: "减少",
    from: "从",
    to: "到",
    whatPercent: "百分之几？",
    change: "变化率",
    formula: "公式",
    whatIsPercent: "什么是百分比？",
    percentExplanation: "百分比(%)是以100为基数表示比例的单位。",
    percentFormula: "百分比 = (部分 ÷ 整体) × 100",
    example: "例子",
    examples: "生活实例",
    otherTools: "其他工具",
    backToMain: "← 返回",
  },
  es: {
    title: "Calculadora de Porcentaje",
    subtitle: "Calcula porcentajes fácilmente",
    type1: "¿Cuál es el B% de A?",
    type1Desc: "Calcular porcentaje de un valor",
    type2: "A +/- B%",
    type2Desc: "Aumento o descuento",
    type3: "¿A es qué % de B?",
    type3Desc: "Calcular ratio como porcentaje",
    type4: "Cambio de A a B",
    type4Desc: "Calcular cambio porcentual",
    result: "Resultado",
    of: "de",
    is: "es",
    increase: "Aumento",
    decrease: "Descuento",
    from: "de",
    to: "a",
    whatPercent: "¿qué %?",
    change: "Cambio",
    formula: "Fórmula",
    whatIsPercent: "¿Qué es Porcentaje?",
    percentExplanation: "El porcentaje (%) es una proporción expresada como fracción de 100.",
    percentFormula: "Porcentaje = (Parte ÷ Total) × 100",
    example: "Ejemplo",
    examples: "Ejemplos Prácticos",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
  },
  pt: {
    title: "Calculadora de Porcentagem",
    subtitle: "Calcule porcentagens facilmente",
    type1: "Quanto é B% de A?",
    type1Desc: "Calcular porcentagem de um valor",
    type2: "A +/- B%",
    type2Desc: "Aumento ou desconto",
    type3: "A é quantos % de B?",
    type3Desc: "Calcular proporção como porcentagem",
    type4: "Variação de A para B",
    type4Desc: "Calcular variação percentual",
    result: "Resultado",
    of: "de",
    is: "é",
    increase: "Aumento",
    decrease: "Desconto",
    from: "de",
    to: "para",
    whatPercent: "quantos %?",
    change: "Variação",
    formula: "Fórmula",
    whatIsPercent: "O que é Porcentagem?",
    percentExplanation: "Porcentagem (%) é uma proporção expressa como fração de 100.",
    percentFormula: "Porcentagem = (Parte ÷ Total) × 100",
    example: "Exemplo",
    examples: "Exemplos Práticos",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
  },
  de: {
    title: "Prozentrechner",
    subtitle: "Prozente einfach berechnen",
    type1: "Was ist B% von A?",
    type1Desc: "Prozent eines Wertes berechnen",
    type2: "A +/- B%",
    type2Desc: "Erhöhung oder Rabatt",
    type3: "A ist wie viel % von B?",
    type3Desc: "Verhältnis als Prozent berechnen",
    type4: "Änderung von A zu B",
    type4Desc: "Prozentuale Änderung berechnen",
    result: "Ergebnis",
    of: "von",
    is: "ist",
    increase: "Erhöhung",
    decrease: "Rabatt",
    from: "von",
    to: "zu",
    whatPercent: "wie viel %?",
    change: "Änderung",
    formula: "Formel",
    whatIsPercent: "Was ist Prozent?",
    percentExplanation: "Prozent (%) ist ein Verhältnis ausgedrückt als Bruch von 100.",
    percentFormula: "Prozent = (Teil ÷ Ganzes) × 100",
    example: "Beispiel",
    examples: "Praktische Beispiele",
    otherTools: "Andere Tools",
    backToMain: "← Zurück",
  },
  fr: {
    title: "Calculateur de Pourcentage",
    subtitle: "Calculez les pourcentages facilement",
    type1: "Quel est B% de A?",
    type1Desc: "Calculer le pourcentage d'une valeur",
    type2: "A +/- B%",
    type2Desc: "Augmentation ou remise",
    type3: "A est quel % de B?",
    type3Desc: "Calculer le ratio en pourcentage",
    type4: "Variation de A a B",
    type4Desc: "Calculer la variation en pourcentage",
    result: "Resultat",
    of: "de",
    is: "est",
    increase: "Augmentation",
    decrease: "Remise",
    from: "de",
    to: "a",
    whatPercent: "quel %?",
    change: "Variation",
    formula: "Formule",
    whatIsPercent: "Qu'est-ce que le Pourcentage?",
    percentExplanation: "Le pourcentage (%) est un rapport exprime en fraction de 100.",
    percentFormula: "Pourcentage = (Partie / Total) x 100",
    example: "Exemple",
    examples: "Exemples Pratiques",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
  },
};

interface PercentCalculatorProps {
  lang?: Lang;
}

export default function PercentCalculator({ lang = "ko" }: PercentCalculatorProps) {
  const t = translations[lang];
  const [calcType, setCalcType] = useState<1 | 2 | 3 | 4>(1);
  const [valueA, setValueA] = useState<string>("100");
  const [valueB, setValueB] = useState<string>("20");
  const [isIncrease, setIsIncrease] = useState(true);

  const result = useMemo(() => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b)) return null;

    switch (calcType) {
      case 1: // A의 B%
        return { value: (a * b) / 100, formula: `${a} × ${b}% = ${((a * b) / 100).toLocaleString()}` };
      case 2: // A에서 B% 증가/감소
        const change = (a * b) / 100;
        const result2 = isIncrease ? a + change : a - change;
        return { value: result2, formula: `${a} ${isIncrease ? "+" : "-"} ${change.toLocaleString()} = ${result2.toLocaleString()}` };
      case 3: // A는 B의 몇 %?
        if (b === 0) return null;
        const ratio = (a / b) * 100;
        return { value: ratio, formula: `(${a} ÷ ${b}) × 100 = ${ratio.toFixed(2)}%` };
      case 4: // A에서 B로 변화율
        if (a === 0) return null;
        const changeRate = ((b - a) / a) * 100;
        return { value: changeRate, formula: `((${b} - ${a}) ÷ ${a}) × 100 = ${changeRate > 0 ? "+" : ""}${changeRate.toFixed(2)}%` };
      default:
        return null;
    }
  }, [calcType, valueA, valueB, isIncrease]);

  const mainPath = lang === "ko" ? "/" : `/${lang}`;

  const calcTypes = [
    { id: 1, label: t.type1, desc: t.type1Desc, emoji: "🔢" },
    { id: 2, label: t.type2, desc: t.type2Desc, emoji: "📊" },
    { id: 3, label: t.type3, desc: t.type3Desc, emoji: "📈" },
    { id: 4, label: t.type4, desc: t.type4Desc, emoji: "📉" },
  ];

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
            <Link href={mainPath} className="text-dark-300 hover:text-white transition-colors text-sm">
              {t.backToMain}
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-purple-400 text-sm font-medium">🔢 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {calcTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCalcType(type.id as 1 | 2 | 3 | 4)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    calcType === type.id
                      ? "bg-purple-600/20 border-purple-500 text-white"
                      : "bg-dark-800/50 border-dark-700 text-dark-300 hover:border-dark-600"
                  }`}
                >
                  <div className="text-2xl mb-2">{type.emoji}</div>
                  <p className="font-medium text-sm">{type.label}</p>
                  <p className="text-xs text-dark-400 mt-1">{type.desc}</p>
                </button>
              ))}
            </div>

            <div className="bg-dark-800/50 p-6 rounded-xl border border-dark-700">
              {calcType === 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 text-xl">
                  <input
                    type="number"
                    value={valueA}
                    onChange={(e) => setValueA(e.target.value)}
                    className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">{t.of}</span>
                  <input
                    type="number"
                    value={valueB}
                    onChange={(e) => setValueB(e.target.value)}
                    className="w-24 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">%</span>
                </div>
              )}

              {calcType === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xl">
                    <input
                      type="number"
                      value={valueA}
                      onChange={(e) => setValueA(e.target.value)}
                      className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <span className="text-dark-400">{t.from}</span>
                    <input
                      type="number"
                      value={valueB}
                      onChange={(e) => setValueB(e.target.value)}
                      className="w-24 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <span className="text-dark-400">%</span>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setIsIncrease(true)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        isIncrease ? "bg-green-600 text-white" : "bg-dark-700 text-dark-300"
                      }`}
                    >
                      ⬆️ {t.increase}
                    </button>
                    <button
                      onClick={() => setIsIncrease(false)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        !isIncrease ? "bg-red-600 text-white" : "bg-dark-700 text-dark-300"
                      }`}
                    >
                      ⬇️ {t.decrease}
                    </button>
                  </div>
                </div>
              )}

              {calcType === 3 && (
                <div className="flex flex-wrap items-center justify-center gap-3 text-xl">
                  <input
                    type="number"
                    value={valueA}
                    onChange={(e) => setValueA(e.target.value)}
                    className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">{t.is}</span>
                  <input
                    type="number"
                    value={valueB}
                    onChange={(e) => setValueB(e.target.value)}
                    className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">{t.of}</span>
                  <span className="text-dark-400">{t.whatPercent}</span>
                </div>
              )}

              {calcType === 4 && (
                <div className="flex flex-wrap items-center justify-center gap-3 text-xl">
                  <input
                    type="number"
                    value={valueA}
                    onChange={(e) => setValueA(e.target.value)}
                    className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">{t.from}</span>
                  <input
                    type="number"
                    value={valueB}
                    onChange={(e) => setValueB(e.target.value)}
                    className="w-28 p-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  <span className="text-dark-400">{t.to} → {t.change}</span>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="glass-card p-6 rounded-xl mb-8">
              <h2 className="text-xl font-bold text-white mb-4 text-center">{t.result}</h2>
              <div className="text-center">
                <div className={`text-5xl font-bold mb-4 ${
                  calcType === 4
                    ? result.value >= 0 ? "text-green-400" : "text-red-400"
                    : "text-purple-400"
                }`}>
                  {calcType === 3 || calcType === 4 ? `${result.value.toFixed(2)}%` : result.value.toLocaleString()}
                </div>
                <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 inline-block">
                  <p className="text-dark-400 text-sm">{t.formula}</p>
                  <p className="text-white font-mono">{result.formula}</p>
                </div>
              </div>
            </div>
          )}

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsPercent}</h3>
            <p className="text-dark-300 leading-relaxed mb-4">{t.percentExplanation}</p>
            <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
              <p className="text-white font-mono text-center text-lg">{t.percentFormula}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/bmi`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚖️ BMI</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/age`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎂 Age</Link>
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

