"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 언어 타입
type Locale = "ko" | "en" | "ja" | "zh" | "es" | "pt" | "de" | "fr";

// 유저 프로필 타입
interface UserProfile {
  id: string;
  nickname: string;
  avatar_url: string | null;
  total_score: number;
}

// 언어 옵션 타입
interface LanguageOption {
  locale: Locale;
  flag: string;
  name: string;
  path: string;
}

// Props 타입
interface GameNavBarProps {
  locale: Locale;
  backText: string;
  languageOptions: LanguageOption[];
  onLanguageChange?: (locale: Locale) => void;
}

/**
 * 🎮 게임 페이지 공통 네비게이션 바
 * - 로고 + 언어 선택 + 로그인 상태 + 메인으로 버튼
 */
export default function GameNavBar({ 
  locale, 
  backText, 
  languageOptions,
  onLanguageChange 
}: GameNavBarProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 로그인 경로
  const loginPath = locale === "ko" ? "/login" : `/${locale}/login`;

  // 🔧 로컬 스토리지에서 세션 직접 읽기 (광고 차단기 우회)
  const getSessionFromStorage = (): { userId: string } | null => {
    try {
      // 1️⃣ 먼저 slox-session 키 확인 (수동 저장)
      const sloxSession = localStorage.getItem("slox-session");
      if (sloxSession) {
        const parsed = JSON.parse(sloxSession);
        if (parsed?.user?.id) return { userId: parsed.user.id };
      }
      
      // 2️⃣ Supabase 기본 키 확인
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.includes("sb-") || key.includes("supabase") || key.includes("auth")) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              const userId = parsed?.user?.id || parsed?.currentSession?.user?.id;
              if (userId) return { userId };
            } catch { continue; }
          }
        }
      }
    } catch { /* ignore */ }
    return null;
  };

  // 유저 정보 로드 (API 프록시 + 로컬 스토리지 - 광고 차단기 우회)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);

    const loadUser = async () => {
      try {
        // 로컬 스토리지에서 먼저 확인
        const storedSession = getSessionFromStorage();
        let userId = storedSession?.userId;
        
        if (!userId) {
          // SDK 시도 (2초 타임아웃)
          const sessionPromise = supabase.auth.getSession();
          const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
          const result = await Promise.race([sessionPromise, timeoutPromise]);
          if (result && 'data' in result && result.data.session?.user) {
            userId = result.data.session.user.id;
          }
        }
        
        if (!userId) return;
        
        // 프로필 정보 가져오기 (API 프록시)
        const profileRes = await fetch(`/api/profile?userId=${userId}`);
        const profileData = await profileRes.json();

        if (profileData.profile) {
          setUser(profileData.profile);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    loadUser();
    return () => clearTimeout(timeout);
  }, []);

  // 외부 클릭시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold">SLOX</span>
          </Link>

          {/* 오른쪽 메뉴 */}
          <div className="flex items-center gap-3">
            {/* 언어 선택 */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors"
              >
                <span>{languageOptions.find(l => l.locale === locale)?.flag}</span>
                <span className="text-dark-300 hidden sm:inline">{languageOptions.find(l => l.locale === locale)?.name}</span>
                <svg className="w-4 h-4 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-dark-800 border border-dark-700 rounded-lg shadow-xl overflow-hidden z-50">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.locale}
                      onClick={() => {
                        document.cookie = `SLOX_LOCALE=${opt.locale}; path=/; max-age=31536000`;
                        setShowLangMenu(false);
                        if (onLanguageChange) {
                          onLanguageChange(opt.locale);
                        }
                        window.location.href = opt.path;
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-dark-700 transition-colors text-left ${
                        locale === opt.locale ? "bg-dark-700 text-white" : "text-dark-300"
                      }`}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 🔐 로그인 상태 */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-dark-700 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-white/[0.05] transition-all"
                >
                  {/* 아바타 */}
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent-500/50">
                    {user.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.nickname}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                        {user.nickname.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {/* 닉네임 (데스크탑) */}
                  <span className="hidden md:block text-sm text-white font-medium">{user.nickname}</span>
                  <svg 
                    className={`w-4 h-4 text-dark-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="p-3 border-b border-dark-700">
                      <p className="text-white font-medium text-sm">{user.nickname}</p>
                      <p className="text-dark-400 text-xs">{user.total_score.toLocaleString()} 점</p>
                    </div>
                    <div className="p-2">
                      <a
                        href={loginPath}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/5 transition-all"
                      >
                        <span>👤</span>
                        <span>내 프로필</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <span>🚪</span>
                        <span>로그아웃</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href={loginPath}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-500/20 hover:bg-accent-500/30 border border-accent-500/30 rounded-lg text-sm text-accent-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:inline">로그인</span>
              </a>
            )}

            {/* 메인으로 */}
            <Link 
              href="/"
              className="text-dark-300 hover:text-white transition-colors text-sm hidden sm:block"
            >
              {backText}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

