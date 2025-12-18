export default function TemplateE01() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100">
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        {/* 장식 */}
        <div className="text-4xl mb-8">💕</div>
        
        {/* 타이틀 */}
        <p className="text-rose-400 tracking-[0.3em] text-sm">WEDDING INVITATION</p>
        
        {/* 이름 */}
        <div className="mt-12 mb-8">
          <h1 className="text-4xl font-serif text-slate-700">
            김철수 <span className="text-rose-400">&</span> 이영희
          </h1>
        </div>

        {/* 날짜 */}
        <div className="py-8 border-y border-rose-200">
          <p className="text-rose-500 text-lg">2025년 3월 15일 토요일 오후 2시</p>
          <p className="text-slate-500 mt-2">그랜드 웨딩홀 3층 그랜드볼룸</p>
        </div>

        {/* 사진 영역 */}
        <div className="my-12 aspect-[3/4] bg-gradient-to-br from-rose-200 to-pink-200 rounded-3xl flex items-center justify-center">
          <span className="text-8xl">💑</span>
        </div>

        {/* 인사말 */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            서로 다른 길을 걸어온 두 사람이<br />
            이제 같은 길을 함께 걸어가려 합니다.<br /><br />
            저희의 새로운 시작을<br />
            축복해 주시면 감사하겠습니다.
          </p>
        </div>

        {/* 연락처 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-slate-400">신랑측</p>
            <p className="text-slate-700 mt-1">김철수</p>
            <a href="tel:010-1234-5678" className="text-rose-500 text-sm">📞 연락하기</a>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm text-slate-400">신부측</p>
            <p className="text-slate-700 mt-1">이영희</p>
            <a href="tel:010-8765-4321" className="text-rose-500 text-sm">📞 연락하기</a>
          </div>
        </div>

        {/* 지도 */}
        <div className="bg-white rounded-2xl p-6 my-8">
          <h3 className="font-bold text-slate-700 mb-4">📍 오시는 길</h3>
          <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-4xl">
            🗺️
          </div>
          <p className="text-slate-500 text-sm mt-4">서울시 강남구 테헤란로 123</p>
        </div>

        {/* 계좌 */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-bold text-slate-700 mb-4">💝 마음 전하기</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500">신랑측</span>
              <span className="text-slate-700">국민 123-456-789012</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500">신부측</span>
              <span className="text-slate-700">신한 987-654-321098</span>
            </div>
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E01</strong> 로맨틱 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-500 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

