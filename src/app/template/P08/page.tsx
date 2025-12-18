export default function TemplateP08() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-rose-100">
      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-rose-400 text-white text-center py-2 text-sm z-50">
        🌅 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="pt-16 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl shadow-orange-200/50">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-300 via-amber-300 to-rose-300 p-1 shadow-lg shadow-orange-200/50">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl">
              ☀️
            </div>
          </div>

          {/* 이름 */}
          <h1 className="text-2xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
              하은서
            </span>
          </h1>

          {/* 직함 */}
          <p className="text-center text-orange-400 font-medium mb-6">
            라이프스타일 블로거
          </p>

          {/* 소개 */}
          <p className="text-center text-amber-800 leading-relaxed mb-8 text-sm">
            일상 속 작은 행복을 발견합니다.<br/>
            따뜻한 순간들을 기록하고 나눕니다.
          </p>

          {/* 통계 */}
          <div className="flex justify-center gap-8 mb-8">
            {[
              { label: "팔로워", value: "12.5K" },
              { label: "게시물", value: "847" },
              { label: "좋아요", value: "89K" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-amber-700">{stat.value}</p>
                <p className="text-xs text-amber-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 관심사 태그 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["여행", "카페", "요리", "독서", "사진"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-600 rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 text-white rounded-2xl font-medium shadow-lg shadow-orange-200/50 hover:shadow-xl transition-shadow">
              <span>📷</span> 인스타그램
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-orange-500 border-2 border-orange-200 rounded-2xl font-medium hover:bg-orange-50 transition-colors">
              <span>📝</span> 블로그 방문하기
            </a>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="flex justify-center gap-3 mt-8">
          <span className="w-3 h-3 rounded-full bg-orange-300/50"></span>
          <span className="w-3 h-3 rounded-full bg-amber-300/50"></span>
          <span className="w-3 h-3 rounded-full bg-rose-300/50"></span>
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-orange-100 p-4 md:hidden">
        <button className="w-full py-3 bg-gradient-to-r from-orange-400 to-rose-400 text-white rounded-xl font-bold">
          이 템플릿으로 주문하기 🌅
        </button>
      </div>
    </div>
  );
}

