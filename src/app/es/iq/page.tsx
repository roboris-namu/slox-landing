import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Test de CI | SLOX",
  description: "¡Analiza patrones y mide tu CI! Test estilo Mensa de 12 preguntas.",
};

export default function EsIQPage() {
  return (
    <>
      <IQTestMulti locale="es" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

