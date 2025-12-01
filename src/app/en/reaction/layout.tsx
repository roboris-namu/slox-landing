import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reaction Speed Test - Free Online Reflex Test | SLOX",
  description:
    "Test your reaction speed for free! Click as fast as you can when the screen turns green. Compare your score with LoL-style tiers from Iron to Challenger.",
  keywords: [
    "reaction speed test",
    "reaction time test",
    "reflex test",
    "reaction test online",
    "click speed test",
    "human benchmark",
    "reaction time",
    "reflex speed",
    "gaming reflex test",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/en/reaction",
    languages: {
      "ko": "https://www.slox.co.kr/reaction",
      "en": "https://www.slox.co.kr/en/reaction",
      "ja": "https://www.slox.co.kr/ja/reaction",
      "zh": "https://www.slox.co.kr/zh/reaction",
    },
  },
  openGraph: {
    title: "Reaction Speed Test - Free Online Reflex Test | SLOX",
    description:
      "Test your reaction speed for free! Click as fast as you can when the screen turns green.",
    url: "https://www.slox.co.kr/en/reaction",
    locale: "en_US",
  },
  twitter: {
    title: "Reaction Speed Test - Free Online Reflex Test",
    description:
      "Test your reaction speed for free! Click as fast as you can when the screen turns green.",
  },
};

export default function ReactionLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

