import IQTestMulti from "@/components/games/IQTestMulti";

export const metadata = {
  title: "IQ Test - Measure Your Intelligence | SLOX",
  description: "Measure your IQ with pattern analysis! Mensa-style questions. Compete on the global leaderboard!",
};

export default function EnIQPage() {
  return <IQTestMulti locale="en" />;
}
