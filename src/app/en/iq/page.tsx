import { Metadata } from "next";
import IQTestEN from "@/components/games/IQTestEN";

export const metadata: Metadata = {
  title: "Free IQ Test Online - Measure Your Intelligence | SLOX",
  description: "Free online IQ test with 12 pattern recognition questions. Measure your IQ and compare with others. Fast, accurate, and fun!",
  keywords: ["IQ test", "free IQ test", "intelligence test", "online IQ test", "brain test", "SLOX"],
  openGraph: {
    title: "Free IQ Test Online | SLOX",
    description: "Measure your IQ with our free online test!",
    locale: "en_US",
  },
};

export default function IQTestPage() {
  return <IQTestEN />;
}

