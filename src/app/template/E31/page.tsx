export default function TemplateE31() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 메인 */}
      <div className="max-w-lg mx-auto">
        {/* 히어로 */}
        <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
          <span className="text-8xl">🏛️</span>
        </div>

        {/* 갤러리 정보 */}
        <div className="px-6 py-8">
          <p className="text-slate-500 tracking-widest text-sm">GALLERY OPENING</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            갤러리 온 개관전
          </h1>
          <p className="text-slate-500 mt-1">새로운 예술의 시작</p>

          {/* 일정 */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-slate-500">개관일</p>
              <p className="text-slate-800 font-bold">2025.03.01</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm text-slate-500">개관 기념전</p>
              <p className="text-slate-800 font-bold">~04.30</p>
            </div>
          </div>

          {/* 소개 */}
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
            <p className="text-slate-600 leading-relaxed">
              예술과 사람이 만나는 공간,<br />
              갤러리 온이 문을 엽니다.<br /><br />
              개관 기념 특별전에<br />
              여러분을 초대합니다.
            </p>
          </div>

          {/* 개관전 작가 */}
          <div className="mt-8">
            <p className="text-slate-500 font-medium mb-4">참여 작가</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto flex items-center justify-center">🎨</div>
                <p className="text-sm text-slate-600 mt-2">김작가</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto flex items-center justify-center">🖼️</div>
                <p className="text-sm text-slate-600 mt-2">이작가</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto flex items-center justify-center">✨</div>
                <p className="text-sm text-slate-600 mt-2">박작가</p>
              </div>
            </div>
          </div>

          {/* 관람 안내 */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-700 font-bold mb-4">관람 안내</p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>⏰ 10:00 - 18:00</p>
              <p>🔴 매주 월요일 휴관</p>
              <p>💰 개관 기념 무료 관람</p>
            </div>
          </div>

          {/* 위치 */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-700 font-bold mb-4">📍 위치</p>
            <p className="text-slate-600">서울시 종로구 갤러리로 10</p>
            <div className="mt-4 aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-4xl">
              🗺️
            </div>
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E31</strong> 갤러리 오픈</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

