export default function TemplateB17() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">📈 MarketingPro</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#services">Services</a>
            <a href="#results">Results</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-5xl shadow-xl">
            👩‍💼
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-8">
            마케팅으로 성장을 만듭니다
          </h2>
          <p className="text-indigo-100 mt-4">
            퍼포먼스 마케팅 전문가 | 10년 경력 | 100+ 브랜드 성장 경험
          </p>
        </div>
      </header>

      {/* 서비스 */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "SNS 마케팅", desc: "인스타, 페이스북, 틱톡" },
              { icon: "🔍", title: "검색 광고", desc: "네이버, 구글 광고" },
              { icon: "📊", title: "퍼포먼스", desc: "ROAS 최적화 전략" },
            ].map((s) => (
              <div key={s.title} className="p-6 border rounded-xl text-center hover:border-indigo-400 transition-colors">
                <span className="text-4xl">{s.icon}</span>
                <h4 className="font-bold mt-4">{s.title}</h4>
                <p className="text-slate-500 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실적 */}
      <section id="results" className="py-16 px-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "300%", label: "평균 ROAS" },
              { num: "100+", label: "프로젝트" },
              { num: "50억+", label: "광고 집행" },
              { num: "95%", label: "재계약률" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-indigo-600">{stat.num}</p>
                <p className="text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Pricing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-xl">
              <h4 className="font-bold text-lg">컨설팅</h4>
              <p className="text-indigo-600 text-2xl font-bold mt-2">월 100만원~</p>
              <p className="text-slate-500 text-sm mt-2">마케팅 전략 수립 및 자문</p>
            </div>
            <div className="p-6 border rounded-xl">
              <h4 className="font-bold text-lg">대행</h4>
              <p className="text-indigo-600 text-2xl font-bold mt-2">월 200만원~</p>
              <p className="text-slate-500 text-sm mt-2">광고 운영 및 최적화</p>
            </div>
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">무료 상담 신청</h3>
          <p className="mt-4 text-indigo-100">30분 무료 컨설팅 제공</p>
          <p className="mt-6">📧 marketing.pro@email.com | 📞 010-1234-5678</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 MarketingPro. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B17</strong> 마케터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-indigo-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

