"use client";

import Hero from "./Hero";
import FreeTools from "./FreeTools";
import Apps from "./Apps";
import Contact from "./Contact";
import LanguageSelector from "./LanguageSelector";
import NavUserProfile, { NavUserProfileMobile } from "./NavUserProfile";

type NavLabels = { games: string; tools: string; apps: string; contact: string };
type FooterLabels = { about: string; privacy: string; notice: string };

const navLabels: Record<string, NavLabels> = {
  ko: { games: "게임", tools: "도구", apps: "앱", contact: "문의" },
  en: { games: "Games", tools: "Tools", apps: "Apps", contact: "Contact" },
  ja: { games: "ゲーム", tools: "ツール", apps: "アプリ", contact: "お問い合わせ" },
  zh: { games: "游戏", tools: "工具", apps: "应用", contact: "联系" },
  de: { games: "Spiele", tools: "Tools", apps: "Apps", contact: "Kontakt" },
  fr: { games: "Jeux", tools: "Outils", apps: "Apps", contact: "Contact" },
  es: { games: "Juegos", tools: "Herramientas", apps: "Apps", contact: "Contacto" },
  pt: { games: "Jogos", tools: "Ferramentas", apps: "Apps", contact: "Contato" },
};

const footerLabels: Record<string, FooterLabels> = {
  ko: { about: "소개", privacy: "개인정보처리방침", notice: "공지사항" },
  en: { about: "About", privacy: "Privacy", notice: "Notice" },
  ja: { about: "概要", privacy: "プライバシー", notice: "お知らせ" },
  zh: { about: "关于", privacy: "隐私政策", notice: "公告" },
  de: { about: "Über uns", privacy: "Datenschutz", notice: "Hinweise" },
  fr: { about: "À propos", privacy: "Confidentialité", notice: "Avis" },
  es: { about: "Acerca de", privacy: "Privacidad", notice: "Avisos" },
  pt: { about: "Sobre", privacy: "Privacidade", notice: "Avisos" },
};

export default function HomeContent({ locale = "ko" }: { locale?: string }) {
  const nav = navLabels[locale] || navLabels.en;
  const footer = footerLabels[locale] || footerLabels.en;
  const homeHref = locale === "ko" ? "/" : `/${locale}`;

  return (
    <main className="relative">
      <Navigation nav={nav} locale={locale} homeHref={homeHref} />
      <Hero locale={locale} />
      <FreeTools locale={locale} />
      <Apps locale={locale} />
      <Contact locale={locale} />
      <Footer footer={footer} />
    </main>
  );
}

function Navigation({ nav, locale, homeHref }: { nav: NavLabels; locale: string; homeHref: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-5xl mx-auto bg-dark-900/70 backdrop-blur-2xl rounded-2xl border border-white/[0.06] shadow-glass">
          <div className="flex items-center justify-between h-14 px-5">
            <a href={homeHref} className="font-black text-xl text-white tracking-tight hover:opacity-80 transition-opacity">
              SLOX
            </a>

            <div className="hidden md:flex items-center gap-1">
              <a href="#games" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">{nav.games}</a>
              <a href="#tools" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">{nav.tools}</a>
              <a href="#apps" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">{nav.apps}</a>
              <a href="#contact" className="px-4 py-2 text-sm text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">{nav.contact}</a>
              <div className="w-px h-5 bg-white/[0.08] mx-1" />
              <LanguageSelector currentLocale={locale} />
              <NavUserProfile locale={locale} />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector currentLocale={locale} mobile />
              <NavUserProfileMobile locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer({ footer }: { footer: FooterLabels }) {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-white tracking-tight">SLOX</span>
            <span className="text-dark-500 text-xs">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-dark-400">
            <a href="/about" className="hover:text-white transition-colors">{footer.about}</a>
            <a href="/privacy" className="hover:text-white transition-colors">{footer.privacy}</a>
            <a href="/notice" className="hover:text-white transition-colors">{footer.notice}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
