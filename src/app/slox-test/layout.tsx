import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "황소 테스트 - 나와 닮은 황소 캐릭터 찾기 | 무료 성격 테스트",
  description: "무료 황소 성격 테스트! 8가지 질문으로 나와 닮은 황소 캐릭터를 찾아보세요. 리더황, 조순, 메카황 등 귀여운 황소 캐릭터 중 당신의 성격과 가장 잘 맞는 캐릭터는? 재미있는 심리테스트로 친구들과 공유해보세요!",
  keywords: [
    "황소테스트", "황소 테스트", "황소 성격 테스트", "황소 심리테스트",
    "소 테스트", "소 성격 테스트", "나와 닮은 황소",
    "성격테스트", "성격 테스트", "무료 성격테스트",
    "심리테스트", "심리 테스트", "무료 심리테스트",
    "캐릭터 테스트", "귀여운 캐릭터", "동물 캐릭터 테스트",
    "재미있는 테스트", "친구와 함께하는 테스트"
  ],
  openGraph: {
    title: "황소 테스트 - 나와 닮은 황소는? 🐂",
    description: "무료 황소 성격 테스트! 8가지 질문으로 나와 닮은 귀여운 황소 캐릭터를 찾아보세요!",
    url: "https://www.slox.co.kr/slox-test",
    siteName: "SLOX",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/slox-test",
  },
};

export default function SloxTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


