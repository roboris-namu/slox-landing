export default function TemplateB07() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-white border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">🌐 GLOBAL<span className="text-emerald-500">CORP</span></h1>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#about">About</a>
            <a href="#global">Global</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">
            Connecting the World
          </h2>
          <p className="mt-6 text-emerald-100 text-lg max-w-xl">
            전 세계 30개국에서 활동하는 글로벌 기업
            GLOBALCORP와 함께 세계 시장으로 진출하세요.
          </p>
        </div>
      </header>

      {/* 글로벌 현황 */}
      <section id="global" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Global Presence</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { num: "30+", label: "Countries", icon: "🌍" },
              { num: "50+", label: "Offices", icon: "🏢" },
              { num: "5,000+", label: "Employees", icon: "👥" },
              { num: "$1B+", label: "Revenue", icon: "💰" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8 rounded-2xl shadow-sm">
                <span className="text-4xl">{stat.icon}</span>
                <p className="text-3xl font-bold text-emerald-600 mt-4">{stat.num}</p>
                <p className="text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지역별 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Regional Offices</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { region: "아시아 태평양", offices: "서울, 도쿄, 싱가포르, 시드니", flag: "🌏" },
              { region: "유럽", offices: "런던, 파리, 프랑크푸르트", flag: "🌍" },
              { region: "미주", offices: "뉴욕, LA, 상파울루", flag: "🌎" },
            ].map((r) => (
              <div key={r.region} className="p-6 border rounded-xl">
                <span className="text-3xl">{r.flag}</span>
                <h4 className="text-lg font-bold mt-4">{r.region}</h4>
                <p className="text-slate-500 mt-2 text-sm">{r.offices}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 비즈니스 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Business Areas</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {["무역/유통", "물류/운송", "금융서비스", "IT솔루션"].map((biz) => (
              <div key={biz} className="bg-emerald-600 text-white p-6 rounded-xl text-center font-bold">
                {biz}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold">Headquarters</h3>
            <p className="text-slate-400 mt-4">서울특별시 중구 세종대로 110</p>
            <p className="text-slate-400">Global Center 25F</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Contact</h3>
            <p className="text-slate-400 mt-4">Tel: +82-2-1234-5678</p>
            <p className="text-slate-400">Email: global@globalcorp.com</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 GLOBALCORP. All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B07</strong> 글로벌 기업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

