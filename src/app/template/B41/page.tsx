export default function TemplateB41() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm text-center">
        {/* 이름 */}
        <h1 className="text-4xl font-light text-slate-800 tracking-wide">
          정미니멀
        </h1>
        
        {/* 직함 */}
        <p className="text-slate-400 mt-4 tracking-widest text-sm">
          PRODUCT DESIGNER
        </p>

        {/* 구분선 */}
        <div className="w-12 h-px bg-slate-300 mx-auto my-8" />

        {/* 연락처 */}
        <div className="space-y-3 text-slate-500">
          <p>010-1234-5678</p>
          <p>minimal@design.co</p>
        </div>

        {/* 링크 */}
        <div className="mt-8">
          <a href="#" className="inline-block px-8 py-3 border border-slate-300 text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            Portfolio →
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B41</strong> 미니멀</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

