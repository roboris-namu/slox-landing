export default function TemplateE05() {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-8 py-20 text-center">
        {/* 이름 */}
        <h1 className="text-4xl font-light tracking-wide text-slate-800">
          MINHO & YUNA
        </h1>

        {/* 구분선 */}
        <div className="w-12 h-px bg-slate-300 mx-auto my-12" />

        {/* 날짜 */}
        <p className="text-slate-500 tracking-widest">2025. 06. 07</p>
        <p className="text-slate-400 text-sm mt-2">SATURDAY, 2PM</p>

        {/* 사진 */}
        <div className="my-16 aspect-square bg-slate-100 flex items-center justify-center">
          <span className="text-8xl">🤍</span>
        </div>

        {/* 인사말 */}
        <p className="text-slate-500 leading-loose font-light">
          사랑으로 하나 되는 날,<br />
          함께해 주세요.
        </p>

        {/* 구분선 */}
        <div className="w-12 h-px bg-slate-300 mx-auto my-12" />

        {/* 장소 */}
        <p className="text-slate-700">미니멀 웨딩홀</p>
        <p className="text-slate-400 text-sm mt-1">서울시 강남구 미니멀로 50</p>

        {/* 지도 */}
        <div className="my-12 aspect-video bg-slate-50 flex items-center justify-center">
          <span className="text-4xl text-slate-300">📍</span>
        </div>

        {/* 연락처 */}
        <div className="flex justify-center gap-8 text-sm text-slate-500">
          <a href="tel:010-1234-5678" className="hover:text-slate-800">Groom</a>
          <span>|</span>
          <a href="tel:010-8765-4321" className="hover:text-slate-800">Bride</a>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E05</strong> 미니멀 웨딩</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-slate-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

