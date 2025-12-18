export default function TemplateE20() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
      {/* 새해 장식 */}
      <div className="text-center pt-8 text-5xl">🎊✨🎊</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          2025
        </h1>
        <p className="text-indigo-300 text-xl mt-2">HAPPY NEW YEAR!</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white/10 backdrop-blur rounded-2xl border border-cyan-400/30">
          <p className="text-cyan-400">📅 신년회</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 1월 3일</p>
          <p className="text-indigo-300 mt-1">금요일 저녁 6시 30분</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 aspect-video bg-gradient-to-br from-cyan-600/50 to-purple-600/50 backdrop-blur rounded-2xl flex items-center justify-center border border-cyan-400/30">
          <span className="text-8xl">🎉</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 my-8 border border-purple-400/30">
          <p className="text-indigo-100 leading-relaxed">
            새해 복 많이 받으세요! 🧧<br /><br />
            2025년 을사년 새해를 맞아<br />
            새로운 시작을 함께해요!<br />
            푸른 뱀의 해, 건강과 행복 가득하길!
          </p>
        </div>

        {/* 새해 다짐 */}
        <div className="bg-gradient-to-r from-cyan-600/50 to-purple-600/50 backdrop-blur rounded-2xl p-6 my-8">
          <p className="text-cyan-300 font-bold mb-4">🐍 을사년 덕담</p>
          <div className="grid grid-cols-2 gap-3 text-white text-sm">
            <div className="bg-white/10 rounded-lg p-3">💰 부자되세요</div>
            <div className="bg-white/10 rounded-lg p-3">💪 건강하세요</div>
            <div className="bg-white/10 rounded-lg p-3">❤️ 사랑가득</div>
            <div className="bg-white/10 rounded-lg p-3">🌟 소원성취</div>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 my-8 border border-cyan-400/30">
          <p className="text-cyan-400 font-medium">📍 장소</p>
          <p className="text-white mt-2">뉴이어 레스토랑</p>
          <p className="text-indigo-300 text-sm mt-1">서울시 강남구 새해로 2025</p>
        </div>

        {/* 참석 확인 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg p-4 font-bold">
          🎊 참석 확인하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E20</strong> 신년회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

