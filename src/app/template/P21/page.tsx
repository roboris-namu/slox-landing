export default function TemplateP21() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* 헤더 */}
        <div className="bg-slate-900 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-1">박심플</h1>
          <p className="text-slate-300">백엔드 개발자</p>
        </div>

        {/* 컨텐츠 */}
        <div className="p-8 space-y-8">
          {/* 연락처 */}
          <div className="flex justify-center gap-6 text-sm text-slate-600 flex-wrap">
            <span>📧 simple@email.com</span>
            <span>📱 010-1234-5678</span>
            <span>💼 github.com/simple</span>
          </div>

          {/* 소개 */}
          <section>
            <p className="text-center text-slate-600 leading-relaxed">
              효율적이고 확장 가능한 백엔드 시스템을 설계하는 개발자입니다.
              Java, Spring Boot, AWS 환경에서의 개발 경험이 풍부합니다.
            </p>
          </section>

          <hr className="border-slate-200" />

          {/* 스킬 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">기술 스택</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {["Java", "Spring Boot", "MySQL", "Redis", "AWS", "Docker", "Kubernetes", "Git"].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* 경력 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">경력</h2>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">테크 기업</h3>
                <p className="text-slate-500 text-sm">시니어 백엔드 개발자 • 2021 - 현재</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">스타트업</h3>
                <p className="text-slate-500 text-sm">백엔드 개발자 • 2018 - 2021</p>
              </div>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* 학력 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">학력</h2>
            <div className="text-center">
              <h3 className="font-semibold text-slate-900">한국대학교</h3>
              <p className="text-slate-500 text-sm">컴퓨터공학 학사 • 2014 - 2018</p>
            </div>
          </section>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-3 px-4 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P21</strong> 심플 원페이지 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-900 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

