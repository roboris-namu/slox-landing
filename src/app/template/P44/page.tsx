export default function TemplateP44() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-purple-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 음표 장식 */}
        <div className="text-5xl mb-4">🎵</div>

        {/* 아티스트명 */}
        <h1 className="text-4xl font-bold text-white">
          MELODY
        </h1>
        <p className="text-purple-300 mt-2">싱어송라이터 • 작곡가</p>

        {/* 음원 플랫폼 */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">🎧</div>
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">🎵</div>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl">☁️</div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-2xl">
          <p className="text-purple-100 leading-relaxed">
            음악으로 이야기하는 MELODY입니다 🎤<br /><br />
            감성 발라드 | 어쿠스틱 | 커버곡<br />
            매주 새로운 음악을 들려드려요!
          </p>
        </div>

        {/* 최신 음원 */}
        <div className="mt-8 bg-gradient-to-r from-purple-600/50 to-pink-600/50 backdrop-blur rounded-2xl p-6">
          <p className="text-purple-200 text-sm">🔥 NEW RELEASE</p>
          <p className="text-white text-xl font-bold mt-2">밤하늘 아래서</p>
          <p className="text-purple-300 text-sm mt-1">2025.03.01 발매</p>
          <a href="#" className="inline-block mt-4 px-6 py-2 bg-white text-purple-600 rounded-full font-bold hover:scale-105 transition-transform">
            ▶️ 듣기
          </a>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-red-600 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube</span>
            <span className="ml-auto text-sm opacity-80">MELODY 음악</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@melody_music</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-slate-700 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🎵</span>
            <span className="font-bold">TikTok</span>
            <span className="ml-auto text-sm opacity-80">@melody_music</span>
          </a>
        </div>

        {/* 디스코그래피 */}
        <div className="mt-8">
          <p className="text-purple-300 font-bold mb-4">💿 DISCOGRAPHY</p>
          <div className="flex justify-center gap-3">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl">🎵</div>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-2xl">🎵</div>
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg flex items-center justify-center text-2xl">🎵</div>
          </div>
        </div>

        {/* 섭외 문의 */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl">
          <p className="text-purple-300 text-sm">🎤 공연/섭외 문의</p>
          <p className="text-white font-medium">melody@music.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P44</strong> 음악 크리에이터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
