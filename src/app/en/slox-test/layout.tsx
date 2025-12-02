import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bull Personality Test - Which Bull Are You? | Free Test",
  description: "Free bull personality test! Discover which cute bull character matches your personality with 8 fun questions. Leader Bull, Mecha Bull, Wild Bull and more!",
  keywords: ["bull test", "bull personality test", "personality test", "character test", "fun test", "which animal am i", "free personality test"],
  openGraph: {
    title: "Bull Personality Test - Which Bull Are You? 🐂",
    description: "Free bull personality test! Discover your bull character with 8 questions!",
    url: "https://www.slox.co.kr/en/slox-test",
    siteName: "SLOX",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/en/slox-test",
    languages: {
      "ko": "https://www.slox.co.kr/slox-test",
      "en": "https://www.slox.co.kr/en/slox-test",
      "ja": "https://www.slox.co.kr/ja/slox-test",
      "zh": "https://www.slox.co.kr/zh/slox-test",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}




