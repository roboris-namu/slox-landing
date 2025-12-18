export default function TemplateP45() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-rose-100 to-violet-100">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-gradient-to-br from-amber-400 via-rose-400 to-violet-400 rounded-full mx-auto flex items-center justify-center text-6xl border-4 border-white shadow-xl">
          🎨
        </div>

        {/* 이름 */}
        <h1 className="text-3xl font-bold text-slate-800 mt-6" style={{ fontFamily: 'cursive' }}>
          ARTY
        </h1>
        <p className="text-rose-500 mt-2">일러스트레이터 • 디지털 아티스트</p>

        {/* 통계 */}
        <div className="mt-6 flex justify-center gap-6">
          <div>
            <p className="text-2xl font-bold text-slate-800">75K</p>
            <p className="text-slate-500 text-sm">팔로워</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">500+</p>
            <p className="text-slate-500 text-sm">작품</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-2xl">
          <p className="text-slate-600 leading-relaxed">
            상상을 그림으로 표현하는 ARTY입니다 ✨<br /><br />
            캐릭터 일러스트 | 팬아트 | 굿즈 제작<br />
            그림으로 행복을 전해요!
          </p>
        </div>

        {/* 작품 갤러리 */}
        <div className="mt-8">
          <p className="text-slate-700 font-bold mb-4">🖼️ GALLERY</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-rose-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-rose-200 to-violet-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-violet-200 to-blue-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-cyan-200 to-green-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-green-200 to-amber-200 rounded-lg"></div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@arty_draws</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-blue-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🐦</span>
            <span className="font-bold">Twitter</span>
            <span className="ml-auto text-sm opacity-80">@arty_draws</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-cyan-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🎨</span>
            <span className="font-bold">ArtStation</span>
            <span className="ml-auto text-sm opacity-80">arty</span>
          </a>
        </div>

        {/* 작업 의뢰 */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl p-6">
          <p className="text-slate-700 font-bold">✏️ 커미션 OPEN</p>
          <p className="text-slate-500 text-sm mt-2">캐릭터 일러스트, 프로필 그림, 굿즈 제작</p>
          <a href="#" className="inline-block mt-4 px-6 py-2 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors">
            의뢰하기
          </a>
        </div>

        {/* 문의 */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow">
          <p className="text-slate-500 text-sm">💼 비즈니스 문의</p>
          <p className="text-slate-700 font-medium">arty@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P45</strong> 아티스트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
