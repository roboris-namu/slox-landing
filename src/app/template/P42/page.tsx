export default function TemplateP42() {
  const stats = [
    { label: "Repositories", value: "42" },
    { label: "Stars", value: "1.2k" },
    { label: "Followers", value: "500+" },
    { label: "Contributions", value: "2,345" },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* 헤더 */}
      <header className="border-b border-[#30363d] py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-2xl">🐙</span>
          <nav className="flex gap-6 text-sm text-[#8b949e]">
            <a href="#" className="hover:text-white">Overview</a>
            <a href="#" className="hover:text-white">Repositories</a>
            <a href="#" className="hover:text-white">Projects</a>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* 프로필 */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-[#21262d] rounded-full flex items-center justify-center text-7xl border-4 border-[#30363d]">
              👨‍💻
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">김다크허브</h1>
            <p className="text-[#8b949e] text-lg mb-4">@darkgithub</p>
            <p className="text-[#c9d1d9] mb-4">
              Open source enthusiast. Building tools for developers.<br />
              Currently working on awesome projects.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[#8b949e]">
              <span>📍 Seoul, Korea</span>
              <span>🏢 @TechCorp</span>
              <span>🔗 darkdev.io</span>
              <span>✉️ dark@github.io</span>
            </div>
          </div>
        </div>

        {/* 스탯 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-[#8b949e]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pinned */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Pinned</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "awesome-tools", desc: "A collection of developer tools", lang: "TypeScript", stars: 234 },
              { name: "react-components", desc: "Reusable React components", lang: "JavaScript", stars: 156 },
              { name: "cli-helper", desc: "CLI utilities for productivity", lang: "Rust", stars: 89 },
              { name: "dotfiles", desc: "My personal dotfiles", lang: "Shell", stars: 45 },
            ].map((repo) => (
              <div key={repo.name} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <h3 className="text-[#58a6ff] font-semibold mb-2">📦 {repo.name}</h3>
                <p className="text-sm text-[#8b949e] mb-4">{repo.desc}</p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    {repo.lang}
                  </span>
                  <span>⭐ {repo.stars}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 기여 */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Contribution Graph</h2>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-full aspect-square rounded-sm ${
                    Math.random() > 0.7 ? "bg-[#39d353]" : Math.random() > 0.5 ? "bg-[#26a641]" : Math.random() > 0.3 ? "bg-[#006d32]" : "bg-[#0e4429]"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#238636] text-white py-3 px-4 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P42</strong> 깃허브 다크</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-[#238636] text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

