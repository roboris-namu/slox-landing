import IQTestMulti from "@/components/games/IQTestMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "IQ-Test | SLOX",
  description: "Analysiere Muster und miss deinen IQ! 12 Fragen im Mensa-Stil.",
};

export default function DeIQPage() {
  return (
    <>
      <IQTestMulti locale="de" />
      <AppDownloadCTA code="iq" lang="en" />
      <AppDownloadBanner code="iq" lang="en" />
    </>
  );
}

