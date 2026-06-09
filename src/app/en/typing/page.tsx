import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "Typing Speed Test - SLOX",
  description: "Test your typing speed! How fast can you type? Measure your WPM and compete on the global leaderboard.",
};

export default function TypingPageEN() {
  return (
    <>
      <TypingMulti locale="en" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

