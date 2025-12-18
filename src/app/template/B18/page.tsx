export default function TemplateB18() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-amber-700">🎯 LIFE COACH 윤</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-6xl shadow-xl">
            🧘
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-8">
            당신의 잠재력을 깨워드립니다
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            라이프 코치 윤코치 | 행복한 삶을 위한 동반자
          </p>
          <button className="mt-8 px-8 py-4 bg-amber-500 text-white font-bold rounded-full shadow-lg hover:bg-amber-600 transition-colors">
            무료 상담 신청
          </button>
        </div>
      </header>

      {/* 소개 */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">About Me</h3>
          <p className="text-slate-600 text-center leading-relaxed max-w-2xl mx-auto">
            ICF 인증 코치로서 500명 이상의 클라이언트와 함께 했습니다.
            삶의 방향을 찾고, 목표를 달성하고, 더 행복한 일상을 만들어가는 여정을 함께 합니다.
          </p>
        </div>
      </section>

      {/* 프로그램 */}
      <section id="programs" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Coaching Programs</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "1:1 라이프 코칭", sessions: "8회", price: "160만원", icon: "🌟" },
              { title: "커리어 코칭", sessions: "6회", price: "120만원", icon: "💼" },
              { title: "그룹 워크샵", sessions: "4시간", price: "30만원", icon: "👥" },
            ].map((p) => (
              <div key={p.title} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <span className="text-4xl">{p.icon}</span>
                <h4 className="font-bold text-lg mt-4">{p.title}</h4>
                <p className="text-slate-500 text-sm mt-2">{p.sessions}</p>
                <p className="text-amber-600 font-bold text-xl mt-4">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Client Reviews</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "인생의 방향을 찾을 수 있었어요", name: "김OO" },
              { text: "매 세션이 기다려지는 시간이었습니다", name: "이OO" },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-amber-50 rounded-xl">
                <p className="text-slate-600">&quot;{r.text}&quot;</p>
                <p className="text-amber-600 font-medium mt-4">- {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold">무료 상담 신청</h3>
          <p className="mt-4 text-amber-100">30분 무료 디스커버리 세션</p>
          <p className="mt-6">📧 yoon.coach@email.com | 📞 010-1234-5678</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 LIFE COACH 윤. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B18</strong> 코치</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

