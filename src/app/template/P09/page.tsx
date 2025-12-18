export default function TemplateP09() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* 파도 효과 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
          <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-blue-900/80 backdrop-blur-sm text-white text-center py-2 text-sm z-50">
        🌊 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 pt-16 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/30 border-4 border-white/50 flex items-center justify-center text-5xl shadow-lg">
            🐋
          </div>

          {/* 이름 */}
          <h1 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
            정현우
          </h1>

          {/* 직함 */}
          <p className="text-center text-sky-100 font-medium mb-6">
            해양생물학 연구원
          </p>

          {/* 소개 */}
          <p className="text-center text-white/90 leading-relaxed mb-8 text-sm">
            바다의 신비를 탐구합니다.<br/>
            해양 생태계 보존을 위해 연구합니다.
          </p>

          {/* 연구 분야 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["해양생물학", "생태계 보존", "수중 촬영", "다이빙"].map((field) => (
              <span key={field} className="px-4 py-2 bg-white/20 text-white border border-white/30 rounded-full text-xs font-medium backdrop-blur-sm">
                {field}
              </span>
            ))}
          </div>

          {/* 경력 */}
          <div className="bg-white/10 rounded-2xl p-4 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <span className="text-xl">🔬</span>
              <div>
                <p className="font-medium">한국해양과학기술원</p>
                <p className="text-white/60 text-xs">선임연구원 · 2018 ~ 현재</p>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-shadow">
              <span>📧</span> 연락하기
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 text-white border border-white/30 rounded-2xl font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
              <span>📚</span> 연구 논문 보기
            </a>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="text-2xl animate-bounce" style={{ animationDelay: "0s" }}>🐠</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: "0.1s" }}>🐟</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: "0.2s" }}>🐡</span>
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900/90 backdrop-blur-sm border-t border-white/20 p-4 md:hidden z-50">
        <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold">
          이 템플릿으로 주문하기 🌊
        </button>
      </div>
    </div>
  );
}

