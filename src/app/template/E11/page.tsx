export default function TemplateE11() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-yellow-100">
      {/* 풍선 장식 */}
      <div className="text-center pt-8 text-5xl">🎈🎉🎈</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold text-purple-600">
          HAPPY BIRTHDAY!
        </h1>
        <p className="text-slate-500 mt-2">생일 파티에 초대합니다 🎂</p>

        {/* 이름 & 나이 */}
        <div className="my-8 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-6xl">🎂</p>
          <h2 className="text-3xl text-purple-600 font-bold mt-4">민지</h2>
          <p className="text-pink-500 text-xl mt-2">7번째 생일</p>
        </div>

        {/* 날짜 & 시간 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 my-8">
          <p className="text-2xl font-bold">2025년 4월 12일</p>
          <p className="text-purple-100 mt-1">토요일 오후 3시</p>
        </div>

        {/* 사진 */}
        <div className="my-8 aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl flex items-center justify-center">
          <span className="text-8xl">🥳</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            우리 민지의 7번째 생일!<br />
            함께 축하해 주세요 🎉<br /><br />
            맛있는 케이크와<br />
            재미있는 게임이 준비되어 있어요!
          </p>
        </div>

        {/* 파티 정보 */}
        <div className="grid grid-cols-3 gap-3 my-8">
          <div className="bg-purple-100 rounded-xl p-4">
            <span className="text-2xl">🎂</span>
            <p className="text-xs text-purple-600 mt-2">케이크 커팅</p>
          </div>
          <div className="bg-pink-100 rounded-xl p-4">
            <span className="text-2xl">🎮</span>
            <p className="text-xs text-pink-600 mt-2">게임 타임</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4">
            <span className="text-2xl">🎁</span>
            <p className="text-xs text-yellow-600 mt-2">선물 증정</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-purple-500 font-bold">📍 파티 장소</p>
          <p className="text-slate-600 mt-2">키즈카페 해피랜드</p>
          <p className="text-slate-500 text-sm mt-1">서울시 강남구 파티로 456</p>
          <div className="mt-4 aspect-video bg-purple-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-purple-500 text-white rounded-xl p-4 font-bold">
          📞 참석 연락하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E11</strong> 생일파티</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

