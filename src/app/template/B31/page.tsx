export default function TemplateB31() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 헤더 */}
      <header className="py-4 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">✂️ GENTLEMAN BARBER</h1>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#menu">Menu</a>
            <a href="#booking">Booking</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 text-center">
        <span className="text-6xl">✂️</span>
        <h2 className="text-4xl font-bold mt-8">남자의 품격</h2>
        <p className="text-slate-400 mt-4">클래식 바버샵 | Since 2018</p>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-8">Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "시그니처 커트", price: "35,000원", desc: "샴푸 + 커트 + 스타일링", time: "40분" },
              { name: "쉐이빙", price: "25,000원", desc: "핫타올 + 면도 + 스킨케어", time: "30분" },
              { name: "커트 + 쉐이빙", price: "55,000원", desc: "풀 서비스 패키지", time: "60분" },
              { name: "다운펌", price: "50,000원", desc: "볼륨다운 + 스타일링", time: "50분" },
            ].map((item) => (
              <div key={item.name} className="p-6 bg-slate-800 rounded-xl">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{item.name}</h4>
                  <span className="text-amber-400 font-bold">{item.price}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                <p className="text-slate-500 text-xs mt-1">⏱ {item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 바버 */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-8">Our Barbers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "마스터 김", exp: "15년 경력" },
              { name: "시니어 이", exp: "10년 경력" },
              { name: "바버 박", exp: "5년 경력" },
            ].map((barber) => (
              <div key={barber.name} className="text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto flex items-center justify-center text-4xl">
                  👨
                </div>
                <p className="font-bold mt-4">{barber.name}</p>
                <p className="text-slate-400 text-sm">{barber.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="booking" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-600 text-slate-900 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">예약</h3>
          <p className="mt-4">📞 02-123-4567</p>
          <p className="text-amber-800 text-sm mt-2">11:00 - 21:00 (월요일 휴무)</p>
          <p className="text-amber-800 text-sm mt-1">서울시 종로구 익선동 12</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>© 2024 GENTLEMAN BARBER</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B31</strong> 바버샵</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

