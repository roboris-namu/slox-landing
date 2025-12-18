export default function TemplateP18() {
  const works = [
    { id: 1, title: "Brand Identity" },
    { id: 2, title: "Web Design" },
    { id: 3, title: "Photography" },
    { id: 4, title: "Motion" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* 헤더 */}
      <header className="py-16 px-8 md:px-16">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl tracking-[0.2em] font-light">MINIMAL</h1>
          <div className="hidden md:flex gap-12 text-sm text-neutral-500">
            <a href="#works" className="hover:text-neutral-900">Works</a>
            <a href="#about" className="hover:text-neutral-900">About</a>
            <a href="#contact" className="hover:text-neutral-900">Contact</a>
          </div>
        </nav>
      </header>

      {/* 히어로 - 극도의 미니멀 */}
      <section className="px-8 md:px-16 py-24">
        <h2 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
          이미니멀
        </h2>
        <div className="w-24 h-[1px] bg-neutral-400 mb-8" />
        <p className="text-neutral-500 text-lg max-w-md font-light">
          Less is more.<br />
          여백의 미학을 추구합니다.
        </p>
      </section>

      {/* 작품 - 미니멀 갤러리 */}
      <section id="works" className="px-8 md:px-16 py-24">
        <div className="space-y-32">
          {works.map((work, idx) => (
            <div key={work.id} className={`grid md:grid-cols-12 gap-8 items-center ${idx % 2 === 1 ? "" : ""}`}>
              <div className={`${idx % 2 === 0 ? "md:col-span-7" : "md:col-span-7 md:col-start-6"}`}>
                <div className="aspect-[16/10] bg-neutral-200 group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500" />
                </div>
              </div>
              <div className={`${idx % 2 === 0 ? "md:col-span-3 md:col-start-9" : "md:col-span-3 md:col-start-2 md:row-start-1"}`}>
                <span className="text-neutral-400 text-sm font-light">0{work.id}</span>
                <h3 className="text-2xl font-light mt-2">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 md:px-16 py-32 bg-neutral-200/50">
        <div className="max-w-3xl">
          <p className="text-sm text-neutral-400 tracking-[0.2em] mb-8">ABOUT</p>
          <h3 className="text-4xl md:text-5xl font-extralight leading-relaxed mb-12">
            불필요한 것을 덜어내고<br />
            본질에 집중합니다
          </h3>
          <p className="text-neutral-500 font-light leading-relaxed max-w-xl">
            10년간 미니멀리즘 디자인을 추구해왔습니다.
            여백은 비어있는 것이 아니라, 
            의미로 가득 찬 공간입니다.
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="px-8 md:px-16 py-24">
        <div className="grid md:grid-cols-3 gap-16">
          <div>
            <p className="text-sm text-neutral-400 mb-4">Services</p>
            <ul className="text-neutral-600 font-light space-y-2">
              <li>Brand Identity</li>
              <li>Web Design</li>
              <li>Art Direction</li>
              <li>Photography</li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-4">Clients</p>
            <ul className="text-neutral-600 font-light space-y-2">
              <li>Apple</li>
              <li>Aesop</li>
              <li>Muji</li>
              <li>Bang & Olufsen</li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-4">Awards</p>
            <ul className="text-neutral-600 font-light space-y-2">
              <li>Awwwards SOTD</li>
              <li>FWA</li>
              <li>CSS Design Awards</li>
              <li>Red Dot Design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-16 py-32 bg-neutral-900 text-white">
        <div className="max-w-2xl">
          <p className="text-sm text-neutral-500 tracking-[0.2em] mb-8">CONTACT</p>
          <h3 className="text-4xl md:text-5xl font-extralight mb-12">
            함께 만들어요
          </h3>
          <a 
            href="mailto:minimal@gallery.com" 
            className="text-2xl font-light text-neutral-400 hover:text-white transition-colors"
          >
            minimal@gallery.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="px-8 md:px-16 py-8 bg-neutral-900 border-t border-neutral-800">
        <div className="flex justify-between text-sm text-neutral-600">
          <span>© 2024</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neutral-400">Instagram</a>
            <a href="#" className="hover:text-neutral-400">Behance</a>
          </div>
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-neutral-900 py-3 px-4 z-50 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P18</strong> 미니멀 갤러리 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-bold rounded-full hover:bg-neutral-800">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

