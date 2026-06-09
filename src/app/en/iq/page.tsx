import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "IQ Test - Measure Your Intelligence | SLOX",
  description: "Measure your IQ with pattern analysis! Mensa-style questions. Compete on the global leaderboard!",
};

export default function EnIQPage() {
  return (
    <>
      <IQTestMulti locale="en" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}
