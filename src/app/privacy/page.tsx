"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
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
          <Link href="/" className="text-dark-400 hover:text-white transition-colors text-sm">
            ← 홈으로
          </Link>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">개인정보 처리방침</h1>
        <p className="text-dark-400 mb-8">Privacy Policy</p>
        
        <div className="prose prose-invert max-w-none space-y-8">
          {/* 1. 개요 */}
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

          {/* 2. 수집하는 개인정보 */}
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

          {/* 3. 개인정보의 이용 목적 */}
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

          {/* 4. 개인정보의 보유 및 이용 기간 */}
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

          {/* 5. 개인정보의 제3자 제공 */}
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

          {/* 6. 마이크 권한 사용 (앱) */}
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

          {/* 7. 이용자의 권리 */}
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

          {/* 8. 연락처 */}
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

          {/* 9. 시행일 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">9.</span> 시행일
            </h2>
            <div className="bg-dark-900/50 border border-dark-800 rounded-xl p-5 text-dark-300 leading-relaxed">
              <p>본 개인정보 처리방침은 <strong className="text-white">2024년 12월 10일</strong>부터 시행됩니다.</p>
            </div>
          </section>
        </div>

        {/* 하단 */}
        <div className="mt-12 pt-8 border-t border-dark-800 text-center">
          <p className="text-dark-500 text-sm">
            © 2024 SLOX. All rights reserved.
          </p>
          <Link href="/" className="inline-block mt-4 text-purple-400 hover:text-purple-300 transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
