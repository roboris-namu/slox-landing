export default function TemplateB08() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="py-4 px-6 bg-blue-700 text-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">🤝 신한상사</h1>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about">회사소개</a>
            <a href="#history">연혁</a>
            <a href="#contact">문의</a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="py-16 px-6 bg-blue-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            신뢰로 쌓아온 35년
          </h2>
          <p className="mt-4 text-blue-100">
            중소기업의 든든한 파트너, 신한상사입니다.
          </p>
        </div>
      </header>

      {/* CEO 인사말 */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">CEO 인사말</h3>
          <div className="flex gap-8 items-start">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
              👨‍💼
            </div>
            <div>
              <p className="text-slate-600 leading-relaxed">
                안녕하십니까, 신한상사 대표이사 김신한입니다.<br /><br />
                1989년 창업 이래 고객 여러분의 성원에 힘입어
                중견기업으로 성장할 수 있었습니다.
                앞으로도 신뢰와 정직을 바탕으로 
                최선을 다하는 기업이 되겠습니다.
              </p>
              <p className="mt-4 font-bold text-slate-800">대표이사 김신한</p>
            </div>
          </div>
        </div>
      </section>

      {/* 회사 현황 */}
      <section id="about" className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">회사 현황</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["상호", "신한상사 (주)"],
                    ["설립일", "1989년 3월 1일"],
                    ["대표이사", "김신한"],
                    ["자본금", "10억원"],
                    ["직원수", "45명"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b">
                      <td className="py-3 font-bold text-slate-600 w-24">{label}</td>
                      <td className="py-3 text-slate-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["업종", "산업용품 도소매"],
                    ["주요거래처", "삼성, LG, SK 외"],
                    ["연매출", "150억원"],
                    ["본사", "서울시 영등포구"],
                    ["지사", "부산, 대구"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b">
                      <td className="py-3 font-bold text-slate-600 w-24">{label}</td>
                      <td className="py-3 text-slate-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section id="history" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">연혁</h3>
          <div className="space-y-4">
            {[
              { year: "2024", event: "ISO 14001 인증 취득" },
              { year: "2020", event: "대구 지사 설립" },
              { year: "2015", event: "부산 지사 설립" },
              { year: "2005", event: "본사 사옥 신축" },
              { year: "1989", event: "회사 설립" },
            ].map((h) => (
              <div key={h.year} className="flex gap-4 items-center">
                <span className="font-bold text-blue-700 w-16">{h.year}</span>
                <span className="text-slate-600">{h.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 */}
      <section id="contact" className="py-16 px-6 bg-blue-700 text-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">문의하기</h3>
          <p>서울시 영등포구 여의대로 24 신한빌딩</p>
          <p className="mt-2">Tel: 02-123-4567 | Fax: 02-123-4568</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>© 2024 신한상사(주). All rights reserved.</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B08</strong> 중소기업</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

