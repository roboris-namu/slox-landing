import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Prueba de Velocidad de Escritura - SLOX",
  description: "¡Prueba tu velocidad de escritura! ¿Qué tan rápido puedes escribir? Mide tu PPM y compite en la clasificación global.",
};

export default function TypingPageES() {
  return (
    <>
      <TypingMulti locale="es" />
      <AppDownloadCTA code="typing" lang="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

