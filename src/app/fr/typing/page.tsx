import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Test de Vitesse de Frappe - SLOX",
  description: "Testez votre vitesse de frappe ! À quelle vitesse pouvez-vous taper ? Mesurez vos MPM et participez au classement mondial.",
};

export default function TypingPageFR() {
  return (
    <>
      <TypingMulti locale="fr" />
      <AppDownloadCTA code="typing" lang="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

