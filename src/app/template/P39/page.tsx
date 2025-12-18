export default function TemplateP39() {
  const skills = [
    { name: "Frontend", items: ["React", "Vue", "TypeScript"], icon: "🎨" },
    { name: "Backend", items: ["Node.js", "Python", "Go"], icon: "⚙️" },
    { name: "Database", items: ["PostgreSQL", "MongoDB", "Redis"], icon: "💾" },
    { name: "DevOps", items: ["Docker", "K8s", "AWS"], icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="border-b border-slate-800 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white">🚀 TECH.DEV</span>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm mb-6">
            Available for hire
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            안녕하세요,<br />
            <span className="text-blue-400">이테크</span>입니다
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            풀스택 개발자로서 최신 기술 스택을 활용해 확장 가능한 
            웹 애플리케이션을 개발합니다.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
              Contact Me
            </a>
            <a href="#" className="px-6 py-3 border border-slate-700 text-slate-300 rounded-lg font-medium hover:border-slate-500">
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* 스킬 */}
      <section id="skills" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category) => (
              <div key={category.name} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <span className="text-3xl mb-4 block">{category.icon}</span>
                <h3 className="text-lg font-bold text-white mb-3">{category.name}</h3>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <span key={item} className="block text-slate-400 text-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 경험 */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
          <div className="space-y-6">
            {[
              { company: "Tech Corp", role: "Senior Full-stack Developer", period: "2022 - Present" },
              { company: "Startup Inc", role: "Full-stack Developer", period: "2020 - 2022" },
              { company: "Agency", role: "Web Developer", period: "2018 - 2020" },
            ].map((exp) => (
              <div key={exp.company} className="flex justify-between items-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                  <p className="text-blue-400">{exp.role}</p>
                </div>
                <span className="text-slate-500">{exp.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s work together</h2>
          <p className="text-blue-100 mb-8">새로운 프로젝트에 대해 이야기해요</p>
          <a href="mailto:tech@dev.io" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50">
            tech@dev.io
          </a>
        </div>
      </section>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P39</strong> 테크 모던</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

