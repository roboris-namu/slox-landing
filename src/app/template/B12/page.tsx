export default function TemplateB12() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">박컨설턴트</h1>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-40 h-40 bg-amber-500 rounded-2xl flex items-center justify-center text-6xl shadow-xl">
              👨‍💼
            </div>
            <div>
              <p className="text-amber-400 font-medium">Business Consultant</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                비즈니스 성장의 파트너
              </h2>
              <p className="text-slate-300 mt-4">
                15년 경력의 경영 컨설턴트 박컨설턴트입니다.<br />
                스타트업부터 중견기업까지, 맞춤 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 전문 분야 */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">전문 분야</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📊", title: "경영 전략", desc: "사업 방향 설정 및 실행 계획 수립" },
              { icon: "💰", title: "재무 컨설팅", desc: "재무 구조 개선 및 투자 유치" },
              { icon: "🚀", title: "성장 전략", desc: "스케일업 및 시장 확대 전략" },
              { icon: "👥", title: "조직 컨설팅", desc: "조직 문화 및 인사 전략" },
            ].map((s) => (
              <div key={s.title} className="p-6 border rounded-xl hover:border-amber-500 transition-colors">
                <span className="text-3xl">{s.icon}</span>
                <h4 className="font-bold mt-4">{s.title}</h4>
                <p className="text-slate-500 mt-2 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실적 */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">컨설팅 실적</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "100+", label: "프로젝트" },
              { num: "15년", label: "경력" },
              { num: "50+", label: "고객사" },
              { num: "95%", label: "재계약률" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-amber-500">{stat.num}</p>
                <p className="text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold">상담 문의</h3>
          <p className="text-slate-400 mt-2">첫 상담은 무료입니다</p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <span>📧 park.consultant@email.com</span>
            <span>📞 010-1234-5678</span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 박컨설턴트. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B12</strong> 컨설턴트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-amber-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

