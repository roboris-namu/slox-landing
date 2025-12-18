export default function TemplateE09() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100">
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        {/* 일러스트 헤더 */}
        <div className="text-6xl mb-8">🎨</div>

        {/* 타이틀 */}
        <p className="text-rose-400 tracking-widest text-sm">ILLUSTRATED WEDDING</p>

        {/* 이름 - 손글씨 스타일 */}
        <h1 className="text-4xl text-slate-700 mt-8" style={{ fontFamily: 'cursive' }}>
          준호 ♡ 수진
        </h1>

        {/* 날짜 */}
        <div className="my-8 py-4">
          <p className="text-rose-500 text-xl">2025년 5월 17일</p>
          <p className="text-slate-500 mt-1">토요일 오후 1시</p>
        </div>

        {/* 일러스트 영역 */}
        <div className="my-8 relative">
          <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center mx-auto max-w-xs border-4 border-white shadow-xl">
            <span className="text-8xl">👩‍❤️‍👨</span>
          </div>
          {/* 장식 */}
          <div className="absolute top-0 left-1/4 text-2xl animate-bounce">🌸</div>
          <div className="absolute bottom-0 right-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌺</div>
          <div className="absolute top-1/2 left-4 text-xl">💕</div>
          <div className="absolute top-1/2 right-4 text-xl">💕</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 my-8 border-2 border-dashed border-rose-200">
          <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'cursive' }}>
            서로를 바라보며<br />
            함께 걸어가기로 했어요 🥰<br /><br />
            저희의 새 출발을<br />
            축하해 주세요!
          </p>
        </div>

        {/* 일러스트 구분선 */}
        <div className="flex justify-center gap-2 my-8 text-xl">
          🌷 🌼 🌷 🌼 🌷
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-3xl p-6 my-8 shadow-lg">
          <p className="text-rose-500">📍 예쁜 웨딩홀</p>
          <p className="text-slate-600 mt-2">서울시 마포구 일러스트로 33</p>
          <div className="mt-4 aspect-video bg-rose-50 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">🗺️</span>
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex justify-center gap-6 my-8">
          <a href="tel:010-1234-5678" className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            🤵
          </a>
          <a href="tel:010-8765-4321" className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform">
            👰
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E09</strong> 일러스트 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

