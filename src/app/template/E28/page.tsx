export default function TemplateE28() {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 */}
      <div className="max-w-lg mx-auto">
        {/* 히어로 이미지 */}
        <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <span className="text-8xl">🖼️</span>
        </div>

        {/* 전시 정보 */}
        <div className="px-6 py-8">
          {/* 타이틀 */}
          <p className="text-sm text-slate-500 tracking-widest">EXHIBITION</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            빛과 그림자
          </h1>
          <p className="text-slate-500 mt-1">Light and Shadow</p>

          {/* 작가 */}
          <div className="flex items-center gap-4 mt-6 py-4 border-y border-slate-200">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-2xl">🎨</div>
            <div>
              <p className="text-sm text-slate-500">ARTIST</p>
              <p className="text-slate-800 font-medium">김아트</p>
            </div>
          </div>

          {/* 전시 기간 */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm text-slate-500">전시 기간</p>
                <p className="text-slate-800">2025.03.01 - 2025.04.30</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🕐</span>
              <div>
                <p className="text-sm text-slate-500">관람 시간</p>
                <p className="text-slate-800">10:00 - 18:00 (월요일 휴관)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-slate-500">장소</p>
                <p className="text-slate-800">아트갤러리 서울</p>
                <p className="text-slate-500 text-sm">서울시 종로구 전시로 1</p>
              </div>
            </div>
          </div>

          {/* 전시 소개 */}
          <div className="mt-8 p-6 bg-slate-50 rounded-xl">
            <p className="text-slate-600 leading-relaxed">
              빛이 만들어내는 다양한 그림자의 세계.<br />
              일상 속에서 지나치는 순간들을<br />
              작가의 시선으로 담아냈습니다.
            </p>
          </div>

          {/* 갤러리 미리보기 */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            <div className="aspect-square bg-slate-200 rounded"></div>
            <div className="aspect-square bg-slate-300 rounded"></div>
            <div className="aspect-square bg-slate-200 rounded"></div>
          </div>

          {/* 지도 */}
          <div className="mt-8 aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E28</strong> 전시회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

