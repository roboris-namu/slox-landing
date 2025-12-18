export default function TemplateE02() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        {/* 타이틀 */}
        <p className="text-slate-400 tracking-[0.5em] text-xs">WEDDING</p>
        
        {/* 이름 */}
        <div className="mt-16 mb-12">
          <h1 className="text-5xl font-light tracking-wide">
            JAMES & EMMA
          </h1>
          <div className="w-24 h-px bg-white/30 mx-auto mt-8" />
        </div>

        {/* 날짜 */}
        <div className="py-8">
          <p className="text-2xl font-light">2025. 03. 15</p>
          <p className="text-slate-400 mt-2">SAT PM 2:00</p>
        </div>

        {/* 사진 영역 */}
        <div className="my-12 aspect-square bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
          <span className="text-8xl">💍</span>
        </div>

        {/* 인사말 */}
        <div className="my-12">
          <p className="text-slate-300 leading-loose font-light">
            We are getting married!<br /><br />
            소중한 분들을 초대합니다.<br />
            함께해 주시면 큰 기쁨이겠습니다.
          </p>
        </div>

        {/* 장소 */}
        <div className="border-t border-b border-slate-700 py-8 my-8">
          <p className="text-slate-400 text-sm">LOCATION</p>
          <p className="text-xl mt-2">The Modern Hall</p>
          <p className="text-slate-400 text-sm mt-1">서울시 강남구 선릉로 456</p>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8 text-sm">
          <div className="border border-slate-700 rounded-lg p-4">
            <p className="text-slate-500">GROOM</p>
            <p className="mt-1">James Kim</p>
            <a href="tel:010-1234-5678" className="text-slate-400">010-1234-5678</a>
          </div>
          <div className="border border-slate-700 rounded-lg p-4">
            <p className="text-slate-500">BRIDE</p>
            <p className="mt-1">Emma Lee</p>
            <a href="tel:010-8765-4321" className="text-slate-400">010-8765-4321</a>
          </div>
        </div>

        {/* 지도 */}
        <div className="bg-slate-800 rounded-lg p-6 my-8">
          <div className="aspect-video bg-slate-700 rounded flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-slate-900 py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E02</strong> 모던 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-white text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

