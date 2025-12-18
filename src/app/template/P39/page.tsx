export default function TemplateP39() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 프로필 */}
        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full mx-auto flex items-center justify-center text-6xl border-4 border-white shadow-xl">
          ⭐
        </div>

        {/* 이름 */}
        <h1 className="text-3xl font-bold text-slate-800 mt-6">
          민지 ✨
        </h1>
        <p className="text-purple-500 mt-2">@minji_star</p>

        {/* 팔로워 */}
        <div className="mt-6 flex justify-center gap-8">
          <div>
            <p className="text-2xl font-bold text-slate-800">125K</p>
            <p className="text-slate-500 text-sm">팔로워</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">342</p>
            <p className="text-slate-500 text-sm">게시물</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mt-8 p-6 bg-white/80 backdrop-blur rounded-2xl">
          <p className="text-slate-600 leading-relaxed">
            라이프스타일 인플루언서 💫<br />
            일상 | 패션 | 여행<br /><br />
            ✉️ minji@email.com
          </p>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 space-y-3">
          <a href="#" className="flex items-center gap-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <span className="font-bold">Instagram</span>
            <span className="ml-auto text-sm opacity-80">@minji_star</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-slate-900 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">🎵</span>
            <span className="font-bold">TikTok</span>
            <span className="ml-auto text-sm opacity-80">@minji_star</span>
          </a>
          <a href="#" className="flex items-center gap-4 bg-red-600 text-white rounded-xl p-4 hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <span className="font-bold">YouTube</span>
            <span className="ml-auto text-sm opacity-80">민지의 일상</span>
          </a>
        </div>

        {/* 최근 콘텐츠 */}
        <div className="mt-8">
          <p className="text-slate-700 font-bold mb-4">📸 최근 게시물</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg"></div>
            <div className="aspect-square bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg"></div>
          </div>
        </div>

        {/* 협찬 문의 */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow">
          <p className="text-slate-500 text-sm">💼 협찬/광고 문의</p>
          <p className="text-slate-700 font-medium">business@email.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P39</strong> 인플루언서</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}
