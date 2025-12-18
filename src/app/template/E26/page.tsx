export default function TemplateE26() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-900 via-slate-900 to-purple-900">
      {/* 할로윈 장식 */}
      <div className="text-center pt-8 text-5xl">🎃👻🎃</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <h1 className="text-5xl font-bold text-orange-500" style={{ fontFamily: 'cursive' }}>
          HALLOWEEN
        </h1>
        <p className="text-purple-400 text-xl mt-2">PARTY 2025 👻</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-slate-800/80 backdrop-blur rounded-2xl border-2 border-orange-500">
          <p className="text-orange-400">🎃 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 10월 31일</p>
          <p className="text-purple-300 mt-1">금요일 저녁 7시</p>
        </div>

        {/* 할로윈 캐릭터 */}
        <div className="my-8 grid grid-cols-4 gap-3">
          <div className="aspect-square bg-orange-600/50 rounded-xl flex items-center justify-center text-3xl">🎃</div>
          <div className="aspect-square bg-purple-600/50 rounded-xl flex items-center justify-center text-3xl">👻</div>
          <div className="aspect-square bg-slate-600/50 rounded-xl flex items-center justify-center text-3xl">🧛</div>
          <div className="aspect-square bg-green-600/50 rounded-xl flex items-center justify-center text-3xl">🧟</div>
        </div>

        {/* 인사말 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 my-8 border border-purple-500">
          <p className="text-purple-100 leading-relaxed">
            으스스한 할로윈 밤,<br />
            무서운(?) 파티에 초대합니다! 🦇<br /><br />
            Trick or Treat!<br />
            코스튬은 필수예요!
          </p>
        </div>

        {/* 코스튬 안내 */}
        <div className="bg-orange-600/50 backdrop-blur rounded-2xl p-6 my-8 border border-orange-400">
          <p className="text-orange-300 font-bold mb-4">🎭 코스튬 필수!</p>
          <div className="grid grid-cols-2 gap-3 text-white text-sm">
            <div className="bg-white/10 rounded-lg p-3">🧛 뱀파이어</div>
            <div className="bg-white/10 rounded-lg p-3">🧟 좀비</div>
            <div className="bg-white/10 rounded-lg p-3">🧙 마녀</div>
            <div className="bg-white/10 rounded-lg p-3">👻 귀신</div>
          </div>
        </div>

        {/* 이벤트 */}
        <div className="bg-purple-600/50 backdrop-blur rounded-2xl p-6 my-8">
          <p className="text-purple-300 font-bold mb-4">🎉 이벤트</p>
          <div className="space-y-2 text-white text-sm">
            <p>19:00 코스튬 콘테스트 🏆</p>
            <p>20:00 공포 영화 상영 🎬</p>
            <p>21:00 사탕 폭탄 🍬</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 my-8 border border-orange-500">
          <p className="text-orange-400 font-medium">📍 유령의 집</p>
          <p className="text-white mt-2">할로윈 파티룸</p>
          <p className="text-purple-300 text-sm mt-1">서울시 이태원 할로윈로 31</p>
        </div>

        {/* 참석 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-lg p-4 font-bold">
          👻 참석할게요!
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E26</strong> 할로윈</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

