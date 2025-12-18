export default function TemplateB33() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light text-amber-700">✨ WAX STUDIO</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#menu">Menu</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-100 to-orange-50 text-center">
        <span className="text-6xl">✨</span>
        <h2 className="text-3xl font-light text-amber-800 mt-6">부드러운 피부의 시작</h2>
        <p className="text-amber-600 mt-2">브라질리언 왁싱 전문</p>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-amber-800 text-center mb-8">Menu</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-amber-700 mb-4">👩 여성</h4>
              <div className="space-y-3">
                {[
                  { name: "브라질리언", price: "50,000" },
                  { name: "겨드랑이", price: "20,000" },
                  { name: "팔 전체", price: "35,000" },
                  { name: "다리 전체", price: "60,000" },
                  { name: "등 전체", price: "50,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between bg-white p-3 rounded-lg">
                    <span>{item.name}</span>
                    <span className="text-amber-600">{item.price}원</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-amber-700 mb-4">👨 남성</h4>
              <div className="space-y-3">
                {[
                  { name: "브라질리언", price: "60,000" },
                  { name: "겨드랑이", price: "25,000" },
                  { name: "가슴", price: "40,000" },
                  { name: "다리 전체", price: "70,000" },
                  { name: "등 전체", price: "60,000" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between bg-white p-3 rounded-lg">
                    <span>{item.name}</span>
                    <span className="text-amber-600">{item.price}원</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 안내 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-medium text-amber-800 text-center mb-6">주의사항</h3>
          <div className="bg-amber-50 p-6 rounded-xl">
            <ul className="space-y-2 text-sm text-amber-700">
              <li>✓ 시술 전 0.5cm 이상 털 길이 필요</li>
              <li>✓ 생리 기간 시술 불가</li>
              <li>✓ 레이저 시술 후 2주간 시술 불가</li>
              <li>✓ 예약 변경은 24시간 전 연락</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-amber-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-4 text-amber-100">완전 예약제 운영</p>
          <p className="mt-6">📞 010-1234-5678</p>
          <p className="text-amber-200 text-sm mt-2">서울시 강남구 논현동 123</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-500 text-sm">
        <p>© 2024 WAX STUDIO</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B33</strong> 왁싱샵</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

