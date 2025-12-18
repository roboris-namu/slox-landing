"use client";

import { useEffect, useState } from "react";

export default function TemplateP41() {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newChars = Array.from({ length: 50 }, () =>
        String.fromCharCode(0x30A0 + Math.random() * 96)
      );
      setChars(newChars);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden">
      {/* 매트릭스 배경 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, col) => (
          <div
            key={col}
            className="absolute top-0 text-xs leading-tight"
            style={{
              left: `${col * 5}%`,
              animation: `fall ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {chars.slice(col * 2, col * 2 + 20).join("\n")}
          </div>
        ))}
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <div className="text-6xl mb-4">🟢</div>
          <h1 className="text-4xl font-bold mb-2">MATRIX_DEV</h1>
          <p className="text-green-600">{"//"} Escape the ordinary</p>
        </header>

        {/* 터미널 박스 */}
        <div className="bg-black/80 border border-green-500/50 rounded-lg p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <pre className="text-sm">
{`> SYSTEM INITIALIZED
> LOADING PROFILE...

NAME: 정매트릭스
ROLE: Security Engineer
STATUS: AVAILABLE

SKILLS: [
  "Penetration Testing",
  "Network Security",
  "Python", "Go", "Rust",
  "Linux", "AWS"
]

EXPERIENCE:
  └── Security Engineer @ Tech Corp (2022-NOW)
  └── DevOps @ Startup (2020-2022)
  └── SysAdmin @ Agency (2018-2020)

> READY FOR CONNECTION_`}
          </pre>
        </div>

        {/* 링크 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {["GitHub", "LinkedIn", "Blog", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="block py-4 text-center border border-green-500/50 rounded hover:bg-green-500/20 transition-colors"
            >
              [{link}]
            </a>
          ))}
        </div>

        {/* 푸터 */}
        <footer className="text-center text-green-700 text-sm">
          <p>{"//"} Follow the white rabbit</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-black py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between font-sans">
          <span className="text-sm font-medium"><strong>P41</strong> 매트릭스</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-black text-green-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

