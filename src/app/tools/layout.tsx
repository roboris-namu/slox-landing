import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "무료 도구 모음 | SLOX - 21종 무료 온라인 도구",
  description: "반응속도 테스트, CPS 테스트, 연봉 계산기, BMI 계산기, QR코드 생성기 등 21종의 무료 온라인 도구를 이용해 보세요. 회원가입 없이 무료!",
  keywords: ["무료 도구", "온라인 도구", "반응속도 테스트", "CPS 테스트", "연봉 계산기", "BMI 계산기", "QR코드 생성기", "타자 테스트"],
  openGraph: {
    title: "무료 도구 모음 | SLOX",
    description: "21종의 무료 온라인 도구를 회원가입 없이 바로 이용하세요!",
    url: "https://www.slox.co.kr/tools",
    siteName: "SLOX",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

