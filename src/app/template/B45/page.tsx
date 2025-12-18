export default function TemplateB45() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* 프로필 */}
        <div className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full mx-auto flex items-center justify-center text-4xl">
            👋
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mt-6">김소셜</h1>
          <p className="text-violet-600">콘텐츠 크리에이터</p>
          <p className="text-slate-500 text-sm mt-2">
            @social_kim
          </p>
        </div>

        {/* SNS 링크 */}
        <div className="px-6 pb-8 space-y-3">
          <a href="#" className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">📷</span>
            <div>
              <p className="font-bold">Instagram</p>
              <p className="text-sm opacity-80">@social_kim</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">🐦</span>
            <div>
              <p className="font-bold">Twitter</p>
              <p className="text-sm opacity-80">@social_kim</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">▶️</span>
            <div>
              <p className="font-bold">YouTube</p>
              <p className="text-sm opacity-80">소셜킴TV</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">🎵</span>
            <div>
              <p className="font-bold">TikTok</p>
              <p className="text-sm opacity-80">@social_kim</p>
            </div>
          </a>
        </div>

        {/* 연락 버튼 */}
        <div className="px-6 pb-8 grid grid-cols-2 gap-3">
          <a href="mailto:social@email.com" className="py-3 bg-violet-100 text-violet-700 rounded-xl text-center font-bold hover:bg-violet-200 transition-colors">
            ✉️ 이메일
          </a>
          <button className="py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors">
            📥 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-pink-600 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B45</strong> SNS 명함</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-violet-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

