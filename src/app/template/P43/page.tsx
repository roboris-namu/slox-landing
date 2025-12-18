export default function TemplateP43() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center text-6xl shadow-xl">
          ✈️
        </div>

        {/* 채널명 */}
        <h1 className="text-4xl font-bold text-white mt-6">
          여행하는 준
        </h1>
        <p className="text-cyan-100 mt-2">여행 브이로거 • 세계일주</p>

        {/* 통계 */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl px-5 py-3">
            <p className="text-xl font-bold text-white">45</p>
            <p className="text-cyan-100 text-xs">방문국</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl px-5 py-3">
            <p className="text-xl font-bold text-white">180K</p>
            <p className="text-cyan-100 text-xs">구독자</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl px-5 py-3">
            <p className="text-xl font-bold text-white">350+</p>
            <p className="text-cyan-100 text-xs">영상</p>
          </div>
        </div>

        {/* 현재 위치 */}
        <div className="mt-8 py-4 bg-white/20 backdrop-blur rounded-2xl">
          <p className="text-cyan-100 text-sm">📍 현재 위치</p>
          <p className="text-white text-xl font-bold mt-1">🇯🇵 일본 도쿄</p>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/20 backdrop-blur rounded-2xl">
          <p className="text-white leading-relaxed">
            세상 모든 곳을 여행하는 준입니다 🌍<br /><br />
            여행 팁 | 현지 맛집 | 숙소 리뷰<br />
            함께 떠나요!
          </p>
        </div>

        {/* 지역별 콘텐츠 */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <span className="text-2xl">🇯🇵</span>
            <p className="text-white text-xs mt-1">일본</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <span className="text-2xl">🇹🇭</span>
            <p className="text-white text-xs mt-1">태국</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <span className="text-2xl">🇫🇷</span>
            <p className="text-white text-xs mt-1">프랑스</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <span className="text-2xl">🇺🇸</span>
            <p className="text-white text-xs mt-1">미국</p>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-white text-slate-800 rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube</span>
            <span className="ml-auto text-sm text-slate-500">여행하는 준</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-white/20 backdrop-blur text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@travel_jun</span>
          </a>
        </div>

        {/* 협업 문의 */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl">
          <p className="text-cyan-100 text-sm">✉️ 협업/제휴 문의</p>
          <p className="text-white font-medium">traveljun@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-cyan-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P43</strong> 여행 크리에이터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-cyan-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
