export default function TemplateF13() {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="py-6 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-stone-800">📸 Pet Photobook</h1>
          <span className="text-stone-500 text-sm">@mango_dog</span>
        </div>
      </header>

      {/* 커버 사진 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-stone-300 rounded-2xl flex items-center justify-center text-9xl">
            🐕
          </div>
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-stone-800">망고</h2>
            <p className="text-stone-500 mt-1">비글 | 4살</p>
          </div>
        </div>
      </section>

      {/* 포토 그리드 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-stone-800 mb-4">갤러리</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-stone-200 rounded-xl hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-4xl">
                📷
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 대형 사진 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="aspect-[4/3] bg-stone-200 rounded-xl flex items-center justify-center text-6xl">🏃</div>
          <div className="aspect-[4/3] bg-stone-200 rounded-xl flex items-center justify-center text-6xl">🌳</div>
        </div>
      </section>

      {/* 정보 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-stone-800 mb-4">About 망고</h3>
          <p className="text-stone-600 leading-relaxed">
            2020년 가족이 된 망고는 활발하고 호기심 많은 비글입니다.
            산책을 좋아하고, 간식을 위해서라면 무엇이든 합니다!
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-stone-500">
        <p>© 2024 망고네 포토북</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-800 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F13</strong> 펫 포토북</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-stone-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

