import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Test de CI | SLOX",
  description: "¡Analiza patrones y mide tu CI! Test estilo Mensa de 12 preguntas.",
};

export default function EsIQPage() {
  return (
    <>
      <IQTestMulti locale="es" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

