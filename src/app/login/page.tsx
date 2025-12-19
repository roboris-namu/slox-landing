"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

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

// 국가 옵션
const COUNTRY_OPTIONS = [
  { code: "KR", flag: "🇰🇷", name: "한국" },
  { code: "US", flag: "🇺🇸", name: "미국" },
  { code: "JP", flag: "🇯🇵", name: "일본" },
  { code: "CN", flag: "🇨🇳", name: "중국" },
  { code: "DE", flag: "🇩🇪", name: "독일" },
  { code: "FR", flag: "🇫🇷", name: "프랑스" },
  { code: "ES", flag: "🇪🇸", name: "스페인" },
  { code: "BR", flag: "🇧🇷", name: "브라질" },
  { code: "GB", flag: "🇬🇧", name: "영국" },
  { code: "CA", flag: "🇨🇦", name: "캐나다" },
  { code: "AU", flag: "🇦🇺", name: "호주" },
  { code: "IN", flag: "🇮🇳", name: "인도" },
  { code: "RU", flag: "🇷🇺", name: "러시아" },
  { code: "IT", flag: "🇮🇹", name: "이탈리아" },
  { code: "MX", flag: "🇲🇽", name: "멕시코" },
  { code: "TH", flag: "🇹🇭", name: "태국" },
  { code: "VN", flag: "🇻🇳", name: "베트남" },
  { code: "ID", flag: "🇮🇩", name: "인도네시아" },
  { code: "PH", flag: "🇵🇭", name: "필리핀" },
  { code: "MY", flag: "🇲🇾", name: "말레이시아" },
  { code: "SG", flag: "🇸🇬", name: "싱가포르" },
  { code: "NZ", flag: "🇳🇿", name: "뉴질랜드" },
  { code: "OTHER", flag: "🌍", name: "기타" },
];

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 회원가입 모드
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // 닉네임 수정
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSaving, setNicknameSaving] = useState(false);
  
  // 국가 수정
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [newCountry, setNewCountry] = useState("KR");
  const [countrySaving, setCountrySaving] = useState(false);
  
  // 프로필 사진 수정
  const [avatarUploading, setAvatarUploading] = useState(false);
  
  // 신규 가입 닉네임 설정
  const [needsNicknameSetup, setNeedsNicknameSetup] = useState(false);
  const [setupNickname, setSetupNickname] = useState("");

  // 프로필 가져오기 (API 프록시 사용 - 광고 차단기 우회)
  const fetchProfile = useCallback(async (userId: string, userEmail?: string, userName?: string) => {
    console.log("🔄 [Profile] API 호출 시작 - userId:", userId);
    setProfileLoading(true);
    setProfileError(false);
    
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();

      console.log("📊 [Profile] API 응답:", data);

      if (data.notFound) {
        // 프로필이 없음 = 신규 가입자
        console.log("🆕 [Profile] 신규 가입자 - 닉네임 설정 필요");
        setSetupNickname(userName || "");
        setNeedsNicknameSetup(true);
        setProfileLoading(false);
        return;
      }

      if (data.error) {
        console.error("❌ [Profile] 조회 에러:", data.error);
        setProfileError(true);
        setProfileLoading(false);
        return;
      }

      // API 응답이 { profile: data } 형식
      if (data.profile?.id) {
        console.log("✅ [Profile] 로드 성공:", data.profile.nickname);
        setProfile(data.profile);
        setNeedsNicknameSetup(false);
      }
    } catch (err) {
      console.error("❌ [Profile] 가져오기 실패:", err);
      setProfileError(true);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // 오늘 출석 체크 여부 확인 (API 프록시 사용)
  const checkTodayAttendance = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/attendance?userId=${userId}`);
      const data = await response.json();

      if (data.error) {
        console.error("출석 확인 에러:", data.error);
        return;
      }

      setCheckedInToday(data.checkedIn);
    } catch (err) {
      console.error("출석 체크 확인 실패:", err);
    }
  }, []);

  // 🔧 로컬 스토리지에서 세션 직접 읽기 (광고 차단기 우회)
  const getSessionFromStorage = (): { userId: string; email?: string; name?: string } | null => {
    try {
      // 모든 sb-로 시작하는 키를 찾아서 세션 확인
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith("sb-") && key.includes("-auth-token")) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              // 여러 형식 시도
              const user = parsed?.user || parsed?.currentSession?.user;
              if (user?.id) {
                console.log("✅ [Login] 로컬 스토리지에서 세션 찾음:", user.id, "키:", key);
                return { 
                  userId: user.id,
                  email: user.email,
                  name: user.user_metadata?.full_name || user.user_metadata?.name
                };
              }
            } catch {
              continue;
            }
          }
        }
      }
      console.log("⚠️ [Login] 로컬 스토리지에 세션 없음");
    } catch (e) {
      console.error("❌ [Login] 로컬 스토리지 읽기 실패:", e);
    }
    return null;
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("🔄 [Login] 세션 확인 시작...");
        
        // 1️⃣ 먼저 로컬 스토리지에서 세션 확인 (광고 차단기 우회)
        const storedSession = getSessionFromStorage();
        
        // 2️⃣ SDK도 시도 (2초 타임아웃)
        let userId = storedSession?.userId;
        let userEmail = storedSession?.email;
        let userName = storedSession?.name;
        let fullSession = null;
        
        if (!userId) {
          const sessionPromise = supabase.auth.getSession();
          const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));
          const result = await Promise.race([sessionPromise, timeoutPromise]);
          
          if (result && 'data' in result) {
            if (result.error) {
              console.error("세션 확인 에러:", result.error);
            }
            if (result.data.session?.user) {
              fullSession = result.data.session;
              userId = result.data.session.user.id;
              userEmail = result.data.session.user.email;
              userName = result.data.session.user.user_metadata?.full_name || result.data.session.user.user_metadata?.name;
              console.log("📊 [Login] SDK 세션:", userId);
            }
          }
        }

        if (!userId) {
          console.log("📊 [Login] 세션 없음 (로그인 필요)");
          setLoading(false);
          return;
        }

        console.log("📊 [Login] userId 확인:", userId);

        // user 객체 구성 (세션에서 가져오거나 최소한의 정보로)
        if (fullSession?.user) {
          setUser(fullSession.user);
        } else {
          // 로컬 스토리지에서 가져온 경우 - 최소한의 user 객체 구성
          setUser({ id: userId, email: userEmail } as User);
        }

        await fetchProfile(userId, userEmail, userName);
        await checkTodayAttendance(userId);
      } catch (err) {
        console.error("인증 확인 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 3초 후에도 로딩중이면 강제로 로딩 해제
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    // 5초 후에도 프로필 로딩중이면 에러 표시
    const profileTimeout = setTimeout(() => {
      setProfileLoading(false);
      // 프로필이 없고 로딩 중이면 에러로 처리
    }, 5000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(
          session.user.id,
          session.user.email,
          session.user.user_metadata?.full_name || session.user.user_metadata?.name
        );
        await checkTodayAttendance(session.user.id);
      } else {
        setProfile(null);
        setCheckedInToday(false);
        setNeedsNicknameSetup(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
      clearTimeout(profileTimeout);
    };
  }, [fetchProfile, checkTodayAttendance]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패: " + error.message);
    }
  };

  // 로그아웃 (광고 차단기 우회)
  const handleLogout = async () => {
    try {
      // 1. localStorage에서 Supabase 세션 직접 삭제
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("sb-") && key.includes("-auth-token")) {
          console.log("🗑️ [Logout] 세션 키 삭제:", key);
          localStorage.removeItem(key);
        }
      });

      // 2. Supabase SDK signOut도 시도 (실패해도 괜찮음)
      try {
        await supabase.auth.signOut();
      } catch {
        console.log("signOut failed (blocked by ad-blocker), but localStorage cleared");
      }

      setUser(null);
      setProfile(null);
      window.location.href = "/"; // 홈으로 리다이렉트
    } catch (err) {
      console.error("로그아웃 에러:", err);
      // 에러가 나도 강제로 localStorage 삭제 후 새로고침
      localStorage.clear();
      window.location.href = "/";
    }
  };

  // 신규 가입자 닉네임 설정 (API 프록시 사용)
  const handleNicknameSetup = async () => {
    if (!user || !setupNickname.trim()) return;
    
    setNicknameError("");
    setNicknameSaving(true);

    try {
      // 닉네임 검증
      if (setupNickname.length < 2 || setupNickname.length > 20) {
        throw new Error("닉네임은 2~20자로 입력해주세요.");
      }

      // 프로필 생성 (API에서 중복 확인도 처리)
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          nickname: setupNickname.trim(),
          email: user.email,
          avatar_url: user.user_metadata?.avatar_url || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "프로필 생성 실패");
      }

      // 프로필 다시 가져오기
      await fetchProfile(user.id);
      setNeedsNicknameSetup(false);
    } catch (error) {
      console.error("닉네임 설정 에러:", error);
      setNicknameError(error instanceof Error ? error.message : "닉네임 설정 실패");
    } finally {
      setNicknameSaving(false);
    }
  };

  // 닉네임 변경 (API 프록시 사용)
  const handleNicknameChange = async () => {
    if (!user || !newNickname.trim()) return;
    
    setNicknameError("");
    setNicknameSaving(true);

    try {
      // 닉네임 검증
      if (newNickname.length < 2 || newNickname.length > 20) {
        throw new Error("닉네임은 2~20자로 입력해주세요.");
      }

      // 닉네임 업데이트 (API에서 중복 확인도 처리)
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          nickname: newNickname.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "닉네임 변경 실패");
      }

      // 프로필 새로고침
      await fetchProfile(user.id);
      setIsEditingNickname(false);
      setNewNickname("");
      alert("닉네임이 변경되었습니다!");
    } catch (error) {
      console.error("닉네임 변경 에러:", error);
      setNicknameError(error instanceof Error ? error.message : "닉네임 변경 실패");
    } finally {
      setNicknameSaving(false);
    }
  };

  // 국가 변경 (API 프록시 사용)
  const handleCountryChange = async (countryCode: string) => {
    if (!user) return;
    
    setCountrySaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          country: countryCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "국가 변경 실패");
      }

      // 프로필 새로고침
      await fetchProfile(user.id);
      setIsEditingCountry(false);
    } catch (error) {
      console.error("국가 변경 에러:", error);
      alert("국가 변경에 실패했습니다.");
    } finally {
      setCountrySaving(false);
    }
  };

  // 프로필 사진 업로드 (API 프록시 사용)
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하로 업로드해주세요.");
      return;
    }
    
    // 이미지 타입 검증
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    
    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);
      if (profile?.avatar_url) {
        formData.append("oldAvatarUrl", profile.avatar_url);
      }

      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "업로드 실패");
      }
      
      await fetchProfile(user.id);
      alert("프로필 사진이 변경되었습니다!");
    } catch (error) {
      console.error("프로필 사진 업로드 에러:", error);
      alert("프로필 사진 업로드에 실패했습니다.");
    } finally {
      setAvatarUploading(false);
    }
  };

  // 이메일 회원가입
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      // 닉네임 검증
      if (nickname.length < 2 || nickname.length > 20) {
        throw new Error("닉네임은 2~20자로 입력해주세요.");
      }

      // 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: nickname,
            nickname: nickname,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        alert("회원가입 완료! 이메일 인증 후 로그인해주세요.");
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setNickname("");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      setAuthError(error instanceof Error ? error.message : "회원가입 실패");
    } finally {
      setAuthLoading(false);
    }
  };

  // 이메일 로그인
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log("로그인 성공:", data);
      
      // 프로필이 없으면 생성 (API 프록시 사용)
      if (data.user) {
        const profileResponse = await fetch(`/api/profile?userId=${data.user.id}`);
        const profileData = await profileResponse.json();
          
        if (profileData.notFound) {
          await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: data.user.id,
              nickname: data.user.user_metadata?.nickname || data.user.user_metadata?.full_name || "User",
              email: data.user.email,
            }),
          });
        }
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setAuthError(error instanceof Error ? error.message : "로그인 실패");
    } finally {
      setAuthLoading(false);
    }
  };

  // 출석체크 함수 (API 프록시 사용)
  const handleAttendance = async () => {
    if (!user || checkedInToday || checkingIn) return;

    setCheckingIn(true);

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.alreadyChecked) {
          alert("이미 오늘 출석체크를 완료했어요!");
          setCheckedInToday(true);
        } else {
          throw new Error(data.error || "출석체크 실패");
        }
      } else {
        setCheckedInToday(true);
        setShowConfetti(true);
        // 프로필 새로고침
        await fetchProfile(user.id);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error("출석체크 에러:", error);
      alert("출석체크 실패! 다시 시도해주세요.");
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 출석체크 성공 시 컨페티 효과 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][
                  Math.floor(Math.random() * 5)
                ],
                width: "10px",
                height: "10px",
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-dark-800 rounded-2xl p-8 max-w-md w-full shadow-xl border border-dark-700">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          🎮 SLOX 회원
        </h1>

        {user && !profile && !needsNicknameSetup ? (
          // 프로필 로딩 중 또는 에러
          <div className="text-center py-8">
            {profileError ? (
              <>
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <p className="text-gray-400 mb-2">프로필을 불러오지 못했어요</p>
                <p className="text-gray-500 text-sm mb-4">네트워크 연결을 확인해주세요</p>
                <button
                  onClick={() => fetchProfile(user.id, user.email, user.user_metadata?.full_name)}
                  disabled={profileLoading}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {profileLoading ? "로딩 중..." : "다시 시도"}
                </button>
              </>
            ) : (
              <>
                <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-400">프로필 불러오는 중...</p>
                <button
                  onClick={() => fetchProfile(user.id, user.email, user.user_metadata?.full_name)}
                  className="mt-4 text-sm text-primary-400 hover:underline"
                >
                  다시 시도
                </button>
              </>
            )}
          </div>
        ) : user && needsNicknameSetup ? (
          // 닉네임 설정 필요 (신규 가입자)
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
              <p className="text-yellow-400 font-semibold">
                🎉 환영합니다! 닉네임을 설정해주세요
              </p>
            </div>

            <div className="text-center">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="프로필"
                  className="w-20 h-20 rounded-full border-2 border-primary-500 mx-auto mb-4"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                  ?
                </div>
              )}
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={setupNickname}
                onChange={(e) => setSetupNickname(e.target.value)}
                placeholder="닉네임 입력 (2~20자)"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 text-center text-lg"
                maxLength={20}
              />
              {nicknameError && (
                <p className="text-red-400 text-sm text-center">{nicknameError}</p>
              )}
              <button
                onClick={handleNicknameSetup}
                disabled={nicknameSaving || setupNickname.length < 2}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {nicknameSaving ? "설정 중..." : "시작하기 🚀"}
              </button>
            </div>

            <p className="text-gray-500 text-xs text-center">
              닉네임은 랭킹에 표시되며, 나중에 변경할 수 있어요.
            </p>
          </div>
        ) : user && profile ? (
          // 로그인 된 상태
          <div className="space-y-6">
            {/* 프로필 카드 */}
            <div className="bg-gradient-to-br from-primary-600/20 to-primary-800/20 border border-primary-500/30 rounded-xl p-4">
              <div className="flex items-center gap-4">
                {/* 프로필 사진 (클릭하여 수정) */}
                <label className="relative cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={avatarUploading}
                    className="hidden"
                  />
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="프로필"
                      className="w-16 h-16 rounded-full border-2 border-primary-500 object-cover group-hover:opacity-70 transition-opacity"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-2xl font-bold text-white group-hover:opacity-70 transition-opacity">
                      {profile.nickname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* 수정 아이콘 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xl drop-shadow-lg">📷</span>
                  </div>
                  {/* 업로드 중 표시 */}
                  {avatarUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </label>
                <div className="flex-1">
                  {isEditingNickname ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newNickname}
                        onChange={(e) => setNewNickname(e.target.value)}
                        placeholder="새 닉네임 (2~20자)"
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
                        maxLength={20}
                      />
                      {nicknameError && (
                        <p className="text-red-400 text-xs">{nicknameError}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={handleNicknameChange}
                          disabled={nicknameSaving || !newNickname.trim()}
                          className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg disabled:opacity-50"
                        >
                          {nicknameSaving ? "저장 중..." : "저장"}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingNickname(false);
                            setNewNickname("");
                            setNicknameError("");
                          }}
                          className="px-3 py-1 bg-dark-600 hover:bg-dark-500 text-gray-300 text-sm rounded-lg"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-bold text-lg">
                          {profile.nickname}
                        </p>
                        <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                          회원
                        </span>
                        <button
                          onClick={() => {
                            setIsEditingNickname(true);
                            setNewNickname(profile.nickname);
                          }}
                          className="text-gray-400 hover:text-white text-xs ml-1"
                          title="닉네임 수정"
                        >
                          ✏️
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">{profile.email}</p>
                      {/* 국가 표시 및 수정 */}
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
                              className="px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded disabled:opacity-50"
                            >
                              {countrySaving ? "..." : "저장"}
                            </button>
                            <button
                              onClick={() => setIsEditingCountry(false)}
                              className="px-2 py-1 bg-dark-600 hover:bg-dark-500 text-gray-300 text-xs rounded"
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setNewCountry(profile.country || "KR");
                              setIsEditingCountry(true);
                            }}
                            className="flex items-center gap-1.5 px-2 py-1 bg-dark-700 hover:bg-dark-600 rounded text-sm transition-colors"
                            title="국가 변경"
                          >
                            <span className="text-lg">{COUNTRY_OPTIONS.find(c => c.code === (profile.country || "KR"))?.flag || "🌍"}</span>
                            <span className="text-dark-400">{COUNTRY_OPTIONS.find(c => c.code === (profile.country || "KR"))?.name || "기타"}</span>
                            <span className="text-gray-500 text-xs">✏️</span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 포인트 & 출석 통계 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-700 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">총 점수</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {profile.total_score.toLocaleString()}
                </p>
              </div>
              <div className="bg-dark-700 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">출석 횟수</p>
                <p className="text-3xl font-bold text-green-400">
                  {profile.attendance_count}일
                </p>
              </div>
            </div>

            {/* 출석체크 버튼 */}
            <button
              onClick={handleAttendance}
              disabled={checkedInToday || checkingIn}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                checkedInToday
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {checkingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  처리 중...
                </span>
              ) : checkedInToday ? (
                "✅ 오늘 출석 완료!"
              ) : (
                "📅 출석체크 (+10점)"
              )}
            </button>

            {/* 안내 메시지 */}
            <div className="bg-dark-700/50 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-sm">
                💡 매일 출석하면 <span className="text-yellow-400">+10점</span>!
                <br />
                게임 1등도 점수에 반영돼요!
              </p>
            </div>

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-dark-700 hover:bg-dark-600 text-gray-400 hover:text-white font-semibold rounded-xl transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그인 안 된 상태
          <div className="space-y-4">
            <p className="text-gray-400 text-center mb-6">
              로그인하고 출석체크로 점수를 모으세요!
            </p>

            {/* 이메일 로그인/회원가입 폼 */}
            <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin} className="space-y-3">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="닉네임 (2~20자)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  minLength={2}
                  maxLength={20}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                />
              )}
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              <input
                type="password"
                placeholder="비밀번호 (6자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              
              {authError && (
                <p className="text-red-400 text-sm text-center">{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {authLoading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError("");
              }}
              className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors"
            >
              {isSignUp ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 회원가입"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-gray-500">또는</span>
              </div>
            </div>

            {/* Google 로그인 */}
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </button>

            {/* 카카오 로그인 (준비중) */}
            <button
              disabled
              className="w-full py-3 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-xl opacity-50 cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E">
                <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.55 1.69 4.79 4.22 6.08l-.85 3.18c-.07.26.21.46.44.32l3.72-2.33c.79.13 1.62.2 2.47.2 5.52 0 10-3.48 10-7.75S17.52 3 12 3z" />
              </svg>
              카카오 (준비중)
            </button>

            {/* 네이버 로그인 (준비중) */}
            <button
              disabled
              className="w-full py-3 bg-[#03C75A] text-white font-semibold rounded-xl opacity-50 cursor-not-allowed flex items-center justify-center gap-3"
            >
              <span className="font-bold text-lg">N</span>
              네이버 (준비중)
            </button>

            {/* 혜택 안내 */}
            <div className="mt-6 bg-dark-700/50 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3 text-center">
                🎁 회원 혜택
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  매일 출석체크로 +10점
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  랭킹에 회원 마크 표시
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  종합 랭킹 1위 이벤트 참여
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  게임 1위 문화상품권 이벤트
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-dark-700">
          <a
            href="/"
            className="block text-center text-gray-400 hover:text-white transition-colors"
          >
            ← 메인으로 돌아가기
          </a>
        </div>
      </div>

      {/* CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
