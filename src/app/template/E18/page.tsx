export default function TemplateE18() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-blue-900">
      {/* 우주 장식 */}
      <div className="text-center pt-8 text-4xl">🚀 🌙 ⭐</div>

      {/* 별 배경 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center relative z-10">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">SPACE PARTY!</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-bold text-white">
          현준 우주비행사의
        </h1>
        <p className="text-purple-300 text-xl mt-2">7번째 우주 탐험 🛸</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-slate-800/80 backdrop-blur rounded-2xl border border-purple-500">
          <p className="text-sm text-purple-400">🛸 발사 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 7월 20일</p>
          <p className="text-blue-300 mt-1">일요일 오후 3시</p>
        </div>

        {/* 우주 이미지 */}
        <div className="my-8 aspect-square max-w-xs mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white/30">
          <span className="text-8xl">🧑‍🚀</span>
        </div>

        {/* 인사말 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 my-8 border border-blue-500">
          <p className="text-blue-100 leading-relaxed">
            우주선에 탑승해서<br />
            은하수 파티로 떠나요! 🌌<br /><br />
            우주복을 입고 오면<br />
            특별 미션이 주어져요!
          </p>
        </div>

        {/* 우주 미션 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-purple-600/50 backdrop-blur rounded-2xl p-4 border border-purple-400">
            <span className="text-3xl">🚀</span>
            <p className="text-purple-200 text-sm mt-2">로켓 만들기</p>
          </div>
          <div className="bg-blue-600/50 backdrop-blur rounded-2xl p-4 border border-blue-400">
            <span className="text-3xl">🌙</span>
            <p className="text-blue-200 text-sm mt-2">달 탐험</p>
          </div>
          <div className="bg-cyan-600/50 backdrop-blur rounded-2xl p-4 border border-cyan-400">
            <span className="text-3xl">⭐</span>
            <p className="text-cyan-200 text-sm mt-2">별자리 찾기</p>
          </div>
          <div className="bg-indigo-600/50 backdrop-blur rounded-2xl p-4 border border-indigo-400">
            <span className="text-3xl">🎖️</span>
            <p className="text-indigo-200 text-sm mt-2">우주비행사 임명</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 my-8 border border-purple-500">
          <p className="text-purple-400 font-medium">🛸 우주정거장</p>
          <p className="text-white mt-2">스페이스 키즈파크</p>
          <p className="text-blue-300 text-sm mt-1">서울시 강남구 우주로 777</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 font-bold">
          🚀 우주선 탑승 신청
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E18</strong> 우주 테마</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

