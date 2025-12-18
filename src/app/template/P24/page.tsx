export default function TemplateP24() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <header className="mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-2">정미니멀</h1>
          <div className="w-16 h-[2px] bg-gray-900 mb-4" />
          <p className="text-gray-500 text-lg">Product Manager</p>
        </header>

        {/* 연락처 */}
        <section className="flex gap-8 text-sm text-gray-500 mb-16">
          <span>minimal@email.com</span>
          <span>010-1234-5678</span>
          <span>Seoul, Korea</span>
        </section>

        {/* 소개 */}
        <section className="mb-16">
          <p className="text-gray-600 text-lg leading-relaxed">
            사용자 중심의 제품을 만드는 것을 좋아하는 프로덕트 매니저입니다.
            데이터 기반 의사결정과 빠른 실행력을 갖추고 있습니다.
          </p>
        </section>

        <hr className="border-gray-100 mb-16" />

        {/* 경력 */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Experience</h2>
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-medium text-gray-900">테크 스타트업</h3>
                <span className="text-sm text-gray-400">2022 — Present</span>
              </div>
              <p className="text-gray-500 mb-3">Senior Product Manager</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                B2B SaaS 제품의 전략 수립 및 로드맵 관리. MAU 200% 성장 달성.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-medium text-gray-900">IT 기업</h3>
                <span className="text-sm text-gray-400">2019 — 2022</span>
              </div>
              <p className="text-gray-500 mb-3">Product Manager</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                모바일 앱 신규 피처 기획 및 출시. 유저 리텐션 30% 향상.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 mb-16" />

        {/* 학력 */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Education</h2>
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-xl font-medium text-gray-900">서울대학교</h3>
              <p className="text-gray-500">경영학과</p>
            </div>
            <span className="text-sm text-gray-400">2015 — 2019</span>
          </div>
        </section>

        <hr className="border-gray-100 mb-16" />

        {/* 스킬 */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {["Product Strategy", "Data Analysis", "User Research", "Agile", "SQL", "Figma", "Jira"].map((skill) => (
              <span key={skill} className="text-gray-600 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P24</strong> 미니멀 화이트 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

