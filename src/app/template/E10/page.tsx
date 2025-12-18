export default function TemplateE10() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-amber-50">
      {/* 장식 */}
      <div className="text-center pt-8 text-4xl">🎀 👶 🎀</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-pink-200 rounded-full inline-block px-8 py-3 mb-8">
          <p className="text-pink-700 font-bold">첫 돌잔치에 초대합니다</p>
        </div>

        {/* 아기 이름 */}
        <h1 className="text-4xl text-pink-600 font-bold">
          김하늘
        </h1>
        <p className="text-slate-500 mt-2">우리 하늘이가 벌써 첫 돌을 맞았어요!</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-2xl text-pink-500">2025년 3월 22일</p>
          <p className="text-slate-500 mt-1">토요일 낮 12시</p>
        </div>

        {/* 아기 사진 */}
        <div className="my-8 aspect-square bg-gradient-to-br from-pink-200 to-amber-200 rounded-full flex items-center justify-center mx-auto max-w-xs border-8 border-white shadow-xl">
          <span className="text-8xl">👶</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            첫 울음을 터뜨리던 날이<br />
            엊그제 같은데 벌써 돌이에요! 🎂<br /><br />
            하늘이의 첫 생일을<br />
            함께 축하해 주세요!
          </p>
        </div>

        {/* 부모님 */}
        <div className="bg-pink-100 rounded-2xl p-6 my-8">
          <p className="text-pink-600">👨‍👩‍👧 하늘이네 가족</p>
          <p className="text-slate-600 mt-2">아빠 김민수 · 엄마 이지영</p>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-pink-500 font-medium">🏠 예쁜 돌잔치홀</p>
          <p className="text-slate-500 text-sm mt-2">서울시 송파구 돌잔치로 123</p>
          <div className="mt-4 aspect-video bg-pink-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <a href="tel:010-1234-5678" className="bg-blue-100 text-blue-600 rounded-xl p-4">
            📞 아빠에게
          </a>
          <a href="tel:010-8765-4321" className="bg-pink-100 text-pink-600 rounded-xl p-4">
            📞 엄마에게
          </a>
        </div>
      </div>

      {/* 장식 */}
      <div className="text-center pb-24 text-4xl">🎈 🎂 🎈</div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E10</strong> 첫 돌잔치</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

