export default function TemplateE35() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8">
        {/* 타이틀 */}
        <div className="text-center">
          <p className="text-blue-600 tracking-widest text-sm">WORKSHOP</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            UX/UI 디자인 워크숍
          </h1>
          <p className="text-slate-500 mt-2">실무 중심의 3시간 집중 과정</p>
        </div>

        {/* 비주얼 */}
        <div className="mt-8 aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
          <span className="text-6xl">📝</span>
        </div>

        {/* 일정 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📅</div>
            <div>
              <p className="text-sm text-slate-500">일시</p>
              <p className="text-slate-800 font-bold">2025년 4월 5일 (토) 14:00-17:00</p>
            </div>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-slate-600 leading-relaxed">
            현업 디자이너가 알려주는<br />
            실무에서 바로 써먹는 UX/UI 팁!<br /><br />
            피그마 기초부터 프로토타이핑까지,<br />
            3시간 안에 마스터하세요!
          </p>
        </div>

        {/* 커리큘럼 */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-slate-800 font-bold mb-4">📚 커리큘럼</p>
          <div className="space-y-4 text-sm">
            <div className="flex gap-4">
              <span className="text-blue-600 font-bold">14:00</span>
              <div>
                <p className="text-slate-800 font-medium">UX 기초 이론</p>
                <p className="text-slate-500">사용자 경험의 핵심 원칙</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-blue-600 font-bold">15:00</span>
              <div>
                <p className="text-slate-800 font-medium">피그마 실습</p>
                <p className="text-slate-500">컴포넌트와 오토레이아웃</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-blue-600 font-bold">16:00</span>
              <div>
                <p className="text-slate-800 font-medium">프로토타이핑</p>
                <p className="text-slate-500">인터랙션 디자인 실습</p>
              </div>
            </div>
          </div>
        </div>

        {/* 강사 */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-slate-800 font-bold mb-4">👨‍🏫 강사</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">👤</div>
            <div>
              <p className="text-slate-800 font-medium">김디자이너</p>
              <p className="text-slate-500 text-sm">○○기업 UX 리드 (경력 10년)</p>
            </div>
          </div>
        </div>

        {/* 장소 & 참가비 */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">장소</p>
            <p className="text-slate-800 font-bold">위워크 강남</p>
          </div>
          <div className="bg-blue-600 rounded-2xl p-4 text-white">
            <p className="text-sm text-blue-200">참가비</p>
            <p className="font-bold">55,000원</p>
          </div>
        </div>

        {/* 신청 */}
        <a href="#" className="block mt-8 bg-blue-600 text-white rounded-xl p-4 text-center font-bold">
          ✍️ 신청하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E35</strong> 워크숍</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

