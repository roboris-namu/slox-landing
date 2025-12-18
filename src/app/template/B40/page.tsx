export default function TemplateB40() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        {/* 배경 패턴 */}
        <div className="h-32 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 relative">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="absolute text-white text-2xl" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}>
                ✦
              </span>
            ))}
          </div>
        </div>

        {/* 프로필 */}
        <div className="px-8 -mt-16 text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center text-5xl border-4 border-white shadow-xl">
            🎨
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-4">최크리에이티브</h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-medium">Creative Director</p>
        </div>

        {/* 소개 */}
        <div className="p-8 text-center">
          <p className="text-slate-500 text-sm leading-relaxed">
            창의적인 아이디어로 브랜드에 생명을 불어넣습니다.
            함께 멋진 것을 만들어요! ✨
          </p>
        </div>

        {/* 연락처 */}
        <div className="px-8 pb-8 grid grid-cols-3 gap-3">
          <a href="tel:010-1234-5678" className="p-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl text-center hover:scale-105 transition-transform">
            <span className="text-2xl">📞</span>
          </a>
          <a href="mailto:creative@email.com" className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl text-center hover:scale-105 transition-transform">
            <span className="text-2xl">✉️</span>
          </a>
          <a href="#" className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl text-center hover:scale-105 transition-transform">
            <span className="text-2xl">🔗</span>
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B40</strong> 크리에이티브</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

