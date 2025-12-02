import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Personalidad del Toro - ¿Qué Toro Eres? | Gratis",
  description: "¡Test de personalidad del toro gratis! Descubre qué lindo personaje de toro coincide con tu personalidad con 8 preguntas divertidas.",
  keywords: ["test del toro", "test de personalidad", "test de carácter", "test psicológico", "test gratis", "qué animal soy"],
  openGraph: {
    title: "Test de Personalidad del Toro - ¿Qué Toro Eres? 🐂",
    description: "¡Test de personalidad del toro gratis! ¡Descubre tu personaje toro!",
    url: "https://www.slox.co.kr/es/slox-test",
    siteName: "SLOX",
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/es/slox-test",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}




