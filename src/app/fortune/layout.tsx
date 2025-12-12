import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 운세 - 별자리 운세 | SLOX",
  description: "12별자리 오늘의 운세를 확인하세요! 총운, 애정운, 금전운, 건강운, 직장운과 행운의 숫자, 색상을 알려드립니다.",
  keywords: ["오늘의 운세", "별자리 운세", "무료 운세", "daily fortune", "horoscope", "zodiac"],
  openGraph: {
    title: "🔮 오늘의 운세 - 별자리 운세 | SLOX",
    description: "12별자리 오늘의 운세를 확인하세요! 총운, 애정운, 금전운, 건강운 확인",
    type: "website",
  },
};

export default function FortuneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

