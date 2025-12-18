export default function TemplateF09() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="py-16 px-6 text-center">
        <h1 className="text-4xl font-light text-gray-800 tracking-widest">HAN FAMILY</h1>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
      </header>

      {/* 메인 */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-9xl">👨‍👩‍👧‍👦</span>
          </div>
        </div>
      </section>

      {/* 가족 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            {["아빠", "엄마", "아들", "딸"].map((role) => (
              <div key={role} className="text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4" />
                <p className="text-gray-600">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-gray-400 text-sm tracking-widest mb-8">MOMENTS</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100" />
            ))}
          </div>
        </div>
      </section>

      {/* 메시지 */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400 font-light text-lg">
            &ldquo;Simple moments, lasting memories&rdquo;
          </p>
        </div>
      </section>

      {/* 연락처 */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400 text-sm">한씨 가족에게 연락하기</p>
          <a href="mailto:family@han.com" className="text-gray-600 hover:text-gray-900 mt-2 inline-block">
            family@han.com
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-gray-300 text-sm">
        <p>Since 2012</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F09</strong> 심플 화이트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

