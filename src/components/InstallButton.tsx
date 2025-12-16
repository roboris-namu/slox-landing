"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guideType, setGuideType] = useState<"ios" | "android" | "pc">("pc");
  const [isInstalled, setIsInstalled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 이미 설치되었는지 체크
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 모바일/iOS 체크
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsIOS(isIOSDevice);
    setIsMobile(isMobileDevice);

    // Android/Chrome 설치 프롬프트
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // iOS
    if (isIOS) {
      setGuideType("ios");
      setShowGuide(true);
      return;
    }

    // Android with prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return;
    }

    // Android without prompt (show manual guide)
    if (isMobile) {
      setGuideType("android");
      setShowGuide(true);
      return;
    }

    // PC
    setGuideType("pc");
    setShowGuide(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGuide(false);
  };

  // 이미 설치됨
  if (isInstalled) return null;

  const modalContent = showGuide && mounted ? (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 99999,
        height: "100dvh"
      }}
      onClick={closeModal}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80" />
      
      {/* 모달 콘텐츠 */}
      <div 
        className="relative bg-dark-900 border border-dark-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "scale-in 0.2s ease-out"
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-dark-500 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-800 transition-colors"
        >
          ✕
        </button>

        {/* iOS 가이드 */}
        {guideType === "ios" && (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🍎</div>
              <h3 className="text-white text-xl font-bold">iOS에서 설치하기</h3>
              <p className="text-dark-400 text-sm mt-1">Safari 브라우저에서 진행해주세요</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">우측 하단 <span className="text-blue-400">···</span> 버튼 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">Safari 하단 메뉴 열기</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm"><span className="text-blue-400">공유</span> 버튼 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">공유 메뉴 열기</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">우측 하단 <span className="text-blue-400">···</span> 더보기 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">추가 옵션 보기</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">&quot;홈 화면에 추가&quot; 선택</p>
                  <p className="text-dark-400 text-xs mt-0.5">홈 화면에 SLOX 아이콘 생성! 🐂</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Android 가이드 */}
        {guideType === "android" && (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🤖</div>
              <h3 className="text-white text-xl font-bold">Android에서 설치하기</h3>
              <p className="text-dark-400 text-sm mt-1">Chrome 브라우저에서 진행해주세요</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Chrome 메뉴 열기</p>
                  <p className="text-dark-400 text-xs mt-0.5">우측 상단 <span className="text-green-400">⋮</span> 버튼 탭</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">&quot;홈 화면에 추가&quot; 선택</p>
                  <p className="text-dark-400 text-xs mt-0.5">메뉴에서 선택해주세요</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-dark-800 rounded-xl">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">&quot;추가&quot; 버튼 탭</p>
                  <p className="text-dark-400 text-xs mt-0.5">홈 화면에 SLOX 아이콘 생성! 🐂</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PC 가이드 */}
        {guideType === "pc" && (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📱</div>
              <h3 className="text-white text-xl font-bold">모바일에서 설치하세요!</h3>
              <p className="text-dark-400 text-sm mt-1">스마트폰에서 더 빠르고 편리해요</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* 모바일 설치 안내 */}
              <div className="p-5 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl">🐂</div>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg mb-2">SLOX 앱 설치</p>
                  <p className="text-dark-300 text-sm mb-3">
                    스마트폰으로 아래 주소 접속 후<br/>
                    <span className="text-purple-400 font-bold">📲 앱 설치</span> 버튼을 눌러주세요!
                  </p>
                  <div className="bg-dark-800 rounded-lg py-2 px-4 inline-block">
                    <span className="text-purple-400 font-mono font-bold">slox.co.kr</span>
                  </div>
                </div>
              </div>

              {/* 장점 */}
              <div className="flex gap-2 text-xs text-dark-400">
                <span className="bg-dark-800 px-2 py-1 rounded-full">⚡ 빠른 실행</span>
                <span className="bg-dark-800 px-2 py-1 rounded-full">📴 오프라인 가능</span>
                <span className="bg-dark-800 px-2 py-1 rounded-full">🔔 알림</span>
              </div>
            </div>
          </>
        )}

        <button
          onClick={closeModal}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          알겠어요! 🐂
        </button>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  ) : null;

  return (
    <>
      {/* 설치 버튼 */}
      <button
        onClick={handleInstall}
        className="relative px-3 py-2 text-sm font-bold text-purple-400 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 flex items-center gap-1.5 transition-all duration-300 border border-purple-500/30"
      >
        <span className="text-base">📲</span>
        <span className="text-xs hidden sm:inline">앱 설치</span>
        {/* 반짝이 효과 */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
      </button>

      {/* Portal로 body에 직접 렌더링 */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
