export default function TemplateF12() {
  const diary = [
    { date: "2024.12.01", title: "오늘의 산책", content: "공원에서 즐거운 산책!", emoji: "🌳" },
    { date: "2024.11.28", title: "동물병원 방문", content: "건강검진 완료!", emoji: "🏥" },
    { date: "2024.11.25", title: "새 장난감", content: "공 장난감 너무 좋아!", emoji: "🎾" },
  ];

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="py-8 px-6 bg-gradient-to-b from-emerald-100 to-emerald-50 text-center">
        <span className="text-5xl">🐾</span>
        <h1 className="text-2xl font-bold text-emerald-900 mt-4">Pet Diary</h1>
        <p className="text-emerald-600">우리 반려동물의 하루하루</p>
      </header>

      {/* 펫 프로필 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto flex items-center gap-6 bg-white rounded-2xl p-6 shadow-md">
          <div className="w-24 h-24 bg-emerald-200 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
            🐕
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-900">초코</h2>
            <p className="text-emerald-600 text-sm">포메라니안 | 2살 | 남아</p>
            <p className="text-emerald-500 text-sm mt-1">활발하고 사랑스러운 아이</p>
          </div>
        </div>
      </section>

      {/* 다이어리 */}
      <section className="py-8 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">📔 최근 일기</h3>
          <div className="space-y-4">
            {diary.map((entry) => (
              <div key={entry.date} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div>
                    <p className="text-emerald-500 text-xs">{entry.date}</p>
                    <h4 className="font-bold text-emerald-900">{entry.title}</h4>
                    <p className="text-emerald-600 text-sm mt-1">{entry.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 정보 */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">🩺 건강 정보</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-emerald-500 text-xs">마지막 예방접종</p>
              <p className="font-bold text-emerald-900">2024.06.15</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-emerald-500 text-xs">다음 검진일</p>
              <p className="font-bold text-emerald-900">2025.01.15</p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center text-emerald-500">
        <p>🐾 Pet Diary - 소중한 순간을 기록해요 🐾</p>
      </footer>

      {/* 주문 배너 */}
      <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white py-3 px-4 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-sm"><strong>F12</strong> 펫 다이어리</span>
          <a href="https://slox.co.kr#contact" className="px-4 py-1.5 bg-white text-emerald-700 text-sm font-bold rounded-full">
            9,900원 주문
          </a>
        </div>
      </div>
    </div>
  );
}

