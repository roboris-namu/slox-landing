import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Test de QI | SLOX",
  description: "Analysez les motifs et mesurez votre QI ! Test style Mensa de 12 questions.",
};

export default function FrIQPage() {
  return (
    <>
      <IQTestMulti locale="fr" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

