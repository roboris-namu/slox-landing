import RouletteMulti from "@/components/games/RouletteMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export default function RoulettePage() {
  return (
    <>
      <RouletteMulti locale="fr" />
      <AppDownloadBanner code="roulette" lang="en" />
    </>
  );
}
