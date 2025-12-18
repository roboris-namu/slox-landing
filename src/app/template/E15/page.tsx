export default function TemplateE15() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-100 to-purple-100">
      {/* 공주 장식 */}
      <div className="text-center pt-8 text-5xl">👑✨👑</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">PRINCESS PARTY</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-bold text-pink-600" style={{ fontFamily: 'cursive' }}>
          소피아 공주님의
        </h1>
        <p className="text-purple-500 text-xl mt-2">6번째 생일파티</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg border-4 border-pink-200">
          <p className="text-2xl text-pink-500 font-bold">2025년 6월 1일</p>
          <p className="text-slate-500 mt-1">일요일 오후 2시</p>
        </div>

        {/* 공주 이미지 */}
        <div className="my-8 aspect-square max-w-xs mx-auto bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
          <span className="text-8xl">👸</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 my-8 border-2 border-pink-200">
          <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'cursive' }}>
            아름다운 공주님들을<br />
            마법의 성으로 초대합니다! 🏰<br /><br />
            드레스를 입고 오시면<br />
            더욱 즐거운 파티가 될 거예요!
          </p>
        </div>

        {/* 드레스코드 */}
        <div className="bg-purple-100 rounded-2xl p-4 my-8">
          <p className="text-purple-600 font-bold">👗 드레스코드</p>
          <p className="text-slate-600 mt-2">공주님/왕자님 복장 환영!</p>
        </div>

        {/* 파티 이벤트 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-pink-100 rounded-2xl p-4">
            <span className="text-3xl">🏰</span>
            <p className="text-pink-600 text-sm mt-2">공주 캐슬</p>
          </div>
          <div className="bg-purple-100 rounded-2xl p-4">
            <span className="text-3xl">💎</span>
            <p className="text-purple-600 text-sm mt-2">보석 꾸미기</p>
          </div>
          <div className="bg-rose-100 rounded-2xl p-4">
            <span className="text-3xl">👑</span>
            <p className="text-rose-600 text-sm mt-2">왕관 만들기</p>
          </div>
          <div className="bg-pink-100 rounded-2xl p-4">
            <span className="text-3xl">🎂</span>
            <p className="text-pink-600 text-sm mt-2">케이크 타임</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-pink-500 font-medium">🏰 마법의 성</p>
          <p className="text-slate-600 mt-2">프린세스 파티룸</p>
          <p className="text-slate-500 text-sm mt-1">서울시 송파구 공주로 6</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-4 font-bold">
          👸 참석 연락하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E15</strong> 프린세스</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

