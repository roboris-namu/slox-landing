export default function TemplateF04() {
  const photos = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    date: `2024.${String(i + 1).padStart(2, "0")}`,
  }));

  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="py-6 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-stone-800">🖼️ Photo Gallery</h1>
          <nav className="flex gap-4 text-sm text-stone-500">
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">최씨네 가족 갤러리</h2>
          <p className="text-stone-500 text-lg">소중한 순간들을 사진으로 기록합니다</p>
        </div>
      </section>

      {/* 갤러리 그리드 */}
      <section id="gallery" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative">
                <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-stone-200 to-stone-300">
                    📷
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">{photo.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가족 소개 */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-stone-900 text-center mb-8">Our Family</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] bg-stone-100 rounded-xl flex items-center justify-center text-8xl">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-900 mb-4">최씨네 가족을 소개합니다</h4>
              <p className="text-stone-600 leading-relaxed mb-4">
                2012년 결혼 이후 두 아이와 함께 행복하게 살고 있습니다.
                매일매일의 소소한 일상이 가장 큰 행복입니다.
              </p>
              <div className="flex gap-4 text-sm text-stone-500">
                <span>👨 아빠 최민호</span>
                <span>👩 엄마 김지현</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-stone-500 border-t bg-white">
        <p>© 2024 Choi Family Gallery</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-800 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F04</strong> 포토 갤러리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-stone-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

