import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teste de Personalidade do Touro - Qual Touro Você É? | Grátis",
  description: "Teste de personalidade do touro grátis! Descubra qual personagem de touro combina com sua personalidade com 8 perguntas divertidas.",
  keywords: ["teste do touro", "teste de personalidade", "teste de caráter", "teste psicológico", "teste grátis", "qual animal sou"],
  openGraph: {
    title: "Teste de Personalidade do Touro - Qual Touro Você É? 🐂",
    description: "Teste de personalidade do touro grátis! Descubra seu personagem touro!",
    url: "https://www.slox.co.kr/pt/slox-test",
    siteName: "SLOX",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/pt/slox-test",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}








