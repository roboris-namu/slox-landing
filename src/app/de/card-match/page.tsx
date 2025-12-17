import CardMatchMulti from "@/components/games/CardMatchMulti";

export const metadata = {
  title: "Karten-Match | SLOX",
  description: "Karten merken und Paare finden! Teste dein Gedächtnis.",
};

export default function DeCardMatchPage() {
  return <CardMatchMulti locale="de" />;
}

