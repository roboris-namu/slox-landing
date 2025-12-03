"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/**
 * 타자 연습용 문장들
 */
const SENTENCES = [
  "빠른 갈색 여우가 게으른 개를 뛰어넘습니다.",
  "오늘 하루도 열심히 일하고 행복한 저녁 보내세요.",
  "프로그래밍은 창의력과 논리력을 동시에 요구합니다.",
  "커피 한 잔의 여유가 하루를 바꿀 수 있습니다.",
  "성공은 작은 노력들이 모여 만들어지는 결과입니다.",
  "인공지능 기술이 우리의 일상을 변화시키고 있습니다.",
  "좋은 코드는 읽기 쉽고 유지보수가 편한 코드입니다.",
  "매일 조금씩 성장하면 일년 후엔 큰 변화가 있습니다.",
  "실패를 두려워하지 말고 도전하는 용기가 필요합니다.",
  "건강한 몸에 건강한 정신이 깃든다는 말이 있습니다.",
  "시간은 누구에게나 공평하게 주어지는 자원입니다.",
  "꿈을 이루기 위해서는 끊임없는 노력이 필요합니다.",
  "작은 습관의 변화가 인생을 바꿀 수 있습니다.",
  "배움에는 끝이 없고 겸손함이 필요합니다.",
  "오늘 할 일을 내일로 미루지 않는 것이 중요합니다.",
];

/**
 * 타자 결과
 */
interface TypingResult {
  wpm: number;           // 분당 타수
  cpm: number;           // 분당 글자수
  accuracy: number;      // 정확도
  time: number;          // 소요 시간 (초)
  totalChars: number;    // 총 글자수
  correctChars: number;  // 맞은 글자수
}

/**
 * 랜덤 문장 가져오기
 */
const getRandomSentence = (): string => {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
};

/**
 * 한글 글자를 키 입력 횟수로 변환
 * 예: "건" = ㄱ(1) + ㅓ(1) + ㄴ(1) = 3타
 */
const getKeyStrokes = (text: string): number => {
  let strokes = 0;
  
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    // 한글 음절 범위 (가 ~ 힣)
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const syllableIndex = code - 0xAC00;
      const cho = Math.floor(syllableIndex / (21 * 28)); // 초성
      const jung = Math.floor((syllableIndex % (21 * 28)) / 28); // 중성
      const jong = syllableIndex % 28; // 종성
      
      // 초성 타수 (쌍자음은 2타)
      const doubleChosung = [1, 4, 8, 10, 13]; // ㄲ, ㄸ, ㅃ, ㅆ, ㅉ
      strokes += doubleChosung.includes(cho) ? 2 : 1;
      
      // 중성 타수 (복합모음은 2타)
      const doubleJungsung = [9, 10, 11, 14, 15, 16, 19]; // ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ
      strokes += doubleJungsung.includes(jung) ? 2 : 1;
      
      // 종성 타수 (복합받침은 2타, 없으면 0타)
      if (jong > 0) {
        const doubleJongsung = [3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 18]; // ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ
        strokes += doubleJongsung.includes(jong) ? 2 : 1;
      }
    } else {
      // 영문, 숫자, 특수문자, 공백 등은 1타
      strokes += 1;
    }
  }
  
  return strokes;
};

export default function TypingTest() {
  const [sentence, setSentence] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [result, setResult] = useState<TypingResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 초기 문장 설정
  useEffect(() => {
    setSentence(getRandomSentence());
  }, []);

  // 타이머
  useEffect(() => {
    if (isStarted && !isFinished) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished, startTime]);

  // 결과 계산
  const calculateResult = useCallback((): TypingResult => {
    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;
    
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === sentence[i]) {
        correctChars++;
      }
    }
    
    const accuracy = Math.round((correctChars / sentence.length) * 100);
    
    // 키 입력 횟수 기준 타수 계산 (한컴타자 방식)
    const keyStrokes = getKeyStrokes(input);
    const cpm = Math.round(keyStrokes / timeInMinutes);
    const wpm = Math.round(cpm / 5); // 평균 5타 = 1단어
    
    return {
      wpm,
      cpm,
      accuracy,
      time: Math.round(timeInSeconds),
      totalChars: sentence.length,
      correctChars,
    };
  }, [input, sentence, startTime]);

  // 입력 처리
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 첫 입력 시 시작
    if (!isStarted && value.length === 1) {
      setIsStarted(true);
      setStartTime(Date.now());
    }
    
    setInput(value);
    
    // 완료 체크
    if (value.length >= sentence.length) {
      setIsFinished(true);
      setResult(calculateResult());
    }
  };

  // 다시 시작
  const restart = () => {
    setSentence(getRandomSentence());
    setInput("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(0);
    setElapsedTime(0);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 결과 공유
  const shareResult = () => {
    if (!result) return;
    const text = `🎯 타자 속도 테스트 결과!\n\n⌨️ ${result.cpm}타/분\n🎯 정확도 ${result.accuracy}%\n⏱️ ${result.time}초\n\n나도 테스트하기 👉 https://www.slox.co.kr/typing`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  // 글자별 색상 렌더링
  const renderSentence = () => {
    return sentence.split("").map((char, index) => {
      let colorClass = "text-dark-400"; // 기본
      
      if (index < input.length) {
        if (input[index] === char) {
          colorClass = "text-green-400"; // 맞음
        } else {
          colorClass = "text-red-400 bg-red-400/20"; // 틀림
        }
      } else if (index === input.length) {
        colorClass = "text-white bg-accent-purple/30"; // 현재 위치
      }
      
      return (
        <span key={index} className={`${colorClass} transition-colors`}>
          {char}
        </span>
      );
    });
  };

  // 모바일 감지
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 등급 계산 (모바일은 기준 낮춤)
  const getGrade = (cpm: number): { grade: string; color: string; emoji: string } => {
    if (isMobile) {
      // 모바일 등급 기준 (약 60% 수준)
      if (cpm >= 350) return { grade: "전문가", color: "text-purple-400", emoji: "👑" };
      if (cpm >= 280) return { grade: "고급", color: "text-cyan-400", emoji: "🚀" };
      if (cpm >= 220) return { grade: "중급", color: "text-green-400", emoji: "⚡" };
      if (cpm >= 150) return { grade: "초급", color: "text-yellow-400", emoji: "📝" };
      return { grade: "입문", color: "text-dark-400", emoji: "🌱" };
    }
    // 데스크톱 등급 기준
    if (cpm >= 600) return { grade: "전문가", color: "text-purple-400", emoji: "👑" };
    if (cpm >= 500) return { grade: "고급", color: "text-cyan-400", emoji: "🚀" };
    if (cpm >= 400) return { grade: "중급", color: "text-green-400", emoji: "⚡" };
    if (cpm >= 300) return { grade: "초급", color: "text-yellow-400", emoji: "📝" };
    return { grade: "입문", color: "text-dark-400", emoji: "🌱" };
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
            <div className="flex items-center gap-4">
              <Link 
                href="/salary"
                className="text-dark-400 hover:text-white transition-colors text-sm"
              >
                연봉 계산기
              </Link>
              <Link 
                href="/"
                className="text-dark-300 hover:text-white transition-colors text-sm"
              >
                ← 메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <span className="text-accent-purple text-sm font-medium">⌨️ 한글 타자 연습</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              타자 속도
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"> 테스트</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              당신의 타자 속도는 몇 타일까요? 지금 바로 테스트해보세요!
            </p>
          </div>

          {/* 💡 타자 속도 향상 팁 */}
          <div className="mb-8 p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <p className="text-white font-medium mb-1">타자 속도 향상 팁</p>
                <p className="text-dark-400 text-sm">
                  올바른 손가락 배치(홈 포지션)를 유지하고 키보드를 보지 않고 치는 연습을 해보세요.
                  정확도가 먼저, 속도는 자연스럽게 따라옵니다!
                </p>
              </div>
            </div>
          </div>

          {/* 타이머 & 상태 */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">경과 시간</p>
              <p className="text-3xl font-bold text-white">{elapsedTime}<span className="text-lg text-dark-400">초</span></p>
            </div>
            <div className="text-center">
              <p className="text-dark-400 text-sm mb-1">진행률</p>
              <p className="text-3xl font-bold text-accent-cyan">
                {Math.round((input.length / sentence.length) * 100)}<span className="text-lg text-dark-400">%</span>
              </p>
            </div>
          </div>

          {/* 타자 영역 */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
            {!isFinished ? (
              <>
                {/* 문장 표시 */}
                <div className="p-6 bg-dark-800/50 rounded-xl mb-6">
                  <p className="text-xl sm:text-2xl leading-relaxed font-mono tracking-wide">
                    {renderSentence()}
                  </p>
                </div>

                {/* 입력창 */}
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    placeholder={isStarted ? "" : "클릭하고 타이핑을 시작하세요!"}
                    className="w-full px-6 py-4 bg-dark-800 border-2 border-dark-700 rounded-xl text-white text-xl font-mono focus:outline-none focus:border-accent-purple transition-colors placeholder:text-dark-500"
                    autoFocus
                    disabled={isFinished}
                  />
                </div>

                {/* 힌트 */}
                <p className="text-center text-dark-500 text-sm mt-4">
                  💡 문장을 정확하게 입력하면 자동으로 완료됩니다
                </p>
              </>
            ) : (
              /* 결과 화면 */
              result && (
                <div className="text-center">
                  <div className="mb-8">
                    <p className="text-6xl mb-4">{getGrade(result.cpm).emoji}</p>
                    <p className={`text-2xl font-bold ${getGrade(result.cpm).color}`}>
                      {getGrade(result.cpm).grade}
                    </p>
                  </div>

                  {/* 메인 결과 */}
                  <div className="p-6 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 rounded-xl border border-accent-purple/30 mb-6">
                    <p className="text-dark-300 text-sm mb-2">타자 속도</p>
                    <p className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {result.cpm}<span className="text-2xl">타/분</span>
                    </p>
                  </div>

                  {/* 상세 결과 */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">정확도</p>
                      <p className="text-2xl font-bold text-white">{result.accuracy}%</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">소요 시간</p>
                      <p className="text-2xl font-bold text-white">{result.time}초</p>
                    </div>
                    <div className="p-4 bg-dark-800/50 rounded-xl">
                      <p className="text-dark-400 text-sm mb-1">WPM</p>
                      <p className="text-2xl font-bold text-white">{result.wpm}</p>
                    </div>
                  </div>

                  {/* 버튼들 */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={restart}
                      className="px-8 py-3 bg-accent-purple hover:bg-accent-purple/80 text-white font-medium rounded-xl transition-all"
                    >
                      🔄 다시 하기
                    </button>
                    <button
                      onClick={shareResult}
                      className="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
                    >
                      📤 결과 공유하기
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* 📝 타자 테스트란? */}
          <div className="mb-8 p-5 bg-dark-900/50 border border-dark-800 rounded-xl">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span>📊</span> 타자 속도 측정이란?
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed mb-3">
              타자 속도는 WPM(Words Per Minute) 또는 타/분으로 측정합니다. 
              평균 타자 속도는 200~300타/분이며, 전문 타이피스트는 500타/분 이상을 기록합니다.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-green-400 font-medium">💼 업무</p>
                <p className="text-dark-400 mt-1">문서 작성, 코딩 생산성 향상</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg">
                <p className="text-teal-400 font-medium">🎓 학습</p>
                <p className="text-dark-400 mt-1">리포트, 과제 작성 효율화</p>
              </div>
            </div>
          </div>

          {/* 등급 안내 */}
          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white font-medium mb-4">
              📊 타자 속도 등급표 
              <span className="text-sm text-dark-400 font-normal ml-2">
                ({isMobile ? "📱 모바일" : "💻 데스크톱"} 기준)
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                <p className="text-2xl mb-1">🌱</p>
                <p className="text-dark-400 text-sm">입문</p>
                <p className="text-white text-xs">~{isMobile ? "149" : "299"}타</p>
              </div>
              <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                <p className="text-2xl mb-1">📝</p>
                <p className="text-yellow-400 text-sm">초급</p>
                <p className="text-white text-xs">{isMobile ? "150~219" : "300~399"}타</p>
              </div>
              <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                <p className="text-2xl mb-1">⚡</p>
                <p className="text-green-400 text-sm">중급</p>
                <p className="text-white text-xs">{isMobile ? "220~279" : "400~499"}타</p>
              </div>
              <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                <p className="text-2xl mb-1">🚀</p>
                <p className="text-cyan-400 text-sm">고급</p>
                <p className="text-white text-xs">{isMobile ? "280~349" : "500~599"}타</p>
              </div>
              <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                <p className="text-2xl mb-1">👑</p>
                <p className="text-purple-400 text-sm">전문가</p>
                <p className="text-white text-xs">{isMobile ? "350" : "600"}타+</p>
              </div>
            </div>
          </div>

          {/* 다른 도구 링크 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/reaction"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                ⚡ 반응속도 테스트
              </Link>
              <Link 
                href="/salary"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💰 연봉 실수령액 계산기
              </Link>
              <Link 
                href="/severance"
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
              >
                💼 퇴직금 계산기
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

