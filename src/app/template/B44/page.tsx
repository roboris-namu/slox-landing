export default function TemplateB44() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* 명함 카드 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 프로필 사진 영역 */}
        <div className="h-64 bg-gradient-to-br from-teal-400 to-blue-500 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-6xl backdrop-blur-sm">
              📷
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-sm opacity-80">Photographer</p>
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">박포토</h1>
          <p className="text-teal-600 mt-1">Professional Photographer</p>
          <p className="text-slate-500 text-sm mt-3">
            순간을 영원으로 담습니다.<br />
            웨딩, 가족, 프로필 촬영 전문
          </p>
        </div>

        {/* 연락처 버튼 */}
        <div className="px-6 pb-6 grid grid-cols-4 gap-3">
          <a href="tel:010-1234-5678" className="p-4 bg-slate-100 rounded-xl flex items-center justify-center text-xl hover:bg-slate-200 transition-colors">
            📞
          </a>
          <a href="mailto:photo@studio.com" className="p-4 bg-slate-100 rounded-xl flex items-center justify-center text-xl hover:bg-slate-200 transition-colors">
            ✉️
          </a>
          <a href="#" className="p-4 bg-slate-100 rounded-xl flex items-center justify-center text-xl hover:bg-slate-200 transition-colors">
            📸
          </a>
          <a href="#" className="p-4 bg-slate-100 rounded-xl flex items-center justify-center text-xl hover:bg-slate-200 transition-colors">
            🔗
          </a>
        </div>

        {/* 저장 버튼 */}
        <div className="p-6 pt-0">
          <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition-colors">
            연락처 저장
          </button>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-teal-600 text-white py-3 px-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B44</strong> 사진 명함</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-teal-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

