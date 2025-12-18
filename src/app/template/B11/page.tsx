export default function TemplateB11() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            ✨ 하늘작업실
          </h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#works">Works</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center text-6xl shadow-xl">
            👩‍🎨
          </div>
          <h2 className="text-4xl font-bold mt-8 text-slate-800">
            안녕하세요, 하늘입니다 ☁️
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            일러스트레이터 · 캐릭터 디자이너 · 굿즈 크리에이터
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full">
              작업 의뢰
            </a>
            <a href="#" className="px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-full">
              Shop →
            </a>
          </div>
        </div>
      </header>

      {/* 작업물 */}
      <section id="works" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">✨ Works</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center text-5xl hover:scale-105 transition-transform cursor-pointer">
                🎨
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">💕 Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "일러스트", price: "10만원~", emoji: "🖼️" },
              { title: "캐릭터 디자인", price: "30만원~", emoji: "🐰" },
              { title: "굿즈 제작", price: "협의", emoji: "🎁" },
            ].map((s) => (
              <div key={s.title} className="p-6 bg-white rounded-2xl text-center shadow-sm">
                <span className="text-4xl">{s.emoji}</span>
                <h4 className="font-bold mt-4">{s.title}</h4>
                <p className="text-purple-500 mt-2">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SNS */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">📱 Follow Me</h3>
          <div className="flex justify-center gap-6 text-3xl">
            <span>📸</span>
            <span>🐦</span>
            <span>🎵</span>
          </div>
          <p className="text-slate-500 mt-4">@haneul_studio</p>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold">작업 의뢰 문의</h3>
          <p className="mt-4 text-white/80">DM 또는 이메일로 연락주세요!</p>
          <p className="mt-4">📧 haneul@studio.com</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 하늘작업실. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B11</strong> 크리에이터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

