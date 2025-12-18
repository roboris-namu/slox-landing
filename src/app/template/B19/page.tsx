export default function TemplateB19() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-8 px-6 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-serif">☕ 숲속의 카페</h1>
          <div className="flex gap-6 text-sm">
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#info">Info</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-900 to-amber-800 text-white text-center">
        <h2 className="text-4xl font-serif">따뜻한 커피 한 잔의 여유</h2>
        <p className="mt-4 text-amber-200">since 2018</p>
      </section>

      {/* 대표 메뉴 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif text-amber-900 text-center mb-8">Signature Menu</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "숲속 라떼", price: "5,500원", icon: "☕" },
              { name: "수제 티라미수", price: "7,000원", icon: "🍰" },
              { name: "시그니처 블렌드", price: "4,500원", icon: "🫘" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-2xl text-center shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="font-bold text-amber-900 mt-4">{item.name}</h4>
                <p className="text-amber-600 mt-2">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메뉴 카테고리 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif text-amber-900 text-center mb-8">Menu</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-amber-800 mb-4">☕ Coffee</h4>
              <div className="space-y-3">
                {[
                  { name: "아메리카노", price: "4,000원" },
                  { name: "카페라떼", price: "4,500원" },
                  { name: "바닐라라떼", price: "5,000원" },
                  { name: "카푸치노", price: "4,500원" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-amber-600">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-amber-800 mb-4">🍰 Dessert</h4>
              <div className="space-y-3">
                {[
                  { name: "티라미수", price: "7,000원" },
                  { name: "치즈케이크", price: "6,500원" },
                  { name: "크로플", price: "5,500원" },
                  { name: "스콘 세트", price: "6,000원" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-amber-600">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 영업정보 */}
      <section id="info" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-100 rounded-2xl p-8">
          <h3 className="text-xl font-serif text-amber-900 mb-4">📍 오시는 길</h3>
          <p className="text-amber-800">서울시 마포구 연남로 123</p>
          <p className="text-amber-700 mt-2">⏰ 10:00 - 22:00 (연중무휴)</p>
          <p className="text-amber-700 mt-1">📞 02-123-4567</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-600 text-sm">
        <p>© 2024 숲속의 카페</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-900 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B19</strong> 카페 무드</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

