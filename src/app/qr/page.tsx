"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type QRType = "url" | "text" | "wifi" | "email" | "phone";

export default function QRGenerator() {
  const [qrType, setQRType] = useState<QRType>("url");
  const [text, setText] = useState<string>("");
  const [size, setSize] = useState<number>(200);
  const imgRef = useRef<HTMLImageElement>(null);

  // WiFi 전용
  const [wifiSSID, setWifiSSID] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiType, setWifiType] = useState<string>("WPA");

  // Email 전용
  const [email, setEmail] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");

  // QR 데이터 생성
  const getQRData = (): string => {
    switch (qrType) {
      case "wifi":
        return `WIFI:T:${wifiType};S:${wifiSSID};P:${wifiPassword};;`;
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`;
      case "phone":
        return `tel:${text}`;
      default:
        return text;
    }
  };

  const qrData = getQRData();
  const qrUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`
    : "";

  // 다운로드
  const handleDownload = async () => {
    if (!qrUrl) return;
    
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };

  const types: { id: QRType; label: string; emoji: string }[] = [
    { id: "url", label: "URL", emoji: "🔗" },
    { id: "text", label: "텍스트", emoji: "📝" },
    { id: "wifi", label: "WiFi", emoji: "📶" },
    { id: "email", label: "이메일", emoji: "📧" },
    { id: "phone", label: "전화번호", emoji: "📞" },
  ];

  const sizes = [150, 200, 300, 400];

  const hasInput = qrType === "wifi" 
    ? wifiSSID.length > 0 
    : text.length > 0 || (qrType === "email" && email.length > 0);

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold">SLOX</span>
            </Link>
            <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
              ← 메인으로
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <span className="text-teal-400 text-sm font-medium">📱 QR코드 생성기</span>
              <span className="px-1.5 py-0.5 text-xs bg-teal-500/20 text-teal-400 rounded">NEW</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">QR코드 생성기</h1>
            <p className="text-dark-400 text-lg">URL, 텍스트, WiFi 등을 QR코드로 만들어보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 입력 영역 */}
            <div className="glass-card p-6 rounded-xl">
              {/* 타입 선택 */}
              <div className="mb-6">
                <label className="block text-dark-300 text-sm font-medium mb-3">유형 선택</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setQRType(type.id);
                        setText("");
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        qrType === type.id
                          ? "bg-teal-600 text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white"
                      }`}
                    >
                      {type.emoji} {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 입력 필드 */}
              <div className="mb-6">
                {qrType === "url" && (
                  <>
                    <label className="block text-dark-300 text-sm font-medium mb-2">URL 입력</label>
                    <input
                      type="url"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </>
                )}

                {qrType === "text" && (
                  <>
                    <label className="block text-dark-300 text-sm font-medium mb-2">텍스트 입력</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="QR코드에 담을 내용을 입력하세요"
                      className="w-full h-24 p-3 bg-dark-800 border border-dark-700 rounded-lg text-white resize-none focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </>
                )}

                {qrType === "wifi" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-dark-300 text-sm font-medium mb-2">WiFi 이름 (SSID)</label>
                      <input
                        type="text"
                        value={wifiSSID}
                        onChange={(e) => setWifiSSID(e.target.value)}
                        placeholder="WiFi 이름"
                        className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm font-medium mb-2">비밀번호</label>
                      <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder="WiFi 비밀번호"
                        className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm font-medium mb-2">암호화 방식</label>
                      <select
                        value={wifiType}
                        onChange={(e) => setWifiType(e.target.value)}
                        className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">없음</option>
                      </select>
                    </div>
                  </div>
                )}

                {qrType === "email" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-dark-300 text-sm font-medium mb-2">이메일 주소</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm font-medium mb-2">제목 (선택)</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="이메일 제목"
                        className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {qrType === "phone" && (
                  <>
                    <label className="block text-dark-300 text-sm font-medium mb-2">전화번호</label>
                    <input
                      type="tel"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full p-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </>
                )}
              </div>

              {/* 크기 선택 */}
              <div>
                <label className="block text-dark-300 text-sm font-medium mb-2">크기</label>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        size === s
                          ? "bg-teal-600 text-white"
                          : "bg-dark-700 text-dark-300 hover:bg-dark-600"
                      }`}
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* QR코드 미리보기 */}
            <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center">
              {hasInput ? (
                <>
                  <div className="bg-white p-4 rounded-xl mb-4">
                    <img
                      ref={imgRef}
                      src={qrUrl}
                      alt="QR Code"
                      width={size}
                      height={size}
                      className="block"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-lg font-medium transition-all"
                  >
                    📥 다운로드
                  </button>
                </>
              ) : (
                <div className="text-center text-dark-500">
                  <div className="text-6xl mb-4">📱</div>
                  <p>내용을 입력하면 QR코드가 생성됩니다</p>
                </div>
              )}
            </div>
          </div>

          {/* 다른 도구 */}
          <div className="glass-card p-6 rounded-xl mt-8">
            <h3 className="text-white font-medium mb-4">🔗 다른 도구</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/random" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🎲 랜덤 뽑기</Link>
              <Link href="/percent" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">🔢 퍼센트 계산기</Link>
              <Link href="/character-count" className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg text-sm transition-all">✍️ 글자수 세기</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-dark-500 text-sm text-center border-t border-dark-800 mt-12">
        <p className="mb-2">Powered by <Link href="/" className="text-white font-semibold hover:text-accent-cyan">SLOX</Link></p>
      </footer>
    </div>
  );
}

