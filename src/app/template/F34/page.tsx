export default function TemplateF34() {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* 헤더 */}
      <header className="py-12 text-center bg-stone-900">
        <span className="text-5xl">📷</span>
        <h1 className="text-3xl font-bold text-white mt-4">찰칵 포토클럽</h1>
        <p className="text-stone-400 mt-2">사진으로 세상을 담다</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-3">📸 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            찰칵 포토클럽은 사진을 사랑하는 사람들의 모임입니다.
            매월 다양한 장소에서 출사를 진행하고,
            사진 리뷰와 기술 공유를 합니다.
          </p>
        </div>
      </section>

      {/* 활동 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">📅</span>
            <p className="font-bold text-slate-800 mt-2">월 2회</p>
            <p className="text-slate-500 text-sm">정기 출사</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <span className="text-3xl">👥</span>
            <p className="font-bold text-slate-800 mt-2">24명</p>
            <p className="text-slate-500 text-sm">정회원</p>
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">🖼️ 회원 작품</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-stone-300 rounded-xl flex items-center justify-center text-4xl">
                📷
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다음 출사 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-stone-800 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">📍 다음 출사</h3>
          <p>12월 28일 (토) | 서울 북촌 한옥마을</p>
          <p className="text-stone-400 text-sm mt-1">집합: 오전 10시 안국역 3번 출구</p>
        </div>
      </section>

      {/* 가입 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="font-bold text-slate-800 mb-2">🙋 신규 회원 모집</h3>
          <p className="text-slate-500 text-sm">인스타: @chalcak_photo</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-stone-400">
        <p>📷 찰칵 포토클럽 📷</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-800 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F34</strong> 사진 동호회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-stone-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

