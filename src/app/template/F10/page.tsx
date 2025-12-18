export default function TemplateF10() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-amber-100 to-amber-50">
        <span className="text-6xl">🐶</span>
        <h1 className="text-3xl font-bold text-amber-900 mt-4">뽀삐의 일기</h1>
        <p className="text-amber-600 mt-2">골든리트리버 | 3살</p>
      </header>

      {/* 프로필 */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lg">
          <div className="w-32 h-32 bg-amber-200 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
            🐕
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-900">뽀삐 (Poppy)</h2>
            <p className="text-amber-600 mt-2">2021년 3월 15일생</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="p-3 bg-amber-50 rounded-xl">
              <p className="font-bold text-amber-900">25kg</p>
              <p className="text-amber-500">몸무게</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <p className="font-bold text-amber-900">여아</p>
              <p className="text-amber-500">성별</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <p className="font-bold text-amber-900">3살</p>
              <p className="text-amber-500">나이</p>
            </div>
          </div>
        </div>
      </section>

      {/* 좋아하는 것 */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-amber-900 text-center mb-6">🦴 좋아하는 것</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["산책", "공놀이", "간식", "낮잠", "수영", "친구 만나기"].map((item) => (
              <span key={item} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-bold text-amber-900 text-center mb-6">📸 일상 기록</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-amber-200 rounded-xl flex items-center justify-center text-3xl">
                🐕
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가족 */}
      <section className="py-12 px-6 bg-amber-100">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-4">👨‍👩‍👧 뽀삐네 가족</h3>
          <p className="text-amber-700">
            아빠 김철수 | 엄마 이영희<br />
            서울시 강남구
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-600">
        <p>🐾 뽀삐와 함께하는 매일이 행복해요 🐾</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F10</strong> 댕댕이 일기</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

