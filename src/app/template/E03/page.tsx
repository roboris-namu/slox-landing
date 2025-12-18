export default function TemplateE03() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-pink-50 to-rose-50">
      {/* 꽃 장식 상단 */}
      <div className="text-center pt-8 text-4xl">🌸 🌺 🌸</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="border-2 border-green-300 rounded-full inline-block px-8 py-2 mb-8">
          <p className="text-green-600 tracking-widest text-sm">WEDDING DAY</p>
        </div>

        {/* 이름 */}
        <h1 className="text-3xl text-slate-700 font-serif">
          박준형 <span className="text-pink-400">♥</span> 최수아
        </h1>

        {/* 날짜 */}
        <div className="my-8 py-6 border-y border-dashed border-green-200">
          <p className="text-2xl text-green-600">2025년 4월 20일</p>
          <p className="text-slate-500 mt-1">일요일 낮 12시</p>
        </div>

        {/* 사진 - 꽃 프레임 */}
        <div className="relative my-8">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">🌷</div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-2xl">🌷</div>
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 text-2xl">🌹</div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-2xl">🌹</div>
          <div className="aspect-[4/5] bg-gradient-to-br from-pink-100 to-green-100 rounded-3xl flex items-center justify-center mx-4">
            <span className="text-8xl">💐</span>
          </div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8 border border-green-100">
          <p className="text-slate-600 leading-relaxed">
            꽃처럼 아름다운 사랑으로<br />
            새로운 가정을 이루려 합니다.<br /><br />
            봄꽃이 피어나는 날,<br />
            저희의 결혼을 축복해 주세요. 🌸
          </p>
        </div>

        {/* 장소 */}
        <div className="bg-gradient-to-r from-green-100 to-pink-100 rounded-2xl p-6 my-8">
          <p className="text-green-600 font-medium">🌿 플라워 웨딩홀</p>
          <p className="text-slate-500 text-sm mt-2">서울시 서초구 플라워로 789</p>
          <div className="mt-4 aspect-video bg-white rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <a href="tel:010-1234-5678" className="bg-green-100 rounded-xl p-4 hover:bg-green-200 transition-colors">
            <p className="text-green-600">🌱 신랑에게</p>
          </a>
          <a href="tel:010-8765-4321" className="bg-pink-100 rounded-xl p-4 hover:bg-pink-200 transition-colors">
            <p className="text-pink-600">🌸 신부에게</p>
          </a>
        </div>
      </div>

      {/* 꽃 장식 하단 */}
      <div className="text-center pb-24 text-4xl">🌺 🌸 🌺</div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E03</strong> 플라워 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-green-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

