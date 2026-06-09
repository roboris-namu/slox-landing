import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Prueba de Velocidad de Escritura - SLOX",
  description: "¡Prueba tu velocidad de escritura! ¿Qué tan rápido puedes escribir? Mide tu PPM y compite en la clasificación global.",
};

export default function TypingPageES() {
  return (
    <>
      <TypingMulti locale="es" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

