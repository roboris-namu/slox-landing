export default function TemplateP10() {
  const works = [
    { id: 1, title: "브랜드 리디자인", category: "Branding", image: "🎨" },
    { id: 2, title: "웹사이트 디자인", category: "Web Design", image: "💻" },
    { id: 3, title: "모바일 앱 UI", category: "App Design", image: "📱" },
    { id: 4, title: "패키지 디자인", category: "Packaging", image: "📦" },
    { id: 5, title: "일러스트레이션", category: "Illustration", image: "🖼️" },
    { id: 6, title: "포토그래피", category: "Photography", image: "📷" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">GALLERY</h1>
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
              <a href="#works" className="hover:text-gray-900">Works</a>
              <a href="#about" className="hover:text-gray-900">About</a>
              <a href="#contact" className="hover:text-gray-900">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-4">Creative Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            김창작
          </h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            디자인으로 세상을 더 아름답게 만듭니다
          </p>
        </div>
      </section>

      {/* 작품 갤러리 */}
      <section id="works" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <div key={work.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center text-8xl transition-transform duration-500 group-hover:scale-105">
                  {work.image}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{work.category}</p>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {work.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-light text-gray-900 mb-6">About Me</h3>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            10년 이상의 경력을 가진 크리에이티브 디렉터입니다. 
            브랜딩, 웹 디자인, 패키지 디자인 등 다양한 분야에서 
            클라이언트의 비전을 현실로 만들어왔습니다.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-light text-gray-900 mb-6">Let&apos;s Work Together</h3>
          <p className="text-gray-500 mb-8">새로운 프로젝트를 시작해보세요</p>
          <a href="mailto:hello@gallery.com" className="inline-block px-8 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
            hello@gallery.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
          © 2024 Gallery. All rights reserved.
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P10</strong> 갤러리 화이트 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full hover:bg-gray-100">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

