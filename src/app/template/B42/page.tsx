export default function TemplateB42() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
        {/* 프로필 */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center text-4xl border border-slate-700">
            🌙
          </div>
          <h1 className="text-2xl font-bold text-white mt-6">김다크</h1>
          <p className="text-slate-400 mt-1">Backend Developer</p>
        </div>

        {/* 구분선 */}
        <div className="mx-8 border-t border-slate-700" />

        {/* 연락처 */}
        <div className="p-8 space-y-4">
          <a href="tel:010-1234-5678" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <span className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">📞</span>
            <span>010-1234-5678</span>
          </a>
          <a href="mailto:dark@developer.io" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <span className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">✉️</span>
            <span>dark@developer.io</span>
          </a>
          <a href="#" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <span className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">💻</span>
            <span>github.com/kimdark</span>
          </a>
        </div>

        {/* 저장 버튼 */}
        <div className="p-8 pt-0">
          <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            연락처 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50 border-t border-slate-700">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B42</strong> 다크 모드</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

