export default function TemplateP13() {
  const works = [
    { id: 1, title: "브랜드 아이덴티티", height: "h-80", color: "bg-rose-400" },
    { id: 2, title: "웹 디자인", height: "h-64", color: "bg-amber-400" },
    { id: 3, title: "일러스트", height: "h-96", color: "bg-emerald-400" },
    { id: 4, title: "패키지", height: "h-72", color: "bg-sky-400" },
    { id: 5, title: "모바일 앱", height: "h-80", color: "bg-violet-400" },
    { id: 6, title: "포스터", height: "h-56", color: "bg-pink-400" },
    { id: 7, title: "타이포그래피", height: "h-72", color: "bg-indigo-400" },
    { id: 8, title: "3D 모델링", height: "h-96", color: "bg-orange-400" },
    { id: 9, title: "영상 편집", height: "h-64", color: "bg-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 py-5 bg-stone-100/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-black text-stone-800 tracking-tight">MASONRY</h1>
            <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
              <a href="#gallery" className="hover:text-stone-900">Gallery</a>
              <a href="#about" className="hover:text-stone-900">About</a>
              <a href="#contact" className="hover:text-stone-900">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-stone-800 mb-6">
            최마소니
          </h2>
          <p className="text-xl text-stone-500 mb-4">
            Visual Designer & Art Director
          </p>
          <p className="text-stone-400">
            핀터레스트 스타일의 마소니 레이아웃으로 작품을 전시합니다
          </p>
        </div>
      </section>

      {/* 마소니 갤러리 */}
      <section id="gallery" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {works.map((work) => (
              <div 
                key={work.id} 
                className={`break-inside-avoid ${work.height} ${work.color} rounded-2xl overflow-hidden group cursor-pointer relative`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white/70 text-sm mb-1">0{work.id}</p>
                    <h3 className="text-white text-xl font-bold">{work.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gradient-to-br from-rose-400 via-amber-400 to-emerald-400 rounded-3xl" />
            <div>
              <h3 className="text-3xl font-black text-stone-800 mb-6">About</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                다양한 크기와 비율의 작품들을 자연스럽게 배치하는 마소니 레이아웃을 
                활용해 포트폴리오를 구성합니다. 시각적 리듬감과 탐색의 재미를 
                동시에 제공합니다.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-stone-200 text-stone-700 rounded-full text-sm">Branding</span>
                <span className="px-4 py-2 bg-stone-200 text-stone-700 rounded-full text-sm">Illustration</span>
                <span className="px-4 py-2 bg-stone-200 text-stone-700 rounded-full text-sm">UI Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-black text-white mb-6">
            함께 작업해요
          </h3>
          <p className="text-stone-400 mb-8">
            새로운 프로젝트에 대해 이야기 나눠요
          </p>
          <a href="mailto:masonry@design.com" className="inline-block px-8 py-4 bg-white text-stone-800 font-bold rounded-full hover:bg-stone-100 transition-colors">
            masonry@design.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-stone-500">
          © 2024 MASONRY. All rights reserved.
        </div>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-medium">
            <strong>P13</strong> 마소니 레이아웃 템플릿
          </span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-stone-800 text-sm font-bold rounded-full hover:bg-stone-100">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

