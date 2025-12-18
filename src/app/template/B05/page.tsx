export default function TemplateB05() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-6 px-6 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">CONSULT<span className="text-amber-500">PRO</span></h1>
          <div className="hidden md:flex gap-8 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            비즈니스 성공을 위한<br />
            <span className="text-amber-400">전략적 파트너</span>
          </h2>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
            20년간 축적된 노하우로 귀사의 성장 전략을 함께 수립합니다.
            경영, 재무, 마케팅 전 분야 컨설팅 서비스
          </p>
        </div>
      </header>

      {/* 서비스 */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-4">Consulting Services</h3>
          <p className="text-slate-500 text-center mb-12">전문 분야별 맞춤 컨설팅</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "📊", title: "경영전략", desc: "사업 방향 수립" },
              { icon: "💰", title: "재무/회계", desc: "재무 최적화" },
              { icon: "📈", title: "마케팅", desc: "브랜드 전략" },
              { icon: "👥", title: "HR", desc: "인사 컨설팅" },
            ].map((item) => (
              <div key={item.title} className="p-6 border rounded-xl hover:border-amber-500 hover:shadow-lg transition-all text-center">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-lg font-bold mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실적 */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: "20+", label: "Years" },
            { num: "500+", label: "Projects" },
            { num: "15+", label: "Experts" },
            { num: "95%", label: "Success" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-amber-600">{stat.num}</p>
              <p className="text-slate-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 고객사 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">Trusted By</h3>
          <div className="flex flex-wrap justify-center gap-8 text-4xl">
            {["🏢", "🏦", "🏭", "🏬", "🏪", "🏨"].map((emoji, i) => (
              <span key={i} className="opacity-50">{emoji}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <h3 className="text-3xl font-bold">전문 컨설턴트와 상담하세요</h3>
        <p className="text-slate-400 mt-4">첫 상담은 무료입니다</p>
        <button className="mt-8 px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg">
          무료 상담 신청
        </button>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 CONSULTPRO. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B05</strong> 컨설팅 펌</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

