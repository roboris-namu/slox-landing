export default function TemplateP20() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 왼쪽 사이드바 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white">
            <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
              👤
            </div>
            <h1 className="text-2xl font-bold text-center mb-1">김크리에이티브</h1>
            <p className="text-white/70 text-center mb-8">UI/UX 디자이너</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">연락처</h3>
                <ul className="space-y-2 text-sm">
                  <li>📧 creative@email.com</li>
                  <li>📱 010-1234-5678</li>
                  <li>🌐 portfolio.com</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">스킬</h3>
                <div className="space-y-3">
                  {[
                    { name: "Figma", level: 95 },
                    { name: "Photoshop", level: 90 },
                    { name: "Illustrator", level: 85 },
                    { name: "After Effects", level: 75 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">언어</h3>
                <ul className="text-sm space-y-1">
                  <li>🇰🇷 한국어 - 원어민</li>
                  <li>🇺🇸 영어 - 비즈니스</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 오른쪽 메인 컨텐츠 */}
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                7년차 UI/UX 디자이너로서 사용자 중심의 디자인을 추구합니다. 
                스타트업부터 대기업까지 다양한 프로젝트 경험을 바탕으로 
                비즈니스 목표와 사용자 니즈를 모두 충족시키는 디자인을 만들어갑니다.
              </p>
            </section>

            <section className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {[
                  { company: "테크 스타트업", role: "Lead Product Designer", period: "2022 - 현재", desc: "모바일 앱 전체 리디자인, 디자인 시스템 구축" },
                  { company: "디자인 에이전시", role: "Senior UI Designer", period: "2019 - 2022", desc: "50+ 클라이언트 프로젝트 참여" },
                  { company: "IT 기업", role: "UI Designer", period: "2017 - 2019", desc: "웹 서비스 UI 디자인" },
                ].map((exp, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-3 h-3 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.company}</h3>
                      <p className="text-violet-600 text-sm">{exp.role} • {exp.period}</p>
                      <p className="text-gray-500 text-sm mt-1">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">서울대학교</h3>
                  <p className="text-violet-600 text-sm">시각디자인 학사 • 2013 - 2017</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-900"><strong>P20</strong> 크리에이티브 CV 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-violet-600 text-white text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

