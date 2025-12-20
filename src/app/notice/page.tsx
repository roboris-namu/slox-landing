"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 공지사항 타입
interface Notice {
  id: string;
  title: string;
  content: string;
  type: "general" | "event" | "update" | "winner";
  is_pinned: boolean;
  created_at: string;
}

// 타입별 스타일
const typeStyles = {
  general: {
    icon: "📢",
    label: "공지",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  event: {
    icon: "🎁",
    label: "이벤트",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  update: {
    icon: "🔧",
    label: "업데이트",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
  },
  winner: {
    icon: "🏆",
    label: "당첨자 발표",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
};

/**
 * 📢 공지사항 페이지
 */
export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // 공지사항 로드 (API 프록시 사용 - 광고 차단기 우회)
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("/api/notices");
        const result = await response.json();

        if (result.data) {
          setNotices(result.data);
      }
      } catch (err) {
        console.error("공지사항 로드 실패:", err);
      } finally {
      setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 필터링된 공지사항
  const filteredNotices = filter === "all" 
    ? notices 
    : notices.filter(n => n.type === filter);

  // 날짜 포맷
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold">
            <span className="text-2xl">📢</span>
            <span>공지사항</span>
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 text-sm text-dark-400 hover:text-white rounded-xl hover:bg-white/5 transition-all"
          >
            ← 메인으로
          </Link>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              📢 공지사항
            </h1>
            <p className="text-dark-400">
              SLOX의 새로운 소식과 이벤트를 확인하세요!
            </p>
          </div>

          {/* 필터 탭 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { key: "all", label: "전체", icon: "📋" },
              { key: "event", label: "이벤트", icon: "🎁" },
              { key: "winner", label: "당첨자", icon: "🏆" },
              { key: "update", label: "업데이트", icon: "🔧" },
              { key: "general", label: "공지", icon: "📢" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === tab.key
                    ? "bg-accent-500 text-white"
                    : "bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-white"
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 로딩 */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-dark-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredNotices.length === 0 ? (
            /* 빈 상태 */
            <div className="text-center py-20">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-dark-400">등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            /* 공지사항 목록 */
            <div className="space-y-4">
              {filteredNotices.map((notice) => {
                const style = typeStyles[notice.type] || typeStyles.general;
                
                return (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className={`
                      relative p-5 rounded-2xl cursor-pointer transition-all duration-300
                      bg-dark-800/50 border hover:bg-dark-800 hover:scale-[1.01]
                      ${notice.is_pinned ? "border-yellow-500/50 bg-yellow-500/5" : "border-white/5"}
                    `}
                  >
                    {/* 고정 배지 */}
                    {notice.is_pinned && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-500 text-dark-900 text-xs font-bold rounded-full">
                        📌 고정
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* 타입 아이콘 */}
                      <div className={`w-12 h-12 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center text-2xl flex-shrink-0`}>
                        {style.icon}
                      </div>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.color}`}>
                            {style.label}
                          </span>
                          <span className="text-dark-500 text-xs">
                            {formatDate(notice.created_at)}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-lg truncate">
                          {notice.title}
                        </h3>
                        <p className="text-dark-400 text-sm mt-1 line-clamp-2">
                          {notice.content}
                        </p>
                      </div>

                      {/* 화살표 */}
                      <div className="text-dark-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* 상세 모달 */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="w-full max-w-2xl max-h-[80vh] overflow-auto bg-dark-900 border border-white/10 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="sticky top-0 bg-dark-900/95 backdrop-blur-xl border-b border-white/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeStyles[selectedNotice.type]?.bg} ${typeStyles[selectedNotice.type]?.color}`}>
                      {typeStyles[selectedNotice.type]?.icon} {typeStyles[selectedNotice.type]?.label}
                    </span>
                    <span className="text-dark-500 text-xs">
                      {formatDate(selectedNotice.created_at)}
                    </span>
                    {selectedNotice.is_pinned && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                        📌 고정
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedNotice.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-2 rounded-xl hover:bg-white/5 text-dark-400 hover:text-white transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 본문 */}
            <div className="p-5">
              <div className="prose prose-invert max-w-none">
                <p className="text-dark-300 whitespace-pre-wrap leading-relaxed">
                  {selectedNotice.content.split('\n').map((line, i) => {
                    // "자세히 보기: /event" 같은 링크 패턴 처리
                    if (line.includes('자세히 보기:') && line.includes('/')) {
                      const linkMatch = line.match(/\/\w+/);
                      const link = linkMatch ? linkMatch[0] : '/event';
                      return (
                        <span key={i} className="block mt-4">
                          <a
                            href={link}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-dark-900 font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            <span>🎁</span>
                            <span>이벤트 자세히 보기</span>
                            <span>→</span>
                          </a>
                        </span>
                      );
                    }
                    return <span key={i}>{line}{i < selectedNotice.content.split('\n').length - 1 && '\n'}</span>;
                  })}
                </p>
              </div>
            </div>

            {/* 푸터 */}
            <div className="sticky bottom-0 bg-dark-900/95 backdrop-blur-xl border-t border-white/5 p-4">
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-xl transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

