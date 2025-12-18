export default function TemplateE17() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-yellow-50 to-orange-100">
      {/* 동물 장식 */}
      <div className="text-center pt-8 text-4xl">🦁 🐻 🐰</div>

      {/* 메인 초대장 */}
      <div className="max-w-lg mx-auto px-6 py-8 text-center">
        {/* 타이틀 */}
        <div className="bg-green-500 text-white rounded-full inline-block px-8 py-3 mb-6">
          <p className="font-bold">ANIMAL PARTY!</p>
        </div>

        {/* 이름 */}
        <h1 className="text-4xl font-bold text-green-600">
          은우의 동물원 파티
        </h1>
        <p className="text-orange-500 text-xl mt-2">4번째 생일을 축하해요!</p>

        {/* 날짜 */}
        <div className="my-8 py-6 bg-white rounded-3xl shadow-lg">
          <p className="text-2xl text-green-600 font-bold">2025년 4월 20일</p>
          <p className="text-slate-500 mt-1">일요일 낮 12시</p>
        </div>

        {/* 동물 캐릭터들 */}
        <div className="my-8 grid grid-cols-3 gap-4">
          <div className="aspect-square bg-yellow-100 rounded-full flex items-center justify-center text-4xl">🦁</div>
          <div className="aspect-square bg-amber-100 rounded-full flex items-center justify-center text-4xl">🐻</div>
          <div className="aspect-square bg-pink-100 rounded-full flex items-center justify-center text-4xl">🐰</div>
          <div className="aspect-square bg-orange-100 rounded-full flex items-center justify-center text-4xl">🦊</div>
          <div className="aspect-square bg-green-100 rounded-full flex items-center justify-center text-4xl">🐸</div>
          <div className="aspect-square bg-blue-100 rounded-full flex items-center justify-center text-4xl">🐘</div>
        </div>

        {/* 인사말 */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 my-8 border-4 border-dashed border-green-300">
          <p className="text-slate-600 leading-relaxed">
            귀여운 동물 친구들과 함께하는<br />
            은우의 생일파티에 오세요! 🎈<br /><br />
            좋아하는 동물 옷을 입고<br />
            놀러오면 더 재밌어요!
          </p>
        </div>

        {/* 동물 코스튬 안내 */}
        <div className="bg-orange-100 rounded-2xl p-4 my-8">
          <p className="text-orange-600 font-bold">🦓 코스튬 안내</p>
          <p className="text-slate-600 text-sm mt-2">동물 모자나 옷 환영!</p>
        </div>

        {/* 이벤트 */}
        <div className="grid grid-cols-2 gap-4 my-8">
          <div className="bg-green-100 rounded-2xl p-4">
            <span className="text-3xl">🎨</span>
            <p className="text-green-600 text-sm mt-2">페이스페인팅</p>
          </div>
          <div className="bg-yellow-100 rounded-2xl p-4">
            <span className="text-3xl">🎈</span>
            <p className="text-yellow-600 text-sm mt-2">동물 풍선</p>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-white rounded-2xl p-6 my-8 shadow">
          <p className="text-green-500 font-medium">🌳 동물원 파티룸</p>
          <p className="text-slate-600 mt-2">사파리 키즈카페</p>
          <p className="text-slate-500 text-sm mt-1">서울시 용산구 동물로 44</p>
        </div>

        {/* 연락처 */}
        <a href="tel:010-1234-5678" className="block bg-green-500 text-white rounded-full p-4 font-bold">
          🐾 참석 연락하기
        </a>
      </div>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>E17</strong> 동물 테마</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-green-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

