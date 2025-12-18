export default function TemplateP41() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-rose-100 to-pink-200">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto flex items-center justify-center text-6xl border-4 border-white shadow-xl">
          💄
        </div>

        {/* 이름 */}
        <h1 className="text-3xl font-bold text-rose-700 mt-6" style={{ fontFamily: 'cursive' }}>
          Beauty by 수아
        </h1>
        <p className="text-rose-500 mt-2">뷰티 크리에이터 • 메이크업 아티스트</p>

        {/* 팔로워 */}
        <div className="mt-6 flex justify-center gap-6">
          <div className="bg-white rounded-xl px-6 py-3 shadow">
            <p className="text-2xl font-bold text-rose-600">89K</p>
            <p className="text-slate-500 text-xs">구독자</p>
          </div>
          <div className="bg-white rounded-xl px-6 py-3 shadow">
            <p className="text-2xl font-bold text-rose-600">200+</p>
            <p className="text-slate-500 text-xs">영상</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-2xl">
          <p className="text-slate-600 leading-relaxed">
            안녕하세요! 뷰티 크리에이터 수아예요 💕<br /><br />
            데일리 메이크업부터 특별한 날 메이크업까지<br />
            쉽고 예쁜 뷰티 팁을 공유해요!
          </p>
        </div>

        {/* 카테고리 */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">💄 메이크업</span>
          <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">💅 네일</span>
          <span className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium">💆 스킨케어</span>
          <span className="px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">👗 패션</span>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-red-600 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube</span>
            <span className="ml-auto text-sm opacity-80">뷰티수아</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@beauty_sua</span>
          </a>
        </div>

        {/* 인기 영상 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <p className="text-rose-600 font-bold mb-4">🔥 인기 영상</p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-2 bg-rose-50 rounded-lg">
              <span className="text-xl">💄</span>
              <p className="text-slate-700 text-sm">데일리 메이크업 (조회수 50만)</p>
            </div>
            <div className="flex items-center gap-3 p-2 bg-rose-50 rounded-lg">
              <span className="text-xl">✨</span>
              <p className="text-slate-700 text-sm">올해 꿀템 TOP 10</p>
            </div>
          </div>
        </div>

        {/* 협찬 문의 */}
        <div className="mt-8 p-4 bg-rose-100 rounded-xl">
          <p className="text-rose-500 text-sm">💼 협찬/광고 문의</p>
          <p className="text-rose-700 font-medium">beautysua@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P41</strong> 뷰티 크리에이터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
