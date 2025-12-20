"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// 게임 컴포넌트 imports
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

// 타입 정의
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

interface UserSession {
  userId: string;
  nickname: string;
  totalScore: number;
}

// 게임 설정
const GAME_CONFIG: Record<string, { 
  name: string; 
  emoji: string; 
  unit: string;
  lowerIsBetter: boolean;
}> = {
  reaction: { name: "반응속도", emoji: "⚡", unit: "ms", lowerIsBetter: true },
  cps: { name: "클릭속도", emoji: "👆", unit: "CPS", lowerIsBetter: false },
  memory: { name: "순간기억력", emoji: "🧠", unit: "점", lowerIsBetter: false },
  color: { name: "색상구별", emoji: "🎨", unit: "점", lowerIsBetter: false },
  aim: { name: "에임훈련", emoji: "🎯", unit: "점", lowerIsBetter: false },
  cardmatch: { name: "카드매칭", emoji: "🃏", unit: "ms", lowerIsBetter: true },
  quiz: { name: "상식퀴즈", emoji: "❓", unit: "점", lowerIsBetter: false },
  iq: { name: "IQ 테스트", emoji: "🧩", unit: "IQ", lowerIsBetter: false },
  sudoku: { name: "스도쿠", emoji: "🔢", unit: "초", lowerIsBetter: true },
  typing: { name: "타자연습", emoji: "⌨️", unit: "WPM", lowerIsBetter: false },
};

export default function BattlePage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id as string;
  
  // 상태
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<"loading" | "info" | "playing" | "result">("loading");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_gameScore, setGameScore] = useState<number | null>(null);
  const [battleResult, setBattleResult] = useState<{
    isDraw: boolean;
    winnerId: string | null;
    loserId: string | null;
    pointsTransferred: number;
  } | null>(null);
  
  // 기권 처리를 위한 ref
  const isPlayingRef = useRef(false);

  // 세션 체크
  const checkSession = useCallback(() => {
    try {
      const sessionStr = localStorage.getItem("slox-session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.user?.id) {
          return {
            userId: session.user.id,
            nickname: session.nickname || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
            totalScore: session.totalScore || 0,
          };
        }
      }
    } catch (e) {
      console.error("세션 파싱 에러:", e);
    }
    return null;
  }, []);

  // 도전장 정보 로드
  const fetchChallenge = useCallback(async () => {
    try {
      const res = await fetch(`/api/battle?id=${challengeId}`);
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "도전장을 불러올 수 없습니다");
        return null;
      }
      
      return data.challenge as Challenge;
    } catch (err) {
      console.error("도전장 로드 에러:", err);
      setError("도전장을 불러오는 중 오류가 발생했습니다");
      return null;
    }
  }, [challengeId]);

  // 내 프로필의 total_score 가져오기
  const fetchMyScore = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/profile?userId=${userId}`);
      const data = await res.json();
      return data.profile?.total_score || 0;
    } catch {
      return 0;
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      
      // 세션 체크
      const session = checkSession();
      
      // 도전장 로드
      const challengeData = await fetchChallenge();
      
      if (!challengeData) {
        setLoading(false);
        return;
      }
      
      setChallenge(challengeData);
      
      // 로그인 안 됨 → 로그인 페이지로
      if (!session) {
        // localStorage에 pending_battle 저장
        localStorage.setItem("pending_battle", challengeId);
        router.push(`/login?redirect=/battle/${challengeId}`);
        return;
      }
      
      // 내 점수 가져오기
      const myScore = await fetchMyScore(session.userId);
      setUser({ ...session, totalScore: myScore });
      
      // 상태에 따른 처리
      if (challengeData.status === "completed" || challengeData.status === "forfeited") {
        setStage("result");
        // 🧹 배틀 완료 시 localStorage 정리 (리다이렉트 방지)
        localStorage.removeItem("pending_battle");
        localStorage.removeItem("login_redirect");
      } else if (challengeData.status === "expired") {
        setError("만료된 도전장입니다");
      } else if (challengeData.status === "accepted" && challengeData.opponent_id === session.userId) {
        // 이미 수락한 상태 → 게임 진행 중
        setStage("playing");
        isPlayingRef.current = true;
      } else {
        setStage("info");
      }
      
      setLoading(false);
    };
    
    init();
  }, [challengeId, checkSession, fetchChallenge, fetchMyScore, router]);

  // 브라우저 종료/이탈 감지 (기권 처리)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPlayingRef.current && challenge?.status === "accepted") {
        // 기권 처리 API 호출 (동기적)
        navigator.sendBeacon(
          "/api/battle",
          JSON.stringify({
            action: "forfeit",
            challengeId: challenge.id,
            forfeiterId: user?.userId,
          })
        );
        
        e.preventDefault();
        e.returnValue = "게임 중 나가면 패배 처리됩니다. 정말 나가시겠습니까?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [challenge, user]);

  // 도전 수락
  const handleAccept = async () => {
    if (!user || !challenge) return;
    
    // 자기 자신에게 도전 체크
    if (challenge.challenger_id === user.userId) {
      setError("자기 자신에게는 도전할 수 없습니다");
      return;
    }
    
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "accept",
          challengeId: challenge.id,
          opponentId: user.userId,
          opponentNickname: user.nickname,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "도전 수락에 실패했습니다");
        return;
      }
      
      setChallenge(data.challenge);
      setStage("playing");
      isPlayingRef.current = true;
    } catch (err) {
      console.error("도전 수락 에러:", err);
      setError("도전 수락 중 오류가 발생했습니다");
    }
  };

  // 게임 완료 콜백
  const handleGameComplete = async (score: number) => {
    if (!challenge || !user) return;
    
    isPlayingRef.current = false;
    setGameScore(score);
    
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "complete",
          challengeId: challenge.id,
          opponentScore: score,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "결과 처리에 실패했습니다");
        return;
      }
      
      setChallenge(data.challenge);
      setBattleResult(data.result);
      setStage("result");
    } catch (err) {
      console.error("게임 완료 처리 에러:", err);
      setError("결과 처리 중 오류가 발생했습니다");
    }
  };

  // 점수 포맷
  const formatScore = (game: string, score: number) => {
    const config = GAME_CONFIG[game];
    if (!config) return score.toString();
    
    if (game === "reaction" || game === "sudoku" || game === "cardmatch") {
      return `${(score / 1000).toFixed(2)}${config.unit === "ms" ? "s" : config.unit}`;
    }
    return `${score}${config.unit}`;
  };

  // 패배 시 손실 점수 계산
  const calculatePotentialLoss = () => {
    if (!user) return 0;
    const loss = Math.floor(Math.abs(user.totalScore) * 0.1);
    return Math.max(5, Math.min(50, loss));
  };

  // 렌더링: 로딩
  if (loading || stage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🥊</div>
          <p className="text-white text-xl">도전장 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 렌더링: 에러
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl text-center max-w-md">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-white mb-4">오류 발생</h1>
          <p className="text-dark-400 mb-6">{error}</p>
          <Link href="/" className="btn-primary px-6 py-3 rounded-xl">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 렌더링: 자기 자신의 도전장인 경우
  if (stage === "info" && challenge && user && challenge.challenger_id === user.userId) {
    const gameConfig = GAME_CONFIG[challenge.game];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full">
          {/* 헤더 */}
          <div className="text-6xl mb-4">📤</div>
          <h1 className="text-2xl font-bold text-white mb-2">내가 만든 도전장!</h1>
          <p className="text-dark-400 mb-8">
            이 링크를 친구에게 공유하세요
          </p>
          
          {/* 도전장 정보 */}
          <div className="bg-dark-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">{gameConfig?.emoji}</span>
              <span className="text-xl font-bold text-white">{gameConfig?.name}</span>
            </div>
            
            <div className="text-4xl font-bold text-primary-400 mb-2">
              {formatScore(challenge.game, challenge.challenger_score)}
            </div>
            <p className="text-dark-400">
              내 기록
            </p>
          </div>
          
          {/* 공유 링크 */}
          <div className="bg-dark-800/30 rounded-xl p-4 mb-6">
            <p className="text-dark-400 text-sm mb-2">도전장 링크</p>
            <p className="text-white text-xs break-all">
              {typeof window !== "undefined" ? window.location.href : ""}
            </p>
          </div>
          
          {/* 버튼 */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                const url = window.location.href;
                const text = `🥊 ${user.nickname}의 도전장!\n\n${gameConfig?.emoji} ${gameConfig?.name}: ${formatScore(challenge.game, challenge.challenger_score)}\n\n이 기록 이길 수 있어? 👉\n${url}`;
                navigator.clipboard.writeText(text);
                alert("복사되었습니다! 친구에게 공유하세요 🎮");
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-bold transition-all"
            >
              📋 링크 복사
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem("pending_battle");
                localStorage.removeItem("login_redirect");
                window.location.href = "/";
              }}
              className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-4 rounded-xl font-bold transition-colors text-center flex items-center justify-center"
            >
              메인으로
            </button>
          </div>
          
          {/* 상태 */}
          <p className="text-dark-500 text-xs mt-4">
            {challenge.status === "pending" 
              ? "⏳ 아직 아무도 도전하지 않았어요"
              : challenge.status === "accepted"
              ? "🎮 누군가 도전 중!"
              : challenge.status === "completed"
              ? "✅ 배틀 완료!"
              : ""}
          </p>
        </div>
      </div>
    );
  }

  // 렌더링: 도전장 정보 (수락 전)
  if (stage === "info" && challenge && user) {
    const gameConfig = GAME_CONFIG[challenge.game];
    const potentialLoss = calculatePotentialLoss();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full">
          {/* 헤더 */}
          <div className="text-6xl mb-4">🥊</div>
          <h1 className="text-3xl font-bold text-white mb-2">도전장!</h1>
          <p className="text-dark-400 mb-8">
            {challenge.challenger_nickname}님이 도전장을 보냈습니다
          </p>
          
          {/* 도전자 정보 */}
          <div className="bg-dark-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">{gameConfig?.emoji}</span>
              <span className="text-xl font-bold text-white">{gameConfig?.name}</span>
            </div>
            
            <div className="text-4xl font-bold text-primary-400 mb-2">
              {formatScore(challenge.game, challenge.challenger_score)}
            </div>
            <p className="text-dark-400">
              {challenge.challenger_nickname}의 기록
            </p>
          </div>
          
          {/* 경고 */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">
              ⚠️ 도전을 수락하면 게임을 완료해야 합니다<br />
              중간 이탈 = 패배 처리
            </p>
          </div>
          
          {/* 점수 정보 */}
          <div className="bg-dark-800/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-dark-400">내 현재 점수</span>
              <span className="text-white font-bold">{user.totalScore}점</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-dark-400">패배 시 손실</span>
              <span className="text-red-400 font-bold">-{potentialLoss}점</span>
            </div>
          </div>
          
          {/* 버튼 */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-dark-600 hover:bg-dark-500 border border-dark-500 text-white py-4 rounded-xl font-bold transition-colors"
            >
              거절하기
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/20"
            >
              ✅ 수락하고 시작!
            </button>
          </div>
          
          {/* 만료 시간 */}
          <p className="text-dark-500 text-xs mt-4">
            유효기간: {new Date(challenge.expires_at).toLocaleDateString("ko-KR")}까지
          </p>
        </div>
      </div>
    );
  }

  // 렌더링: 게임 플레이
  if (stage === "playing" && challenge) {
    const GameComponent = getGameComponent(challenge.game);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        {/* 배틀 헤더 */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-b border-red-500/20 py-3 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥊</span>
              <span className="text-white font-bold">배틀 진행 중!</span>
            </div>
            <div className="text-sm text-dark-300">
              vs {challenge.challenger_nickname} ({formatScore(challenge.game, challenge.challenger_score)})
            </div>
          </div>
        </div>
        
        {/* 게임 컴포넌트 */}
        <GameComponent 
          locale="ko" 
          battleMode={true}
          onBattleComplete={handleGameComplete}
        />
      </div>
    );
  }

  // 렌더링: 결과
  if (stage === "result" && challenge) {
    const gameConfig = GAME_CONFIG[challenge.game];
    const isParticipant = user?.userId === challenge.challenger_id || user?.userId === challenge.opponent_id;
    const isWinner = battleResult?.winnerId === user?.userId || challenge.winner_id === user?.userId;
    const isDraw = battleResult?.isDraw || challenge.is_draw;
    
    // 관련 없는 유저가 종료된 배틀에 접속한 경우
    if (!isParticipant) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
          <div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full">
            <div className="text-6xl mb-4">🏁</div>
            <h1 className="text-2xl font-bold text-white mb-2">종료된 배틀입니다</h1>
            <p className="text-dark-400 mb-6">
              이 배틀은 이미 완료되었어요
            </p>
            
            {/* 결과 요약 */}
            <div className="bg-dark-800/50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl">{gameConfig?.emoji}</span>
                <span className="text-lg font-bold text-white">{gameConfig?.name}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 items-center text-sm">
                <div className="text-center">
                  <p className="text-white font-bold">{challenge.challenger_nickname}</p>
                  <p className="text-primary-400">{formatScore(challenge.game, challenge.challenger_score)}</p>
                </div>
                <div className="text-dark-500">VS</div>
                <div className="text-center">
                  <p className="text-white font-bold">{challenge.opponent_nickname || "?"}</p>
                  <p className="text-primary-400">
                    {challenge.opponent_score !== null 
                      ? formatScore(challenge.game, challenge.opponent_score)
                      : "-"
                    }
                  </p>
                </div>
              </div>
              
              {challenge.winner_id && (
                <p className="text-green-400 mt-4">
                  🏆 {challenge.winner_id === challenge.challenger_id 
                    ? challenge.challenger_nickname 
                    : challenge.opponent_nickname} 승리!
                </p>
              )}
              {challenge.is_draw && (
                <p className="text-yellow-400 mt-4">🤝 무승부!</p>
              )}
            </div>
            
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
            >
              나도 배틀하러 가기! 🥊
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
        <div className="glass-card p-8 rounded-2xl text-center max-w-lg w-full">
          {/* 결과 아이콘 */}
          <div className="text-7xl mb-4">
            {isDraw ? "🤝" : isWinner ? "🏆" : "😢"}
          </div>
          
          {/* 결과 메시지 */}
          <h1 className="text-3xl font-bold mb-2">
            {isDraw ? (
              <span className="text-yellow-400">무승부!</span>
            ) : isWinner ? (
              <span className="text-green-400">승리!</span>
            ) : (
              <span className="text-red-400">패배...</span>
            )}
          </h1>
          
          {/* 점수 비교 */}
          <div className="bg-dark-800/50 rounded-xl p-6 my-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">{gameConfig?.emoji}</span>
              <span className="text-lg font-bold text-white">{gameConfig?.name}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* 도전자 */}
              <div className={`p-4 rounded-xl ${challenge.winner_id === challenge.challenger_id ? "bg-green-900/30 border border-green-500/30" : "bg-dark-700/50"}`}>
                <p className="text-dark-400 text-sm mb-1">도전자</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* 프로필 이미지 */}
                  <span className="w-8 h-8 rounded-full bg-dark-600 overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {challenge.challenger_avatar ? (
                      <img src={challenge.challenger_avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      challenge.challenger_nickname?.charAt(0).toUpperCase()
                    )}
                  </span>
                  <p className="text-white font-bold truncate">{challenge.challenger_nickname}</p>
                </div>
                <p className="text-2xl font-bold text-primary-400">
                  {formatScore(challenge.game, challenge.challenger_score)}
                </p>
                {challenge.winner_id === challenge.challenger_id && (
                  <span className="text-green-400 text-sm">🏆 승리</span>
                )}
              </div>
              
              {/* VS */}
              <div className="text-4xl font-bold text-dark-500">VS</div>
              
              {/* 상대방 */}
              <div className={`p-4 rounded-xl ${challenge.winner_id === challenge.opponent_id ? "bg-green-900/30 border border-green-500/30" : "bg-dark-700/50"}`}>
                <p className="text-dark-400 text-sm mb-1">상대방</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* 프로필 이미지 */}
                  <span className="w-8 h-8 rounded-full bg-dark-600 overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {challenge.opponent_avatar ? (
                      <img src={challenge.opponent_avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      challenge.opponent_nickname?.charAt(0).toUpperCase()
                    )}
                  </span>
                  <p className="text-white font-bold truncate">{challenge.opponent_nickname}</p>
                </div>
                <p className="text-2xl font-bold text-primary-400">
                  {challenge.opponent_score !== null 
                    ? formatScore(challenge.game, challenge.opponent_score)
                    : "-"
                  }
                </p>
                {challenge.winner_id === challenge.opponent_id && (
                  <span className="text-green-400 text-sm">🏆 승리</span>
                )}
              </div>
            </div>
          </div>
          
          {/* 점수 변동 */}
          {!isDraw && (battleResult?.pointsTransferred || challenge.points_transferred) > 0 && (
            <div className="bg-dark-800/30 rounded-xl p-4 mb-6">
              <p className="text-dark-400 text-sm mb-2">포인트 변동</p>
              <div className={`text-2xl font-bold ${isWinner ? "text-green-400" : "text-red-400"}`}>
                {isWinner ? "+" : "-"}{battleResult?.pointsTransferred || challenge.points_transferred}점
              </div>
            </div>
          )}
          
          {/* 버튼 */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                // 🧹 localStorage 정리 후 메인으로 이동
                localStorage.removeItem("pending_battle");
                localStorage.removeItem("login_redirect");
                window.location.href = "/";
              }}
              className="flex-1 bg-dark-600 hover:bg-dark-500 border border-dark-500 text-white py-4 rounded-xl font-bold transition-colors text-center"
            >
              메인으로
            </button>
            <Link 
              href={`/${challenge.game}`}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold transition-all text-center shadow-lg shadow-orange-500/20"
            >
              🔄 복수전 준비
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// 게임 컴포넌트 매핑
function getGameComponent(game: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components: Record<string, React.ComponentType<any>> = {
    reaction: ReactionTest,
    cps: CpsTest,
    memory: MemoryTest,
    color: ColorTest,
    aim: AimTest,
    cardmatch: CardMatchGame,
    quiz: QuizGame,
    iq: IQTest,
    sudoku: Sudoku,
    typing: TypingMulti,
  };
  
  return components[game] || ReactionTest;
}

