export default function TemplateE13() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-rose-50">
      {/* 장식 */}
      <div className="text-center pt-8 text-4xl">🍼 💕 🍼</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-rose-100 rounded-2xl inline-block px-6 py-2 mb-6">
          <p className="text-rose-600 font-medium">100 DAYS</p>
        </div>

        <h1 className="text-3xl text-slate-700 font-bold">
          우리 아기 백일잔치
        </h1>

        {/* 아기 이름 */}
        <div className="my-8 py-8 bg-white rounded-3xl shadow-lg">
          <span className="text-6xl">👼</span>
          <h2 className="text-3xl text-rose-500 font-bold mt-4">서연이</h2>
          <p className="text-slate-500 mt-2">백일을 맞이했어요!</p>
        </div>

        {/* 날짜 */}
        <div className="bg-rose-500 text-white rounded-2xl p-6 my-8">
          <p className="text-2xl font-bold">2025년 3월 8일</p>
          <p className="text-rose-100 mt-1">토요일 낮 11시</p>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            우리 서연이가<br />
            건강하게 백일을 맞았습니다 🎀<br /><br />
            예쁜 서연이를 보러 오셔서<br />
            축복해 주세요!
          </p>
        </div>

        {/* 타임라인 */}
        <div className="bg-rose-50 rounded-2xl p-6 my-8 text-left">
          <p className="text-rose-600 font-bold mb-4">📅 백일 기념</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center">1</span>
              <span className="text-slate-600">2024.11.29 탄생</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-300 rounded-full flex items-center justify-center text-white">100</span>
              <span className="text-slate-600">2025.03.08 백일 🎉</span>
            </div>
          </div>
        </div>

        {/* 부모님 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-rose-500">👨‍👩‍👧 서연이네 가족</p>
          <p className="text-slate-600 mt-2">아빠 김준혁 · 엄마 박서현</p>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-rose-500 font-medium">🏠 장소</p>
          <p className="text-slate-600 mt-2">레스토랑 베이비가든</p>
          <p className="text-slate-500 text-sm mt-1">서울시 강남구 백일로 100</p>
          <div className="mt-4 aspect-video bg-rose-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E13</strong> 백일잔치</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

