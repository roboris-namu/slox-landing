"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { authTranslations } from "@/locales";

interface Profile {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string | null;
  total_score: number;
  attendance_count: number;
  is_verified: boolean;
  country?: string;
}

// Country options
const COUNTRY_OPTIONS = [
  { code: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "CN", flag: "🇨🇳", name: "China" },
  { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "FR", flag: "🇫🇷", name: "France" },
  { code: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "IN", flag: "🇮🇳", name: "India" },
  { code: "RU", flag: "🇷🇺", name: "Russia" },
  { code: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "TH", flag: "🇹🇭", name: "Thailand" },
  { code: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "ID", flag: "🇮🇩", name: "Indonesia" },
  { code: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "OTHER", flag: "🌍", name: "Other" },
];

const t = authTranslations.en;

export default function LoginPageEN() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 닉네임 수정
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSaving, setNicknameSaving] = useState(false);
  
  // 국가 수정
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [newCountry, setNewCountry] = useState("US");
  const [countrySaving, setCountrySaving] = useState(false);
  
  // 프로필 사진 수정
  const [avatarUploading, setAvatarUploading] = useState(false);
  
  // 신규 가입 닉네임 설정
  const [needsNicknameSetup, setNeedsNicknameSetup] = useState(false);
  const [setupNickname, setSetupNickname] = useState("");

  // 프로필 가져오기 (API 프록시 사용 - 광고 차단기 우회)
  const fetchProfile = useCallback(async (userId: string, userName?: string) => {
    setProfileLoading(true);
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();

      if (data.notFound) {
        setSetupNickname(userName || "");
        setNeedsNicknameSetup(true);
        setProfileLoading(false);
        return;
      }

      if (data.profile) {
        setProfile(data.profile);
        setNeedsNicknameSetup(false);
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // 오늘 출석 체크 여부 확인 (API 프록시 사용)
  const checkTodayAttendance = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/attendance?userId=${userId}`);
      const data = await response.json();
      setCheckedInToday(data.checkedInToday || false);
    } catch (err) {
      console.error("Failed to check attendance:", err);
      setCheckedInToday(false);
    }
  }, []);

  // 유저 확인
  useEffect(() => {
    const checkUser = async () => {
      // 📱 PKCE 플로우 감지 (모바일에서 code 파라미터로 전달)
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      
      if (authCode) {
        console.log("📱 [Login] PKCE 코드 감지, 세션 교환...");
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
          if (!error && data.session) {
            const sessionData = {
              user: data.session.user,
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
              expires_at: data.session.expires_at,
            };
            localStorage.setItem("slox-session", JSON.stringify(sessionData));
            window.history.replaceState(null, "", window.location.pathname);
            setUser(data.session.user);
            await fetchProfile(data.session.user.id, data.session.user.user_metadata?.name);
            await checkTodayAttendance(data.session.user.id);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("❌ [Login] PKCE 처리 에러:", e);
        }
      }
      
      // 기존 로직
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.user_metadata?.name);
        await checkTodayAttendance(session.user.id);
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user.user_metadata?.name);
        await checkTodayAttendance(session.user.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, checkTodayAttendance]);

  // 출석 체크
  const handleCheckIn = async () => {
    if (!user || checkingIn || checkedInToday) return;

    setCheckingIn(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { error } = await supabase.from("attendance").insert({
        user_id: user.id,
        check_date: today,
        points_earned: 10,
      });

      if (!error) {
        await supabase.rpc("increment_score", { user_id: user.id, amount: 10 });
        await supabase.rpc("increment_attendance", { user_id: user.id });

        setCheckedInToday(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        if (profile) {
          setProfile({
            ...profile,
            total_score: profile.total_score + 10,
            attendance_count: profile.attendance_count + 1,
          });
        }
      }
    } finally {
      setCheckingIn(false);
    }
  };

  // Google 로그인
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/en/login` },
    });
  };

  // Kakao 로그인
  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/en/login` },
    });
  };

  // 로그아웃
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // 닉네임 저장
  const handleSaveNickname = async () => {
    if (!user || !newNickname.trim() || newNickname.trim().length < 2) {
      setNicknameError(t.profile.nicknameTooShort);
      return;
    }

    setNicknameSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ nickname: newNickname.trim() })
        .eq("id", user.id);

      if (!error && profile) {
        setProfile({ ...profile, nickname: newNickname.trim() });
        setIsEditingNickname(false);
        setNicknameError("");
      }
    } finally {
      setNicknameSaving(false);
    }
  };

  // 국가 저장
  const handleCountryChange = async (countryCode: string) => {
    if (!user) return;
    setCountrySaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ country: countryCode, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (!error && profile) {
        setProfile({ ...profile, country: countryCode });
        setIsEditingCountry(false);
      }
    } finally {
      setCountrySaving(false);
    }
  };

  // 프로필 사진 업로드
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) { alert("File size must be less than 5MB."); return; }
    if (!file.type.startsWith("image/")) { alert("Only image files are allowed."); return; }
    setAvatarUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      if (profile?.avatar_url && profile.avatar_url.includes("avatars")) {
        const oldPath = profile.avatar_url.split("/avatars/")[1];
        if (oldPath) await supabase.storage.from("avatars").remove([oldPath]);
      }
      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const { error: updateError } = await supabase.from("profiles").update({ avatar_url: urlData.publicUrl, updated_at: new Date().toISOString() }).eq("id", user.id);
      if (updateError) throw updateError;
      await fetchProfile(user.id);
      alert("Profile picture updated!");
    } catch (error) { console.error("Avatar upload error:", error); alert("Failed to upload profile picture."); }
    finally { setAvatarUploading(false); }
  };

  // 신규 닉네임 설정
  const handleSetupNickname = async () => {
    if (!user || !setupNickname.trim() || setupNickname.trim().length < 2) return;

    try {
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        nickname: setupNickname.trim(),
        email: user.email || "",
        avatar_url: user.user_metadata?.avatar_url || null,
        total_score: 0,
        attendance_count: 0,
      });

      if (!error) {
        await fetchProfile(user.id);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // 로딩 중
  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-500" />
      </main>
    );
  }

  // 비로그인 상태
  if (!user) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <div className="premium-bg" />
        <div className="grid-pattern" />
        
        <nav className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/en" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-white">SLOX</span>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-white mb-3">{t.login.title}</h1>
              <p className="text-dark-400">{t.login.subtitle}</p>
            </div>

            <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              {/* Google 로그인 */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white rounded-xl text-gray-800 font-medium hover:bg-gray-100 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t.login.googleLogin}
              </button>
            </div>

            <div className="mt-8 bg-dark-800/30 rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-semibold mb-4">{t.login.benefits}</h3>
              <ul className="space-y-3 text-dark-300 text-sm">
                <li>{t.login.benefit1}</li>
                <li>{t.login.benefit2}</li>
                <li>{t.login.benefit3}</li>
                <li>{t.login.benefit4}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 닉네임 설정 필요
  if (needsNicknameSetup) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-dark-800/50 rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">🎉 Welcome!</h2>
          <p className="text-dark-400 text-center mb-6">Please set your nickname</p>
          <input
            type="text"
            value={setupNickname}
            onChange={(e) => setSetupNickname(e.target.value)}
            placeholder="Nickname"
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white mb-4"
            maxLength={20}
          />
          <button
            onClick={handleSetupNickname}
            disabled={setupNickname.trim().length < 2}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            Start
          </button>
        </div>
      </main>
    );
  }

  // 프로필 로딩
  if (profileLoading) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-500" />
      </main>
    );
  }

  // 로그인 상태
  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      <div className="premium-bg" />
      {showConfetti && <div className="confetti" />}
      
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/en" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-white">SLOX</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <div className="max-w-md w-full space-y-6">
          {/* 프로필 카드 */}
          <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-6">
              {/* 프로필 사진 (클릭하여 수정) */}
              <label className="relative cursor-pointer group">
                <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={avatarUploading} className="hidden" />
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent-500 group-hover:opacity-70 transition-opacity">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.nickname} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                      {profile?.nickname?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-xl drop-shadow-lg">📷</span></div>
                {avatarUploading && <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>}
              </label>
              <div>
                {isEditingNickname ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                      className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm"
                      maxLength={20}
                    />
                    <button onClick={handleSaveNickname} disabled={nicknameSaving} className="px-3 py-1 bg-accent-500 text-white rounded-lg text-sm">
                      {nicknameSaving ? "..." : t.profile.save}
                    </button>
                    <button onClick={() => setIsEditingNickname(false)} className="px-3 py-1 bg-dark-700 text-white rounded-lg text-sm">
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{profile?.nickname}</h2>
                    <button onClick={() => { setNewNickname(profile?.nickname || ""); setIsEditingNickname(true); }} className="text-dark-500 hover:text-white text-sm">✏️</button>
                  </div>
                )}
                {nicknameError && <p className="text-red-400 text-xs mt-1">{nicknameError}</p>}
                <p className="text-dark-400 text-sm">{profile?.email}</p>
                {/* Country Selection */}
                <div className="flex items-center gap-2 mt-2">
                  {isEditingCountry ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        className="px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-primary-500"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleCountryChange(newCountry)}
                        disabled={countrySaving}
                        className="px-2 py-1 bg-accent-500 text-white text-xs rounded disabled:opacity-50"
                      >
                        {countrySaving ? "..." : "Save"}
                      </button>
                      <button
                        onClick={() => setIsEditingCountry(false)}
                        className="px-2 py-1 bg-dark-600 text-gray-300 text-xs rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setNewCountry(profile?.country || "US"); setIsEditingCountry(true); }}
                      className="flex items-center gap-1.5 px-2 py-1 bg-dark-700 hover:bg-dark-600 rounded text-sm transition-colors"
                    >
                      <span className="text-lg">{COUNTRY_OPTIONS.find(c => c.code === (profile?.country || "US"))?.flag || "🌍"}</span>
                      <span className="text-dark-400">{COUNTRY_OPTIONS.find(c => c.code === (profile?.country || "US"))?.name || "Other"}</span>
                      <span className="text-gray-500 text-xs">✏️</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{profile?.total_score.toLocaleString()}</p>
                <p className="text-dark-400 text-sm">{t.profile.totalScore}</p>
              </div>
              <div className="bg-dark-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{profile?.attendance_count}</p>
                <p className="text-dark-400 text-sm">{t.profile.attendance}</p>
              </div>
            </div>

            {/* 출석체크 */}
            <button
              onClick={handleCheckIn}
              disabled={checkedInToday || checkingIn}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                checkedInToday
                  ? "bg-green-500/20 text-green-400 cursor-default"
                  : "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-glow-md"
              }`}
            >
              {checkingIn ? "..." : checkedInToday ? `✅ ${t.attendance.checkInComplete}` : `📅 ${t.attendance.checkIn} (+10${t.profile.points})`}
            </button>
          </div>

          {/* 로그아웃 */}
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-dark-800/50 border border-white/10 rounded-xl text-red-400 font-medium hover:bg-red-500/10 transition-all"
          >
            🚪 {t.profile.logout}
          </button>
        </div>
      </div>
    </main>
  );
}

