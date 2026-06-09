import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Karten-Match | SLOX",
  description: "Karten merken und Paare finden! Teste dein Gedächtnis.",
};

export default function DeCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="de" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

