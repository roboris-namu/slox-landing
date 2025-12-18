export default function TemplateB22() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wide text-emerald-700">GREEN PLATE</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl">🥗</span>
          <h2 className="text-3xl font-light text-emerald-800 mt-6">
            Fresh & Healthy Brunch
          </h2>
          <p className="text-emerald-600 mt-4">신선한 재료로 만드는 건강한 브런치</p>
        </div>
      </section>

      {/* 시그니처 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-emerald-800 text-center mb-8">Signature</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "아보카도 토스트", price: "15,000원", desc: "수란, 아보카도, 사워도우", icon: "🥑" },
              { name: "에그 베네딕트", price: "18,000원", desc: "홀렌다이즈 소스, 베이컨", icon: "🍳" },
              { name: "그릭 샐러드", price: "14,000원", desc: "올리브, 페타치즈, 채소", icon: "🥗" },
            ].map((item) => (
              <div key={item.name} className="p-6 border rounded-2xl hover:border-emerald-400 transition-colors">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="font-medium text-emerald-800 mt-4">{item.name}</h4>
                <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                <p className="text-emerald-600 font-medium mt-3">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전체 메뉴 */}
      <section id="menu" className="py-16 px-6 bg-emerald-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-emerald-800 text-center mb-8">Menu</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-medium text-emerald-700 mb-4">🍳 Brunch</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>팬케이크</span><span>13,000</span></div>
                <div className="flex justify-between"><span>프렌치토스트</span><span>14,000</span></div>
                <div className="flex justify-between"><span>오믈렛</span><span>15,000</span></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-medium text-emerald-700 mb-4">🥤 Beverage</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>아메리카노</span><span>4,500</span></div>
                <div className="flex justify-between"><span>그린 스무디</span><span>7,000</span></div>
                <div className="flex justify-between"><span>프레시 주스</span><span>6,500</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 정보 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-medium text-emerald-800 mb-4">Visit Us</h3>
          <p className="text-slate-600">서울시 용산구 이태원로 123</p>
          <p className="text-slate-500 mt-2">09:00 - 17:00 | 월요일 휴무</p>
          <p className="text-slate-500 mt-1">📞 02-123-4567</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 GREEN PLATE</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B22</strong> 브런치 카페</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

