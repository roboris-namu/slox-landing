export default function TemplateB38() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 프로필 */}
        <div className="p-8 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center text-4xl backdrop-blur">
            👩‍💼
          </div>
          <h1 className="text-2xl font-bold mt-6">이수진</h1>
          <p className="text-indigo-100 mt-1">마케팅 디렉터</p>
        </div>

        {/* QR 코드 */}
        <div className="p-8 text-center">
          <div className="w-40 h-40 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center">
            <div className="text-6xl">📱</div>
          </div>
          <p className="text-slate-500 text-sm mt-4">QR코드를 스캔하여<br />연락처를 저장하세요</p>
        </div>

        {/* 연락처 */}
        <div className="px-8 pb-8 space-y-3">
          <a href="tel:010-9876-5432" className="flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200">
            <span>📞</span>
            <span>010-9876-5432</span>
          </a>
          <a href="mailto:lee@company.com" className="flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-200">
            <span>✉️</span>
            <span>lee@company.com</span>
          </a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B38</strong> QR 명함</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-indigo-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

