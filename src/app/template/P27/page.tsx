export default function TemplateP27() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-4xl text-white font-bold">
              🃏
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">윤카드</h1>
              <p className="text-gray-500 text-lg">Mobile App Developer</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>📧 card@email.com</span>
                <span>📱 010-1234-5678</span>
              </div>
            </div>
          </div>
        </div>

        {/* 소개 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">👋 About Me</h2>
          <p className="text-gray-600 leading-relaxed">
            iOS/Android 네이티브 앱 개발 5년차 개발자입니다. 
            Swift, Kotlin을 주로 사용하며 React Native를 활용한 
            크로스플랫폼 개발 경험도 있습니다.
          </p>
        </div>

        {/* 스킬 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🛠 Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Git", "CI/CD", "UI/UX"].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 경력 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">💼 Experience</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { company: "모바일 스타트업", role: "Lead iOS Developer", period: "2022-현재", color: "bg-blue-50 border-blue-200" },
              { company: "게임 회사", role: "Mobile Developer", period: "2020-2022", color: "bg-green-50 border-green-200" },
              { company: "IT 기업", role: "iOS Developer", period: "2019-2020", color: "bg-orange-50 border-orange-200" },
              { company: "에이전시", role: "Junior Developer", period: "2018-2019", color: "bg-purple-50 border-purple-200" },
            ].map((exp) => (
              <div key={exp.company} className={`p-5 rounded-xl border ${exp.color}`}>
                <h3 className="font-bold text-gray-900 mb-1">{exp.company}</h3>
                <p className="text-sm text-gray-600 mb-1">{exp.role}</p>
                <p className="text-xs text-gray-400">{exp.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 프로젝트 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">🚀 Projects</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "쇼핑 앱", downloads: "100만+", color: "bg-rose-500" },
              { name: "금융 앱", downloads: "50만+", color: "bg-emerald-500" },
              { name: "소셜 앱", downloads: "30만+", color: "bg-violet-500" },
            ].map((project) => (
              <div key={project.name} className={`${project.color} text-white p-5 rounded-xl`}>
                <h3 className="font-bold mb-1">{project.name}</h3>
                <p className="text-sm text-white/80">다운로드 {project.downloads}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 학력 카드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎓 Education</h2>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">한국대학교</h3>
              <p className="text-gray-500 text-sm">소프트웨어공학과</p>
            </div>
            <span className="text-gray-400 text-sm">2014-2018</span>
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P27</strong> 카드 스타일 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-blue-700 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

