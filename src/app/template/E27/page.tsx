export default function TemplateE27() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-green-900 to-red-900">
      {/* 크리스마스 장식 */}
      <div className="text-center pt-8 text-5xl">🎄🎅🎄</div>

      {/* 눈 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
          >
            ❄️
          </span>
        ))}
      </div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center relative z-10">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'cursive' }}>
          Merry Christmas!
        </h1>
        <p className="text-green-300 text-xl mt-2">🎅 크리스마스 파티 🎅</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white/10 backdrop-blur rounded-2xl border-2 border-red-400">
          <p className="text-red-300">🎄 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2025년 12월 24일</p>
          <p className="text-green-300 mt-1">수요일 저녁 6시</p>
        </div>

        {/* 크리스마스 이미지 */}
        <div className="my-8 grid grid-cols-3 gap-3">
          <div className="aspect-square bg-red-600/50 rounded-xl flex items-center justify-center text-4xl">🎅</div>
          <div className="aspect-square bg-green-600/50 rounded-xl flex items-center justify-center text-4xl">🎄</div>
          <div className="aspect-square bg-amber-600/50 rounded-xl flex items-center justify-center text-4xl">⭐</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 my-8 border border-green-400">
          <p className="text-green-100 leading-relaxed">
            따뜻한 크리스마스 이브,<br />
            함께 즐거운 시간 보내요! 🎁<br /><br />
            선물 교환도 있으니<br />
            2만원 선에서 준비해주세요!
          </p>
        </div>

        {/* 프로그램 */}
        <div className="bg-red-600/50 backdrop-blur rounded-2xl p-6 my-8">
          <p className="text-red-200 font-bold mb-4">🎉 프로그램</p>
          <div className="space-y-2 text-white text-sm">
            <p>18:00 캐럴 & 다과 🎵</p>
            <p>19:00 크리스마스 만찬 🍗</p>
            <p>20:00 선물 교환 🎁</p>
            <p>21:00 게임 타임 🎮</p>
          </div>
        </div>

        {/* 드레스코드 */}
        <div className="bg-green-600/50 backdrop-blur rounded-2xl p-4 my-8">
          <p className="text-green-200 font-bold">👕 드레스코드</p>
          <p className="text-white text-sm mt-2">레드 & 그린 착용 환영!</p>
        </div>

        {/* 장소 */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 my-8 border border-red-400">
          <p className="text-red-300 font-medium">📍 장소</p>
          <p className="text-white mt-2">크리스마스 카페</p>
          <p className="text-green-300 text-sm mt-1">서울시 용산구 크리스마스로 25</p>
        </div>

        {/* 참석 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-red-600 to-green-600 text-white rounded-lg p-4 font-bold">
          🎄 참석할게요!
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-600 to-green-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E27</strong> 크리스마스</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-red-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

