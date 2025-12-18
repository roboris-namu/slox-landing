export default function TemplateF08() {
  return (
    <div className="min-h-screen bg-sky-50">
      {/* 책 표지 스타일 헤더 */}
      <header className="py-12 px-6">
        <div className="max-w-md mx-auto bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <span className="text-6xl">📖</span>
          <h1 className="text-3xl font-bold mt-4">장씨네 스토리북</h1>
          <p className="mt-2 text-sky-100">우리 가족의 동화같은 이야기</p>
          <div className="mt-4 text-sm text-sky-200">
            ⭐ 2015년부터 시작된 이야기 ⭐
          </div>
        </div>
      </header>

      {/* Chapter 1 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-sky-800 mb-4">Chapter 1. 우리 가족</h2>
            <div className="flex justify-center gap-8 my-8">
              {[
                { emoji: "🤴", name: "아빠" },
                { emoji: "👸", name: "엄마" },
                { emoji: "🧒", name: "유준" },
              ].map((char) => (
                <div key={char.name} className="text-center">
                  <span className="text-5xl block">{char.emoji}</span>
                  <p className="mt-2 text-sky-700">{char.name}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed text-center">
              옛날 옛적, 아름다운 서울에<br />
              행복한 장씨 가족이 살았어요...
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-sky-800 mb-4">Chapter 2. 즐거운 일상</h2>
            <div className="grid grid-cols-3 gap-4 my-8">
              {["🌅", "🍳", "🚗", "🌳", "🍕", "🌙"].map((emoji, i) => (
                <div key={i} className="aspect-square bg-sky-100 rounded-xl flex items-center justify-center text-4xl">
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed text-center">
              매일 아침 해가 뜨면<br />
              우리 가족의 하루가 시작돼요
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-sky-800 mb-4">Chapter 3. 특별한 추억</h2>
            <div className="flex justify-center gap-6 my-8 text-5xl">
              <span>🎂</span>
              <span>🎄</span>
              <span>🏖️</span>
              <span>🎢</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-center">
              생일, 크리스마스, 여행...<br />
              함께한 모든 순간이 소중해요
            </p>
          </div>
        </div>
      </section>

      {/* The End */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-3xl font-bold text-sky-700">
            ... 그리고 행복하게 살았답니다 🌟
          </p>
          <p className="mt-4 text-sky-500">- THE END -</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-sky-400">
        <p>📖 장씨네 스토리북 - 계속될 이야기</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F08</strong> 스토리북</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-sky-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

