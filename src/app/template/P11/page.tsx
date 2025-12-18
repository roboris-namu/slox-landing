export default function TemplateP11() {
  const works = [
    { id: 1, title: "NOIR COLLECTION", category: "Fashion", image: "🖤" },
    { id: 2, title: "MIDNIGHT BRAND", category: "Branding", image: "🌙" },
    { id: 3, title: "SHADOW STUDIO", category: "Interior", image: "🏢" },
    { id: 4, title: "DARK AESTHETICS", category: "Art Direction", image: "🎭" },
    { id: 5, title: "MONOCHROME", category: "Photography", image: "📸" },
    { id: 6, title: "ECLIPSE", category: "Product", image: "⚫" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-widest">DARKFOLIO</h1>
            <div className="hidden md:flex items-center gap-10 text-sm text-zinc-400">
              <a href="#works" className="hover:text-white transition-colors">WORKS</a>
              <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
              <a href="#contact" className="px-5 py-2 border border-zinc-700 hover:bg-zinc-800 transition-colors">CONTACT</a>
            </div>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-zinc-500 tracking-[0.3em] text-sm mb-6">CREATIVE DIRECTOR</p>
          <h2 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
            박다크
          </h2>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            어둠 속에서 빛나는 디자인
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <div className="w-12 h-[1px] bg-zinc-700 self-center" />
            <span className="text-zinc-600 text-sm">SCROLL</span>
            <div className="w-12 h-[1px] bg-zinc-700 self-center" />
          </div>
        </div>
      </section>

      {/* 작품 갤러리 */}
      <section id="works" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {works.map((work, idx) => (
              <div key={work.id} className={`group ${idx % 2 === 1 ? 'md:mt-24' : ''}`}>
                <div className="aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 flex items-center justify-center text-9xl relative">
                  {work.image}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-zinc-600 text-xs tracking-widest mb-2">{work.category}</p>
                    <h3 className="text-xl font-light">{work.title}</h3>
                  </div>
                  <span className="text-zinc-600 text-sm">0{work.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-zinc-600 text-xs tracking-widest mb-4">ABOUT</p>
              <h3 className="text-4xl font-light mb-6">Who I Am</h3>
            </div>
            <div>
              <p className="text-zinc-400 leading-relaxed mb-8">
                다크 테마와 미니멀리즘을 추구하는 디자이너입니다. 
                10년간 럭셔리 브랜드와 하이엔드 프로젝트를 담당하며 
                독특한 시각적 언어를 발전시켜왔습니다.
              </p>
              <div className="flex gap-8 text-zinc-500 text-sm">
                <span>Est. 2014</span>
                <span>Seoul, Korea</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-zinc-600 text-xs tracking-widest mb-4">CONTACT</p>
          <h3 className="text-4xl font-light mb-8">Let&apos;s Create</h3>
          <a href="mailto:dark@folio.com" className="text-xl text-zinc-400 hover:text-white transition-colors">
            dark@folio.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-8 flex justify-between text-sm text-zinc-600">
          <span>© 2024 DARKFOLIO</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Behance</a>
          </div>
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-zinc-900 py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P11</strong> 갤러리 다크 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-zinc-900 text-white text-sm font-bold rounded-full hover:bg-zinc-800">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

