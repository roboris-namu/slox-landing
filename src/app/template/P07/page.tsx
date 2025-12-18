export default function TemplateP07() {
  return (
    <div className="min-h-screen bg-white">
      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-black text-white text-center py-2 text-sm z-50">
        ◼️ 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="pt-16 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="border-2 border-black p-8">
          {/* 상단 라인 */}
          <div className="flex gap-1 mb-8">
            <div className="flex-1 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-white"></div>
            <div className="flex-1 h-0.5 bg-black"></div>
          </div>

          {/* 프로필 이미지 */}
          <div className="w-40 h-40 mx-auto mb-8 border-4 border-black bg-gray-100 flex items-center justify-center">
            <span className="text-6xl grayscale">👤</span>
          </div>

          {/* 이름 */}
          <h1 className="text-4xl font-black text-center text-black mb-2 tracking-tight">
            MINJUN LEE
          </h1>

          {/* 직함 */}
          <p className="text-center text-gray-600 uppercase tracking-[0.3em] text-xs mb-8">
            Art Director
          </p>

          {/* 소개 */}
          <div className="border-t border-b border-black py-6 mb-8">
            <p className="text-center text-gray-800 leading-relaxed">
              Less is more.<br/>
              단순함 속에서 본질을 찾습니다.
            </p>
          </div>

          {/* 키워드 */}
          <div className="flex justify-center gap-6 mb-8">
            {["MINIMAL", "MODERN", "BOLD"].map((word) => (
              <span key={word} className="text-xs tracking-widest text-gray-500">
                {word}
              </span>
            ))}
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors">
              Contact
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black border-2 border-black font-bold uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors">
              Portfolio
            </a>
          </div>

          {/* 하단 라인 */}
          <div className="flex gap-1 mt-8">
            <div className="flex-1 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-white"></div>
            <div className="flex-1 h-0.5 bg-black"></div>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="flex justify-center mt-8">
          <div className="w-4 h-4 bg-black"></div>
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 md:hidden">
        <button className="w-full py-3 bg-black text-white font-bold uppercase tracking-wider">
          이 템플릿으로 주문하기
        </button>
      </div>
    </div>
  );
}

