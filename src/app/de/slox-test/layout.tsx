import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stier-Persönlichkeitstest - Welcher Stier Bist Du? | Kostenlos",
  description: "Kostenloser Stier-Persönlichkeitstest! Entdecke mit 8 lustigen Fragen, welcher süße Stier-Charakter zu deiner Persönlichkeit passt.",
  keywords: ["stier test", "persönlichkeitstest", "charaktertest", "psychotest", "kostenloser test", "welches tier bin ich"],
  openGraph: {
    title: "Stier-Persönlichkeitstest - Welcher Stier Bist Du? 🐂",
    description: "Kostenloser Stier-Persönlichkeitstest! Entdecke deinen Stier-Charakter!",
    url: "https://www.slox.co.kr/de/slox-test",
    siteName: "SLOX",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/de/slox-test",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

