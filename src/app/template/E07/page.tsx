export default function TemplateE07() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 골드 장식 */}
      <div className="text-center pt-12 text-4xl">✨</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="inline-block border border-amber-400/50 px-8 py-3 mb-8">
          <p className="text-amber-400 tracking-[0.5em] text-xs">LUXURY WEDDING</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-light text-white tracking-wide">
          DAVID <span className="text-amber-400">&</span> GRACE
        </h1>

        {/* 골드 라인 */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
          <span className="text-amber-400">◆</span>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* 날짜 */}
        <p className="text-2xl text-amber-300 font-light">2025. 06. 21</p>
        <p className="text-slate-400 mt-2">SATURDAY PM 5:00</p>

        {/* 사진 */}
        <div className="my-12 aspect-[3/4] bg-gradient-to-br from-amber-900/50 to-slate-800 rounded-lg flex items-center justify-center border border-amber-400/30">
          <span className="text-8xl">👑</span>
        </div>

        {/* 인사말 */}
        <div className="border border-amber-400/30 rounded-lg p-8 my-8">
          <p className="text-slate-300 leading-loose font-light">
            The most precious moment<br />
            of our lives.<br /><br />
            소중한 분들을 모시고<br />
            특별한 밤을 함께하고자 합니다.
          </p>
        </div>

        {/* 장소 */}
        <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/50 rounded-lg p-6 my-8 border border-amber-400/30">
          <p className="text-amber-400 text-sm">GRAND BALLROOM</p>
          <p className="text-white text-xl mt-2">럭셔리 호텔 서울</p>
          <p className="text-slate-400 text-sm mt-1">서울시 중구 럭셔리로 1</p>
        </div>

        {/* 드레스코드 */}
        <div className="bg-slate-800/50 rounded-lg p-4 my-8 border border-slate-700">
          <p className="text-amber-400 text-sm">👔 DRESS CODE</p>
          <p className="text-slate-300 mt-2">Black Tie Preferred</p>
        </div>

        {/* 지도 */}
        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
          <span className="text-4xl text-amber-400/50">🗺️</span>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8 text-sm">
          <a href="tel:010-1234-5678" className="border border-amber-400/30 rounded-lg p-4 text-amber-300 hover:bg-amber-400/10 transition-colors">
            GROOM
          </a>
          <a href="tel:010-8765-4321" className="border border-amber-400/30 rounded-lg p-4 text-amber-300 hover:bg-amber-400/10 transition-colors">
            BRIDE
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E07</strong> 럭셔리 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

