import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Karten-Match | SLOX",
  description: "Karten merken und Paare finden! Teste dein Gedächtnis.",
};

export default function DeCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="de" />
      <AppDownloadCTA code="card-match" lang="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

