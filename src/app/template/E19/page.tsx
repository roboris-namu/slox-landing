export default function TemplateE19() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-red-900 to-amber-900">
      {/* 불꽃놀이 */}
      <div className="text-center pt-8 text-5xl">🎆✨🎆</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="border-2 border-amber-400 rounded-lg inline-block px-8 py-3 mb-8">
          <p className="text-amber-400 tracking-widest font-bold">2024 송년회</p>
        </div>

        {/* 제목 */}
        <h1 className="text-4xl font-bold text-white">
          한 해를 마무리하며
        </h1>
        <p className="text-amber-300 mt-2">함께해서 행복했습니다 ✨</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-slate-800/80 backdrop-blur rounded-2xl border border-amber-500/50">
          <p className="text-amber-400">📅 일시</p>
          <p className="text-2xl text-white font-bold mt-2">2024년 12월 28일</p>
          <p className="text-slate-300 mt-1">토요일 저녁 7시</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 aspect-video bg-gradient-to-br from-red-900 to-amber-900 rounded-2xl flex items-center justify-center border border-amber-500/30">
          <span className="text-8xl">🥂</span>
        </div>

        {/* 인사말 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 my-8 border border-amber-500/30">
          <p className="text-slate-200 leading-relaxed">
            올 한 해 고생 많으셨습니다! 🙏<br /><br />
            함께 웃고 울었던 순간들을 추억하며<br />
            맛있는 음식과 함께<br />
            한 해를 마무리해요!
          </p>
        </div>

        {/* 프로그램 */}
        <div className="bg-gradient-to-r from-red-800 to-amber-800 rounded-2xl p-6 my-8">
          <p className="text-amber-300 font-bold mb-4">🎉 프로그램</p>
          <div className="space-y-2 text-white text-sm">
            <p>19:00 만찬</p>
            <p>20:00 올해의 인물 시상</p>
            <p>20:30 축하 공연</p>
            <p>21:00 경품 추첨</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 my-8 border border-amber-500/30">
          <p className="text-amber-400 font-medium">📍 장소</p>
          <p className="text-white mt-2">그랜드 연회장</p>
          <p className="text-slate-400 text-sm mt-1">서울시 중구 송년로 100</p>
        </div>

        {/* 참석 확인 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg p-4 font-bold">
          🎆 참석 확인하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-red-700 to-amber-700 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E19</strong> 송년회</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-red-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

