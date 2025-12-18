export default function TemplateB06() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🏭 대한정밀 (주)</h1>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about">회사소개</a>
            <a href="#products">제품</a>
            <a href="#contact">문의</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-20 px-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            정밀 기술의 선두주자
          </h2>
          <p className="mt-4 text-blue-200 max-w-xl">
            40년 전통의 정밀 가공 기술력으로 
            자동차, 반도체, 항공 산업을 지원합니다.
          </p>
        </div>
      </header>

      {/* 회사 소개 */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">회사 소개</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-slate-600 leading-relaxed">
              대한정밀(주)는 1984년 설립 이래 정밀 부품 가공 분야에서
              최고의 기술력을 보유한 제조 전문 기업입니다.
              CNC 가공, 금형 제작, 표면 처리까지 일괄 생산 체계를 구축하여
              고객에게 최상의 품질을 제공합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "설립", value: "1984년" },
                { label: "직원", value: "120명" },
                { label: "공장", value: "5,000평" },
                { label: "인증", value: "ISO 9001" },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 p-4 rounded-lg text-center">
                  <p className="text-blue-800 font-bold text-lg">{item.value}</p>
                  <p className="text-slate-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 제품 */}
      <section id="products" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">생산 제품</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚗", title: "자동차 부품", desc: "엔진, 변속기 부품" },
              { icon: "💾", title: "반도체 장비", desc: "정밀 가공 부품" },
              { icon: "✈️", title: "항공 부품", desc: "고정밀 항공 부품" },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h4 className="text-lg font-bold mt-4">{item.title}</h4>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 설비 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">생산 설비</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["CNC 선반 20대", "머시닝센터 15대", "와이어컷 8대", "연삭기 10대"].map((equip) => (
              <div key={equip} className="bg-blue-50 p-4 rounded-lg text-center text-blue-800">
                {equip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <p>경기도 화성시 동탄산업단지로 123</p>
          <p className="mt-2">Tel: 031-123-4567 | Fax: 031-123-4568</p>
          <p className="mt-2">Email: info@daehan.co.kr</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 대한정밀(주). All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-800 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B06</strong> 제조업체</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

