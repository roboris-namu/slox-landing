"use client";

interface LanguageSelectorProps {
  currentLocale?: string;
  mobile?: boolean;
}

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷', path: '/' },
  { code: 'en', name: 'English', flag: '🇺🇸', path: '/en' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', path: '/ja' },
  { code: 'zh', name: '中文', flag: '🇨🇳', path: '/zh' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', path: '/de' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', path: '/fr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', path: '/es' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', path: '/pt' },
];

export default function LanguageSelector({ currentLocale = 'ko', mobile }: LanguageSelectorProps) {
  const current = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="relative group">
      <button className={`${mobile ? 'px-2 py-1.5' : 'px-3 py-2'} text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-1.5`}>
        <span>{current.flag}</span>
        {!mobile && <span>{current.name}</span>}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`absolute ${mobile ? 'right-0' : 'left-0'} top-full mt-2 w-40 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              document.cookie = `SLOX_LOCALE=${lang.code}; path=/; max-age=31536000`;
              setTimeout(() => { window.location.href = lang.path; }, 50);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl ${
              lang.code === currentLocale ? 'text-cyan-400' : 'text-dark-300 hover:text-white'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

