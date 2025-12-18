export default function TemplateP43() {
  const projects = [
    { name: "react-awesome-lib", desc: "A React component library", stars: "2.3k", npm: "50k/week" },
    { name: "node-cli-toolkit", desc: "CLI tools for Node.js", stars: "1.1k", npm: "20k/week" },
    { name: "typescript-utils", desc: "TypeScript utility functions", stars: "890", npm: "15k/week" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold">📦 OPENSOURCE.DEV</span>
          <nav className="flex gap-6 text-sm text-gray-600">
            <a href="#projects" className="hover:text-gray-900">Projects</a>
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-6xl mb-6 block">👨‍💻</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            이오픈소스
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Open Source Developer & Maintainer
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-gray-100 rounded-full">⭐ 10k+ GitHub Stars</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full">📦 5M+ NPM Downloads</span>
          </div>
        </div>
      </section>

      {/* 프로젝트 */}
      <section id="projects" className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Source Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.name} className="bg-white rounded-xl p-6 border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    📦 {project.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{project.desc}</p>
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>⭐ {project.stars}</span>
                  <span>📥 {project.npm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">About</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                오픈소스 생태계에 기여하는 것을 즐깁니다.
                여러 인기 라이브러리를 개발하고 유지보수하며,
                개발자 커뮤니티에 기여하고 있습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Node.js", "Rust", "Go"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">GitHub Stars</span>
                  <span className="font-bold">10,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">NPM Downloads</span>
                  <span className="font-bold">5.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contributors</span>
                  <span className="font-bold">120+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-8">오픈소스 협업 또는 문의는 이메일로 연락주세요</p>
          <a href="mailto:opensource@dev.io" className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100">
            opensource@dev.io
          </a>
        </div>
      </section>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P43</strong> 오픈소스 프로필</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

