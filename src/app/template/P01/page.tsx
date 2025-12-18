import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P01 화이트 미니멀 - 템플릿 미리보기 | SLOX",
  description: "깔끔한 화이트 톤의 미니멀 프로필 템플릿입니다.",
};

export default function TemplateP01() {
  return (
    <div className="min-h-screen bg-white">
      {/* 주문 안내 플로팅 배너 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">🎨 템플릿 코드: <strong>P01</strong></span>
            <span className="hidden sm:inline text-sm opacity-80">| 화이트 미니멀</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">9,900원</span>
            <Link href="/#contact" className="px-4 py-1.5 bg-white text-orange-500 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              이 템플릿 주문하기
            </Link>
          </div>
        </div>
      </div>

      {/* 템플릿 미리보기 시작 */}
      <div className="pt-16">
        {/* 히어로 섹션 */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 프로필 이미지 */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl shadow-lg">
              👤
            </div>
            
            {/* 이름 */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              홍길동
            </h1>
            
            {/* 직함 */}
            <p className="text-xl text-gray-500 mb-6">
              프론트엔드 개발자 · 디자이너
            </p>
            
            {/* 한 줄 소개 */}
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto mb-8">
              사용자 경험을 최우선으로 생각하는 개발자입니다.<br />
              아름답고 직관적인 인터페이스를 만드는 것을 좋아합니다.
            </p>
            
            {/* 소셜 링크 */}
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-xl">💼</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-xl">🐙</span>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-xl">📸</span>
              </a>
            </div>
          </div>
        </section>

        {/* 구분선 */}
        <div className="max-w-lg mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* 소개 섹션 */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                안녕하세요! 저는 5년차 프론트엔드 개발자입니다. 
                React와 TypeScript를 주로 사용하며, 사용자 중심의 서비스를 만드는 것에 열정을 가지고 있습니다.
              </p>
              <p>
                새로운 기술을 배우고 적용하는 것을 즐기며, 
                팀원들과 함께 성장하는 환경을 좋아합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 스킬 섹션 */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Skills</h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Figma", "Git", "AWS"].map((skill) => (
                <span key={skill} className="px-5 py-2.5 bg-white rounded-full text-gray-700 text-sm font-medium shadow-sm border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 경력 섹션 */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Experience</h2>
            
            <div className="space-y-8">
              {[
                { company: "테크 스타트업", role: "시니어 프론트엔드 개발자", period: "2022 - 현재", desc: "React 기반 SaaS 제품 개발" },
                { company: "IT 기업", role: "프론트엔드 개발자", period: "2020 - 2022", desc: "B2B 서비스 UI/UX 개선" },
                { company: "웹 에이전시", role: "주니어 개발자", period: "2019 - 2020", desc: "다양한 클라이언트 프로젝트" },
              ].map((exp) => (
                <div key={exp.company} className="flex gap-6">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-gray-500 text-sm mb-1">{exp.role} · {exp.period}</p>
                    <p className="text-gray-600 text-sm">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section className="py-20 px-6 bg-gray-900 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-gray-400 mb-8">함께 일하고 싶으시다면 연락주세요!</p>
            
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors">
              <span>📧</span>
              <span>hello@example.com</span>
            </a>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © 2024 홍길동. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* 하단 고정 주문 버튼 (모바일) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 md:hidden">
        <Link href="/#contact" className="block w-full py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white text-center font-bold rounded-xl">
          P01 템플릿 주문하기 - 9,900원
        </Link>
      </div>
    </div>
  );
}

