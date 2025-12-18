export default function TemplateP22() {
  const experiences = [
    { year: "2024", title: "Lead Developer", company: "Tech Corp", current: true },
    { year: "2022", title: "Senior Developer", company: "Startup Inc", current: false },
    { year: "2020", title: "Developer", company: "Agency", current: false },
    { year: "2018", title: "Junior Developer", company: "First Job", current: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 히어로 */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">이타임라인</h1>
          <p className="text-teal-100 text-lg">풀스택 개발자</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* 소개 */}
        <section className="mb-16 text-center">
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            6년간의 개발 경력을 통해 프론트엔드부터 백엔드, 인프라까지 
            전반적인 개발 역량을 갖추었습니다.
          </p>
        </section>

        {/* 타임라인 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Career Timeline</h2>
          <div className="relative">
            {/* 중앙선 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200" />
            
            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <div key={idx} className={`flex items-center ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${idx % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <div className={`inline-block p-6 bg-gray-50 rounded-xl ${exp.current ? "ring-2 ring-teal-500" : ""}`}>
                      <span className="text-teal-600 font-bold">{exp.year}</span>
                      <h3 className="font-bold text-gray-900 mt-1">{exp.title}</h3>
                      <p className="text-gray-500 text-sm">{exp.company}</p>
                      {exp.current && (
                        <span className="inline-block mt-2 px-2 py-1 bg-teal-500 text-white text-xs rounded-full">
                          현재
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow z-10" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 스킬 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "TypeScript"].map((skill) => (
              <div key={skill} className="p-4 bg-gray-50 rounded-xl text-center">
                <span className="font-medium text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 연락처 */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="flex justify-center gap-8 text-gray-600">
            <span>📧 timeline@email.com</span>
            <span>💼 linkedin.com/in/timeline</span>
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P22</strong> 모던 타임라인 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-teal-700 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

