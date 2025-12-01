import type { Metadata } from "next";

/**
 * 반응속도 테스트 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "반응속도 테스트 - 무료 반응속도 측정, 티어 확인",
  description:
    "무료 반응속도 테스트입니다. 당신의 반응속도는 몇 ms일까요? 챌린저부터 아이언까지, 지금 바로 티어를 확인하고 친구들과 결과를 공유해보세요!",
  keywords: [
    "반응속도 테스트",
    "반응속도 측정",
    "반응속도 게임",
    "클릭 속도 테스트",
    "리액션 테스트",
    "무료 반응속도",
    "반응속도 티어",
    "reaction test",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/reaction",
    siteName: "SLOX",
    title: "반응속도 테스트 - 무료 반응속도 측정",
    description:
      "무료 반응속도 테스트. 당신의 반응속도는 몇 ms일까요?",
  },
  twitter: {
    card: "summary_large_image",
    title: "반응속도 테스트",
    description:
      "당신의 반응속도는 몇 ms일까요? 지금 바로 티어를 확인해보세요!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

