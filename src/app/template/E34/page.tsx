export default function TemplateE34() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-pink-100 to-cyan-100">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8">
        {/* 타이틀 */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
            POP-UP STORE
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mt-6">
            브랜드 X 팝업스토어
          </h1>
          <p className="text-slate-500 mt-2">한정판을 만나보세요! ✨</p>
        </div>

        {/* 비주얼 */}
        <div className="mt-8 aspect-square bg-gradient-to-br from-violet-200 to-pink-200 rounded-3xl flex items-center justify-center">
          <span className="text-8xl">🏪</span>
        </div>

        {/* 기간 */}
        <div className="mt-8 py-6 bg-white rounded-2xl shadow-lg text-center">
          <p className="text-violet-500 text-sm">📅 운영 기간</p>
          <p className="text-2xl font-bold text-slate-800 mt-2">2025.04.01 - 04.30</p>
          <p className="text-slate-500 mt-1">11:00 - 21:00 (매일 운영)</p>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-2xl">
          <p className="text-slate-600 leading-relaxed text-center">
            브랜드 X의 새로운 컬렉션을<br />
            가장 먼저 만나볼 수 있는 기회! 🎁<br /><br />
            현장 구매 시 한정 굿즈 증정!
          </p>
        </div>

        {/* 특별 이벤트 */}
        <div className="mt-8 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-2xl p-6">
          <p className="font-bold mb-4">🎉 SPECIAL EVENT</p>
          <div className="space-y-2 text-sm">
            <p>✓ 오픈 기념 10% 할인</p>
            <p>✓ 5만원 이상 구매 시 굿즈 증정</p>
            <p>✓ 인스타 포토존 운영</p>
            <p>✓ 럭키드로우 이벤트</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-violet-500 font-bold">📍 LOCATION</p>
          <p className="text-slate-800 mt-2 font-medium">더현대 서울 B1</p>
          <p className="text-slate-500 text-sm mt-1">서울시 영등포구 여의대로 108</p>
          <div className="mt-4 aspect-video bg-violet-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* SNS */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
            📷
          </a>
          <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white text-xl">
            🐦
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E34</strong> 팝업스토어</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-violet-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

