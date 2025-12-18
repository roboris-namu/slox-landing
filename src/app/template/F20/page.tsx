export default function TemplateF20() {
  const timeline = [
    { age: "0세", title: "탄생", events: ["첫 울음", "첫 수유"], color: "bg-pink-400" },
    { age: "1세", title: "첫돌", events: ["첫 걸음마", "첫 말 '엄마'"], color: "bg-rose-400" },
    { age: "2세", title: "호기심", events: ["두 단어 조합", "숫자 세기"], color: "bg-orange-400" },
    { age: "3세", title: "탐험가", events: ["유치원 입학", "자전거 배우기"], color: "bg-amber-400" },
    { age: "4세", title: "꿈나무", events: ["글자 읽기", "그림 그리기"], color: "bg-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-8 text-center">
        <span className="text-5xl">📏</span>
        <h1 className="text-2xl font-bold text-amber-900 mt-4">민준이의 타임라인</h1>
        <p className="text-amber-600">2020년 5월 20일생</p>
      </header>

      {/* 타임라인 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-200" />
            <div className="space-y-8">
              {timeline.map((t) => (
                <div key={t.age} className="flex gap-4">
                  <div className={`w-16 h-16 ${t.color} rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg`}>
                    {t.age}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-amber-900">{t.title}</h3>
                    <ul className="mt-2 text-sm text-amber-600">
                      {t.events.map((e) => (
                        <li key={e}>• {e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 현재 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-bold text-amber-900 mb-4">🌟 현재의 민준이</h3>
          <div className="inline-block w-32 h-32 bg-amber-200 rounded-full flex items-center justify-center text-6xl">
            👦
          </div>
          <p className="mt-4 text-amber-700">
            4살이 된 민준이는 호기심 많은 탐험가!<br />
            매일 새로운 것을 배우고 있어요.
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-500">
        <p>🌈 민준이의 성장을 함께해요 🌈</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F20</strong> 키즈 타임라인</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

