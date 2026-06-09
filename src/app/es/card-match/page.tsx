import CardMatchMulti from "@/components/games/CardMatchMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Juego de Memoria | SLOX",
  description: "¡Memoriza cartas y encuentra parejas! Pon a prueba tu memoria.",
};

export default function EsCardMatchPage() {
  return (
    <>
      <CardMatchMulti locale="es" />
      <AppDownloadBanner code="card-match" lang="en" />
    </>
  );
}

