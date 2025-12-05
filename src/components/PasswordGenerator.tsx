"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  length: string;
  options: string;
  uppercase: string;
  lowercase: string;
  numbers: string;
  symbols: string;
  generate: string;
  copy: string;
  copied: string;
  strength: string;
  weak: string;
  medium: string;
  strong: string;
  veryStrong: string;
  tips: string;
  tip1: string;
  tip2: string;
  tip3: string;
  tip4: string;
  whatIsPassword: string;
  passwordExplanation: string;
  otherTools: string;
  backToMain: string;
}> = {
  ko: {
    title: "비밀번호 생성기",
    subtitle: "안전한 비밀번호를 쉽게 생성하세요",
    length: "길이",
    options: "옵션",
    uppercase: "대문자 (A-Z)",
    lowercase: "소문자 (a-z)",
    numbers: "숫자 (0-9)",
    symbols: "특수문자 (!@#$...)",
    generate: "새 비밀번호 생성",
    copy: "복사",
    copied: "복사됨!",
    strength: "강도",
    weak: "약함",
    medium: "보통",
    strong: "강함",
    veryStrong: "매우 강함",
    tips: "안전한 비밀번호 팁",
    tip1: "12자 이상 사용하세요",
    tip2: "대소문자, 숫자, 특수문자를 섞으세요",
    tip3: "개인정보(생일, 이름)를 포함하지 마세요",
    tip4: "사이트마다 다른 비밀번호를 사용하세요",
    whatIsPassword: "강력한 비밀번호란?",
    passwordExplanation: "강력한 비밀번호는 해킹으로부터 계정을 보호합니다. 길이가 길고, 다양한 문자를 조합하면 크래킹이 기하급수적으로 어려워집니다.",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
  },
  en: {
    title: "Password Generator",
    subtitle: "Generate secure passwords easily",
    length: "Length",
    options: "Options",
    uppercase: "Uppercase (A-Z)",
    lowercase: "Lowercase (a-z)",
    numbers: "Numbers (0-9)",
    symbols: "Symbols (!@#$...)",
    generate: "Generate New Password",
    copy: "Copy",
    copied: "Copied!",
    strength: "Strength",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    veryStrong: "Very Strong",
    tips: "Secure Password Tips",
    tip1: "Use at least 12 characters",
    tip2: "Mix uppercase, lowercase, numbers, and symbols",
    tip3: "Don't include personal info (birthday, name)",
    tip4: "Use different passwords for each site",
    whatIsPassword: "What is a Strong Password?",
    passwordExplanation: "A strong password protects your accounts from hackers. Longer passwords with diverse characters are exponentially harder to crack.",
    otherTools: "Other Tools",
    backToMain: "← Back",
  },
  ja: {
    title: "パスワード生成機",
    subtitle: "安全なパスワードを簡単に生成",
    length: "長さ",
    options: "オプション",
    uppercase: "大文字 (A-Z)",
    lowercase: "小文字 (a-z)",
    numbers: "数字 (0-9)",
    symbols: "記号 (!@#$...)",
    generate: "新しいパスワードを生成",
    copy: "コピー",
    copied: "コピーしました！",
    strength: "強度",
    weak: "弱い",
    medium: "普通",
    strong: "強い",
    veryStrong: "非常に強い",
    tips: "安全なパスワードのコツ",
    tip1: "12文字以上を使用してください",
    tip2: "大文字、小文字、数字、記号を混ぜてください",
    tip3: "個人情報（誕生日、名前）を含めないでください",
    tip4: "サイトごとに異なるパスワードを使用してください",
    whatIsPassword: "強力なパスワードとは？",
    passwordExplanation: "強力なパスワードはハッカーからアカウントを守ります。長く、多様な文字を組み合わせるほどクラッキングが難しくなります。",
    otherTools: "他のツール",
    backToMain: "← 戻る",
  },
  zh: {
    title: "密码生成器",
    subtitle: "轻松生成安全密码",
    length: "长度",
    options: "选项",
    uppercase: "大写字母 (A-Z)",
    lowercase: "小写字母 (a-z)",
    numbers: "数字 (0-9)",
    symbols: "符号 (!@#$...)",
    generate: "生成新密码",
    copy: "复制",
    copied: "已复制！",
    strength: "强度",
    weak: "弱",
    medium: "中等",
    strong: "强",
    veryStrong: "非常强",
    tips: "安全密码提示",
    tip1: "至少使用12个字符",
    tip2: "混合大小写字母、数字和符号",
    tip3: "不要包含个人信息（生日、姓名）",
    tip4: "为每个网站使用不同的密码",
    whatIsPassword: "什么是强密码？",
    passwordExplanation: "强密码可以保护您的账户免受黑客攻击。密码越长、字符越多样，破解就越困难。",
    otherTools: "其他工具",
    backToMain: "← 返回",
  },
  es: {
    title: "Generador de Contrasenas",
    subtitle: "Genera contrasenas seguras facilmente",
    length: "Longitud",
    options: "Opciones",
    uppercase: "Mayusculas (A-Z)",
    lowercase: "Minusculas (a-z)",
    numbers: "Numeros (0-9)",
    symbols: "Simbolos (!@#$...)",
    generate: "Generar Nueva Contrasena",
    copy: "Copiar",
    copied: "Copiado!",
    strength: "Fortaleza",
    weak: "Debil",
    medium: "Media",
    strong: "Fuerte",
    veryStrong: "Muy Fuerte",
    tips: "Consejos de Contrasenas Seguras",
    tip1: "Usa al menos 12 caracteres",
    tip2: "Mezcla mayusculas, minusculas, numeros y simbolos",
    tip3: "No incluyas informacion personal",
    tip4: "Usa contrasenas diferentes para cada sitio",
    whatIsPassword: "Que es una Contrasena Fuerte?",
    passwordExplanation: "Una contrasena fuerte protege tus cuentas de hackers. Contrasenas mas largas con caracteres diversos son mas dificiles de descifrar.",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
  },
  pt: {
    title: "Gerador de Senhas",
    subtitle: "Gere senhas seguras facilmente",
    length: "Comprimento",
    options: "Opcoes",
    uppercase: "Maiusculas (A-Z)",
    lowercase: "Minusculas (a-z)",
    numbers: "Numeros (0-9)",
    symbols: "Simbolos (!@#$...)",
    generate: "Gerar Nova Senha",
    copy: "Copiar",
    copied: "Copiado!",
    strength: "Forca",
    weak: "Fraca",
    medium: "Media",
    strong: "Forte",
    veryStrong: "Muito Forte",
    tips: "Dicas de Senhas Seguras",
    tip1: "Use pelo menos 12 caracteres",
    tip2: "Misture maiusculas, minusculas, numeros e simbolos",
    tip3: "Nao inclua informacoes pessoais",
    tip4: "Use senhas diferentes para cada site",
    whatIsPassword: "O que e uma Senha Forte?",
    passwordExplanation: "Uma senha forte protege suas contas de hackers. Senhas mais longas com caracteres diversos sao mais dificeis de quebrar.",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
  },
  de: {
    title: "Passwort-Generator",
    subtitle: "Sichere Passworter einfach generieren",
    length: "Lange",
    options: "Optionen",
    uppercase: "Grossbuchstaben (A-Z)",
    lowercase: "Kleinbuchstaben (a-z)",
    numbers: "Zahlen (0-9)",
    symbols: "Symbole (!@#$...)",
    generate: "Neues Passwort generieren",
    copy: "Kopieren",
    copied: "Kopiert!",
    strength: "Starke",
    weak: "Schwach",
    medium: "Mittel",
    strong: "Stark",
    veryStrong: "Sehr Stark",
    tips: "Sichere Passwort-Tipps",
    tip1: "Verwenden Sie mindestens 12 Zeichen",
    tip2: "Mischen Sie Gross-, Kleinbuchstaben, Zahlen und Symbole",
    tip3: "Keine personlichen Informationen verwenden",
    tip4: "Verwenden Sie fur jede Seite ein anderes Passwort",
    whatIsPassword: "Was ist ein starkes Passwort?",
    passwordExplanation: "Ein starkes Passwort schutzt Ihre Konten vor Hackern. Langere Passworter mit vielfaltigen Zeichen sind exponentiell schwerer zu knacken.",
    otherTools: "Andere Tools",
    backToMain: "← Zuruck",
  },
  fr: {
    title: "Generateur de Mot de Passe",
    subtitle: "Generez des mots de passe securises facilement",
    length: "Longueur",
    options: "Options",
    uppercase: "Majuscules (A-Z)",
    lowercase: "Minuscules (a-z)",
    numbers: "Chiffres (0-9)",
    symbols: "Symboles (!@#$...)",
    generate: "Generer Nouveau Mot de Passe",
    copy: "Copier",
    copied: "Copie!",
    strength: "Force",
    weak: "Faible",
    medium: "Moyen",
    strong: "Fort",
    veryStrong: "Tres Fort",
    tips: "Conseils Mots de Passe Securises",
    tip1: "Utilisez au moins 12 caracteres",
    tip2: "Melangez majuscules, minuscules, chiffres et symboles",
    tip3: "N'incluez pas d'informations personnelles",
    tip4: "Utilisez des mots de passe differents pour chaque site",
    whatIsPassword: "Qu'est-ce qu'un Mot de Passe Fort?",
    passwordExplanation: "Un mot de passe fort protege vos comptes contre les pirates. Les mots de passe plus longs avec des caracteres divers sont beaucoup plus difficiles a craquer.",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
  },
};

interface PasswordGeneratorProps {
  lang?: Lang;
}

export default function PasswordGenerator({ lang = "ko" }: PasswordGeneratorProps) {
  const t = translations[lang];
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      setPassword("");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    setCopied(false);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (useUppercase) score++;
    if (useLowercase) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;

    if (score <= 2) return { label: t.weak, color: "bg-red-500", width: "25%" };
    if (score <= 4) return { label: t.medium, color: "bg-yellow-500", width: "50%" };
    if (score <= 5) return { label: t.strong, color: "bg-green-500", width: "75%" };
    return { label: t.veryStrong, color: "bg-emerald-500", width: "100%" };
  };

  const strength = getStrength();
  const mainPath = lang === "ko" ? "/" : `/${lang}`;
  const quickLengths = [8, 12, 16, 20, 24, 32];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-emerald-400 text-sm font-medium">🔐 {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="bg-dark-800 p-4 rounded-lg mb-6 flex items-center gap-3">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="••••••••••••••••"
                className="flex-1 bg-transparent text-white text-xl font-mono outline-none"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copied ? "bg-green-600 text-white" : "bg-dark-700 text-dark-300 hover:text-white"
                }`}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-dark-300 text-sm font-medium">{t.length}: {length}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLength(Math.max(4, length - 1))}
                    className="w-8 h-8 bg-dark-700 hover:bg-dark-600 text-white rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-white font-bold w-8 text-center">{length}</span>
                  <button
                    onClick={() => setLength(Math.min(64, length + 1))}
                    className="w-8 h-8 bg-dark-700 hover:bg-dark-600 text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickLengths.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      length === l ? "bg-emerald-600 text-white" : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-dark-300 text-sm font-medium mb-3">{t.options}</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800">
                  <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                  <span className="text-dark-300">{t.uppercase}</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800">
                  <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                  <span className="text-dark-300">{t.lowercase}</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800">
                  <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                  <span className="text-dark-300">{t.numbers}</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800">
                  <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-5 h-5 accent-emerald-500" />
                  <span className="text-dark-300">{t.symbols}</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-dark-400 text-sm">{t.strength}</span>
                <span className={`text-sm font-medium ${
                  strength.label === t.weak ? "text-red-400" :
                  strength.label === t.medium ? "text-yellow-400" :
                  strength.label === t.strong ? "text-green-400" : "text-emerald-400"
                }`}>{strength.label}</span>
              </div>
              <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }} />
              </div>
            </div>

            <button
              onClick={generatePassword}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all"
            >
              🔄 {t.generate}
            </button>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">💡 {t.tips}</h3>
            <ul className="space-y-3 text-dark-300">
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> {t.tip1}</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> {t.tip2}</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> {t.tip3}</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> {t.tip4}</li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsPassword}</h3>
            <p className="text-dark-300 leading-relaxed">{t.passwordExplanation}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/qr`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📱 QR Code</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/random`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎲 Random</Link>
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

