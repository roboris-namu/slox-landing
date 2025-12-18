export default function TemplateP12() {
  const works = [
    { id: 1, title: "E-Commerce Platform", category: "Web", color: "bg-blue-500" },
    { id: 2, title: "Health & Fitness App", category: "Mobile", color: "bg-emerald-500" },
    { id: 3, title: "SaaS Dashboard", category: "Web", color: "bg-violet-500" },
    { id: 4, title: "Fintech Rebrand", category: "Branding", color: "bg-amber-500" },
    { id: 5, title: "Real Estate App", category: "Mobile", color: "bg-rose-500" },
    { id: 6, title: "EdTech Platform", category: "Web", color: "bg-cyan-500" },
    { id: 7, title: "Travel Guide", category: "Mobile", color: "bg-orange-500" },
    { id: 8, title: "Music Streaming", category: "Web", color: "bg-pink-500" },
    { id: 9, title: "Food Delivery", category: "Mobile", color: "bg-lime-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">GRID<span className="text-blue-500">.</span></h1>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#works" className="text-slate-600 hover:text-slate-900">Works</a>
              <a href="#about" className="text-slate-600 hover:text-slate-900">About</a>
              <a href="#contact" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-6">
              UI/UX Designer
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              안녕하세요,<br />
              <span className="text-blue-500">이그리드</span>입니다
            </h2>
            <p className="text-xl text-slate-500 mb-8">
              정돈된 그리드와 체계적인 디자인 시스템으로<br />
              사용자 경험을 설계합니다
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Available for work
              </span>
              <span>Seoul, Korea</span>
            </div>
          </div>
        </div>
      </section>

      {/* 작품 그리드 */}
      <section id="works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-bold text-slate-800">Selected Works</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg">All</button>
              <button className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-lg hover:bg-slate-100">Web</button>
              <button className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-lg hover:bg-slate-100">Mobile</button>
              <button className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-lg hover:bg-slate-100">Branding</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => (
              <div key={work.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`aspect-[4/3] ${work.color} flex items-center justify-center`}>
                  <span className="text-6xl text-white/30 font-bold">0{work.id}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{work.category}</span>
                  <h4 className="text-lg font-semibold text-slate-800 mt-1 group-hover:text-blue-500 transition-colors">
                    {work.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl flex items-center justify-center">
              <span className="text-9xl">👤</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">About Me</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                5년간 스타트업과 대기업에서 프로덕트 디자이너로 일하며 
                다양한 디지털 프로덕트를 설계해왔습니다. 사용자 중심의 
                디자인과 체계적인 디자인 시스템을 통해 비즈니스 목표를 
                달성하는 것을 추구합니다.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-500">50+</div>
                  <div className="text-sm text-slate-500">Projects</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-500">5Y</div>
                  <div className="text-sm text-slate-500">Experience</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-500">30+</div>
                  <div className="text-sm text-slate-500">Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Let&apos;s work together</h3>
          <p className="text-slate-400 mb-8">새로운 프로젝트를 함께 시작해요</p>
          <a href="mailto:grid@design.com" className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
            grid@design.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          © 2024 GRID. All rights reserved.
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P12</strong> 그리드 모던 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-900 text-sm font-bold rounded-full hover:bg-slate-100">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

