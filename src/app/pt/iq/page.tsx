import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Teste de QI | SLOX",
  description: "Analise padrões e meça seu QI! Teste estilo Mensa de 12 questões.",
};

export default function PtIQPage() {
  return (
    <>
      <IQTestMulti locale="pt" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

