export default function TemplateF03() {
  const timeline = [
    { year: "2010", title: "우리의 시작", desc: "결혼식을 올렸어요", icon: "💒" },
    { year: "2012", title: "첫째 탄생", desc: "민준이가 태어났어요", icon: "👶" },
    { year: "2015", title: "둘째 탄생", desc: "서연이가 태어났어요", icon: "👶" },
    { year: "2018", title: "새집 이사", desc: "꿈에 그리던 집으로", icon: "🏠" },
    { year: "2020", title: "가족 여행", desc: "첫 해외여행을 갔어요", icon: "✈️" },
    { year: "2024", title: "지금", desc: "행복하게 지내고 있어요", icon: "❤️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50">
      {/* 헤더 */}
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold text-rose-900">📅 이씨네 타임라인</h1>
        <p className="text-rose-600 mt-2">우리 가족의 역사를 기록합니다</p>
      </header>

      {/* 타임라인 */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto relative">
          {/* 중앙선 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-rose-200" />

          <div className="space-y-16">
            {timeline.map((item, idx) => (
              <div key={item.year} className={`flex items-center ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${idx % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <span className="text-4xl block mb-3">{item.icon}</span>
                    <span className="text-rose-500 font-bold">{item.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-gray-500 mt-2">{item.desc}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-rose-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center text-white text-xs font-bold">
                  ♥
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가족 사진 */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-rose-900 mb-8">우리 가족</h3>
          <div className="w-64 h-64 bg-rose-100 rounded-full mx-auto flex items-center justify-center text-8xl">
            👨‍👩‍👧‍👦
          </div>
          <p className="mt-6 text-rose-700 text-lg">
            이철수 ♥ 박영미<br />
            민준 & 서연
          </p>
        </div>
      </section>

      {/* 메시지 */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-serif text-rose-800 italic">
            &ldquo;함께라서 더 빛나는 우리의 이야기&rdquo;
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-500">
        <p>Lee Family 2010 ~ Forever</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 to-orange-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F03</strong> 타임라인</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

