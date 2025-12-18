export default function TemplateF18() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* 헤더 */}
      <header className="py-8 text-center">
        <div className="text-6xl animate-bounce">🎾</div>
        <h1 className="text-3xl font-black text-orange-600 mt-4">뭉치!</h1>
        <p className="text-yellow-600">에너지 넘치는 보더콜리 🐕</p>
      </header>

      {/* 메인 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <div className="aspect-square bg-gradient-to-br from-yellow-300 to-orange-400 rounded-[50px] flex items-center justify-center text-9xl shadow-2xl relative overflow-hidden">
            🐕
            <div className="absolute top-4 left-4 text-3xl">⚡</div>
            <div className="absolute top-4 right-4 text-3xl">🌟</div>
            <div className="absolute bottom-4 left-4 text-3xl">🎾</div>
            <div className="absolute bottom-4 right-4 text-3xl">🦴</div>
          </div>
        </div>
      </section>

      {/* 활동량 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-orange-600 mb-4 text-center">⚡ 오늘의 활동</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-orange-100 rounded-xl">
              <p className="text-2xl font-black text-orange-600">5km</p>
              <p className="text-orange-400 text-xs">산책</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-xl">
              <p className="text-2xl font-black text-yellow-600">30분</p>
              <p className="text-yellow-400 text-xs">공놀이</p>
            </div>
            <div className="p-4 bg-lime-100 rounded-xl">
              <p className="text-2xl font-black text-lime-600">15회</p>
              <p className="text-lime-400 text-xs">점프</p>
            </div>
          </div>
        </div>
      </section>

      {/* 좋아하는 것 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-orange-600 mb-4 text-center">🎯 뭉치가 좋아하는 것</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: "🎾", text: "테니스공" },
              { emoji: "🏃", text: "달리기" },
              { emoji: "💦", text: "물놀이" },
              { emoji: "🦮", text: "애견카페" },
              { emoji: "🥏", text: "프리스비" },
            ].map((item) => (
              <div key={item.text} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold shadow-md">
                {item.emoji} {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사진 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-orange-600 mb-4 text-center">📸 신나는 뭉치</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🏃", "🏊", "⚽", "🎾", "🦮", "🤸"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가족 */}
      <section className="py-8 px-6 bg-orange-100">
        <div className="max-w-sm mx-auto text-center">
          <p className="text-orange-600">
            🏠 뭉치네 가족<br />
            <span className="font-bold">집사 김뭉치 | 서울 송파구</span>
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-orange-400">
        <p>🎾 매일이 신나는 뭉치 🎾</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F18</strong> 플레이풀</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

