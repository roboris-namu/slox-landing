export default function TemplateF23() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-blue-100 to-blue-50">
        <span className="text-5xl">🎒</span>
        <h1 className="text-2xl font-bold text-blue-900 mt-4">준호의 학교생활</h1>
        <p className="text-blue-500">서울초등학교 3학년</p>
      </header>

      {/* 프로필 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-4xl">
              👦
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">김준호</h2>
              <p className="text-blue-500 text-sm">3학년 2반 15번</p>
              <p className="text-blue-400 text-sm">담임: 이선생님</p>
            </div>
          </div>
        </div>
      </section>

      {/* 학교생활 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-blue-900 mb-4">📚 학교생활</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "📖", title: "좋아하는 과목", desc: "수학, 체육" },
              { icon: "🏆", title: "교내 활동", desc: "축구부" },
              { icon: "👫", title: "친한 친구", desc: "민준, 서연" },
              { icon: "🎯", title: "목표", desc: "반장 되기" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <p className="font-bold text-blue-900 mt-2">{item.title}</p>
                <p className="text-blue-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추억 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-blue-900 mb-4">📸 학교 추억</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🏫", "⚽", "🎨", "🎵", "🏃", "📚"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-blue-400">
        <p>🏫 준호의 즐거운 학교생활 🏫</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F23</strong> 스쿨 메모리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

