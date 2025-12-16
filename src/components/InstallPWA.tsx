"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // iOS 체크
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // 이미 설치되었는지 체크
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) return;

    // 배너 숨김 체크 (24시간)
    const hiddenUntil = localStorage.getItem("pwa_banner_hidden");
    if (hiddenUntil && Date.now() < parseInt(hiddenUntil)) return;

    // Android/Chrome 설치 프롬프트
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS는 수동으로 배너 표시
    if (isIOSDevice) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // 24시간 동안 숨기기
    localStorage.setItem("pwa_banner_hidden", String(Date.now() + 24 * 60 * 60 * 1000));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* 설치 배너 */}
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up md:left-auto md:right-4 md:max-w-sm">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 shadow-2xl shadow-purple-500/30 border border-purple-400/30">
          <div className="flex items-start gap-3">
            {/* 아이콘 */}
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📱</span>
            </div>
            
            {/* 내용 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-sm mb-1">
                SLOX 앱 설치하기! 🎮
              </h3>
              <p className="text-purple-100 text-xs leading-relaxed">
                홈 화면에 추가하면 더 빠르게 접속할 수 있어요!
              </p>
            </div>

            {/* 닫기 */}
            <button
              onClick={handleDismiss}
              className="text-white/60 hover:text-white p-1 -mr-1 -mt-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstall}
              className="flex-1 py-2.5 bg-white text-purple-600 font-bold text-sm rounded-xl hover:bg-purple-50 transition-all"
            >
              {isIOS ? "설치 방법 보기" : "지금 설치"}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 bg-white/20 text-white font-medium text-sm rounded-xl hover:bg-white/30 transition-all"
            >
              나중에
            </button>
          </div>
        </div>
      </div>

      {/* iOS 가이드 모달 */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-dark-900 border border-dark-700 rounded-2xl p-6 max-w-sm w-full animate-scale-in">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📲</div>
              <h3 className="text-white text-xl font-bold">iOS에서 설치하기</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">하단 공유 버튼 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">Safari 하단의 <span className="inline-block w-5 h-5 bg-blue-500 rounded text-white text-xs leading-5 text-center">↑</span> 버튼</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">&quot;홈 화면에 추가&quot; 선택</p>
                  <p className="text-dark-400 text-xs mt-0.5">스크롤해서 찾아주세요</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">&quot;추가&quot; 버튼 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">홈 화면에 SLOX 아이콘 생성!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIOSGuide(false);
                handleDismiss();
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl"
            >
              알겠어요!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

