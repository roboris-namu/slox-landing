"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  country?: string;
}

const COUNTRY_OPTIONS = [
  { code: "KR", flag: "🇰🇷", name: "Corée du Sud" },
  { code: "US", flag: "🇺🇸", name: "États-Unis" },
  { code: "JP", flag: "🇯🇵", name: "Japon" },
  { code: "CN", flag: "🇨🇳", name: "Chine" },
  { code: "DE", flag: "🇩🇪", name: "Allemagne" },
  { code: "FR", flag: "🇫🇷", name: "France" },
  { code: "ES", flag: "🇪🇸", name: "Espagne" },
  { code: "BR", flag: "🇧🇷", name: "Brésil" },
  { code: "GB", flag: "🇬🇧", name: "Royaume-Uni" },
  { code: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "AU", flag: "🇦🇺", name: "Australie" },
  { code: "IN", flag: "🇮🇳", name: "Inde" },
  { code: "RU", flag: "🇷🇺", name: "Russie" },
  { code: "IT", flag: "🇮🇹", name: "Italie" },
  { code: "MX", flag: "🇲🇽", name: "Mexique" },
  { code: "TH", flag: "🇹🇭", name: "Thaïlande" },
  { code: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "ID", flag: "🇮🇩", name: "Indonésie" },
  { code: "PH", flag: "🇵🇭", name: "Philippines" },
  { code: "MY", flag: "🇲🇾", name: "Malaisie" },
  { code: "SG", flag: "🇸🇬", name: "Singapour" },
  { code: "NZ", flag: "🇳🇿", name: "Nouvelle-Zélande" },
  { code: "OTHER", flag: "🌍", name: "Autre" },
];

const locale = "fr";
const t = authTranslations[locale];

function LoginContentFR() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _redirectUrl = searchParams.get("redirect");
  
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [needsNicknameSetup, setNeedsNicknameSetup] = useState(false);
  const [setupNickname, setSetupNickname] = useState("");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [newCountry, setNewCountry] = useState("FR");
  const [countrySaving, setCountrySaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  
  // Changement de mot de passe
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Changement de mot de passe
  const handlePasswordChange = async () => {
    if (!user) return;
    setPasswordError("");
    if (newPassword.length < 6) { setPasswordError("Le mot de passe doit contenir au moins 6 caractères"); return; }
    if (newPassword !== confirmPassword) { setPasswordError("Les mots de passe ne correspondent pas"); return; }
    setPasswordSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new Error(error.message);
      alert("Mot de passe changé!");
      setIsEditingPassword(false); setNewPassword(""); setConfirmPassword("");
    } catch (err) { setPasswordError(err instanceof Error ? err.message : "Échec du changement de mot de passe"); }
    finally { setPasswordSaving(false); }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) { alert("La taille du fichier doit être inférieure à 5 Mo."); return; }
    if (!file.type.startsWith("image/")) { alert("Seuls les fichiers image sont autorisés."); return; }
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
      alert("Photo de profil mise à jour !");
    } catch (error) { console.error("Avatar upload error:", error); alert("Échec du téléchargement de la photo."); }
    finally { setAvatarUploading(false); }
  };

  const handleCountryChange = async (countryCode: string) => {
    if (!user) return;
    setCountrySaving(true);
    try {
      const { error } = await supabase.from("profiles").update({ country: countryCode, updated_at: new Date().toISOString() }).eq("id", user.id);
      if (!error && profile) { setProfile({ ...profile, country: countryCode }); setIsEditingCountry(false); }
    } finally { setCountrySaving(false); }
  };

  const fetchProfile = useCallback(async (userId: string, userName?: string) => {
    setProfileLoading(true);
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      const data = await response.json();
      if (data.notFound) { setSetupNickname(userName || ""); setNeedsNicknameSetup(true); setProfileLoading(false); return; }
      if (data.profile) {
        setProfile(data.profile);
        setNeedsNicknameSetup(false);
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        const loginRedirect = localStorage.getItem("login_redirect");
        const pendingBattle = localStorage.getItem("pending_battle");
        const pendingScore = localStorage.getItem("pending_game_score");
        if (redirect) { window.location.href = redirect; }
        else if (loginRedirect) { localStorage.removeItem("login_redirect"); window.location.href = loginRedirect; }
        else if (pendingBattle) { localStorage.removeItem("pending_battle"); window.location.href = `/battle/${pendingBattle}`; }
        else if (pendingScore) { const scoreData = JSON.parse(pendingScore); window.location.href = `/${locale}/${scoreData.game}`; }
      }
    } finally { setProfileLoading(false); }
  }, []);

  const checkTodayAttendance = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/attendance?userId=${userId}`);
      const data = await response.json();
      setCheckedInToday(data.checkedInToday || false);
    } catch { setCheckedInToday(false); }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      // 📱 PKCE 플로우 감지 (모바일)
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      if (authCode) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
          if (!error && data.session) {
            localStorage.setItem("slox-session", JSON.stringify({ user: data.session.user, access_token: data.session.access_token, refresh_token: data.session.refresh_token, expires_at: data.session.expires_at }));
            window.history.replaceState(null, "", window.location.pathname);
            setUser(data.session.user);
            await fetchProfile(data.session.user.id, data.session.user.user_metadata?.name);
            await checkTodayAttendance(data.session.user.id);
            setLoading(false);
            return;
          }
        } catch { /* 무시 */ }
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) { setUser(session.user); await fetchProfile(session.user.id, session.user.user_metadata?.name); await checkTodayAttendance(session.user.id); }
      setLoading(false);
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) { setUser(session.user); await fetchProfile(session.user.id, session.user.user_metadata?.name); await checkTodayAttendance(session.user.id); }
      else if (event === "SIGNED_OUT") { setUser(null); setProfile(null); }
    });
    return () => subscription.unsubscribe();
  }, [fetchProfile, checkTodayAttendance]);

  const handleCheckIn = async () => {
    if (!user || checkingIn || checkedInToday) return;
    setCheckingIn(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { error } = await supabase.from("attendance").insert({ user_id: user.id, check_date: today, points_earned: 10 });
      if (!error) { await supabase.rpc("increment_score", { user_id: user.id, amount: 10 }); await supabase.rpc("increment_attendance", { user_id: user.id }); setCheckedInToday(true); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000); if (profile) setProfile({ ...profile, total_score: profile.total_score + 10, attendance_count: profile.attendance_count + 1 }); }
    } finally { setCheckingIn(false); }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); setAuthError(""); setAuthLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) throw new Error("Veuillez entrer un email valide");
      const emailCheckRes = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
      if ((await emailCheckRes.json()).profile) throw new Error("Cet email est déjà enregistré");
      const nicknameCheckRes = await fetch(`/api/profile?nickname=${encodeURIComponent(nickname.trim())}`);
      if ((await nicknameCheckRes.json()).profile) throw new Error("Ce pseudo est déjà utilisé");
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nickname: nickname.trim() } } });
      if (error) throw error;
      if (data.user) { await fetch("/api/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: data.user.id, nickname: nickname.trim(), email, avatar_url: null, total_score: 0, attendance_count: 0 }) }); alert("Inscription terminée !"); setIsSignUp(false); setEmail(""); setPassword(""); setNickname(""); }
    } catch (err) { setAuthError(err instanceof Error ? err.message : "Échec de l'inscription"); } finally { setAuthLoading(false); }
  };
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setAuthError(""); setAuthLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) throw new Error("Veuillez entrer un email valide");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Email ou mot de passe incorrect");
    } catch (err) { setAuthError(err instanceof Error ? err.message : "Échec de la connexion"); } finally { setAuthLoading(false); }
  };
  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };

  const handleSaveNickname = async () => {
    if (!user || !newNickname.trim() || newNickname.trim().length < 2) { setNicknameError(t.profile.nicknameTooShort); return; }
    setNicknameSaving(true);
    try { const { error } = await supabase.from("profiles").update({ nickname: newNickname.trim() }).eq("id", user.id); if (!error && profile) { setProfile({ ...profile, nickname: newNickname.trim() }); setIsEditingNickname(false); } }
    finally { setNicknameSaving(false); }
  };

  const handleSetupNickname = async () => {
    if (!user || !setupNickname.trim() || setupNickname.trim().length < 2) return;
    try { const { error } = await supabase.from("profiles").insert({ id: user.id, nickname: setupNickname.trim(), email: user.email || "", avatar_url: user.user_metadata?.avatar_url || null, total_score: 0, attendance_count: 0 }); if (!error) await fetchProfile(user.id); }
    catch (err) { console.error(err); }
  };

  if (loading) return <main className="min-h-screen bg-dark-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-500" /></main>;

  if (!user) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden"><div className="premium-bg" />
        <nav className="fixed top-0 left-0 right-0 z-50 p-4"><div className="max-w-6xl mx-auto flex justify-between"><Link href={`/${locale}`} className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold text-sm">S</span></div><span className="font-bold text-lg text-white">SLOX</span></Link></div></nav>
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full">
            <div className="text-center mb-8"><h1 className="text-3xl font-black text-white mb-3">{t.login.title}</h1><p className="text-dark-400">{t.login.subtitle}</p></div>
            <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin} className="space-y-3">
                {isSignUp && <input type="text" placeholder="Pseudo (2-20 caractères)" value={nickname} onChange={(e) => setNickname(e.target.value)} required minLength={2} maxLength={20} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500" />}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500" />
                <input type="password" placeholder="Mot de passe (6+ caractères)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500" />
                {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
                <button type="submit" disabled={authLoading} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50">{authLoading ? "Traitement..." : isSignUp ? "S'inscrire" : "Se connecter"}</button>
              </form>
              <button type="button" onClick={() => { setIsSignUp(!isSignUp); setAuthError(""); }} className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors">{isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}</button>
            </div>
            <div className="mt-8 bg-dark-800/30 rounded-2xl p-6 border border-white/5"><h3 className="text-white font-semibold mb-4">{t.login.benefits}</h3><ul className="space-y-3 text-dark-300 text-sm"><li>{t.login.benefit1}</li><li>{t.login.benefit2}</li><li>{t.login.benefit3}</li><li>{t.login.benefit4}</li></ul></div>
          </div>
        </div>
      </main>
    );
  }

  if (needsNicknameSetup) return <main className="min-h-screen bg-dark-950 flex items-center justify-center px-4"><div className="max-w-md w-full bg-dark-800/50 rounded-2xl border border-white/10 p-8"><h2 className="text-2xl font-bold text-white mb-4 text-center">🎉 Bienvenue!</h2><p className="text-dark-400 text-center mb-6">Veuillez définir votre pseudo</p><input type="text" value={setupNickname} onChange={(e) => setSetupNickname(e.target.value)} placeholder={t.profile.nickname} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white mb-4" maxLength={20} /><button onClick={handleSetupNickname} disabled={setupNickname.trim().length < 2} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-xl disabled:opacity-50">Commencer</button></div></main>;
  if (profileLoading) return <main className="min-h-screen bg-dark-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-500" /></main>;

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden"><div className="premium-bg" />{showConfetti && <div className="confetti" />}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4"><div className="max-w-6xl mx-auto flex justify-between"><Link href={`/${locale}`} className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"><span className="text-white font-bold text-sm">S</span></div><span className="font-bold text-lg text-white">SLOX</span></Link></div></nav>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <div className="max-w-md w-full space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-6"><label className="relative cursor-pointer group"><input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={avatarUploading} className="hidden" /><div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent-500 group-hover:opacity-70 transition-opacity">{profile?.avatar_url ? <img src={profile.avatar_url} alt={profile.nickname} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-accent-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">{profile?.nickname?.charAt(0).toUpperCase()}</div>}</div><div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-xl drop-shadow-lg">📷</span></div>{avatarUploading && <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>}</label><div>{isEditingNickname ? <div className="flex items-center gap-2"><input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm" maxLength={20} /><button onClick={handleSaveNickname} disabled={nicknameSaving} className="px-3 py-1 bg-accent-500 text-white rounded-lg text-sm">{nicknameSaving ? "..." : t.profile.save}</button><button onClick={() => setIsEditingNickname(false)} className="px-3 py-1 bg-dark-700 text-white rounded-lg text-sm">✕</button></div> : <div className="flex items-center gap-2"><h2 className="text-xl font-bold text-white">{profile?.nickname}</h2><button onClick={() => { setNewNickname(profile?.nickname || ""); setIsEditingNickname(true); }} className="text-dark-500 hover:text-white text-sm">✏️</button></div>}{nicknameError && <p className="text-red-400 text-xs mt-1">{nicknameError}</p>}<p className="text-dark-400 text-sm">{profile?.email}</p><div className="flex items-center gap-2 mt-2">{isEditingCountry ? <div className="flex items-center gap-2"><select value={newCountry} onChange={(e) => setNewCountry(e.target.value)} className="px-2 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm">{COUNTRY_OPTIONS.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}</select><button onClick={() => handleCountryChange(newCountry)} disabled={countrySaving} className="px-2 py-1 bg-accent-500 text-white text-xs rounded">{countrySaving ? "..." : "Sauv."}</button><button onClick={() => setIsEditingCountry(false)} className="px-2 py-1 bg-dark-600 text-gray-300 text-xs rounded">✕</button></div> : <button onClick={() => { setNewCountry(profile?.country || "FR"); setIsEditingCountry(true); }} className="flex items-center gap-1.5 px-2 py-1 bg-dark-700 hover:bg-dark-600 rounded text-sm"><span className="text-lg">{COUNTRY_OPTIONS.find(c => c.code === (profile?.country || "FR"))?.flag || "🌍"}</span><span className="text-dark-400">{COUNTRY_OPTIONS.find(c => c.code === (profile?.country || "FR"))?.name || "Autre"}</span><span className="text-gray-500 text-xs">✏️</span></button>}</div></div></div>
            <div className="grid grid-cols-2 gap-4 mb-6"><div className="bg-dark-700/50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-white">{profile?.total_score.toLocaleString()}</p><p className="text-dark-400 text-sm">{t.profile.totalScore}</p></div><div className="bg-dark-700/50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-white">{profile?.attendance_count}</p><p className="text-dark-400 text-sm">{t.profile.attendance}</p></div></div>
            <button onClick={handleCheckIn} disabled={checkedInToday || checkingIn} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${checkedInToday ? "bg-green-500/20 text-green-400" : "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:shadow-glow-md"}`}>{checkingIn ? "..." : checkedInToday ? `✅ ${t.attendance.checkInComplete}` : `📅 ${t.attendance.checkIn} (+10${t.profile.points})`}</button>
          </div>
          {/* Changement de mot de passe */}
          <div className="bg-dark-700/50 rounded-xl p-4">
            {isEditingPassword ? (
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-center mb-3">🔐 Changer le Mot de Passe</h3>
                <input type="password" placeholder="Nouveau mot de passe (min. 6 car.)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white text-sm" />
                <input type="password" placeholder="Confirmer le nouveau mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 bg-dark-600 border border-dark-500 rounded-lg text-white text-sm" />
                {passwordError && <p className="text-red-400 text-xs text-center">{passwordError}</p>}
                <div className="flex gap-2">
                  <button onClick={handlePasswordChange} disabled={passwordSaving || !newPassword || !confirmPassword} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50">{passwordSaving ? "Modification..." : "Changer"}</button>
                  <button onClick={() => { setIsEditingPassword(false); setNewPassword(""); setConfirmPassword(""); setPasswordError(""); }} className="flex-1 py-2 bg-dark-600 hover:bg-dark-500 text-gray-300 text-sm rounded-lg">Annuler</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsEditingPassword(true)} className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors">🔐 Changer le Mot de Passe</button>
            )}
          </div>
          <button onClick={handleLogout} className="w-full py-3 bg-dark-800/50 border border-white/10 rounded-xl text-red-400 font-medium hover:bg-red-500/10">🚪 {t.profile.logout}</button>
        </div>
      </div>
    </main>
  );
}

export default function LoginPageFR() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-500" /></div>}>
      <LoginContentFR />
    </Suspense>
  );
}
