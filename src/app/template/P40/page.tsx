export default function TemplateP40() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 마이크 아이콘 */}
        <div className="text-6xl mb-4">🎙️</div>

        {/* 팟캐스트명 */}
        <h1 className="text-4xl font-bold text-white">
          수다방 라디오
        </h1>
        <p className="text-amber-100 mt-2">매주 월/수/금 업데이트</p>

        {/* 에피소드 수 */}
        <div className="mt-8 py-6 bg-white/20 backdrop-blur rounded-2xl">
          <p className="text-amber-100 text-sm">TOTAL EPISODES</p>
          <p className="text-4xl font-bold text-white mt-2">156</p>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/20 backdrop-blur rounded-2xl">
          <p className="text-white leading-relaxed">
            일상의 이야기를 나누는 팟캐스트 🎧<br /><br />
            출퇴근길, 운동할 때, 잠들기 전<br />
            함께 수다 떨어요!
          </p>
        </div>

        {/* 플랫폼 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-white text-slate-800 rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🍎</span>
            <span className="font-bold">Apple Podcasts</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-green-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🎧</span>
            <span className="font-bold">Spotify</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-red-600 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube Music</span>
          </a>
        </div>

        {/* 최근 에피소드 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6 text-left">
          <p className="text-amber-100 font-bold mb-4">🎵 최근 에피소드</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">▶️</span>
              <div>
                <p className="text-white font-medium">EP.156 요즘 뭐하세요?</p>
                <p className="text-amber-200 text-xs">45분 • 3일 전</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">▶️</span>
              <div>
                <p className="text-white font-medium">EP.155 인생 책 추천</p>
                <p className="text-amber-200 text-xs">52분 • 1주 전</p>
              </div>
            </div>
          </div>
        </div>

        {/* 호스트 */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-2xl">👩</div>
            <p className="text-white text-sm mt-2">수진</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-2xl">👨</div>
            <p className="text-white text-sm mt-2">준호</p>
          </div>
        </div>

        {/* 문의 */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl">
          <p className="text-amber-100 text-sm">사연/광고 문의</p>
          <p className="text-white">podcast@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-orange-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P40</strong> 팟캐스터</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-orange-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
