export default function TemplateF31() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-orange-500 to-orange-400">
        <span className="text-5xl">🏃</span>
        <h1 className="text-3xl font-bold text-white mt-4">러닝 크루 RUN!</h1>
        <p className="text-orange-100 mt-2">함께 달리는 즐거움</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🏃 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            RUN! 러닝 크루는 서울 한강을 달리는 러닝 동호회입니다.
            초보부터 마라톤 완주자까지 다양한 멤버가 함께합니다.
          </p>
        </div>
      </section>

      {/* 활동 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">📅</span>
            <p className="font-bold text-slate-800 mt-2">수/토</p>
            <p className="text-slate-500 text-sm">주 2회 정기 러닝</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">📍</span>
            <p className="font-bold text-slate-800 mt-2">한강공원</p>
            <p className="text-slate-500 text-sm">여의도 ~ 반포</p>
          </div>
        </div>
      </section>

      {/* 기록 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🏆 2024년 기록</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-orange-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">1,250km</p>
              <p className="text-orange-500 text-xs">총 거리</p>
            </div>
            <div className="bg-orange-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">48회</p>
              <p className="text-orange-500 text-xs">모임 횟수</p>
            </div>
            <div className="bg-orange-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">28명</p>
              <p className="text-orange-500 text-xs">멤버</p>
            </div>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📸 러닝 기록</h3>
          <div className="grid grid-cols-3 gap-2">
            {["🏃", "🏃‍♀️", "🌅", "🏅", "👟", "💪"].map((emoji, i) => (
              <div key={i} className="aspect-square bg-orange-100 rounded-xl flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가입 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-orange-500 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold text-lg">🙋 함께 달려요!</h3>
          <p className="text-orange-100 text-sm mt-2">인스타: @run_crew_seoul</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-orange-400">
        <p>🏃 RUN! - 오늘도 달립니다 🏃</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F31</strong> 운동 동호회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

