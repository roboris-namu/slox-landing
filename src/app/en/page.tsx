import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - Free Online Games & Tools | Play, Compete, Rank",
  description: "SLOX - Free online games and tools. Reaction Test, IQ Test, Sudoku, Quiz, BMI Calculator, QR Generator and 24+ free tools. Compete globally!",
  keywords: ["free online games", "reaction test", "IQ test", "free tools", "sudoku", "trivia quiz", "CPS test", "SLOX"],
  openGraph: {
    title: "SLOX - Free Online Games & Tools",
    description: "24+ free online games and tools. Play, compete, and rank globally!",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "de_DE", "fr_FR", "es_ES", "pt_BR"],
  },
};

export default function EnglishHome() {
  return <HomeContent locale="en" />;
}
