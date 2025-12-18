export default function TemplateE06() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-emerald-50 to-lime-100">
      {/* 자연 장식 */}
      <div className="text-center pt-8 text-3xl">🌿 🍃 🌿</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <p className="text-emerald-600 tracking-widest text-sm">GARDEN WEDDING</p>

        {/* 이름 */}
        <h1 className="text-3xl text-slate-700 mt-8 font-serif">
          이정우 <span className="text-emerald-500">&</span> 김소영
        </h1>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white/60 backdrop-blur rounded-2xl">
          <p className="text-2xl text-emerald-600">2025년 5월 24일</p>
          <p className="text-slate-500 mt-1">토요일 오후 3시</p>
          <p className="text-emerald-500 text-sm mt-2">🌳 야외 가든에서</p>
        </div>

        {/* 사진 */}
        <div className="my-8 aspect-[3/4] bg-gradient-to-br from-emerald-200 to-green-300 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl">
          <span className="text-8xl">🌳</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            푸른 자연 아래,<br />
            사랑을 맹세하려 합니다. 🌿<br /><br />
            아름다운 정원에서<br />
            함께 축복해 주세요.
          </p>
        </div>

        {/* 장소 */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 my-8">
          <p className="text-emerald-200 text-sm">VENUE</p>
          <p className="text-xl mt-2 font-medium">더 가든 웨딩홀</p>
          <p className="text-emerald-100 text-sm mt-1">경기도 용인시 가든로 777</p>
        </div>

        {/* 날씨 안내 */}
        <div className="bg-white rounded-xl p-4 my-8 text-sm">
          <p className="text-emerald-600">🌤️ 야외 결혼식 안내</p>
          <p className="text-slate-500 mt-2">기상 상황에 따라 실내로 변경될 수 있습니다.</p>
        </div>

        {/* 지도 */}
        <div className="aspect-video bg-white rounded-2xl flex items-center justify-center shadow">
          <span className="text-4xl">🗺️</span>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <a href="tel:010-1234-5678" className="bg-emerald-100 text-emerald-700 rounded-xl p-4">
            🌱 신랑에게
          </a>
          <a href="tel:010-8765-4321" className="bg-lime-100 text-lime-700 rounded-xl p-4">
            🌸 신부에게
          </a>
        </div>
      </div>

      {/* 자연 장식 */}
      <div className="text-center pb-24 text-3xl">🍃 🌿 🍃</div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E06</strong> 가든 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

