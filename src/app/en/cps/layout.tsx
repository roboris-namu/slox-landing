import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPS Test - Click Speed Test, Clicks Per Second | SLOX",
  description:
    "Free CPS test! Click as fast as you can for 1, 5, or 10 seconds. Challenge yourself with jitter click, butterfly click for higher CPS!",
  keywords: [
    "cps test",
    "click speed test",
    "clicks per second",
    "click test",
    "jitter click",
    "butterfly click",
    "minecraft cps",
    "mouse click test",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/en/cps",
    languages: {
      "ko": "https://www.slox.co.kr/cps",
      "en": "https://www.slox.co.kr/en/cps",
      "ja": "https://www.slox.co.kr/ja/cps",
      "zh": "https://www.slox.co.kr/zh/cps",
      "es": "https://www.slox.co.kr/es/cps",
      "pt": "https://www.slox.co.kr/pt/cps",
      "de": "https://www.slox.co.kr/de/cps",
      "fr": "https://www.slox.co.kr/fr/cps",
    },
  },
  openGraph: {
    title: "CPS Test - Click Speed Test | SLOX",
    description: "Free CPS test. How many clicks per second can you do?",
    url: "https://www.slox.co.kr/en/cps",
    locale: "en_US",
  },
};

export default function CpsLayoutEn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

