export default function TemplateF30() {
  const trips = [
    { place: "제주도", date: "2024.08", icon: "🏝️" },
    { place: "도쿄", date: "2024.05", icon: "🗼" },
    { place: "방콕", date: "2024.01", icon: "🛕" },
    { place: "부산", date: "2023.10", icon: "🌊" },
  ];

  return (
    <div className="min-h-screen bg-sky-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-sky-400 to-sky-300">
        <span className="text-5xl">✈️</span>
        <h1 className="text-3xl font-bold text-white mt-4">우리들의 여행기록</h1>
        <p className="text-sky-100 mt-2">철수 & 영희 커플 여행</p>
      </header>

      {/* 여행 목록 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🗺️ 여행 기록</h3>
          <div className="space-y-4">
            {trips.map((t) => (
              <div key={t.place} className="bg-white rounded-xl p-5 shadow-md flex items-center gap-4">
                <span className="text-4xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-lg">{t.place}</p>
                  <p className="text-sky-500 text-sm">{t.date}</p>
                </div>
                <span className="text-sky-400">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-sky-600">12</p>
            <p className="text-slate-500 text-xs">여행 횟수</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-sky-600">5</p>
            <p className="text-slate-500 text-xs">방문 국가</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-sky-600">25</p>
            <p className="text-slate-500 text-xs">방문 도시</p>
          </div>
        </div>
      </section>

      {/* 사진 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📸 여행 앨범</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🏖️", "🏔️", "🌆", "🍜", "🎢", "🌅"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-sky-100 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-sky-500">
        <p>✈️ 다음 여행지는 어디? ✈️</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-sky-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F30</strong> 여행 기록</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-sky-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

