export default function TemplateB34() {
  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light text-emerald-700">🧴 SKIN LAB</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#treatments">Treatments</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-100 to-teal-50 text-center">
        <span className="text-6xl">🧴</span>
        <h2 className="text-3xl font-light text-emerald-800 mt-6">맑고 건강한 피부</h2>
        <p className="text-emerald-600 mt-2">에스테틱 & 피부관리 전문</p>
      </section>

      {/* 트리트먼트 */}
      <section id="treatments" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-emerald-800 text-center mb-8">Treatments</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "딥클렌징", price: "60,000원", desc: "모공 각질 케어", time: "60분" },
              { name: "수분관리", price: "80,000원", desc: "보습 집중 케어", time: "70분" },
              { name: "미백관리", price: "90,000원", desc: "톤업 & 잡티 케어", time: "80분" },
              { name: "리프팅", price: "100,000원", desc: "탄력 집중 케어", time: "80분" },
              { name: "여드름관리", price: "70,000원", desc: "트러블 집중 케어", time: "70분" },
              { name: "신부관리", price: "150,000원", desc: "웨딩 스페셜 코스", time: "120분" },
            ].map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="font-medium text-emerald-800">{item.name}</h4>
                <p className="text-emerald-600 font-bold text-lg mt-2">{item.price}</p>
                <p className="text-slate-500 text-sm mt-2">{item.desc}</p>
                <p className="text-slate-400 text-xs mt-1">⏱ {item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 패키지 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-emerald-800 text-center mb-8">Package</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "10회 정기 케어", price: "500,000원", desc: "10회 + 2회 서비스" },
              { name: "웨딩 패키지", price: "400,000원", desc: "4회 집중 케어" },
            ].map((pkg) => (
              <div key={pkg.name} className="p-6 border-2 border-emerald-200 rounded-2xl text-center hover:border-emerald-400 transition-colors">
                <h4 className="font-bold text-emerald-800">{pkg.name}</h4>
                <p className="text-2xl font-bold text-emerald-600 mt-4">{pkg.price}</p>
                <p className="text-slate-500 text-sm mt-2">{pkg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-emerald-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-6">📞 02-123-4567</p>
          <p className="text-emerald-200 text-sm mt-2">10:00 - 20:00 (일요일 휴무)</p>
          <p className="text-emerald-200 text-sm mt-1">서울시 서초구 잠원동 456</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-500 text-sm">
        <p>© 2024 SKIN LAB</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B34</strong> 피부관리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

