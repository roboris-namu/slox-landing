export default function TemplateB02() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
            🚀 StartupX
          </h1>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#product">Product</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-6">
            🎉 시리즈 A 투자 유치 완료!
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            세상을 바꾸는<br />혁신적인 솔루션
          </h2>
          <p className="mt-6 text-xl text-white/80">
            StartupX와 함께 미래를 만들어가세요
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-lg hover:scale-105 transition-transform">
            지금 시작하기 →
          </button>
        </div>
      </header>

      {/* 제품 소개 */}
      <section id="product" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">우리의 서비스</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "빠른 속도", desc: "업계 최고의 처리 속도" },
              { icon: "🔒", title: "보안", desc: "엔터프라이즈급 보안" },
              { icon: "📈", title: "성장", desc: "데이터 기반 의사결정" },
            ].map((item) => (
              <div key={item.title} className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl text-center">
                <span className="text-5xl">{item.icon}</span>
                <h4 className="text-xl font-bold mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 팀 */}
      <section id="team" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Team</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "김대표", role: "CEO", emoji: "👨‍💼" },
              { name: "이개발", role: "CTO", emoji: "👨‍💻" },
              { name: "박디자인", role: "CDO", emoji: "👩‍🎨" },
              { name: "최마케팅", role: "CMO", emoji: "👩‍💼" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full mx-auto flex items-center justify-center text-4xl">
                  {member.emoji}
                </div>
                <p className="font-bold mt-4">{member.name}</p>
                <p className="text-purple-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-center">
        <h3 className="text-3xl font-bold">함께 성장할 준비 되셨나요?</h3>
        <p className="mt-4 text-white/80">지금 바로 문의하세요</p>
        <button className="mt-8 px-8 py-3 bg-white text-purple-600 font-bold rounded-full">
          연락하기
        </button>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 StartupX. Built with ❤️</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B02</strong> 스타트업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

