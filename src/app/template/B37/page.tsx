export default function TemplateB37() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 상단 */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto flex items-center justify-center text-4xl">
            👤
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-6">김슬록</h1>
          <p className="text-blue-600 mt-1">프로덕트 매니저</p>
          <p className="text-slate-500 text-sm mt-1">SLOX Inc.</p>
        </div>

        {/* 구분선 */}
        <div className="border-t border-slate-100" />

        {/* 연락처 */}
        <div className="p-6 space-y-4">
          <a href="tel:010-1234-5678" className="flex items-center gap-4 text-slate-600 hover:text-blue-600">
            <span className="text-xl">📞</span>
            <span>010-1234-5678</span>
          </a>
          <a href="mailto:kim@slox.co.kr" className="flex items-center gap-4 text-slate-600 hover:text-blue-600">
            <span className="text-xl">✉️</span>
            <span>kim@slox.co.kr</span>
          </a>
          <a href="https://slox.co.kr" className="flex items-center gap-4 text-slate-600 hover:text-blue-600">
            <span className="text-xl">🌐</span>
            <span>slox.co.kr</span>
          </a>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="text-xl">📍</span>
            <span>서울시 강남구</span>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="p-6 pt-0">
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            연락처 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B37</strong> 심플 명함</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

