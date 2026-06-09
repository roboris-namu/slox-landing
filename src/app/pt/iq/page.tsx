import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Teste de QI | SLOX",
  description: "Analise padrões e meça seu QI! Teste estilo Mensa de 12 questões.",
};

export default function PtIQPage() {
  return (
    <>
      <IQTestMulti locale="pt" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

