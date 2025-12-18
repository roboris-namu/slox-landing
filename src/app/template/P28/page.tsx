export default function TemplateP28() {
  const links = [
    { name: "Portfolio", url: "#", icon: "🎨" },
    { name: "Instagram", url: "#", icon: "📸" },
    { name: "YouTube", url: "#", icon: "🎬" },
    { name: "Blog", url: "#", icon: "📝" },
    { name: "Contact", url: "#", icon: "📧" },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 프로필 */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h1 className="text-2xl font-bold text-gray-900">@username</h1>
          <p className="text-gray-500 mt-1">크리에이터 | 디자이너</p>
        </div>

        {/* 링크 목록 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="block w-full py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-900 font-medium transition-colors"
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* 소셜 */}
        <div className="mt-8 flex justify-center gap-4 text-2xl">
          <a href="#" className="hover:scale-110 transition-transform">📱</a>
          <a href="#" className="hover:scale-110 transition-transform">💬</a>
          <a href="#" className="hover:scale-110 transition-transform">✉️</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P28</strong> 심플 링크</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

