import RouletteMulti from "@/components/games/RouletteMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export default function RoulettePage() {
  return (
    <>
      <RouletteMulti locale="zh" />
      <AppDownloadCTA code="roulette" lang="en" />
      <AppDownloadBanner code="roulette" lang="en" />
    </>
  );
}
