import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - 안전한 랜덤 비밀번호 만들기 | SLOX",
  description:
    "무료 비밀번호 생성기. 안전하고 강력한 랜덤 비밀번호를 만들어보세요. 길이, 대소문자, 숫자, 특수문자 설정 가능.",
  keywords: [
    "비밀번호 생성기",
    "랜덤 비밀번호",
    "패스워드 생성",
    "안전한 비밀번호",
    "password generator",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/password",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.slox.co.kr/password",
    siteName: "SLOX",
    title: "비밀번호 생성기 | SLOX",
    description: "안전한 랜덤 비밀번호를 만들어보세요!",
  },
  robots: { index: true, follow: true },
};

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

