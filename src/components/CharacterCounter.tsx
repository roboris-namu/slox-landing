"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Lang = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

const translations: Record<Lang, {
  title: string;
  subtitle: string;
  placeholder: string;
  clear: string;
  totalChars: string;
  noSpaces: string;
  words: string;
  lines: string;
  paragraphs: string;
  bytes: string;
  limits: string;
  twitter: string;
  instagram: string;
  youtube: string;
  sms: string;
  email: string;
  remaining: string;
  exceeded: string;
  whatIsCounter: string;
  counterExplanation: string;
  useCases: string;
  socialMedia: string;
  academic: string;
  seo: string;
  otherTools: string;
  backToMain: string;
}> = {
  ko: {
    title: "글자수 세기",
    subtitle: "텍스트의 글자수, 단어수, 바이트 등을 확인하세요",
    placeholder: "텍스트를 입력하세요...",
    clear: "지우기",
    totalChars: "전체 글자수",
    noSpaces: "공백 제외",
    words: "단어수",
    lines: "줄수",
    paragraphs: "문단수",
    bytes: "바이트",
    limits: "플랫폼별 글자 제한",
    twitter: "트위터",
    instagram: "인스타그램",
    youtube: "유튜브 제목",
    sms: "SMS",
    email: "이메일 제목",
    remaining: "남음",
    exceeded: "초과",
    whatIsCounter: "글자수 세기란?",
    counterExplanation: "글자수 세기는 텍스트의 길이를 측정하는 도구입니다. SNS 포스팅, 논문 작성, SEO 최적화 등에서 글자수 제한을 확인할 때 유용합니다.",
    useCases: "활용 예시",
    socialMedia: "SNS 게시물 작성",
    academic: "논문/에세이 작성",
    seo: "SEO 메타 설명 최적화",
    otherTools: "다른 도구",
    backToMain: "← 메인으로",
  },
  en: {
    title: "Character Counter",
    subtitle: "Check character count, word count, bytes and more",
    placeholder: "Enter your text...",
    clear: "Clear",
    totalChars: "Total Characters",
    noSpaces: "Without Spaces",
    words: "Words",
    lines: "Lines",
    paragraphs: "Paragraphs",
    bytes: "Bytes",
    limits: "Platform Character Limits",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube Title",
    sms: "SMS",
    email: "Email Subject",
    remaining: "remaining",
    exceeded: "exceeded",
    whatIsCounter: "What is Character Counter?",
    counterExplanation: "Character counter measures text length. Useful for checking character limits in social media posts, academic papers, and SEO optimization.",
    useCases: "Use Cases",
    socialMedia: "Social media posts",
    academic: "Academic papers/essays",
    seo: "SEO meta description",
    otherTools: "Other Tools",
    backToMain: "← Back",
  },
  ja: {
    title: "文字数カウント",
    subtitle: "文字数、単語数、バイト数などを確認",
    placeholder: "テキストを入力してください...",
    clear: "クリア",
    totalChars: "総文字数",
    noSpaces: "スペースなし",
    words: "単語数",
    lines: "行数",
    paragraphs: "段落数",
    bytes: "バイト",
    limits: "プラットフォーム別文字制限",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube タイトル",
    sms: "SMS",
    email: "メール件名",
    remaining: "残り",
    exceeded: "超過",
    whatIsCounter: "文字数カウントとは？",
    counterExplanation: "文字数カウントはテキストの長さを測定するツールです。SNS投稿、論文作成、SEO最適化などで文字数制限を確認する際に便利です。",
    useCases: "活用例",
    socialMedia: "SNS投稿",
    academic: "論文・エッセイ",
    seo: "SEOメタ説明",
    otherTools: "他のツール",
    backToMain: "← 戻る",
  },
  zh: {
    title: "字数统计",
    subtitle: "查看字数、词数、字节等",
    placeholder: "输入文字...",
    clear: "清除",
    totalChars: "总字数",
    noSpaces: "不含空格",
    words: "词数",
    lines: "行数",
    paragraphs: "段落数",
    bytes: "字节",
    limits: "平台字数限制",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube 标题",
    sms: "短信",
    email: "邮件主题",
    remaining: "剩余",
    exceeded: "超过",
    whatIsCounter: "什么是字数统计？",
    counterExplanation: "字数统计用于测量文本长度。在社交媒体发帖、论文写作、SEO优化等场景中检查字数限制时非常有用。",
    useCases: "使用场景",
    socialMedia: "社交媒体发帖",
    academic: "论文/文章写作",
    seo: "SEO元描述优化",
    otherTools: "其他工具",
    backToMain: "← 返回",
  },
  es: {
    title: "Contador de Caracteres",
    subtitle: "Verifica caracteres, palabras, bytes y mas",
    placeholder: "Ingresa tu texto...",
    clear: "Borrar",
    totalChars: "Total Caracteres",
    noSpaces: "Sin Espacios",
    words: "Palabras",
    lines: "Lineas",
    paragraphs: "Parrafos",
    bytes: "Bytes",
    limits: "Limites de Plataformas",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "Titulo YouTube",
    sms: "SMS",
    email: "Asunto Email",
    remaining: "restantes",
    exceeded: "excedidos",
    whatIsCounter: "Que es Contador de Caracteres?",
    counterExplanation: "El contador de caracteres mide la longitud del texto. Util para verificar limites en redes sociales, trabajos academicos y SEO.",
    useCases: "Casos de Uso",
    socialMedia: "Publicaciones en redes",
    academic: "Trabajos academicos",
    seo: "Meta descripcion SEO",
    otherTools: "Otras Herramientas",
    backToMain: "← Volver",
  },
  pt: {
    title: "Contador de Caracteres",
    subtitle: "Verifique caracteres, palavras, bytes e mais",
    placeholder: "Digite seu texto...",
    clear: "Limpar",
    totalChars: "Total Caracteres",
    noSpaces: "Sem Espacos",
    words: "Palavras",
    lines: "Linhas",
    paragraphs: "Paragrafos",
    bytes: "Bytes",
    limits: "Limites de Plataformas",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "Titulo YouTube",
    sms: "SMS",
    email: "Assunto Email",
    remaining: "restantes",
    exceeded: "excedidos",
    whatIsCounter: "O que e Contador de Caracteres?",
    counterExplanation: "O contador de caracteres mede o comprimento do texto. Util para verificar limites em redes sociais, trabalhos academicos e SEO.",
    useCases: "Casos de Uso",
    socialMedia: "Posts em redes sociais",
    academic: "Trabalhos academicos",
    seo: "Meta descricao SEO",
    otherTools: "Outras Ferramentas",
    backToMain: "← Voltar",
  },
  de: {
    title: "Zeichenzahler",
    subtitle: "Zeichen, Worter, Bytes und mehr prufen",
    placeholder: "Text eingeben...",
    clear: "Loschen",
    totalChars: "Gesamt Zeichen",
    noSpaces: "Ohne Leerzeichen",
    words: "Worter",
    lines: "Zeilen",
    paragraphs: "Absatze",
    bytes: "Bytes",
    limits: "Plattform-Zeichenlimits",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube Titel",
    sms: "SMS",
    email: "E-Mail Betreff",
    remaining: "ubrig",
    exceeded: "uberschritten",
    whatIsCounter: "Was ist ein Zeichenzahler?",
    counterExplanation: "Der Zeichenzahler misst die Textlange. Nutzlich fur Social Media Posts, akademische Arbeiten und SEO-Optimierung.",
    useCases: "Anwendungsfalle",
    socialMedia: "Social Media Posts",
    academic: "Akademische Arbeiten",
    seo: "SEO Meta-Beschreibung",
    otherTools: "Andere Tools",
    backToMain: "← Zuruck",
  },
  fr: {
    title: "Compteur de Caracteres",
    subtitle: "Verifiez les caracteres, mots, octets et plus",
    placeholder: "Entrez votre texte...",
    clear: "Effacer",
    totalChars: "Total Caracteres",
    noSpaces: "Sans Espaces",
    words: "Mots",
    lines: "Lignes",
    paragraphs: "Paragraphes",
    bytes: "Octets",
    limits: "Limites de Plateformes",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "Titre YouTube",
    sms: "SMS",
    email: "Objet Email",
    remaining: "restants",
    exceeded: "depasses",
    whatIsCounter: "Qu'est-ce que le Compteur de Caracteres?",
    counterExplanation: "Le compteur de caracteres mesure la longueur du texte. Utile pour verifier les limites sur les reseaux sociaux, les travaux academiques et le SEO.",
    useCases: "Cas d'Utilisation",
    socialMedia: "Posts reseaux sociaux",
    academic: "Travaux academiques",
    seo: "Meta description SEO",
    otherTools: "Autres Outils",
    backToMain: "← Retour",
  },
};

interface CharacterCounterProps {
  lang?: Lang;
}

export default function CharacterCounter({ lang = "ko" }: CharacterCounterProps) {
  const t = translations[lang];
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const totalChars = text.length;
    const noSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n\n+/).filter(p => p.trim()).length : 0;
    const bytes = new Blob([text]).size;

    return { totalChars, noSpaces, words, lines, paragraphs, bytes };
  }, [text]);

  const limits = [
    { name: t.twitter, limit: 280 },
    { name: t.instagram, limit: 2200 },
    { name: t.youtube, limit: 100 },
    { name: t.sms, limit: 160 },
    { name: t.email, limit: 78 },
  ];

  const mainPath = lang === "ko" ? "/" : `/${lang}`;

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="text-cyan-400 text-sm font-medium">✍️ {t.title}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
            <p className="text-dark-400 text-lg">{t.subtitle}</p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-dark-400 text-sm">{stats.totalChars} {t.totalChars}</span>
              <button
                onClick={() => setText("")}
                className="px-3 py-1 text-sm text-dark-400 hover:text-white transition-colors"
              >
                {t.clear}
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              className="w-full h-64 p-4 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.totalChars}</p>
              <p className="text-white text-2xl font-bold">{stats.totalChars.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.noSpaces}</p>
              <p className="text-white text-2xl font-bold">{stats.noSpaces.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.words}</p>
              <p className="text-white text-2xl font-bold">{stats.words.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.lines}</p>
              <p className="text-white text-2xl font-bold">{stats.lines.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.paragraphs}</p>
              <p className="text-white text-2xl font-bold">{stats.paragraphs.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-xs mb-1">{t.bytes}</p>
              <p className="text-white text-2xl font-bold">{stats.bytes.toLocaleString()}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-bold mb-4">📱 {t.limits}</h3>
            <div className="space-y-3">
              {limits.map((platform) => {
                const remaining = platform.limit - stats.totalChars;
                const percentage = Math.min((stats.totalChars / platform.limit) * 100, 100);
                const isOver = remaining < 0;

                return (
                  <div key={platform.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-dark-300 text-sm">{platform.name}</span>
                      <span className={`text-sm ${isOver ? "text-red-400" : "text-green-400"}`}>
                        {isOver ? `${Math.abs(remaining)} ${t.exceeded}` : `${remaining} ${t.remaining}`}
                      </span>
                    </div>
                    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${isOver ? "bg-red-500" : "bg-cyan-500"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">❓ {t.whatIsCounter}</h3>
            <p className="text-dark-300 leading-relaxed">{t.counterExplanation}</p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 {t.otherTools}</h3>
            <div className="flex flex-wrap gap-3">
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/password`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔐 Password</Link>
              <Link href={`${lang === "ko" ? "" : `/${lang}`}/qr`} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📱 QR Code</Link>
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

