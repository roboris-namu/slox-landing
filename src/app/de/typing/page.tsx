import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export const metadata = {
  title: "Tippgeschwindigkeit Test - SLOX",
  description: "Testen Sie Ihre Tippgeschwindigkeit! Wie schnell können Sie tippen? Messen Sie Ihre WPM und treten Sie in der globalen Rangliste an.",
};

export default function TypingPageDE() {
  return (
    <>
      <TypingMulti locale="de" />
      <AppDownloadCTA code="typing" lang="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

