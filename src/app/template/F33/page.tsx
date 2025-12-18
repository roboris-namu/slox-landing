export default function TemplateF33() {
  const members = [
    { name: "김보컬", role: "보컬", emoji: "🎤" },
    { name: "이기타", role: "기타", emoji: "🎸" },
    { name: "박베이스", role: "베이스", emoji: "🎸" },
    { name: "정드럼", role: "드럼", emoji: "🥁" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="py-12 text-center">
        <span className="text-5xl">🎵</span>
        <h1 className="text-3xl font-bold text-white mt-4">밴드 SOUND WAVE</h1>
        <p className="text-purple-400 mt-2">2019년 결성 | 서울</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">🎶 About Us</h3>
          <p className="text-slate-300 leading-relaxed">
            SOUND WAVE는 록과 팝을 아우르는 4인조 밴드입니다.
            매주 합주를 하며 분기별 공연을 목표로 활동하고 있습니다.
            음악을 사랑하는 마음으로 함께합니다.
          </p>
        </div>
      </section>

      {/* 멤버 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-white mb-4">👥 Members</h3>
          <div className="grid grid-cols-2 gap-4">
            {members.map((m) => (
              <div key={m.name} className="bg-slate-800 rounded-xl p-4 text-center">
                <span className="text-4xl">{m.emoji}</span>
                <p className="font-bold text-white mt-2">{m.name}</p>
                <p className="text-purple-400 text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활동 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
          <div className="bg-purple-900/50 rounded-xl p-4 text-center">
            <span className="text-3xl">📅</span>
            <p className="font-bold text-white mt-2">매주 토요일</p>
            <p className="text-purple-300 text-sm">정기 합주</p>
          </div>
          <div className="bg-purple-900/50 rounded-xl p-4 text-center">
            <span className="text-3xl">🎤</span>
            <p className="font-bold text-white mt-2">분기별 1회</p>
            <p className="text-purple-300 text-sm">정기 공연</p>
          </div>
        </div>
      </section>

      {/* 공연 기록 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-white mb-4">🎸 공연 기록</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🎤", "🎸", "🥁", "🎹", "🎵", "🎶"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-slate-800 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-purple-600 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold text-lg">🎵 Follow Us</h3>
          <p className="text-purple-100 text-sm mt-2">YouTube: @soundwave_band</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-500">
        <p>🎵 SOUND WAVE 🎵</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F33</strong> 음악 동호회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

