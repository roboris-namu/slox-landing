export default function TemplateB28() {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* 헤더 */}
      <header className="py-4 px-6 bg-white border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-light tracking-wide text-rose-600">💇‍♀️ HAIR MOMENT</h1>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#menu">메뉴</a>
            <a href="#reservation">예약</a>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section className="py-16 px-6 bg-gradient-to-br from-rose-100 to-pink-100 text-center">
        <span className="text-6xl">💇‍♀️</span>
        <h2 className="text-3xl font-light text-rose-800 mt-6">당신만을 위한 스타일링</h2>
        <p className="text-rose-500 mt-2">Since 2015 | 연남동</p>
      </section>

      {/* 디자이너 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-rose-800 text-center mb-8">Designer</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "김수연 원장", role: "원장 / 컬러 전문", exp: "15년 경력" },
              { name: "이지영 실장", role: "커트 전문", exp: "10년 경력" },
              { name: "박민지 디자이너", role: "펌 전문", exp: "5년 경력" },
            ].map((designer) => (
              <div key={designer.name} className="bg-white p-6 rounded-2xl text-center shadow-sm">
                <div className="w-20 h-20 bg-rose-200 rounded-full mx-auto flex items-center justify-center text-3xl">
                  💇‍♀️
                </div>
                <h4 className="font-medium text-rose-800 mt-4">{designer.name}</h4>
                <p className="text-rose-500 text-sm mt-1">{designer.role}</p>
                <p className="text-slate-400 text-xs mt-1">{designer.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메뉴 */}
      <section id="menu" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-medium text-rose-800 text-center mb-8">Menu</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-rose-700 mb-4">✂️ Cut</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>여성 커트</span><span>30,000~</span></div>
                <div className="flex justify-between"><span>남성 커트</span><span>20,000~</span></div>
                <div className="flex justify-between"><span>앞머리</span><span>5,000</span></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-rose-700 mb-4">🎨 Color</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>전체 염색</span><span>70,000~</span></div>
                <div className="flex justify-between"><span>뿌리 염색</span><span>50,000~</span></div>
                <div className="flex justify-between"><span>탈색</span><span>80,000~</span></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-rose-700 mb-4">💫 Perm</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>디지털 펌</span><span>100,000~</span></div>
                <div className="flex justify-between"><span>볼륨 펌</span><span>80,000~</span></div>
                <div className="flex justify-between"><span>매직 스트레이트</span><span>120,000~</span></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-rose-700 mb-4">✨ Treatment</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>클리닉</span><span>30,000~</span></div>
                <div className="flex justify-between"><span>헤드스파</span><span>50,000~</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 */}
      <section id="reservation" className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-rose-500 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-medium">예약 문의</h3>
          <p className="mt-4 text-rose-100">네이버 예약 또는 전화로 예약해주세요</p>
          <p className="mt-6">📞 02-123-4567</p>
          <p className="text-rose-200 text-sm mt-2">10:00 - 20:00 (월요일 휴무)</p>
        </div>
      </section>

      {/* 위치 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-lg font-medium text-rose-800 mb-4">📍 오시는 길</h3>
          <p className="text-slate-600">서울시 마포구 연남로 123</p>
          <p className="text-slate-500 text-sm mt-2">연남동 경의선숲길 도보 3분</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-rose-400 text-sm">
        <p>© 2024 HAIR MOMENT</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-500 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>B28</strong> 헤어 살롱</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-rose-600 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

