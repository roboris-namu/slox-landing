export default function TemplateE16() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-red-900">
      {/* 히어로 장식 */}
      <div className="text-center pt-8 text-5xl">⚡🦸⚡</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-red-600 text-white rounded-lg inline-block px-8 py-3 mb-6 transform -rotate-2">
          <p className="font-bold text-xl">HERO PARTY!</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-bold text-yellow-400">
          지민 히어로의
        </h1>
        <p className="text-blue-300 text-xl mt-2">8번째 생일 미션!</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-slate-900/80 rounded-2xl border-2 border-yellow-400">
          <p className="text-sm text-yellow-400">🎯 미션 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 5월 10일</p>
          <p className="text-blue-300 mt-1">토요일 오후 3시</p>
        </div>

        {/* 히어로 이미지 */}
        <div className="my-8 aspect-square max-w-xs mx-auto bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center transform rotate-3">
          <span className="text-8xl">🦸‍♂️</span>
        </div>

        {/* 인사말 */}
        <div className="bg-slate-900/80 rounded-2xl p-8 my-8 border border-blue-500">
          <p className="text-blue-100 leading-relaxed">
            지구를 지키는 히어로들을<br />
            비밀 기지로 초대합니다! 🌍<br /><br />
            히어로 코스튬을 입고<br />
            함께 미션을 수행해요!
          </p>
        </div>

        {/* 미션 */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-2xl p-6 my-8">
          <p className="font-bold mb-4">🎮 히어로 미션</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/20 rounded-lg p-3">💪 파워 트레이닝</div>
            <div className="bg-white/20 rounded-lg p-3">🎯 타겟 슈팅</div>
            <div className="bg-white/20 rounded-lg p-3">🧩 퍼즐 해결</div>
            <div className="bg-white/20 rounded-lg p-3">🎖️ 메달 수여</div>
          </div>
        </div>

        {/* 코스튬 안내 */}
        <div className="bg-yellow-400 text-slate-900 rounded-2xl p-4 my-8">
          <p className="font-bold">🦸 코스튬 안내</p>
          <p className="text-sm mt-2">좋아하는 히어로 복장으로 오세요!</p>
        </div>

        {/* 장소 */}
        <div className="bg-slate-900/80 rounded-2xl p-6 my-8 border border-blue-500">
          <p className="text-yellow-400 font-medium">🏢 비밀 기지</p>
          <p className="text-white mt-2">히어로 키즈파크</p>
          <p className="text-blue-300 text-sm mt-1">서울시 강남구 히어로로 88</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-yellow-400 text-slate-900 rounded-lg p-4 font-bold">
          ⚡ 미션 참가 신청
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E16</strong> 히어로</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-yellow-400 text-slate-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

