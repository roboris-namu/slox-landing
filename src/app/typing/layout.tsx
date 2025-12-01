import type { Metadata } from "next";

/**
 * 타자 속도 테스트 페이지 SEO 메타데이터
 */
export const metadata: Metadata = {
  title: "타자 속도 테스트 - 한글 타자 연습, 무료 타자 게임",
  description:
    "무료 한글 타자 속도 테스트입니다. 당신의 타자 속도는 몇 타일까요? 지금 바로 테스트하고 친구들과 결과를 공유해보세요!",
  keywords: [
    "타자 속도 테스트",
    "타자 연습",
    "한글 타자",
    "타자 게임",
    "타자 속도 측정",
    "무료 타자 연습",
    "온라인 타자",
    "타자 연습 사이트",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/typing",
    siteName: "SLOX",
    title: "타자 속도 테스트 - 한글 타자 연습",
    description:
      "무료 한글 타자 속도 테스트. 당신의 타자 속도는 몇 타일까요?",
  },
  twitter: {
    card: "summary_large_image",
    title: "타자 속도 테스트",
    description:
      "당신의 타자 속도는 몇 타일까요? 지금 바로 테스트해보세요!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TypingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

