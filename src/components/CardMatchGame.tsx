"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

type GameState = "waiting" | "memorize" | "countdown" | "playing" | "result";
type Difficulty = "easy" | "normal" | "hard";

// 카드에 사용할 이모지들
const CARD_EMOJIS = ["🐶", "🐱", "🐼", "🦊", "🐨", "🐯", "🦁", "🐸", "🐵", "🐰", "🐻", "🐲"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
}

const difficultySettings: Record<Difficulty, { cols: number; rows: number; memorizeTime: number; timeLimit: number }> = {
  easy: { cols: 4, rows: 3, memorizeTime: 4, timeLimit: 60 },    // 60초 제한
  normal: { cols: 4, rows: 4, memorizeTime: 5, timeLimit: 90 },  // 90초 제한
  hard: { cols: 5, rows: 4, memorizeTime: 6, timeLimit: 120 },   // 120초 제한
};

export default function CardMatchGame() {
  const [state, setState] = useState<GameState>("waiting");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timer, setTimer] = useState(0);
  const [memorizeTimer, setMemorizeTimer] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [screenShake, setScreenShake] = useState(false);
  const [showComboEffect, setShowComboEffect] = useState(false);
  const [showTimePenalty, setShowTimePenalty] = useState(false);
  const [bestTime, setBestTime] = useState<Record<Difficulty, number | null>>({
    easy: null,
    normal: null,
    hard: null,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const settings = difficultySettings[difficulty];
  const totalPairs = (settings.cols * settings.rows) / 2;

  // 🔊 오디오 컨텍스트
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // 🔊 사운드 효과
  const playSound = useCallback((type: "flip" | "match" | "fail" | "combo" | "countdown" | "complete" | "start") => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      switch (type) {
        case "flip":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;
        case "match":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.35);
          break;
        case "fail":
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "combo":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          oscillator.frequency.setValueAtTime(1047, ctx.currentTime + 0.08);
          oscillator.frequency.setValueAtTime(1319, ctx.currentTime + 0.16);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
        case "countdown":
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(440, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
        case "start":
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.2);
          break;
        case "complete":
          // 승리 팡파레
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          const gain2 = ctx.createGain();
          osc1.connect(gain1);
          osc2.connect(gain2);
          gain1.connect(ctx.destination);
          gain2.connect(ctx.destination);
          osc1.type = "sine";
          osc2.type = "sine";
          osc1.frequency.setValueAtTime(523, ctx.currentTime);
          osc1.frequency.setValueAtTime(659, ctx.currentTime + 0.15);
          osc1.frequency.setValueAtTime(784, ctx.currentTime + 0.3);
          osc1.frequency.setValueAtTime(1047, ctx.currentTime + 0.45);
          osc2.frequency.setValueAtTime(392, ctx.currentTime);
          osc2.frequency.setValueAtTime(494, ctx.currentTime + 0.15);
          osc2.frequency.setValueAtTime(587, ctx.currentTime + 0.3);
          osc2.frequency.setValueAtTime(784, ctx.currentTime + 0.45);
          gain1.gain.setValueAtTime(0.2, ctx.currentTime);
          gain2.gain.setValueAtTime(0.15, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          osc1.start(ctx.currentTime);
          osc2.start(ctx.currentTime);
          osc1.stop(ctx.currentTime + 0.7);
          osc2.stop(ctx.currentTime + 0.7);
          break;
      }
    } catch {
      // 오디오 실패 시 무시
    }
  }, [getAudioContext]);

  // 💥 파티클 생성
  const createParticles = useCallback((x: number, y: number, count: number = 15) => {
    const colors = ["#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ff9ff3"];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
        velocity: Math.random() * 100 + 60,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.includes(p))), 600);
  }, []);

  // 📳 화면 흔들림
  const triggerShake = useCallback(() => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 150);
  }, []);

  // 🃏 카드 생성
  const generateCards = useCallback(() => {
    const { cols, rows } = settings;
    const pairCount = (cols * rows) / 2;
    const selectedEmojis = CARD_EMOJIS.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    // 셔플
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    return cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
  }, [settings]);

  // 🎮 게임 시작
  const startGame = useCallback(() => {
    // 카드 생성 시 바로 앞면(isFlipped: true)으로 설정
    const newCards = generateCards().map(card => ({ ...card, isFlipped: true }));
    
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setCombo(0);
    setMaxCombo(0);
    setTimer(settings.timeLimit); // 제한 시간으로 시작!
    setMemorizeTimer(settings.memorizeTime);
    setCards(newCards); // 앞면이 보이는 상태로 카드 설정
    setState("memorize");
    
    const memorizeInterval = setInterval(() => {
      setMemorizeTimer(prev => {
        if (prev <= 1) {
          clearInterval(memorizeInterval);
          // 기억 시간 끝! 카드 뒤집고 게임 시작
          setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })));
          setState("playing");
          playSound("start");
          return 0;
        }
        // 마지막 3초는 사운드
        if (prev <= 3) {
          playSound("countdown");
        }
        return prev - 1;
      });
    }, 1000);
  }, [generateCards, settings.memorizeTime, settings.timeLimit, playSound]);

  // ⏱️ 게임 타이머 (카운트다운)
  useEffect(() => {
    if (state === "playing") {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            // 시간 초과! 게임 오버
            if (timerRef.current) clearInterval(timerRef.current);
            setState("result");
            playSound("fail");
            return 0;
          }
          // 마지막 10초 경고음
          if (prev <= 10) {
            playSound("countdown");
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [state, playSound]);

  // 🃏 카드 클릭
  const handleCardClick = useCallback((cardId: number) => {
    if (state !== "playing") return;
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    playSound("flip");
    
    // 카드 뒤집기
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    // 두 장 뒤집었을 때
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);
      
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // 짝 맞춤!
        setTimeout(() => {
          playSound("match");
          
          // 파티클 효과
          if (gameAreaRef.current) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            createParticles(rect.width / 2, rect.height / 2, 20);
          }
          
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          
          const newCombo = combo + 1;
          setCombo(newCombo);
          if (newCombo > maxCombo) setMaxCombo(newCombo);
          
          // 콤보 효과
          if (newCombo >= 2) {
            playSound("combo");
            setShowComboEffect(true);
            setTimeout(() => setShowComboEffect(false), 500);
          }
          
          setMatchedPairs(prev => {
            const newPairs = prev + 1;
            // 모든 쌍 맞춤 = 게임 완료
            if (newPairs === totalPairs) {
              if (timerRef.current) clearInterval(timerRef.current);
              setTimeout(() => {
                setState("result");
                playSound("complete");
                // 최고 기록 갱신 (남은 시간이 많을수록 좋은 기록)
                setBestTime(prev => {
                  const current = prev[difficulty];
                  if (current === null || timer > current) {
                    return { ...prev, [difficulty]: timer };
                  }
                  return prev;
                });
              }, 500);
            }
            return newPairs;
          });
          
          setFlippedCards([]);
        }, 300);
      } else {
        // 짝 불일치 - 시간 패널티!
        setTimeout(() => {
          playSound("fail");
          triggerShake();
          setCombo(0);
          
          // 🔥 시간 3초 차감 + 패널티 표시!
          setTimer(prev => Math.max(0, prev - 3));
          setShowTimePenalty(true);
          setTimeout(() => setShowTimePenalty(false), 1200); // 1.2초간 표시
          
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [state, cards, flippedCards, combo, maxCombo, totalPairs, timer, difficulty, playSound, createParticles, triggerShake]);

  // 🏆 점수 계산 (남은 시간이 많을수록 높은 점수)
  const getScore = useCallback(() => {
    const baseScore = 1000;
    const timeBonus = timer * 5; // 남은 시간 보너스 (초당 5점)
    const movesPenalty = moves * 5;
    const comboBonus = maxCombo * 50;
    return Math.max(0, baseScore + timeBonus - movesPenalty + comboBonus);
  }, [timer, moves, maxCombo]);

  // 🎖️ 등급 계산
  const getGrade = useCallback(() => {
    const score = getScore();
    if (score >= 1200) return { grade: "S+", color: "text-yellow-300", emoji: "👑" };
    if (score >= 1000) return { grade: "S", color: "text-yellow-400", emoji: "🏆" };
    if (score >= 800) return { grade: "A", color: "text-purple-400", emoji: "💎" };
    if (score >= 600) return { grade: "B", color: "text-blue-400", emoji: "⭐" };
    if (score >= 400) return { grade: "C", color: "text-green-400", emoji: "👍" };
    return { grade: "D", color: "text-gray-400", emoji: "💪" };
  }, [getScore]);

  // ⏱️ 시간 포맷
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
              ← 메인으로
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">🃏 카드 짝 맞추기</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              카드
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 짝 맞추기</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              카드를 기억하고 짝을 맞춰보세요!
            </p>
          </div>

          {/* 난이도 선택 */}
          {state === "waiting" && (
            <div className="flex justify-center gap-3 mb-8">
              {(["easy", "normal", "hard"] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    difficulty === d
                      ? "bg-accent-purple text-white"
                      : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                  }`}
                >
                  {d === "easy" ? "쉬움" : d === "normal" ? "보통" : "어려움"}
                  <span className="text-xs ml-1 opacity-60">
                    ({difficultySettings[d].cols}x{difficultySettings[d].rows})
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 게임 상태 표시 */}
          {(state === "playing" || state === "memorize") && (
            <div className="flex justify-center items-center gap-4 mb-6">
              {/* 기억 시간 카운트다운 - 왼쪽 */}
              {state === "memorize" && (
                <div className={`text-center px-5 py-2 rounded-xl border-2 transition-all ${
                  memorizeTimer <= 3 
                    ? 'bg-red-500/20 border-red-500/50 animate-pulse' 
                    : 'bg-yellow-500/20 border-yellow-500/50'
                }`}>
                  <p className="text-xs font-medium text-yellow-400">👀 기억하세요!</p>
                  <p className={`text-2xl font-black ${memorizeTimer <= 3 ? 'text-red-400' : 'text-yellow-300'}`}>
                    {memorizeTimer}초
                  </p>
                </div>
              )}
              
              <div className={`text-center px-4 py-2 rounded-xl transition-all ${
                timer <= 10 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-dark-800/50'
              }`}>
                <p className="text-dark-400 text-xs">⏱️ 남은 시간</p>
                <p className={`text-xl font-bold ${timer <= 10 ? 'text-red-400' : timer <= 30 ? 'text-yellow-400' : 'text-white'}`}>
                  {formatTime(timer)}
                </p>
              </div>
              <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                <p className="text-dark-400 text-xs">짝</p>
                <p className="text-xl font-bold text-green-400">{matchedPairs}/{totalPairs}</p>
              </div>
              <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                <p className="text-dark-400 text-xs">🖱️ 클릭</p>
                <p className="text-xl font-bold text-yellow-400">{moves}</p>
              </div>
              {combo > 0 && (
                <div className="text-center px-4 py-2 bg-orange-500/20 rounded-xl border border-orange-500/30">
                  <p className="text-dark-400 text-xs">콤보</p>
                  <p className="text-xl font-bold text-orange-400">🔥 {combo}x</p>
                </div>
              )}
            </div>
          )}

          {/* 💡 팁 */}
          {state === "waiting" && (
            <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-medium mb-1">기억력 게임 팁</p>
                  <p className="text-dark-400 text-sm">
                    카드 위치를 이미지나 패턴으로 기억해보세요. 
                    비슷한 이모지끼리 묶어서 외우면 더 쉬워요!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 게임 영역 - 긴박 모드 효과 */}
          <div
            ref={gameAreaRef}
            className={`relative rounded-2xl p-6 mb-8 min-h-[400px] transition-all duration-300 ${
              screenShake ? "animate-screen-shake" : ""
            } ${
              state === "playing" && timer <= 10 
                ? "bg-red-950/50 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                : state === "playing" && timer <= 30
                  ? "bg-orange-950/30 border border-orange-500/30"
                  : "bg-dark-900"
            }`}
          >
            {/* 긴박 모드 오버레이 */}
            {state === "playing" && timer <= 10 && (
              <div className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-fast border-4 border-red-500/30" />
            )}

            {/* 시간 패널티 표시 - 대비 강하게! */}
            {showTimePenalty && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black/70 rounded-2xl" />
                {/* 패널티 텍스트 */}
                <div className="relative animate-time-penalty-pop">
                  <div className="text-7xl md:text-9xl font-black text-center"
                    style={{
                      color: '#FFD700',
                      textShadow: '0 0 20px #FFD700, 0 0 40px #FFA500, 0 0 60px #FF6B00, 0 4px 0 #B8860B',
                      WebkitTextStroke: '2px #B8860B'
                    }}
                  >
                    -3초
                  </div>
                  <div className="text-2xl text-white text-center mt-3 font-bold tracking-wider">
                    ⚡ TIME PENALTY ⚡
                  </div>
                </div>
              </div>
            )}
            {/* 파티클 */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute pointer-events-none animate-particle-burst"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                  ["--angle" as string]: `${particle.angle}rad`,
                  ["--velocity" as string]: `${particle.velocity}px`,
                }}
              />
            ))}

            {/* 콤보 효과 */}
            {showComboEffect && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 animate-combo-burst">
                  🔥 {combo} COMBO!
                </div>
              </div>
            )}

            {/* 대기 화면 */}
            {state === "waiting" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="text-7xl mb-4 animate-float">🃏</div>
                <p className="text-2xl font-bold text-white mb-2">준비되셨나요?</p>
                <p className="text-dark-400 mb-6">카드를 기억하고 짝을 맞춰보세요!</p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
                >
                  🎮 게임 시작
                </button>
              </div>
            )}


            {/* 카드 그리드 - 완전 중앙 정렬 */}
            {(state === "memorize" || state === "playing") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${settings.cols}, minmax(60px, 80px))`,
                  }}
                >
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      relative aspect-square rounded-xl cursor-pointer transition-all duration-300
                      ${card.isMatched ? "scale-95" : "hover:scale-105 active:scale-95"}
                    `}
                    style={{
                      animation: state === "memorize" ? `card-appear 0.3s ease-out ${index * 0.05}s both` : undefined,
                    }}
                  >
                    {/* 카드 내용 - 앞면/뒷면 전환 */}
                    {(card.isFlipped || card.isMatched) ? (
                      // 앞면 (이모지 보임)
                      <div 
                        className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-200
                          ${card.isMatched 
                            ? "bg-green-500/20 border-2 border-green-500 shadow-lg shadow-green-500/30" 
                            : "bg-dark-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                          }
                        `}
                      >
                        <span className="text-4xl">{card.emoji}</span>
                      </div>
                    ) : (
                      // 뒷면 (물음표)
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-shadow">
                        <span className="text-3xl">❓</span>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* 결과 화면 */}
            {state === "result" && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                {/* 시간 초과 vs 성공 구분 */}
                {matchedPairs === totalPairs ? (
                  <>
                    <div className="text-6xl mb-4 animate-bounce-in">{getGrade().emoji}</div>
                    <p className={`text-3xl font-bold ${getGrade().color} mb-2`}>
                      {getGrade().grade}
                    </p>
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                      {getScore()}점
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">⏰</div>
                    <p className="text-3xl font-bold text-red-400 mb-2">
                      시간 초과!
                    </p>
                    <p className="text-dark-400 mb-4">
                      {matchedPairs}/{totalPairs} 짝 맞춤
                    </p>
                  </>
                )}
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                    <p className="text-dark-400 text-xs">남은 시간</p>
                    <p className="text-lg font-bold text-white">{formatTime(timer)}</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                    <p className="text-dark-400 text-xs">클릭</p>
                    <p className="text-lg font-bold text-yellow-400">{moves}회</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-dark-800/50 rounded-xl">
                    <p className="text-dark-400 text-xs">최대 콤보</p>
                    <p className="text-lg font-bold text-orange-400">{maxCombo}x</p>
                  </div>
                </div>

                {bestTime[difficulty] !== null && matchedPairs === totalPairs && (
                  <p className="text-dark-400 text-sm mb-4">
                    🏆 최고 기록: 남은 시간 {formatTime(bestTime[difficulty]!)}
                  </p>
                )}

                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
                >
                  🔄 다시 하기
                </button>
              </div>
            )}
          </div>

          {/* 게임 설명 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🎯</span> 게임 방법
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-purple-400 font-medium">1️⃣ 기억하기</p>
                <p className="text-dark-400 mt-1">카드 위치를 기억하세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-pink-400 font-medium">2️⃣ 찾기</p>
                <p className="text-dark-400 mt-1">같은 그림 카드를 찾으세요</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-cyan-400 font-medium">3️⃣ 주의!</p>
                <p className="text-dark-400 mt-1">틀리면 -3초 패널티!</p>
              </div>
            </div>
          </div>

          {/* 🏆 등급표 */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>🏆</span> 등급표
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">👑</p>
                <p className="text-yellow-300 font-bold">S+</p>
                <p className="text-dark-400 text-xs">1200점+</p>
                <p className="text-yellow-400/70 text-xs mt-1">전설</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">🏆</p>
                <p className="text-yellow-400 font-bold">S</p>
                <p className="text-dark-400 text-xs">1000점+</p>
                <p className="text-yellow-500/70 text-xs mt-1">챔피언</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">💎</p>
                <p className="text-purple-400 font-bold">A</p>
                <p className="text-dark-400 text-xs">800점+</p>
                <p className="text-purple-400/70 text-xs mt-1">고수</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">⭐</p>
                <p className="text-blue-400 font-bold">B</p>
                <p className="text-dark-400 text-xs">600점+</p>
                <p className="text-blue-400/70 text-xs mt-1">숙련자</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">👍</p>
                <p className="text-green-400 font-bold">C</p>
                <p className="text-dark-400 text-xs">400점+</p>
                <p className="text-green-400/70 text-xs mt-1">중수</p>
              </div>
              <div className="bg-dark-800/50 border border-dark-700 p-3 rounded-lg text-center">
                <p className="text-2xl mb-1">💪</p>
                <p className="text-gray-400 font-bold">D</p>
                <p className="text-dark-400 text-xs">400점 미만</p>
                <p className="text-gray-500/70 text-xs mt-1">초보</p>
              </div>
            </div>
            <p className="text-dark-500 text-xs mt-3 text-center">
              💡 점수 = 기본 1000점 + (남은시간 × 5) - (클릭수 × 5) + (최대콤보 × 50)
            </p>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 게임</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/memory"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                🧠 숫자 기억 게임
              </Link>
              <Link
                href="/reaction"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⚡ 반응속도 테스트
              </Link>
              <Link
                href="/color"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                🎨 색상 찾기 게임
              </Link>
            </div>
          </div>

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-accent-purple to-accent-cyan rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium">SLOX</span>
            </Link>
            <p className="text-dark-500 text-xs mt-2">
              홈페이지 · 앱 제작 · AI 챗봇 구축
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

