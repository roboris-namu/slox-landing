export default function TemplateP26() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 컬러 헤더 */}
      <header className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-2">조컬러풀</h1>
          <p className="text-white/80 text-lg">UI/UX Designer & Developer</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 연락처 카드 */}
        <section className="flex justify-center gap-4 mb-12 -mt-8">
          {[
            { icon: "📧", text: "colorful@email.com", color: "bg-rose-500" },
            { icon: "💼", text: "portfolio.com", color: "bg-purple-500" },
            { icon: "📱", text: "010-1234-5678", color: "bg-indigo-500" },
          ].map((item) => (
            <div key={item.text} className={`${item.color} text-white px-5 py-3 rounded-full text-sm shadow-lg`}>
              {item.icon} {item.text}
            </div>
          ))}
        </section>

        {/* 소개 */}
        <section className="text-center mb-16">
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            디자인과 개발을 동시에 할 수 있는 하이브리드 크리에이터입니다.
            컬러풀하고 생동감 있는 디자인을 좋아합니다.
          </p>
        </section>

        {/* 스킬 그리드 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Figma", color: "bg-rose-100 text-rose-700 border-rose-200" },
              { name: "React", color: "bg-sky-100 text-sky-700 border-sky-200" },
              { name: "Tailwind", color: "bg-teal-100 text-teal-700 border-teal-200" },
              { name: "Next.js", color: "bg-gray-100 text-gray-700 border-gray-200" },
              { name: "TypeScript", color: "bg-blue-100 text-blue-700 border-blue-200" },
              { name: "Framer", color: "bg-purple-100 text-purple-700 border-purple-200" },
              { name: "Photoshop", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
              { name: "After Effects", color: "bg-violet-100 text-violet-700 border-violet-200" },
            ].map((skill) => (
              <div key={skill.name} className={`p-4 rounded-xl text-center font-medium border-2 ${skill.color}`}>
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        {/* 경력 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Experience</h2>
          <div className="space-y-6">
            {[
              { company: "크리에이티브 스튜디오", role: "Lead Designer & Developer", period: "2022-현재", color: "border-l-rose-500" },
              { company: "디자인 에이전시", role: "UI/UX Designer", period: "2020-2022", color: "border-l-purple-500" },
              { company: "스타트업", role: "Frontend Developer", period: "2018-2020", color: "border-l-indigo-500" },
            ].map((exp) => (
              <div key={exp.company} className={`p-6 bg-white rounded-xl shadow-sm border-l-4 ${exp.color}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-gray-500">{exp.role}</p>
                  </div>
                  <span className="text-sm text-gray-400">{exp.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 학력 */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-gray-900">한국예술대학교</h3>
              <p className="text-gray-500">시각디자인과</p>
            </div>
            <span className="text-gray-400">2014-2018</span>
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P26</strong> 컬러풀 모던 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-purple-700 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

