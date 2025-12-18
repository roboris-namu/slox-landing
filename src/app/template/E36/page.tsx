export default function TemplateE36() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900">
      {/* 메인 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 로켓 장식 */}
        <div className="text-5xl mb-4 animate-bounce">🚀</div>

        {/* 타이틀 */}
        <p className="text-cyan-400 tracking-widest text-sm">PRODUCT LAUNCH</p>
        <h1 className="text-4xl font-bold text-white mt-4">
          NEW PRODUCT X
        </h1>
        <p className="text-cyan-300 text-xl mt-2">세상을 바꿀 혁신</p>

        {/* 카운트다운 스타일 날짜 */}
        <div className="mt-8 py-6 bg-white/10 backdrop-blur rounded-2xl border border-cyan-400/30">
          <p className="text-cyan-300 text-sm">LAUNCH DATE</p>
          <p className="text-4xl font-bold text-white mt-2">2025.05.15</p>
          <p className="text-cyan-300 mt-1">목요일 오후 2시</p>
        </div>

        {/* 제품 이미지 */}
        <div className="my-8 aspect-square bg-gradient-to-br from-cyan-600/50 to-purple-600/50 backdrop-blur rounded-3xl flex items-center justify-center border border-cyan-400/30">
          <span className="text-8xl">📦</span>
        </div>

        {/* 소개 */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-cyan-400/20">
          <p className="text-cyan-100 leading-relaxed">
            기다려왔던 그 제품,<br />
            드디어 공개됩니다! ⚡<br /><br />
            런칭 이벤트에 참여하고<br />
            특별 혜택을 받아가세요!
          </p>
        </div>

        {/* 런칭 혜택 */}
        <div className="mt-8 bg-gradient-to-r from-cyan-600/50 to-purple-600/50 backdrop-blur rounded-2xl p-6">
          <p className="text-cyan-300 font-bold mb-4">🎁 런칭 특별 혜택</p>
          <div className="space-y-2 text-white text-sm">
            <p>✓ 얼리버드 30% 할인</p>
            <p>✓ 한정판 굿즈 증정</p>
            <p>✓ 무료 배송</p>
            <p>✓ 1년 무상 A/S</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="mt-8 bg-white/10 backdrop-blur rounded-2xl p-6 border border-cyan-400/20">
          <p className="text-cyan-400 font-medium">📍 런칭 이벤트 장소</p>
          <p className="text-white mt-2">코엑스 컨벤션홀</p>
          <p className="text-cyan-300 text-sm mt-1">서울시 강남구 영동대로 513</p>
        </div>

        {/* 온라인 참여 */}
        <div className="mt-6 bg-cyan-600/30 backdrop-blur rounded-xl p-4 border border-cyan-400/30">
          <p className="text-cyan-300 text-sm">💻 온라인 동시 생중계</p>
          <p className="text-white text-sm mt-1">유튜브 / 네이버 라이브</p>
        </div>

        {/* 사전 등록 */}
        <a href="#" className="block mt-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg p-4 font-bold text-lg">
          🚀 사전 등록하기
        </a>

        {/* SNS */}
        <div className="mt-6 flex justify-center gap-3">
          <span className="text-cyan-400 text-sm">#ProductX</span>
          <span className="text-purple-400 text-sm">#NewLaunch2025</span>
        </div>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E36</strong> 런칭 이벤트</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-cyan-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

