export default function TemplateB27() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-pink-600">🍰 SWEET MOMENT</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#menu">Menu</a>
            <a href="#order">Order</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink-100 to-purple-100 text-center">
        <span className="text-7xl">🍰</span>
        <h2 className="text-3xl font-bold text-pink-700 mt-6">달콤한 순간</h2>
        <p className="text-pink-500 mt-2">수제 케이크 & 디저트 전문점</p>
      </section>

      {/* 베스트 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-pink-700 text-center mb-8">✨ Best Desserts</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "생크림 케이크", price: "38,000", icon: "🎂" },
              { name: "마카롱 세트", price: "18,000", icon: "🧁" },
              { name: "티라미수", price: "7,000", icon: "🍰" },
              { name: "크로플", price: "8,000", icon: "🧇" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-2xl text-center shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="font-bold text-pink-700 mt-3">{item.name}</h4>
                <p className="text-pink-500 mt-1">{item.price}원</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 케이크 주문 */}
      <section id="order" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-pink-700 text-center mb-8">🎂 케이크 주문</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { size: "미니 (1호)", price: "28,000원", serve: "2-3인" },
              { size: "레귤러 (2호)", price: "38,000원", serve: "4-6인" },
              { size: "라지 (3호)", price: "48,000원", serve: "8-10인" },
            ].map((cake) => (
              <div key={cake.size} className="p-6 border-2 border-pink-200 rounded-2xl text-center hover:border-pink-400 transition-colors">
                <h4 className="font-bold text-pink-700">{cake.size}</h4>
                <p className="text-2xl font-bold text-pink-600 mt-4">{cake.price}</p>
                <p className="text-slate-500 text-sm mt-2">{cake.serve}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-pink-500 mt-8 text-sm">
            ※ 주문제작은 3일 전 예약 필수
          </p>
        </div>
      </section>

      {/* 음료 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-pink-700 text-center mb-6">☕ Beverage</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { name: "아메리카노", price: "4,000" },
              { name: "라떼", price: "4,500" },
              { name: "밀크티", price: "5,500" },
              { name: "에이드", price: "5,000" },
            ].map((drink) => (
              <div key={drink.name} className="bg-pink-100 p-3 rounded-xl">
                <p className="font-medium text-pink-700">{drink.name}</p>
                <p className="text-pink-500">{drink.price}원</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 안내 */}
      <section className="py-16 px-6 bg-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-bold text-pink-700 mb-4">📍 매장 안내</h3>
          <p className="text-pink-600">서울시 서초구 반포대로 123</p>
          <p className="text-pink-500 mt-2">10:00 - 21:00</p>
          <p className="text-pink-500 mt-1">📞 02-123-4567</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-400 text-sm">
        <p>© 2024 SWEET MOMENT</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B27</strong> 디저트 카페</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

