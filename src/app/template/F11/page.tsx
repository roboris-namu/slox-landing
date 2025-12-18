export default function TemplateF11() {
  return (
    <div className="min-h-screen bg-purple-50">
      {/* 헤더 */}
      <header className="py-12 text-center">
        <span className="text-6xl">🐱</span>
        <h1 className="text-3xl font-bold text-purple-900 mt-4">나비의 앨범</h1>
        <p className="text-purple-500 mt-2">코리안 숏헤어 | 2살</p>
      </header>

      {/* 메인 프로필 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <div className="aspect-square bg-purple-200 rounded-3xl flex items-center justify-center text-9xl mb-6">
            😺
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-900">나비 (Nabi)</h2>
            <p className="text-purple-500 mt-1">츤데레 고양이 🐾</p>
          </div>
        </div>
      </section>

      {/* 정보 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto bg-white rounded-2xl p-6 shadow-md">
          <h3 className="font-bold text-purple-900 mb-4">😸 나비 정보</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-500">생일</span>
              <span className="text-purple-900">2022년 5월 10일</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-500">성별</span>
              <span className="text-purple-900">남아 (중성화 완료)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-500">몸무게</span>
              <span className="text-purple-900">4.5kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-500">좋아하는 것</span>
              <span className="text-purple-900">츄르, 낮잠, 박스</span>
            </div>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6">
        <div className="max-w-sm mx-auto">
          <h3 className="font-bold text-purple-900 mb-4 text-center">📷 포토 갤러리</h3>
          <div className="grid grid-cols-3 gap-2">
            {["😺", "😸", "😻", "😽", "🙀", "😹"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-purple-100 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 집사 */}
      <section className="py-8 px-6 bg-purple-100">
        <div className="max-w-sm mx-auto text-center">
          <h3 className="font-bold text-purple-900 mb-2">🏠 집사 정보</h3>
          <p className="text-purple-600">
            집사 박민수<br />
            인스타 @nabi_cat
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-purple-400">
        <p>🐱 냐옹~ 놀러와줘서 고마워요 🐱</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-500 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F11</strong> 냥이 앨범</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

