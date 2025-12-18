export default function TemplateB30() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wide">💄 BEAUTY STUDIO</h1>
          <div className="flex gap-4 text-sm">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white text-center">
        <h2 className="text-4xl font-light">토탈 뷰티 케어</h2>
        <p className="text-purple-100 mt-4">헤어 · 네일 · 메이크업 · 피부관리</p>
      </section>

      {/* 서비스 */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-medium text-center mb-12">Our Services</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "헤어", icon: "💇‍♀️", services: ["커트", "펌", "염색"] },
              { name: "네일", icon: "💅", services: ["젤네일", "아트", "패디"] },
              { name: "메이크업", icon: "💄", services: ["일상", "웨딩", "촬영"] },
              { name: "피부관리", icon: "🧴", services: ["클렌징", "보습", "리프팅"] },
            ].map((service) => (
              <div key={service.name} className="p-6 bg-purple-50 rounded-2xl text-center">
                <span className="text-4xl">{service.icon}</span>
                <h4 className="font-bold text-purple-800 mt-4">{service.name}</h4>
                <ul className="text-sm text-purple-600 mt-3 space-y-1">
                  {service.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-center mb-8">Price</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-medium text-purple-700 mb-4">💇‍♀️ Hair</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>커트</span><span>30,000~</span></div>
                <div className="flex justify-between"><span>펌</span><span>80,000~</span></div>
                <div className="flex justify-between"><span>염색</span><span>70,000~</span></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-medium text-purple-700 mb-4">💅 Nail</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>젤 네일</span><span>50,000~</span></div>
                <div className="flex justify-between"><span>아트</span><span>70,000~</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-purple-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-6">📞 02-123-4567</p>
          <p className="text-purple-200 text-sm mt-2">10:00 - 20:00</p>
          <p className="text-purple-200 text-sm mt-1">서울시 강남구 청담동 456</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 BEAUTY STUDIO</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B30</strong> 뷰티 샵</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

