export default function TemplateB16() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-mono text-green-400">{"<dev.choi />"}</h1>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-green-400 font-mono">{"// Freelance Developer"}</p>
          <h2 className="text-4xl font-bold mt-4">
            코드로 아이디어를<br />현실로 만듭니다
          </h2>
          <p className="text-slate-400 mt-6 text-lg">
            풀스택 개발자 최개발 | 7년 경력
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-green-500 text-slate-900 font-bold rounded-lg">
              프로젝트 문의
            </button>
            <button className="px-6 py-3 border border-slate-600 rounded-lg">
              GitHub →
            </button>
          </div>
        </div>
      </header>

      {/* 기술 스택 */}
      <section id="skills" className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-slate-800 rounded-lg text-green-400 font-mono text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "웹 개발", price: "300만원~", icon: "🌐" },
              { title: "앱 개발", price: "500만원~", icon: "📱" },
              { title: "유지보수", price: "월 50만원~", icon: "🔧" },
            ].map((s) => (
              <div key={s.title} className="p-6 bg-slate-800 rounded-xl">
                <span className="text-3xl">{s.icon}</span>
                <h4 className="font-bold mt-4">{s.title}</h4>
                <p className="text-green-400 mt-2">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 */}
      <section id="projects" className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6">Recent Projects</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "E-commerce 플랫폼", tech: "Next.js, PostgreSQL" },
              { name: "SaaS 대시보드", tech: "React, Node.js" },
              { name: "모바일 앱", tech: "React Native" },
              { name: "AI 챗봇", tech: "Python, OpenAI" },
            ].map((p) => (
              <div key={p.name} className="p-4 bg-slate-800 rounded-lg">
                <p className="font-bold">{p.name}</p>
                <p className="text-slate-400 text-sm mt-1">{p.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-green-500 text-slate-900 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">함께 만들어요</h3>
          <p className="mt-4">📧 dev.choi@email.com | 💬 @dev_choi</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-600 text-sm">
        <p>© 2024 dev.choi. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-slate-900 py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold"><strong>B16</strong> 개발자</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-slate-900 text-green-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

