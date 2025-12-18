export default function TemplateP45() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-4 px-6 border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold">⚡ STARTUP.DEV</span>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#projects" className="hover:text-gray-900">Projects</a>
            <a href="#contact" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Hire Me</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                🟢 Available for new projects
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                스타트업과 함께<br />
                성장하는 개발자
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                0→1을 만들어본 경험이 있습니다.<br />
                빠른 실행력과 문제해결 능력을 갖췄습니다.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800">
                  프로젝트 문의
                </a>
                <a href="#projects" className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:border-gray-400">
                  프로젝트 보기
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center text-8xl shadow-2xl">
                ⚡
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 스탯 */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "3", label: "스타트업 경험" },
              { value: "1", label: "Exit 경험" },
              { value: "10+", label: "프로젝트" },
              { value: "5Y", label: "경력" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "E-Commerce MVP", role: "Lead Developer", result: "Series A 투자 유치", color: "bg-blue-500" },
              { name: "SaaS Dashboard", role: "Full-stack", result: "MAU 10만 달성", color: "bg-emerald-500" },
              { name: "Mobile App", role: "Frontend Lead", result: "앱스토어 1위", color: "bg-violet-500" },
              { name: "AI Chatbot", role: "Backend", result: "기업 5곳 도입", color: "bg-orange-500" },
            ].map((project) => (
              <div key={project.name} className="group p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className={`w-12 h-12 ${project.color} rounded-xl mb-4 flex items-center justify-center text-white text-xl`}>
                  🚀
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{project.role}</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {project.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 스킬 */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Firebase"].map((tech) => (
              <span key={tech} className="px-5 py-2 bg-white/10 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">같이 만들어요</h2>
          <p className="text-gray-600 mb-8">스타트업 MVP, 신규 서비스 개발 문의 환영합니다</p>
          <a href="mailto:startup@dev.io" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90">
            startup@dev.io
          </a>
        </div>
      </section>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P45</strong> 스타트업 개발자</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

