export default function TemplateB24() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-amber-800 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🍲 할매손 한정식</h1>
          <div className="flex gap-4 text-sm">
            <a href="#menu">메뉴</a>
            <a href="#info">안내</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-800 to-amber-700 text-white text-center">
        <h2 className="text-3xl font-bold">정성을 담은 한 상</h2>
        <p className="text-amber-200 mt-4">40년 전통 손맛 한정식</p>
      </section>

      {/* 대표 메뉴 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">정식 메뉴</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "기본 한정식", price: "25,000원", desc: "기본 찬 12가지" },
              { name: "특선 한정식", price: "35,000원", desc: "특선 찬 16가지" },
              { name: "프리미엄", price: "50,000원", desc: "최상급 한우 포함" },
            ].map((menu) => (
              <div key={menu.name} className="bg-white p-6 rounded-xl text-center shadow-sm border-2 border-amber-200">
                <h4 className="font-bold text-amber-900">{menu.name}</h4>
                <p className="text-2xl font-bold text-amber-600 mt-4">{menu.price}</p>
                <p className="text-slate-500 text-sm mt-2">{menu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 반찬 소개 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-amber-900 text-center mb-6">정성 가득 반찬</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["된장찌개", "불고기", "잡채", "전", "나물", "김치", "젓갈", "구이"].map((item) => (
              <span key={item} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 매장 사진 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-amber-900 text-center mb-6">매장 분위기</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["🏡", "🍲", "🥢", "🍵"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-amber-100 rounded-xl flex items-center justify-center text-5xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 안내 */}
      <section id="info" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-amber-900 mb-4">📍 오시는 길</h3>
          <p className="text-amber-800">서울시 종로구 북촌로 123</p>
          <p className="text-amber-700 mt-2">⏰ 11:30 - 21:00 (브레이크타임 15:00-17:00)</p>
          <p className="text-amber-700 mt-1">📞 02-123-4567</p>
          <p className="text-amber-600 text-sm mt-4">※ 단체 예약 환영 / 주차 가능</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-600 text-sm">
        <p>© 2024 할매손 한정식</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-800 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B24</strong> 한식당</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

