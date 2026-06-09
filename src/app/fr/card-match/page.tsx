import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Jeu de Mémoire | SLOX",
  description: "Mémorisez les cartes et trouvez les paires! Testez votre mémoire.",
};

export default function FrCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="fr" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

