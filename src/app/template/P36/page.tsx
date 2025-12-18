export default function TemplateP36() {
  const links = [
    { name: "📺 YouTube Channel", color: "bg-red-500" },
    { name: "📻 Podcast", color: "bg-orange-500" },
    { name: "🛒 Merch Shop", color: "bg-yellow-500" },
    { name: "💬 Discord", color: "bg-green-500" },
    { name: "📧 Newsletter", color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-amber-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 레트로 프로필 */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-amber-300 rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl border-4 border-amber-800 shadow-[4px_4px_0px_0px_rgba(120,53,15,1)]">
            📺
          </div>
          <h1 className="text-3xl font-black text-amber-900" style={{ fontFamily: "Georgia, serif" }}>
            RETRO POP
          </h1>
          <p className="text-amber-700 mt-1">90&apos;s Nostalgia Creator</p>
        </div>

        {/* 레트로 링크 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`block w-full py-4 px-6 ${link.color} text-white font-bold rounded-lg border-4 border-amber-900 shadow-[4px_4px_0px_0px_rgba(120,53,15,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 데코 */}
        <div className="mt-8 flex justify-center gap-4 text-3xl">
          <span>⭐</span>
          <span>🌟</span>
          <span>✨</span>
        </div>

        <p className="mt-4 text-amber-700 text-sm">
          ⚡ Est. 1999 ⚡
        </p>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-900 text-amber-100 py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P36</strong> 레트로 팝</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-amber-100 text-amber-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

