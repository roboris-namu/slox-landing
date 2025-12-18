export default function TemplateF28() {
  const members = [
    { name: "김철수", role: "회장", emoji: "👨‍💼" },
    { name: "이영희", role: "총무", emoji: "👩‍💼" },
    { name: "박민수", role: "회원", emoji: "👨" },
    { name: "정수진", role: "회원", emoji: "👩" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-blue-900 to-blue-800">
        <span className="text-5xl">🎓</span>
        <h1 className="text-3xl font-bold text-white mt-4">서울고 35회 동창회</h1>
        <p className="text-blue-200 mt-2">1998년 졸업 | 함께한 추억</p>
      </header>

      {/* 모임 정보 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📅 다음 정기 모임</h3>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-blue-800 font-bold text-lg">2024년 12월 28일 (토)</p>
            <p className="text-blue-600 mt-1">저녁 6시 | 강남역 모임장소</p>
          </div>
        </div>
      </section>

      {/* 임원진 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">👥 임원진</h3>
          <div className="grid grid-cols-2 gap-4">
            {members.map((m) => (
              <div key={m.name} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <span className="text-3xl">{m.emoji}</span>
                <div>
                  <p className="font-bold text-slate-800">{m.name}</p>
                  <p className="text-blue-500 text-sm">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추억 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📸 추억의 사진첩</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🏫", "⚽", "📚", "🎵", "🎓", "🎉"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-blue-900 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold mb-2">📞 동창회 문의</h3>
          <p>카카오톡 오픈채팅: 서울고35회</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400">
        <p>🎓 서울고 35회 동창회 🎓</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F28</strong> 동창회 모임</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

