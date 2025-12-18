export default function TemplateB36() {
  return (
    <div className="min-h-screen bg-teal-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-teal-800 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wide">🧖 HEALING SPA</h1>
          <div className="flex gap-4 text-sm">
            <a href="#programs">Programs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 bg-gradient-to-b from-teal-800 to-teal-700 text-white text-center">
        <span className="text-6xl">🧖</span>
        <h2 className="text-3xl font-light mt-8">몸과 마음의 휴식</h2>
        <p className="text-teal-200 mt-4">프리미엄 스파 & 마사지</p>
      </section>

      {/* 프로그램 */}
      <section id="programs" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-teal-800 text-center mb-8">Programs</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "아로마 테라피", price: "90,000원", time: "60분", desc: "아로마 오일 전신 마사지" },
              { name: "스웨디시", price: "80,000원", time: "60분", desc: "근육 이완 마사지" },
              { name: "타이 마사지", price: "70,000원", time: "60분", desc: "전통 태국 마사지" },
              { name: "스톤 테라피", price: "120,000원", time: "90분", desc: "핫스톤 마사지" },
              { name: "페이셜 스파", price: "80,000원", time: "60분", desc: "얼굴 집중 케어" },
              { name: "커플 스파", price: "180,000원", time: "90분", desc: "2인 프라이빗" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-teal-800">{item.name}</h4>
                  <span className="text-teal-600 font-bold">{item.price}</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">{item.desc}</p>
                <p className="text-slate-400 text-xs mt-1">⏱ {item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 시설 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-teal-800 text-center mb-8">Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["🛁 자쿠지", "🧖 사우나", "☕ 라운지", "🚿 샤워실"].map((item) => (
              <div key={item} className="p-4 bg-teal-50 rounded-xl text-center text-teal-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 패키지 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-teal-800 text-center mb-8">Special Package</h3>
          <div className="bg-teal-100 p-8 rounded-2xl text-center">
            <h4 className="text-xl font-bold text-teal-800">힐링 패키지</h4>
            <p className="text-3xl font-bold text-teal-600 mt-4">200,000원</p>
            <p className="text-teal-700 mt-4">아로마 60분 + 페이셜 30분 + 티타임</p>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-teal-700 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 안내</h3>
          <p className="mt-6">📞 02-123-4567</p>
          <p className="text-teal-200 text-sm mt-2">10:00 - 22:00</p>
          <p className="text-teal-200 text-sm mt-1">서울시 강남구 신사동 789</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-teal-500 text-sm">
        <p>© 2024 HEALING SPA</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-teal-700 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B36</strong> 스파/마사지</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-teal-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

