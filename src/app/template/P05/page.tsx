export default function TemplateP05() {
  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* 네온 배경 효과 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm text-green-400 text-center py-2 text-sm z-50 border-b border-green-500/30">
        ⚡ 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 pt-16 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/20">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 p-1">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-5xl">
              🎮
            </div>
          </div>

          {/* 이름 */}
          <h1 className="text-3xl font-black text-center mb-2">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CYBERDEV
            </span>
          </h1>

          {/* 직함 */}
          <p className="text-center text-green-400 font-mono text-sm mb-6">
            &gt; Full-Stack Developer_
          </p>

          {/* 소개 */}
          <p className="text-center text-gray-400 leading-relaxed mb-8 text-sm font-mono">
            코드로 미래를 만듭니다.<br/>
            Web3 & AI 전문 개발자.
          </p>

          {/* 스킬 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["React", "Node.js", "Web3", "AI/ML"].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full text-xs font-mono">
                #{skill}
              </span>
            ))}
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all">
              <span>📧</span> CONTACT ME
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-transparent text-green-400 border border-green-500/50 rounded-xl font-bold hover:bg-green-500/10 transition-colors">
              <span>💻</span> VIEW PROJECTS
            </a>
          </div>

          {/* 스캔라인 효과 */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* 상태 표시 */}
        <div className="flex justify-center items-center gap-2 mt-8 text-green-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          ONLINE
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-500/30 p-4 md:hidden z-50">
        <button className="w-full py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-black rounded-xl font-bold">
          이 템플릿으로 주문하기 ⚡
        </button>
      </div>
    </div>
  );
}

