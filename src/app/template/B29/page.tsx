export default function TemplateB29() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light text-pink-600">💅 NAIL ATELIER</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#gallery">Gallery</a>
            <a href="#menu">Menu</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 text-center">
        <span className="text-6xl">💅</span>
        <h2 className="text-3xl font-light text-pink-700 mt-6">손끝의 아름다움</h2>
        <p className="text-pink-500 mt-2">Premium Nail Art Studio</p>
      </section>

      {/* 갤러리 */}
      <section id="gallery" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-pink-700 text-center mb-8">Gallery</h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-pink-200 rounded-xl flex items-center justify-center text-4xl">
                💅
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-pink-700 text-center mb-8">Menu</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "기본 케어", price: "30,000원", desc: "손톱 정리 + 큐티클 케어" },
              { name: "젤 네일", price: "50,000원~", desc: "원컬러 / 그라데이션" },
              { name: "네일 아트", price: "70,000원~", desc: "아트 디자인 포함" },
              { name: "패디큐어", price: "60,000원~", desc: "발톱 관리 + 젤" },
            ].map((item) => (
              <div key={item.name} className="p-6 border border-pink-200 rounded-xl hover:border-pink-400 transition-colors">
                <h4 className="font-medium text-pink-700">{item.name}</h4>
                <p className="text-pink-500 font-bold mt-2">{item.price}</p>
                <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추가 서비스 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-medium text-pink-700 text-center mb-6">Add-on</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "파츠 추가 +2,000",
              "연장 +10,000",
              "제거 10,000",
              "스톤 +3,000",
            ].map((item) => (
              <span key={item} className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 안내</h3>
          <p className="mt-4 text-pink-100">완전 예약제 운영</p>
          <p className="mt-6">📞 010-1234-5678</p>
          <p className="text-pink-200 text-sm mt-2">카카오톡: nail_atelier</p>
        </div>
      </section>

      {/* 위치 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600">서울시 강남구 신사동 123</p>
          <p className="text-slate-500 text-sm mt-2">11:00 - 20:00 (일요일 휴무)</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-400 text-sm">
        <p>© 2024 NAIL ATELIER</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B29</strong> 네일 아트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

