"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Locale, navTranslations, authTranslations } from "@/locales";

// 유저 프로필 타입
interface UserProfile {
  id: string;
  nickname: string;
  email: string;
  avatar_url?: string;
  total_score: number;
  attendance_count: number;
}


interface NavUserProfileProps {
  locale?: Locale;
}

/**
 * 🔐 네비게이션 유저 프로필 컴포넌트
 * - 비로그인: 로그인 버튼
 * - 로그인: 아바타 + 닉네임 + 드롭다운 메뉴
 */
export default function NavUserProfile({ locale = "ko" }: NavUserProfileProps) {
  const t = navTranslations[locale];
  const auth = authTranslations[locale];
  const loginPath = locale === "ko" ? "/login" : `/${locale}/login`;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [todayChecked, setTodayChecked] = useState(false);
  const [myRank, setMyRank] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔧 로컬 스토리지에서 세션 직접 읽기 (광고 차단기 우회)
  const getSessionFromStorage = (): { userId: string } | null => {
    try {
      // 1️⃣ 먼저 slox-session 키 확인 (수동 저장)
      const sloxSession = localStorage.getItem("slox-session");
      if (sloxSession) {
        const parsed = JSON.parse(sloxSession);
        if (parsed?.user?.id) {
          console.log("✅ [NavUserProfile] slox-session에서 세션 찾음:", parsed.user.id);
          return { userId: parsed.user.id };
        }
      }
      
      // 2️⃣ Supabase 기본 키 확인 (sb-*-auth-token)
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (key.includes("sb-") || key.includes("supabase") || key.includes("auth")) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              const userId = parsed?.user?.id || parsed?.currentSession?.user?.id || parsed?.session?.user?.id;
              if (userId) {
                console.log("✅ [NavUserProfile] Supabase 키에서 세션 찾음:", userId);
                return { userId };
              }
            } catch {
              continue;
            }
          }
        }
      }
      console.log("⚠️ [NavUserProfile] 세션 없음");
    } catch (e) {
      console.error("❌ [NavUserProfile] 로컬 스토리지 읽기 실패:", e);
    }
    return null;
  };

  // 유저 정보 로드 (API 프록시 사용 - 광고 차단기 우회)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    
    const loadUser = async () => {
      try {
        console.log("🔄 [NavUserProfile] 세션 확인 시작...");
        
        // 1️⃣ 먼저 로컬 스토리지에서 세션 확인 (광고 차단기 우회)
        const storedSession = getSessionFromStorage();
        
        // 2️⃣ SDK도 시도 (타임아웃 설정)
        let userId = storedSession?.userId;
        
        if (!userId) {
          // SDK 호출 (2초 타임아웃)
          const sessionPromise = supabase.auth.getSession();
          const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
          
          const result = await Promise.race([sessionPromise, timeoutPromise]);
          
          if (result && 'data' in result && result.data.session?.user) {
            userId = result.data.session.user.id;
            console.log("📊 [NavUserProfile] SDK 세션:", userId);
          }
        }
        
        if (!userId) {
          console.log("📊 [NavUserProfile] 세션 없음 (로그인 필요)");
          return;
        }
        
        console.log("📊 [NavUserProfile] userId 확인:", userId);

        // 프로필 정보 가져오기 (API 프록시)
        console.log("🔄 [NavUserProfile] 프로필 API 호출...");
        const profileRes = await fetch(`/api/profile?userId=${userId}`);
        const profileData = await profileRes.json();
        console.log("📊 [NavUserProfile] 프로필 응답:", profileData);

        if (profileData.profile) {
          setUser(profileData.profile);
          console.log("✅ [NavUserProfile] 프로필 설정 완료:", profileData.profile.nickname);

          // 오늘 출석 체크 여부 (API 프록시)
          const attendanceRes = await fetch(`/api/attendance?userId=${userId}`);
          const attendanceData = await attendanceRes.json();
          setTodayChecked(attendanceData.checkedIn || false);

          // 내 순위 계산 (API 프록시)
          const rankRes = await fetch(`/api/rankings?userId=${userId}`);
          const rankData = await rankRes.json();
          if (rankData.myRank) {
            setMyRank(rankData.myRank);
          }
        } else {
          console.warn("⚠️ [NavUserProfile] 프로필 없음:", profileData);
        }
      } catch (error) {
        console.error("❌ [NavUserProfile] 로드 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (session?.user) {
        loadUser();
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 로그아웃 (광고 차단기 우회)
  const handleLogout = async () => {
    console.log("🚪 [Logout] 로그아웃 시작...");
    
    // 1. localStorage에서 세션 삭제
    localStorage.removeItem("slox-session");
    console.log("🗑️ [Logout] slox-session 삭제");
    
    // Supabase 관련 키도 삭제
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.includes("sb-") || key.includes("supabase")) {
        console.log("🗑️ [Logout] Supabase 키 삭제:", key);
        localStorage.removeItem(key);
      }
    });

    // 2. 상태 초기화
    setUser(null);
    setMenuOpen(false);

    // 3. Supabase SDK signOut 시도 (1초 타임아웃)
    try {
      const signOutPromise = supabase.auth.signOut();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("timeout")), 1000)
      );
      await Promise.race([signOutPromise, timeoutPromise]);
    } catch {
      console.log("signOut 타임아웃 또는 차단됨 (무시)");
    }

    // 4. 홈으로 리다이렉트
    console.log("🏠 [Logout] 홈으로 이동...");
    window.location.href = "/";
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-dark-700 animate-pulse" />
    );
  }

  // 비로그인 상태
  if (!user) {
    return (
      <a
        href={loginPath}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-300 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{t.login}</span>
      </a>
    );
  }

  // 로그인 상태
  return (
    <div className="relative" ref={menuRef}>
      {/* 프로필 버튼 */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group"
      >
        {/* 아바타 */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent-500/50 group-hover:ring-accent-500 transition-all">
            {user.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.nickname}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                {user.nickname.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* 출석체크 안했으면 빨간점 */}
          {!todayChecked && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-dark-900 animate-pulse" />
          )}
        </div>

        {/* 닉네임 & 순위 (데스크탑만) */}
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-white leading-tight">{user.nickname}</p>
          <p className="text-xs text-dark-400">
            {myRank ? `${myRank}${t.rank}` : "-"} • {user.total_score.toLocaleString()}{t.points}
          </p>
        </div>

        {/* 드롭다운 화살표 */}
        <svg 
          className={`w-4 h-4 text-dark-400 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* 유저 정보 헤더 */}
          <div className="px-4 py-3 bg-gradient-to-r from-accent-500/10 to-cyan-500/10 border-b border-white/5">
            <p className="font-semibold text-white">{user.nickname}</p>
            <p className="text-xs text-dark-400 truncate">{user.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-accent-400">
                🏆 {myRank}{t.rank}
              </span>
              <span className="text-xs text-yellow-400">
                ⭐ {user.total_score.toLocaleString()}{t.points}
              </span>
              <span className="text-xs text-green-400">
                📅 {user.attendance_count}{auth.profile.days}
              </span>
            </div>
          </div>

          {/* 메뉴 아이템 */}
          <div className="p-2">
            {/* 출석체크 */}
            <a
              href={loginPath}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                todayChecked 
                  ? "text-dark-500 cursor-default" 
                  : "text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{todayChecked ? "✅" : "📅"}</span>
              <div>
                <p className="text-sm font-medium">
                  {todayChecked ? auth.attendance.checkInComplete : auth.attendance.checkIn}
                </p>
                {!todayChecked && (
                  <p className="text-xs text-accent-400">+10 {t.points}</p>
                )}
              </div>
              {!todayChecked && (
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </a>

            {/* 내 정보 */}
            <a
              href={loginPath}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-white/5 transition-all"
            >
              <span className="text-lg">👤</span>
              <span className="text-sm font-medium">{t.myProfile}</span>
            </a>

            {/* 구분선 */}
            <div className="my-2 border-t border-white/5" />

            {/* 로그아웃 */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <span className="text-lg">🚪</span>
              <span className="text-sm font-medium">{t.logout}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface NavUserProfileMobileProps {
  locale?: Locale;
}

/**
 * 📱 모바일용 간소화 버전
 */
export function NavUserProfileMobile({ locale = "ko" }: NavUserProfileMobileProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayChecked, setTodayChecked] = useState(false);
  const loginPath = locale === "ko" ? "/login" : `/${locale}/login`;

  // 🔧 로컬 스토리지에서 세션 직접 읽기 (광고 차단기 우회)
  const getSessionFromStorage = (): { userId: string } | null => {
    try {
      const storageKey = `sb-xtqpbyfgptuxwrevxxtm-auth-token`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user?.id) return { userId: parsed.user.id };
      }
    } catch { /* ignore */ }
    return null;
  };

  // 유저 정보 로드 (API 프록시 + 로컬 스토리지 - 광고 차단기 우회)
  useEffect(() => {
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

          // 오늘 출석 체크 여부 (API 프록시)
          const attendanceRes = await fetch(`/api/attendance?userId=${userId}`);
          const attendanceData = await attendanceRes.json();
          setTodayChecked(attendanceData.checkedIn || false);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-dark-700 animate-pulse" />;
  }

  if (!user) {
    return (
      <a
        href={loginPath}
        className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-accent-500/20 transition-all"
      >
        <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </a>
    );
  }

  return (
    <a href={loginPath} className="relative">
      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-accent-500/50">
        {user.avatar_url ? (
          <img 
            src={user.avatar_url} 
            alt={user.nickname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {user.nickname.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {/* 출석체크 안했으면 빨간점 */}
      {!todayChecked && (
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-dark-900 animate-pulse" />
      )}
    </a>
  );
}


