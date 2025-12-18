export default function TemplateB35() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light text-pink-600">💋 MAKEUP ATELIER</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink-100 to-rose-100 text-center">
        <span className="text-6xl">💋</span>
        <h2 className="text-3xl font-light text-pink-700 mt-6">당신의 아름다움을 완성</h2>
        <p className="text-pink-500 mt-2">웨딩 · 프로필 · 일상 메이크업</p>
      </section>

      {/* 서비스 */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-pink-700 text-center mb-8">Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "웨딩 메이크업", price: "300,000원", desc: "본식 + 리허설", icon: "👰" },
              { name: "프로필 촬영", price: "150,000원", desc: "메이크업 + 헤어", icon: "📸" },
              { name: "파티/행사", price: "100,000원", desc: "특별한 날을 위해", icon: "🎉" },
              { name: "레슨", price: "80,000원", desc: "1:1 개인 레슨", icon: "📚" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm flex gap-4">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h4 className="font-medium text-pink-700">{item.name}</h4>
                  <p className="text-pink-500 font-bold mt-1">{item.price}</p>
                  <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 포트폴리오 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-pink-700 text-center mb-8">Portfolio</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-pink-100 rounded-xl flex items-center justify-center text-4xl">
                💄
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 아티스트 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-pink-200 rounded-full mx-auto flex items-center justify-center text-6xl">
            👩‍🎨
          </div>
          <h3 className="text-xl font-medium text-pink-700 mt-6">메이크업 아티스트 김아름</h3>
          <p className="text-slate-500 mt-2">10년 경력 | 웨딩/방송/화보 다수</p>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-pink-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-6">📞 010-1234-5678</p>
          <p className="text-pink-200 text-sm mt-2">카카오톡: makeup_atelier</p>
          <p className="text-pink-200 text-sm mt-1">서울시 강남구 청담동</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-400 text-sm">
        <p>© 2024 MAKEUP ATELIER</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B35</strong> 메이크업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

