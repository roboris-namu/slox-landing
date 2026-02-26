import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - Jogos e Ferramentas Online Grátis | Jogue, Compita, Ranking",
  description: "SLOX - Jogos e ferramentas online grátis. Teste de reação, teste de QI, Sudoku, quiz, calculadora IMC, gerador QR e mais de 24 ferramentas grátis. Compita globalmente!",
  keywords: ["jogos online grátis", "teste de reação", "teste de QI", "ferramentas grátis", "sudoku", "quiz", "SLOX"],
  openGraph: {
    title: "SLOX - Jogos e Ferramentas Online Grátis",
    description: "Mais de 24 jogos e ferramentas grátis. Jogue, compita e suba no ranking!",
    locale: "pt_BR",
  },
};

export default function PortugueseHome() {
  return <HomeContent locale="pt" />;
}
