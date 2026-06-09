import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Card Match | SLOX",
  description: "Memorize cards and find the pairs! Test your memory with this fun matching game.",
};

export default function EnCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

