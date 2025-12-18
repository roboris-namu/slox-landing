export default function TemplateB15() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-rose-600">DESIGN.KIM</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#works">Works</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-40 h-40 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center text-6xl shadow-xl rotate-3">
              🎨
            </div>
            <div>
              <p className="text-rose-500 font-medium">Graphic Designer</p>
              <h2 className="text-4xl font-bold text-slate-800 mt-2">
                디자인으로 브랜드를<br />빛나게 합니다
              </h2>
              <p className="text-slate-500 mt-4">
                브랜딩 · 인쇄물 · UI/UX · 패키지 디자인
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 작업물 */}
      <section id="works" className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Recent Works</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white rounded-xl shadow-sm flex items-center justify-center text-4xl hover:shadow-md transition-shadow cursor-pointer">
                🎨
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Services & Pricing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "로고 디자인", price: "50만원~", desc: "브랜드 아이덴티티 설계" },
              { title: "인쇄물 디자인", price: "20만원~", desc: "명함, 브로셔, 리플렛" },
              { title: "패키지 디자인", price: "80만원~", desc: "제품 패키지, 라벨" },
              { title: "UI/UX 디자인", price: "100만원~", desc: "앱, 웹 인터페이스" },
            ].map((s) => (
              <div key={s.title} className="p-6 border rounded-xl hover:border-rose-400 transition-colors">
                <h4 className="font-bold text-lg">{s.title}</h4>
                <p className="text-rose-500 font-bold mt-2">{s.price}</p>
                <p className="text-slate-500 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 bg-rose-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">프로젝트 문의</h3>
          <p className="mt-4 text-rose-100">새로운 프로젝트, 함께 시작해요</p>
          <p className="mt-6">📧 design.kim@email.com | 📞 010-1234-5678</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 DESIGN.KIM. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B15</strong> 디자이너</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

