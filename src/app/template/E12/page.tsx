export default function TemplateE12() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-blue-100 to-purple-100">
      {/* 서커스 장식 */}
      <div className="text-center pt-8 text-5xl">🎪✨🎪</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full inline-block px-8 py-3 mb-8">
          <p className="font-bold text-lg">KIDS PARTY!</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-bold text-blue-600">
          지훈이의 생일파티
        </h1>
        <p className="text-slate-500 mt-2">마법 같은 5번째 생일! 🎩✨</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg transform rotate-1">
          <p className="text-2xl text-orange-500 font-bold">2025년 5월 5일</p>
          <p className="text-slate-500 mt-1">어린이날 낮 12시</p>
        </div>

        {/* 캐릭터 영역 */}
        <div className="my-8 grid grid-cols-3 gap-4">
          <div className="aspect-square bg-red-100 rounded-2xl flex items-center justify-center text-4xl">🤡</div>
          <div className="aspect-square bg-yellow-100 rounded-2xl flex items-center justify-center text-5xl">🎪</div>
          <div className="aspect-square bg-blue-100 rounded-2xl flex items-center justify-center text-4xl">🎈</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 my-8 border-4 border-dashed border-orange-300">
          <p className="text-slate-600 leading-relaxed">
            롤러코스터처럼 신나는<br />
            지훈이 생일파티에 오세요! 🎢<br /><br />
            마술쇼, 풍선아트, 페이스페인팅<br />
            재미있는 이벤트가 가득해요!
          </p>
        </div>

        {/* 이벤트 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-4">
            <span className="text-3xl">🎩</span>
            <p className="mt-2 font-bold">마술쇼</p>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl p-4">
            <span className="text-3xl">🎈</span>
            <p className="mt-2 font-bold">풍선아트</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-4">
            <span className="text-3xl">🎨</span>
            <p className="mt-2 font-bold">페이스페인팅</p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-4">
            <span className="text-3xl">🎁</span>
            <p className="mt-2 font-bold">선물증정</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-3xl p-6 my-8 shadow-lg">
          <p className="text-blue-500 font-bold">📍 파티 장소</p>
          <p className="text-slate-600 mt-2">원더랜드 키즈파티룸</p>
          <p className="text-slate-500 text-sm mt-1">서울시 송파구 놀이로 789</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 font-bold text-lg">
          🎉 참석 연락하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E12</strong> 키즈 파티</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

