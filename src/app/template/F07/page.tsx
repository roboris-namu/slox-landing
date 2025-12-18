export default function TemplateF07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-cyan-100">
      {/* 헤더 */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-pink-500">🌈</span>
          <span className="text-rose-500"> 윤</span>
          <span className="text-orange-500">씨</span>
          <span className="text-amber-500">네</span>
          <span className="text-yellow-500"> 가</span>
          <span className="text-lime-500">족</span>
          <span className="text-cyan-500"> 🌈</span>
        </h1>
        <p className="text-gray-600 mt-2">밝고 화사한 우리 가족!</p>
      </header>

      {/* 가족 소개 */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "아빠", emoji: "👨", color: "bg-blue-400" },
              { name: "엄마", emoji: "👩", color: "bg-pink-400" },
              { name: "오빠", emoji: "👦", color: "bg-green-400" },
              { name: "나", emoji: "👧", color: "bg-yellow-400" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className={`w-24 h-24 ${member.color} rounded-3xl mx-auto mb-3 flex items-center justify-center text-5xl shadow-lg`}>
                  {member.emoji}
                </div>
                <p className="font-bold text-gray-700">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-700">📸 행복한 순간들</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { color: "bg-rose-300", icon: "🎂" },
              { color: "bg-orange-300", icon: "🎄" },
              { color: "bg-amber-300", icon: "🏖️" },
              { color: "bg-lime-300", icon: "⛺" },
              { color: "bg-cyan-300", icon: "🎪" },
              { color: "bg-violet-300", icon: "🎢" },
            ].map((item, i) => (
              <div key={i} className={`aspect-square ${item.color} rounded-2xl flex items-center justify-center text-5xl shadow-md hover:scale-105 transition-transform`}>
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가훈 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur rounded-3xl p-8 shadow-lg">
            <p className="text-2xl font-bold text-gray-700">
              ✨ 항상 웃으며 행복하게! ✨
            </p>
            <p className="text-gray-500 mt-2">- 우리 가족 모토 -</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-gray-500">
        <p>🌈 Yoon Family Forever 🌈</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 via-amber-500 to-cyan-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F07</strong> 컬러풀 패밀리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

