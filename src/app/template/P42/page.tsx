export default function TemplateP42() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-100 to-red-100">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto flex items-center justify-center text-6xl border-4 border-white shadow-xl">
          🍳
        </div>

        {/* 채널명 */}
        <h1 className="text-3xl font-bold text-orange-700 mt-6">
          맛있는 한끼
        </h1>
        <p className="text-orange-500 mt-2">푸드 크리에이터 • 먹방 유튜버</p>

        {/* 통계 */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="bg-white rounded-xl px-5 py-3 shadow">
            <p className="text-xl font-bold text-orange-600">320K</p>
            <p className="text-slate-500 text-xs">구독자</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow">
            <p className="text-xl font-bold text-orange-600">500+</p>
            <p className="text-slate-500 text-xs">영상</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow">
            <p className="text-xl font-bold text-orange-600">1M+</p>
            <p className="text-slate-500 text-xs">총 조회수</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-2xl">
          <p className="text-slate-600 leading-relaxed">
            맛있는 음식을 함께 나눠요! 🍜<br /><br />
            먹방 | 요리 레시피 | 맛집 리뷰<br />
            매주 화/금 업로드!
          </p>
        </div>

        {/* 콘텐츠 카테고리 */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow">
            <span className="text-3xl">🍜</span>
            <p className="text-orange-600 text-sm mt-2">먹방</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <span className="text-3xl">👨‍🍳</span>
            <p className="text-orange-600 text-sm mt-2">요리</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <span className="text-3xl">📍</span>
            <p className="text-orange-600 text-sm mt-2">맛집</p>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-red-600 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube</span>
            <span className="ml-auto text-sm opacity-80">맛있는 한끼</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@yummy_meal</span>
          </a>
        </div>

        {/* 최근 영상 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <p className="text-orange-600 font-bold mb-4">🔥 인기 영상</p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
              <span className="text-xl">🍖</span>
              <p className="text-slate-700 text-sm">고기뷔페 먹방 (조회수 100만)</p>
            </div>
            <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
              <span className="text-xl">🍝</span>
              <p className="text-slate-700 text-sm">10분 파스타 레시피</p>
            </div>
          </div>
        </div>

        {/* 협찬 문의 */}
        <div className="mt-8 p-4 bg-orange-100 rounded-xl">
          <p className="text-orange-500 text-sm">💼 협찬/맛집 제보</p>
          <p className="text-orange-700 font-medium">yummy@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P42</strong> 푸드 크리에이터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
