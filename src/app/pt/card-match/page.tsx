import CardMatchMulti from "@/components/games/CardMatchMulti";

export const metadata = {
  title: "Jogo da Memória | SLOX",
  description: "Memorize cartas e encontre os pares! Teste sua memória.",
};

export default function PtCardMatchPage() {
  return <CardMatchMulti locale="pt" />;
}

