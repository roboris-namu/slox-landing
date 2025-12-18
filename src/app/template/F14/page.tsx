export default function TemplateF14() {
  const milestones = [
    { age: "2개월", weight: "0.8kg", event: "우리 집에 왔어요!", icon: "🏠" },
    { age: "4개월", weight: "2.5kg", event: "첫 예방접종 완료", icon: "💉" },
    { age: "6개월", weight: "4kg", event: "첫 산책을 했어요", icon: "🦮" },
    { age: "1살", weight: "6kg", event: "첫 생일 파티!", icon: "🎂" },
    { age: "2살", weight: "7kg", event: "어른이 되었어요", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-sky-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-sky-100 to-sky-50">
        <span className="text-5xl">📏</span>
        <h1 className="text-2xl font-bold text-sky-900 mt-4">콩이의 성장일기</h1>
        <p className="text-sky-600">말티즈 | 2022년 3월생</p>
      </header>

      {/* 현재 상태 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-sky-200 rounded-full flex items-center justify-center text-4xl">
              🐕
            </div>
            <div>
              <h2 className="text-xl font-bold text-sky-900">콩이</h2>
              <p className="text-sky-600 text-sm">현재 2살 9개월</p>
              <p className="text-sky-500 text-sm">몸무게 7.2kg</p>
            </div>
          </div>
        </div>
      </section>

      {/* 성장 타임라인 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-sky-900 mb-6 text-center">🌱 성장 기록</h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sky-200" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.age} className="flex gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-xl z-10">
                    {m.icon}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sky-900">{m.age}</p>
                        <p className="text-sky-600 text-sm">{m.event}</p>
                      </div>
                      <span className="text-sky-500 text-sm">{m.weight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 사진 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-sky-900 mb-4 text-center">📸 성장 앨범</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-sky-100 rounded-lg flex items-center justify-center text-2xl">
                🐶
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-sky-500">
        <p>🐾 콩이의 성장을 함께해요 🐾</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-sky-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F14</strong> 성장일기</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-sky-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

