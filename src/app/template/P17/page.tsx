export default function TemplateP17() {
  return (
    <div className="min-h-screen bg-amber-50 text-zinc-900">
      {/* 헤더 - 비대칭 */}
      <header className="p-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black">CREATIVE</h1>
          <p className="text-sm text-zinc-500">Portfolio 2024</p>
        </div>
        <nav className="text-right text-sm">
          <a href="#works" className="block hover:underline">Works</a>
          <a href="#about" className="block hover:underline mt-2">About</a>
          <a href="#contact" className="block hover:underline mt-2">Contact</a>
        </nav>
      </header>

      {/* 히어로 - 비대칭 레이아웃 */}
      <section className="px-8 py-16">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <h2 className="text-7xl md:text-9xl font-black leading-[0.85] mb-8">
              최크리<br />에이티브
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-lg text-zinc-600 mb-4">
              비대칭과 예상치 못한 배치로<br />
              창의적인 시각적 경험을 만듭니다
            </p>
            <div className="w-24 h-24 bg-rose-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* 작품 - 창의적 비대칭 그리드 */}
      <section id="works" className="px-8 py-24">
        <div className="grid md:grid-cols-12 gap-4">
          {/* 큰 카드 */}
          <div className="md:col-span-8 md:row-span-2">
            <div className="h-full min-h-[400px] bg-zinc-900 rounded-3xl p-8 flex flex-col justify-end">
              <span className="text-zinc-500 text-sm">01</span>
              <h3 className="text-white text-3xl font-bold mt-2">Brand Identity</h3>
            </div>
          </div>
          
          {/* 작은 카드들 */}
          <div className="md:col-span-4">
            <div className="h-48 bg-rose-400 rounded-3xl p-6 flex flex-col justify-end">
              <span className="text-rose-900 text-sm">02</span>
              <h3 className="text-white text-xl font-bold mt-1">Packaging</h3>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="h-48 bg-amber-400 rounded-3xl p-6 flex flex-col justify-end">
              <span className="text-amber-900 text-sm">03</span>
              <h3 className="text-zinc-900 text-xl font-bold mt-1">Editorial</h3>
            </div>
          </div>

          {/* 중간 크기 */}
          <div className="md:col-span-5">
            <div className="h-64 bg-sky-400 rounded-3xl p-6 flex flex-col justify-end">
              <span className="text-sky-900 text-sm">04</span>
              <h3 className="text-white text-2xl font-bold mt-1">Web Design</h3>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="h-64 bg-violet-600 rounded-3xl p-6 flex flex-col justify-end">
              <span className="text-violet-300 text-sm">05</span>
              <h3 className="text-white text-2xl font-bold mt-1">App Design</h3>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="h-64 bg-emerald-400 rounded-3xl p-6 flex flex-col justify-end">
              <span className="text-emerald-900 text-sm">06</span>
              <h3 className="text-zinc-900 text-xl font-bold mt-1">Motion</h3>
            </div>
          </div>
        </div>
      </section>

      {/* About - 비대칭 */}
      <section id="about" className="px-8 py-24">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 md:col-start-2">
            <h3 className="text-6xl font-black mb-8">About</h3>
          </div>
          <div className="md:col-span-5">
            <p className="text-xl text-zinc-600 leading-relaxed mb-8">
              규칙을 깨고 새로운 시각적 언어를 만듭니다.
              비대칭 레이아웃과 대담한 타이포그래피로
              기억에 남는 디자인을 추구합니다.
            </p>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center text-white text-xs">
                10Y+<br />EXP
              </div>
              <div className="w-20 h-20 bg-rose-400 rounded-full flex items-center justify-center text-white text-xs">
                100+<br />WORKS
              </div>
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center text-zinc-900 text-xs">
                30+<br />AWARDS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="px-8 py-16 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-zinc-500 text-sm mb-8 text-center">TRUSTED BY</p>
          <div className="flex flex-wrap justify-center gap-12 text-zinc-400 text-xl font-bold">
            <span>APPLE</span>
            <span>NIKE</span>
            <span>GOOGLE</span>
            <span>SAMSUNG</span>
            <span>SONY</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-32">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <h3 className="text-6xl md:text-8xl font-black leading-[0.9]">
              Let&apos;s<br />work<br />together
            </h3>
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <p className="text-zinc-600 mb-8">
              새로운 프로젝트에 대해<br />
              이야기 나눠요
            </p>
            <a 
              href="mailto:creative@studio.com" 
              className="inline-block px-8 py-4 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition-colors"
            >
              creative@studio.com
            </a>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="px-8 py-8 border-t border-zinc-200">
        <div className="flex justify-between text-sm text-zinc-500">
          <span>© 2024 CREATIVE</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-900">Instagram</a>
            <a href="#" className="hover:text-zinc-900">Behance</a>
            <a href="#" className="hover:text-zinc-900">Dribbble</a>
          </div>
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P17</strong> 크리에이티브 비대칭 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-amber-400 text-zinc-900 text-sm font-bold rounded-full hover:bg-amber-300">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

