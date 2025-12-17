import CardMatchMulti from "@/components/games/CardMatchMulti";

export const metadata = {
  title: "Jeu de Mémoire | SLOX",
  description: "Mémorisez les cartes et trouvez les paires! Testez votre mémoire.",
};

export default function FrCardMatchPage() {
  return <CardMatchMulti locale="fr" />;
}

