export default function TemplateP31() {
  const links = [
    { name: "YouTube", icon: "▶️" },
    { name: "Instagram", icon: "📷" },
    { name: "TikTok", icon: "🎵" },
    { name: "Shop", icon: "🛍️" },
    { name: "Blog", icon: "✍️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-purple-400 to-cyan-400 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 프로필 */}
        <div className="mb-10">
          <div className="w-28 h-28 bg-white/30 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            🌈
          </div>
          <h1 className="text-3xl font-bold text-white">@rainbow</h1>
          <p className="text-white/80">컬러풀한 세상을 만들어요</p>
        </div>

        {/* 링크 */}
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className="block w-full py-4 px-6 bg-white/90 backdrop-blur-sm rounded-2xl text-gray-800 font-semibold hover:bg-white transition-all hover:scale-105 shadow-lg"
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* 구분선 */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-white/60 text-sm">Follow Me</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* 소셜 */}
        <div className="flex justify-center gap-4">
          {["💬", "📱", "✉️"].map((icon, idx) => (
            <a key={idx} href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl hover:bg-white/30 transition-colors">
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-900"><strong>P31</strong> 그라데이션</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-gradient-to-r from-rose-500 to-purple-500 text-white text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

