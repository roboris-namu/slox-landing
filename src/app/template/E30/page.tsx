export default function TemplateE30() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="py-8">
          <p className="text-white/80 tracking-[0.5em] text-sm">2025</p>
          <h1 className="text-5xl font-bold text-white mt-4">
            SUMMER FEST
          </h1>
          <p className="text-white/80 text-xl mt-2">🎪 여름 축제 🎪</p>
        </div>

        {/* 날짜 */}
        <div className="py-6 bg-white/20 backdrop-blur rounded-2xl">
          <p className="text-white font-bold text-2xl">7.19 - 7.21</p>
          <p className="text-white/80 mt-1">금 · 토 · 일</p>
        </div>

        {/* 라인업 */}
        <div className="mt-8 py-8 bg-white/10 backdrop-blur rounded-2xl">
          <p className="text-yellow-300 font-bold mb-6">🎤 LINE UP</p>
          <div className="space-y-4 text-white text-xl font-bold">
            <p>아티스트 A</p>
            <p>아티스트 B</p>
            <p>아티스트 C</p>
            <p className="text-white/60 text-base">+ more...</p>
          </div>
        </div>

        {/* 타임테이블 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6 text-left">
          <p className="text-yellow-300 font-bold mb-4">📅 TIME TABLE</p>
          <div className="space-y-4 text-white text-sm">
            <div>
              <p className="text-white/60">DAY 1 (금)</p>
              <p>17:00 - 22:00</p>
            </div>
            <div>
              <p className="text-white/60">DAY 2 (토)</p>
              <p>14:00 - 22:00</p>
            </div>
            <div>
              <p className="text-white/60">DAY 3 (일)</p>
              <p>14:00 - 20:00</p>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6">
          <p className="text-yellow-300 font-bold">📍 VENUE</p>
          <p className="text-white mt-2">서울 올림픽공원</p>
          <p className="text-white/60 text-sm">서울시 송파구 올림픽로 424</p>
        </div>

        {/* 티켓 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-white/80 text-sm">1일권</p>
            <p className="text-white font-bold text-xl">66,000원</p>
          </div>
          <div className="bg-yellow-400 text-slate-900 rounded-xl p-4">
            <p className="text-slate-600 text-sm">3일권</p>
            <p className="font-bold text-xl">150,000원</p>
          </div>
        </div>

        {/* 예매 */}
        <a href="#" className="block mt-8 bg-white text-purple-600 rounded-lg p-4 font-bold text-lg">
          🎫 티켓 예매
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-purple-600 py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E30</strong> 페스티벌</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

