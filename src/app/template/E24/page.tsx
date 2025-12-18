export default function TemplateE24() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-purple-100">
      {/* 브라이덜 장식 */}
      <div className="text-center pt-8 text-5xl">👰💍✨</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">BRIDAL SHOWER</p>
        </div>

        {/* 제목 */}
        <h1 className="text-4xl font-bold text-rose-600" style={{ fontFamily: 'cursive' }}>
          수진의 브라이덜샤워
        </h1>
        <p className="text-pink-500 mt-2">결혼 전 마지막 싱글파티! 💖</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg border-2 border-pink-200">
          <p className="text-rose-500">📅 일시</p>
          <p className="text-2xl text-slate-700 font-bold mt-2">2025년 3월 8일</p>
          <p className="text-slate-500 mt-1">토요일 오후 2시</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 aspect-square max-w-xs mx-auto bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
          <span className="text-8xl">👰</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8 border-2 border-pink-200">
          <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'cursive' }}>
            곧 결혼하는 수진이를 위한<br />
            특별한 파티에 초대합니다! 💕<br /><br />
            사랑하는 친구들과 함께<br />
            잊지 못할 추억을 만들어요!
          </p>
        </div>

        {/* 파티 프로그램 */}
        <div className="bg-pink-100 rounded-2xl p-6 my-8">
          <p className="text-rose-600 font-bold mb-4">💝 파티 프로그램</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>14:00 모임 & 다과</p>
            <p>14:30 신부에게 편지 💌</p>
            <p>15:00 게임 타임 🎮</p>
            <p>16:00 케이크 & 선물 🎁</p>
          </div>
        </div>

        {/* 드레스코드 */}
        <div className="bg-rose-100 rounded-2xl p-4 my-8">
          <p className="text-rose-600 font-bold">👗 드레스코드</p>
          <p className="text-slate-600 text-sm mt-2">핑크 또는 화이트 추천!</p>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-rose-500 font-medium">📍 장소</p>
          <p className="text-slate-700 mt-2">로즈 파티룸</p>
          <p className="text-slate-500 text-sm mt-1">서울시 강남구 브라이덜로 3</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-4 font-bold">
          💕 참석할게요!
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E24</strong> 브라이덜샤워</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

