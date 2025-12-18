export default function TemplateB10() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">김프로</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-7xl shadow-xl">
            👨‍💼
          </div>
          <div>
            <p className="text-blue-600 font-medium">Freelance Professional</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">안녕하세요, 김프로입니다</h2>
            <p className="text-slate-500 mt-4 text-lg">
              10년 경력의 프로젝트 매니저 | 스타트업 성장 전문가
            </p>
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg">
                프로젝트 문의
              </button>
              <button className="px-6 py-3 border border-slate-300 rounded-lg">
                포트폴리오
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 서비스 */}
      <section id="services" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">제공 서비스</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📋", title: "프로젝트 관리", desc: "일정/리소스 최적화" },
              { icon: "🎯", title: "전략 수립", desc: "비즈니스 전략 컨설팅" },
              { icon: "📈", title: "성과 분석", desc: "KPI 설정 및 분석" },
            ].map((s) => (
              <div key={s.title} className="p-6 bg-slate-50 rounded-xl">
                <span className="text-3xl">{s.icon}</span>
                <h4 className="font-bold mt-4">{s.title}</h4>
                <p className="text-slate-500 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 경력 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">주요 경력</h3>
          <div className="space-y-4">
            {[
              { period: "2020-현재", title: "프리랜서 PM", company: "다수 스타트업" },
              { period: "2017-2020", title: "시니어 PM", company: "테크스타트업(주)" },
              { period: "2014-2017", title: "PM", company: "IT컨설팅(주)" },
            ].map((exp) => (
              <div key={exp.period} className="flex gap-6 p-4 bg-white rounded-lg border">
                <span className="text-blue-600 font-medium w-28">{exp.period}</span>
                <div>
                  <p className="font-bold">{exp.title}</p>
                  <p className="text-slate-500 text-sm">{exp.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">함께 일해요</h3>
          <p className="mt-4 text-blue-100">프로젝트 문의는 언제든 환영합니다</p>
          <p className="mt-6">📧 kim.pro@email.com | 📞 010-1234-5678</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 김프로. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B10</strong> 프리랜서 프로</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

