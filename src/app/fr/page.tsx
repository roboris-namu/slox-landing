import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - Jeux et Outils en Ligne Gratuits | Jouez, Rivalisez, Classement",
  description: "SLOX - Jeux et outils en ligne gratuits. Test de réaction, test de QI, Sudoku, quiz, calculateur IMC, générateur QR et plus de 24 outils gratuits. Rivalisez mondialement !",
  keywords: ["jeux en ligne gratuits", "test de réaction", "test de QI", "outils gratuits", "sudoku", "quiz", "SLOX"],
  openGraph: {
    title: "SLOX - Jeux et Outils en Ligne Gratuits",
    description: "Plus de 24 jeux et outils gratuits. Jouez, rivalisez et grimpez au classement !",
    locale: "fr_FR",
  },
};

export default function FrenchHome() {
  return <HomeContent locale="fr" />;
}
