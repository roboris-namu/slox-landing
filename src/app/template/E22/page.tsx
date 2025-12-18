export default function TemplateE22() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-orange-50 to-amber-100">
      {/* 홈파티 장식 */}
      <div className="text-center pt-8 text-5xl">🏠🎉🏠</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-rose-400 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">HOME PARTY!</p>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-rose-700">
          우리집 홈파티
        </h1>
        <p className="text-orange-500 mt-2">맛있는 음식과 함께해요! 🍝</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-rose-500">📅 일시</p>
          <p className="text-2xl text-slate-700 font-bold mt-2">2025년 4월 5일</p>
          <p className="text-slate-500 mt-1">토요일 저녁 6시</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 grid grid-cols-3 gap-3">
          <div className="aspect-square bg-rose-100 rounded-2xl flex items-center justify-center text-4xl">🍕</div>
          <div className="aspect-square bg-orange-100 rounded-2xl flex items-center justify-center text-4xl">🍷</div>
          <div className="aspect-square bg-amber-100 rounded-2xl flex items-center justify-center text-4xl">🎵</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8 border-2 border-dashed border-rose-300">
          <p className="text-slate-600 leading-relaxed">
            새로 이사한 우리집에서<br />
            홈파티를 열어요! 🎈<br /><br />
            맛있는 음식 준비해놓을게요~<br />
            빈손으로 편하게 오세요!
          </p>
        </div>

        {/* 메뉴 */}
        <div className="bg-rose-100 rounded-2xl p-6 my-8">
          <p className="text-rose-600 font-bold mb-4">🍳 준비된 메뉴</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3">🍝 파스타</div>
            <div className="bg-white rounded-lg p-3">🥗 샐러드</div>
            <div className="bg-white rounded-lg p-3">🍕 피자</div>
            <div className="bg-white rounded-lg p-3">🍰 디저트</div>
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-orange-100 rounded-2xl p-4 my-8">
          <p className="text-orange-600 font-bold">👟 편한 복장 OK!</p>
          <p className="text-slate-600 text-sm mt-2">실내화 준비되어 있어요</p>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-rose-500 font-medium">📍 주소</p>
          <p className="text-slate-700 mt-2">서울시 마포구 홈파티로 88</p>
          <p className="text-slate-500 text-sm mt-1">○○아파트 101동 1001호</p>
          <div className="mt-4 aspect-video bg-rose-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-rose-500 text-white rounded-full p-4 font-bold">
          🏠 참석 연락하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E22</strong> 홈파티</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

