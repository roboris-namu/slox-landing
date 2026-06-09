import MemoryTest from "@/components/MemoryTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6777042091",
  },
};

export default function MemoryPage() { return (
    <>
      <MemoryTest locale="ko" />
      <AppDownloadCTA code="memory" lang="ko" />
      <AppDownloadBanner code="memory" lang="ko" />
    </>
  ); }









