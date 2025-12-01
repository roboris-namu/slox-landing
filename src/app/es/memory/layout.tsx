import type { Metadata } from "next";
export const metadata: Metadata = { title: "Juego de Memoria de Números | SLOX", description: "¡Juego de memoria gratis! ¿Cuántos dígitos puedes recordar?", alternates: { canonical: "https://www.slox.co.kr/es/memory", languages: { "ko": "https://www.slox.co.kr/memory", "en": "https://www.slox.co.kr/en/memory", "ja": "https://www.slox.co.kr/ja/memory", "zh": "https://www.slox.co.kr/zh/memory", "es": "https://www.slox.co.kr/es/memory", "pt": "https://www.slox.co.kr/pt/memory", "de": "https://www.slox.co.kr/de/memory", "fr": "https://www.slox.co.kr/fr/memory" } }, openGraph: { locale: "es_ES" } };
export default function MemoryLayoutEs({ children }: { children: React.ReactNode }) { return <>{children}</>; }

