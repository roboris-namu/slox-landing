"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (chars.length === 0) {
      setPassword("옵션을 하나 이상 선택하세요");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    if (password && password !== "옵션을 하나 이상 선택하세요") {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 비밀번호 강도 계산
  const getStrength = (): { label: string; color: string; width: string } => {
    let score = 0;
    if (useUppercase) score++;
    if (useLowercase) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    if (score <= 2) return { label: "약함", color: "bg-red-500", width: "25%" };
    if (score <= 3) return { label: "보통", color: "bg-yellow-500", width: "50%" };
    if (score <= 4) return { label: "강함", color: "bg-blue-500", width: "75%" };
    return { label: "매우 강함", color: "bg-green-500", width: "100%" };
  };

  const strength = getStrength();
  const lengths = [8, 12, 16, 20, 24, 32];

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
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
              ← 메인으로
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-emerald-400 text-sm font-medium">🔐 비밀번호 생성기</span>
              <span className="px-1.5 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">비밀번호 생성기</h1>
            <p className="text-dark-400 text-lg">안전한 랜덤 비밀번호를 만들어보세요</p>
          </div>

          {/* 비밀번호 표시 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="relative">
              <div className="w-full p-4 bg-dark-800 border border-dark-700 rounded-lg font-mono text-lg text-center break-all min-h-[60px] flex items-center justify-center">
                {password || <span className="text-dark-500">생성 버튼을 눌러주세요</span>}
              </div>
              {password && password !== "옵션을 하나 이상 선택하세요" && (
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white rounded-lg text-sm transition-all"
                >
                  {copied ? "✅ 복사됨!" : "📋 복사"}
                </button>
              )}
            </div>

            {/* 강도 표시 */}
            {password && password !== "옵션을 하나 이상 선택하세요" && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-dark-400 text-sm">보안 강도</span>
                  <span className={`text-sm font-medium ${strength.color.replace('bg-', 'text-')}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={generatePassword}
              className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-lg font-medium transition-all"
            >
              🔐 비밀번호 생성
            </button>
          </div>

          {/* 옵션 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="text-white font-bold mb-4">⚙️ 옵션</h3>

            {/* 길이 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-dark-300 text-sm">길이</label>
                <span className="text-white font-bold">{length}자</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between mt-2">
                {lengths.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      length === l
                        ? "bg-emerald-600 text-white"
                        : "bg-dark-700 text-dark-400 hover:bg-dark-600"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* 포함 문자 */}
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800 transition-all">
                <span className="text-dark-300">대문자 (A-Z)</span>
                <input
                  type="checkbox"
                  checked={useUppercase}
                  onChange={(e) => setUseUppercase(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800 transition-all">
                <span className="text-dark-300">소문자 (a-z)</span>
                <input
                  type="checkbox"
                  checked={useLowercase}
                  onChange={(e) => setUseLowercase(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800 transition-all">
                <span className="text-dark-300">숫자 (0-9)</span>
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg cursor-pointer hover:bg-dark-800 transition-all">
                <span className="text-dark-300">특수문자 (!@#$%...)</span>
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* 안내 */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="text-white font-bold mb-3">💡 안전한 비밀번호 팁</h3>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li>✅ 최소 12자 이상 사용</li>
              <li>✅ 대소문자, 숫자, 특수문자 모두 포함</li>
              <li>✅ 각 사이트마다 다른 비밀번호 사용</li>
              <li>✅ 개인정보(생일, 이름 등) 포함 금지</li>
            </ul>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/qr" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">📱 QR코드 생성기</Link>
              <Link href="/random" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎲 랜덤 뽑기</Link>
              <Link href="/character-count" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">✍️ 글자수 세기</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href="/" className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}

