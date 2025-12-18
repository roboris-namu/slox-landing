export default function TemplateB13() {
  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b border-stone-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wider">LEE PHOTO</h1>
          <div className="flex gap-6 text-sm text-stone-400">
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-light tracking-wide">
            Capturing Moments
          </h2>
          <p className="text-stone-400 mt-6 text-lg">
            웨딩 · 가족 · 프로필 · 상업 촬영
          </p>
        </div>
      </header>

      {/* 포트폴리오 */}
      <section id="portfolio" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-stone-800 rounded-lg flex items-center justify-center text-5xl hover:opacity-80 transition-opacity cursor-pointer">
                📷
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="py-16 px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-light text-center mb-12">Services</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { title: "웨딩", price: "150만원~" },
              { title: "가족", price: "30만원~" },
              { title: "프로필", price: "20만원~" },
              { title: "상업", price: "협의" },
            ].map((s) => (
              <div key={s.title}>
                <h4 className="text-lg">{s.title}</h4>
                <p className="text-stone-400 mt-2">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 bg-stone-700 rounded-full flex items-center justify-center text-6xl">
            👨‍🎨
          </div>
          <div>
            <h3 className="text-2xl font-light">이포토</h3>
            <p className="text-stone-400 mt-4 leading-relaxed">
              10년간 1,000+ 촬영을 진행한 프로페셔널 포토그래퍼입니다.<br />
              순간의 감동을 영원히 간직할 수 있도록 촬영합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-light">Contact</h3>
          <p className="text-stone-400 mt-6">
            📧 lee.photo@email.com<br />
            📞 010-1234-5678<br />
            📍 서울시 강남구 스튜디오
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-stone-600 text-sm">
        <p>© 2024 LEE PHOTO. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-700 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B13</strong> 포토그래퍼</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-stone-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

