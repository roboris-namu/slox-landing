import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나와 닮은 SLOX는? - SLOX 성격 테스트",
  description: "8가지 질문으로 알아보는 나의 SLOX 캐릭터! 리더황, 조순, 메카황 등 8가지 귀여운 캐릭터 중 당신과 닮은 캐릭터를 찾아보세요.",
  keywords: ["SLOX", "성격테스트", "캐릭터테스트", "심리테스트", "MBTI", "동물상테스트", "황소테스트"],
  openGraph: {
    title: "나와 닮은 SLOX는? - SLOX 성격 테스트",
    description: "8가지 질문으로 알아보는 나의 SLOX 캐릭터!",
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


