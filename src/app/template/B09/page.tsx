export default function TemplateB09() {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-700">💚 그린임팩트</h1>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#mission">미션</a>
            <a href="#impact">임팩트</a>
            <a href="#join">함께하기</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            지속가능한 미래를 만듭니다
          </h2>
          <p className="mt-6 text-emerald-100 text-lg max-w-2xl mx-auto">
            환경과 사회, 그리고 사람을 위한 가치를 창출하는
            사회적 기업 그린임팩트입니다.
          </p>
        </div>
      </header>

      {/* 미션 */}
      <section id="mission" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-emerald-800 mb-12">Our Mission</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🌱", title: "환경 보호", desc: "탄소중립 실천과 자원 순환" },
              { icon: "🤝", title: "사회 공헌", desc: "취약계층 일자리 창출" },
              { icon: "💚", title: "지속가능성", desc: "미래 세대를 위한 가치" },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <span className="text-5xl">{item.icon}</span>
                <h4 className="text-xl font-bold text-emerald-800 mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 임팩트 */}
      <section id="impact" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-emerald-800 mb-12">Our Impact</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500톤", label: "CO2 절감" },
              { num: "120명", label: "일자리 창출" },
              { num: "10만개", label: "업사이클 제품" },
              { num: "50개", label: "파트너 기업" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 bg-emerald-50 rounded-xl">
                <p className="text-3xl font-bold text-emerald-600">{stat.num}</p>
                <p className="text-slate-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사업 영역 */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-emerald-800 mb-8">Business Areas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "♻️ 업사이클 제품", desc: "폐자원을 활용한 친환경 제품 생산" },
              { title: "🌿 친환경 컨설팅", desc: "기업 ESG 경영 컨설팅" },
              { title: "📚 환경 교육", desc: "학교/기업 대상 환경 교육 프로그램" },
              { title: "🏪 에코 스토어", desc: "친환경 제품 유통" },
            ].map((biz) => (
              <div key={biz.title} className="bg-white p-6 rounded-xl border border-emerald-200">
                <h4 className="text-lg font-bold text-emerald-800">{biz.title}</h4>
                <p className="text-slate-500 mt-2">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 인증 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-xl font-bold text-emerald-800 mb-6">인증 현황</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["사회적기업 인증", "B-Corp 인증", "ISO 14001", "탄소중립 인증"].map((cert) => (
              <span key={cert} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                ✓ {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 함께하기 */}
      <section id="join" className="py-20 px-6 bg-emerald-700 text-white text-center">
        <h3 className="text-3xl font-bold">함께 변화를 만들어요</h3>
        <p className="mt-4 text-emerald-100">파트너, 후원자, 자원봉사자를 찾습니다</p>
        <button className="mt-8 px-8 py-3 bg-white text-emerald-700 font-bold rounded-full">
          참여하기
        </button>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 그린임팩트. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-700 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B09</strong> 사회적 기업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

