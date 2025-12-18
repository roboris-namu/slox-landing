export default function TemplateB03() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-6 px-6 bg-white/80 backdrop-blur fixed top-0 left-0 right-0 z-40 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">MODERN<span className="text-blue-500">BIZ</span></h1>
          <div className="hidden md:flex gap-8 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              모던한 비즈니스<br />
              <span className="text-blue-500">스마트한 솔루션</span>
            </h2>
            <p className="mt-6 text-slate-500 text-lg">
              최신 기술과 트렌드를 반영한 비즈니스 솔루션으로
              귀사의 성장을 지원합니다.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg">
                문의하기
              </button>
              <button className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg">
                더 알아보기
              </button>
            </div>
          </div>
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center text-9xl">
            💼
          </div>
        </div>
      </header>

      {/* 서비스 */}
      <section id="services" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">Our Services</h3>
          <p className="text-slate-500 text-center mb-12">전문적인 비즈니스 서비스</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📊", title: "전략 컨설팅", desc: "맞춤형 비즈니스 전략 수립" },
              { icon: "💻", title: "디지털 전환", desc: "DX 솔루션 도입 지원" },
              { icon: "📈", title: "성장 파트너", desc: "지속가능한 성장 지원" },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-xl font-bold mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 숫자 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: "10+", label: "Years" },
            { num: "200+", label: "Clients" },
            { num: "50+", label: "Projects" },
            { num: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-blue-500">{stat.num}</p>
              <p className="text-slate-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold">Get in Touch</h3>
          <p className="text-slate-400 mt-4">비즈니스 성장의 파트너가 되어드립니다</p>
          <div className="mt-8 flex justify-center gap-6 text-sm">
            <span>📧 hello@modernbiz.kr</span>
            <span>📞 02-1234-5678</span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 MODERNBIZ. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B03</strong> 모던 비즈니스</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

