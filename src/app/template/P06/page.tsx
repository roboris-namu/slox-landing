export default function TemplateP06() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* 주문 배너 */}
      <div className="fixed top-0 left-0 right-0 bg-amber-900 text-amber-100 text-center py-2 text-sm z-50">
        📜 이 템플릿이 마음에 드시나요? <span className="font-bold underline cursor-pointer">9,900원에 주문하기</span>
      </div>

      {/* 장식 패턴 */}
      <div className="fixed top-12 left-0 right-0 h-4 bg-repeat-x opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0L0 16h20L10 0z' fill='%23451a03'/%3E%3C/svg%3E\")" }}></div>

      {/* 메인 컨텐츠 */}
      <div className="pt-20 px-6 py-12 max-w-xl mx-auto">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-lg p-10 shadow-xl border-4 border-double border-amber-200">
          {/* 장식 상단 */}
          <div className="text-center text-amber-300 text-2xl mb-6">❧ ❦ ❧</div>

          {/* 프로필 이미지 */}
          <div className="w-36 h-36 mx-auto mb-6 rounded-full border-4 border-amber-200 bg-amber-100 flex items-center justify-center text-6xl">
            📚
          </div>

          {/* 이름 */}
          <h1 className="text-3xl text-center text-amber-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Dr. James Park
          </h1>

          {/* 직함 */}
          <p className="text-center text-amber-700 italic text-lg mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Professor of Literature
          </p>

          {/* 구분선 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-amber-200"></div>
            <span className="text-amber-300">✦</span>
            <div className="flex-1 h-px bg-amber-200"></div>
          </div>

          {/* 소개 */}
          <p className="text-center text-amber-800 leading-relaxed mb-8" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            &ldquo;문학은 인간 영혼의 거울이다.&rdquo;<br/>
            <span className="text-sm not-italic text-amber-600">— 서울대학교 인문대학</span>
          </p>

          {/* 경력 */}
          <div className="space-y-3 mb-8">
            {[
              { year: "2010 ~", title: "서울대학교 교수" },
              { year: "2005 ~ 2010", title: "하버드대 연구원" },
              { year: "2000", title: "옥스포드대 박사" },
            ].map((career) => (
              <div key={career.year} className="flex gap-4 text-sm">
                <span className="text-amber-500 font-medium w-24">{career.year}</span>
                <span className="text-amber-800">{career.title}</span>
              </div>
            ))}
          </div>

          {/* 연락처 */}
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-amber-900 text-amber-50 rounded-lg font-medium hover:bg-amber-800 transition-colors" style={{ fontFamily: "Georgia, serif" }}>
              <span>📧</span> Contact via Email
            </a>
            <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-amber-50 text-amber-900 border-2 border-amber-200 rounded-lg font-medium hover:bg-amber-100 transition-colors" style={{ fontFamily: "Georgia, serif" }}>
              <span>📖</span> View Publications
            </a>
          </div>

          {/* 장식 하단 */}
          <div className="text-center text-amber-300 text-2xl mt-6">❧ ❦ ❧</div>
        </div>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-amber-200 p-4 md:hidden">
        <button className="w-full py-3 bg-amber-900 text-amber-50 rounded-lg font-bold">
          이 템플릿으로 주문하기 📜
        </button>
      </div>
    </div>
  );
}

