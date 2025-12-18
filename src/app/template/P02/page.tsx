import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P02 다크 엘레강스 - 템플릿 미리보기 | SLOX",
  description: "세련된 다크 테마의 엘레강스 프로필 템플릿입니다.",
};

export default function TemplateP02() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* 주문 안내 플로팅 배너 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">🎨 템플릿 코드: <strong>P02</strong></span>
            <span className="hidden sm:inline text-sm opacity-80">| 다크 엘레강스</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">9,900원</span>
            <Link href="/#contact" className="px-4 py-1.5 bg-white text-purple-600 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              이 템플릿 주문하기
            </Link>
          </div>
        </div>
      </div>

      {/* 배경 효과 */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[150px]" />
      </div>

      {/* 템플릿 미리보기 시작 */}
      <div className="relative z-10 pt-16">
        {/* 히어로 섹션 */}
        <section className="min-h-screen flex items-center justify-center py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 프로필 이미지 */}
            <div className="w-36 h-36 mx-auto mb-10 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-1">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center text-5xl">
                👤
              </div>
            </div>
            
            {/* 이름 */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                김서연
              </span>
            </h1>
            
            {/* 직함 */}
            <p className="text-xl text-white/60 mb-8 font-light">
              UI/UX Designer · Creative Director
            </p>
            
            {/* 한 줄 소개 */}
            <p className="text-white/50 leading-relaxed max-w-md mx-auto mb-10 font-light">
              디자인으로 세상을 더 아름답게 만듭니다.<br />
              사용자의 마음을 움직이는 경험을 설계합니다.
            </p>
            
            {/* CTA 버튼 */}
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                연락하기
              </a>
              <a href="#" className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all">
                포트폴리오
              </a>
            </div>
          </div>
        </section>

        {/* 소개 섹션 */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4 text-center">About</h2>
            <h3 className="text-3xl font-bold text-center mb-12">소개</h3>
            
            <div className="space-y-6 text-white/60 leading-relaxed text-center font-light">
              <p>
                8년간 다양한 브랜드와 스타트업에서 디자인을 해왔습니다.
                사용자 리서치부터 최종 디자인까지, 전 과정을 아우르는 경험을 가지고 있습니다.
              </p>
              <p>
                미니멀하면서도 임팩트 있는 디자인을 추구하며,
                항상 새로운 트렌드를 연구하고 적용합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 전문 분야 */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4 text-center">Expertise</h2>
            <h3 className="text-3xl font-bold text-center mb-12">전문 분야</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "🎨", title: "UI Design", desc: "직관적이고 아름다운 인터페이스" },
                { icon: "✨", title: "UX Research", desc: "데이터 기반의 사용자 경험 설계" },
                { icon: "🎬", title: "Motion Design", desc: "생동감 있는 인터랙션 디자인" },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-white/50 text-sm font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 경력 */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4 text-center">Career</h2>
            <h3 className="text-3xl font-bold text-center mb-12">경력</h3>
            
            <div className="space-y-8">
              {[
                { company: "글로벌 테크 기업", role: "Lead Designer", period: "2022 - Present" },
                { company: "디자인 에이전시", role: "Senior Designer", period: "2019 - 2022" },
                { company: "스타트업", role: "Product Designer", period: "2017 - 2019" },
              ].map((exp, idx) => (
                <div key={exp.company} className="flex items-center gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold">{exp.company}</h4>
                    <p className="text-white/50 text-sm">{exp.role}</p>
                  </div>
                  <div className="text-white/40 text-sm">
                    {exp.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4">Contact</h2>
            <h3 className="text-3xl font-bold mb-6">함께 일해요</h3>
            <p className="text-white/50 mb-10 font-light">새로운 프로젝트에 대해 이야기하고 싶으시다면</p>
            
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              <span>hello@example.com</span>
            </a>
            
            {/* 소셜 */}
            <div className="flex items-center justify-center gap-4 mt-12">
              {["📧", "💼", "🐙", "📸", "🎨"].map((icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/30 text-sm font-light">
              © 2024 김서연. Designed with passion.
            </p>
          </div>
        </footer>
      </div>

      {/* 하단 고정 주문 버튼 (모바일) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a0a0f] border-t border-white/10 md:hidden">
        <Link href="/#contact" className="block w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-center font-bold rounded-xl">
          P02 템플릿 주문하기 - 9,900원
        </Link>
      </div>
    </div>
  );
}

