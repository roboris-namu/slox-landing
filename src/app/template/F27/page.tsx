export default function TemplateF27() {
  const milestones = [
    { age: "1개월", milestone: "첫 미소", achieved: true, icon: "😊" },
    { age: "3개월", milestone: "뒤집기", achieved: true, icon: "🔄" },
    { age: "6개월", milestone: "이유식 시작", achieved: true, icon: "🥣" },
    { age: "8개월", milestone: "앉기", achieved: true, icon: "🪑" },
    { age: "10개월", milestone: "기어가기", achieved: true, icon: "🐛" },
    { age: "12개월", milestone: "첫 걸음마", achieved: true, icon: "👣" },
    { age: "18개월", milestone: "두 단어 조합", achieved: false, icon: "💬" },
    { age: "24개월", milestone: "배변 훈련", achieved: false, icon: "🚽" },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="py-8 text-center bg-gradient-to-b from-emerald-100 to-emerald-50">
        <span className="text-5xl">🏆</span>
        <h1 className="text-2xl font-bold text-emerald-900 mt-4">수아의 마일스톤</h1>
        <p className="text-emerald-600">성장의 모든 순간을 기록해요</p>
      </header>

      {/* 현재 상태 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-24 h-24 bg-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            👶
          </div>
          <h2 className="text-xl font-bold text-emerald-900">이수아</h2>
          <p className="text-emerald-600">현재 14개월 | 6개 마일스톤 달성!</p>
        </div>
      </section>

      {/* 마일스톤 목록 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">📋 마일스톤 체크리스트</h3>
          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.age}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  m.achieved ? "bg-emerald-100" : "bg-gray-100"
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold ${m.achieved ? "text-emerald-800" : "text-gray-500"}`}>
                    {m.milestone}
                  </p>
                  <p className={`text-xs ${m.achieved ? "text-emerald-600" : "text-gray-400"}`}>
                    {m.age}
                  </p>
                </div>
                {m.achieved ? (
                  <span className="text-emerald-500 text-xl">✓</span>
                ) : (
                  <span className="text-gray-300 text-xl">○</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다음 목표 */}
      <section className="py-8 px-6 bg-emerald-100">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-bold text-emerald-900 mb-2">🎯 다음 마일스톤</h3>
          <p className="text-emerald-700">두 단어 조합 (18개월)</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-500">
        <p>🏆 수아야 잘 하고 있어! 🏆</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F27</strong> 마일스톤</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

