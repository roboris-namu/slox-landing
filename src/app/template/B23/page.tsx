export default function TemplateB23() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light">鮨 스시하루</h1>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#menu">메뉴</a>
            <a href="#reservation">예약</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <span className="text-6xl">🍣</span>
        <h2 className="text-3xl font-light mt-8">정통 오마카세</h2>
        <p className="text-slate-400 mt-4">장인의 손끝에서 완성되는 한 점</p>
      </section>

      {/* 코스 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-light text-center mb-8">Course Menu</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "런치 오마카세", price: "55,000원", items: "12피스 + 국물" },
              { name: "디너 오마카세", price: "120,000원", items: "20피스 + 코스" },
              { name: "스페셜 오마카세", price: "200,000원", items: "프리미엄 네타" },
            ].map((course) => (
              <div key={course.name} className="bg-white p-6 rounded-xl text-center border hover:border-slate-400 transition-colors">
                <h4 className="font-medium">{course.name}</h4>
                <p className="text-2xl font-bold text-slate-800 mt-4">{course.price}</p>
                <p className="text-slate-500 text-sm mt-2">{course.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 단품 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-light text-center mb-8">A La Carte</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "참치 대뱃살", price: "25,000" },
              { name: "우니 (성게알)", price: "18,000" },
              { name: "광어", price: "12,000" },
              { name: "연어", price: "10,000" },
            ].map((item) => (
              <div key={item.name} className="flex justify-between p-4 border-b">
                <span>{item.name}</span>
                <span className="text-slate-600">{item.price}원</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="reservation" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-light">예약 안내</h3>
          <p className="text-slate-400 mt-4">완전 예약제로 운영됩니다</p>
          <p className="mt-6">📞 02-123-4567</p>
          <p className="text-slate-500 text-sm mt-2">런치 12:00 / 디너 18:00, 20:00</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 스시하루</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B23</strong> 일식당</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

