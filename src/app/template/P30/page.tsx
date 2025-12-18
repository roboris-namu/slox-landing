export default function TemplateP30() {
  const links = [
    { name: "최신 영상 보기", url: "#" },
    { name: "굿즈 스토어", url: "#" },
    { name: "팬카페 가입", url: "#" },
    { name: "비즈니스 문의", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-600 to-indigo-800 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        {/* 프로필 카드 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 text-center text-white">
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
            👤
          </div>
          <h1 className="text-2xl font-bold">크리에이터 이름</h1>
          <p className="text-white/70 mt-1">유튜버 | 인플루언서</p>
          <p className="text-white/50 text-sm mt-3">
            ✨ 구독자 100만 ✨<br />
            영상으로 세상을 더 즐겁게!
          </p>
          
          {/* 소셜 아이콘 */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
              📺
            </a>
            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
              📷
            </a>
            <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
              🐦
            </a>
          </div>
        </div>

        {/* 링크 목록 */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="block w-full py-4 px-6 bg-white rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors text-center"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-900"><strong>P30</strong> 프로필 링크</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-violet-600 text-white text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

