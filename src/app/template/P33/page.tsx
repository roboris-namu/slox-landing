export default function TemplateP33() {
  const links = [
    { name: "Website" },
    { name: "Portfolio" },
    { name: "Blog" },
    { name: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-sm text-center">
        {/* 미니멀 프로필 */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-black rounded-full mx-auto mb-6" />
          <h1 className="text-xl font-light tracking-widest text-gray-900">MINIMAL</h1>
          <div className="w-8 h-[1px] bg-gray-300 mx-auto my-4" />
          <p className="text-gray-400 text-sm">Designer</p>
        </div>

        {/* 심플 링크 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              className="block w-full py-4 border border-gray-200 text-gray-700 text-sm tracking-wider hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              {link.name.toUpperCase()}
            </a>
          ))}
        </div>

        {/* 소셜 */}
        <div className="mt-12 flex justify-center gap-8 text-gray-400 text-sm">
          <a href="#" className="hover:text-gray-900">IG</a>
          <a href="#" className="hover:text-gray-900">TW</a>
          <a href="#" className="hover:text-gray-900">BE</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P33</strong> 미니멀 모노</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

