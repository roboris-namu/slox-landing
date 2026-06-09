import RouletteMulti from "@/components/games/RouletteMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6777046687",
  },
};

export default function RoulettePage() {
  return (
    <>
      <RouletteMulti locale="ko" />
      <AppDownloadBanner code="roulette" lang="ko" />
    </>
  );
}
