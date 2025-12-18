export default function TemplateP44() {
  const stack = {
    frontend: ["React", "Vue", "TypeScript", "Tailwind"],
    backend: ["Node.js", "Python", "Go", "GraphQL"],
    database: ["PostgreSQL", "MongoDB", "Redis"],
    devops: ["Docker", "K8s", "AWS", "GCP"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 헤더 */}
      <header className="py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white">🔧 FULLSTACK.DEV</span>
          <nav className="flex gap-6 text-sm text-purple-300">
            <a href="#stack" className="hover:text-white">Stack</a>
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-8 flex items-center justify-center text-6xl shadow-2xl shadow-purple-500/30">
            🔧
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            안녕, 저는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">윤풀스택</span>
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Frontend부터 Backend, DevOps까지 전 영역을 커버합니다
          </p>
          <div className="flex justify-center gap-4">
            <a href="#contact" className="px-6 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-100">
              연락하기
            </a>
            <a href="#stack" className="px-6 py-3 border border-purple-500 text-purple-300 rounded-xl hover:bg-purple-500/20">
              기술 스택 보기
            </a>
          </div>
        </div>
      </section>

      {/* 스택 */}
      <section id="stack" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Full Stack</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(stack).map(([category, techs]) => (
              <div key={category} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 capitalize">{category}</h3>
                <div className="space-y-2">
                  {techs.map((tech) => (
                    <div key={tech} className="px-3 py-2 bg-white/5 rounded-lg text-purple-200 text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 경력 */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Experience</h2>
          <div className="space-y-6">
            {[
              { company: "Tech Startup", role: "Lead Full-stack Developer", period: "2022 - Present", highlight: true },
              { company: "IT Company", role: "Full-stack Developer", period: "2020 - 2022", highlight: false },
              { company: "Agency", role: "Web Developer", period: "2018 - 2020", highlight: false },
            ].map((exp) => (
              <div
                key={exp.company}
                className={`p-6 rounded-2xl border ${
                  exp.highlight
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <p className="text-purple-300">{exp.role}</p>
                  </div>
                  <span className="text-purple-400">{exp.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">함께 만들어요</h2>
          <p className="text-purple-300 mb-8">새로운 프로젝트에 대해 이야기해요</p>
          <a href="mailto:fullstack@dev.io" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90">
            fullstack@dev.io
          </a>
        </div>
      </section>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P44</strong> 풀스택 개발자</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

