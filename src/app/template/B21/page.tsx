export default function TemplateB21() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* 헤더 */}
      <header className="py-6 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-600">🥐 달콤 베이커리</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#menu">메뉴</a>
            <a href="#info">매장 안내</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-b from-orange-100 to-orange-50 text-center">
        <span className="text-7xl">🥐</span>
        <h2 className="text-3xl font-bold text-orange-800 mt-6">갓 구운 빵의 행복</h2>
        <p className="text-orange-600 mt-2">매일 아침 신선하게 굽습니다</p>
      </section>

      {/* 베스트 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-orange-800 text-center mb-8">🏆 Best Sellers</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "버터 크로와상", price: "3,500원", icon: "🥐" },
              { name: "식빵", price: "5,000원", icon: "🍞" },
              { name: "소금빵", price: "2,800원", icon: "🥖" },
              { name: "생크림 케이크", price: "35,000원", icon: "🎂" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-xl text-center shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="font-bold text-orange-800 mt-3">{item.name}</h4>
                <p className="text-orange-500 mt-1">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-orange-800 text-center mb-8">전체 메뉴</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-orange-700 mb-4">🥖 빵</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>크로와상</span><span>3,500</span></li>
                <li className="flex justify-between"><span>바게트</span><span>4,000</span></li>
                <li className="flex justify-between"><span>치아바타</span><span>3,800</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-orange-700 mb-4">🎂 케이크</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>생크림</span><span>35,000</span></li>
                <li className="flex justify-between"><span>초코</span><span>38,000</span></li>
                <li className="flex justify-between"><span>과일</span><span>42,000</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-orange-700 mb-4">☕ 음료</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>아메리카노</span><span>3,500</span></li>
                <li className="flex justify-between"><span>라떼</span><span>4,000</span></li>
                <li className="flex justify-between"><span>주스</span><span>4,500</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 매장 안내 */}
      <section id="info" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-orange-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-orange-800 mb-4">📍 매장 안내</h3>
          <p className="text-orange-700">서울시 성동구 성수동 123</p>
          <p className="text-orange-600 mt-2">⏰ 08:00 - 21:00</p>
          <p className="text-orange-600 mt-1">📞 02-123-4567</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-orange-500 text-sm">
        <p>© 2024 달콤 베이커리</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B21</strong> 베이커리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

