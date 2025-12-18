export default function TemplateF15() {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* 프로필 카드 */}
      <section className="py-12 px-6">
        <div className="max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* 커버 */}
          <div className="h-32 bg-gradient-to-r from-rose-400 to-pink-500" />
          
          {/* 프로필 이미지 */}
          <div className="relative -mt-16 text-center">
            <div className="w-32 h-32 bg-rose-200 rounded-full mx-auto border-4 border-white flex items-center justify-center text-6xl shadow-lg">
              🐰
            </div>
          </div>

          {/* 정보 */}
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-rose-900">토순이</h1>
            <p className="text-rose-500 mt-1">🎀 네덜란드 드워프 | 1살</p>
            
            <div className="mt-6 flex justify-center gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-rose-600">1.2kg</p>
                <p className="text-rose-400 text-xs">몸무게</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">여아</p>
                <p className="text-rose-400 text-xs">성별</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">1살</p>
                <p className="text-rose-400 text-xs">나이</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-rose-100">
              <h3 className="text-sm font-bold text-rose-800 mb-3">💕 About Me</h3>
              <p className="text-rose-600 text-sm leading-relaxed">
                호기심 많고 애교 넘치는 토순이예요!
                당근을 가장 좋아하고, 점프하는 걸 좋아해요.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-rose-800 mb-3">🥕 좋아하는 것</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {["당근", "점프", "쓰다듬기", "건초"].map((item) => (
                  <span key={item} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="text-lg font-bold text-rose-900 mb-4 text-center">📷 Photos</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-rose-200 rounded-xl flex items-center justify-center text-3xl">
                🐰
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 집사 */}
      <section className="py-8 px-6 bg-rose-100">
        <div className="max-w-sm mx-auto text-center">
          <p className="text-rose-600 text-sm">
            집사: 이토순<br />
            📍 서울시 마포구<br />
            📸 @tosuni_bunny
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-400">
        <p>🐰 사랑해요 토순이 🐰</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F15</strong> 펫 프로필</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

