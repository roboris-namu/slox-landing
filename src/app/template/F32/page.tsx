export default function TemplateF32() {
  const books = [
    { title: "달러구트 꿈 백화점", author: "이미예", month: "12월" },
    { title: "불편한 편의점", author: "김호연", month: "11월" },
    { title: "아몬드", author: "손원평", month: "10월" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-12 text-center bg-gradient-to-b from-amber-700 to-amber-600">
        <span className="text-5xl">📚</span>
        <h1 className="text-3xl font-bold text-white mt-4">책마실 북클럽</h1>
        <p className="text-amber-100 mt-2">매달 한 권, 함께 읽는 기쁨</p>
      </header>

      {/* 소개 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-3">📖 소개</h3>
          <p className="text-slate-600 leading-relaxed">
            책마실은 2020년 시작된 독서 모임입니다.
            매달 한 권의 책을 선정하여 함께 읽고 토론합니다.
            책을 통해 세상을 더 깊이 이해하고자 합니다.
          </p>
        </div>
      </section>

      {/* 이달의 책 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📕 이달의 책</h3>
          <div className="bg-amber-100 rounded-2xl p-6 text-center">
            <span className="text-6xl">📖</span>
            <p className="font-bold text-amber-900 text-xl mt-4">달러구트 꿈 백화점</p>
            <p className="text-amber-700 mt-1">이미예 | 팩토리나인</p>
            <p className="text-amber-600 text-sm mt-2">12월 모임일: 12월 21일(토)</p>
          </div>
        </div>
      </section>

      {/* 지난 도서 */}
      <section className="py-8 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-4">📚 지난 도서</h3>
          <div className="space-y-3">
            {books.map((book) => (
              <div key={book.title} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{book.title}</p>
                  <p className="text-slate-500 text-sm">{book.author}</p>
                </div>
                <span className="text-amber-500 text-sm">{book.month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 모임 정보 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <span className="text-3xl">📅</span>
            <p className="font-bold text-slate-800 mt-2">매월 셋째 주 토요일</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <span className="text-3xl">📍</span>
            <p className="font-bold text-slate-800 mt-2">합정 카페</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-500">
        <p>📚 책마실 - 함께 읽어요 📚</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-700 text-white py-3 px-4 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F32</strong> 독서 모임</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-800 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

