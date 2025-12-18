export default function TemplateP25() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <header className="mb-16">
          <span className="text-zinc-500 text-sm">RESUME</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">강다크</h1>
          <p className="text-zinc-400 text-xl">DevOps Engineer</p>
        </header>

        {/* 연락처 */}
        <section className="flex gap-8 text-sm text-zinc-500 mb-16 pb-8 border-b border-zinc-800">
          <span>📧 dark@resume.com</span>
          <span>📱 010-1234-5678</span>
          <span>🔗 github.com/dark</span>
        </section>

        {/* 소개 */}
        <section className="mb-16">
          <h2 className="text-zinc-500 text-xs uppercase tracking-wider mb-4">About</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            클라우드 인프라와 자동화에 전문성을 갖춘 DevOps 엔지니어입니다.
            안정적이고 확장 가능한 시스템 구축을 위해 끊임없이 학습합니다.
          </p>
        </section>

        {/* 경력 */}
        <section className="mb-16">
          <h2 className="text-zinc-500 text-xs uppercase tracking-wider mb-8">Experience</h2>
          <div className="space-y-8">
            {[
              { company: "클라우드 기업", role: "Senior DevOps Engineer", period: "2022 - Present", desc: "AWS/GCP 멀티클라우드 운영, CI/CD 파이프라인 구축" },
              { company: "IT 스타트업", role: "DevOps Engineer", period: "2020 - 2022", desc: "Kubernetes 클러스터 관리, 인프라 자동화" },
              { company: "SI 기업", role: "System Engineer", period: "2018 - 2020", desc: "리눅스 서버 운영, 모니터링 시스템 구축" },
            ].map((exp, idx) => (
              <div key={idx} className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{exp.company}</h3>
                  <span className="text-zinc-500 text-sm">{exp.period}</span>
                </div>
                <p className="text-emerald-400 text-sm mb-2">{exp.role}</p>
                <p className="text-zinc-400 text-sm">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 스킬 */}
        <section className="mb-16">
          <h2 className="text-zinc-500 text-xs uppercase tracking-wider mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Ansible", "Jenkins", "Python"].map((skill) => (
              <div key={skill} className="p-4 bg-zinc-800 rounded-lg text-center">
                <span className="text-zinc-300">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 자격증 */}
        <section>
          <h2 className="text-zinc-500 text-xs uppercase tracking-wider mb-8">Certifications</h2>
          <div className="space-y-3">
            {["AWS Solutions Architect Professional", "CKA (Certified Kubernetes Administrator)", "HashiCorp Terraform Associate"].map((cert) => (
              <div key={cert} className="flex items-center gap-3 text-zinc-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                {cert}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P25</strong> 다크 프로페셔널 템플릿</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문하기
          </a>
        </div>
      </div>
    </div>
  );
}

