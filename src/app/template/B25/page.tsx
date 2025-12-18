export default function TemplateB25() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 헤더 */}
      <header className="py-4 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wider">🍺 THE LOUNGE</h1>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#drinks">Drinks</a>
            <a href="#info">Info</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <span className="text-7xl">🍸</span>
        <h2 className="text-4xl font-light mt-8">Craft Cocktails & Beer</h2>
        <p className="text-slate-400 mt-4">도심 속 특별한 공간</p>
      </section>

      {/* 시그니처 */}
      <section id="drinks" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-light text-center mb-8">Signature Cocktails</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "라운지 모히또", price: "15,000", icon: "🍹" },
              { name: "스모키 올드패션드", price: "18,000", icon: "🥃" },
              { name: "베리 마티니", price: "16,000", icon: "🍸" },
            ].map((drink) => (
              <div key={drink.name} className="p-6 bg-slate-800 rounded-xl text-center">
                <span className="text-4xl">{drink.icon}</span>
                <h4 className="font-medium mt-4">{drink.name}</h4>
                <p className="text-amber-400 mt-2">{drink.price}원</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 맥주 */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-light text-center mb-8">Draft Beer</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "기네스", price: "9,000" },
              { name: "하이네켄", price: "8,000" },
              { name: "수제 IPA", price: "10,000" },
              { name: "필스너 우르켈", price: "9,000" },
            ].map((beer) => (
              <div key={beer.name} className="flex justify-between p-4 bg-slate-800/50 rounded-lg">
                <span>🍺 {beer.name}</span>
                <span className="text-amber-400">{beer.price}원</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 안주 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-light text-center mb-8">Food</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "트러플 감자튀김", price: "15,000" },
              { name: "치킨 윙", price: "18,000" },
              { name: "하몽 플래터", price: "25,000" },
              { name: "나쵸", price: "14,000" },
            ].map((food) => (
              <div key={food.name} className="flex justify-between p-4 bg-slate-800/50 rounded-lg">
                <span>{food.name}</span>
                <span className="text-amber-400">{food.price}원</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 안내 */}
      <section id="info" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-600 text-slate-900 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold">Visit Us</h3>
          <p className="mt-4">서울시 강남구 압구정로 456</p>
          <p className="mt-2">18:00 - 02:00 (금,토 03:00)</p>
          <p className="mt-2">📞 02-123-4567</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© 2024 THE LOUNGE</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B25</strong> 바/펍</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

