export default function TemplateF21() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* 헤더 */}
      <header className="py-6 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">📷 하윤이네 포토다이어리</h1>
          <span className="text-slate-400 text-sm">Since 2021</span>
        </div>
      </header>

      {/* 커버 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-slate-300 rounded-2xl flex items-center justify-center text-9xl">
            👧
          </div>
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-slate-800">이하윤</h2>
            <p className="text-slate-500">2021년 7월 10일생 | 3살</p>
          </div>
        </div>
      </section>

      {/* 월별 앨범 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6">📅 2024년 앨범</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월"].map((month) => (
              <div key={month} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-slate-200 flex items-center justify-center text-4xl">
                  📷
                </div>
                <div className="p-3 text-center">
                  <p className="text-slate-800 font-medium">{month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하이라이트 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6">⭐ 베스트 컷</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] bg-slate-200 rounded-xl flex items-center justify-center text-6xl">
                📸
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-slate-400">
        <p>하윤이의 소중한 순간들</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F21</strong> 포토 다이어리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

