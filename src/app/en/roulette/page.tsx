import RouletteMulti from "@/components/games/RouletteMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export default function RoulettePage() {
  return (
    <>
      <RouletteMulti locale="en" />
      <AppDownloadBanner code="roulette" lang="en" />
    </>
  );
}
