export default function TemplateE25() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-blue-50 to-pink-100">
      {/* 베이비샤워 장식 */}
      <div className="text-center pt-8 text-5xl">🍼👶🎀</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-gradient-to-r from-cyan-400 to-pink-400 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">BABY SHOWER</p>
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-bold text-slate-700">
          예비맘 지영이의
        </h1>
        <p className="text-cyan-500 text-xl mt-2">베이비샤워에 초대합니다! 💙</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-cyan-500">📅 일시</p>
          <p className="text-2xl text-slate-700 font-bold mt-2">2025년 4월 12일</p>
          <p className="text-slate-500 mt-1">토요일 오후 3시</p>
        </div>

        {/* 이미지 */}
        <div className="my-8 grid grid-cols-3 gap-4">
          <div className="aspect-square bg-cyan-100 rounded-2xl flex items-center justify-center text-4xl">🧸</div>
          <div className="aspect-square bg-pink-100 rounded-2xl flex items-center justify-center text-4xl">👶</div>
          <div className="aspect-square bg-yellow-100 rounded-2xl flex items-center justify-center text-4xl">🍼</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8 border-2 border-dashed border-cyan-300">
          <p className="text-slate-600 leading-relaxed">
            곧 태어날 아기를 위해<br />
            예비맘 지영이와 함께하는<br />
            베이비샤워에 초대합니다! 👶<br /><br />
            축복의 마음을 나눠주세요!
          </p>
        </div>

        {/* 아기 정보 */}
        <div className="bg-gradient-to-r from-cyan-100 to-pink-100 rounded-2xl p-6 my-8">
          <p className="text-cyan-600 font-bold mb-4">👼 예비 아기 정보</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <span className="text-2xl">👶</span>
              <p className="text-slate-600 mt-1">성별: 남아</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-2xl">📅</span>
              <p className="text-slate-600 mt-1">예정일: 5월 중순</p>
            </div>
          </div>
        </div>

        {/* 프로그램 */}
        <div className="bg-cyan-100 rounded-2xl p-6 my-8">
          <p className="text-cyan-600 font-bold mb-4">🎉 파티 프로그램</p>
          <div className="space-y-2 text-sm text-slate-600">
            <p>15:00 모임 & 다과</p>
            <p>15:30 축하 메시지 💌</p>
            <p>16:00 게임 타임 🎮</p>
            <p>16:30 선물 언박싱 🎁</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-cyan-500 font-medium">📍 장소</p>
          <p className="text-slate-700 mt-2">베이비 카페</p>
          <p className="text-slate-500 text-sm mt-1">서울시 서초구 베이비로 12</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full p-4 font-bold">
          🍼 축하하러 갈게요!
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E25</strong> 베이비샤워</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-cyan-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

