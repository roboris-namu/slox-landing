export default function TemplateF36() {
  const restaurants = [
    { name: "스시오마카세", location: "강남역", rating: "⭐⭐⭐⭐⭐", date: "12월" },
    { name: "이탈리안 파스타", location: "홍대", rating: "⭐⭐⭐⭐", date: "11월" },
    { name: "한정식 맛집", location: "삼청동", rating: "⭐⭐⭐⭐⭐", date: "10월" },
    { name: "중화요리", location: "명동", rating: "⭐⭐⭐⭐", date: "9월" },
  ];

  return (
    <div className="min-h-screen bg-rose-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-rose-500 to-rose-400">
        <span className="text-5xl">🍽️</span>
        <h1 className="text-3xl font-bold text-white mt-4">맛있는 사람들</h1>
        <p className="text-rose-100 mt-2">매월 새로운 맛집 탐방</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-3">🍴 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            맛있는 사람들은 미식을 사랑하는 사람들의 모임입니다.
            매월 테마를 정해 서울의 맛집을 탐방하고,
            함께 맛있는 음식과 즐거운 대화를 나눕니다.
          </p>
        </div>
      </section>

      {/* 방문 맛집 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📍 최근 방문 맛집</h3>
          <div className="space-y-3">
            {restaurants.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800">{r.name}</p>
                    <p className="text-slate-500 text-sm">{r.location}</p>
                  </div>
                  <span className="text-rose-400 text-sm">{r.date}</span>
                </div>
                <p className="text-sm mt-2">{r.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-4">
          <div className="bg-rose-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-rose-600">48</p>
            <p className="text-rose-400 text-xs">방문 맛집</p>
          </div>
          <div className="bg-rose-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-rose-600">16명</p>
            <p className="text-rose-400 text-xs">회원</p>
          </div>
          <div className="bg-rose-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-rose-600">3년</p>
            <p className="text-rose-400 text-xs">활동</p>
          </div>
        </div>
      </section>

      {/* 다음 모임 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-rose-500 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">🍕 다음 모임</h3>
          <p>12월 28일 (토) | 이태원 브런치 카페</p>
          <p className="text-rose-100 text-sm mt-1">12월 테마: 브런치</p>
        </div>
      </section>

      {/* 가입 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="font-bold text-slate-800 mb-2">🙋 함께 맛집 탐방해요!</h3>
          <p className="text-slate-500 text-sm">인스타: @tasty_people</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-400">
        <p>🍽️ 맛있는 사람들 🍽️</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F36</strong> 맛집 탐방</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

