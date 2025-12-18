export default function TemplateE14() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100">
      {/* 서프라이즈 장식 */}
      <div className="text-center pt-8 text-5xl animate-bounce">🎁</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold text-orange-600">
          SURPRISE!
        </h1>
        <p className="text-slate-500 mt-2">🤫 쉿! 깜짝 파티에요!</p>

        {/* 주인공 */}
        <div className="my-8 py-8 bg-white rounded-3xl shadow-lg">
          <p className="text-lg text-orange-500">주인공</p>
          <h2 className="text-4xl font-bold text-slate-700 mt-2">엄마</h2>
          <p className="text-slate-500 mt-2">50번째 생일을 맞이합니다!</p>
        </div>

        {/* 날짜 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 my-8">
          <p className="text-sm text-orange-100">D-DAY</p>
          <p className="text-2xl font-bold mt-2">2025년 4월 15일</p>
          <p className="text-orange-100 mt-1">화요일 저녁 6시</p>
        </div>

        {/* 비밀 안내 */}
        <div className="bg-red-100 border-2 border-dashed border-red-400 rounded-2xl p-6 my-8">
          <p className="text-red-600 font-bold text-lg">🤫 비밀 유지!</p>
          <p className="text-red-500 text-sm mt-2">
            엄마 몰래 준비하는 깜짝 파티에요!<br />
            절대 비밀을 지켜주세요!
          </p>
        </div>

        {/* 미션 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow text-left">
          <p className="text-orange-600 font-bold">📋 참석자 미션</p>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>5시 55분까지 도착 필수!</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>엄마에게 연락 금지!</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✅</span>
              <span>축하 메시지 미리 준비</span>
            </li>
          </ul>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-orange-500 font-medium">📍 비밀 장소</p>
          <p className="text-slate-600 mt-2">레스토랑 서프라이즈</p>
          <p className="text-slate-500 text-sm mt-1">서울시 마포구 깜짝로 50</p>
        </div>

        {/* 주최자 연락 */}
        <div className="bg-orange-100 rounded-2xl p-4">
          <p className="text-orange-600 text-sm">주최: 아빠 & 동생들</p>
          <a href="tel:010-1234-5678" className="text-orange-700 font-bold">📞 010-1234-5678</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E14</strong> 서프라이즈</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

