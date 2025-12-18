export default function TemplateB04() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-cyan-400">&lt;TechCorp /&gt;</h1>
          <div className="hidden md:flex gap-6 text-sm text-slate-400">
            <a href="#about">About</a>
            <a href="#solutions">Solutions</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-cyan-400 text-sm font-mono">{"// 혁신을 코딩하다"}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            기술로 만드는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              더 나은 미래
            </span>
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-xl">
            AI, 클라우드, 빅데이터 전문 IT 기업
            TechCorp와 함께 디지털 혁신을 시작하세요.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg">
              솔루션 보기
            </button>
            <button className="px-6 py-3 border border-slate-600 text-white rounded-lg">
              문의하기
            </button>
          </div>
        </div>
      </header>

      {/* 기술 스택 */}
      <section className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Tech Stack</h3>
          <div className="flex flex-wrap gap-4">
            {["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "TensorFlow", "PostgreSQL"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-slate-800 rounded-lg text-cyan-400 font-mono text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 솔루션 */}
      <section id="solutions" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-12">Our Solutions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI/ML", desc: "인공지능 솔루션 개발" },
              { icon: "☁️", title: "Cloud", desc: "클라우드 인프라 구축" },
              { icon: "📊", title: "Data", desc: "빅데이터 분석 플랫폼" },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-xl font-bold mt-4 text-cyan-400">{item.title}</h4>
                <p className="text-slate-400 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실적 */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: "50+", label: "엔지니어" },
            { num: "100+", label: "프로젝트" },
            { num: "99.9%", label: "가동률" },
            { num: "24/7", label: "기술지원" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-cyan-400">{stat.num}</p>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold">Contact</h3>
          <p className="text-slate-400 mt-4">tech@techcorp.kr | 02-1234-5678</p>
          <p className="text-slate-500 mt-2 text-sm">서울시 강남구 테헤란로 123 테크빌딩</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2024 TechCorp. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-cyan-500 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B04</strong> 테크 기업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-cyan-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

