export default function TemplateP29() {
  const links = [
    { name: "Portfolio", icon: "🎨", color: "bg-rose-500" },
    { name: "Shop", icon: "🛒", color: "bg-amber-500" },
    { name: "YouTube", icon: "▶️", color: "bg-red-500" },
    { name: "Instagram", icon: "📷", color: "bg-pink-500" },
    { name: "Twitter", icon: "🐦", color: "bg-sky-500" },
    { name: "TikTok", icon: "🎵", color: "bg-gray-900" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md text-center">
        {/* 프로필 */}
        <div className="mb-10">
          <div className="w-28 h-28 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-gray-900">@creator_name</h1>
          <p className="text-gray-500">콘텐츠 크리에이터</p>
        </div>

        {/* 아이콘 카드 그리드 */}
        <div className="grid grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`${link.color} text-white p-6 rounded-2xl hover:scale-105 transition-transform shadow-lg`}
            >
              <span className="text-3xl block mb-2">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
        </div>

        {/* 연락처 */}
        <div className="mt-8 p-4 bg-white rounded-xl">
          <p className="text-gray-500 text-sm">📧 hello@creator.com</p>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P29</strong> 아이콘 카드</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

