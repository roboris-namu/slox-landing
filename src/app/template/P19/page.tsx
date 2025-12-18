export default function TemplateP19() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-12 pb-8 border-b-2 border-gray-900">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">홍길동</h1>
          <p className="text-lg text-gray-600 mb-4">프론트엔드 개발자</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>📧 hong@email.com</span>
            <span>📱 010-1234-5678</span>
            <span>📍 서울시 강남구</span>
          </div>
        </header>

        {/* 자기소개 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">자기소개</h2>
          <p className="text-gray-700 leading-relaxed">
            5년차 프론트엔드 개발자로서 React, TypeScript를 활용한 웹 애플리케이션 개발에 전문성을 보유하고 있습니다.
            사용자 경험 개선과 성능 최적화에 관심이 많으며, 팀과의 협업을 통해 더 나은 결과물을 만들어갑니다.
          </p>
        </section>

        {/* 경력 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">경력사항</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">ABC 테크놀로지</h3>
                <span className="text-sm text-gray-500">2021.03 - 현재</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">시니어 프론트엔드 개발자</p>
              <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>대시보드 UI 리뉴얼 프로젝트 리드</li>
                <li>React 기반 디자인 시스템 구축</li>
                <li>웹 성능 40% 개선</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">XYZ 스타트업</h3>
                <span className="text-sm text-gray-500">2019.01 - 2021.02</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">프론트엔드 개발자</p>
              <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>e커머스 플랫폼 프론트엔드 개발</li>
                <li>결제 시스템 연동</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 학력 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">학력</h2>
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">한국대학교</h3>
              <p className="text-gray-600 text-sm">컴퓨터공학과 학사</p>
            </div>
            <span className="text-sm text-gray-500">2015.03 - 2019.02</span>
          </div>
        </section>

        {/* 기술 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">보유 기술</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Git"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 자격증 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">자격증</h2>
          <ul className="text-gray-700 space-y-2">
            <li className="flex justify-between">
              <span>정보처리기사</span>
              <span className="text-sm text-gray-500">2018.11</span>
            </li>
            <li className="flex justify-between">
              <span>AWS Solutions Architect</span>
              <span className="text-sm text-gray-500">2022.05</span>
            </li>
          </ul>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P19</strong> 클래식 이력서 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-gray-900 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

