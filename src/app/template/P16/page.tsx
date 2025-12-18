export default function TemplateP16() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Redesign",
      client: "Fashion Brand",
      year: "2024",
      tags: ["UX Research", "UI Design", "Prototyping"],
      color: "bg-rose-500",
      result: "전환율 40% 향상",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      client: "Fintech Startup",
      year: "2024",
      tags: ["Mobile App", "Design System", "User Testing"],
      color: "bg-blue-500",
      result: "앱스토어 평점 4.8",
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      client: "Tech Company",
      year: "2023",
      tags: ["Web App", "Data Visualization", "Accessibility"],
      color: "bg-violet-500",
      result: "사용자 만족도 95%",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">CASE<span className="text-rose-500">.</span>STUDY</h1>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
              <a href="#projects" className="hover:text-slate-900">Projects</a>
              <a href="#process" className="hover:text-slate-900">Process</a>
              <a href="#contact" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-sm font-medium rounded-full mb-6">
              Product Designer
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              박케이스
            </h2>
            <p className="text-xl text-slate-500 mb-8 leading-relaxed">
              프로젝트별 상세한 케이스 스터디를 통해<br />
              문제 해결 과정과 결과를 보여드립니다
            </p>
          </div>
        </div>
      </section>

      {/* 프로젝트 케이스 스터디 */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-12">Featured Projects</h3>
          
          <div className="space-y-24">
            {projects.map((project, idx) => (
              <div key={project.id} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                  <div className={`aspect-[4/3] ${project.color} rounded-2xl`} />
                </div>
                <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-slate-400 text-sm">{project.year}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 text-sm">{project.client}</span>
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">{project.title}</h4>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    사용자 조사부터 최종 디자인까지 전 과정을 담당했습니다.
                    데이터 기반의 의사결정과 반복적인 테스트를 통해 
                    비즈니스 목표를 달성했습니다.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-200 text-slate-600 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      ✓ {project.result}
                    </div>
                    <button className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                      자세히 보기 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로세스 */}
      <section id="process" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-12 text-center">My Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Research", desc: "사용자 조사 및 분석" },
              { step: "02", title: "Ideate", desc: "아이디어 도출" },
              { step: "03", title: "Design", desc: "프로토타입 제작" },
              { step: "04", title: "Test", desc: "검증 및 개선" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-slate-400">{item.step}</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Let&apos;s discuss your project</h3>
          <p className="text-slate-400 mb-8">새로운 프로젝트에 대해 이야기해요</p>
          <a href="mailto:case@study.com" className="inline-block px-8 py-4 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors">
            case@study.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
          © 2024 CASE STUDY. All rights reserved.
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P16</strong> 케이스 스터디 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full hover:bg-rose-50">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

