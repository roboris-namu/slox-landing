export default function TemplateB14() {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-700">📚 정샘 영어교실</h1>
          <div className="flex gap-4 text-sm text-slate-600">
            <a href="#classes">수업 안내</a>
            <a href="#contact">문의</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-16 px-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center text-6xl shadow-xl">
            👩‍🏫
          </div>
          <h2 className="text-3xl font-bold mt-8">
            즐거운 영어, 정샘과 함께!
          </h2>
          <p className="text-emerald-100 mt-4">
            15년 경력 | 초·중·고 영어 전문 | 토익/수능 대비
          </p>
        </div>
      </header>

      {/* 수업 안내 */}
      <section id="classes" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-emerald-800 mb-8 text-center">수업 안내</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "초등", desc: "파닉스/기초 영어", price: "월 20만원", icon: "🌱" },
              { level: "중등", desc: "내신/문법 완성", price: "월 25만원", icon: "📖" },
              { level: "고등", desc: "수능/토익 대비", price: "월 30만원", icon: "🎯" },
            ].map((c) => (
              <div key={c.level} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <span className="text-4xl">{c.icon}</span>
                <h4 className="text-xl font-bold text-emerald-700 mt-4">{c.level}</h4>
                <p className="text-slate-500 mt-2">{c.desc}</p>
                <p className="text-emerald-600 font-bold mt-4">{c.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 특징 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-emerald-800 mb-8 text-center">수업 특징</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "✓ 1:1 맞춤 수업",
              "✓ 소수정예 그룹 수업 가능",
              "✓ 체계적인 커리큘럼",
              "✓ 주 1회 피드백 리포트",
            ].map((f) => (
              <div key={f} className="p-4 bg-emerald-50 rounded-xl text-emerald-800">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold">상담 문의</h3>
          <p className="mt-4 text-emerald-100">수업 상담은 카카오톡 또는 전화로!</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <span>📞 010-1234-5678</span>
            <span>💬 카카오톡: jungsam_eng</span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 정샘 영어교실. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B14</strong> 강사/튜터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

