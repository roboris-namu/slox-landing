export default function TemplateF24() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
      {/* 별 배경 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-white/30 text-xs"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* 헤더 */}
      <header className="py-12 text-center relative z-10">
        <span className="text-6xl">⭐</span>
        <h1 className="text-3xl font-bold text-white mt-4">예린이의 꿈</h1>
        <p className="text-purple-300 mt-2">Dream Big, Little Star!</p>
      </header>

      {/* 꿈 프로필 */}
      <section className="py-8 px-6 relative z-10">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur rounded-3xl p-8 text-center text-white">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl shadow-2xl">
            👧
          </div>
          <h2 className="text-2xl font-bold">박예린</h2>
          <p className="text-purple-300 mt-1">6살 꿈나무</p>
          <p className="text-yellow-400 mt-4 text-lg">🌟 장래희망: 우주비행사 🚀</p>
        </div>
      </section>

      {/* 꿈 목록 */}
      <section className="py-8 px-6 relative z-10">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-white mb-4 text-center">💫 예린이의 꿈들</h3>
          <div className="space-y-3">
            {[
              { dream: "우주에 가기", icon: "🚀" },
              { dream: "외계인 친구 만들기", icon: "👽" },
              { dream: "별에 이름 붙이기", icon: "⭐" },
              { dream: "온 가족 달 여행", icon: "🌙" },
            ].map((d) => (
              <div key={d.dream} className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3 text-white">
                <span className="text-2xl">{d.icon}</span>
                <span>{d.dream}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 현재의 나 */}
      <section className="py-8 px-6 relative z-10">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">🌈 지금의 예린이</h3>
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <span className="text-3xl">🎨</span>
              <p className="text-sm mt-1">그림 그리기</p>
            </div>
            <div>
              <span className="text-3xl">📚</span>
              <p className="text-sm mt-1">책 읽기</p>
            </div>
            <div>
              <span className="text-3xl">🎵</span>
              <p className="text-sm mt-1">노래 부르기</p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-purple-400 relative z-10">
        <p>⭐ 예린아, 네 꿈을 응원해! ⭐</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F24</strong> 드림 키즈</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

