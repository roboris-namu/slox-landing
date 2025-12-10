"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* 헤더 */}
      <header className="border-b border-dark-800 bg-dark-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg">SLOX</span>
          </Link>
          <div className="flex items-center gap-3">
            {/* 언어 전환 */}
            <div className="flex bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => setLang("ko")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  lang === "ko"
                    ? "bg-purple-500 text-white font-medium"
                    : "text-dark-400 hover:text-white"
                }`}
              >
                🇰🇷 한국어
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  lang === "en"
                    ? "bg-purple-500 text-white font-medium"
                    : "text-dark-400 hover:text-white"
                }`}
              >
                🇺🇸 English
              </button>
            </div>
            <Link href="/" className="text-dark-400 hover:text-white transition-colors text-sm hidden sm:block">
              ← {lang === "ko" ? "홈으로" : "Home"}
            </Link>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">
          {lang === "ko" ? "개인정보 처리방침" : "Privacy Policy"}
        </h1>
        <p className="text-dark-400 mb-8">
          {lang === "ko" ? "Privacy Policy" : "개인정보 처리방침"}
        </p>
        
        {lang === "ko" ? <KoreanContent /> : <EnglishContent />}

        {/* 하단 */}
        <div className="mt-12 pt-8 border-t border-dark-800 text-center">
          <p className="text-dark-500 text-sm">
            © 2025 SLOX. All rights reserved.
          </p>
          <Link href="/" className="inline-block mt-4 text-purple-400 hover:text-purple-300 transition-colors">
            ← {lang === "ko" ? "홈으로 돌아가기" : "Back to Home"}
          </Link>
        </div>
      </main>
    </div>
  );
}

function KoreanContent() {
  return (
    <div className="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">1.</span> 개요
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            SLOX(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
            회사는 본 개인정보 처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
            개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">2.</span> 수집하는 개인정보
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">웹사이트 (slox.co.kr)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>닉네임 (랭킹 등록 시, 선택)</li>
              <li>이메일 주소 (이벤트 참여 시, 선택)</li>
              <li>게임 기록 및 점수</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">모바일 앱 (SLOX Decibel)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>마이크 접근 권한 (소음 측정 기능에만 사용)</li>
              <li>수집되는 개인정보: <span className="text-green-400 font-medium">없음</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">3.</span> 개인정보의 이용 목적
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>랭킹 시스템 운영 및 리더보드 표시</li>
            <li>이벤트 당첨자 연락 및 상품 발송</li>
            <li>서비스 개선 및 통계 분석</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">4.</span> 개인정보의 보유 및 이용 기간
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            이용자의 개인정보는 서비스 이용 기간 동안 보유하며, 이용자가 삭제를 요청하거나 
            서비스 탈퇴 시 지체 없이 파기합니다.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>랭킹 기록: 서비스 운영 기간 동안</li>
            <li>이벤트 참여 정보: 이벤트 종료 후 3개월</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">5.</span> 개인정보의 제3자 제공
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            회사는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 
            다만, 아래의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의한 경우</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">6.</span> 마이크 권한 사용 (SLOX Decibel 앱)
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p className="mb-3">
            SLOX Decibel 앱은 소음 측정 기능을 위해 마이크 접근 권한을 요청합니다.
          </p>
          <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
            <p className="text-green-400 font-medium mb-2">🔒 개인정보 보호 안내</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>마이크 데이터는 <strong className="text-white">기기 내에서만</strong> 처리됩니다</li>
              <li>음성 녹음은 <strong className="text-white">저장되지 않습니다</strong></li>
              <li>외부 서버로 <strong className="text-white">전송되지 않습니다</strong></li>
              <li>오직 실시간 데시벨 측정에만 사용됩니다</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">7.</span> 이용자의 권리
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정 요청</li>
            <li>개인정보 삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">8.</span> 문의처
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>개인정보 관련 문의사항이 있으시면 아래로 연락해 주세요.</p>
          <div className="mt-4 space-y-2">
            <p><span className="text-dark-500">이메일:</span> <a href="mailto:namurobori@gmail.com" className="text-purple-400 hover:text-purple-300">namurobori@gmail.com</a></p>
            <p><span className="text-dark-500">웹사이트:</span> <a href="https://slox.co.kr" className="text-purple-400 hover:text-purple-300">https://slox.co.kr</a></p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">9.</span> 시행일
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>본 개인정보 처리방침은 <strong className="text-white">2025년 12월 10일</strong>부터 시행됩니다.</p>
        </div>
      </section>
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">1.</span> Introduction
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            SLOX (&quot;Company&quot;) values your privacy and complies with applicable data protection laws.
            This Privacy Policy explains how we collect, use, and protect your personal information
            when you use our services.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">2.</span> Information We Collect
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Website (slox.co.kr)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nickname (optional, for leaderboard registration)</li>
              <li>Email address (optional, for event participation)</li>
              <li>Game records and scores</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Mobile App (SLOX Decibel)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Microphone access (used only for sound measurement)</li>
              <li>Personal data collected: <span className="text-green-400 font-medium">None</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">3.</span> How We Use Your Information
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Operating ranking system and displaying leaderboards</li>
            <li>Contacting event winners and delivering prizes</li>
            <li>Improving services and analyzing statistics</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">4.</span> Data Retention
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            We retain your personal information for the duration of your use of our services.
            Upon your request for deletion or service termination, we will promptly delete your data.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>Ranking records: Duration of service operation</li>
            <li>Event participation info: 3 months after event ends</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">5.</span> Third-Party Disclosure
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>
            We do not share your personal information with third parties, except in the following cases:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>When you have given prior consent</li>
            <li>When required by law</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">6.</span> Microphone Usage (SLOX Decibel App)
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p className="mb-3">
            The SLOX Decibel app requests microphone access for sound level measurement.
          </p>
          <div className="bg-dark-800/50 rounded-lg p-4 border border-dark-700">
            <p className="text-green-400 font-medium mb-2">🔒 Privacy Protection</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
              <li>Microphone data is processed <strong className="text-white">only on your device</strong></li>
              <li>Audio is <strong className="text-white">never recorded or stored</strong></li>
              <li>Data is <strong className="text-white">never transmitted</strong> to external servers</li>
              <li>Used only for real-time decibel measurement</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">7.</span> Your Rights
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-3">
            <li>Request access to your personal information</li>
            <li>Request correction of your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Request to stop processing your personal information</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">8.</span> Contact Us
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <div className="mt-4 space-y-2">
            <p><span className="text-dark-500">Email:</span> <a href="mailto:namurobori@gmail.com" className="text-purple-400 hover:text-purple-300">namurobori@gmail.com</a></p>
            <p><span className="text-dark-500">Website:</span> <a href="https://slox.co.kr" className="text-purple-400 hover:text-purple-300">https://slox.co.kr</a></p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-purple-400">9.</span> Effective Date
        </h2>
        <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
          <p>This Privacy Policy is effective as of <strong className="text-white">December 10, 2025</strong>.</p>
        </div>
      </section>
    </div>
  );
}
