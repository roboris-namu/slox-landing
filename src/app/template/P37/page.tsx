export default function TemplateP37() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-700 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 유튜브 로고 스타일 */}
        <div className="text-6xl mb-4">▶️</div>

        {/* 채널명 */}
        <h1 className="text-4xl font-bold text-white">
          크리에이터 TV
        </h1>
        <p className="text-red-200 mt-2">@creator_tv</p>

        {/* 구독자 */}
        <div className="mt-8 py-6 bg-white/10 backdrop-blur rounded-2xl">
          <p className="text-red-200 text-sm">SUBSCRIBERS</p>
          <p className="text-4xl font-bold text-white mt-2">1.2M</p>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-2xl">
          <p className="text-white leading-relaxed">
            안녕하세요! 크리에이터 TV입니다 👋<br /><br />
            매주 화/금 저녁 6시<br />
            재미있는 콘텐츠로 찾아옵니다!
          </p>
        </div>

        {/* 채널 링크 */}
        <a href="#" className="block mt-8 bg-red-500 text-white rounded-xl p-4 font-bold text-lg hover:bg-red-600 transition-colors">
          ▶️ 유튜브 채널 구독하기
        </a>

        {/* 최근 영상 */}
        <div className="mt-8">
          <p className="text-red-300 font-bold mb-4">📺 최근 영상</p>
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left flex gap-4">
              <div className="w-24 h-16 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">🎬</div>
              <div>
                <p className="text-white font-medium text-sm">최신 브이로그 업로드!</p>
                <p className="text-red-300 text-xs mt-1">조회수 12만회 • 3일 전</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-left flex gap-4">
              <div className="w-24 h-16 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">🎬</div>
              <div>
                <p className="text-white font-medium text-sm">Q&A 라이브 다시보기</p>
                <p className="text-red-300 text-xs mt-1">조회수 8만회 • 1주 전</p>
              </div>
            </div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">📷</a>
          <a href="#" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">🐦</a>
          <a href="#" className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white text-xl">🎵</a>
        </div>

        {/* 비즈니스 문의 */}
        <div className="mt-8 p-4 bg-white/5 rounded-xl">
          <p className="text-red-300 text-sm">비즈니스 문의</p>
          <p className="text-white">creator@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P37</strong> 유튜버</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-red-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
