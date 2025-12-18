export default function TemplateB26() {
  return (
    <div className="min-h-screen bg-red-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🍕 PIZZA NAPOLI</h1>
          <div className="flex gap-4 text-sm">
            <a href="#menu">Menu</a>
            <a href="#order">Order</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-b from-red-600 to-red-500 text-white text-center">
        <span className="text-7xl">🍕</span>
        <h2 className="text-3xl font-bold mt-6">정통 나폴리 피자</h2>
        <p className="text-red-100 mt-2">화덕에서 갓 구운 이탈리안 피자</p>
      </section>

      {/* 베스트 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-red-800 text-center mb-8">🔥 Best Pizza</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "마르게리타", price: "18,000원", desc: "토마토, 모짜렐라, 바질" },
              { name: "콰트로 포르마지", price: "22,000원", desc: "4가지 치즈" },
              { name: "디아볼라", price: "20,000원", desc: "살라미, 핫페퍼" },
            ].map((pizza) => (
              <div key={pizza.name} className="bg-white p-6 rounded-2xl text-center shadow-sm">
                <span className="text-4xl">🍕</span>
                <h4 className="font-bold text-red-800 mt-4">{pizza.name}</h4>
                <p className="text-slate-500 text-sm mt-1">{pizza.desc}</p>
                <p className="text-red-600 font-bold mt-3">{pizza.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전체 메뉴 */}
      <section id="menu" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-red-800 text-center mb-8">Menu</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-red-700 mb-4">🍕 Pizza</h4>
              <div className="space-y-3">
                {[
                  { name: "마르게리타", price: "18,000" },
                  { name: "페페로니", price: "19,000" },
                  { name: "하와이안", price: "19,000" },
                  { name: "BBQ 치킨", price: "21,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-red-600">{item.price}원</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-red-700 mb-4">🍝 Pasta & Side</h4>
              <div className="space-y-3">
                {[
                  { name: "까르보나라", price: "15,000" },
                  { name: "알리오올리오", price: "13,000" },
                  { name: "갈릭브레드", price: "5,000" },
                  { name: "콜라/사이다", price: "2,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-red-600">{item.price}원</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주문/배달 */}
      <section id="order" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-red-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">🛵 배달 주문</h3>
          <p className="mt-4">배달의민족, 요기요에서 주문하세요!</p>
          <p className="mt-4 text-red-100">📞 전화주문: 02-123-4567</p>
        </div>
      </section>

      {/* 안내 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600">서울시 마포구 홍대입구로 123</p>
          <p className="text-slate-500 mt-2">11:00 - 22:00</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-red-500 text-sm">
        <p>© 2024 PIZZA NAPOLI</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B26</strong> 피자집</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-red-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

