export default function TemplateF29() {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-emerald-600 to-emerald-500">
        <span className="text-5xl">⚽</span>
        <h1 className="text-3xl font-bold text-white mt-4">강남 FC</h1>
        <p className="text-emerald-100 mt-2">2015년 창단 | 매주 일요일 활동</p>
      </header>

      {/* 동호회 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4">⚽ 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            강남 FC는 2015년에 창단된 축구 동호회입니다.
            축구를 사랑하는 직장인들이 모여 매주 일요일 오전 축구를 즐기고 있습니다.
            실력보다 즐기는 것이 목표입니다!
          </p>
        </div>
      </section>

      {/* 활동 정보 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">📅</span>
            <p className="font-bold text-slate-800 mt-2">매주 일요일</p>
            <p className="text-slate-500 text-sm">오전 9시~12시</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">📍</span>
            <p className="font-bold text-slate-800 mt-2">잠실 운동장</p>
            <p className="text-slate-500 text-sm">잠실역 5분</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">👥</span>
            <p className="font-bold text-slate-800 mt-2">32명</p>
            <p className="text-slate-500 text-sm">정회원</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">💰</span>
            <p className="font-bold text-slate-800 mt-2">5만원/월</p>
            <p className="text-slate-500 text-sm">회비</p>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📸 활동 사진</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">
                ⚽
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가입 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-emerald-600 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold text-lg mb-2">🙋 신규 회원 모집 중!</h3>
          <p className="text-emerald-100 text-sm">카카오톡: gangnam_fc</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-500">
        <p>⚽ 강남 FC - 함께 뛰어요! ⚽</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F29</strong> 동호회 소개</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

