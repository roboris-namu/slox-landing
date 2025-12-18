export default function TemplateF19() {
  const growth = [
    { age: "출생", height: "50cm", weight: "3.2kg", icon: "👶" },
    { age: "100일", height: "62cm", weight: "6.5kg", icon: "🍼" },
    { age: "첫돌", height: "75cm", weight: "10kg", icon: "🎂" },
    { age: "24개월", height: "85cm", weight: "12kg", icon: "🧸" },
    { age: "36개월", height: "95cm", weight: "14kg", icon: "🚂" },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-pink-100 to-pink-50">
        <span className="text-5xl">👶</span>
        <h1 className="text-2xl font-bold text-pink-800 mt-4">서연이의 성장기록</h1>
        <p className="text-pink-500">2022년 3월 15일생</p>
      </header>

      {/* 현재 상태 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center text-4xl">
              👧
            </div>
            <div>
              <h2 className="text-xl font-bold text-pink-800">김서연</h2>
              <p className="text-pink-500 text-sm">현재 만 2세 9개월</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-xl font-bold text-pink-600">95cm</p>
              <p className="text-pink-400 text-xs">키</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-xl font-bold text-pink-600">14kg</p>
              <p className="text-pink-400 text-xs">몸무게</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-xl font-bold text-pink-600">48cm</p>
              <p className="text-pink-400 text-xs">머리둘레</p>
            </div>
          </div>
        </div>
      </section>

      {/* 성장 기록 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-pink-800 mb-4">📈 성장 기록</h3>
          <div className="space-y-3">
            {growth.map((g) => (
              <div key={g.age} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{g.icon}</span>
                  <span className="font-bold text-pink-800">{g.age}</span>
                </div>
                <div className="flex gap-4 text-sm text-pink-600">
                  <span>{g.height}</span>
                  <span>{g.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사진 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-pink-800 mb-4">📸 성장 앨범</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-pink-100 rounded-xl flex items-center justify-center text-3xl">
                👶
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-pink-400">
        <p>💕 사랑해 서연아 💕</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F19</strong> 베이비 그로스</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

