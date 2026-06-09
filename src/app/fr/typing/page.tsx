import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Test de Vitesse de Frappe - SLOX",
  description: "Testez votre vitesse de frappe ! À quelle vitesse pouvez-vous taper ? Mesurez vos MPM et participez au classement mondial.",
};

export default function TypingPageFR() {
  return (
    <>
      <TypingMulti locale="fr" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

