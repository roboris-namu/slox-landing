export default function TemplateE21() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-amber-100">
      {/* 건배 장식 */}
      <div className="text-center pt-8 text-5xl">🍻</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-amber-500 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">회식에 초대합니다!</p>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-amber-800">
          개발팀 월간 회식
        </h1>
        <p className="text-amber-600 mt-2">이번 달도 수고 많으셨습니다! 🙌</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-2xl shadow-lg">
          <p className="text-amber-500">📅 일시</p>
          <p className="text-2xl text-slate-700 font-bold mt-2">2025년 3월 28일</p>
          <p className="text-slate-500 mt-1">금요일 저녁 7시</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 aspect-video bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center">
          <span className="text-6xl">🍖🍺🥗</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white rounded-2xl p-8 my-8 shadow">
          <p className="text-slate-600 leading-relaxed">
            한 달간 고생한 우리 팀원들!<br />
            맛있는 고기와 시원한 맥주로<br />
            피로를 날려버려요! 💪<br /><br />
            (당연히 회사 법카입니다 😎)
          </p>
        </div>

        {/* 메뉴 미리보기 */}
        <div className="bg-amber-100 rounded-2xl p-6 my-8">
          <p className="text-amber-700 font-bold mb-4">🍖 오늘의 메뉴</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3">
              <span className="text-2xl">🥩</span>
              <p className="text-slate-600 mt-1">한우</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-2xl">🍺</span>
              <p className="text-slate-600 mt-1">맥주</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-2xl">🍶</span>
              <p className="text-slate-600 mt-1">소주</p>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-amber-500 font-medium">📍 장소</p>
          <p className="text-slate-700 mt-2">고기굽는집</p>
          <p className="text-slate-500 text-sm mt-1">서울시 강남구 회식로 77</p>
          <div className="mt-4 aspect-video bg-amber-50 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
        </div>

        {/* 참석 확인 */}
        <div className="grid grid-cols-2 gap-4">
          <a href="#" className="bg-green-500 text-white rounded-lg p-4 font-bold">
            ✅ 참석
          </a>
          <a href="#" className="bg-slate-300 text-slate-700 rounded-lg p-4 font-bold">
            ❌ 불참
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E21</strong> 회식 모임</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

