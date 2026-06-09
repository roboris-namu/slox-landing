import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Teste de Velocidade de Digitação - SLOX",
  description: "Teste sua velocidade de digitação! Quão rápido você consegue digitar? Meça seu PPM e compita na classificação global.",
};

export default function TypingPagePT() {
  return (
    <>
      <TypingMulti locale="pt" />
      <AppDownloadCTA code="typing" lang="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

