import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Card Match | SLOX",
  description: "Memorize cards and find the pairs! Test your memory with this fun matching game.",
};

export default function EnCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="en" />
      <AppDownloadCTA code="card-match" lang="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

