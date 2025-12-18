export default function TemplateP23() {
  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <div className="w-24 h-24 bg-amber-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
            📊
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">최인포</h1>
          <p className="text-amber-600 font-medium">Data Analyst</p>
        </header>

        {/* 인포그래픽 스탯 */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "5+", label: "Years Exp", color: "bg-rose-500" },
            { value: "50+", label: "Projects", color: "bg-amber-500" },
            { value: "99%", label: "Accuracy", color: "bg-emerald-500" },
            { value: "24", label: "Awards", color: "bg-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">{stat.value}</span>
              </div>
              <span className="text-gray-600 text-sm">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* 스킬 차트 */}
        <section className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">기술 역량</h2>
          <div className="space-y-4">
            {[
              { name: "Python / R", level: 95, color: "bg-blue-500" },
              { name: "SQL / Database", level: 90, color: "bg-emerald-500" },
              { name: "Tableau / Power BI", level: 85, color: "bg-amber-500" },
              { name: "Machine Learning", level: 80, color: "bg-rose-500" },
              { name: "Statistics", level: 92, color: "bg-violet-500" },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 경력 & 학력 그리드 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">💼 경력</h2>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl">
                <h3 className="font-bold text-gray-900">데이터 기업</h3>
                <p className="text-amber-600 text-sm">Senior Analyst • 2021-현재</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900">컨설팅 펌</h3>
                <p className="text-gray-500 text-sm">Analyst • 2019-2021</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🎓 학력</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-gray-900">서울대학교</h3>
                <p className="text-blue-600 text-sm">통계학 석사 • 2019</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900">한국대학교</h3>
                <p className="text-gray-500 text-sm">경제학 학사 • 2017</p>
              </div>
            </div>
          </section>
        </div>

        {/* 연락처 */}
        <section className="bg-gray-900 rounded-3xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-4">Contact Me</h2>
          <div className="flex justify-center gap-8 text-gray-300">
            <span>📧 info@data.com</span>
            <span>📱 010-1234-5678</span>
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P23</strong> 인포그래픽 이력서 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

