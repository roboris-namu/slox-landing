import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P03 모던 그라데이션 - 템플릿 미리보기 | SLOX",
  description: "트렌디한 그라데이션 컬러의 모던 프로필 템플릿입니다.",
};

export default function TemplateP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      {/* 주문 안내 플로팅 배너 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 text-white py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">🎨 템플릿 코드: <strong>P03</strong></span>
            <span className="hidden sm:inline text-sm opacity-80">| 모던 그라데이션</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">9,900원</span>
            <Link href="/#contact" className="px-4 py-1.5 bg-white text-purple-700 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              이 템플릿 주문하기
            </Link>
          </div>
        </div>
      </div>

      {/* 애니메이션 배경 원 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* 템플릿 미리보기 시작 */}
      <div className="relative z-10 pt-16">
        {/* 히어로 섹션 */}
        <section className="min-h-screen flex items-center justify-center py-24 px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            {/* 상태 뱃지 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Available for work</span>
            </div>
            
            {/* 프로필 이미지 */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-1 rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center text-5xl">
                ✨
              </div>
            </div>
            
            {/* 이름 */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              안녕하세요,<br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                이준호
              </span>입니다
            </h1>
            
            {/* 직함 태그들 */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["풀스택 개발자", "창업가", "콘텐츠 크리에이터"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* 소개 */}
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              기술과 창의성의 교차점에서 새로운 가치를 만듭니다.<br />
              복잡한 문제를 단순하게 해결하는 것을 좋아해요.
            </p>
            
            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all">
                프로젝트 보기 →
              </a>
              <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                연락하기
              </a>
            </div>
          </div>
        </section>

        {/* 소개 카드 섹션 */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 왼쪽: About */}
              <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                <span className="text-3xl mb-4 block">🚀</span>
                <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
                <p className="text-white/70 leading-relaxed">
                  5년간 스타트업에서 0부터 1까지 프로덕트를 만들어왔습니다. 
                  사용자 문제를 기술로 해결하는 과정에서 가장 큰 보람을 느껴요.
                </p>
              </div>
              
              {/* 오른쪽: Stats */}
              <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                <span className="text-3xl mb-4 block">📊</span>
                <h3 className="text-2xl font-bold text-white mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "5+", label: "Years Exp." },
                    { num: "30+", label: "Projects" },
                    { num: "10K+", label: "Users" },
                    { num: "99%", label: "Satisfaction" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold text-white">{stat.num}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Tech Stack</h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Redis", "GraphQL"].map((tech) => (
                <span key={tech} className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 프로젝트 하이라이트 */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Projects</h2>
            
            <div className="space-y-6">
              {[
                { emoji: "🎮", title: "게임 플랫폼", desc: "MAU 50K+ 달성한 웹 게임 서비스", tech: ["React", "Node.js"] },
                { emoji: "📱", title: "모바일 앱", desc: "스타트업 MVP 개발 및 런칭", tech: ["Flutter", "Firebase"] },
                { emoji: "🤖", title: "AI 챗봇", desc: "GPT 기반 고객 서비스 자동화", tech: ["Python", "OpenAI"] },
              ].map((project) => (
                <div key={project.title} className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-6 hover:bg-white/15 transition-all group cursor-pointer">
                  <span className="text-4xl">{project.emoji}</span>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-white/60 text-sm">{project.desc}</p>
                  </div>
                  <div className="hidden md:flex gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">{t}</span>
                    ))}
                  </div>
                  <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연락처 */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/20 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Connect!</h2>
              <p className="text-white/60 mb-8">새로운 기회에 열려있습니다</p>
              
              <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                <span>📧</span>
                <span>hello@example.com</span>
              </a>
              
              <div className="flex items-center justify-center gap-4 mt-10">
                {["🐙", "💼", "🐦", "📸"].map((icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <span className="text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/30 text-sm">
              © 2024 이준호. Built with ❤️
            </p>
          </div>
        </footer>
      </div>

      {/* 하단 고정 주문 버튼 (모바일) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 border-t border-white/10 md:hidden">
        <Link href="/#contact" className="block w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-center font-bold rounded-xl">
          P03 템플릿 주문하기 - 9,900원
        </Link>
      </div>
    </div>
  );
}

