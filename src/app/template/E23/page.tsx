export default function TemplateE23() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100">
      {/* 졸업 장식 */}
      <div className="text-center pt-8 text-5xl">🎓✨🎓</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-indigo-600 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">GRADUATION PARTY!</p>
        </div>

        {/* 제목 */}
        <h1 className="text-4xl font-bold text-indigo-700">
          졸업을 축하해! 🎉
        </h1>
        <p className="text-purple-500 mt-2">4년간 수고했어!</p>

        {/* 이름 */}
        <div className="my-8 py-8 bg-white rounded-3xl shadow-lg">
          <span className="text-6xl">🧑‍🎓</span>
          <h2 className="text-3xl font-bold text-indigo-600 mt-4">김졸업</h2>
          <p className="text-slate-500 mt-2">○○대학교 컴퓨터공학과</p>
        </div>

        {/* 날짜 */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 my-8">
          <p className="text-indigo-100">📅 졸업 파티</p>
          <p className="text-2xl font-bold mt-2">2025년 2월 25일</p>
          <p className="text-indigo-100 mt-1">화요일 오후 5시</p>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 my-8">
          <p className="text-slate-600 leading-relaxed">
            드디어 졸업이다! 🎊<br />
            함께 고생한 친구들,<br />
            응원해준 가족들 모두 모여서<br />
            축하 파티를 해요!
          </p>
        </div>

        {/* 졸업 마일스톤 */}
        <div className="bg-indigo-100 rounded-2xl p-6 my-8 text-left">
          <p className="text-indigo-600 font-bold mb-4">📚 4년의 기록</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-16 text-indigo-500">2021</span>
              <span className="text-slate-600">입학 🌱</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-indigo-500">2022</span>
              <span className="text-slate-600">첫 프로젝트 완성</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-indigo-500">2024</span>
              <span className="text-slate-600">졸업 작품 대상 🏆</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-indigo-500 font-bold">2025</span>
              <span className="text-slate-700 font-bold">졸업! 🎓</span>
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-indigo-500 font-medium">📍 장소</p>
          <p className="text-slate-700 mt-2">졸업파티 레스토랑</p>
          <p className="text-slate-500 text-sm mt-1">서울시 관악구 졸업로 25</p>
        </div>

        {/* 참석 확인 */}
        <a href="tel:010-1234-5678" className="block bg-indigo-600 text-white rounded-full p-4 font-bold">
          🎓 축하하러 갈게!
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E23</strong> 졸업 파티</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-indigo-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

