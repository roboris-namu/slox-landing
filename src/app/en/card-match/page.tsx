import CardMatchMulti from "@/components/games/CardMatchMulti";

export const metadata = {
  title: "Card Match | SLOX",
  description: "Memorize cards and find the pairs! Test your memory with this fun matching game.",
};

export default function EnCardMatchPage() {
  return <CardMatchMulti locale="en" />;
}

