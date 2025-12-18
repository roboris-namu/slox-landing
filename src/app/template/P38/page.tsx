export default function TemplateP38() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-slate-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-6xl border-4 border-purple-400">
          🎮
        </div>

        {/* 닉네임 */}
        <h1 className="text-4xl font-bold text-white mt-6">
          GameMaster
        </h1>
        <p className="text-purple-400 mt-2">스트리머 • 프로게이머</p>

        {/* 온라인 상태 */}
        <div className="mt-6 inline-flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full">
          <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
          <span className="text-white font-bold">LIVE NOW</span>
        </div>

        {/* 통계 */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-purple-400 text-xs">팔로워</p>
            <p className="text-white font-bold text-xl">50K</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-purple-400 text-xs">평균 시청자</p>
            <p className="text-white font-bold text-xl">2.5K</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-purple-400 text-xs">총 시청시간</p>
            <p className="text-white font-bold text-xl">1M+</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-2xl text-left">
          <p className="text-white leading-relaxed">
            🎮 FPS 전문 스트리머<br />
            🏆 20XX 대회 우승<br />
            📅 매일 밤 9시 방송<br /><br />
            게임하면서 수다 떨어요! 놀러오세요 😊
          </p>
        </div>

        {/* 방송 플랫폼 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="block bg-purple-600 text-white rounded-xl p-4 font-bold hover:bg-purple-700 transition-colors">
            🟣 치지직에서 보기
          </a>
          <a href="#" className="block bg-violet-600 text-white rounded-xl p-4 font-bold hover:bg-violet-700 transition-colors">
            🟣 트위치에서 보기
          </a>
        </div>

        {/* 주요 게임 */}
        <div className="mt-8">
          <p className="text-purple-400 font-bold mb-4">🎯 주요 게임</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">발로란트</span>
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">오버워치</span>
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">LoL</span>
          </div>
        </div>

        {/* 후원 */}
        <div className="mt-8 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
          <p className="text-amber-400">💎 후원하기</p>
          <p className="text-white text-sm mt-1">응원해주시면 힘이 됩니다!</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P38</strong> 스트리머</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
