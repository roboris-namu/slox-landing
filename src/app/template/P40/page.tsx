export default function TemplateP40() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 font-mono">
      {/* VSCode 상단 바 */}
      <div className="bg-[#323233] px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="text-blue-400">💻</span>
          <span className="text-gray-400">File</span>
          <span className="text-gray-400">Edit</span>
          <span className="text-gray-400">View</span>
        </div>
        <span className="text-gray-500">portfolio.tsx - Visual Studio Code</span>
      </div>

      <div className="flex">
        {/* 사이드바 */}
        <div className="w-12 bg-[#252526] flex flex-col items-center py-4 gap-6 text-gray-500">
          <span className="text-xl hover:text-white cursor-pointer">📁</span>
          <span className="text-xl hover:text-white cursor-pointer">🔍</span>
          <span className="text-xl hover:text-white cursor-pointer">🔀</span>
          <span className="text-xl hover:text-white cursor-pointer">🐛</span>
        </div>

        {/* 파일 탐색기 */}
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] p-4 text-sm">
          <p className="text-gray-500 text-xs mb-3">EXPLORER</p>
          <div className="space-y-1">
            <p className="text-yellow-400">📁 portfolio</p>
            <p className="pl-4">📄 about.tsx</p>
            <p className="pl-4 text-blue-400">📄 skills.tsx</p>
            <p className="pl-4">📄 contact.tsx</p>
          </div>
        </div>

        {/* 에디터 */}
        <div className="flex-1 p-6">
          {/* 탭 */}
          <div className="flex mb-4 border-b border-[#3c3c3c]">
            <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-sm">
              developer.tsx
            </div>
          </div>

          {/* 코드 */}
          <div className="text-sm leading-relaxed">
            <p><span className="text-purple-400">const</span> <span className="text-blue-300">Developer</span> = () =&gt; {`{`}</p>
            <p className="pl-4"><span className="text-purple-400">const</span> info = {`{`}</p>
            <p className="pl-8"><span className="text-cyan-300">name</span>: <span className="text-orange-300">&quot;최코드&quot;</span>,</p>
            <p className="pl-8"><span className="text-cyan-300">role</span>: <span className="text-orange-300">&quot;Full-stack Developer&quot;</span>,</p>
            <p className="pl-8"><span className="text-cyan-300">location</span>: <span className="text-orange-300">&quot;Seoul, Korea&quot;</span>,</p>
            <p className="pl-4">{`}`};</p>
            <br />
            <p className="pl-4"><span className="text-purple-400">const</span> skills = [</p>
            <p className="pl-8"><span className="text-orange-300">&quot;TypeScript&quot;</span>, <span className="text-orange-300">&quot;React&quot;</span>, <span className="text-orange-300">&quot;Node.js&quot;</span>,</p>
            <p className="pl-8"><span className="text-orange-300">&quot;PostgreSQL&quot;</span>, <span className="text-orange-300">&quot;Docker&quot;</span>, <span className="text-orange-300">&quot;AWS&quot;</span></p>
            <p className="pl-4">];</p>
            <br />
            <p className="pl-4"><span className="text-purple-400">const</span> experience = [</p>
            <p className="pl-8">{`{`} company: <span className="text-orange-300">&quot;Tech Corp&quot;</span>, years: <span className="text-green-400">3</span> {`}`},</p>
            <p className="pl-8">{`{`} company: <span className="text-orange-300">&quot;Startup&quot;</span>, years: <span className="text-green-400">2</span> {`}`},</p>
            <p className="pl-4">];</p>
            <br />
            <p className="pl-4"><span className="text-purple-400">const</span> contact = {`{`}</p>
            <p className="pl-8"><span className="text-cyan-300">email</span>: <span className="text-orange-300">&quot;code@dev.io&quot;</span>,</p>
            <p className="pl-8"><span className="text-cyan-300">github</span>: <span className="text-orange-300">&quot;github.com/code&quot;</span>,</p>
            <p className="pl-4">{`}`};</p>
            <br />
            <p className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-green-300">Portfolio</span> /&gt;;</p>
            <p>{`}`};</p>
          </div>
        </div>
      </div>

      {/* 상태바 */}
      <div className="fixed bottom-12 left-0 right-0 bg-[#007acc] text-white text-xs px-4 py-1 flex justify-between">
        <div className="flex gap-4">
          <span>🔀 main</span>
          <span>✓ 0 problems</span>
        </div>
        <div className="flex gap-4">
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#007acc] text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-sans">
          <span className="text-sm"><strong>P40</strong> 코드 에디터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-[#007acc] text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

