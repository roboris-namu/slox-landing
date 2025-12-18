export default function TemplateP04() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-center py-2 text-sm z-50">
        ✨ 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="pt-16 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-5xl shadow-lg">
            🌸
          </div>

          {/* 이름 */}
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
            김소연
          </h1>

          {/* 직함 */}
          <p className="text-center text-purple-400 font-medium mb-6">
            UI/UX Designer
          </p>

          {/* 소개 */}
          <p className="text-center text-gray-600 leading-relaxed mb-8 text-sm">
            사용자의 마음을 읽는 디자인을 추구합니다.<br/>
            아름다움과 기능성의 조화를 담아냅니다.
          </p>

          {/* 스킬 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Figma", "Adobe XD", "Illustration", "Prototyping"].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl font-medium hover:shadow-lg transition-shadow">
              <span>📧</span> 이메일 보내기
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-purple-500 border-2 border-purple-200 rounded-2xl font-medium hover:bg-purple-50 transition-colors">
              <span>🎨</span> 포트폴리오 보기
            </a>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-pink-300"></span>
          <span className="w-2 h-2 rounded-full bg-purple-300"></span>
          <span className="w-2 h-2 rounded-full bg-blue-300"></span>
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-100 p-4 md:hidden">
        <button className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-bold">
          이 템플릿으로 주문하기 ✨
        </button>
      </div>
    </div>
  );
}

