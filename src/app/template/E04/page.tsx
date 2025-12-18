export default function TemplateE04() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        {/* 장식 */}
        <div className="text-5xl mb-4">🕊️</div>

        {/* 타이틀 */}
        <div className="border-2 border-amber-300 rounded-lg inline-block px-6 py-3 mb-8">
          <p className="text-amber-700 tracking-widest font-serif">CLASSIC WEDDING</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-serif text-slate-700">
          정민수 & 한지현
        </h1>

        {/* 구분선 */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-16 h-px bg-amber-300" />
          <span className="text-amber-500">♦</span>
          <div className="w-16 h-px bg-amber-300" />
        </div>

        {/* 날짜 */}
        <div className="space-y-2">
          <p className="text-2xl text-amber-700 font-serif">2025년 5월 10일 토요일</p>
          <p className="text-slate-600">오후 1시 30분</p>
        </div>

        {/* 사진 - 클래식 프레임 */}
        <div className="my-12 p-4 bg-amber-100 rounded-lg border-4 border-amber-200">
          <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-orange-200 rounded flex items-center justify-center">
            <span className="text-8xl">💒</span>
          </div>
        </div>

        {/* 인사말 */}
        <div className="bg-white rounded-lg p-8 my-8 shadow-lg border border-amber-100">
          <p className="text-slate-600 leading-relaxed font-serif">
            두 사람이 만나<br />
            사랑으로 하나 되는 날,<br /><br />
            귀한 걸음으로 축복해 주시면<br />
            더없는 기쁨으로 간직하겠습니다.
          </p>
        </div>

        {/* 혼주 */}
        <div className="grid grid-cols-2 gap-6 my-8 text-sm">
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-amber-600 mb-2">신랑측 혼주</p>
            <p className="text-slate-700">정대호 · 김순자</p>
            <p className="text-slate-500 mt-1">의 아들 민수</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-orange-600 mb-2">신부측 혼주</p>
            <p className="text-slate-700">한영석 · 박미영</p>
            <p className="text-slate-500 mt-1">의 딸 지현</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-lg p-6 my-8 shadow border border-amber-100">
          <h3 className="font-serif text-lg text-amber-700 mb-4">예식 장소</h3>
          <p className="text-slate-700 font-medium">클래식 웨딩컨벤션</p>
          <p className="text-slate-500 text-sm mt-1">서울시 종로구 클래식로 100</p>
          <div className="mt-4 aspect-video bg-amber-50 rounded flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E04</strong> 클래식 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

