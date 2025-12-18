export default function TemplateB20() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 헤더 */}
      <header className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-wider">RISTORANTE</h1>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#menu">Menu</a>
            <a href="#reservation">Reservation</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6 text-center">
        <span className="text-6xl">🍽️</span>
        <h2 className="text-4xl font-light mt-8 tracking-wide">Fine Italian Dining</h2>
        <p className="text-slate-400 mt-4">정통 이탈리안 요리의 진수</p>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-light text-center mb-12">Our Menu</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-amber-400 font-medium mb-6">Antipasti</h4>
              <div className="space-y-4">
                {[
                  { name: "카프레제", desc: "신선한 모짜렐라와 토마토", price: "18,000" },
                  { name: "브루스케타", desc: "구운 바게트, 토마토 토핑", price: "15,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                    <span className="text-amber-400">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-amber-400 font-medium mb-6">Pasta</h4>
              <div className="space-y-4">
                {[
                  { name: "까르보나라", desc: "전통 로마 스타일", price: "24,000" },
                  { name: "봉골레", desc: "신선한 바지락", price: "26,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                    <span className="text-amber-400">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="reservation" className="py-16 px-6">
        <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-light">Reservation</h3>
          <p className="text-slate-400 mt-4">예약 문의: 02-123-4567</p>
          <p className="text-slate-500 text-sm mt-2">영업시간: 11:30 - 22:00 (월요일 휴무)</p>
        </div>
      </section>

      {/* 위치 */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl font-light mb-4">Location</h3>
          <p className="text-slate-400">서울시 강남구 압구정로 123</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© 2024 RISTORANTE</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B20</strong> 레스토랑</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

