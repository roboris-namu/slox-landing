import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Juego de Memoria | SLOX",
  description: "¡Memoriza cartas y encuentra parejas! Pon a prueba tu memoria.",
};

export default function EsCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="es" />
      <AppDownloadCTA code="card-match" lang="en" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

