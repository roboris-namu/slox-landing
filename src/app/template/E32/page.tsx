export default function TemplateE32() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-rose-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 포스터 */}
        <div className="aspect-[3/4] bg-gradient-to-br from-red-800 to-rose-900 rounded-2xl flex items-center justify-center border-4 border-amber-400">
          <span className="text-8xl">🎭</span>
        </div>

        {/* 타이틀 */}
        <div className="mt-8">
          <p className="text-amber-400 tracking-widest text-sm">MUSICAL</p>
          <h1 className="text-4xl font-bold text-white mt-2">
            오페라의 유령
          </h1>
          <p className="text-rose-300 mt-2">The Phantom of the Opera</p>
        </div>

        {/* 공연 정보 */}
        <div className="mt-8 py-6 bg-white/10 backdrop-blur rounded-2xl border border-amber-400/30">
          <p className="text-amber-300">📅 공연 기간</p>
          <p className="text-2xl text-white font-bold mt-2">2025.04 - 2025.08</p>
          <p className="text-rose-300 mt-1">화~일 공연</p>
        </div>

        {/* 공연 시간 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-amber-300 text-sm">평일</p>
            <p className="text-white font-bold">19:30</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-amber-300 text-sm">주말/공휴일</p>
            <p className="text-white font-bold">14:00 / 18:00</p>
          </div>
        </div>

        {/* 캐스트 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6">
          <p className="text-amber-300 font-bold mb-4">🎭 CAST</p>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between">
              <span className="text-rose-300">팬텀</span>
              <span>배우 A / 배우 B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-300">크리스틴</span>
              <span>배우 C / 배우 D</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-300">라울</span>
              <span>배우 E / 배우 F</span>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6">
          <p className="text-amber-300 font-medium">📍 공연장</p>
          <p className="text-white mt-2">블루스퀘어 신한카드홀</p>
          <p className="text-rose-300 text-sm mt-1">서울시 용산구 이태원로</p>
        </div>

        {/* 티켓 */}
        <div className="mt-8 bg-red-600/50 backdrop-blur rounded-2xl p-6">
          <p className="text-amber-300 font-bold mb-4">🎫 티켓 가격</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-rose-300">VIP</p>
              <p className="text-white font-bold">170,000</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-rose-300">R석</p>
              <p className="text-white font-bold">140,000</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-rose-300">S석</p>
              <p className="text-white font-bold">110,000</p>
            </div>
          </div>
        </div>

        {/* 예매 */}
        <a href="#" className="block mt-8 bg-amber-400 text-slate-900 rounded-lg p-4 font-bold">
          🎭 티켓 예매하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E32</strong> 뮤지컬</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

