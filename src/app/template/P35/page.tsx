export default function TemplateP35() {
  const links = [
    { name: "Portfolio", icon: "🎨" },
    { name: "YouTube", icon: "▶️" },
    { name: "Instagram", icon: "📷" },
    { name: "Newsletter", icon: "📬" },
    { name: "Contact", icon: "💬" },
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-6"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      <div className="w-full max-w-md text-center">
        {/* 글래스 프로필 카드 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 mb-6 border border-white/30 shadow-2xl">
          <div className="w-24 h-24 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl backdrop-blur">
            🪟
          </div>
          <h1 className="text-2xl font-bold text-white">@glassmorphism</h1>
          <p className="text-white/70 mt-1">UI/UX Designer</p>
        </div>

        {/* 글래스 링크 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className="block w-full py-4 px-6 bg-white/20 backdrop-blur-md rounded-xl text-white font-medium border border-white/30 hover:bg-white/30 transition-all"
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* 하단 */}
        <div className="mt-8 text-white/50 text-sm">
          ✨ Design with Glass Effect
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-900"><strong>P35</strong> 글래스모피즘</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

