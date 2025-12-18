export default function TemplateF06() {
  return (
    <div className="min-h-screen bg-amber-100" style={{ fontFamily: "Georgia, serif" }}>
      {/* 빈티지 프레임 */}
      <div className="max-w-3xl mx-auto py-8 px-6">
        <div className="bg-amber-50 border-8 border-amber-200 shadow-2xl">
          {/* 헤더 */}
          <header className="py-8 text-center border-b-2 border-amber-200">
            <h1 className="text-3xl text-amber-900">📔 강씨네 가족 앨범</h1>
            <p className="text-amber-700 mt-2 italic">Since 2008</p>
          </header>

          {/* 메인 사진 */}
          <section className="p-8">
            <div className="aspect-[4/3] bg-amber-200 rounded border-4 border-amber-300 flex items-center justify-center">
              <span className="text-9xl">👨‍👩‍👧‍👦</span>
            </div>
            <p className="text-center mt-4 text-amber-800 italic">&ldquo;우리 가족 첫 가족사진&rdquo;</p>
            <p className="text-center text-amber-600 text-sm mt-1">2008년 봄</p>
          </section>

          {/* 구분선 */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="w-16 h-px bg-amber-300" />
            <span className="text-amber-400">✦</span>
            <div className="w-16 h-px bg-amber-300" />
          </div>

          {/* 가족 소개 */}
          <section className="px-8 pb-8">
            <h3 className="text-xl text-amber-900 text-center mb-6">가족 소개</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "강민수", role: "가장", year: "1975" },
                { name: "이정아", role: "안주인", year: "1978" },
                { name: "강지훈", role: "아들", year: "2008" },
                { name: "강서영", role: "딸", year: "2011" },
              ].map((member) => (
                <div key={member.name} className="text-center p-4 bg-amber-100 rounded border border-amber-200">
                  <div className="w-16 h-16 bg-amber-200 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
                    {member.role === "가장" ? "👨" : member.role === "안주인" ? "👩" : member.role === "아들" ? "👦" : "👧"}
                  </div>
                  <p className="font-medium text-amber-900">{member.name}</p>
                  <p className="text-sm text-amber-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 추억 */}
          <section className="px-8 pb-8">
            <h3 className="text-xl text-amber-900 text-center mb-6">소중한 추억</h3>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-amber-200 rounded border-2 border-amber-300 flex items-center justify-center text-3xl">
                  📷
                </div>
              ))}
            </div>
          </section>

          {/* 푸터 */}
          <footer className="py-6 text-center border-t-2 border-amber-200 text-amber-700 italic">
            <p>추억은 영원히...</p>
          </footer>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-800 text-amber-100 py-3 px-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between font-sans">
          <span className="text-sm"><strong>F06</strong> 빈티지 앨범</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-amber-100 text-amber-900 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

