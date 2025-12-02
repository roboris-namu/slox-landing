"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type GameState = "intro" | "questions" | "analyzing" | "result";

// 캐릭터 정보
const characters = [
  {
    id: "leader",
    name: "리더황",
    emoji: "👔",
    image: "/characters/leader.png",
    title: "타고난 리더",
    traits: ["책임감", "결단력", "신뢰"],
    description: "당신은 팀을 이끄는 천부적인 리더예요! 어떤 상황에서도 흔들리지 않는 듬직함과 책임감으로 주변 사람들에게 신뢰를 줍니다.",
    strength: "위기 상황에서 빛나는 판단력",
    weakness: "가끔 혼자 모든 걸 짊어지려 해요",
    compatibility: "조순",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "josoon",
    name: "조순",
    emoji: "🐄",
    image: "/characters/josoon.png",
    title: "따뜻한 치유자",
    traits: ["배려심", "공감력", "따뜻함"],
    description: "당신은 주변 사람들을 편안하게 만드는 힐러예요! 뛰어난 공감 능력과 따뜻한 마음으로 모두에게 사랑받습니다.",
    strength: "누구와도 잘 어울리는 친화력",
    weakness: "거절을 잘 못해요",
    compatibility: "리더황",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: "mecha",
    name: "메카황",
    emoji: "🤖",
    image: "/characters/mecha.png",
    title: "냉철한 전략가",
    traits: ["논리적", "효율적", "카리스마"],
    description: "당신은 감정보다 이성을 중시하는 전략가예요! 냉철한 판단력과 강력한 카리스마로 목표를 향해 돌진합니다.",
    strength: "복잡한 문제도 척척 해결",
    weakness: "가끔 너무 차가워 보여요",
    compatibility: "닥터황",
    color: "from-slate-500 to-zinc-600",
  },
  {
    id: "wild",
    name: "야성황",
    emoji: "🦬",
    image: "/characters/wild.png",
    title: "자유로운 영혼",
    traits: ["자유로움", "솔직함", "열정"],
    description: "당신은 거침없이 자신의 길을 가는 자유인이에요! 솔직하고 열정적인 성격으로 주변에 활력을 불어넣습니다.",
    strength: "어떤 도전도 두려워하지 않음",
    weakness: "규칙에 얽매이는 걸 싫어해요",
    compatibility: "아트황",
    color: "from-amber-600 to-orange-700",
  },
  {
    id: "gentle",
    name: "젠틀황",
    emoji: "🎩",
    image: "/characters/gentle.png",
    title: "세련된 지성인",
    traits: ["품위", "지적", "매너"],
    description: "당신은 우아함과 지성을 겸비한 신사예요! 세련된 매너와 깊은 교양으로 어디서든 존경받습니다.",
    strength: "어떤 자리에서도 빛나는 품격",
    weakness: "완벽주의 성향이 있어요",
    compatibility: "위자드황",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "art",
    name: "아트황",
    emoji: "🎨",
    image: "/characters/art.png",
    title: "창의적 예술가",
    traits: ["창의력", "감성", "독창성"],
    description: "당신은 세상을 다른 시각으로 보는 예술가예요! 풍부한 상상력과 독특한 감성으로 새로운 것을 창조합니다.",
    strength: "누구도 생각 못한 아이디어",
    weakness: "현실적인 면이 부족할 때가 있어요",
    compatibility: "야성황",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "wizard",
    name: "위자드황",
    emoji: "🔮",
    image: "/characters/wizard.png",
    title: "신비로운 직감러",
    traits: ["직관력", "신비로움", "통찰력"],
    description: "당신은 남다른 직감을 가진 신비로운 존재예요! 깊은 통찰력으로 다른 사람이 보지 못하는 것을 봅니다.",
    strength: "미래를 내다보는 듯한 예지력",
    weakness: "가끔 현실과 동떨어져 보여요",
    compatibility: "젠틀황",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "doctor",
    name: "닥터황",
    emoji: "🧪",
    image: "/characters/doctor.png",
    title: "분석하는 천재",
    traits: ["분석력", "호기심", "탐구심"],
    description: "당신은 끊임없이 배우고 연구하는 학자예요! 뛰어난 분석력과 탐구심으로 진리를 추구합니다.",
    strength: "모든 것의 원리를 파악하는 능력",
    weakness: "너무 깊이 파고들 때가 있어요",
    compatibility: "메카황",
    color: "from-indigo-400 to-blue-500",
  },
];

// 질문 목록
const questions = [
  {
    question: "친구들 사이에서 나는 주로...",
    answers: [
      { text: "모임을 주도하고 이끄는 편", scores: { leader: 3, mecha: 1 } },
      { text: "분위기 메이커! 다 웃게 만듦", scores: { art: 2, wild: 2 } },
      { text: "조용히 듣고 공감해주는 편", scores: { josoon: 3, wizard: 1 } },
      { text: "필요할 때만 핵심을 딱 말함", scores: { gentle: 2, doctor: 2 } },
    ],
  },
  {
    question: "스트레스 받을 때 나는...",
    answers: [
      { text: "운동이나 활동적인 걸로 풀어", scores: { wild: 3, leader: 1 } },
      { text: "혼자 조용히 생각 정리해", scores: { wizard: 2, doctor: 2 } },
      { text: "친구들 만나서 수다 떨어", scores: { josoon: 2, art: 2 } },
      { text: "계획 세우고 해결책 찾아", scores: { mecha: 3, gentle: 1 } },
    ],
  },
  {
    question: "첫인상이 어떻다는 말을 듣나요?",
    answers: [
      { text: "믿음직스럽고 듬직해 보인대", scores: { leader: 3, gentle: 1 } },
      { text: "친근하고 편안해 보인대", scores: { josoon: 3, art: 1 } },
      { text: "카리스마 있고 강해 보인대", scores: { mecha: 2, wild: 2 } },
      { text: "신비롭고 독특해 보인대", scores: { wizard: 2, doctor: 2 } },
    ],
  },
  {
    question: "여행 스타일은?",
    answers: [
      { text: "철저하게 계획 세워서 가", scores: { doctor: 2, mecha: 2 } },
      { text: "즉흥적으로! 발길 닿는 대로", scores: { wild: 3, art: 1 } },
      { text: "일행에 맞춰서 유연하게", scores: { josoon: 2, gentle: 2 } },
      { text: "내가 코스 짜고 가이드 해", scores: { leader: 3, wizard: 1 } },
    ],
  },
  {
    question: "갈등 상황에서 나는...",
    answers: [
      { text: "중재자 역할을 해", scores: { josoon: 3, gentle: 1 } },
      { text: "논리적으로 해결책 제시해", scores: { mecha: 2, doctor: 2 } },
      { text: "일단 피하고 시간을 둬", scores: { wizard: 2, art: 2 } },
      { text: "직접 나서서 해결해", scores: { leader: 2, wild: 2 } },
    ],
  },
  {
    question: "나를 가장 잘 표현하는 단어는?",
    answers: [
      { text: "책임감", scores: { leader: 3, mecha: 1 } },
      { text: "따뜻함", scores: { josoon: 3, art: 1 } },
      { text: "자유로움", scores: { wild: 3, wizard: 1 } },
      { text: "지적임", scores: { doctor: 2, gentle: 2 } },
    ],
  },
  {
    question: "주말에 가장 하고 싶은 것은?",
    answers: [
      { text: "새로운 취미나 활동 도전", scores: { wild: 2, art: 2 } },
      { text: "집에서 책이나 영화 감상", scores: { wizard: 2, doctor: 2 } },
      { text: "친구나 가족과 시간 보내기", scores: { josoon: 2, leader: 2 } },
      { text: "자기계발이나 공부", scores: { gentle: 2, mecha: 2 } },
    ],
  },
  {
    question: "팀 프로젝트에서 나의 역할은?",
    answers: [
      { text: "팀장! 방향을 제시해", scores: { leader: 3, mecha: 1 } },
      { text: "아이디어 뱅크! 창의적 제안", scores: { art: 3, wizard: 1 } },
      { text: "조율자! 팀원들 케어", scores: { josoon: 3, gentle: 1 } },
      { text: "분석가! 데이터와 자료 담당", scores: { doctor: 3, mecha: 1 } },
    ],
  },
];

export default function SloxTest() {
  const [state, setState] = useState<GameState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<typeof characters[0] | null>(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // 점수 계산
  const calculateResult = useCallback((finalScores: Record<string, number>) => {
    let maxScore = 0;
    let resultChar = characters[0];

    characters.forEach((char) => {
      const score = finalScores[char.id] || 0;
      if (score > maxScore) {
        maxScore = score;
        resultChar = char;
      }
    });

    return resultChar;
  }, []);

  // 답변 선택
  const handleAnswer = (answerScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([charId, score]) => {
      newScores[charId] = (newScores[charId] || 0) + score;
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 질문 - 분석 시작
      setState("analyzing");
      const finalResult = calculateResult(newScores);
      
      // 슬롯머신 애니메이션
      setIsSpinning(true);
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        setSlotIndex(Math.floor(Math.random() * characters.length));
        spinCount++;
        
        if (spinCount > 20) {
          clearInterval(spinInterval);
          setResult(finalResult);
          setIsSpinning(false);
          setTimeout(() => setState("result"), 500);
        }
      }, 100);
    }
  };

  // 다시하기
  const restart = () => {
    setState("intro");
    setCurrentQuestion(0);
    setScores({});
    setResult(null);
  };

  // 공유
  const shareResult = async () => {
    if (!result) return;
    
    const shareUrl = "https://www.slox.co.kr/slox-test";
    const shareText = `🐂 SLOX 성격 테스트 결과!

${result.emoji} 나는 "${result.name}" - ${result.title}

✨ ${result.traits.join(" · ")}

${result.description}

나도 테스트하기 👉`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch { /* 취소 */ }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("결과가 클립보드에 복사되었습니다!");
    }
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
        <div className="max-w-2xl mx-auto">
          
          {/* 인트로 */}
          {state === "intro" && (
            <div className="text-center">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                  <span className="text-amber-400 text-sm font-medium">🐂 SLOX 유니버스</span>
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  나와 닮은
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"> SLOX</span>는?
                </h1>
                <p className="text-dark-400 text-lg">8가지 질문으로 알아보는 나의 SLOX 캐릭터!</p>
              </div>

              {/* 캐릭터 미리보기 */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {characters.map((char) => (
                  <div key={char.id} className="aspect-square bg-dark-800/50 rounded-xl p-2 border border-dark-700">
                    <Image
                      src={char.image}
                      alt={char.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState("questions")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-lg shadow-amber-500/30"
              >
                테스트 시작하기 🚀
              </button>
            </div>
          )}

          {/* 질문 */}
          {state === "questions" && (
            <div>
              {/* 진행률 */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-dark-400 mb-2">
                  <span>질문 {currentQuestion + 1} / {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* 질문 카드 */}
              <div className="bg-dark-900 rounded-2xl p-6 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].answers.map((answer, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(answer.scores)}
                      className="w-full p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-amber-500/50 rounded-xl text-left text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="text-amber-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {answer.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 분석 중 (슬롯머신) */}
          {state === "analyzing" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-8">당신의 SLOX를 찾는 중...</h2>
              
              {/* 슬롯머신 */}
              <div className="relative w-48 h-48 mx-auto mb-8 bg-dark-900 rounded-2xl border-4 border-amber-500/50 overflow-hidden">
                <div className={`absolute inset-0 flex items-center justify-center ${isSpinning ? "animate-pulse" : ""}`}>
                  <Image
                    src={characters[slotIndex].image}
                    alt="슬롯"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
                {isSpinning && (
                  <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 pointer-events-none" />
                )}
              </div>

              <div className="flex justify-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* 결과 */}
          {state === "result" && result && (
            <div className="text-center">
              {/* 결과 카드 */}
              <div className={`bg-gradient-to-br ${result.color} p-1 rounded-3xl mb-6`}>
                <div className="bg-dark-900 rounded-3xl p-6">
                  <div className="text-6xl mb-2">{result.emoji}</div>
                  <div className="w-40 h-40 mx-auto mb-4">
                    <Image
                      src={result.image}
                      alt={result.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{result.name}</h2>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${result.color} font-medium mb-4`}>
                    {result.title}
                  </p>
                  
                  {/* 특성 태그 */}
                  <div className="flex justify-center gap-2 mb-4">
                    {result.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-dark-800 rounded-full text-sm text-dark-300"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <p className="text-dark-300 text-sm leading-relaxed mb-6">
                    {result.description}
                  </p>

                  {/* 강점/약점 */}
                  <div className="grid grid-cols-2 gap-4 text-left mb-4">
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-green-400 text-xs font-medium mb-1">💪 강점</p>
                      <p className="text-white text-sm">{result.strength}</p>
                    </div>
                    <div className="bg-dark-800/50 rounded-xl p-3">
                      <p className="text-orange-400 text-xs font-medium mb-1">⚠️ 주의</p>
                      <p className="text-white text-sm">{result.weakness}</p>
                    </div>
                  </div>

                  {/* 궁합 */}
                  <div className="bg-dark-800/50 rounded-xl p-3">
                    <p className="text-pink-400 text-xs font-medium mb-1">💕 찰떡궁합</p>
                    <p className="text-white text-sm">{result.compatibility}와(과) 최고의 케미!</p>
                  </div>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={shareResult}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:scale-105 transition-transform"
                >
                  📤 결과 공유하기
                </button>
                <button
                  onClick={restart}
                  className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-colors"
                >
                  🔄 다시 테스트
                </button>
              </div>

              {/* 다른 도구 */}
              <div className="mt-12 pt-8 border-t border-dark-800">
                <p className="text-dark-500 text-sm mb-4">다른 테스트도 해보세요!</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                    ⚡ 반응속도 테스트
                  </Link>
                  <Link href="/color" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                    🎨 색상 찾기 게임
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* SLOX 홍보 */}
          <div className="mt-12 text-center">
            <p className="text-dark-500 text-sm mb-2">Powered by</p>
            <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-accent-purple to-accent-cyan rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium">SLOX</span>
            </Link>
            <p className="text-dark-500 text-xs mt-2">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
          </div>
        </div>
      </main>
    </div>
  );
}


