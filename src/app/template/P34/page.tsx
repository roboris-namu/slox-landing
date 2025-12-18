export default function TemplateP34() {
  const links = [
    { name: "YouTube", icon: "📺", color: "bg-pink-100 text-pink-600" },
    { name: "Instagram", icon: "💕", color: "bg-purple-100 text-purple-600" },
    { name: "Shop", icon: "🛍️", color: "bg-blue-100 text-blue-600" },
    { name: "Blog", icon: "✨", color: "bg-yellow-100 text-yellow-600" },
    { name: "Contact", icon: "💌", color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 파스텔 프로필 */}
        <div className="mb-10">
          <div className="w-28 h-28 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
            🌸
          </div>
          <h1 className="text-2xl font-bold text-gray-700">@pastel_life</h1>
          <p className="text-gray-400 mt-1">라이프스타일 크리에이터 💕</p>
        </div>

        {/* 파스텔 링크 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`block w-full py-4 px-6 ${link.color} rounded-2xl font-medium hover:scale-105 transition-transform shadow-sm`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* 소셜 */}
        <div className="mt-10 text-gray-400 text-sm">
          Made with 💕 in Seoul
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P34</strong> 파스텔 소프트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-pink-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

