export default function TemplateB43() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-purple-500 to-cyan-500 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden">
        {/* 그라데이션 바 */}
        <div className="h-24 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-lg">
              🌈
            </div>
          </div>
        </div>

        {/* 프로필 */}
        <div className="pt-16 px-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">최컬러풀</h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 font-medium">
            Color Specialist
          </p>
        </div>

        {/* 연락처 */}
        <div className="p-8 space-y-3">
          <a href="tel:010-1234-5678" className="flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-rose-100 to-rose-200 rounded-xl text-slate-700 hover:scale-105 transition-transform">
            <span>📞</span>
            <span>010-1234-5678</span>
          </a>
          <a href="mailto:color@rainbow.com" className="flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl text-slate-700 hover:scale-105 transition-transform">
            <span>✉️</span>
            <span>color@rainbow.com</span>
          </a>
          <a href="#" className="flex items-center justify-center gap-3 py-3 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl text-slate-700 hover:scale-105 transition-transform">
            <span>🌐</span>
            <span>rainbow.design</span>
          </a>
        </div>

        {/* 저장 버튼 */}
        <div className="p-8 pt-0">
          <button className="w-full py-4 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
            연락처 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B43</strong> 그라데이션</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

