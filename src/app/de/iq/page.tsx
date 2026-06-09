import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "IQ-Test | SLOX",
  description: "Analysiere Muster und miss deinen IQ! 12 Fragen im Mensa-Stil.",
};

export default function DeIQPage() {
  return (
    <>
      <IQTestMulti locale="de" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

