export default function TemplateF01() {
  const photos = [
    { id: 1, title: "우리 가족", date: "2024.01" },
    { id: 2, title: "여름 휴가", date: "2024.07" },
    { id: 3, title: "크리스마스", date: "2023.12" },
    { id: 4, title: "할머니 생신", date: "2024.03" },
    { id: 5, title: "아이 졸업식", date: "2024.02" },
    { id: 6, title: "가족 나들이", date: "2024.05" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* 헤더 */}
      <header className="py-8 text-center border-b border-amber-200">
        <h1 className="text-3xl font-serif text-amber-900">🏠 우리 가족 이야기</h1>
        <p className="text-amber-700 mt-2">Kim Family Since 2010</p>
      </header>

      {/* 메인 배너 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-48 h-48 bg-amber-200 rounded-full mx-auto mb-8 flex items-center justify-center text-7xl shadow-lg">
            👨‍👩‍👧‍👦
          </div>
          <h2 className="text-4xl font-serif text-amber-900 mb-4">김씨네 가족</h2>
          <p className="text-amber-700 text-lg max-w-xl mx-auto">
            사랑으로 가득한 우리 가족의 소중한 순간들을 기록합니다.
            함께하는 모든 날이 특별해요.
          </p>
        </div>
      </section>

      {/* 가족 소개 */}
      <section className="py-12 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif text-amber-900 text-center mb-8">가족 소개</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "아빠", role: "김철수", emoji: "👨" },
              { name: "엄마", role: "이영희", emoji: "👩" },
              { name: "큰아들", role: "김민준", emoji: "👦" },
              { name: "막내딸", role: "김서연", emoji: "👧" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
                  {member.emoji}
                </div>
                <p className="font-medium text-amber-900">{member.name}</p>
                <p className="text-sm text-amber-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사진 갤러리 */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif text-amber-900 text-center mb-8">📸 추억 앨범</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-amber-100 flex items-center justify-center text-6xl">
                  📷
                </div>
                <div className="p-4">
                  <p className="font-medium text-amber-900">{photo.title}</p>
                  <p className="text-sm text-amber-500">{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가훈 */}
      <section className="py-12 px-6 bg-amber-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-3xl font-serif text-amber-800 italic">
            &ldquo;사랑과 웃음이 가득한 우리 집&rdquo;
          </p>
          <p className="text-amber-600 mt-4">- 우리 가족 가훈 -</p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-amber-600">
        <p>Made with ❤️ by Kim Family</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-600 text-white py-3 px-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F01</strong> 따뜻한 가족</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-amber-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

