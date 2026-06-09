import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Jogo da Memória | SLOX",
  description: "Memorize cartas e encontre os pares! Teste sua memória.",
};

export default function PtCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="pt" />
      <AppDownloadCTA code="card-match" lang="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

