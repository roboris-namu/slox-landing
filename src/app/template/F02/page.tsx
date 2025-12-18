export default function TemplateF02() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="py-6 px-6 border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">PARK FAMILY</h1>
          <nav className="flex gap-6 text-sm text-slate-500">
            <a href="#family">Family</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-100 to-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm text-slate-400 tracking-widest">EST. 2015</span>
            <h2 className="text-5xl font-bold text-slate-900 mt-2 mb-6">박씨 패밀리</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              모던하고 세련된 우리 가족의 이야기를 담았습니다.
              소중한 순간들을 함께 기록해요.
            </p>
          </div>
          <div className="aspect-square bg-slate-200 rounded-3xl flex items-center justify-center text-9xl">
            👨‍👩‍👧‍👦
          </div>
        </div>
      </section>

      {/* 가족 소개 */}
      <section id="family" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Family</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "박지훈", role: "아빠", desc: "가족의 기둥" },
              { name: "김수진", role: "엄마", desc: "사랑의 중심" },
              { name: "박하준", role: "아들", desc: "꿈꾸는 소년" },
              { name: "박서아", role: "딸", desc: "밝은 에너지" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-slate-200 rounded-2xl mx-auto mb-4" />
                <h4 className="font-bold text-slate-900">{member.name}</h4>
                <p className="text-blue-500 text-sm">{member.role}</p>
                <p className="text-slate-500 text-sm mt-1">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section id="gallery" className="py-20 px-6 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Moments</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-slate-200 rounded-xl hover:scale-105 transition-transform cursor-pointer" />
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">Stay Connected</h3>
          <p className="text-slate-500 mb-8">가족 소식을 공유해요</p>
          <a href="mailto:family@park.com" className="inline-block px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800">
            family@park.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 border-t">
        <p>© 2024 Park Family</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F02</strong> 모던 패밀리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

