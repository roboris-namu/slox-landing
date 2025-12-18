export default function TemplateP37() {
  const repos = [
    { name: "awesome-project", stars: 1234, lang: "TypeScript", color: "bg-blue-500" },
    { name: "react-components", stars: 567, lang: "JavaScript", color: "bg-yellow-400" },
    { name: "cli-tools", stars: 234, lang: "Rust", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 헤더 */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-xl">🐙</span>
          <nav className="flex gap-6 text-sm text-gray-400">
            <a href="#overview" className="text-white">Overview</a>
            <a href="#repos" className="hover:text-white">Repositories</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 프로필 */}
        <div className="flex gap-8 mb-12">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
            👨‍💻
          </div>
          <div>
            <h1 className="text-2xl font-bold">김깃허브</h1>
            <p className="text-gray-400 mb-3">@github-style</p>
            <p className="text-gray-300 mb-4">
              Full-stack developer passionate about open source.<br />
              Building tools that developers love.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>📍 Seoul, Korea</span>
              <span>🔗 github.com/dev</span>
              <span>👥 1.2k followers</span>
            </div>
          </div>
        </div>

        {/* 기여 그래프 */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Contribution Activity</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-full aspect-square rounded-sm ${
                    Math.random() > 0.7 ? "bg-green-500" : Math.random() > 0.5 ? "bg-green-700" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">1,234 contributions in the last year</p>
          </div>
        </section>

        {/* 인기 저장소 */}
        <section id="repos" className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Popular Repositories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <div key={repo.name} className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-medium">{repo.name}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">A sample repository description</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded-full ${repo.color}`} />
                    {repo.lang}
                  </span>
                  <span>⭐ {repo.stars}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 스킬 */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "Rust", "Go"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>P37</strong> GitHub 스타일</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-green-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

