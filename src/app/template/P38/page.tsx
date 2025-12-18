"use client";

import { useEffect, useState } from "react";

export default function TemplateP38() {
  const [displayText, setDisplayText] = useState("");
  const fullText = `> Welcome to my terminal portfolio
> Name: 박터미널
> Role: Backend Developer
> Location: Seoul, Korea
> 
> $ cat skills.txt
> Languages: Python, Go, Rust
> Databases: PostgreSQL, Redis, MongoDB
> Tools: Docker, Kubernetes, AWS
> 
> $ cat experience.txt
> [2022-Present] Senior Backend @ Tech Corp
> [2020-2022] Backend Developer @ Startup
> [2018-2020] Junior Developer @ Agency
> 
> $ echo "Let's connect!"
> Email: terminal@dev.io
> GitHub: github.com/terminal
> 
> $ _`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      {/* 터미널 윈도우 */}
      <div className="max-w-3xl mx-auto">
        {/* 타이틀바 */}
        <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="text-gray-400 text-sm ml-4">terminal@portfolio ~ </span>
        </div>

        {/* 터미널 컨텐츠 */}
        <div className="bg-gray-950 rounded-b-lg p-6 min-h-[500px] border border-gray-800">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
            {displayText}
            <span className="animate-pulse">▋</span>
          </pre>
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 flex justify-center gap-8 text-sm text-green-600">
          <a href="#" className="hover:text-green-400">[GitHub]</a>
          <a href="#" className="hover:text-green-400">[LinkedIn]</a>
          <a href="#" className="hover:text-green-400">[Email]</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-black py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between font-sans">
          <span className="text-sm font-medium"><strong>P38</strong> 터미널 테마</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-black text-green-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

