import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* 메인 콘텐츠 */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-900/50 rounded-2xl border border-dark-800 p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-white mb-8">개인정보처리방침</h1>
            
            <div className="space-y-8 text-dark-300 leading-relaxed">
              {/* 1. 개요 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. 개요</h2>
                <p>
                  SLOX(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
                  회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
                  개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                </p>
              </section>

              {/* 2. 수집하는 개인정보 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. 수집하는 개인정보 항목</h2>
                <p className="mb-3">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>문의하기: 이름, 이메일 주소, 문의 내용</li>
                  <li>자동 수집 항목: 접속 IP, 쿠키, 방문 일시, 서비스 이용 기록</li>
                </ul>
              </section>

              {/* 3. 개인정보 수집 및 이용 목적 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. 개인정보의 수집 및 이용 목적</h2>
                <p className="mb-3">회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>서비스 제공 및 운영</li>
                  <li>문의 사항 응대 및 처리</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                  <li>광고 게재 및 마케팅 활용</li>
                </ul>
              </section>

              {/* 4. 개인정보 보유 및 이용 기간 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. 개인정보의 보유 및 이용 기간</h2>
                <p>
                  회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                  단, 관계 법령에 의해 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.
                </p>
              </section>

              {/* 5. 개인정보의 제3자 제공 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. 개인정보의 제3자 제공</h2>
                <p>
                  회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                  다만, 아래의 경우에는 예외로 합니다:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                </ul>
              </section>

              {/* 6. 쿠키 및 광고 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. 쿠키(Cookie) 및 광고</h2>
                <p className="mb-3">
                  회사는 이용자에게 개인화된 서비스를 제공하기 위해 쿠키를 사용합니다.
                  또한 Google AdSense를 통해 광고를 게재하며, 이 과정에서 쿠키가 사용될 수 있습니다.
                </p>
                <p>
                  이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나,
                  이 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.
                </p>
              </section>

              {/* 7. 개인정보의 파기 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. 개인정보의 파기</h2>
                <p>
                  회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는
                  지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없는 방법으로 영구 삭제하며,
                  종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각합니다.
                </p>
              </section>

              {/* 8. 이용자의 권리 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. 이용자의 권리</h2>
                <p className="mb-3">이용자는 언제든지 다음의 권리를 행사할 수 있습니다:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>개인정보 열람 요청</li>
                  <li>개인정보 정정 요청</li>
                  <li>개인정보 삭제 요청</li>
                  <li>개인정보 처리 정지 요청</li>
                </ul>
              </section>

              {/* 9. 개인정보 보호책임자 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. 개인정보 보호책임자</h2>
                <p className="mb-3">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                  이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-dark-800/50 rounded-xl p-4 mt-3">
                  <p><strong className="text-white">개인정보 보호책임자</strong></p>
                  <p>이메일: hyoincho9123@gmail.com</p>
                </div>
              </section>

              {/* 10. 개정 이력 */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. 개인정보처리방침의 변경</h2>
                <p>
                  이 개인정보처리방침은 2025년 12월 2일부터 적용됩니다.
                  법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는
                  변경 사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                </p>
              </section>
            </div>

            {/* 하단 */}
            <div className="mt-12 pt-8 border-t border-dark-800 text-center">
              <p className="text-dark-500 text-sm mb-4">
                최종 수정일: 2025년 12월 2일
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-medium rounded-xl hover:scale-105 transition-transform"
              >
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}








