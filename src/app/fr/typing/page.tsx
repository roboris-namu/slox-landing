import TypingMulti from "@/components/games/TypingMulti";

export const metadata = {
  title: "Test de Vitesse de Frappe - SLOX",
  description: "Testez votre vitesse de frappe ! À quelle vitesse pouvez-vous taper ? Mesurez vos MPM et participez au classement mondial.",
};

export default function TypingPageFR() {
  return <TypingMulti locale="fr" />;
}

