export default function TemplateB01() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 네비게이션 */}
      <nav className="bg-slate-900 text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">SLOX Corp.</h1>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-blue-400">회사소개</a>
            <a href="#services" className="hover:text-blue-400">사업영역</a>
            <a href="#contact" className="hover:text-blue-400">문의</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            신뢰와 혁신으로<br />미래를 만듭니다
          </h2>
          <p className="mt-6 text-slate-300 text-lg max-w-xl">
            1995년 창립 이래 고객과 함께 성장해온 SLOX Corp.는
            최고의 품질과 서비스로 업계를 선도합니다.
          </p>
        </div>
      </header>

      {/* 회사 소개 */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">회사 소개</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-600 leading-relaxed">
                SLOX Corp.는 1995년 설립되어 30년간 한결같은 품질과 서비스로
                고객의 신뢰를 쌓아왔습니다. 혁신적인 기술력과 전문 인력을 바탕으로
                업계 최고의 솔루션을 제공합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-blue-600">30년</p>
                <p className="text-slate-500 text-sm mt-1">업력</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-slate-500 text-sm mt-1">고객사</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-blue-600">150명</p>
                <p className="text-slate-500 text-sm mt-1">임직원</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <p className="text-3xl font-bold text-blue-600">5개국</p>
                <p className="text-slate-500 text-sm mt-1">해외 지사</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사업 영역 */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">사업 영역</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏭", title: "제조", desc: "최첨단 생산 시설" },
              { icon: "🔬", title: "연구개발", desc: "지속적인 기술 혁신" },
              { icon: "🌏", title: "글로벌", desc: "세계 시장 진출" },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-slate-50 rounded-lg text-center">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-xl font-bold text-slate-800 mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
          <p className="text-slate-300">서울특별시 강남구 테헤란로 123</p>
          <p className="text-slate-300 mt-2">Tel: 02-1234-5678 | Email: info@slox.co.kr</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 SLOX Corp. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B01</strong> 코퍼레이트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

