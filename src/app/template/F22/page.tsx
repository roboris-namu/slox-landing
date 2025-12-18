export default function TemplateF22() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-white">
      {/* 헤더 */}
      <header className="py-12 text-center">
        <span className="text-6xl">🎂</span>
        <h1 className="text-3xl font-bold text-rose-800 mt-4">지우의 첫 생일</h1>
        <p className="text-rose-500 mt-2">Happy 1st Birthday!</p>
        <p className="text-rose-400 text-sm">2024년 3월 15일</p>
      </header>

      {/* 메인 사진 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="aspect-square bg-rose-200 rounded-[50px] flex items-center justify-center text-9xl shadow-2xl">
            👶
          </div>
        </div>
      </section>

      {/* 축하 메시지 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-xl font-bold text-rose-800 mb-4">💝 우리 지우에게</h3>
          <p className="text-rose-600 leading-relaxed">
            사랑하는 지우야,<br />
            벌써 첫 돌이라니!<br />
            건강하고 행복하게 자라렴.<br />
            엄마 아빠가 항상 사랑해 💕
          </p>
        </div>
      </section>

      {/* 성장 기록 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-rose-800 mb-4 text-center">📊 1년간의 성장</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-rose-600">75cm</p>
              <p className="text-rose-400 text-xs">키</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-rose-600">10kg</p>
              <p className="text-rose-400 text-xs">몸무게</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-rose-600">6개</p>
              <p className="text-rose-400 text-xs">이빨</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1년간의 순간 */}
      <section className="py-8 px-6 bg-white/50">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-rose-800 mb-4 text-center">📸 특별한 순간들</h3>
          <div className="grid grid-cols-3 gap-2">
            {["👶", "😊", "🍼", "🧸", "👣", "🎀"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-rose-100 rounded-xl flex items-center justify-center text-3xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-400">
        <p>🎂 Happy Birthday 지우야! 🎂</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F22</strong> 첫돌 앨범</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

