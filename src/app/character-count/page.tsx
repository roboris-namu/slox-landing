"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function CharacterCount() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const charWithSpaces = text.length;
    const charWithoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const bytes = new TextEncoder().encode(text).length;
    const lines = text ? text.split("\n").length : 0;
    const paragraphs = text.trim()
      ? text.trim().split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0;
    const koreanChars = (text.match(/[가-힣]/g) || []).length;
    const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;

    return {
      charWithSpaces,
      charWithoutSpaces,
      words,
      bytes,
      lines,
      paragraphs,
      koreanChars,
      englishChars,
      numbers,
    };
  }, [text]);

  const handleClear = () => setText("");
  const handleCopy = () => navigator.clipboard.writeText(text);
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error("클립보드 읽기 실패:", err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/salary" className="text-dark-400 hover:text-white transition-colors text-sm">
                💰 연봉 계산기
              </Link>
              <Link href="/loan" className="text-dark-400 hover:text-white transition-colors text-sm">
                🏦 대출이자 계산기
              </Link>
              <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                ← 메인으로
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <span className="text-violet-400 text-sm font-medium">✍️ 글자수 세기</span>
              <span className="px-1.5 py-0.5 text-xs bg-violet-500/20 text-violet-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">글자수 세기</h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              글자수, 단어수, 바이트 수를 실시간으로 확인하세요.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-dark-300 text-sm font-medium">텍스트 입력</label>
              <div className="flex gap-2">
                <button onClick={handlePaste} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all">
                  📋 붙여넣기
                </button>
                <button onClick={handleCopy} className="px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all" disabled={!text}>
                  📑 복사
                </button>
                <button onClick={handleClear} className="px-3 py-1.5 bg-dark-700 hover:bg-red-600/50 text-dark-300 hover:text-white rounded-lg text-sm transition-all" disabled={!text}>
                  🗑️ 지우기
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
              className="w-full h-64 p-4 bg-dark-800 border border-dark-700 rounded-lg text-white text-base resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-sm mb-2">글자수 (공백 포함)</p>
              <p className="text-white text-3xl font-bold">{stats.charWithSpaces.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-sm mb-2">글자수 (공백 미포함)</p>
              <p className="text-violet-400 text-3xl font-bold">{stats.charWithoutSpaces.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-sm mb-2">단어수</p>
              <p className="text-cyan-400 text-3xl font-bold">{stats.words.toLocaleString()}</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-dark-400 text-sm mb-2">바이트 (UTF-8)</p>
              <p className="text-emerald-400 text-3xl font-bold">{stats.bytes.toLocaleString()}</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h2 className="text-white text-xl font-bold mb-4">📊 상세 분석</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <p className="text-dark-400 text-xs mb-1">줄 수</p>
                <p className="text-white text-xl font-bold">{stats.lines.toLocaleString()}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <p className="text-dark-400 text-xs mb-1">문단 수</p>
                <p className="text-white text-xl font-bold">{stats.paragraphs.toLocaleString()}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <p className="text-dark-400 text-xs mb-1">한글</p>
                <p className="text-yellow-400 text-xl font-bold">{stats.koreanChars.toLocaleString()}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <p className="text-dark-400 text-xs mb-1">영문</p>
                <p className="text-blue-400 text-xl font-bold">{stats.englishChars.toLocaleString()}</p>
              </div>
              <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 text-center">
                <p className="text-dark-400 text-xs mb-1">숫자</p>
                <p className="text-pink-400 text-xl font-bold">{stats.numbers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <h3 className="text-white text-xl font-bold mb-4">📌 글자수 제한 참고</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                <h4 className="text-violet-400 font-semibold mb-3">📱 SNS 글자수 제한</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li className="flex justify-between"><span>트위터(X) 게시글</span><span className="text-white">280자</span></li>
                  <li className="flex justify-between"><span>인스타그램 캡션</span><span className="text-white">2,200자</span></li>
                  <li className="flex justify-between"><span>페이스북 게시글</span><span className="text-white">63,206자</span></li>
                  <li className="flex justify-between"><span>유튜브 제목</span><span className="text-white">100자</span></li>
                  <li className="flex justify-between"><span>유튜브 설명</span><span className="text-white">5,000자</span></li>
                </ul>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                <h4 className="text-cyan-400 font-semibold mb-3">📝 기타 글자수 제한</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li className="flex justify-between"><span>네이버 블로그 제목</span><span className="text-white">100자</span></li>
                  <li className="flex justify-between"><span>카카오톡 프로필</span><span className="text-white">60자</span></li>
                  <li className="flex justify-between"><span>네이버 메일 제목</span><span className="text-white">100자</span></li>
                  <li className="flex justify-between"><span>SMS 문자</span><span className="text-white">80바이트</span></li>
                  <li className="flex justify-between"><span>LMS 문자</span><span className="text-white">2,000바이트</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/salary" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">💰 연봉 계산기</Link>
              <Link href="/loan" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🏦 대출이자 계산기</Link>
              <Link href="/savings" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">💰 적금이자 계산기</Link>
              <Link href="/reaction" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">⚡ 반응속도 테스트</Link>
              <Link href="/cps" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🖱️ CPS 테스트</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href="/" className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
        <p className="mb-4">홈페이지 · 앱 제작 · AI 챗봇 구축</p>
        <div className="flex justify-center space-x-4">
          <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
          <Link href="/" className="hover:text-white">메인으로</Link>
        </div>
      </footer>
    </div>
  );
}

