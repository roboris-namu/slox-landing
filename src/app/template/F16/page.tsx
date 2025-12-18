export default function TemplateF16() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100">
      {/* 헤더 */}
      <header className="py-8 text-center">
        <span className="text-6xl">💕</span>
        <h1 className="text-3xl font-bold text-pink-600 mt-4">모찌</h1>
        <p className="text-purple-500">귀염뽀짝 치와와 🐕</p>
      </header>

      {/* 메인 프로필 */}
      <section className="py-8 px-6">
        <div className="max-w-xs mx-auto">
          <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-[40px] flex items-center justify-center text-9xl shadow-xl relative">
            🐶
            <span className="absolute top-4 right-4 text-3xl">✨</span>
            <span className="absolute bottom-4 left-4 text-3xl">💖</span>
          </div>
        </div>
      </section>

      {/* 귀여운 정보 카드 */}
      <section className="py-8 px-6">
        <div className="max-w-xs mx-auto space-y-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <span className="text-3xl">🎂</span>
            <div>
              <p className="text-pink-400 text-xs">생일</p>
              <p className="text-pink-700 font-bold">2023년 6월 15일</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <span className="text-3xl">⚖️</span>
            <div>
              <p className="text-purple-400 text-xs">몸무게</p>
              <p className="text-purple-700 font-bold">2.1kg (쪼꼬미)</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-md">
            <span className="text-3xl">💗</span>
            <div>
              <p className="text-rose-400 text-xs">성격</p>
              <p className="text-rose-700 font-bold">애교쟁이 막내</p>
            </div>
          </div>
        </div>
      </section>

      {/* 좋아하는 것 */}
      <section className="py-8 px-6">
        <div className="max-w-xs mx-auto text-center">
          <h3 className="text-lg font-bold text-pink-600 mb-4">💕 좋아하는 것들</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: "🛋️", text: "무릎" },
              { emoji: "🍖", text: "간식" },
              { emoji: "😴", text: "낮잠" },
              { emoji: "🧸", text: "인형" },
            ].map((item) => (
              <div key={item.text} className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-md">
                <span className="text-xl mr-1">{item.emoji}</span>
                <span className="text-pink-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사진 */}
      <section className="py-8 px-6">
        <div className="max-w-xs mx-auto">
          <h3 className="text-lg font-bold text-pink-600 mb-4 text-center">📸 귀여움 저장소</h3>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-md">
                🥰
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-400">
        <p>🐾 세상에서 제일 귀여운 모찌 🐾</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-3 px-4 z-50">
        <div className="max-w-xs mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F16</strong> 귀염뽀짝</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

