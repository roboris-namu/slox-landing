export default function TemplateF25() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100">
      {/* 헤더 */}
      <header className="py-12 text-center">
        <span className="text-6xl">🍼</span>
        <h1 className="text-3xl font-bold text-pink-400 mt-4">소율이</h1>
        <p className="text-purple-300">우리 집 천사</p>
      </header>

      {/* 메인 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <div className="aspect-square bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 rounded-[50px] flex items-center justify-center text-9xl shadow-xl">
            👶
          </div>
        </div>
      </section>

      {/* 정보 카드 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto space-y-4">
          {[
            { label: "생일", value: "2024년 1월 5일", color: "bg-pink-100 text-pink-600" },
            { label: "나이", value: "11개월", color: "bg-purple-100 text-purple-600" },
            { label: "별명", value: "솜사탕", color: "bg-blue-100 text-blue-600" },
          ].map((item) => (
            <div key={item.label} className={`${item.color} rounded-2xl p-4 flex justify-between items-center`}>
              <span className="font-medium">{item.label}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 좋아하는 것 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-pink-400 mb-4 text-center">💕 소율이가 좋아하는 것</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["🍼 분유", "🧸 곰인형", "🎵 동요", "👶 거울보기"].map((item) => (
              <span key={item} className="bg-white px-4 py-2 rounded-full text-purple-400 shadow-md">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-pink-400 mb-4 text-center">📸 소율이 앨범</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                👶
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-300">
        <p>🍼 소율아 사랑해 🍼</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F25</strong> 파스텔 베이비</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

