export default function TemplateP32() {
  const links = [
    { name: "Gaming Channel", icon: "🎮", color: "text-green-400 border-green-400" },
    { name: "Discord Server", icon: "💬", color: "text-purple-400 border-purple-400" },
    { name: "Merch Store", icon: "👕", color: "text-pink-400 border-pink-400" },
    { name: "Twitch Stream", icon: "📺", color: "text-violet-400 border-violet-400" },
    { name: "Donations", icon: "💝", color: "text-red-400 border-red-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 네온 프로필 */}
        <div className="mb-10">
          <div className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl bg-gray-900 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            ⚡
          </div>
          <h1 className="text-3xl font-bold text-white">
            <span className="text-cyan-400">@</span>neon_gamer
          </h1>
          <p className="text-gray-500 mt-1">Pro Gamer | Streamer</p>
        </div>

        {/* 네온 링크 */}
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`block w-full py-4 px-6 bg-gray-900/50 border-2 ${link.color} rounded-xl font-semibold hover:bg-gray-800 transition-all hover:shadow-lg`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* 소셜 */}
        <div className="mt-8 flex justify-center gap-6 text-gray-500">
          <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">YouTube</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">TikTok</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-cyan-500 text-gray-950 py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm font-medium"><strong>P32</strong> 네온 다크</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-gray-950 text-cyan-400 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

