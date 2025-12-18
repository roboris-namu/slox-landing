export default function TemplateF05() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-light text-gray-900 tracking-wide">JUNG FAMILY</h1>
          <div className="w-12 h-px bg-gray-300 mx-auto mt-4" />
        </div>
      </header>

      {/* 메인 */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-48 h-48 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center text-7xl">
            👨‍👩‍👧
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">정씨네</h2>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            심플하고 깔끔하게, 우리 가족의 이야기를 담습니다.
          </p>
        </div>
      </section>

      {/* 가족 */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-12">
            {[
              { name: "정태우", role: "아빠" },
              { name: "한소희", role: "엄마" },
              { name: "정유진", role: "딸" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4" />
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100" />
            ))}
          </div>
        </div>
      </section>

      {/* 메시지 */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400 text-lg font-light italic">
            Simple is Beautiful
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-gray-300 text-sm">
        <p>Since 2018</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F05</strong> 미니멀 패밀리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

