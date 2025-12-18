export default function TemplateB32() {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light text-rose-600">👁️ LASH STUDIO</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#menu">Menu</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-rose-100 to-pink-100 text-center">
        <span className="text-6xl">👁️</span>
        <h2 className="text-3xl font-light text-rose-700 mt-6">눈빛을 완성하다</h2>
        <p className="text-rose-500 mt-2">속눈썹 · 눈썹 전문 샵</p>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-rose-700 text-center mb-8">Menu</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-medium text-rose-600 mb-4">👁️ 속눈썹 연장</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "내추럴", price: "60,000원", desc: "80-100가닥" },
                  { name: "글래머", price: "80,000원", desc: "120-140가닥" },
                  { name: "볼륨", price: "100,000원", desc: "볼륨 래시" },
                  { name: "리터치", price: "40,000원", desc: "2주 이내" },
                ].map((item) => (
                  <div key={item.name} className="bg-white p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                    <span className="text-rose-500 font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-rose-600 mb-4">✨ 눈썹</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "눈썹 정리", price: "15,000원" },
                  { name: "눈썹 틴트", price: "25,000원" },
                  { name: "반영구 눈썹", price: "200,000원" },
                  { name: "리터치 (3개월)", price: "80,000원" },
                ].map((item) => (
                  <div key={item.name} className="bg-white p-4 rounded-xl flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-rose-500 font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-rose-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-4 text-rose-100">완전 예약제 운영</p>
          <p className="mt-6">📞 010-1234-5678</p>
          <p className="text-rose-200 text-sm mt-2">카카오톡: lash_studio</p>
        </div>
      </section>

      {/* 위치 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600">서울시 강남구 압구정로 456</p>
          <p className="text-slate-500 text-sm mt-2">10:00 - 20:00 (일요일 휴무)</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-400 text-sm">
        <p>© 2024 LASH STUDIO</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B32</strong> 속눈썹/눈썹</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

