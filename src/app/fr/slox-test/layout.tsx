import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Personnalité du Taureau - Quel Taureau Êtes-Vous? | Gratuit",
  description: "Test de personnalité du taureau gratuit! Découvrez quel mignon personnage de taureau correspond à votre personnalité avec 8 questions amusantes.",
  keywords: ["test du taureau", "test de personnalité", "test de caractère", "test psychologique", "test gratuit", "quel animal suis-je"],
  openGraph: {
    title: "Test de Personnalité du Taureau - Quel Taureau Êtes-Vous? 🐂",
    description: "Test de personnalité du taureau gratuit! Découvrez votre personnage taureau!",
    url: "https://www.slox.co.kr/fr/slox-test",
    siteName: "SLOX",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/fr/slox-test",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

