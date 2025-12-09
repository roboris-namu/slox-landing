import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🎁 이벤트 - SLOX",
  description: "SLOX 이벤트! 매달 1일 오전 10시 기준 반응속도 테스트 1등에게 문화상품권 5,000원을 드립니다!",
  openGraph: {
    title: "🎁 SLOX 이벤트 - 1등에게 문화상품권!",
    description: "매달 1일 오전 10시 기준 반응속도 테스트 1등에게 문화상품권 5,000원!",
    url: "https://www.slox.co.kr/event",
  },
};

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

