export default function TemplateE29() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 공연 포스터 */}
        <div className="aspect-[3/4] bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl flex items-center justify-center border-4 border-white/20">
          <span className="text-8xl">🎵</span>
        </div>

        {/* 공연 정보 */}
        <div className="mt-8">
          <p className="text-purple-400 tracking-widest text-sm">CONCERT</p>
          <h1 className="text-4xl font-bold text-white mt-2">
            봄의 선율
          </h1>
          <p className="text-purple-300 mt-2">Spring Melody Orchestra</p>
        </div>

        {/* 날짜 & 시간 */}
        <div className="mt-8 py-6 bg-white/10 backdrop-blur rounded-2xl border border-purple-400/30">
          <p className="text-purple-300">📅 공연 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 4월 15일</p>
          <p className="text-purple-300 mt-1">화요일 저녁 7:30</p>
        </div>

        {/* 공연 소개 */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-2xl">
          <p className="text-purple-100 leading-relaxed">
            봄의 따스함을 담은 클래식 공연.<br />
            비발디의 사계부터 베토벤의 교향곡까지,<br />
            아름다운 선율의 여정을 함께해요.
          </p>
        </div>

        {/* 프로그램 */}
        <div className="mt-8 bg-purple-600/30 rounded-2xl p-6 text-left">
          <p className="text-purple-300 font-bold mb-4">🎼 프로그램</p>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between">
              <span>비발디 - 사계 &apos;봄&apos;</span>
              <span className="text-purple-300">15분</span>
            </div>
            <div className="flex justify-between">
              <span>모차르트 - 피아노 협주곡</span>
              <span className="text-purple-300">25분</span>
            </div>
            <div className="flex justify-between">
              <span>베토벤 - 교향곡 6번</span>
              <span className="text-purple-300">40분</span>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6">
          <p className="text-purple-300 font-medium">📍 장소</p>
          <p className="text-white mt-2">예술의전당 콘서트홀</p>
          <p className="text-purple-300 text-sm mt-1">서울시 서초구 예술로 100</p>
        </div>

        {/* 티켓 안내 */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="bg-purple-600/50 rounded-xl p-4">
            <p className="text-purple-200 text-xs">R석</p>
            <p className="text-white font-bold">80,000원</p>
          </div>
          <div className="bg-purple-600/50 rounded-xl p-4">
            <p className="text-purple-200 text-xs">S석</p>
            <p className="text-white font-bold">60,000원</p>
          </div>
          <div className="bg-purple-600/50 rounded-xl p-4">
            <p className="text-purple-200 text-xs">A석</p>
            <p className="text-white font-bold">40,000원</p>
          </div>
        </div>

        {/* 예매 */}
        <a href="#" className="block mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 font-bold">
          🎵 티켓 예매하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E29</strong> 공연 안내</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

