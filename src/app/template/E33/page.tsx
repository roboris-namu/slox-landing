export default function TemplateE33() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 악기 장식 */}
        <div className="text-5xl mb-8">🎻</div>

        {/* 타이틀 */}
        <p className="text-amber-400 tracking-[0.5em] text-xs">CLASSICAL CONCERT</p>
        <h1 className="text-4xl font-serif text-white mt-4">
          베토벤 교향곡의 밤
        </h1>
        <p className="text-amber-300/80 mt-2">서울시향 정기연주회</p>

        {/* 구분선 */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-16 h-px bg-amber-400/50" />
          <span className="text-amber-400">♪</span>
          <div className="w-16 h-px bg-amber-400/50" />
        </div>

        {/* 공연 정보 */}
        <div className="py-6 border-y border-amber-400/30">
          <p className="text-2xl text-white font-serif">2025년 5월 20일</p>
          <p className="text-amber-300 mt-1">화요일 저녁 7시 30분</p>
        </div>

        {/* 프로그램 */}
        <div className="mt-8 bg-white/5 backdrop-blur rounded-xl p-6 text-left border border-amber-400/20">
          <p className="text-amber-400 font-serif mb-4">PROGRAM</p>
          <div className="space-y-4 text-white">
            <div>
              <p className="text-sm text-amber-300/60">PART I</p>
              <p className="font-serif">베토벤 - 피아노 협주곡 5번 &apos;황제&apos;</p>
            </div>
            <div>
              <p className="text-sm text-amber-300/60">PART II</p>
              <p className="font-serif">베토벤 - 교향곡 9번 &apos;합창&apos;</p>
            </div>
          </div>
        </div>

        {/* 연주자 */}
        <div className="mt-8 bg-white/5 backdrop-blur rounded-xl p-6 border border-amber-400/20">
          <p className="text-amber-400 font-serif mb-4">PERFORMERS</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-white">
              <span className="text-amber-300/60">지휘</span>
              <span>김지휘</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-amber-300/60">피아노</span>
              <span>박피아노</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-amber-300/60">연주</span>
              <span>서울시립교향악단</span>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 py-6 border-y border-amber-400/30 text-white">
          <p className="text-amber-400 text-sm">VENUE</p>
          <p className="font-serif text-lg mt-2">세종문화회관 대극장</p>
          <p className="text-amber-300/60 text-sm mt-1">서울시 종로구 세종대로 175</p>
        </div>

        {/* 티켓 */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="text-center">
            <p className="text-amber-300/60 text-xs">R석</p>
            <p className="text-white font-serif">80,000원</p>
          </div>
          <div className="text-amber-400/30">|</div>
          <div className="text-center">
            <p className="text-amber-300/60 text-xs">S석</p>
            <p className="text-white font-serif">50,000원</p>
          </div>
          <div className="text-amber-400/30">|</div>
          <div className="text-center">
            <p className="text-amber-300/60 text-xs">A석</p>
            <p className="text-white font-serif">30,000원</p>
          </div>
        </div>

        {/* 예매 */}
        <a href="#" className="block mt-8 border-2 border-amber-400 text-amber-400 rounded-lg p-4 font-serif hover:bg-amber-400 hover:text-slate-900 transition-colors">
          예매하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E33</strong> 클래식</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

