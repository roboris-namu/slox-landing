export default function TemplateF17() {
  return (
    <div className="min-h-screen bg-emerald-900">
      {/* 헤더 */}
      <header className="py-12 text-center">
        <span className="text-5xl">🌿</span>
        <h1 className="text-3xl font-light text-emerald-100 mt-4">숲이</h1>
        <p className="text-emerald-400 mt-2">자연을 사랑하는 강아지</p>
      </header>

      {/* 메인 이미지 */}
      <section className="px-6">
        <div className="max-w-md mx-auto">
          <div className="aspect-square bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <span className="text-9xl">🐕</span>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-900/80 to-transparent" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-emerald-200 text-sm">시베리안 허스키 | 3살</p>
            </div>
          </div>
        </div>
      </section>

      {/* 프로필 */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto bg-emerald-800/50 rounded-2xl p-6 border border-emerald-700">
          <h3 className="text-lg font-bold text-emerald-200 mb-4">🐾 About 숲이</h3>
          <p className="text-emerald-300 leading-relaxed">
            산과 자연을 사랑하는 숲이입니다.
            매주 주말마다 등산을 하고, 계곡에서 수영하는 것을 좋아해요.
            자연 속에서 가장 행복한 강아지예요.
          </p>
        </div>
      </section>

      {/* 자연 갤러리 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-emerald-200 mb-4">🌲 자연 속 숲이</h3>
          <div className="grid grid-cols-2 gap-3">
            {["🏔️", "🌳", "🏕️", "🌊"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-emerald-800 rounded-xl flex items-center justify-center text-5xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 좋아하는 곳 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-emerald-200 mb-4">❤️ 좋아하는 장소</h3>
          <div className="flex flex-wrap gap-2">
            {["북한산", "설악산", "청계천", "한강공원", "서울숲"].map((place) => (
              <span key={place} className="px-4 py-2 bg-emerald-700 text-emerald-200 rounded-full text-sm">
                {place}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 집사 */}
      <section className="py-8 px-6 border-t border-emerald-800">
        <div className="max-w-md mx-auto text-center text-emerald-400">
          <p>집사: 김숲이 | 📍 서울</p>
          <p className="mt-2">@forest_dog</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-600">
        <p>🌿 자연과 함께하는 숲이 🌿</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F17</strong> 자연 테마</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

