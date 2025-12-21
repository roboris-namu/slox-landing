"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ReactionTest from "@/components/ReactionTest";
import CpsTest from "@/components/CpsTest";
import MemoryTest from "@/components/MemoryTest";
import ColorTest from "@/components/ColorTest";
import AimTest from "@/components/AimTest";
import CardMatchGame from "@/components/CardMatchGame";
import QuizGame from "@/components/QuizGame";
import IQTest from "@/components/IQTest";
import Sudoku from "@/components/Sudoku";
import TypingMulti from "@/components/games/TypingMulti";

const locale = "en";

interface Challenge {
  id: string;
  challenger_id: string;
  challenger_nickname: string;
  challenger_avatar?: string | null;
  challenger_score: number;
  opponent_id: string | null;
  opponent_nickname: string | null;
  opponent_avatar?: string | null;
  opponent_score: number | null;
  game: string;
  status: "pending" | "accepted" | "completed" | "forfeited" | "expired";
  winner_id: string | null;
  is_draw: boolean;
  points_transferred: number;
  created_at: string;
  expires_at: string;
}

interface UserSession { userId: string; nickname: string; totalScore: number; }

const GAME_CONFIG: Record<string, { name: string; emoji: string; unit: string; lowerIsBetter: boolean }> = {
  reaction: { name: "Reaction", emoji: "⚡", unit: "ms", lowerIsBetter: true },
  cps: { name: "CPS", emoji: "👆", unit: "CPS", lowerIsBetter: false },
  memory: { name: "Memory", emoji: "🧠", unit: "pts", lowerIsBetter: false },
  color: { name: "Color", emoji: "🎨", unit: "pts", lowerIsBetter: false },
  aim: { name: "Aim", emoji: "🎯", unit: "pts", lowerIsBetter: false },
  cardmatch: { name: "Card Match", emoji: "🃏", unit: "pts", lowerIsBetter: false },
  quiz: { name: "Quiz", emoji: "❓", unit: "pts", lowerIsBetter: false },
  iq: { name: "IQ Test", emoji: "🧩", unit: "IQ", lowerIsBetter: false },
  sudoku: { name: "Sudoku", emoji: "🔢", unit: "s", lowerIsBetter: true },
  typing: { name: "Typing", emoji: "⌨️", unit: "WPM", lowerIsBetter: false },
};

const GAME_URL_MAP: Record<string, string> = {
  reaction: `/${locale}/reaction`, cps: `/${locale}/cps`, memory: `/${locale}/memory`,
  color: `/${locale}/color`, aim: `/${locale}/aim`, cardmatch: `/${locale}/card-match`,
  quiz: `/${locale}/quiz`, iq: `/${locale}/iq`, sudoku: `/${locale}/sudoku`, typing: `/${locale}/typing`,
};

function getGameUrl(game: string): string { return GAME_URL_MAP[game] || `/${locale}/${game}`; }

export default function BattlePageEN() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;
  
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<"loading" | "info" | "playing" | "result">("loading");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_gameScore, setGameScore] = useState<number | null>(null);
  const [battleResult, setBattleResult] = useState<{ isDraw: boolean; winnerId: string | null; loserId: string | null; pointsTransferred: number; } | null>(null);
  const isPlayingRef = useRef(false);

  const checkSession = useCallback(() => {
    try {
      const sessionStr = localStorage.getItem("slox-session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.user?.id) return { userId: session.user.id, nickname: session.nickname || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User", totalScore: session.totalScore || 0 };
      }
    } catch (e) { console.error("Session error:", e); }
    return null;
  }, []);

  const fetchChallenge = useCallback(async () => {
    try {
      const res = await fetch(`/api/battle?id=${challengeId}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to load challenge"); return null; }
      return data.challenge as Challenge;
    } catch (err) { console.error("Challenge load error:", err); setError("Error loading challenge"); return null; }
  }, [challengeId]);

  const fetchMyScore = useCallback(async (userId: string) => {
    try { const res = await fetch(`/api/profile?userId=${userId}`); const data = await res.json(); return data.profile?.total_score || 0; } catch { return 0; }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const session = checkSession();
      const challengeData = await fetchChallenge();
      if (!challengeData) { setLoading(false); return; }
      setChallenge(challengeData);
      if (challengeData.status === "completed" || challengeData.status === "forfeited") {
        setStage("result"); localStorage.removeItem("pending_battle"); localStorage.removeItem("login_redirect");
      } else if (challengeData.status === "expired") { setError("Challenge expired");
      } else if (session) {
        const myScore = await fetchMyScore(session.userId);
        setUser({ ...session, totalScore: myScore });
        if (challengeData.status === "accepted" && challengeData.opponent_id === session.userId) { setStage("playing"); isPlayingRef.current = true; }
        else { setStage("info"); }
      } else { setStage("info"); }
      setLoading(false);
    };
    init();
  }, [challengeId, checkSession, fetchChallenge, fetchMyScore, router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPlayingRef.current && challenge?.status === "accepted") {
        navigator.sendBeacon("/api/battle", JSON.stringify({ action: "forfeit", challengeId: challenge.id, forfeiterId: user?.userId }));
        e.preventDefault(); e.returnValue = "Leaving will result in a loss. Are you sure?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [challenge, user]);

  const handleAccept = async () => {
    if (!user || !challenge) return;
    if (challenge.challenger_id === user.userId) { setError("Cannot challenge yourself"); return; }
    try {
      const res = await fetch("/api/battle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "accept", challengeId: challenge.id, opponentId: user.userId, opponentNickname: user.nickname }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to accept"); return; }
      setChallenge(data.challenge); setStage("playing"); isPlayingRef.current = true;
    } catch (err) { console.error("Accept error:", err); setError("Error accepting challenge"); }
  };

  const handleGameComplete = async (score: number) => {
    if (!challenge || !user) return;
    isPlayingRef.current = false; setGameScore(score);
    try {
      const res = await fetch("/api/battle", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "complete", challengeId: challenge.id, opponentScore: score }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to process result"); return; }
      setChallenge(data.challenge); setBattleResult(data.result); setStage("result");
    } catch (err) { console.error("Complete error:", err); setError("Error processing result"); }
  };

  const formatScore = (game: string, score: number) => {
    const config = GAME_CONFIG[game];
    if (!config) return score.toString();
    if (game === "reaction" || game === "sudoku") return `${(score / 1000).toFixed(2)}${config.unit === "ms" ? "s" : config.unit}`;
    return `${score}${config.unit}`;
  };

  const calculatePotentialLoss = () => { if (!user) return 0; const loss = Math.floor(Math.abs(user.totalScore) * 0.1); return Math.max(5, Math.min(50, loss)); };

  if (loading || stage === "loading") return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center"><div className="text-center"><div className="text-6xl mb-4 animate-bounce">🥊</div><p className="text-white text-xl">Loading challenge...</p></div></div>);
  if (error) return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4"><div className="glass-card p-8 rounded-2xl text-center max-w-md"><div className="text-6xl mb-4">😢</div><h1 className="text-2xl font-bold text-white mb-4">Error</h1><p className="text-dark-400 mb-6">{error}</p><Link href={`/${locale}`} className="btn-primary px-6 py-3 rounded-xl">Back to Main</Link></div></div>);

  if (stage === "info" && challenge && user && challenge.challenger_id === user.userId) {
    const gameConfig = GAME_CONFIG[challenge.game];
    return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4"><div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full"><div className="text-6xl mb-4">📤</div><h1 className="text-2xl font-bold text-white mb-2">Your Challenge!</h1><p className="text-dark-400 mb-8">Share this link with friends</p><div className="bg-dark-800/50 rounded-xl p-6 mb-6"><div className="flex items-center justify-center gap-3 mb-4"><span className="text-4xl">{gameConfig?.emoji}</span><span className="text-xl font-bold text-white">{gameConfig?.name}</span></div><div className="text-4xl font-bold text-primary-400 mb-2">{formatScore(challenge.game, challenge.challenger_score)}</div><p className="text-dark-400">Your score</p></div><div className="bg-dark-800/30 rounded-xl p-4 mb-6"><p className="text-dark-400 text-sm mb-2">Challenge Link</p><p className="text-white text-xs break-all">{typeof window !== "undefined" ? window.location.href : ""}</p></div><div className="flex gap-4"><button onClick={() => { const url = window.location.href; const text = `🥊 Challenge from ${user.nickname}!\n\n${gameConfig?.emoji} ${gameConfig?.name}: ${formatScore(challenge.game, challenge.challenger_score)}\n\nCan you beat this? 👉\n${url}`; navigator.clipboard.writeText(text); alert("Copied! Share with friends 🎮"); }} className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-bold transition-all">📋 Copy Link</button><button onClick={() => { localStorage.removeItem("pending_battle"); localStorage.removeItem("login_redirect"); window.location.href = `/${locale}`; }} className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-4 rounded-xl font-bold transition-colors text-center flex items-center justify-center">Home</button></div></div></div>);
  }

  if (stage === "info" && challenge) {
    const gameConfig = GAME_CONFIG[challenge.game];
    const potentialLoss = user ? calculatePotentialLoss() : 5;
    const handleLoginRedirect = () => { localStorage.setItem("pending_battle", challengeId); router.push(`/${locale}/login?redirect=/${locale}/battle/${challengeId}`); };
    return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4"><div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full"><div className="text-6xl mb-4">🥊</div><h1 className="text-3xl font-bold text-white mb-2">Challenge!</h1><p className="text-dark-400 mb-8">{challenge.challenger_nickname} sent you a challenge</p><div className="bg-dark-800/50 rounded-xl p-6 mb-6"><div className="flex items-center justify-center gap-3 mb-4"><span className="text-4xl">{gameConfig?.emoji}</span><span className="text-xl font-bold text-white">{gameConfig?.name}</span></div><div className="text-4xl font-bold text-primary-400 mb-2">{formatScore(challenge.game, challenge.challenger_score)}</div><p className="text-dark-400">{challenge.challenger_nickname}&apos;s score</p></div><div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6"><p className="text-red-400 text-sm">⚠️ Once accepted, you must complete the game<br/>Leaving = Loss</p></div>{user ? (<div className="bg-dark-800/30 rounded-xl p-4 mb-6"><div className="flex justify-between items-center text-sm"><span className="text-dark-400">Your score</span><span className="text-white font-bold">{user.totalScore}pts</span></div><div className="flex justify-between items-center text-sm mt-2"><span className="text-dark-400">Loss on defeat</span><span className="text-red-400 font-bold">-{potentialLoss}pts</span></div></div>) : (<div className="bg-primary-900/20 border border-primary-500/30 rounded-xl p-4 mb-6"><p className="text-primary-400 text-sm">🔐 Login to participate</p></div>)}<div className="flex gap-4"><button onClick={() => router.push(`/${locale}`)} className="flex-1 bg-dark-600 hover:bg-dark-500 border border-dark-500 text-white py-4 rounded-xl font-bold transition-colors">{user ? "Decline" : "Home"}</button>{user ? (<button onClick={handleAccept} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20">✅ Accept!</button>) : (<button onClick={handleLoginRedirect} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30">🔐 Login to Join!</button>)}</div><p className="text-dark-500 text-xs mt-4">Expires: {new Date(challenge.expires_at).toLocaleDateString()}</p></div></div>);
  }

  if (stage === "playing" && challenge) {
    const GameComponent = getGameComponent(challenge.game);
    return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"><div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-b border-red-500/20 py-3 px-4"><div className="max-w-4xl mx-auto flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-2xl">🥊</span><span className="text-white font-bold">Battle in Progress!</span></div><div className="text-sm text-dark-300">vs {challenge.challenger_nickname} ({formatScore(challenge.game, challenge.challenger_score)})</div></div></div><GameComponent locale={locale} battleMode={true} onBattleComplete={handleGameComplete} /></div>);
  }

  if (stage === "result" && challenge) {
    const gameConfig = GAME_CONFIG[challenge.game];
    const isParticipant = user?.userId === challenge.challenger_id || user?.userId === challenge.opponent_id;
    const isWinner = battleResult?.winnerId === user?.userId || challenge.winner_id === user?.userId;
    const isDraw = battleResult?.isDraw || challenge.is_draw;
    if (!isParticipant) return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4"><div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full"><div className="text-6xl mb-4">🏁</div><h1 className="text-2xl font-bold text-white mb-2">Battle Ended</h1><p className="text-dark-400 mb-6">This battle has already been completed</p><div className="bg-dark-800/50 rounded-xl p-6 mb-6"><div className="flex items-center justify-center gap-3 mb-4"><span className="text-3xl">{gameConfig?.emoji}</span><span className="text-lg font-bold text-white">{gameConfig?.name}</span></div><div className="grid grid-cols-3 gap-2 items-center text-sm"><div className="text-center"><p className="text-white font-bold">{challenge.challenger_nickname}</p><p className="text-primary-400">{formatScore(challenge.game, challenge.challenger_score)}</p></div><div className="text-dark-500">VS</div><div className="text-center"><p className="text-white font-bold">{challenge.opponent_nickname || "?"}</p><p className="text-primary-400">{challenge.opponent_score !== null ? formatScore(challenge.game, challenge.opponent_score) : "-"}</p></div></div>{challenge.winner_id && (<p className="text-green-400 mt-4">🏆 {challenge.winner_id === challenge.challenger_id ? challenge.challenger_nickname : challenge.opponent_nickname} wins!</p>)}{challenge.is_draw && (<p className="text-yellow-400 mt-4">🤝 Draw!</p>)}</div><Link href={`/${locale}`} className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all">Join a Battle! 🥊</Link></div></div>);
    return (<div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4"><div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full"><div className="text-7xl mb-4">{isDraw ? "🤝" : isWinner ? "🏆" : "😢"}</div><h1 className="text-3xl font-bold mb-2">{isDraw ? <span className="text-yellow-400">Draw!</span> : isWinner ? <span className="text-green-400">Victory!</span> : <span className="text-red-400">Defeat...</span>}</h1><div className="bg-dark-800/50 rounded-xl p-6 my-6"><div className="flex items-center justify-center gap-3 mb-4"><span className="text-3xl">{gameConfig?.emoji}</span><span className="text-lg font-bold text-white">{gameConfig?.name}</span></div><div className="grid grid-cols-3 gap-4 items-center"><div className={`p-4 rounded-xl ${challenge.winner_id === challenge.challenger_id ? "bg-green-900/30 border border-green-500/30" : "bg-dark-700/50"}`}><div className="flex items-center justify-center gap-2 mb-2"><span className="w-8 h-8 rounded-full bg-dark-600 overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{challenge.challenger_avatar ? <img src={challenge.challenger_avatar} alt="" className="w-full h-full object-cover" /> : challenge.challenger_nickname?.charAt(0).toUpperCase()}</span><p className="text-white font-bold text-sm">{challenge.challenger_nickname}</p></div><p className="text-2xl font-bold text-primary-400">{formatScore(challenge.game, challenge.challenger_score)}</p>{challenge.winner_id === challenge.challenger_id && <span className="text-green-400 text-sm">🏆 Winner</span>}</div><div className="text-4xl font-bold text-dark-500">VS</div><div className={`p-4 rounded-xl ${challenge.winner_id === challenge.opponent_id ? "bg-green-900/30 border border-green-500/30" : "bg-dark-700/50"}`}><div className="flex items-center justify-center gap-2 mb-2"><span className="w-8 h-8 rounded-full bg-dark-600 overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{challenge.opponent_avatar ? <img src={challenge.opponent_avatar} alt="" className="w-full h-full object-cover" /> : challenge.opponent_nickname?.charAt(0).toUpperCase()}</span><p className="text-white font-bold text-sm">{challenge.opponent_nickname}</p></div><p className="text-2xl font-bold text-primary-400">{challenge.opponent_score !== null ? formatScore(challenge.game, challenge.opponent_score) : "-"}</p>{challenge.winner_id === challenge.opponent_id && <span className="text-green-400 text-sm">🏆 Winner</span>}</div></div></div>{!isDraw && (battleResult?.pointsTransferred || challenge.points_transferred) > 0 && (<div className="bg-dark-800/30 rounded-xl p-4 mb-6"><p className="text-dark-400 text-sm mb-2">Points Change</p><div className={`text-2xl font-bold ${isWinner ? "text-green-400" : "text-red-400"}`}>{isWinner ? "+" : "-"}{battleResult?.pointsTransferred || challenge.points_transferred}pts</div></div>)}<div className="flex gap-4"><button onClick={() => { localStorage.removeItem("pending_battle"); localStorage.removeItem("login_redirect"); window.location.href = `/${locale}`; }} className="flex-1 bg-dark-600 hover:bg-dark-500 border border-dark-500 text-white py-4 rounded-xl font-bold transition-colors text-center">Home</button><Link href={getGameUrl(challenge.game)} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold transition-all text-center shadow-lg shadow-orange-500/20">🔄 Rematch</Link></div></div></div>);
  }
  return null;
}

function getGameComponent(game: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components: Record<string, React.ComponentType<any>> = { reaction: ReactionTest, cps: CpsTest, memory: MemoryTest, color: ColorTest, aim: AimTest, cardmatch: CardMatchGame, quiz: QuizGame, iq: IQTest, sudoku: Sudoku, typing: TypingMulti };
  return components[game] || ReactionTest;
}

