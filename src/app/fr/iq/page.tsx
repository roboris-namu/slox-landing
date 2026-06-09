import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Test de QI | SLOX",
  description: "Analysez les motifs et mesurez votre QI ! Test style Mensa de 12 questions.",
};

export default function FrIQPage() {
  return (
    <>
      <IQTestMulti locale="fr" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

