export default function TemplateB39() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200">
        {/* 골드 바 */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

        {/* 프로필 */}
        <div className="p-8 text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mx-auto flex items-center justify-center text-5xl border-4 border-amber-300 shadow-lg">
            👔
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-6">박대표</h1>
          <p className="text-amber-600 font-medium mt-1">대표이사 / CEO</p>
          <p className="text-slate-500 text-sm mt-1">PREMIUM CORP.</p>
        </div>

        {/* 구분선 */}
        <div className="mx-8 border-t border-amber-200" />

        {/* 연락처 */}
        <div className="p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">📞</div>
            <div>
              <p className="text-xs text-slate-400">PHONE</p>
              <p className="text-slate-700">02-1234-5678</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">✉️</div>
            <div>
              <p className="text-xs text-slate-400">EMAIL</p>
              <p className="text-slate-700">ceo@premium.co.kr</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">🏢</div>
            <div>
              <p className="text-xs text-slate-400">ADDRESS</p>
              <p className="text-slate-700">서울시 강남구 테헤란로 123</p>
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="p-8 pt-0">
          <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all">
            ✨ 연락처 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B39</strong> 프리미엄 명함</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

