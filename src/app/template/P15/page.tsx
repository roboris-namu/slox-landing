export default function TemplateP15() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* 히어로 - 전체 화면 */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="text-center">
          <p className="text-neutral-500 tracking-[0.5em] text-sm mb-8">CREATIVE STORYTELLER</p>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            김스토리
          </h1>
          <p className="text-xl text-neutral-400 max-w-xl mx-auto">
            스크롤을 내리며 저의 이야기를 들어보세요
          </p>
        </div>
        
        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-neutral-600 text-xs tracking-widest">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-600 to-transparent animate-pulse" />
        </div>
      </section>

      {/* 스토리 1 */}
      <section className="min-h-screen flex items-center py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-video bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg" />
          <div>
            <span className="text-cyan-400 font-mono text-sm">01 — THE BEGINNING</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">시작</h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              2015년, 작은 스튜디오에서 시작한 저의 여정입니다.
              디자인에 대한 열정 하나로 수많은 프로젝트를 진행하며
              성장해왔습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 스토리 2 */}
      <section className="min-h-screen flex items-center py-24 px-6 bg-neutral-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-amber-400 font-mono text-sm">02 — THE JOURNEY</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">여정</h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              글로벌 에이전시, 스타트업, 대기업까지.
              다양한 환경에서 쌓은 경험이 저만의 
              디자인 언어를 만들어주었습니다.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-video bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg" />
        </div>
      </section>

      {/* 스토리 3 */}
      <section className="min-h-screen flex items-center py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-video bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg" />
          <div>
            <span className="text-violet-400 font-mono text-sm">03 — THE WORKS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">작품</h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              100개 이상의 프로젝트를 통해 브랜딩, 웹 디자인, 
              모바일 앱까지 폭넓은 영역에서 활동하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 스토리 4 */}
      <section className="min-h-screen flex items-center py-24 px-6 bg-neutral-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="text-emerald-400 font-mono text-sm">04 — THE NOW</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">현재</h2>
            <p className="text-neutral-400 leading-relaxed text-lg">
              현재는 프리랜서로 활동하며 의미 있는 프로젝트에 
              집중하고 있습니다. 당신의 이야기도 함께 만들어가고 싶습니다.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-video bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg" />
        </div>
      </section>

      {/* 스킬 섹션 */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">What I Do</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Branding", "Web Design", "App Design", "Motion"].map((skill) => (
              <div key={skill} className="p-6 bg-neutral-900 rounded-xl">
                <span className="text-neutral-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-6 bg-gradient-to-br from-violet-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-white/60 font-mono text-sm">05 — THE FUTURE</span>
          <h3 className="text-5xl md:text-6xl font-black mt-4 mb-8">
            함께 만들어요
          </h3>
          <p className="text-white/70 text-xl mb-10">
            당신의 이야기를 기다리고 있습니다
          </p>
          <a 
            href="mailto:story@design.com" 
            className="inline-block px-10 py-5 bg-white text-neutral-900 font-bold text-lg rounded-full hover:bg-neutral-100 transition-colors"
          >
            story@design.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-neutral-600">
          <span>© 2024 STORYTELLING</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            <strong>P15</strong> 스토리텔링 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-violet-700 text-sm font-bold rounded-full hover:bg-violet-100">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

