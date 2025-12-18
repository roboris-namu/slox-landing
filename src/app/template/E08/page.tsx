export default function TemplateE08() {
  return (
    <div className="min-h-screen bg-amber-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a574\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        {/* 빈티지 프레임 */}
        <div className="bg-white rounded-lg p-8 shadow-lg border-4 border-amber-200">
          {/* 장식 */}
          <div className="text-3xl mb-4">📜</div>

          {/* 타이틀 */}
          <p className="text-amber-700 font-serif tracking-widest">VINTAGE WEDDING</p>

          {/* 구분선 */}
          <div className="flex items-center justify-center gap-2 my-6">
            <div className="w-12 h-px bg-amber-300" />
            <span className="text-amber-400">❦</span>
            <div className="w-12 h-px bg-amber-300" />
          </div>

          {/* 이름 */}
          <h1 className="text-3xl font-serif text-amber-800">
            홍길동 & 심청이
          </h1>

          {/* 날짜 */}
          <div className="my-8 py-4 border-y border-amber-200">
            <p className="text-xl text-amber-700 font-serif">丁巳年 仲春吉日</p>
            <p className="text-slate-600 mt-2">2025년 4월 5일 토요일 정오</p>
          </div>

          {/* 사진 */}
          <div className="my-8 aspect-[4/5] bg-gradient-to-br from-amber-100 to-orange-100 rounded border-8 border-amber-100 flex items-center justify-center">
            <span className="text-8xl">🏛️</span>
          </div>

          {/* 인사말 */}
          <div className="bg-amber-50 rounded p-6 my-6">
            <p className="text-amber-800 leading-relaxed font-serif">
              하늘이 정해주신 인연으로<br />
              두 사람이 하나 되어<br />
              백년해로하고자 하오니<br /><br />
              오셔서 축복해 주시면<br />
              큰 기쁨이 되겠습니다.
            </p>
          </div>

          {/* 혼주 */}
          <div className="text-sm text-amber-700 space-y-2">
            <p>홍판서 · 춘향모 의 아들 <strong>길동</strong></p>
            <p>심봉사 · 심씨부인 의 딸 <strong>청이</strong></p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-lg p-6 my-8 shadow border-2 border-amber-200">
          <p className="text-amber-700 font-serif">🏯 빈티지 웨딩홀</p>
          <p className="text-slate-500 text-sm mt-2">서울시 종로구 전통로 88</p>
          <div className="mt-4 aspect-video bg-amber-50 rounded flex items-center justify-center">
            <span className="text-4xl">🗺️</span>
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-700 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E08</strong> 빈티지 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

