export default function TemplateF26() {
  const activities = [
    { name: "블록놀이", icon: "🧱", time: "매일" },
    { name: "그림 그리기", icon: "🎨", time: "오전" },
    { name: "공놀이", icon: "⚽", time: "오후" },
    { name: "책 읽기", icon: "📚", time: "저녁" },
  ];

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-yellow-100 to-yellow-50">
        <span className="text-6xl">🧸</span>
        <h1 className="text-2xl font-bold text-yellow-800 mt-4">시우의 플레이타임</h1>
        <p className="text-yellow-600">매일매일 신나는 놀이!</p>
      </header>

      {/* 프로필 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center text-4xl">
              👦
            </div>
            <div>
              <h2 className="text-xl font-bold text-yellow-800">박시우</h2>
              <p className="text-yellow-600 text-sm">4살 | 놀이 전문가</p>
            </div>
          </div>
        </div>
      </section>

      {/* 놀이 활동 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">🎯 오늘의 놀이</h3>
          <div className="grid grid-cols-2 gap-4">
            {activities.map((a) => (
              <div key={a.name} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <span className="text-4xl">{a.icon}</span>
                <p className="font-bold text-yellow-800 mt-2">{a.name}</p>
                <p className="text-yellow-500 text-xs">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 놀이 사진 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">📸 놀이 기록</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🧱", "🎨", "⚽", "🚂", "🎵", "🧩"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-yellow-100 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 좋아하는 장난감 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-yellow-800 mb-4 text-center">💛 최애 장난감</h3>
          <div className="flex justify-center gap-6 text-5xl">
            <span>🚂</span>
            <span>🧸</span>
            <span>🤖</span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-yellow-500">
        <p>🧸 시우야 오늘도 신나게 놀자! 🧸</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F26</strong> 플레이타임</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-yellow-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

