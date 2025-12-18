export default function TemplateF35() {
  const mountains = [
    { name: "북한산", date: "2024.12.14", difficulty: "중" },
    { name: "관악산", date: "2024.11.30", difficulty: "초" },
    { name: "도봉산", date: "2024.11.16", difficulty: "중" },
    { name: "설악산", date: "2024.10.26", difficulty: "상" },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-emerald-700 to-emerald-600">
        <span className="text-5xl">⛰️</span>
        <h1 className="text-3xl font-bold text-white mt-4">한우리 산악회</h1>
        <p className="text-emerald-100 mt-2">1998년 창립 | 건강한 등산</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-3">⛰️ 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            한우리 산악회는 1998년 창립된 전통 있는 등산 모임입니다.
            매주 토요일 수도권 산을 등반하며,
            분기별 1회 명산 원정을 진행합니다.
          </p>
        </div>
      </section>

      {/* 등반 기록 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🏔️ 최근 등반</h3>
          <div className="space-y-3">
            {mountains.map((m) => (
              <div key={m.name} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⛰️</span>
                  <div>
                    <p className="font-bold text-slate-800">{m.name}</p>
                    <p className="text-slate-500 text-sm">{m.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  m.difficulty === "상" ? "bg-red-100 text-red-600" :
                  m.difficulty === "중" ? "bg-yellow-100 text-yellow-600" :
                  "bg-green-100 text-green-600"
                }`}>
                  {m.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-4">
          <div className="bg-emerald-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">26년</p>
            <p className="text-emerald-500 text-xs">역사</p>
          </div>
          <div className="bg-emerald-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">42명</p>
            <p className="text-emerald-500 text-xs">회원</p>
          </div>
          <div className="bg-emerald-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">150+</p>
            <p className="text-emerald-500 text-xs">등반 횟수</p>
          </div>
        </div>
      </section>

      {/* 가입 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-emerald-700 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold text-lg">🙋 함께 산을 오르세요!</h3>
          <p className="text-emerald-100 text-sm mt-2">카카오톡: 한우리산악회</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-500">
        <p>⛰️ 한우리 산악회 ⛰️</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-700 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F35</strong> 등산 모임</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

